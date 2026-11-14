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
export const cassettes: Record<string, number[]> = {
  "SH12 11-30": [11, 12, 13, 14, 15, 16, 17, 19, 21, 24, 27, 30],
  "SH12 11-34": [11, 12, 13, 14, 15, 17, 19, 21, 24, 27, 30, 34],
  "SH12 11-36": [11, 12, 13, 14, 15, 17, 19, 21, 24, 28, 32, 36],
  "SH11 11-28": [11, 12, 13, 14, 15, 17, 19, 21, 23, 25, 28],
  "SH11 11-30": [11, 12, 13, 14, 15, 17, 19, 21, 24, 27, 30],
  "SH11 11-32": [11, 12, 13, 14, 16, 18, 20, 22, 25, 28, 32],
  "SH11 11-34": [11, 13, 15, 17, 19, 21, 23, 25, 27, 30, 34],
  "SH11 12-25": [12, 13, 14, 15, 16, 17, 18, 19, 21, 23, 25],
  "SH11 11-40": [11, 13, 15, 17, 19, 21, 24, 27, 31, 35, 40],
  "SH11 11-42": [11, 13, 15, 17, 19, 21, 24, 28, 32, 37, 42],
  "SH12 10-45": [10, 12, 14, 16, 18, 21, 24, 28, 32, 36, 40, 45],
  "SH12 10-51": [10, 12, 14, 16, 18, 21, 24, 28, 33, 39, 45, 51],
  "AXS12 10-28": [10, 11, 12, 13, 14, 15, 16, 17, 19, 21, 24, 28],
  "AXS12 10-30": [10, 11, 12, 13, 14, 15, 17, 19, 21, 24, 27, 30],
  "AXS12 10-33": [10, 11, 12, 13, 14, 15, 17, 19, 21, 24, 28, 33],
  "AXS12 10-36": [10, 11, 12, 13, 15, 17, 19, 21, 24, 28, 32, 36],
  "XPLR12 10-44": [10, 11, 13, 15, 17, 19, 21, 24, 28, 32, 38, 44],
  "XPLR12 11-44": [11, 12, 13, 15, 17, 19, 21, 24, 28, 32, 38, 44],
  "XPLR13 10-46": [10, 11, 12, 13, 15, 17, 19, 21, 24, 28, 32, 38, 46],
  "T-Type12 10-52": [10, 12, 14, 16, 18, 21, 24, 28, 32, 38, 44, 52],
};
const sh12 = ["SH12 11-30", "SH12 11-34"];
const axs = ["AXS12 10-28", "AXS12 10-30", "AXS12 10-33", "AXS12 10-36"];
const singles = (...teeth: number[]) => teeth.map((t) => [t]);
export const series: Series[] = [
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
  {
    id: "grx2",
    manufacturer: "Shimano",
    discipline: "Gravel",
    name: "GRX RX820 · 12s 2x",
    fronts: [[48, 31]],
    rears: ["SH12 11-34", "SH12 11-36"],
  },
  {
    id: "grx1",
    manufacturer: "Shimano",
    discipline: "Gravel",
    name: "GRX RX820 · 12s 1x",
    fronts: singles(40, 42, 44, 46),
    rears: ["SH12 10-45", "SH12 10-51"],
  },
  {
    id: "grx600-12",
    manufacturer: "Shimano",
    discipline: "Gravel",
    name: "GRX RX610 · 12s",
    fronts: [[46, 30], [38], [40]],
    rears: ["SH12 11-34", "SH12 11-36", "SH12 10-45", "SH12 10-51"],
  },
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
  {
    id: "red",
    manufacturer: "SRAM",
    discipline: "Road",
    name: "Red AXS E1 · 12s 2x",
    fronts: [
      [50, 37],
      [48, 35],
      [46, 33],
    ],
    rears: axs,
  },
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
  {
    id: "red1",
    manufacturer: "SRAM",
    discipline: "Road",
    name: "Red 1 E1 · 12s",
    fronts: singles(44, 46, 50),
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
  {
    id: "force-xplr",
    manufacturer: "SRAM",
    discipline: "Gravel",
    name: "Force XPLR Wide E1 · 12s",
    fronts: singles(42, 44, 46, 48, 50),
    rears: ["XPLR12 10-44"],
  },
  // https://www.sram.com/en/sram/models/cs-xg-1371-e1
  {
    id: "force-xplr13",
    manufacturer: "SRAM",
    discipline: "Gravel",
    name: "Force XPLR Wide E1 · 13s",
    fronts: singles(42, 44, 46, 48, 50),
    rears: ["XPLR13 10-46"],
  },
  // https://www.sram.com/en/sram/models/fc-riv-1w-d1
  {
    id: "rival-xplr",
    manufacturer: "SRAM",
    discipline: "Gravel",
    name: "Rival XPLR Wide D1 · 12s",
    fronts: singles(40, 46),
    rears: ["XPLR12 10-44"],
  },
  // https://www.sram.com/en/sram/models/cs-xg-1351-e1
  {
    id: "rival-xplr13",
    manufacturer: "SRAM",
    discipline: "Gravel",
    name: "Rival XPLR Wide · 13s",
    fronts: singles(40, 46),
    rears: ["XPLR13 10-46"],
  },
  // https://www.sram.com/en/sram/models/fc-red-1w-e1
  {
    id: "red-xplr",
    manufacturer: "SRAM",
    discipline: "Gravel",
    name: "Red XPLR · 13s",
    fronts: singles(40, 42, 44, 46, 48, 50),
    rears: ["XPLR13 10-46"],
  },
  {
    id: "apex",
    manufacturer: "SRAM",
    discipline: "Gravel",
    name: "Apex Wide · 12s 1x",
    fronts: singles(40, 42),
    rears: ["XPLR12 11-44"],
  },
  {
    id: "mullet",
    manufacturer: "SRAM",
    discipline: "Gravel",
    name: "Eagle Transmission · gravel mullet",
    fronts: singles(40, 42),
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
];
