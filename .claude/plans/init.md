# Plan: QR Code Scanner Web App

## Context

Build a simple mobile-friendly web app (HTML + CSS + JS, no build tools) that lets a user tap a button, open their phone camera, scan a QR code, and see the decoded text on screen. The project directory `C:\data\learning\test-qrcodes` is currently empty.

## Approach

Use the **html5-qrcode** library via CDN (`Html5Qrcode` class). It handles camera permissions, stream management, and QR decoding out of the box, and works across Android and iOS browsers. We'll use the lower-level `Html5Qrcode` API (not the scanner-with-UI variant) so we have full control over the page layout.

## Files to Create

All files created in `C:\data\learning\test-qrcodes\`.

### `index.html`
- Mobile-optimised viewport meta tag
- A "Scan QR Code" button
- A `<div id="reader">` container for the camera preview (hidden until scanning)
- A result area that displays the decoded text
- A "Stop" / "Scan Again" button to close the camera and reset
- Loads `html5-qrcode` from CDN (unpkg)
- Links to `style.css` and `app.js`

### `style.css`
- Mobile-first, centred layout
- Large tap-friendly button
- Result text styled for readability
- Camera preview container sized appropriately for phone screens

### `app.js`
- On "Scan" button click: create an `Html5Qrcode` instance, call `start()` with `{ facingMode: "environment" }` (rear camera)
- On successful decode: stop the camera, display the decoded text in the result area
- On "Scan Again": clear the result, ready to scan again
- Basic error handling for camera permission denial

## Verification

1. Open `index.html` in a browser (needs to be served over HTTPS or localhost for camera access — use `npx serve` or similar)
2. Tap "Scan QR Code" — camera should open using the rear camera
3. Point at any QR code — decoded text appears on screen
4. Tap "Scan Again" — result clears, ready for next scan
