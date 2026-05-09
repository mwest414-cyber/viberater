import sharp from "sharp";
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const W = 1200;
const H = 630;

// Embed the font as base64 for SVG text rendering — sharp uses librsvg which supports embedded fonts
import { readFileSync } from "node:fs";
const fontBold = readFileSync(join(root, "public/fonts/SpaceGrotesk-Bold.ttf")).toString("base64");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <style>
      @font-face {
        font-family: 'SpaceGrotesk';
        font-weight: 700;
        src: url('data:font/truetype;base64,${fontBold}') format('truetype');
      }
    </style>
    <radialGradient id="glow" cx="50%" cy="0%" r="60%">
      <stop offset="0%" stop-color="#D7FF3A" stop-opacity="0.13"/>
      <stop offset="100%" stop-color="#D7FF3A" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="#0A0A0A"/>

  <!-- Ambient glow -->
  <ellipse cx="${W / 2}" cy="0" rx="600" ry="380" fill="url(#glow)"/>

  <!-- Logo mark: outer rings -->
  <circle cx="${W / 2}" cy="${H / 2 - 60}" r="52" stroke="#D7FF3A" stroke-width="1.5" stroke-opacity="0.35" fill="none"/>
  <circle cx="${W / 2}" cy="${H / 2 - 60}" r="38" stroke="#D7FF3A" stroke-width="1.5" stroke-opacity="0.55" fill="none"/>

  <!-- Logo mark: teardrop -->
  <path d="M${W / 2} ${H / 2 - 112}
    C${W / 2 - 19.6} ${H / 2 - 112}, ${W / 2 - 32} ${H / 2 - 95.2}, ${W / 2 - 32} ${H / 2 - 84}
    C${W / 2 - 32} ${H / 2 - 64}, ${W / 2 - 16} ${H / 2 - 44}, ${W / 2 - 1.6} ${H / 2 - 23}
    C${W / 2 - 0.8} ${H / 2 - 21.8}, ${W / 2 + 0.8} ${H / 2 - 21.8}, ${W / 2 + 1.6} ${H / 2 - 23}
    C${W / 2 + 16} ${H / 2 - 44}, ${W / 2 + 32} ${H / 2 - 64}, ${W / 2 + 32} ${H / 2 - 84}
    C${W / 2 + 32} ${H / 2 - 95.2}, ${W / 2 + 19.6} ${H / 2 - 112}, ${W / 2} ${H / 2 - 112} Z"
    fill="#D7FF3A"/>

  <!-- Logo mark: pupil -->
  <circle cx="${W / 2}" cy="${H / 2 - 85}" r="9" fill="#0A0A0A"/>

  <!-- Wordmark -->
  <text
    x="${W / 2}"
    y="${H / 2 + 30}"
    font-family="SpaceGrotesk, sans-serif"
    font-weight="700"
    font-size="96"
    letter-spacing="-3"
    fill="#FAFAF7"
    text-anchor="middle"
    dominant-baseline="auto"
  >viberater</text>

  <!-- Tagline -->
  <text
    x="${W / 2}"
    y="${H / 2 + 82}"
    font-family="SpaceGrotesk, sans-serif"
    font-weight="400"
    font-size="26"
    letter-spacing="-0.3"
    fill="#7A7A75"
    text-anchor="middle"
  >know the vibe before you come inside.</text>

  <!-- Domain -->
  <text
    x="${W / 2}"
    y="${H - 44}"
    font-family="SpaceGrotesk, sans-serif"
    font-weight="400"
    font-size="16"
    letter-spacing="2"
    fill="#2E2E2C"
    text-anchor="middle"
  >getviberater.co</text>
</svg>`;

const outDir = join(root, "public/images/og");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "default.png");

await sharp(Buffer.from(svg))
  .png()
  .toFile(outPath);

console.log(`Generated ${outPath}`);
