# tools — look at the page before claiming it works

Two scripts that turn "the build passed" into "I have seen it".

```bash
npm run build && npm start          # or: npm run dev
node tools/shoot.js http://localhost:3000/ shot.png
node tools/slice.js shot.png shots/ 1150
```

`shoot.js` drives headless Chrome over the DevTools Protocol (no
dependencies — Node 22+ has a global `WebSocket`). It keeps a **real**
1440x900 viewport, scrolls the whole page once so every GSAP reveal fires,
returns to the top, waits for the scrubbed hero parallax to settle, then
captures beyond the viewport in a single image.

Two things it exists to avoid:

- `chrome --headless --screenshot --window-size=1440,7800` makes every
  `100vh` block 7800px tall, so the layout captured is not the layout anyone
  sees.
- A single shot of an unscrolled page is mostly blank, because `.reveal`
  elements start at `visibility: hidden` and only fire on scroll.

`slice.js` cuts the tall PNG into readable chunks.

The Chrome path at the top of `shoot.js` is hardcoded for this machine.
