# Email Deliverability Guide

Complete guide to prevent contact form emails from ending up in spam folders.

---

## Current Configuration

**From:** `web@kenco.nz`  
**To:** `kendyl.carikas@kenco.nz`, `peter.carikas@kenco.nz`  
**Reply-To:** Customer's email address (from contact form)

---

## Step 1: Verify Email Address in AWS SES

### Verify web@kenco.nz

1. Go to AWS Console → SES → Verified Identities
2. Click "Create Identity"
3. Choose "Email Address"
4. Enter: `web@kenco.nz`
5. Click "Create Identity"
6. Check the inbox for `web@kenco.nz`
7. Click the verification link in the email from AWS

**Important:** This must be done before emails can be sent from `web@kenco.nz`.

---

## Step 2: Configure DNS Records for Email Authentication

Email authentication prevents your emails from being marked as spam. You need to add three types of DNS records:

### A. SPF Record (Sender Policy Framework)

SPF tells receiving servers which mail servers are authorized to send email for your domain.

**DNS Record Type:** TXT  
**Name:** `@` or `kenco.nz`  
**Value:**
```
v=spf1 include:amazonses.com ~all
```

**Explanation:**
- `v=spf1` - SPF version 1
- `include:amazonses.com` - Allow AWS SES to send email
- `~all` - Soft fail for other servers (recommended)

### B. DKIM Records (DomainKeys Identified Mail)

DKIM adds a digital signature to your emails to prove they haven't been tampered with.

**Get DKIM records from AWS SES:**

1. Go to AWS Console → SES → Verified Identities
2. Click on your domain `kenco.nz` (or create domain identity if not exists)
3. Go to "DKIM" tab
4. Click "Publish DNS records" or copy the CNAME records shown

**You'll get 3 CNAME records like this:**

**Record 1:**
- Type: CNAME
- Name: `abc123._domainkey.kenco.nz`
- Value: `abc123.dkim.amazonses.com`

**Record 2:**
- Type: CNAME
- Name: `def456._domainkey.kenco.nz`
- Value: `def456.dkim.amazonses.com`

**Record 3:**
- Type: CNAME
- Name: `ghi789._domainkey.kenco.nz`
- Value: `ghi789.dkim.amazonses.com`

**Add all 3 CNAME records to your DNS.**

### C. DMARC Record (Domain-based Message Authentication)

DMARC tells receiving servers what to do with emails that fail SPF or DKIM checks.

**DNS Record Type:** TXT  
**Name:** `_dmarc.kenco.nz`  
**Value:**
```
v=DMARC1; p=none; rua=mailto:dmarc@kenco.nz; pct=100; adkim=r; aspf=r
```

**Explanation:**
- `v=DMARC1` - DMARC version 1
- `p=none` - Don't reject emails (monitoring mode - recommended to start)
- `rua=mailto:dmarc@kenco.nz` - Send aggregate reports here
- `pct=100` - Apply policy to 100% of emails
- `adkim=r` - Relaxed DKIM alignment
- `aspf=r` - Relaxed SPF alignment

**After monitoring for a while, you can change `p=none` to `p=quarantine` or `p=reject` for stricter enforcement.**

---

## Step 3: Add DNS Records

### Where to Add Records

DNS records should be added where your domain's nameservers are hosted. For `kenco.nz`, this is likely:

- **Plesk DNS Manager** (if using Plesk DNS)
- **Domain Registrar** (e.g., GoDaddy, Namecheap)
- **Cloudflare** (if using Cloudflare)
- **AWS Route 53** (if using Route 53)

### Adding Records in Plesk

1. Log into Plesk
2. Go to **Domains** → **kenco.nz**
3. Click **DNS Settings**
4. Add the following records:

#### SPF Record
- Record type: TXT
- Domain: `kenco.nz` (or leave blank for root domain)
- Value: `v=spf1 include:amazonses.com ~all`
- TTL: 3600 (or default)

#### DKIM Records (3 records from AWS SES)
- Record type: CNAME
- Domain: `abc123._domainkey` (from AWS SES)
- Value: `abc123.dkim.amazonses.com` (from AWS SES)
- TTL: 3600 (or default)

Repeat for all 3 DKIM CNAME records.

#### DMARC Record
- Record type: TXT
- Domain: `_dmarc.kenco.nz`
- Value: `v=DMARC1; p=none; rua=mailto:dmarc@kenco.nz; pct=100; adkim=r; aspf=r`
- TTL: 3600 (or default)

---

## Step 4: Verify DNS Records

### Check SPF Record

```bash
dig kenco.nz TXT +short | grep spf
```

Should return:
```
"v=spf1 include:amazonses.com ~all"
```

**Or use online tool:** https://mxtoolbox.com/spf.aspx

### Check DKIM Records

```bash
dig abc123._domainkey.kenco.nz CNAME +short
```

Should return:
```
abc123.dkim.amazonses.com
```

**Or use online tool:** https://mxtoolbox.com/dkim.aspx

### Check DMARC Record

```bash
dig _dmarc.kenco.nz TXT +short
```

Should return:
```
"v=DMARC1; p=none; rua=mailto:dmarc@kenco.nz; pct=100; adkim=r; aspf=r"
```

**Or use online tool:** https://mxtoolbox.com/dmarc.aspx

---

## Step 5: Update Environment Variables

Make sure your `.env` file on the Plesk server has:

```bash
SES_FROM_EMAIL=web@kenco.nz
```

Then restart the Docker container:

```bash
cd /opt/kenco-website
sudo docker restart kenco-website
```

---

## Step 6: Test Email Deliverability

### Send Test Email

1. Go to https://kenco.nz/contact
2. Fill out the contact form
3. Submit

### Check Inbox (Not Spam)

Check both:
- `kendyl.carikas@kenco.nz`
- `peter.carikas@kenco.nz`

Emails should arrive in the **Inbox**, not Spam folder.

### Test Email Headers

Use a tool like https://www.mail-tester.com:

1. Go to mail-tester.com
2. Copy the email address shown (e.g., `test-abc123@srv1.mail-tester.com`)
3. Temporarily add this email to the `toEmails` array in `server/email.ts`
4. Submit the contact form
5. Check your score on mail-tester.com (aim for 10/10)

---

## Step 7: Additional Best Practices

### 1. Use Consistent FROM Name

Update the email to include a friendly FROM name:

```typescript
Source: '"Kenco Website" <web@kenco.nz>',
```

### 2. Add HTML Email Body (Optional)

Plain text emails are fine, but HTML can improve deliverability:

```typescript
Body: {
  Text: {
    Data: emailBody,
    Charset: "UTF-8",
  },
  Html: {
    Data: `<html><body><pre>${emailBody}</pre></body></html>`,
    Charset: "UTF-8",
  },
},
```

### 3. Monitor Bounce and Complaint Rates

In AWS SES Console:
- Monitor bounce rate (should be < 5%)
- Monitor complaint rate (should be < 0.1%)
- High rates can get your account suspended

### 4. Request Production Access (If Still in Sandbox)

If your AWS SES account is in sandbox mode:

1. AWS Console → SES → Account Dashboard
2. Click "Request production access"
3. Fill out the form explaining your use case
4. Wait for approval (usually 24-48 hours)

---

## Troubleshooting

### Emails Still Going to Spam

**Check DNS propagation:**
```bash
dig kenco.nz TXT +short
dig _dmarc.kenco.nz TXT +short
dig abc123._domainkey.kenco.nz CNAME +short
```

DNS changes can take up to 48 hours to propagate globally.

**Check email headers:**

In Gmail, open the email and click "Show original" to see headers. Look for:
- `SPF: PASS`
- `DKIM: PASS`
- `DMARC: PASS`

**Common issues:**
- SPF record not found → Add SPF TXT record
- DKIM signature missing → Add DKIM CNAME records
- DMARC policy not found → Add DMARC TXT record
- FROM address not verified → Verify in AWS SES

### Emails Not Being Received

**Check container logs:**
```bash
sudo docker logs kenco-website --tail 50 | grep -i email
```

**Common errors:**
- "Email address is not verified" → Verify `web@kenco.nz` in AWS SES
- "MessageRejected" → Check AWS SES sending limits
- "Access Denied" → Check AWS credentials in .env

### DNS Records Not Showing Up

**Wait for propagation:**
DNS changes can take 5 minutes to 48 hours depending on TTL values.

**Check with different DNS servers:**
```bash
# Google DNS
dig @8.8.8.8 kenco.nz TXT +short

# Cloudflare DNS
dig @1.1.1.1 kenco.nz TXT +short
```

---

## Summary Checklist

- [ ] Verify `web@kenco.nz` in AWS SES
- [ ] Add SPF TXT record to DNS
- [ ] Add 3 DKIM CNAME records to DNS (from AWS SES)
- [ ] Add DMARC TXT record to DNS
- [ ] Wait for DNS propagation (5 mins - 48 hours)
- [ ] Verify DNS records with dig or online tools
- [ ] Update .env with `SES_FROM_EMAIL=web@kenco.nz`
- [ ] Restart Docker container
- [ ] Test contact form
- [ ] Check emails arrive in Inbox (not Spam)
- [ ] Test with mail-tester.com for score
- [ ] Monitor bounce/complaint rates in AWS SES

---

## Quick Reference

### DNS Records Summary

```
# SPF
Type: TXT
Name: kenco.nz
Value: v=spf1 include:amazonses.com ~all

# DKIM (3 records - get from AWS SES)
Type: CNAME
Name: [from AWS SES]._domainkey.kenco.nz
Value: [from AWS SES].dkim.amazonses.com

# DMARC
Type: TXT
Name: _dmarc.kenco.nz
Value: v=DMARC1; p=none; rua=mailto:dmarc@kenco.nz; pct=100; adkim=r; aspf=r
```

### Useful Commands

```bash
# Check SPF
dig kenco.nz TXT +short | grep spf

# Check DKIM
dig abc123._domainkey.kenco.nz CNAME +short

# Check DMARC
dig _dmarc.kenco.nz TXT +short

# Restart container
sudo docker restart kenco-website

# Check email logs
sudo docker logs kenco-website | grep -i email
```

### Useful Tools

- SPF Checker: https://mxtoolbox.com/spf.aspx
- DKIM Checker: https://mxtoolbox.com/dkim.aspx
- DMARC Checker: https://mxtoolbox.com/dmarc.aspx
- Email Tester: https://www.mail-tester.com
- DNS Propagation: https://dnschecker.org

---

Following this guide will significantly improve email deliverability and prevent emails from ending up in spam folders!
