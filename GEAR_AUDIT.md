# Gearing catalog audit

Scope: every pre-existing Shimano/SRAM road and gravel catalog row, plus the
missing Ultegra R8000 and SRAM AXS D1/D2 families below. This is not a complete
historical catalog or a compatibility checker. Entries include manufacturer
replacement and power-meter rings, not just rings shipped on complete cranksets.
Cassette options are a union of the documented family offerings; derailleur cage,
frame clearance, chain, chainline and generation restrictions still apply.

Full source URLs are next to the corresponding rows and cassette tables in
`src/data/gears.ts`. Archived SRAM products use `/en/service/models/` pages;
their former `/en/sram/models/` pages often return 404. Shimano's technical-index
pages do not expose their specification tables without JavaScript, so indexed
manufacturer product sheets, exploded-view PDFs and named retailers were also
checked.

## Changed existing rows (before → after)

Unmentioned cassette or chainring options in a row remain unchanged.

| Family | Before | After |
| --- | --- | --- |
| Red AXS E1 2x | 46/33, 48/35, 50/37 | Also 52/39, 54/41, 56/43, from RED OEM power-meter kits |
| Red 1 E1 | 44, 46, 50T | 44, 46, 48, 50, 52, 54, 56, 58, 60, 64, 68T, including OEM aero power-meter rings |
| Force XPLR Wide E1 12s | 42–50T in 2T increments; 10–44 | Also 38/40T OEM replacement rings; also documented 10–36 cassette alternative |
| Force XPLR Wide E1 13s | 42–50T in 2T increments | Also 38/40T standard rings |
| Rival XPLR Wide D1 12s | 40/46T; 10–44 | 38/40/42/44/46T; also 10–36 cassette alternative |
| Rival XPLR Wide 13s | 40/46T | Identified as E1; 38/40/42/44/46T |
| Red XPLR 13s | 40–50T in 2T increments | 38–52T in 2T increments, including OEM aero rings |
| Apex Wide 12s | 40/42T; 11–44 | 38/40/42T; 11–44, 10–44, 10–36 (10–36 requires AXS, not mechanical Apex) |
| Eagle Transmission gravel mullet | 40/42T | 38–50T in 2T increments, using wide road cranksets and OEM road rings, not MTB cranksets |

Important sources:
- [RED 2x E1 power-meter kit](https://www.sram.com/en/sram/models/pm-axs-kitr-e1)
- [RED 1x E1 power-meter kit](https://www.sram.com/en/sram/models/pm-axs-kita-e1)
- [Force XPLR crank/ring options](https://support.sram.com/hc/en-us/articles/36350480733979-What-crankset-is-available-for-the-Force-XPLR-AXS-groupset)
- [XPLR OEM replacement rings](https://support.sram.com/hc/en-us/articles/6042832708763-What-size-direct-mount-XPLR-chainrings-do-you-offer)
- [RED XPLR gearing](https://support.sram.com/hc/en-us/articles/27120246587931-What-gearing-options-are-available-with-the-SRAM-RED-XPLR-AXS-groupset)
- [Apex gearing and AXS/mechanical restrictions](https://support.sram.com/hc/en-us/articles/16376973379867-What-gearing-options-are-available-for-12-speed-Apex-groupsets)
- [Transmission gravel adventure configuration](https://support.sram.com/hc/en-us/articles/13819655363099-Is-there-an-Adventure-build-configuration-for-SRAM-Eagle-AXS-Transmission-on-road-and-gravel-bikes)

## Added families (previously absent)

| Family | Chainring options | Cassette ranges |
| --- | --- | --- |
| Shimano Ultegra R8000 11s | 46/36, 50/34, 52/36, 53/39 | 11–25, 11–28, 11–30, 11–32, 12–25, 14–28; 11–34 via HG800 |
| Red AXS D1 2x | 46/33, 48/35, 50/37; OEM power-meter 52/39, 54/41, 56/43 | 10–26, 10–28, 10–33 |
| Force AXS D1 2x | 46/33, 48/35; power-meter 50/37 | 10–26, 10–28, 10–30, 10–33, 10–36 |
| Force AXS D2 2x | 46/33, 48/35, 50/37 | 10–26, 10–28, 10–30, 10–33, 10–36 |
| Red 1 D1 | 36–50T in 2T increments; 54T power-meter ring | 10–26, 10–28, 10–33 |
| Force 1 D1 | 36–48T in 2T increments | 10–26, 10–28, 10–30, 10–33, 10–36 |
| Force AXS Wide D1/D2 2x | 43/30 | 10–28, 10–30, 10–33, 10–36 |
| Force XPLR Wide D2 12s | 38–50T in 2T increments, including OEM aero rings | 10–44, 10–36 |
| Red XPLR Wide D1 12s | 38–50T in 2T increments, including OEM aero rings | 10–44, 10–36 |

New complete cassette sequences:
- Shimano 11s 11–25: **11-12-13-14-15-16-17-19-21-23-25**.
- Shimano 11s 14–28: **14-15-16-17-18-19-20-21-23-25-28**.
- SRAM AXS 12s 10–26: **10-11-12-13-14-15-16-17-19-21-23-26**.

The previously present full cog sequences were rechecked and retained.

## Audited and retained

| Family | Chainrings | Cassette ranges |
| --- | --- | --- |
| Dura-Ace R9200 12s | 46/36, 50/34, 52/36, 54/40 | 11–30, 11–34 |
| Ultegra R8100 12s | 46/36, 50/34, 52/36 | 11–30, 11–34 |
| 105 R7100 12s | 50/34, 52/36 | 11–34, 11–36 |
| 105 R7000 11s | 50/34, 52/36, 53/39 | 12–25, 11–28, 11–30, 11–32, 11–34 |
| GRX RX820 12s 2x | 48/31 | 11–34, 11–36 |
| GRX RX820 12s 1x | 40/42/44/46T | 10–45, 10–51 |
| GRX RX610 12s | 46/30; 38/40T | 11–34, 11–36, 10–45, 10–51 |
| GRX RX800 11s | 48/31; 40/42T | 11–30, 11–32, 11–34, 11–40, 11–42 |
| GRX RX600 11s | 46/30; 40T | 11–30, 11–32, 11–34, 11–40, 11–42 |
| Force AXS E1 2x | 46/33, 48/35, 50/37 | 10–28, 10–30, 10–33, 10–36 |
| Rival AXS D1 and E1 2x | 46/33, 48/35 | 10–30, 10–36 |
| Force 1 E1 | 44/46/48/50T | 10–28, 10–30, 10–33, 10–36 |
| Rival AXS Wide D1 2x | 43/30 | 10–30, 10–36 |

**Force E1 52/39 was not added:** both the
[manufacturer crankset specification](https://www.sram.com/en/sram/models/fc-frc-e1)
and OEM Force thread-mount power-meter chainrings list only 46/33, 48/35 and
50/37. RED's 52/39 kit is not a Force-branded factory gearing option. RED E1's
larger doubles are nevertheless included because its own OEM kit explicitly
offers them. Compatibility with aftermarket substitutions is outside this audit.
