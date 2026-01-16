# Email Signature Guide for Kenco Ltd

This guide provides HTML email signature templates using the publicly hosted images from your website.

---

## Available Logo Images

All images are hosted at `https://kenco.nz/assets/images/`

- **Main Logo:** `logo.png` (Kenco with spiral "o")
- **Endurocide Logo:** `endurocide-logo.jpg`
- **ShadeCare Logo:** `shadecare-logo.png`

---

## Email Signature Template 1: Standard

```html
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
  <tr>
    <td style="padding-right: 15px; vertical-align: top;">
      <img src="https://kenco.nz/assets/images/logo.png" alt="Kenco Ltd" width="120" style="display: block;" />
    </td>
    <td style="border-left: 2px solid #0d9488; padding-left: 15px; vertical-align: top;">
      <strong style="font-size: 16px; color: #0d9488;">Kendyl Carikas</strong><br />
      <span style="color: #666;">Kenco Ltd</span><br />
      <br />
      <span style="color: #666;">m:</span> +64 21 029 66718<br />
      <span style="color: #666;">e:</span> kendyl.carikas@kenco.nz<br />
      <span style="color: #666;">w:</span> <a href="https://kenco.nz" style="color: #0d9488; text-decoration: none;">kenco.nz</a>
    </td>
  </tr>
</table>
```

**Preview:**

```
┌─────────────┬────────────────────────────────┐
│   [LOGO]    │ Kendyl Carikas                 │
│             │ Kenco Ltd                      │
│             │                                │
│             │ m: +64 21 029 66718            │
│             │ e: kendyl.carikas@kenco.nz     │
│             │ w: kenco.nz                    │
└─────────────┴────────────────────────────────┘
```

---

## Email Signature Template 2: Compact

```html
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 13px; color: #333;">
  <tr>
    <td>
      <img src="https://kenco.nz/assets/images/logo.png" alt="Kenco Ltd" width="100" style="display: block; margin-bottom: 8px;" />
      <strong style="color: #0d9488;">Kendyl Carikas</strong> | Kenco Ltd<br />
      +64 21 029 66718 | <a href="mailto:kendyl.carikas@kenco.nz" style="color: #0d9488; text-decoration: none;">kendyl.carikas@kenco.nz</a><br />
      <a href="https://kenco.nz" style="color: #0d9488; text-decoration: none;">kenco.nz</a>
    </td>
  </tr>
</table>
```

---

## Email Signature Template 3: With Tagline

```html
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
  <tr>
    <td style="padding-right: 15px; vertical-align: top;">
      <img src="https://kenco.nz/assets/images/logo.png" alt="Kenco Ltd" width="120" style="display: block;" />
    </td>
    <td style="border-left: 2px solid #0d9488; padding-left: 15px; vertical-align: top;">
      <strong style="font-size: 16px; color: #0d9488;">Kendyl Carikas</strong><br />
      <span style="color: #666;">Kenco Ltd</span><br />
      <span style="font-size: 12px; font-style: italic; color: #0d9488;">Effective Infection Control</span><br />
      <br />
      <span style="color: #666;">m:</span> +64 21 029 66718<br />
      <span style="color: #666;">e:</span> kendyl.carikas@kenco.nz<br />
      <span style="color: #666;">w:</span> <a href="https://kenco.nz" style="color: #0d9488; text-decoration: none;">kenco.nz</a>
    </td>
  </tr>
</table>
```

---

## Email Signature Template 4: Two-Column with Products

```html
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 13px; color: #333;">
  <tr>
    <td colspan="2" style="padding-bottom: 10px;">
      <img src="https://kenco.nz/assets/images/logo.png" alt="Kenco Ltd" width="120" style="display: block;" />
    </td>
  </tr>
  <tr>
    <td style="padding-right: 20px; vertical-align: top;">
      <strong style="font-size: 15px; color: #0d9488;">Kendyl Carikas</strong><br />
      Kenco Ltd<br />
      <br />
      m: +64 21 029 66718<br />
      e: kendyl.carikas@kenco.nz<br />
      w: <a href="https://kenco.nz" style="color: #0d9488; text-decoration: none;">kenco.nz</a>
    </td>
    <td style="border-left: 1px solid #ddd; padding-left: 20px; vertical-align: top; font-size: 11px; color: #666;">
      <strong style="color: #0d9488;">Our Solutions:</strong><br />
      • Endurocide® Antimicrobial Curtains<br />
      • ShadeCare Window Furnishings<br />
      • Country-Wide Installation Services
    </td>
  </tr>
</table>
```

---

## How to Install Email Signatures

### Gmail (Web)

1. Open Gmail Settings (gear icon → See all settings)
2. Scroll to "Signature" section
3. Click "Create new" and name it (e.g., "Kenco Signature")
4. Click the "Insert image" icon and paste the image URL: `https://kenco.nz/assets/images/logo.png`
5. Add your text content below the image
6. Format with the text editor
7. Click "Save Changes"

**Note:** Gmail web doesn't support full HTML, so use the visual editor instead.

### Outlook (Desktop)

1. Open Outlook → File → Options → Mail → Signatures
2. Click "New" to create a new signature
3. Click the "Insert Picture" icon
4. In the dialog, paste: `https://kenco.nz/assets/images/logo.png`
5. Add your text content
6. Format using the toolbar
7. Click "OK"

### Outlook (Web/Office 365)

1. Click Settings (gear icon) → View all Outlook settings
2. Go to Mail → Compose and reply
3. Under "Email signature", paste the HTML template
4. Click "Save"

### Apple Mail

1. Open Mail → Preferences → Signatures
2. Select your email account
3. Click "+" to create new signature
4. **Important:** Uncheck "Always match my default message font"
5. Create signature in Mail's editor
6. To add logo: Drag image file directly into the signature editor
7. Close preferences (auto-saves)

**For HTML signatures in Apple Mail:**
1. Create the signature with placeholder text
2. Close Mail
3. Open Terminal and run:
   ```bash
   open ~/Library/Mail/V*/MailData/Signatures/
   ```
4. Find your signature file (open each .mailsignature file)
5. Replace content between `<body>` tags with your HTML
6. Save and reopen Mail

---

## Customization Guide

### Change Name and Contact Info

Replace these placeholders in any template:

- **Name:** `Kendyl Carikas` → Your name
- **Phone:** `+64 21 029 66718` → Your phone
- **Email:** `kendyl.carikas@kenco.nz` → Your email

### Change Colors

The brand color is `#0d9488` (teal). To change:

- Replace all instances of `#0d9488` with your preferred color
- Use hex color codes (e.g., `#0066cc` for blue)

### Adjust Logo Size

Change the `width` attribute:

```html
<img src="https://kenco.nz/assets/images/logo.png" width="120" />
```

Recommended sizes:
- **Standard:** 120-150px
- **Compact:** 80-100px
- **Large:** 150-180px

---

## Testing Your Signature

1. **Send a test email** to yourself
2. **Check on multiple devices:**
   - Desktop email client
   - Webmail (Gmail, Outlook.com)
   - Mobile phone
3. **Verify images load** correctly
4. **Check formatting** is preserved

---

## Troubleshooting

### Images Not Loading

**Problem:** Image shows as broken link or doesn't display

**Solutions:**
1. Verify the URL is correct: `https://kenco.nz/assets/images/logo.png`
2. Check that the image was deployed to production
3. Try opening the URL directly in a browser
4. Some email clients block external images by default - recipients may need to "Show images"

### Formatting Broken

**Problem:** Signature looks different than expected

**Solutions:**
1. Use tables instead of divs for better email client compatibility
2. Use inline styles (not CSS classes)
3. Avoid complex CSS (flexbox, grid, etc.)
4. Test in multiple email clients

### Signature Too Large

**Problem:** Signature takes up too much space

**Solutions:**
1. Reduce logo width to 80-100px
2. Use Template 2 (Compact) instead
3. Remove extra line breaks
4. Use smaller font size (12-13px)

---

## Best Practices

✅ **Do:**
- Keep signatures under 200px tall
- Use web-safe fonts (Arial, Helvetica, Georgia)
- Include essential contact info only
- Test on multiple email clients
- Use absolute URLs for images (https://...)
- Optimize images (under 100KB)

❌ **Don't:**
- Use JavaScript or interactive elements
- Include large images (over 500KB)
- Use background images (poor support)
- Add too many links (looks spammy)
- Use animated GIFs (unprofessional)
- Include social media icons unless necessary

---

## Legal Disclaimer (Optional)

Add to the bottom of your signature if required:

```html
<p style="font-size: 10px; color: #999; margin-top: 10px;">
  This email and any attachments are confidential and may contain privileged information. 
  If you are not the intended recipient, please notify the sender immediately and delete this email.
</p>
```

---

## Support

For questions or custom signature requests, refer to this guide or contact your IT administrator.

**Last Updated:** January 2026
