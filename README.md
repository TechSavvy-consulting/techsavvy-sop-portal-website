# TechSavvy SOP Portal Website v2

Static marketing website for the TechSavvy SOP Portal.

## What changed

- Rebuilt the top hero around a clearer small-business pain point.
- Kept the existing TechSavvy colors, logo, background, video, and product screenshots.
- Added stronger positioning around AI-assisted SOP creation, QR-code mobile access, training, checklists, manager control, and change requests.
- Added a clickable screenshot gallery with larger-image modal views and feature details.
- Added mobile-responsive layout, accessible labels, keyboard-friendly modal close behavior, SEO metadata, and structured data.
- Preserved the simple static hosting model and port number.

## Run locally

```powershell
cd C:\Codex\license-admin\sop-portal-website-v2
python -m http.server 8023
```

Then open:

```text
http://localhost:8023
```

On macOS/Linux:

```bash
cd sop-portal-website-v2
python3 -m http.server 8023
```

## Files

```text
index.html
styles.css
script.js
assets/
  brand/       logos and favicon
  screens/     full-size software screenshots
  screens/thumbs/ optimized thumbnail previews
  video/       commercial video, captions, and poster image
```

## Contact form

The form is static and opens a prefilled email to:

```text
sales@techsavvy.consulting
```

For production, replace the JavaScript mailto behavior with Formspree, HubSpot, Wix, or your preferred form handler.

## Suggested production edits

1. Confirm final CTA wording: “Book a demo,” “Request a call back,” or “Schedule SOP Portal walkthrough.”
2. Confirm whether “Included for qualifying managed clients” should be more specific.
3. Replace or add any real customer proof, testimonials, implementation examples, or screenshots from current releases.
4. Set the final production URL in Open Graph/canonical tags if desired.
5. Compress the MP4 further for public web hosting if bandwidth is a concern.
