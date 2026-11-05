# Design context: Migros Mobilje

- client_name: Migros Mobilje
- Claude Design link: https://claude.ai/artifact/9ZJMGX9J4iVnPzwfuQj3SU (boards: "Faqja, desktop" 1440 wide, "Faqja, telefon" 390 wide)
- Design version synced: 1793887443-c2db (5 Nov 2026, second version)
- Brief: migros-mobilje-design-brief.md (Project "Migros-Mobilje", claude/ folder)
- Profile: migros-mobilje-profile.md
- Photo credits: photo-credits.md (Project) and `credits` in lib/content.ts

## Build status (5 Nov 2026)
- Code written from the design: layout, tokens, copy, loader, header, hero, sections, call bar, 13 photos bundled.
- NOT built: npm registry was unreachable from the workspace, and access to a folder on the user's computer was declined. No install, build, run or screenshot comparison has been done. TypeScript syntax check only (no syntax errors; missing-package errors expected).

## Changes in the second design version (applied)
- Hero scrim lighter on the right (end opacity 0.14 to 0.3).
- Koleksionet tiles: photo on top (4:3) with text below on a card, hover background, warm tint on Garnitura and Dhoma e gjumit.
- Bedroom cards: scrim 0.64, no hover zoom.
- Kuzhina dhe interiere: columns swapped (text 5fr, photo 7fr), taller photo.
- Real stock photos replace the texture crops; new Albanian alt texts per photo; hero alt text changed.

## Decisions
- Language Albanian, standard, formal "ju".
- Goal: visit a showroom. Secondary: call 049 998 999.
- Hero: still photo with scroll-driven camera move (video optional, off).
- Social links use the real profile URLs from the research (the design used search URLs).
- The design adds a "Kuzhina dhe interiere të plota" section between the bedroom cards and Lokalet; copy is from the brief.
- The photos show furniture and rooms, not only textures (brief section 8 said textures only). They are stock, credited, and not labelled as client products.
- Albanian copy pass (5 Nov 2026, albanian-natural-writing): one change in code, the map link label «Hape në hartë» became «Hapeni në hartë» (the site uses «ju» everywhere, so the imperative takes the plural form; ALB-77, ALB-80). The Claude Design canvas and the brief still say «Hape në hartë».
- Changes after the user's review (5 Nov 2026, in code only; the Claude Design canvas still has the old versions): (1) Facebook and Instagram are round icon buttons in Kontakti and the footer (aria-labels keep the names); (2) section backgrounds differ: Koleksionet #2B2521 (surface-2), Dhoma e gjumit #15110F (bg), Kuzhina dhe interiere #3B2D22 (new token --walnut).
- Dhoma e gjumit background changed to beige #E3D6C3 (new token --beige, 5 Nov 2026, in code only; the canvas still has the old version). Heading is dark (11.9:1), closing line uses --beige-muted #5A4E44 (5.6:1), card text stays cream on the photo cards. Section order of backgrounds is now: Koleksionet #2B2521, Dhoma e gjumit beige, Kuzhina walnut #3B2D22, Lokalet light, Kontakti #15110F.
- Koleksionet background made slightly lighter: #2B2521 to #4F4339 after a second round (token --surface-3, 5 Nov 2026, in code only; text 8.5:1, muted intro 4.9:1). Tiles stay #15110F, so they stand out a little more.
