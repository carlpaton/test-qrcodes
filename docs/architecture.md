# Architecture

A browser-based QR code scanner. No build step, no framework, no backend — plain HTML, CSS, and JavaScript deployed as a static site via GitHub Pages.

## File structure

```
test-qrcodes/
├── index.html          # Shell: DOM structure and script tags
├── style.css           # All styling
├── app.js              # All behaviour
├── docs/
│   └── architecture.md
└── .github/
    └── workflows/
        └── static.yml  # GitHub Pages deploy on push to main
```

## How it works

### Startup

The page loads with one visible button ("Scan QR Code"). The `#reader` viewport, `#result` panel, and Stop button are all hidden via the `hidden` attribute.

### Scanning flow

```
User clicks "Scan QR Code"
  → startScanning()
      → Html5Qrcode instance created, mounted into #reader div
      → scanner.start() opens rear camera (facingMode: environment)
          → on success decode: stopScanning() called, decoded text shown in #result
          → on camera error: error message shown, buttons reset to initial state

User clicks "Stop Scanning"
  → stopScanning()
      → scanner.stop() + scanner.clear() releases the camera
      → scanner set to null

User clicks "Scan Again"
  → result panel hidden
  → startScanning() called (same flow as above)
```

### State

A single module-level variable `scanner` tracks the active `Html5Qrcode` instance, or `null` when idle. Button visibility is toggled via `hidden` attributes rather than CSS classes.

### Third-party library

[html5-qrcode](https://github.com/mebjas/html5-qrcode) v2.3.8 is loaded from `unpkg.com` CDN. It wraps the browser `MediaDevices` API and handles camera permission requests, video stream rendering inside the `#reader` div, and QR decoding at 10 fps within a 250×250 px detection box. Licensed under **Apache 2.0** — free for commercial use; attribution required in distributed products.

### Styling

`style.css` is mobile-first and uses `system-ui` font, flexbox layout capped at 480 px, and `100dvh` for full-viewport height on mobile. No media queries — the single-column layout works across all screen sizes.

## Deployment

Pushes to `main` trigger the GitHub Actions workflow (`.github/workflows/static.yml`), which uploads the repository root as a Pages artifact and deploys it. No build step is needed — files are served as-is.

The scanner requires camera access and **must be served over HTTPS**. GitHub Pages satisfies this requirement.
