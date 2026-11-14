export interface Series {
  id: string;
  manufacturer: "Shimano" | "SRAM";
  discipline: "Road" | "Gravel";
  name: string;
  fronts: number[][];
  rears: string[];
}
// Shimano technical specifications: https://productinfo.shimano.com/en/spec/road-crankset
// https://productinfo.shimano.com/en/spec/gravel-crankset
// Cassette tooth tables: https://productinfo.shimano.com/en/spec/road-cassette
// https://productinfo.shimano.com/en/spec/mtb-cassette (GRX 1x cassette options only)
// SRAM cassette specifications (full cog sequences):
// https://www.sram.com/en/sram/models/cs-xg-1290-e1
// https://www.sram.com/en/sram/models/cs-xg-1251-d1
// https://www.sram.com/en/sram/models/cs-xg-1391-e1
// https://www.sram.com/en/sram/models/cs-pg-1231-d1
// https://www.sram.com/en/sram/models/cs-xs-1275-a1 (gravel mullet only)
// Historical cassette specifications:
// https://bike.shimano.com/de-DE/products/components/pdp.P-CS-R8000.html
// https://www.sram.com/en/service/models/cs-xg-1290-d1
// https://www.sram.com/en/service/models/cs-xg-1270-d1
// Options include OEM replacement/power-meter chainrings, not just complete cranksets.
// Cassette lists are model-family offerings, not a derailleur compatibility guarantee.
export const cassettes: Record<string, number[]> = {
  "SH12 11-30": [11, 12, 13, 14, 15, 16, 17, 19, 21, 24, 27, 30],
  "SH12 11-34": [11, 12, 13, 14, 15, 17, 19, 21, 24, 27, 30, 34],
  "SH12 11-36": [11, 12, 13, 14, 15, 17, 19, 21, 24, 28, 32, 36],
  "SH11 11-28": [11, 12, 13, 14, 15, 17, 19, 21, 23, 25, 28],
  "SH11 11-30": [11, 12, 13, 14, 15, 17, 19, 21, 24, 27, 30],
  "SH11 11-32": [11, 12, 13, 14, 16, 18, 20, 22, 25, 28, 32],
  "SH11 11-34": [11, 13, 15, 17, 19, 21, 23, 25, 27, 30, 34],
  "SH11 12-25": [12, 13, 14, 15, 16, 17, 18, 19, 21, 23, 25],
  "SH11 11-25": [11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25],
  "SH11 14-28": [14, 15, 16, 17, 18, 19, 20, 21, 23, 25, 28],
  "SH11 11-40": [11, 13, 15, 17, 19, 21, 24, 27, 31, 35, 40],
  "SH11 11-42": [11, 13, 15, 17, 19, 21, 24, 28, 32, 37, 42],
  "SH12 10-45": [10, 12, 14, 16, 18, 21, 24, 28, 32, 36, 40, 45],
  "SH12 10-51": [10, 12, 14, 16, 18, 21, 24, 28, 33, 39, 45, 51],
  "AXS12 10-28": [10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 24, 28],
  "AXS12 10-30": [10, 11, 12, 13, 14, 15, 17, 19, 21, 24, 27, 30],
  "AXS12 10-33": [10, 11, 12, 13, 14, 15, 17, 19, 21, 24, 28, 33],
  "AXS12 10-36": [10, 11, 12, 13, 15, 17, 19, 21, 24, 28, 32, 36],
  "AXS12 10-26": [10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 23, 26],
  "XPLR12 10-44": [10, 11, 13, 15, 17, 19, 21, 24, 28, 32, 38, 44],
  "XPLR12 11-44": [11, 12, 13, 15, 17, 19, 21, 24, 28, 32, 38, 44],
  "XPLR13 10-46": [10, 11, 12, 13, 15, 17, 19, 21, 24, 28, 32, 38, 46],
  "T-Type12 10-52": [10, 12, 14, 16, 18, 21, 24, 28, 32, 38, 44, 52],
};
const sh12 = ["SH12 11-30", "SH12 11-34"];
const axs = ["AXS12 10-28", "AXS12 10-30", "AXS12 10-33", "AXS12 10-36"];
const singles = (...teeth: number[]) => teeth.map((t) => [t]);
export const series: Series[] = [
  // https://powermetercity.com/product/shimano-dura-ace-r9200-12-speed-crankset/
  // https://bike.shimano.com/en-US/product/component/dura-ace-r9200/CS-R9200-12.html
  {
    id: "da",
    manufacturer: "Shimano",
    discipline: "Road",
    name: "Dura-Ace R9200 · 12s",
    fronts: [
      [54, 40],
      [52, 36],
      [50, 34],
      [46, 36],
    ],
    rears: sh12,
  },
  // https://bike.shimano.com/en-US/product/component/ultegra-r8100/FC-R8100.html
  {
    id: "ultegra",
    manufacturer: "Shimano",
    discipline: "Road",
    name: "Ultegra R8100 · 12s",
    fronts: [
      [52, 36],
      [50, 34],
      [46, 36],
    ],
    rears: sh12,
  },
  // https://bike.shimano.com/en-US/product/component/shimano105-r7100-di2/FC-R7100.html
  // https://dassets.shimano.com/content/dam/global/cg1SHICCycling/final/ev/ev/EV-CS-HG710-12-4932.pdf
  {
    id: "105",
    manufacturer: "Shimano",
    discipline: "Road",
    name: "105 R7100 · 12s",
    fronts: [
      [52, 36],
      [50, 34],
    ],
    rears: ["SH12 11-34", "SH12 11-36"],
  },
  // https://si.shimano.com/ko/pdfs/ev/SHIMANO_105_R7000_WOP-001/SHIMANO_105_R7000_WOP_v01.pdf
  {
    id: "105-11",
    manufacturer: "Shimano",
    discipline: "Road",
    name: "105 R7000 · 11s",
    fronts: [
      [53, 39],
      [52, 36],
      [50, 34],
    ],
    rears: [
      "SH11 12-25",
      "SH11 11-28",
      "SH11 11-30",
      "SH11 11-32",
      "SH11 11-34",
    ],
  },
  // https://bike.shimano.com/products/components/pdp.P-FC-R8000.html
  // CS-HG800-11 supplies the 11-34 option alongside CS-R8000.
  // https://www.bikeradar.com/news/shimano-ultegra-r8000-and-ultegra-di2-r8070-all-you-need-to-know
  {
    id: "ultegra-11",
    manufacturer: "Shimano",
    discipline: "Road",
    name: "Ultegra R8000 · 11s",
    fronts: [[53, 39], [52, 36], [50, 34], [46, 36]],
    rears: ["SH11 11-25", "SH11 11-28", "SH11 11-30", "SH11 11-32", "SH11 12-25", "SH11 14-28", "SH11 11-34"],
  },
  // https://bike.shimano.com/en-US/information/news/introducing-shimano-grx-mechanical-12-speed-components.html
  {
    id: "grx2",
    manufacturer: "Shimano",
    discipline: "Gravel",
    name: "GRX RX820 · 12s 2x",
    fronts: [[48, 31]],
    rears: ["SH12 11-34", "SH12 11-36"],
  },
  // The expanded RX820 lineup includes 44T and 46T:
  // https://uemura-cycle.com/products/detail.php?product_id=138121
  {
    id: "grx1",
    manufacturer: "Shimano",
    discipline: "Gravel",
    name: "GRX RX820 · 12s 1x",
    fronts: singles(40, 42, 44, 46),
    rears: ["SH12 10-45", "SH12 10-51"],
  },
  // https://www.pushys.com.au/shimano-grx-fc-rx610-crankset/
  // https://www.cyclingnews.com/news/shimano-drops-two-12-speed-grx-groupsets-new-gravel-wheels/
  {
    id: "grx600-12",
    manufacturer: "Shimano",
    discipline: "Gravel",
    name: "GRX RX610 · 12s",
    fronts: [[46, 30], [38], [40]],
    rears: ["SH12 11-34", "SH12 11-36", "SH12 10-45", "SH12 10-51"],
  },
  // https://www.merlincycles.com/blog/new-shimano-grx/
  // https://bike.shimano.com/en-EU/product/component/deorext-m8000/CS-M8000.html
  {
    id: "grx800",
    manufacturer: "Shimano",
    discipline: "Gravel",
    name: "GRX RX800 · 11s",
    fronts: [[48, 31], [40], [42]],
    rears: [
      "SH11 11-30",
      "SH11 11-32",
      "SH11 11-34",
      "SH11 11-40",
      "SH11 11-42",
    ],
  },
  // https://bike.shimano.com/en-US/product/component/grx-11-speed/FC-RX600-1.html
  {
    id: "grx600",
    manufacturer: "Shimano",
    discipline: "Gravel",
    name: "GRX RX600 · 11s",
    fronts: [[46, 30], [40]],
    rears: [
      "SH11 11-30",
      "SH11 11-32",
      "SH11 11-34",
      "SH11 11-40",
      "SH11 11-42",
    ],
  },
  // Cranksets: https://www.sram.com/en/sram/models/fc-red-e1 and /fc-frc-e1
  // RED OEM power-meter rings add the three larger doubles:
  // https://www.sram.com/en/sram/models/pm-axs-kitr-e1
  {
    id: "red",
    manufacturer: "SRAM",
    discipline: "Road",
    name: "Red AXS E1 · 12s 2x",
    fronts: [
      [50, 37],
      [48, 35],
      [46, 33],
      [52, 39],
      [54, 41],
      [56, 43],
    ],
    rears: axs,
  },
  // https://www.sram.com/en/sram/models/fc-frc-e1 (46/33, 48/35, 50/37; no 52/39)
  {
    id: "force",
    manufacturer: "SRAM",
    discipline: "Road",
    name: "Force AXS E1 · 12s 2x",
    fronts: [
      [50, 37],
      [48, 35],
      [46, 33],
    ],
    rears: axs,
  },
  // https://www.sram.com/en/sram/models/fc-riv-d1
  {
    id: "rival",
    manufacturer: "SRAM",
    discipline: "Road",
    name: "Rival AXS D1 · 12s 2x",
    fronts: [
      [48, 35],
      [46, 33],
    ],
    rears: ["AXS12 10-30", "AXS12 10-36"],
  },
  // https://www.sram.com/en/sram/models/fc-riv-e1
  {
    id: "rival-e1",
    manufacturer: "SRAM",
    discipline: "Road",
    name: "Rival AXS E1 · 12s 2x",
    fronts: [
      [48, 35],
      [46, 33],
    ],
    rears: ["AXS12 10-30", "AXS12 10-36"],
  },
  // https://www.sram.com/en/sram/models/fc-red-1-e1
  // https://www.sram.com/en/sram/models/pm-axs-kita-e1
  {
    id: "red1",
    manufacturer: "SRAM",
    discipline: "Road",
    name: "Red 1 E1 · 12s",
    fronts: singles(44, 46, 48, 50, 52, 54, 56, 58, 60, 64, 68),
    rears: axs,
  },
  // https://www.sram.com/en/sram/models/fc-frc-1-e1 and /fc-apx-1w-d1
  {
    id: "force1",
    manufacturer: "SRAM",
    discipline: "Road",
    name: "Force 1 E1 · 12s",
    fronts: singles(44, 46, 48, 50),
    rears: axs,
  },
  // https://www.sram.com/en/sram/models/fc-frc-1w-e1
  // OEM direct-mount replacement rings also include 38T and 40T:
  // https://support.sram.com/hc/en-us/articles/6042832708763-What-size-direct-mount-XPLR-chainrings-do-you-offer
  {
    id: "force-xplr",
    manufacturer: "SRAM",
    discipline: "Gravel",
    name: "Force XPLR Wide E1 · 12s",
    fronts: singles(38, 40, 42, 44, 46, 48, 50),
    rears: ["XPLR12 10-44", "AXS12 10-36"],
  },
  // https://www.sram.com/en/sram/models/cs-xg-1371-e1
  // https://support.sram.com/hc/en-us/articles/36350480733979-What-crankset-is-available-for-the-Force-XPLR-AXS-groupset
  {
    id: "force-xplr13",
    manufacturer: "SRAM",
    discipline: "Gravel",
    name: "Force XPLR Wide E1 · 13s",
    fronts: singles(38, 40, 42, 44, 46, 48, 50),
    rears: ["XPLR13 10-46"],
  },
  // https://www.sram.com/en/sram/models/fc-riv-1w-d1
  // https://support.sram.com/hc/en-us/articles/6042832708763-What-size-direct-mount-XPLR-chainrings-do-you-offer
  {
    id: "rival-xplr",
    manufacturer: "SRAM",
    discipline: "Gravel",
    name: "Rival XPLR Wide D1 · 12s",
    fronts: singles(38, 40, 42, 44, 46),
    rears: ["XPLR12 10-44", "AXS12 10-36"],
  },
  // https://www.sram.com/en/sram/models/cs-xg-1351-e1
  // https://www.sram.com/en/sram/models/fc-riv-1w-e1
  {
    id: "rival-xplr13",
    manufacturer: "SRAM",
    discipline: "Gravel",
    name: "Rival XPLR Wide E1 · 13s",
    fronts: singles(38, 40, 42, 44, 46),
    rears: ["XPLR13 10-46"],
  },
  // https://www.sram.com/en/sram/models/fc-red-1w-e1
  // https://support.sram.com/hc/en-us/articles/27120246587931-What-gearing-options-are-available-with-the-SRAM-RED-XPLR-AXS-groupset
  {
    id: "red-xplr",
    manufacturer: "SRAM",
    discipline: "Gravel",
    name: "Red XPLR · 13s",
    fronts: singles(38, 40, 42, 44, 46, 48, 50, 52),
    rears: ["XPLR13 10-46"],
  },
  // https://www.sram.com/en/sram/models/fc-apx-1w-d1
  // https://www.sram.com/en/sram/models/cs-pg-1231-d1
  // https://support.sram.com/hc/en-us/articles/16376973379867-What-gearing-options-are-available-for-12-speed-Apex-groupsets
  {
    id: "apex",
    manufacturer: "SRAM",
    discipline: "Gravel",
    name: "Apex Wide · 12s 1x",
    fronts: singles(38, 40, 42),
    rears: ["XPLR12 11-44", "XPLR12 10-44", "AXS12 10-36"],
  },
  // https://support.sram.com/hc/en-us/articles/13819655363099-Is-there-an-Adventure-build-configuration-for-SRAM-Eagle-AXS-Transmission-on-road-and-gravel-bikes
  // Wide road 1x cranks/rings only; no MTB cranksets are listed here.
  {
    id: "mullet",
    manufacturer: "SRAM",
    discipline: "Gravel",
    name: "Eagle Transmission · gravel mullet",
    fronts: singles(38, 40, 42, 44, 46, 48, 50),
    rears: ["T-Type12 10-52"],
  },
  // https://www.sram.com/en/sram/models/fc-riv-w-d1
  {
    id: "rival-wide",
    manufacturer: "SRAM",
    discipline: "Gravel",
    name: "Rival AXS Wide D1 · 12s 2x",
    fronts: [[43, 30]],
    rears: ["AXS12 10-30", "AXS12 10-36"],
  },
  // https://www.sram.com/en/service/models/fc-red-d1
  // https://www.sram.com/en/service/models/pm-axs-kitr-d1
  {
    id: "red-d1",
    manufacturer: "SRAM",
    discipline: "Road",
    name: "Red AXS D1 · 12s 2x",
    fronts: [[50, 37], [48, 35], [46, 33], [52, 39], [54, 41], [56, 43]],
    rears: ["AXS12 10-26", "AXS12 10-28", "AXS12 10-33"],
  },
  // https://www.sram.com/en/service/models/fc-frc-d1
  // https://www.sram.com/en/service/models/pm-frc-d1 (also 50/37)
  // https://www.sram.com/en/service/models/cs-xg-1270-d1
  {
    id: "force-d1",
    manufacturer: "SRAM",
    discipline: "Road",
    name: "Force AXS D1 · 12s 2x",
    fronts: [[50, 37], [48, 35], [46, 33]],
    rears: [...axs, "AXS12 10-26"],
  },
  // https://www.sram.com/en/service/models/fc-frc-d2
  {
    id: "force-d2",
    manufacturer: "SRAM",
    discipline: "Road",
    name: "Force AXS D2 · 12s 2x",
    fronts: [[50, 37], [48, 35], [46, 33]],
    rears: [...axs, "AXS12 10-26"],
  },
  // https://www.sram.com/en/service/models/fc-red-1-d1
  // https://www.sram.com/en/service/models/pm-axs-kitr-d1 (54T power-meter ring)
  {
    id: "red1-d1",
    manufacturer: "SRAM",
    discipline: "Road",
    name: "Red 1 D1 · 12s",
    fronts: singles(36, 38, 40, 42, 44, 46, 48, 50, 54),
    rears: ["AXS12 10-26", "AXS12 10-28", "AXS12 10-33"],
  },
  // https://www.sram.com/en/service/models/fc-frc-1-d1
  {
    id: "force1-d1",
    manufacturer: "SRAM",
    discipline: "Road",
    name: "Force 1 D1 · 12s",
    fronts: singles(36, 38, 40, 42, 44, 46, 48),
    rears: [...axs, "AXS12 10-26"],
  },
  // https://www.sram.com/en/service/models/fc-frc-w-d1
  // https://www.sram.com/en/service/models/fc-frc-w-d2
  {
    id: "force-wide",
    manufacturer: "SRAM",
    discipline: "Gravel",
    name: "Force AXS Wide D1/D2 · 12s 2x",
    fronts: [[43, 30]],
    rears: ["AXS12 10-28", "AXS12 10-30", "AXS12 10-33", "AXS12 10-36"],
  },
  // https://www.sram.com/en/service/models/fc-frc-1w-d2
  {
    id: "force-xplr-d2",
    manufacturer: "SRAM",
    discipline: "Gravel",
    name: "Force XPLR Wide D2 · 12s",
    fronts: singles(38, 40, 42, 44, 46, 48, 50),
    rears: ["XPLR12 10-44", "AXS12 10-36"],
  },
  // https://support.sram.com/hc/en-us/articles/6042832708763-What-size-direct-mount-XPLR-chainrings-do-you-offer
  {
    id: "red-xplr12",
    manufacturer: "SRAM",
    discipline: "Gravel",
    name: "Red XPLR Wide D1 · 12s",
    fronts: singles(38, 40, 42, 44, 46, 48, 50),
    rears: ["XPLR12 10-44", "AXS12 10-36"],
  },
];
