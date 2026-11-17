# PLAN-IT

A static campus travel website for IIT Patna: four proposed travel packages, one per destination, campus/airport/railway rides, organiser enquiries on WhatsApp, a video-ready About page, and My Trips with locally recorded bookings and group plans.

## Run

Node.js 22 or newer:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. No accounts, database, CAPTCHA or API keys are required.

## Deploy on Vercel

Import this repository, select **Other**, use `npm run build` as the build command and `dist` as the output directory. The committed `vercel.json` already supplies these values and supports My Trips/group-plan links. Existing environment values from a previous deployment are unused. No server function is deployed. Redeploy after merging the changes.

The canonical site URL defaults to `https://planit-lac.vercel.app`; change `site_url` in `public/content.json` or set the optional public `SITE_URL` build variable when using another domain. No secret environment variables are needed. Do not commit private configuration files.

## Website content

Edit `public/content.json` to change destination packages, the organiser WhatsApp number, support email and testimonial clips. The destinations are Jaipur, Darjeeling, Sikkim and Meghalaya, with one package and one place-appropriate theme label for each. Homepage, catalogue and detail photographs are locally hosted, unwatermarked Unsplash images; photographer/source credits are listed on About and in `docs/PHOTO-CREDITS.md`. These are proposed itineraries, not claims of operator availability. Supplied expected cost ranges are shown as estimates, with their stated inclusions/exclusions. Final prices and cancellation terms require organiser confirmation; packages without an estimate remain on request. Meghalaya’s range has no stated per-person/group basis, so visitors are asked to confirm that basis. Enquiries require a name.

For each real, permissioned testimonial, add an entry to `testimonials`:

```json
{
  "title": "Traveller’s trip story",
  "description": "A short description of the real trip.",
  "src": "/assets/testimonials/trip.mp4",
  "poster": "/assets/testimonials/trip.webp",
  "captions": "/assets/testimonials/trip.vtt"
}
```

Only add files you have permission to publish. Until clips are provided, About displays an empty photo pinboard with captions for future campus memories; there are no invented endorsements or video links. Videos use native controls, `playsinline` and no preload.

## Enquiries and My Trips

Selecting a package or ride fills a WhatsApp draft with the dates, group size, route, vehicle, return departure and pickup instructions. Opening the link saves **Enquiry drafted** on that browser. It does not mean that a message was sent or a booking was confirmed.

After the organisers confirm directly, open the enquiry in My Trips and select **Record as booked**, recording the confirmation date, optional organiser reference and confirmed total. It then appears in the **Booked trips** tab. Completed/cancelled records remain under Past trips. These are personal records made by the visitor, not independently verified tickets or shared live inventory. No online money collection occurs.

Trip data uses browser local storage. It remains after refresh on the same browser and origin; it does not sync across devices. Export/import from My Trips provides a backup and a way to move data. Imports validate records, preserve existing IDs and reject invalid files. Clearing browser data removes local records. A local export can contain names and travel details, so share it only with the intended people.

Group plans retain editable dates/budget, local itinerary notes, manually entered member names and shared expenses. Equal, percentage and custom splits reconcile to integer paise; recorded payments adjust balances. WhatsApp shares a plan or split summary. There are no shared edit sessions or online invitations.

Previous private local files are retained outside the deploy output. If needed, run `node scripts/export-local-trips.js` and import `.local/previous-trips-export.json` through My Trips. This converts compatible previous booking records without changing the original file. No external database, hosted data or provider account is deleted by this change.

## Verification

```sh
npm test
npm run check
npm run build
npx playwright install chromium
npm run test:e2e
```

On a Mac with Chrome installed, set `CHROME_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'` for the browser tests. Tests check enquiry drafts, booking confirmation records, persistence/export/import, local plans, expense rounding, navigation and responsive layouts. CI runs the same build and checks.
