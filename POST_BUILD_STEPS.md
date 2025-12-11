# Post-Docker Build Steps for Kenco Website

## Step 1: Verify Docker Image
```bash
sudo docker images | grep kenco-website
```
Should show: `kenco-website   latest   <image-id>   <time>   <size>`

## Step 2: Create Container in Portainer

1. Open Portainer → Containers → + Add container
2. Fill in:
   - **Name**: `kenco-website`
   - **Image**: `kenco-website:latest`
   
3. **Port Mapping**:
   - Host: `3000`
   - Container: `3000`
   
4. **Environment Variables** (click "+ add environment variable" for each):
   ```
   DATABASE_URL=postgresql://kenco_user:YOUR_PASSWORD@host.docker.internal:5432/kenco_website
   AWS_ACCESS_KEY_ID=your_key_here
   AWS_SECRET_ACCESS_KEY=your_secret_here
   AWS_REGION=ap-southeast-2
   SES_FROM_EMAIL=noreply@kenco.nz
   SES_TO_EMAIL=web@kenco.nz
   JWT_SECRET=nW4ivhTtzp0swpcghJHzWXAdW1UKeN8ABr41zGNbfD5mWro+xanSy+Css/MiR4KW
   NODE_ENV=production
   PORT=3000
   VITE_APP_TITLE=Kenco Ltd - Infection Control Solutions
   VITE_APP_LOGO=/logo.svg
   ```

5. **Network** → **Extra hosts**:
   - Add: `host.docker.internal:host-gateway`

6. **Restart policy**: Select "Unless stopped"

7. Click **Deploy the container**

## Step 3: Run Database Migrations
```bash
sudo docker exec -it kenco-website npm run db:push
```

## Step 4: Configure Nginx Reverse Proxy in Plesk

1. Plesk → kenco.nz → Apache & nginx Settings
2. Scroll to "Additional nginx directives"
3. Paste:
```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```
4. Click OK

## Step 5: Enable SSL Certificate

1. Plesk → kenco.nz → SSL/TLS Certificates
2. Click "Install" or "Renew" for Let's Encrypt
3. Wait for certificate to be issued

## Step 6: Test Website

Visit: https://kenco.nz

Test:
- Homepage loads
- Navigation works
- Contact form submits
- Check email delivery

## Troubleshooting

**Container won't start:**
```bash
sudo docker logs kenco-website
```

**Database connection issues:**
- Verify DATABASE_URL is correct
- Check PostgreSQL is running
- Verify host.docker.internal resolves

**Website not accessible:**
- Check container is running: `sudo docker ps`
- Check nginx config: Plesk → Apache & nginx Settings
- Check firewall: ports 80 and 443 open

## Updating the Website

When you need to update the code:

```bash
# Pull latest code
cd /opt/kenco-website
sudo git pull origin main

# Rebuild image
sudo docker build -t kenco-website:latest .

# Restart container
sudo docker restart kenco-website
```

Or use Portainer:
1. Stacks → kenco-website → "Update the stack"
2. Check "Pull and redeploy"
3. Click "Update"
