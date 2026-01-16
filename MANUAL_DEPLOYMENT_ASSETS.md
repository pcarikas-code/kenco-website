# Manual Deployment Instructions - Public Assets Folder

Due to checkpoint save issues, here are the manual deployment instructions for the public assets folder.

## Files to Upload

### 1. Create Directory Structure

SSH into your Plesk server and create the assets directory:

```bash
ssh root@kenco.nz
cd /opt/kenco-website/client/public
mkdir -p assets/images
```

### 2. Upload Image Files

Copy these three image files from the existing public directory:

```bash
cd /opt/kenco-website/client/public
cp logo.png assets/images/
cp endurocide-logo.jpg assets/images/
cp shadecare-logo.png assets/images/
```

### 3. Create README File

Create `/opt/kenco-website/client/public/assets/README.md` with the following content:

```markdown
# Public Assets Folder

This folder contains publicly accessible images and files that can be used in external applications such as email signatures, presentations, and third-party integrations.

## Usage

All files in this folder are accessible via the web at:

```
https://kenco.nz/assets/images/[filename]
```

## Available Images

### Brand Logos

- **`logo.png`** - Main Kenco logo with spiral "o"
  - URL: `https://kenco.nz/assets/images/logo.png`
  - Use for: Email signatures, presentations, external apps

- **`endurocide-logo.jpg`** - Endurocide product logo
  - URL: `https://kenco.nz/assets/images/endurocide-logo.jpg`
  - Use for: Product marketing, email campaigns

- **`shadecare-logo.png`** - ShadeCare product logo
  - URL: `https://kenco.nz/assets/images/shadecare-logo.png`
  - Use for: Product marketing, email campaigns

## Email Signature Example

```html
<img src="https://kenco.nz/assets/images/logo.png" alt="Kenco Ltd" width="150" />
```

## Adding New Images

To add new images to this folder:

1. Place the image file in `client/public/assets/images/`
2. Commit and push to GitHub
3. Deploy to production using the deployment scripts
4. Access via `https://kenco.nz/assets/images/[filename]`

## Best Practices

- **File naming:** Use lowercase with hyphens (e.g., `company-logo.png`)
- **File formats:** 
  - PNG for logos with transparency
  - JPG for photos
  - SVG for scalable graphics
- **File size:** Optimize images before uploading (keep under 500KB for email signatures)
- **Dimensions:** For email signatures, recommend 150-200px width

## Notes

- All files in the `client/public/` directory are served statically
- Files are cached aggressively by browsers
- If you replace a file, consider adding a version number or hash to the filename to force cache refresh
- Example: `logo-v2.png` or `logo.abc123.png`

---

**Last Updated:** January 2026
```

### 4. Rebuild and Deploy

After uploading the files, build and deploy:

```bash
cd /opt/kenco-website
./build.sh
./deploy.sh
```

### 5. Verify Deployment

Test that the images are accessible:

```bash
curl -I https://kenco.nz/assets/images/logo.png
curl -I https://kenco.nz/assets/images/endurocide-logo.jpg
curl -I https://kenco.nz/assets/images/shadecare-logo.png
```

You should see `HTTP/2 200` responses.

Or open in browser:
- https://kenco.nz/assets/images/logo.png
- https://kenco.nz/assets/images/endurocide-logo.jpg
- https://kenco.nz/assets/images/shadecare-logo.png

## Email Signature Guide

The complete email signature guide with HTML templates is available in `EMAIL_SIGNATURE_GUIDE.md` in the project root.

You can also download it from the sandbox or I can provide it separately.

## Summary

**What was created:**
- `/assets/images/` folder with 3 brand logos
- README with usage instructions
- Email signature guide with 4 HTML templates

**URLs after deployment:**
- https://kenco.nz/assets/images/logo.png
- https://kenco.nz/assets/images/endurocide-logo.jpg
- https://kenco.nz/assets/images/shadecare-logo.png

**Use cases:**
- Email signatures (Gmail, Outlook, Apple Mail)
- External presentations
- Third-party integrations
- Marketing materials

---

**Questions?** Contact your system administrator or refer to EMAIL_SIGNATURE_GUIDE.md for detailed usage instructions.
