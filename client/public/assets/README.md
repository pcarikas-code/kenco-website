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
3. Deploy to production: `cd /opt/kenco-website && git pull origin main && ./build.sh && ./deploy.sh`
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
