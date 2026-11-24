# Make Hay

Make Hay prices scything work. Draw patches on a satellite map, give each one a difficulty, and get a quote including travel.

**Open the app:** https://harvgorst.github.io/make-hay/

## Put it on your phone's home screen

- **iPhone / iPad:** open the link in Safari, tap Share, then **Add to Home Screen** with **Open as Web App** on. It then runs full screen.
- **Android:** open the link in Chrome, tap ⋮, then **Install app** (or **Add to Home screen**).

Your jobs and rates are saved on the device you use, not in this repository. When a new version is published, the app shows **A new version of Make Hay is ready · Update**.

## Version 1.7.3

Fixes from a round of testing:
- Settings jump links no longer push the sheet out of place, which could leave a blank strip that wouldn't reopen.
- The Undo message now appears under the top bar on phones, so it can't cover the draw bar, hints or the patch bar. It goes away when you start drawing or switch jobs.
- The sheet can't be opened by accident while drawing.
- Closing the sheet from Saved jobs or Settings goes back to the Job view, so the total and Copy quote are always in the strip.
- "Use standard rates" asks for its second tap again after you switch units.
- "Use map centre as home" uses the middle of the map you can see. Opening the sheet no longer moves the map.
- With rounding on, the total never drops below the minimum charge.
- Search closes the sheet and puts the place in the middle of the visible map. When offline it says so.
- The difficulty guide stays below the top bar on small phones.
- Saved jobs and Settings end clear of the iPhone home bar.
- Rates, travel and minimum can't be negative. Rates typed in m² or ft² keep to whole £20s per acre, and earlier-rate sets show the figures they'd apply.
- Quote lines add up exactly to the scything total.
- If copying fails, the quote opens selected in the sheet. The feedback fallback no longer rewrites your message.
- Larger tap targets, a red "Delete?" on saved jobs, and thousands commas on large acre figures.
- A little more space above the search bar.

## Version 1.7.2

- The job sheet opens to about two-thirds of the screen again. If the patches would be hidden, the map still moves them into the strip above it.

## Version 1.7.1

- New fonts: Barlow for text and Barlow Semi Condensed for areas and prices, in the style of road signs and farm machinery lettering.

## Version 1.7.0

- Rates are whole £20s per acre. Your saved rates were rounded once to the nearest £20, and the rate boxes now step in £20. The standard rates are £1,460, £1,540, £1,700 and £1,780 per acre.
- Patch cards are about half the height. They show the name and price large, with the area underneath, and the difficulty, Guide and Delete in one row. Delete needs a second tap. The difficulty description is in Guide.
- The job sheet opens to half the screen, and the map moves so the job's patches stay in view above it.
- The line you draw is cream instead of blue, and the draw bar sits clear of the map credits.
- The search box says "Search place", the ▲ on the strip is gone (tap or drag the strip), and map labels say "Medium" rather than "medium".

## Version 1.6.5

- The open job sheet loses the empty row above the tabs, giving the map more room.
- The difficulty mix is one stacked colour bar.
- The £ sign in totals and prices matches the text type, so it no longer looks small and raised.
- Tabs no longer stay greyed after you tap them.
- Fix: tapping the grab bar opens and closes the sheet reliably.

## Version 1.6.4

- Fix: rounded corners now show on every button, menu and box, including Draw, Locate, Copy quote and the difficulty menus, and are a touch rounder.

## Version 1.6.3

- Slightly rounded corners on buttons, boxes and cards.

## Version 1.6.2

- The bottom strip and patch bar sit about 20px lower, closer to the bottom edge.

## Version 1.6.1

- Back to iOS's own status bar so there's no strip at the bottom; the search bar and buttons sit close to the top. On iPhone, re-add the icon once.

## Version 1.6.0

- The top bar runs up behind the clock in one continuous colour: moss green in light mode, dark green in dark mode. The search bar and buttons sit just under the clock. On iPhone, re-add the icon once.

## Version 1.5.0

- A solid top bar holds search, location and Draw, with the status bar in the same colour. The map sits between the top bar and the bottom panel, which removes the black strip iPhones left at the bottom. On iPhone, re-add the icon once.
- Tapping a patch scrolls the whole patch into view above the patch bar.

## Version 1.4.1

- Fix: the strip iPhones leave below the app now matches the bottom panel instead of showing black.

## Version 1.4.0

- New logo: a scythe shaped like a £, cutting grass. It's used for the home-screen icon, the browser tab and the launch screen. On iPhone, re-add the icon once to see it.

## Version 1.3.0

- Launch screen: Make Hay's mark on moss green (dark green in dark mode) while the app starts, held until the map has drawn. On iPhone, re-add the icon to the home screen once to get it.

## Version 1.2.0

- Difficulty guides: a one-line description of each rating under the rates in Settings, on each patch card, and in a **Guide** list you can pick from while editing a patch.

## Version 1.1.0

- Patch bar: a grab bar and **Done** to finish editing. **Delete patch** moves to the bottom and needs a second tap.
- Tapping or dragging the map tucks the job sheet away.
- The Undo message always sits above the bottom panel.
- On iPhones, the home-screen app paints the strip iOS sometimes leaves at the bottom.
- Icons replace symbol characters.

## Version 1.0.1

- Fix: double-tapping a corner now removes it on iPhone.

## Version 1.0.0

- **Map**: satellite imagery with road and place-name labels, address and postcode search, and your current location.
- **Patches**: draw round an area corner by corner, with Undo, Finish and Cancel. Drag corners to reshape, double-tap a corner to remove it, and delete a patch with Undo.
- **Difficulty**: Easy, Medium, Hard or Very hard, each with its own rate. Coloured bars show the job's mix of difficulties.
- **Units**: acres, m² or ft² for areas and rates.
- **Travel**: driving distance from your home base, with a rate per mile, free miles and return journey. It can be switched off, or waived for a single job.
- **Quotes**: a running total that can be rounded to the nearest £10, with an optional minimum charge. Copy quote gives a dated text quote with your business name and phone, and no difficulty names.
- **Saved jobs**: any number of jobs, kept on the device.
- **Phone-first layout**: full-screen map, a bottom sheet that tucks away, a patch bar for editing, and room left for the notch and home bar.
- **Feedback**: send feedback from Settings.
