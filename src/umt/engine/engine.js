/*
 * Site engine: the original site logic, kept as written. Business name: SITE.name (src/lib/site.ts).
 * It runs as a classic script after React has rendered the markup (see src/umt/App.tsx),
 * and drives the screens that are still engine-built: car pages, profile, part-exchange,
 * payments, finance, ID checks, delivery, settings, help, referrals and revenue.
 * Change: the floating quick bar (.qbar) now shares the nav's aria-current highlighting.
 */
var SITE = window.__umtSite || { name: "Union Motor Trade", mark: "U", refPrefix: "UMT" };
(function () {
  var EMAIL = "hello@example.co.uk"; // replace with your real inbox
  var views = [
    "home",
    "sell",
    "buy",
    "deals",
    "packages",
    "how",
    "fees",
    "protect",
    "legal",
    "profile",
    "px",
    "revenue",
    "pay",
    "verify",
    "fin",
    "deliver",
    "settings",
    "help",
    "refer",
    "gone",
  ];
  var ENDS = "30 November 2026",
    FEE = 295;
  var OPTS = [
    ["Pre-Delivery Assurance Pack (inspection)", 149],
    ["Comprehensive warranty", 399],
    ["Delivery to your door (estimate)", 120],
  ];
  var TYPES = [
    "Hatchback",
    "SUV",
    "Coupe",
    "Convertible",
    "Estate",
    "Saloon",
    "Two-seater",
    "Seven-seater",
    "Off-roader",
    "Runaround",
    "Electric",
    "Hybrid",
    "Family car",
  ];
  var cars = [
    {
      y: 2021,
      mk: "Audi",
      md: "A3 Sportback",
      mi: 28400,
      p: 19495,
      mv: 20495,
      fu: "Petrol",
      tr: "Manual",
      k: 2,
      mot: "Mar 2027",
      d: "Light scuff on rear bumper (photo 9)",
      t: ["Hatchback"],
      bt: "Hatchback",
      col: "Navarra Blue",
      dr: 5,
      s: 5,
      reg: "UM21 SMA",
      ow: 2,
      sv: "Full service history",
      eng: "1.5 TFSI petrol",
      bhp: 150,
      acc: 8.2,
      mpg: "47.9 mpg",
      co2: 134,
      ins: 22,
      f: ["Virtual cockpit", "Heated seats", "Front and rear parking sensors"],
    },
    {
      y: 2019,
      mk: "BMW",
      md: "3 Series 320d",
      mi: 52100,
      p: 17250,
      mv: 18150,
      fu: "Diesel",
      tr: "Automatic",
      k: 2,
      mot: "Jan 2027",
      d: "Small chip on driver’s door (photo 12)",
      t: ["Saloon"],
      bt: "Saloon",
      col: "Mineral Grey",
      dr: 4,
      s: 5,
      reg: "UM19 SMB",
      ow: 2,
      sv: "Full service history",
      eng: "2.0 turbo diesel",
      bhp: 190,
      acc: 7.1,
      mpg: "58.9 mpg",
      co2: 126,
      ins: 29,
      f: ["Sat nav", "Leather seats", "Adaptive cruise control"],
    },
    {
      y: 2020,
      mk: "Volkswagen",
      md: "Golf GTI",
      mi: 36900,
      p: 21990,
      mv: 22790,
      fu: "Petrol",
      tr: "Manual",
      k: 2,
      mot: "Aug 2027",
      d: "None declared",
      t: ["Hatchback"],
      bt: "Hatchback",
      col: "Pure White",
      dr: 5,
      s: 5,
      reg: "UM20 SMC",
      ow: 1,
      sv: "Full service history",
      eng: "2.0 TSI petrol",
      bhp: 245,
      acc: 6.2,
      mpg: "40.9 mpg",
      co2: 156,
      ins: 32,
      f: ["Performance pack", "Digital cockpit", "Sports seats"],
      deal: {
        b: "£750 finance contribution",
        s: "Towards your deposit on finance purchases",
        fin: 750,
      },
    },
    {
      y: 2018,
      mk: "Mercedes-Benz",
      md: "C-Class",
      mi: 61300,
      p: 16495,
      mv: 17695,
      fu: "Diesel",
      tr: "Automatic",
      k: 1,
      mot: "Dec 2026",
      d: "Kerbing on one alloy (photo 6)",
      t: ["Saloon"],
      bt: "Saloon",
      col: "Silver",
      dr: 4,
      s: 5,
      reg: "UM18 SMD",
      ow: 3,
      sv: "Partial service history",
      eng: "2.0 turbo diesel",
      bhp: 194,
      acc: 7.3,
      mpg: "62.8 mpg",
      co2: 118,
      ins: 31,
      f: ["AMG Line styling", "Sat nav", "Heated seats"],
    },
    {
      y: 2022,
      mk: "Tesla",
      md: "Model 3",
      mi: 24000,
      p: 25995,
      mv: 27495,
      fu: "Electric",
      tr: "Automatic",
      k: 2,
      mot: "Apr 2028",
      d: "None declared",
      t: ["Saloon", "Electric"],
      bt: "Saloon",
      col: "Pearl White",
      dr: 4,
      s: 5,
      reg: "UM22 SME",
      ow: 1,
      sv: "Full service history",
      eng: "Electric, rear motor",
      bhp: 283,
      acc: 6.1,
      mpg: "Around 267 miles of range",
      co2: 0,
      ins: 40,
      f: ["Glass roof", "Autopilot assist", "Over-the-air updates"],
      deal: {
        b: "£400 finance contribution",
        s: "Towards your deposit on finance purchases",
        fin: 400,
      },
    },
    {
      y: 2020,
      mk: "Land Rover",
      md: "Discovery Sport",
      mi: 44800,
      p: 23450,
      mv: 24700,
      fu: "Diesel",
      tr: "Automatic",
      k: 2,
      mot: "Jun 2027",
      d: "Worn driver’s seat bolster (photo 14)",
      t: ["SUV", "Off-roader", "Seven-seater", "Family car"],
      bt: "SUV",
      col: "Santorini Black",
      dr: 5,
      s: 7,
      reg: "UM20 SMF",
      ow: 2,
      sv: "Full service history",
      eng: "2.0 turbo diesel",
      bhp: 180,
      acc: 9.8,
      mpg: "44.1 mpg",
      co2: 168,
      ins: 28,
      f: ["Seven seats", "Terrain Response", "Panoramic roof"],
      deal: {
        b: "12 months’ warranty included",
        s: "Our warranty at no extra cost",
        opt: 1,
        f: 0,
      },
    },
    {
      y: 2019,
      mk: "Ford",
      md: "Focus ST-Line",
      mi: 39700,
      p: 12995,
      mv: 13695,
      fu: "Petrol",
      tr: "Manual",
      k: 2,
      mot: "Feb 2027",
      d: "None declared",
      t: ["Hatchback"],
      bt: "Hatchback",
      col: "Race Red",
      dr: 5,
      s: 5,
      reg: "UM19 SMG",
      ow: 2,
      sv: "Full service history",
      eng: "1.0 EcoBoost petrol",
      bhp: 125,
      acc: 10.3,
      mpg: "52.3 mpg",
      co2: 120,
      ins: 17,
      f: ["Sport seats", "Rear camera", "Sat nav"],
    },
    {
      y: 2021,
      mk: "Kia",
      md: "Sportage",
      mi: 22100,
      p: 20750,
      mv: 21850,
      fu: "Petrol",
      tr: "Manual",
      k: 2,
      mot: "Oct 2027",
      d: "Minor wheel-arch mark (photo 8)",
      t: ["SUV", "Family car"],
      bt: "SUV",
      col: "Gravity Grey",
      dr: 5,
      s: 5,
      reg: "UM21 SMH",
      ow: 1,
      sv: "Full service history",
      eng: "1.6 T-GDi petrol",
      bhp: 177,
      acc: 9.1,
      mpg: "36.2 mpg",
      co2: 171,
      ins: 21,
      f: [
        "Panoramic roof",
        "Heated seats and steering wheel",
        "Reversing camera",
      ],
      deal: {
        b: "Half-price warranty",
        s: "50% off our warranty",
        opt: 1,
        f: 0.5,
      },
    },
    {
      y: 2020,
      mk: "Audi",
      md: "TT Coupe",
      mi: 38200,
      p: 22495,
      mv: 23495,
      fu: "Petrol",
      tr: "Automatic",
      k: 2,
      mot: "May 2027",
      d: "None declared",
      t: ["Coupe"],
      bt: "Coupe",
      col: "Daytona Grey",
      dr: 3,
      s: 4,
      reg: "UM20 SMJ",
      ow: 2,
      sv: "Full service history",
      eng: "2.0 TFSI petrol",
      bhp: 197,
      acc: 6.1,
      mpg: "40.9 mpg",
      co2: 157,
      ins: 33,
      f: ["S line styling", "Virtual cockpit", "Heated sports seats"],
    },
    {
      y: 2019,
      mk: "Mazda",
      md: "MX-5",
      mi: 41200,
      p: 15995,
      mv: 16795,
      fu: "Petrol",
      tr: "Manual",
      k: 2,
      mot: "Sep 2027",
      d: "Small stone chips on bonnet (photo 5)",
      t: ["Convertible", "Two-seater"],
      bt: "Convertible",
      col: "Soul Red",
      dr: 2,
      s: 2,
      reg: "UM19 SMK",
      ow: 2,
      sv: "Full service history",
      eng: "1.5 petrol",
      bhp: 132,
      acc: 8.3,
      mpg: "45.6 mpg",
      co2: 144,
      ins: 25,
      f: ["Soft-top roof", "Heated seats", "Sat nav"],
      deal: {
        b: "Free pre-delivery inspection",
        s: "Independent inspection included",
        opt: 0,
        f: 0,
      },
    },
    {
      y: 2020,
      mk: "Hyundai",
      md: "i10",
      mi: 18900,
      p: 8995,
      mv: 9595,
      fu: "Petrol",
      tr: "Manual",
      k: 2,
      mot: "Jul 2027",
      d: "None declared",
      t: ["Hatchback", "Runaround"],
      bt: "Hatchback",
      col: "Aqua Blue",
      dr: 5,
      s: 5,
      reg: "UM20 SML",
      ow: 1,
      sv: "Full service history",
      eng: "1.0 petrol",
      bhp: 67,
      acc: 14.6,
      mpg: "56.5 mpg",
      co2: 106,
      ins: 6,
      f: [
        "Touchscreen with smartphone mirroring",
        "Rear parking sensors",
        "Low insurance group",
      ],
    },
    {
      y: 2019,
      mk: "Volkswagen",
      md: "up!",
      mi: 33200,
      p: 7995,
      mv: 8495,
      fu: "Petrol",
      tr: "Manual",
      k: 2,
      mot: "Nov 2026",
      d: "Scuffed rear bumper corner (photo 10)",
      t: ["Hatchback", "Runaround"],
      bt: "Hatchback",
      col: "White",
      dr: 3,
      s: 4,
      reg: "UM19 SMM",
      ow: 2,
      sv: "Partial service history",
      eng: "1.0 petrol",
      bhp: 60,
      acc: 14.4,
      mpg: "55.4 mpg",
      co2: 108,
      ins: 5,
      f: ["Bluetooth", "Air conditioning", "Cheap to run"],
    },
    {
      y: 2019,
      mk: "Ford",
      md: "Galaxy",
      mi: 57800,
      p: 14995,
      mv: 15995,
      fu: "Diesel",
      tr: "Automatic",
      k: 1,
      mot: "Jan 2027",
      d: "Worn rear seat trim (photo 15)",
      t: ["Seven-seater", "Family car"],
      bt: "MPV",
      col: "Magnetic Grey",
      dr: 5,
      s: 7,
      reg: "UM19 SMN",
      ow: 2,
      sv: "Full service history",
      eng: "2.0 EcoBlue diesel",
      bhp: 150,
      acc: 10.9,
      mpg: "47.1 mpg",
      co2: 156,
      ins: 24,
      f: ["Seven seats", "Sat nav", "Parking sensors"],
    },
    {
      y: 2020,
      mk: "Jeep",
      md: "Wrangler",
      mi: 47200,
      p: 29995,
      mv: 31795,
      fu: "Petrol",
      tr: "Automatic",
      k: 2,
      mot: "Aug 2027",
      d: "None declared",
      t: ["Off-roader", "SUV"],
      bt: "SUV",
      col: "Sarge Green",
      dr: 5,
      s: 5,
      reg: "UM20 SMP",
      ow: 1,
      sv: "Full service history",
      eng: "2.0 turbo petrol",
      bhp: 268,
      acc: 7.0,
      mpg: "27.2 mpg",
      co2: 236,
      ins: 40,
      f: [
        "Removable roof panels",
        "Low-range four-wheel drive",
        "Leather seats",
      ],
    },
    {
      y: 2021,
      mk: "Skoda",
      md: "Octavia Estate",
      mi: 33600,
      p: 17995,
      mv: 18995,
      fu: "Diesel",
      tr: "Manual",
      k: 2,
      mot: "Dec 2027",
      d: "None declared",
      t: ["Estate", "Family car"],
      bt: "Estate",
      col: "Moon White",
      dr: 5,
      s: 5,
      reg: "UM21 SMR",
      ow: 1,
      sv: "Full service history",
      eng: "2.0 TDI diesel",
      bhp: 150,
      acc: 8.5,
      mpg: "58.9 mpg",
      co2: 129,
      ins: 18,
      f: ["Very large boot", "Sat nav", "Adaptive cruise control"],
    },
    {
      y: 2022,
      mk: "Nissan",
      md: "Leaf",
      mi: 21500,
      p: 14995,
      mv: 15795,
      fu: "Electric",
      tr: "Automatic",
      k: 2,
      mot: "Mar 2028",
      d: "None declared",
      t: ["Hatchback", "Electric", "Runaround"],
      bt: "Hatchback",
      col: "Pearl White",
      dr: 5,
      s: 5,
      reg: "UM22 SMS",
      ow: 1,
      sv: "Full service history",
      eng: "Electric, 40kWh battery",
      bhp: 150,
      acc: 7.9,
      mpg: "Around 168 miles of range",
      co2: 0,
      ins: 22,
      f: ["Heated seats", "Fast-charge socket", "Driver assistance pack"],
    },
    {
      y: 2021,
      mk: "Volkswagen",
      md: "Golf",
      mi: 29800,
      p: 18495,
      mv: 19395,
      fu: "Mild hybrid",
      tr: "Automatic",
      k: 2,
      mot: "Jun 2027",
      d: "None declared",
      t: ["Hatchback", "Hybrid"],
      bt: "Hatchback",
      col: "Atlantic Blue",
      dr: 5,
      s: 5,
      reg: "UM21 SMT",
      ow: 1,
      sv: "Full service history",
      eng: "1.5 eTSI mild hybrid",
      bhp: 150,
      acc: 8.5,
      mpg: "50.4 mpg",
      co2: 128,
      ins: 23,
      f: [
        "Mild hybrid efficiency",
        "Digital cockpit",
        "Adaptive cruise control",
      ],
    },
    {
      y: 2021,
      mk: "Ford",
      md: "Puma",
      mi: 24500,
      p: 16995,
      mv: 17995,
      fu: "Mild hybrid",
      tr: "Manual",
      k: 2,
      mot: "Sep 2027",
      d: "Light mark on rear bumper (photo 11)",
      t: ["SUV", "Runaround", "Hybrid"],
      bt: "SUV",
      col: "Chrome Blue",
      dr: 5,
      s: 5,
      reg: "UM21 SMU",
      ow: 1,
      sv: "Full service history",
      eng: "1.0 EcoBoost mild hybrid",
      bhp: 125,
      acc: 9.8,
      mpg: "50.4 mpg",
      co2: 127,
      ins: 14,
      f: ["Large hidden boot", "Mild hybrid", "Sat nav"],
    },
    {
      y: 2021,
      mk: "Hyundai",
      md: "Tucson",
      mi: 31200,
      p: 27495,
      mv: 28795,
      fu: "Plug-in hybrid",
      tr: "Automatic",
      k: 2,
      mot: "Mar 2027",
      d: "None declared",
      t: ["SUV", "Family car", "Hybrid"],
      bt: "SUV",
      col: "Amazon Grey",
      dr: 5,
      s: 5,
      reg: "UM21 SMV",
      ow: 1,
      sv: "Full service history",
      eng: "1.6 T-GDi plug-in hybrid",
      bhp: 265,
      acc: 8.6,
      mpg: "Around 34 miles on electric alone",
      co2: 37,
      ins: 27,
      f: ["Plug-in hybrid", "Panoramic roof", "Wireless phone charging"],
    },
    {
      y: 2020,
      mk: "Toyota",
      md: "Corolla",
      mi: 38700,
      p: 15995,
      mv: 16995,
      fu: "Hybrid",
      tr: "Automatic",
      k: 2,
      mot: "Oct 2027",
      d: "None declared",
      t: ["Hatchback", "Family car", "Hybrid"],
      bt: "Hatchback",
      col: "Silver",
      dr: 5,
      s: 5,
      reg: "UM20 SMW",
      ow: 2,
      sv: "Full service history",
      eng: "1.8 hybrid",
      bhp: 122,
      acc: 10.9,
      mpg: "62.8 mpg",
      co2: 102,
      ins: 16,
      f: ["Self-charging hybrid", "Safety assist pack", "Reversing camera"],
    },
    {
      y: 2019,
      mk: "Audi",
      md: "A3 Sportback",
      mi: 49800,
      p: 16495,
      mv: 17395,
      fu: "Diesel",
      tr: "Manual",
      k: 2,
      mot: "Feb 2027",
      d: "Small scratch on rear door (photo 7)",
      t: ["Hatchback"],
      bt: "Hatchback",
      col: "Mythos Black",
      dr: 5,
      s: 5,
      reg: "UM19 SMX",
      ow: 2,
      sv: "Full service history",
      eng: "2.0 TDI diesel",
      bhp: 150,
      acc: 8.6,
      mpg: "58.9 mpg",
      co2: 127,
      ins: 22,
      f: ["Sat nav", "Heated seats", "Parking sensors"],
    },
  ];
  var DIST = [
    12, 48, 95, 23, 160, 34, 71, 8, 120, 55, 18, 41, 66, 205, 29, 88, 37, 142,
    63, 27, 110,
  ]; // sample miles from the buyer
  var ADDED = [
    2, 9, 1, 14, 4, 21, 6, 3, 11, 5, 17, 8, 26, 12, 7, 2, 10, 1, 19, 15, 30,
  ]; // sample days since listed
  cars.forEach(function (c, i) {
    c.dist = null;
    c.add = ADDED[i];
  });
  var PCA = {
    AB: [57.15, -2.09],
    B: [52.48, -1.9],
    BA: [51.38, -2.36],
    BB: [53.75, -2.48],
    BD: [53.79, -1.75],
    BH: [50.72, -1.88],
    BL: [53.58, -2.43],
    BN: [50.83, -0.14],
    BR: [51.4, 0.02],
    BS: [51.45, -2.59],
    CB: [52.21, 0.12],
    CF: [51.48, -3.18],
    CH: [53.19, -2.89],
    CM: [51.74, 0.47],
    CO: [51.89, 0.9],
    CR: [51.37, -0.1],
    CV: [52.41, -1.51],
    DE: [52.92, -1.48],
    DH: [54.78, -1.57],
    DL: [54.52, -1.55],
    DN: [53.52, -1.13],
    DY: [52.51, -2.09],
    E: [51.54, -0.02],
    EC: [51.52, -0.09],
    EH: [55.95, -3.19],
    EN: [51.65, -0.08],
    EX: [50.72, -3.53],
    G: [55.86, -4.25],
    GL: [51.86, -2.24],
    GU: [51.24, -0.57],
    HA: [51.58, -0.34],
    HD: [53.65, -1.78],
    HG: [53.99, -1.54],
    HP: [51.75, -0.47],
    HU: [53.74, -0.34],
    HX: [53.72, -1.86],
    IG: [51.56, 0.07],
    IP: [52.06, 1.15],
    KT: [51.41, -0.3],
    L: [53.41, -2.98],
    LA: [54.05, -2.8],
    LE: [52.63, -1.13],
    LN: [53.23, -0.54],
    LS: [53.8, -1.55],
    LU: [51.88, -0.42],
    M: [53.48, -2.24],
    ME: [51.37, 0.52],
    MK: [52.04, -0.76],
    N: [51.59, -0.1],
    NE: [54.98, -1.61],
    NG: [52.95, -1.15],
    NN: [52.24, -0.9],
    NR: [52.63, 1.3],
    NW: [51.55, -0.18],
    OL: [53.54, -2.11],
    OX: [51.75, -1.26],
    PE: [52.57, -0.24],
    PL: [50.37, -4.14],
    PO: [50.8, -1.09],
    PR: [53.76, -2.7],
    RG: [51.45, -0.97],
    RH: [51.24, -0.17],
    RM: [51.57, 0.18],
    S: [53.38, -1.47],
    SA: [51.62, -3.94],
    SE: [51.48, -0.05],
    SG: [51.9, -0.2],
    SK: [53.41, -2.15],
    SL: [51.51, -0.59],
    SM: [51.37, -0.19],
    SN: [51.56, -1.78],
    SO: [50.9, -1.4],
    SP: [51.07, -1.8],
    SS: [51.54, 0.71],
    ST: [53.0, -2.18],
    SW: [51.47, -0.17],
    SY: [52.71, -2.75],
    TA: [51.02, -3.1],
    TF: [52.68, -2.45],
    TN: [51.13, 0.27],
    TQ: [50.46, -3.53],
    TR: [50.26, -5.05],
    TS: [54.57, -1.23],
    TW: [51.45, -0.34],
    UB: [51.52, -0.38],
    W: [51.51, -0.19],
    WA: [53.39, -2.59],
    WC: [51.52, -0.12],
    WD: [51.66, -0.4],
    WF: [53.68, -1.5],
    WN: [53.54, -2.63],
    WR: [52.19, -2.22],
    WS: [52.59, -1.98],
    WV: [52.59, -2.13],
    YO: [53.96, -1.08],
  };
  var SELLER = [
    "LS",
    "S",
    "B",
    "M",
    "NE",
    "BS",
    "L",
    "LE",
    "NG",
    "CF",
    "EH",
    "SO",
    "OX",
    "RG",
    "CB",
    "NR",
    "EX",
    "YO",
    "DE",
    "CV",
    "PL",
  ];
  var pcode = null,
    pwant = null,
    pcpage = 1;
  var reserved = { 4: { by: "sample", until: "24/11/2026" } },
    interest = {},
    payTok = null;
  function untilDate() {
    var d = new Date();
    d.setDate(d.getDate() + HOLD_DEP);
    return d.toLocaleDateString("en-GB");
  }
  function resvByMe(i) {
    return reserved[i] && user && reserved[i].by === user.email;
  }
  var NOTE = {
      buyer: [
        [
          "sign",
          "Sign your finance agreement and sale contract",
          "dc",
          "Open documents",
        ],
        [
          "upl",
          "Upload the documents for your finance application",
          "dc",
          "Upload documents",
        ],
        [
          "dlv",
          "Get ready: your 2021 Kia Sportage arrives today at about 17:30",
          "lt",
          "See live tracking",
        ],
      ],
    },
    seen = {},
    openVeh = null,
    lfilt = "all";
  function fullName() {
    return user
      ? [user.first, user.middle, user.last].filter(Boolean).join(" ")
      : "";
  }
  function notes() {
    return user && (user.role !== "buyer" || user.sample)
      ? NOTE[user.role].filter(function (n) {
          return !seen[n[0]];
        })
      : [];
  }
  function mlist() {
    return MAIL[user.role].filter(function (m) {
      return !m.smp || user.sample;
    });
  }
  function updProf() {
    var n = totalCount(),
      b = $("nbadge"),
      a = b.parentNode;
    $("proflbl").textContent = user
      ? "Hi, " + (user.name || "there")
      : "Profile";
    b.textContent = n > 9 ? "9+" : n;
    b.hidden = !n;
    a.setAttribute(
      "aria-label",
      user
        ? "Profile, " +
            (user.name || "") +
            (n
              ? ", " +
                n +
                " thing" +
                (n > 1 ? "s" : "") +
                " need" +
                (n > 1 ? "" : "s") +
                " your attention"
              : "")
        : "Profile",
    );
  }
  var after = null,
    pxList = [],
    sellList = [],
    pxDraft = null,
    pxRet = null,
    carSt = {},
    resv = [];
  var WTERMS = [
    [1, 399],
    [2, 699],
    [3, 949],
    [4, 1149],
  ]; // SAMPLE prices. AutoProtect Platinum prices are not published: replace with their rate card.
  function hav(a, b) {
    var r = Math.PI / 180,
      dl = (b[0] - a[0]) * r,
      dn = (b[1] - a[1]) * r,
      x =
        Math.sin(dl / 2) * Math.sin(dl / 2) +
        Math.cos(a[0] * r) *
          Math.cos(b[0] * r) *
          Math.sin(dn / 2) *
          Math.sin(dn / 2);
    return 3959 * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  }
  function setPc(raw) {
    var t = (raw || "").toUpperCase().replace(/\s+/g, "");
    if (!t) {
      pcode = null;
      cars.forEach(function (c) {
        c.dist = null;
      });
      return {
        ok: true,
        msg: "Add your postcode to see distances and sort nearest first.",
      };
    }
    var m = /^([A-Z]{1,2})(\d[A-Z\d]?)(\d[A-Z]{2})?$/.exec(t);
    if (!m)
      return {
        ok: false,
        msg: "That doesn’t look like a UK postcode. Try something like LS1 4AB.",
      };
    if (!PCA[m[1]])
      return {
        ok: false,
        msg:
          "We don’t have the “" +
          m[1] +
          "” area in this preview yet. Try a nearby postcode.",
      };
    pcode = { area: m[1], txt: m[1] + m[2] + (m[3] ? " " + m[3] : "") };
    cars.forEach(function (c, i) {
      c.dist = Math.max(2, Math.round(hav(PCA[m[1]], PCA[SELLER[i]]) * 1.2));
    });
    return {
      ok: true,
      msg:
        "Showing distances from " +
        pcode.txt +
        ". Approximate, by postcode area.",
    };
  }

  var saved = {};
  var RR_UP = 600,
    RR_FEE = 100; // SAMPLE Retail Ready figures: the extra we pay, and the pack fee taken from the sale proceeds. To be confirmed.
  var myPur = null,
    complaints = [],
    bankNudge = false,
    refs = [],
    simode = "new",
    fgt = { step: 0 },
    notif = { buy: true, sell: true, deal: false, txt: true };
  function refCode() {
    return (
      esc(
        ((user && user.first) || SITE.refPrefix).toUpperCase().replace(/[^A-Z]/g, ""),
      ) + "-50"
    );
  }
  function mdl(h, wire) {
    var o = document.getElementById("mdl");
    if (o) o.remove();
    var d = document.createElement("div");
    d.id = "mdl";
    d.className = "mdl-bg";
    d.innerHTML =
      '<div class="mdl" role="dialog" aria-modal="true" tabindex="-1"><button type="button" class="mdl-x" data-x aria-label="Close">&times;</button>' +
      h +
      "</div>";
    document.body.appendChild(d);
    document.body.classList.add("fsopen");
    d.onclick = function (e) {
      if (e.target === d) mdlX();
    };
    var m = d.querySelector(".mdl");
    m.focus();
    d.querySelectorAll("[data-x]").forEach(function (b) {
      b.onclick = mdlX;
    });
    d.onkeydown = function (e) {
      if (e.key === "Escape") mdlX();
    };
    if (wire) wire(m);
    return m;
  }
  function mdlX() {
    var o = document.getElementById("mdl");
    if (o) o.remove();
    document.body.classList.remove("fsopen");
  }
  function addMail(role, o) {
    o.id = o.id || "x" + Date.now() + Math.random().toString(36).slice(2, 6);
    o.d = o.d || "Just now";
    if (o.u == null) o.u = true;
    MAIL[role].unshift(o);
  }
  var tierPv = null;
  function hasPerk(re) {
    if (!user) return false;
    var t = tierOf(tierCount()),
      ok = false;
    if (!t) return false;
    TIERS.forEach(function (x) {
      if (x[1] <= t[1])
        x[2].forEach(function (p) {
          if (re.test(p)) ok = true;
        });
    });
    return ok;
  }
  function myRrFee() {
    return hasPerk(/Free Retail Ready/)
      ? 0
      : hasPerk(/Retail Ready pack at half price/)
        ? RR_FEE / 2
        : RR_FEE;
  }
  function rrPerk() {
    return hasPerk(/Free Retail Ready/)
      ? "Platinum reward: free pack"
      : hasPerk(/Retail Ready pack at half price/)
        ? "Gold reward: half-price pack"
        : "";
  }
  function feeTxt() {
    var f = myRrFee();
    return f < RR_FEE
      ? "<s>" + gbp(RR_FEE) + '</s> <b class="gfee">' + gbp(f) + "</b>"
      : gbp(RR_FEE);
  }
  function rrFeeOf(v) {
    return v.rrfee != null ? v.rrfee : RR_FEE;
  }
  function noG(v) {
    return Math.round((v.offer * 0.953) / 50) * 50;
  }
  function advOf(v) {
    var b = v.offer || v.net;
    return Math.round((b * 1.0588) / 50) * 50 + (v.rr ? RR_UP + 400 : 0);
  }
  function sellerShare(c) {
    return Math.round(c.p / 1.0588 / 50) * 50;
  }
  function rrNet(v) {
    return v.net + RR_UP - (v.rrpaid ? 0 : rrFeeOf(v));
  }
  function daysLeft(dstr) {
    var d = String(dstr).split("/"),
      t = new Date(+d[2], +d[1] - 1, +d[0]),
      n = new Date();
    n.setHours(0, 0, 0, 0);
    return Math.max(0, Math.round((t - n) / 864e5));
  }
  function addDays(n) {
    var d = new Date();
    d.setDate(d.getDate() + n);
    return d.toLocaleDateString("en-GB");
  }
  function wkDays(n) {
    var o = [],
      d = new Date();
    while (o.length < n) {
      d.setDate(d.getDate() + 1);
      var w = d.getDay();
      if (w && w < 6)
        o.push(
          d.toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
          }),
        );
    }
    return o;
  }
  var user = null;
  function fmt(n) {
    return n.toLocaleString("en-GB");
  }
  function $(i) {
    return document.getElementById(i);
  }
  function optPrice(c, j, wt) {
    var b = j === 1 ? WTERMS[wt || 0][1] : OPTS[j][1];
    if (c.deal && c.deal.opt === j) {
      return j === 1 && c.deal.f === 0
        ? b - WTERMS[0][1]
        : Math.round(b * c.deal.f);
    }
    return b;
  }

  function ph(c, big) {
    return (
      '<div class="ph"' +
      (big ? ' style="aspect-ratio:16/10"' : "") +
      "><span>Photos coming soon</span>" +
      (c.deal ? '<div class="gold">' + c.deal.b + "</div>" : "") +
      "</div>"
    );
  }
  function card(c, i, showDeal, showDist) {
    var R = reserved[i];
    return (
      '<article class="car' +
      (R ? " isres" : "") +
      '"><a class="pl" href="#car-' +
      i +
      '" aria-label="' +
      c.y +
      " " +
      c.mk +
      " " +
      c.md +
      (R ? ", currently reserved" : "") +
      '">' +
      ph(c) +
      (R ? '<span class="resband">Currently reserved</span>' : "") +
      '</a><h3><a href="#car-' +
      i +
      '">' +
      c.mk +
      " " +
      c.md +
      '</a></h3><p class="meta">' +
      c.y +
      " · " +
      fmt(c.mi) +
      " miles · " +
      c.fu +
      " · " +
      c.tr +
      (showDist && c.dist != null ? " · " + c.dist + " miles away" : "") +
      "</p>" +
      (showDeal && c.deal
        ? '<p class="dealtxt">' + c.deal.s + ". Ends " + ENDS + ".</p>"
        : "") +
      '<div class="row"><span class="price">£' +
      fmt(c.p) +
      '</span><a class="lnk" href="#car-' +
      i +
      '">View</a></div>' +
      (c.mv > c.p
        ? '<p class="meta" style="color:var(--ok);margin:2px 0 0">(£' +
          fmt(c.mv - c.p) +
          " below Auto Trader retail value)</p>"
        : "") +
      "</article>"
    );
  }

  /* hot deals strip */
  var dl = [];
  cars.forEach(function (c, i) {
    if (c.deal) dl.push(i);
  });
  $("strip").innerHTML =
    '<div class="wrap"><b>Hot deals, limited time only.</b>' +
    dl
      .slice(0, 2)
      .map(function (i) {
        var c = cars[i];
        return (
          "<span>" + c.y + " " + c.mk + " " + c.md + ": " + c.deal.b + "</span>"
        );
      })
      .join("") +
    '<span class="go">See all hot deals</span></div>';
  var refreshCards = function () {
    $("deal-grid").innerHTML = dl
      .map(function (i) {
        return card(cars[i], i, true);
      })
      .join("");
    /* home: the cars furthest below retail value (largest buyer saving) */
    var G = $("gain-grid");
    if (G)
      G.innerHTML = cars
        .map(function (c, i) {
          return i;
        })
        .filter(function (i) {
          return cars[i].mv > cars[i].p && !reserved[i];
        })
        .sort(function (a, b) {
          return cars[b].mv - cars[b].p - (cars[a].mv - cars[a].p);
        })
        .slice(0, 5)
        .map(function (i) {
          return card(cars[i], i, true);
        })
        .join("");
  };
  refreshCards();

  (function () {
    var order = dl
      .filter(function (i) {
        return cars[i].deal.fin;
      })
      .concat(
        dl.filter(function (i) {
          return !cars[i].deal.fin;
        }),
      );
    if (!order.length) return;
    var P = $("promo"),
      k = 0,
      i = order[0],
      BASES = [14, 9, 21, 6, 17, 11],
      END = new Date(2026, 10, 30, 23, 59, 59).getTime(),
      hold = false;
    P.innerHTML =
      '<div class="pfade" id="pfade"></div><div class="pnav"><button type="button" class="parr" id="pprev" aria-label="Previous hot deal">&#8249;</button><div class="pdots" id="pdots" role="group" aria-label="Choose a hot deal">' +
      order
        .map(function (x, n) {
          return (
            '<button type="button" data-n="' +
            n +
            '" aria-label="Hot deal ' +
            (n + 1) +
            " of " +
            order.length +
            '"></button>'
          );
        })
        .join("") +
      '</div><button type="button" class="parr" id="pnext" aria-label="Next hot deal">&#8250;</button></div>';
    function p2(n) {
      return (n < 10 ? "0" : "") + n;
    }
    function tick() {
      if (!$("psvn")) return;
      var n = BASES[k % BASES.length] + (saved[i] ? 1 : 0);
      $("psvn").textContent = n + " people have saved this";
      var t = Math.max(0, END - Date.now()),
        sec = Math.floor(t / 1000),
        d = Math.floor(sec / 86400),
        h = Math.floor((sec % 86400) / 3600),
        m = Math.floor((sec % 3600) / 60),
        x = sec % 60;
      $("ptm").textContent = t
        ? "Ends in " + d + "d " + p2(h) + "h " + p2(m) + "m " + p2(x) + "s"
        : "This deal has ended";
    }
    function draw() {
      i = order[k];
      var c = cars[i];
      $("pfade").innerHTML =
        '<div class="pa"><span class="tag">Hot deal</span><svg viewBox="0 0 120 44" aria-hidden="true"><use href="#car"/></svg></div><div><h2>' +
        c.y +
        " " +
        c.mk +
        " " +
        c.md +
        '</h2><p class="big">' +
        c.deal.b +
        "</p><p>" +
        c.deal.s +
        ". Ends " +
        ENDS +
        '.</p><p class="pr"><b>£' +
        fmt(c.p) +
        "</b>" +
        (c.mv > c.p
          ? " · £" + fmt(c.mv - c.p) + " below Auto Trader retail value"
          : "") +
        '</p><div class="pmeta"><span class="psv"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.2-9.4C1.8 8 3.4 4.8 6.6 4.5c2-.2 3.7.9 5.4 3 1.7-2.1 3.4-3.2 5.4-3 3.2.3 4.8 3.5 3.8 6.6-1.7 4.8-9.2 9.4-9.2 9.4z"/></svg><span id="psvn"></span></span><span class="ptm" id="ptm" role="timer"></span></div><a class="btn" href="#car-' +
        i +
        '">View this deal</a><small>Sample deal and figures. The saved count is a sample too.</small></div>';
      $("pdots")
        .querySelectorAll("button")
        .forEach(function (b, n) {
          b.setAttribute("aria-pressed", n === k);
        });
      tick();
    }
    function go(n) {
      k = (n + order.length) % order.length;
      var f = $("pfade");
      f.classList.add("out");
      setTimeout(function () {
        draw();
        f.classList.remove("out");
      }, 350);
    }
    draw();
    setInterval(tick, 1000);
    if (order.length < 2) P.querySelector(".pnav").hidden = true;
    if (order.length > 1) {
      setInterval(function () {
        if (!hold && !$("view-home").hidden && !document.hidden) go(k + 1);
      }, 7000);
      P.addEventListener("mouseenter", function () {
        hold = true;
      });
      P.addEventListener("mouseleave", function () {
        hold = false;
      });
      P.addEventListener("focusin", function () {
        hold = true;
      });
      P.addEventListener("focusout", function () {
        hold = false;
      });
      $("pdots")
        .querySelectorAll("button")
        .forEach(function (b) {
          b.onclick = function () {
            go(+b.dataset.n);
          };
        });
      $("pprev").onclick = function () {
        go(k - 1);
      };
      $("pnext").onclick = function () {
        go(k + 1);
      };
    }
  })();

  /* routing */
  function route() {
    mdlX();
    var h = (location.hash || "#home").slice(1),
      m = /^car-(\d+)$/.exec(h),
      cur;
    if (h === "packs") h = "packages";
    views.concat("car").forEach(function (v) {
      $("view-" + v).hidden = true;
    });
    if (m && cars[+m[1]]) {
      $("view-car").hidden = false;
      carView(+m[1]);
      cur = "buy";
    } else if (m) {
      $("view-gone").hidden = false;
      cur = "buy";
    } else {
      if (views.indexOf(h) < 0) h = "home";
      $("view-" + h).hidden = false;
      cur = h;
      if (h === "profile") profileView();
      if (h === "px") pxView();
      if (h === "revenue") revView();
      if (h === "pay") payView();
      if (h === "verify") idView();
      if (h === "fin") finView();
      if (h === "deliver") delView();
      if (h === "settings") setView();
      if (h === "help") helpView();
      if (h === "refer") refView();
      if (h === "buy" || h === "deals") {
        refreshCards();
        if (window.__buyRender) window.__buyRender();
      }
    }
    document.querySelectorAll(".bar a[data-v],.qbar a[data-v]").forEach(function (a) {
      if (a.dataset.v === cur) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);

  /* car page */
  var PRETICK_INSPECTION = false; // true pre-ticks the paid inspection. Online, a pre-ticked paid extra is likely to breach UK consumer rules, so it stays off. See notes to the owner.
  var RATES = { "Very good": 12.9, Good: 16.9, Fair: 21.9 }; // example APRs only
  var GMFV = { 24: 0.55, 36: 0.43, 48: 0.34 }; // example final-payment shares of the car price
  var TERMS = { PCP: [24, 36, 48], HP: [24, 36, 48, 60] };
  var MILES = [6000, 8000, 10000, 12000, 15000];
  var EXCESS_P = 9,
    RES_DEP = 200,
    HOLD_FREE = 2,
    HOLD_DEP = 7;
  var SHOTS = [
    "Front",
    "Rear",
    "Driver side",
    "Passenger side",
    "Dashboard",
    "Front seats",
    "Rear seats",
    "Boot",
    "Wheels",
    "Engine bay",
  ];
  var TABS = [
    ["ov", "Overview"],
    ["hi", "History and ownership"],
    ["fe", "Features"],
    ["rc", "Running costs"],
    ["ul", "ULEZ"],
    ["en", "Engine and performance"],
  ];
  var HEART =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.2-9.4C1.8 8 3.4 4.8 6.6 4.5c2-.2 3.7.9 5.4 3 1.7-2.1 3.4-3.2 5.4-3 3.2.3 4.8 3.5 3.8 6.6-1.7 4.8-9.2 9.4-9.2 9.4z"/></svg>';
  var toastT = null;
  function toast() {
    var o = $("toast");
    if (o) o.remove();
    clearTimeout(toastT);
    var d = document.createElement("div");
    d.className = "toast";
    d.id = "toast";
    d.setAttribute("role", "status");
    d.innerHTML =
      'Vehicle has now been saved. Check your <a href="#profile" id="toastlnk">profile</a>.';
    document.body.appendChild(d);
    $("toastlnk").onclick = function () {
      pwant = "sv";
      d.remove();
    };
    toastT = setTimeout(function () {
      d.remove();
    }, 5000);
  }
  var ICON_EXP =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/></svg>';
  var ICON_CON =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10h-6V4M4 14h6v6M14 10l7-7M10 14l-7 7"/></svg>';
  function gbp(n) {
    return "£" + fmt(Math.round(n));
  }
  function gbp2(n) {
    return (
      "£" +
      n.toLocaleString("en-GB", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }
  function below(c) {
    var d = c.mv - c.p;
    return d > 0 ? gbp(d) + " below Auto Trader retail value" : "";
  }
  function dls(rows) {
    return (
      '<dl class="dl">' +
      rows
        .map(function (r) {
          return "<dt>" + r[0] + "</dt><dd>" + r[1] + "</dd>";
        })
        .join("") +
      "</dl>"
    );
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }

  function tabHtml(c, k) {
    if (k === "ov")
      return dls([
        ["Body type", c.bt],
        ["Year", c.y],
        ["Mileage", fmt(c.mi) + " miles"],
        ["Fuel", c.fu],
        ["Gearbox", c.tr],
        ["Colour", c.col],
        ["Doors", c.dr],
        ["Seats", c.s],
        ["MOT", "Until " + c.mot],
        ["Keys", c.k],
        ["Suits", c.t.join(", ")],
      ]);
    if (k === "hi")
      return dls([
        ["Owners", c.ow],
        ["Service history", c.sv],
        ["Keys", c.k],
        ["MOT", "Until " + c.mot],
        ["V5C logbook", "Seen (sample)"],
        ["Ownership", "Seller identity and ownership verified"],
        ["Outstanding finance", "None, or settled from the sale"],
        ["Write-off and stolen check", "Passed (sample)"],
        ["Mileage check", "Consistent with history (sample)"],
        ["Disclosed defects", c.d],
      ]);
    if (k === "fe")
      return (
        '<p class="muted" style="margin-bottom:12px">Standout features</p><ul class="stars">' +
        c.f
          .map(function (x) {
            return "<li>" + x + "</li>";
          })
          .join("") +
        '</ul><h3 style="margin:28px 0 8px">Also fitted</h3>' +
        dls([
          ["Connectivity", "Bluetooth and USB"],
          ["Comfort", "Air conditioning, cruise control"],
          ["Wheels", "Alloy wheels"],
        ]) +
        '<p class="note" style="margin-top:12px">Sample list. The full equipment list comes from the seller’s declaration and our checks.</p>'
      );
    if (k === "rc")
      return (
        '<div class="tiles"><div class="tile"><b>' +
        c.mpg +
        '</b><span>Efficiency</span></div><div class="tile"><b>' +
        (c.co2 === 0 ? "0 g/km" : c.co2 + " g/km") +
        '</b><span>CO2 emissions</span></div><div class="tile"><b>Group ' +
        c.ins +
        "</b><span>Insurance group</span></div></div>" +
        dls([
          ["Fuel", c.fu],
          [
            "Annual road tax",
            'Check the exact figure on <a class="lnk" target="_blank" rel="noopener" href="https://www.gov.uk/check-vehicle-tax">GOV.UK</a> with the registration',
          ],
        ]) +
        '<p class="note" style="margin-top:12px">Efficiency and emissions are sample figures. Real-world running costs vary.</p>'
      );
    if (k === "ul")
      return (
        '<p>Clean air zones and the ULEZ depend on a car’s emissions standard, and the rules differ by city and change over time. Check this car’s registration on the official sites before you buy, especially if you drive in a zone.</p><div class="regbox"><div><span>Registration (sample)</span><br><b>' +
        c.reg +
        '</b></div><button type="button" class="btn ghost" id="cpy">Copy registration</button></div><p><a class="btn" target="_blank" rel="noopener" href="https://tfl.gov.uk/modes/driving/check-your-vehicle">Check London ULEZ on the TfL site</a></p><p><a class="btn ghost" target="_blank" rel="noopener" href="https://vehiclecheck.drive-clean-air-zone.service.gov.uk/">Check other clean air zones on GOV.UK</a></p><p class="note">These open the official sites in a new tab. Paste the registration there: we can’t fill it in for you.</p>'
      );
    return dls([
      ["Engine", c.eng],
      ["Power", c.bhp + " bhp"],
      ["0 to 62 mph", c.acc + " seconds"],
      ["Fuel", c.fu],
      ["Gearbox", c.tr],
    ]);
  }

  function carView(i) {
    var c = cars[i],
      st =
        carSt[i] ||
        (carSt[i] = {
          mode: "cash",
          prod: "PCP",
          big: false,
          tab: "ov",
          px: 0,
          sel: [PRETICK_INSPECTION ? 1 : 0, 0, 0],
          wt: 0,
          rvOpen: false,
          rv: null,
          off: "",
          done: null,
          pxEdit: false,
          rw: null,
        });
    st.big = false;
    var name = c.y + " " + c.mk + " " + c.md;
    var dmax = Math.round((c.p * 0.5) / 100) * 100,
      d0 = Math.round((c.p * 0.1) / 100) * 100,
      contrib = (c.deal && c.deal.fin) || 0;
    var curShot = 0;
    var thumbs = SHOTS.map(function (s, j) {
      return (
        '<button type="button" class="th" data-j="' +
        j +
        '" aria-pressed="' +
        (j === 0) +
        '" aria-label="Photo ' +
        (j + 1) +
        ": " +
        s +
        '">' +
        (j + 1) +
        "</button>"
      );
    }).join("");
    var tablist = TABS.map(function (t) {
      return (
        '<button type="button" role="tab" class="tab" id="t-' +
        t[0] +
        '" data-k="' +
        t[0] +
        '" aria-controls="tabpanel" aria-selected="' +
        (t[0] === "ov") +
        '" tabindex="' +
        (t[0] === "ov" ? 0 : -1) +
        '">' +
        t[1] +
        "</button>"
      );
    }).join("");
    var optsHtml = OPTS.map(function (o, j) {
      if (j === 1)
        return (
          '<label class="opt"><input type="checkbox" data-j="1"' +
          (st.sel[1] ? " checked" : "") +
          "><span>" +
          o[0] +
          '</span><span id="wprice"></span></label><div id="wbox" hidden><div class="wopts" id="wopts" role="group" aria-label="Warranty length"></div><p class="note small" style="margin:0 0 10px">The longer the term, the less each year costs. You can extend your warranty later if you keep the car longer. <span class="todo">[Sample prices. AutoProtect Platinum prices to be added from their rate card.]</span></p></div>'
        );
      var p = optPrice(c, j),
        shown =
          p === o[1]
            ? "£" + p
            : p === 0
              ? "<s>£" + o[1] + "</s> Free with this deal"
              : "<s>£" + o[1] + "</s> £" + p;
      return (
        '<label class="opt"><input type="checkbox" data-j="' +
        j +
        '"' +
        (st.sel[j] ? " checked" : "") +
        "><span>" +
        o[0] +
        (j === 0 ? ' <em class="rec">Recommended</em>' : "") +
        "</span><span>" +
        shown +
        "</span></label>"
      );
    }).join("");
    var rateOpts = Object.keys(RATES)
      .map(function (k) {
        return (
          "<option" + (k === "Good" ? " selected" : "") + ">" + k + "</option>"
        );
      })
      .join("");
    var milOpts = MILES.map(function (m) {
      return (
        '<option value="' +
        m +
        '"' +
        (m === 10000 ? " selected" : "") +
        ">" +
        fmt(m) +
        " miles</option>"
      );
    }).join("");

    function pxPanel() {
      var P = pxList.length,
        D = pxDraft && !pxDraft.needDetails ? pxDraft : {},
        v = function (k) {
          return esc(D[k] == null ? "" : D[k]);
        },
        so = function (k, list) {
          return (
            '<select id="x-' +
            k +
            '"><option value="">Choose</option>' +
            list
              .map(function (o) {
                return (
                  "<option" +
                  (D[k] === o ? " selected" : "") +
                  ">" +
                  o +
                  "</option>"
                );
              })
              .join("") +
            "</select>"
          );
        };
      if (P && !st.pxEdit) {
        var top = Math.max.apply(
          null,
          pxList.map(function (x) {
            return x.val;
          }),
        );
        return (
          '<details class="vf" id="pxd" style="margin-top:20px" open><summary>Add part exchange vehicle</summary><div>' +
          pxList
            .map(function (X, n) {
              var on = st.px && st.pxId === n;
              return (
                '<div class="pxcard"><b class="reg">' +
                esc(X.reg) +
                "</b>" +
                (P > 1 && X.val === top
                  ? ' <em class="rec">Highest estimate</em>'
                  : "") +
                '<p class="muted small" style="margin:4px 0 8px">' +
                esc(X.mi) +
                " miles · " +
                esc(X.keys) +
                " key" +
                (X.keys === "1" ? "" : "s") +
                " · " +
                esc(X.sv) +
                " service history · valuation completed " +
                X.date +
                '</p><div class="row" style="margin-bottom:10px"><span>Ballpark estimate today</span><b>' +
                gbp(X.val) +
                '</b></div><button type="button" class="btn' +
                (on ? " ghost" : "") +
                '" data-px="' +
                n +
                '">' +
                (on ? "Remove from my figures" : "Add to my figures") +
                "</button></div>"
              );
            })
            .join("") +
          '<p class="note" style="margin:0 0 12px">Part exchange values move with the market, so these figures can go up or down between visits. What you see is today’s estimate, and we confirm the final figure when we check your car. <span class="todo">[Live valuation feed to be connected. Until then this shows the figure you entered.]</span></p>' +
          '<button type="button" class="btn ghost" id="x-chg">Change part exchange vehicle</button>' +
          "</div></details>"
        );
      }
      return (
        '<details class="vf" id="pxd" style="margin-top:20px"' +
        (st.pxEdit ? " open" : "") +
        "><summary>Part exchange your car</summary><div>" +
        '<p class="note" style="margin-top:12px">Tell us about your car, then we’ll guide you through the photos, a short video and a damage check. It takes about 15 minutes and is saved to your profile, so you only do it once. Cars we take in part exchange are sold on to the motor trade, so values are trade values and can be lower than selling privately.</p>' +
        '<div class="pxg">' +
        '<label>Registration<input id="x-reg" maxlength="12" autocomplete="off" style="text-transform:uppercase" value="' +
        v("reg") +
        '"></label>' +
        '<label>Mileage<input id="x-mi" inputmode="numeric" value="' +
        v("mi") +
        '"></label>' +
        "<label>Keys" +
        so("keys", ["1", "2", "3 or more"]) +
        "</label>" +
        "<label>Service history" +
        so("sv", ["Full", "Partial", "None"]) +
        "</label>" +
        '<label>Previous owners<input id="x-ow" inputmode="numeric" value="' +
        v("ow") +
        '"></label>' +
        "<label>Is the V5C in your name?" +
        so("v5", ["Yes", "No"]) +
        "</label>" +
        "<label>Private reg on the car?" +
        so("pr", ["No", "Yes"]) +
        "</label>" +
        "<label>Finance still owed?" +
        so("fn", ["No", "Yes"]) +
        "</label>" +
        '<label class="full">What you’re hoping to get for it (£)<input id="x-val" inputmode="numeric" value="' +
        v("val") +
        '"></label>' +
        '</div><p style="margin:0 0 14px"><button type="button" class="btn ghost" id="x-fill" style="padding:8px 16px">Fill with example details (preview)</button></p>' +
        '<button type="button" class="btn" id="x-go">Proceed</button>' +
        (P
          ? ' <button type="button" class="btn ghost" id="x-cancel">Use a saved vehicle</button>'
          : "") +
        '<div class="pxmsg" id="x-msg" aria-live="polite" style="margin:12px 0"></div>' +
        "</div></details>"
      );
    }

    $("car-body").innerHTML =
      '<a class="back" href="#buy">Back to cars</a>' +
      '<div class="cd" id="cd">' +
      '<div class="gal"><h2>' +
      name +
      '</h2><p class="note" style="margin:0 0 14px">Sample listing. Details are placeholders.</p><div class="ph gph' +
      (reserved[i] ? " isres" : "") +
      '" id="gph"><span id="gcap"></span>' +
      (reserved[i]
        ? '<span class="resband">' +
          (resvByMe(i) ? "Reserved for you" : "Currently reserved") +
          "</span>"
        : "") +
      "" +
      (c.deal ? '<div class="gold">' + c.deal.b + "</div>" : "") +
      '<button type="button" class="fsb l" id="fsl" aria-label="Previous photo">&#8249;</button><button type="button" class="fsb r" id="fsr" aria-label="Next photo">&#8250;</button><button type="button" class="enl" id="enl" aria-pressed="false" aria-label="Enlarge photos" title="Enlarge photos">' +
      ICON_EXP +
      '</button></div><div class="thumbs">' +
      thumbs +
      "</div></div>" +
      '<div class="tabs"><div class="tablist" role="tablist" aria-label="Car details" id="tablist">' +
      tablist +
      '</div><div role="tabpanel" id="tabpanel" aria-labelledby="t-ov"></div></div>' +
      '<div class="pan">' +
      '<div><span class="price xl">' +
      gbp(c.p) +
      '</span><span class="below">' +
      (below(c) ? "(" + below(c) + ")" : "") +
      '</span><p class="fixed">Fixed price. No haggling, no hidden fees.</p><p class="note small" style="margin:4px 0 0"><span class="todo">[Sample figure. Auto Trader valuation data, its date and permission to quote it to be confirmed.]</span></p><p style="margin:12px 0 0"><button type="button" class="hb" id="savebtn" aria-pressed="' +
      !!saved[i] +
      '">' +
      HEART +
      '<span id="savetxt">' +
      (saved[i] ? "You have saved this vehicle" : "Save this car") +
      "</span></button></p></div>" +
      (c.deal
        ? '<div class="dealbox"><b>Deal: ' +
          c.deal.b +
          "</b><p>" +
          c.deal.s +
          ". Ends " +
          ENDS +
          ". Sample terms.</p></div>"
        : "") +
      '<div class="seg" role="group" aria-label="How you’d like to pay" style="margin-top:20px"><button type="button" data-m="cash" aria-pressed="true">Pay in full (cash)</button><button type="button" data-m="fin" aria-pressed="false">Pay monthly (finance)</button></div>' +
      '<div id="fin" hidden>' +
      '<div class="monthly"><b id="pm"></b><span> a month</span></div><p class="muted small" id="pmsub"></p>' +
      '<div class="seg" role="group" aria-label="Finance type"><button type="button" data-p="PCP" aria-pressed="true">PCP</button><button type="button" data-p="HP" aria-pressed="false">HP</button></div>' +
      '<p class="muted small" id="pnote"></p>' +
      '<div class="ctl">' +
      '<div class="ctl2"><label>Credit rating<select id="cr">' +
      rateOpts +
      '</select></label><label>APR (example)<span id="apr" style="font:300 1.5rem var(--display);color:var(--ink);padding:6px 0"></span></label></div>' +
      '<label>Your cash deposit<div class="deprow"><input type="range" id="dep-r" min="0" max="' +
      dmax +
      '" step="100" value="' +
      d0 +
      '" aria-label="Cash deposit slider"><input type="number" id="dep" min="0" max="' +
      dmax +
      '" step="100" value="' +
      d0 +
      '" inputmode="numeric" aria-label="Cash deposit in pounds"></div></label>' +
      (contrib
        ? '<div class="lock"><span>Deal deposit contribution (fixed)</span><b>' +
          gbp(contrib) +
          "</b></div>"
        : "") +
      '<div class="ctl2"><label>Term<select id="term"></select></label><label id="mil-l">Expected yearly mileage<select id="mil">' +
      milOpts +
      "</select></label></div>" +
      "</div>" +
      "</div>" +
      '<p class="muted small" style="margin:20px 0 4px">Extras. Add what you’d like.</p>' +
      optsHtml +
      pxPanel() +
      '<div id="rwbox"></div><div class="sum" id="sum"></div>' +
      '<p class="muted small" id="fnote" hidden style="margin-top:12px">Example figures for illustration only. Finance is subject to status, and the rate you’re offered may be different. We’re a credit broker, not a lender, and we may receive commission from the lender, which we’ll tell you before you apply. <span class="todo">[FCA-approved wording and representative example to be added.]</span></p>' +
      '<div class="acts"><button type="button" class="btn" id="buybtn">Buy it now</button><button type="button" class="btn ghost" id="resbtn">Reserve for ' +
      gbp(RES_DEP) +
      '</button></div><p class="note small" id="resnote" style="margin:8px 0 0">' +
      gbp(RES_DEP) +
      " reserves the car for " +
      HOLD_DEP +
      ' days. <b class="imp">Non-refundable</b>, and taken off your final price.</p>' +
      '<div class="dealb" id="dealb"><h3>Build my deal</h3><p>We don’t move on the price of our cars: it’s fixed and fair from the start. What we can do is build the deal around you, with part exchange, warranty, finance, deposit and delivery options, so you get the most from every pound you spend.</p><button type="button" class="btn ghost" id="dealbtn">Build my deal</button></div>' +
      '<div class="rv" id="rv" hidden></div>' +
      "</div></div>";

    var cd = $("cd"),
      sumEl = $("sum");
    var RVN = {
      dep:
        'Pay <b class="imp">' +
        gbp(RES_DEP) +
        " to hold the car for " +
        HOLD_DEP +
        ' days</b>. The deposit is <b class="imp">non-refundable if you change your mind</b>, and it comes off your final price. It’s <b class="imp">only returned if the deal can’t go ahead through no fault of yours</b>: finance declined, the car fails inspection, or the seller withdraws. <span class="todo">[A non-refundable deposit needs your solicitor’s sign-off before launch, as online cancellation rights may apply.]</span>',
    };

    /* gallery */
    function shot(j) {
      curShot = j;
      cd.querySelectorAll(".th").forEach(function (x) {
        x.setAttribute("aria-pressed", +x.dataset.j === j);
      });
      $("gcap").textContent =
        "Photo " +
        (j + 1) +
        " of " +
        SHOTS.length +
        ": " +
        SHOTS[j] +
        ". Photos coming soon.";
    }
    shot(0);
    cd.querySelectorAll(".th").forEach(function (b) {
      b.onclick = function () {
        cd.querySelectorAll(".th").forEach(function (x) {
          x.setAttribute("aria-pressed", x === b);
        });
        shot(+b.dataset.j);
      };
    });
    var small = window.matchMedia("(max-width:820px)"),
      gp = $("gph");
    function closeFs() {
      gp.classList.remove("fs");
      document.body.classList.remove("fsopen");
      $("enl").setAttribute("aria-pressed", "false");
      $("enl").setAttribute("aria-label", "Enlarge photos");
      $("enl").title = "Enlarge photos";
      $("enl").innerHTML = ICON_EXP;
    }
    $("enl").onclick = function () {
      if (small.matches) {
        var on = !gp.classList.contains("fs");
        if (!on) {
          closeFs();
          return;
        }
        gp.classList.add("fs");
        document.body.classList.add("fsopen");
        this.setAttribute("aria-pressed", "true");
        this.setAttribute("aria-label", "Close full screen");
        this.title = "Close full screen";
        this.innerHTML = ICON_CON;
        return;
      }
      st.big = !st.big;
      cd.classList.toggle("big", st.big);
      this.setAttribute("aria-pressed", st.big);
      this.setAttribute(
        "aria-label",
        st.big ? "Shrink photos" : "Enlarge photos",
      );
      this.title = this.getAttribute("aria-label");
      this.innerHTML = st.big ? ICON_CON : ICON_EXP;
    };
    $("fsl").onclick = function () {
      shot((curShot + SHOTS.length - 1) % SHOTS.length);
    };
    $("fsr").onclick = function () {
      shot((curShot + 1) % SHOTS.length);
    };
    cd.onkeydown = function (e) {
      if (e.key === "Escape" && gp.classList.contains("fs")) closeFs();
    };
    window.addEventListener("hashchange", function f() {
      document.body.classList.remove("fsopen");
      window.removeEventListener("hashchange", f);
    });

    /* tabs */
    function showTab(k, focus) {
      st.tab = k;
      cd.querySelectorAll(".tab").forEach(function (b) {
        var on = b.dataset.k === k;
        b.setAttribute("aria-selected", on);
        b.tabIndex = on ? 0 : -1;
        if (on && focus) b.focus();
      });
      var p = $("tabpanel");
      p.setAttribute("aria-labelledby", "t-" + k);
      p.innerHTML = tabHtml(c, k);
      var cp = $("cpy");
      if (cp)
        cp.onclick = function () {
          try {
            navigator.clipboard.writeText(c.reg);
            cp.textContent = "Copied";
          } catch (e) {
            cp.textContent = "Copy failed";
          }
        };
    }
    cd.querySelectorAll(".tab").forEach(function (b) {
      b.onclick = function () {
        showTab(b.dataset.k);
      };
    });
    $("tablist").onkeydown = function (e) {
      var ks = TABS.map(function (t) {
          return t[0];
        }),
        n = ks.indexOf(st.tab);
      if (e.key === "ArrowRight") n = (n + 1) % ks.length;
      else if (e.key === "ArrowLeft") n = (n + ks.length - 1) % ks.length;
      else return;
      e.preventDefault();
      showTab(ks[n], true);
    };
    showTab("ov");

    /* terms */
    function fillTerms() {
      var t = $("term"),
        prev = +t.value,
        def = st.prod === "PCP" ? 36 : 48,
        list = TERMS[st.prod];
      t.innerHTML = list
        .map(function (m) {
          return '<option value="' + m + '">' + m + " months</option>";
        })
        .join("");
      t.value = list.indexOf(prev) >= 0 ? prev : def;
    }
    fillTerms();

    /* money */
    function update() {
      var ex = 0,
        rows = [],
        fin = st.mode === "fin";
      st.sel.forEach(function (s, j) {
        if (s) ex += optPrice(c, j, st.wt);
      });
      $("wprice").innerHTML = st.sel[1]
        ? optPrice(c, 1, st.wt) === 0
          ? "Free with this deal"
          : gbp(optPrice(c, 1, st.wt))
        : "from " + gbp(optPrice(c, 1, 0));
      $("wbox").hidden = !st.sel[1];
      $("wopts").innerHTML = WTERMS.map(function (w, t) {
        var p = optPrice(c, 1, t);
        return (
          '<button type="button" class="wt" data-t="' +
          t +
          '" aria-pressed="' +
          (st.wt === t) +
          '">' +
          w[0] +
          " year" +
          (w[0] > 1 ? "s" : "") +
          "<b>" +
          (p === 0 ? "Free" : gbp(p)) +
          "</b><small>" +
          gbp(p / w[0]) +
          " a year</small></button>"
        );
      }).join("");
      $("wopts")
        .querySelectorAll(".wt")
        .forEach(function (b) {
          b.onclick = function () {
            st.wt = +b.dataset.t;
            update();
          };
        });
      var R = rewardsFor(),
        rw = null;
      var _px = st.px || 0,
        _pxo = (st.px && pxList[st.pxId]) || null,
        _pxs = _pxo && _pxo.fn === "Yes" ? parseFloat(_pxo.settle) || 0 : 0,
        _rp = resvByMe(i) && !reserved[i].sold ? RES_DEP : 0,
        _dep = fin ? Math.max(0, Math.min(dmax, +$("dep").value || 0)) : 0,
        borrowPre = fin ? Math.max(0, c.p + FEE + ex - contrib - _px + _pxs - _dep - _rp) : 0,
        rwElig = function (m) {
          return rwOk(m, c.p, fin, borrowPre);
        };
      if (st.rw)
        rw =
          R.filter(function (m) {
            return m.id === st.rw && rwElig(m);
          })[0] || null;
      if (!rw) st.rw = null;
      var rb = $("rwbox");
      if (!R.length) rb.innerHTML = "";
      else if (!user.roles.buyer || user.role !== "buyer")
        rb.innerHTML =
          '<div class="rwb"><p class="rw-t"><span class="tk-star" aria-hidden="true">★</span>You have ' +
          R.length +
          " reward" +
          (R.length > 1 ? "s" : "") +
          ' to use</p><p class="small" style="margin:0 0 10px">Rewards from selling can only be used through your own linked buyer account.</p><a class="btn ghost" href="#profile">' +
          (user.roles.buyer ? "Switch to buying" : "Add a buyer account") +
          "</a></div>";
      else
        rb.innerHTML =
          '<div class="rwb rw-' +
          String(R[0].tier || "gold").toLowerCase() +
          '"><p class="rw-t"><span class="tk-star" aria-hidden="true">★</span>Your rewards</p>' +
          R.map(function (m) {
            var on = st.rw === m.id,
              ok = rwElig(m);
            return (
              '<button type="button" class="rwbtn rwt-' +
              String(m.tier || "gold").toLowerCase() +
              (on ? " on" : "") +
              (ok ? "" : " rw-no") +
              '"' +
              (ok ? ' data-rw="' + m.id + '"' : " disabled") +
              ' aria-pressed="' +
              on +
              '"><b>' +
              m.tier +
              " reward: £" +
              fmt(m.amt) +
              " off</b><span>" +
              (!ok
                ? "Not available on this car. " + rwWhy(m)
                : on
                  ? "Applied. Select to remove"
                  : "Select to apply to this car") +
              "</span></button>"
            );
          }).join("") +
          '<p class="note small" style="margin:10px 0 0">Linked to your account, so only you can use it. Each reward can be used once, on one car. Rewards apply to cars from £12,000 (£15,000 for £500 off, £18,000 for £750 off). On finance, borrowing £10,000 or more lowers this by £3,000.</p></div>';
      rb.querySelectorAll("[data-rw]").forEach(function (b) {
        b.onclick = function () {
          var tt = sumEl.querySelector(".row.big2 span:last-child"),
            was = tt ? tt.textContent : "",
            on = st.rw !== b.dataset.rw;
          st.rw = on ? b.dataset.rw : null;
          update();
          if (on) rwFx(was);
        };
      });
      var rwa = rw ? rw.amt : 0;
      var base = c.p + FEE + ex - rwa,
        px = st.px,
        pxo = (st.px && pxList[st.pxId]) || null,
        pxs = pxo && pxo.fn === "Yes" ? parseFloat(pxo.settle) || 0 : 0,
        rp = resvByMe(i) && !reserved[i].sold ? RES_DEP : 0;
      $("fin").hidden = !fin;
      $("fnote").hidden = !fin;
      cd.querySelectorAll("button[data-m]").forEach(function (b) {
        b.setAttribute("aria-pressed", b.dataset.m === st.mode);
      });
      cd.querySelectorAll("button[data-p]").forEach(function (b) {
        b.setAttribute("aria-pressed", b.dataset.p === st.prod);
      });
      function row(a, b, cls) {
        rows.push(
          '<div class="row' +
            (cls ? " " + cls : "") +
            '"><span>' +
            a +
            "</span><span>" +
            b +
            "</span></div>",
        );
      }
      row("Vehicle price", gbp(c.p));
      row("Buyer fee (sample)", gbp(FEE));
      st.sel.forEach(function (s, j) {
        if (s)
          row(
            OPTS[j][0] +
              (j === 1
                ? ", " +
                  WTERMS[st.wt][0] +
                  " year" +
                  (WTERMS[st.wt][0] > 1 ? "s" : "")
                : ""),
            optPrice(c, j, st.wt) === 0 ? "Free" : gbp(optPrice(c, j, st.wt)),
          );
      });
      if (rw)
        row(
          "★ " + rw.tier + " reward: £" + fmt(rw.amt) + " off",
          "−" + gbp(rw.amt),
          "rwrow t-" + rw.tier.toLowerCase(),
        );
      if (!fin) {
        if (px) {
          row("Part exchange estimate", "−" + gbp(px));
          if (pxs)
            row("Finance we settle on your part exchange", "+" + gbp(pxs));
        }
        if (rp) row("Reservation already paid", "−" + gbp(rp));
        row(
          rp ? "Left to pay" : "Total to pay",
          gbp(Math.max(0, base - px + pxs - rp)),
          "big2",
        );
        if (pxs > px)
          row(
            "You owe " +
              gbp(pxs - px) +
              " more than your part exchange is worth, so the difference is added to your total.",
            "",
            "negrow",
          );
      } else {
        var dep = Math.max(0, Math.min(dmax, +$("dep").value || 0)),
          n = +$("term").value,
          apr = RATES[$("cr").value] / 100,
          mil = +$("mil").value,
          pcp = st.prod === "PCP";
        $("apr").textContent = RATES[$("cr").value].toFixed(1) + "%";
        $("mil-l").hidden = !pcp;
        $("pnote").textContent = pcp
          ? "PCP: lower monthly payments, then a choice at the end: pay the final payment to keep the car, part-exchange it, or hand it back."
          : "HP: higher monthly payments, and the car is yours when the last one is paid.";
        if (contrib)
          row("Deal deposit contribution (fixed)", "−" + gbp(contrib));
        if (px) {
          row("Part exchange estimate", "−" + gbp(px));
          if (pxs)
            row("Finance we settle on your part exchange", "+" + gbp(pxs));
        }
        if (rp)
          row(
            "Reservation already paid (counts towards your deposit)",
            "−" + gbp(rp),
          );
        row("Your cash deposit", "−" + gbp(dep));
        var credit = Math.max(0, base - contrib - px + pxs - dep - rp),
          r = Math.pow(1 + apr, 1 / 12) - 1,
          B = 0;
        if (pcp && credit > 0) {
          var pct = Math.min(
            0.65,
            Math.max(0.12, GMFV[n] + ((10000 - mil) / 1000) * 0.012),
          );
          B = Math.min(
            Math.round((c.p * pct) / 10) * 10,
            Math.round((credit * 0.9) / 10) * 10,
          );
        }
        var pmt =
          credit > 0
            ? Math.round(
                (((credit - B / Math.pow(1 + r, n)) * r) /
                  (1 - Math.pow(1 + r, -n))) *
                  100,
              ) / 100
            : 0;
        var paid = pmt * n,
          interest = Math.max(0, paid + B - credit),
          total = dep + rp + paid + B;
        row("Amount borrowed", gbp(credit), "strong");
        row("Interest you’ll pay", gbp(interest));
        row("Monthly payments", n + " × " + gbp2(pmt));
        if (pcp) {
          row("Optional final payment", gbp(B));
          row("Mileage allowance", fmt((mil * n) / 12) + " miles in total");
          row("Excess mileage fee", EXCESS_P + "p per mile");
        }
        row(
          "Total amount payable" + (pcp ? " (with final payment)" : ""),
          gbp(total),
          "big2",
        );
        if (pcp)
          row(
            "If you hand the car back instead",
            gbp(dep + paid) + " plus any excess mileage or damage charges",
          );
        $("pm").textContent = gbp2(pmt);
        $("pmsub").textContent =
          credit > 0
            ? pcp
              ? n +
                " payments, then a final payment of " +
                gbp(B) +
                " if you’d like to keep it."
              : n + " payments, then the car is yours."
            : "Your deposit and part exchange cover the full price, so you wouldn’t need finance.";
      }
      sumEl.innerHTML = rows.join("");
    }

    function rwFx(was) {
      if (
        window.matchMedia &&
        matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      var box = $("rwbox").querySelector(".rwb"),
        btn = $("rwbox").querySelector(".rwbtn.on");
      if (box && btn) {
        btn.classList.add("rw-pop");
        var sh = document.createElement("i");
        sh.className = "rw-shine";
        btn.appendChild(sh);
        var cx = btn.offsetLeft + btn.offsetWidth / 2,
          cy = btn.offsetTop + btn.offsetHeight / 2;
        for (var k = 0; k < 22; k++) {
          var s = document.createElement("span"),
            a = (Math.PI * 2 * k) / 22 + Math.random() * 0.3,
            d = 60 + Math.random() * 80;
          s.className = "rw-spark";
          s.textContent = "★";
          s.style.left = cx + "px";
          s.style.top = cy + "px";
          s.style.setProperty(
            "--dx",
            (Math.cos(a) * d * 1.4).toFixed(0) + "px",
          );
          s.style.setProperty(
            "--dy",
            (Math.sin(a) * d * 0.7).toFixed(0) + "px",
          );
          s.style.animationDelay = Math.round(Math.random() * 120) + "ms";
          box.appendChild(s);
          setTimeout(
            (function (x) {
              return function () {
                x.remove();
              };
            })(s),
            1300,
          );
        }
      }
      var row = sumEl.querySelector(".rwrow"),
        tc = row && /t-(\w+)/.exec(row.className),
        tn = tc ? tc[1] : "gold";
      if (row) row.classList.add("rw-in");
      var tr = sumEl.querySelector(".row.big2"),
        t = tr && tr.querySelector("span:last-child");
      if (t) {
        var from = parseInt(String(was).replace(/[£,]/g, ""), 10),
          to = parseInt(t.textContent.replace(/[£,]/g, ""), 10);
        if (from > to) {
          var sv = document.createElement("span");
          sv.className = "rw-float rwf-" + tn;
          sv.textContent = "You save " + gbp(from - to);
          tr.appendChild(sv);
          setTimeout(function () {
            sv.remove();
          }, 2300);
          t.classList.add("rw-tot", "rwt2-" + tn);
          var t0 = null;
          var stp = function (ts) {
            if (!t0) t0 = ts;
            var p = Math.min(1, (ts - t0) / 1000),
              e = 1 - Math.pow(1 - p, 3);
            t.textContent = gbp(from + (to - from) * e);
            if (p < 1) requestAnimationFrame(stp);
            else {
              t.textContent = gbp(to);
              setTimeout(function () {
                t.classList.remove("rw-tot", "rwt2-" + tn);
              }, 700);
            }
          };
          requestAnimationFrame(stp);
        }
      }
    }

    /* wiring */
    cd.querySelectorAll("button[data-m]").forEach(function (b) {
      b.onclick = function () {
        st.mode = b.dataset.m;
        update();
      };
    });
    cd.querySelectorAll("button[data-p]").forEach(function (b) {
      b.onclick = function () {
        st.prod = b.dataset.p;
        fillTerms();
        update();
      };
    });
    ["cr", "term", "mil"].forEach(function (id) {
      $(id).onchange = update;
    });
    $("dep-r").oninput = function () {
      $("dep").value = this.value;
      update();
    };
    $("dep").oninput = function () {
      var v = Math.max(0, Math.min(dmax, +this.value || 0));
      $("dep-r").value = v;
      update();
    };
    $("dep").onchange = function () {
      this.value = Math.max(0, Math.min(dmax, +this.value || 0));
      update();
    };
    cd.querySelectorAll("input[data-j]").forEach(function (x) {
      x.onchange = function () {
        st.sel[+x.dataset.j] = x.checked ? 1 : 0;
        update();
      };
    });

    /* part exchange */
    if (!$("x-go")) {
      cd.querySelectorAll("[data-px]").forEach(function (b) {
        b.onclick = function () {
          var n = +b.dataset.px;
          if (st.px && st.pxId === n) {
            st.px = 0;
          } else {
            st.pxId = n;
            st.px = pxList[n].val;
          }
          carView(i);
        };
      });
      $("x-chg").onclick = function () {
        st.pxEdit = true;
        pxDraft = null;
        carView(i);
      };
    } else {
      if ($("x-cancel"))
        $("x-cancel").onclick = function () {
          st.pxEdit = false;
          carView(i);
        };
      ["reg", "mi", "keys", "sv", "ow", "v5", "pr", "fn", "val"].forEach(
        function (k) {
          var x = $("x-" + k);
          x.oninput = x.onchange = function () {
            x.classList.remove("miss");
          };
        },
      );
      $("x-fill").onclick = function () {
        var E = {
          reg: "YK19 ABC",
          mi: "42000",
          keys: "2",
          sv: "Full",
          ow: "2",
          v5: "Yes",
          pr: "No",
          fn: "No",
          val: "6500",
        };
        for (var k in E) {
          if (!$("x-" + k).value) $("x-" + k).value = E[k];
          $("x-" + k).classList.remove("miss");
        }
        $("x-msg").innerHTML = "";
      };
      $("x-go").onclick = function () {
        var D = {},
          bad = 0;
        ["reg", "mi", "keys", "sv", "ow", "v5", "pr", "fn", "val"].forEach(
          function (k) {
            var x = $("x-" + k);
            D[k] = x.value.trim();
            var ok =
              k === "val"
                ? parseInt(D[k].replace(/[,£]/g, ""), 10) > 0
                : !!D[k];
            x.classList.toggle("miss", !ok);
            if (!ok) bad++;
          },
        );
        if (bad) {
          $("x-msg").className = "pxmsg";
          $("x-msg").innerHTML =
            '<p style="margin:0;color:var(--bad)">Please fill in the fields highlighted.</p>';
          return;
        }
        D.reg = D.reg.toUpperCase();
        D.val = parseInt(D.val.replace(/[,£]/g, ""), 10);
        D.shots = {};
        D.ev = {};
        D.dmg = [];
        D.none = false;
        D.step = 0;
        pxDraft = D;
        pxRet = i;
        st.pxEdit = true;
        if (!user) {
          after = "#px";
          location.hash = "#profile";
        } else location.hash = "#px";
      };
    }

    /* buy, reserve, build my deal */
    function total() {
      var t = $("sum").querySelector(".row.big2 span:last-child");
      return t ? t.textContent : "";
    }
    function panel(v) {
      st.rv = v;
      st.rvOpen = true;
      var p = $("rv"),
        fin = st.mode === "fin",
        h,
        lbl;
      if (v === "buy") {
        h =
          '<h3 style="margin:0 0 6px">Buy it now</h3><p style="margin:0 0 10px">' +
          (fin
            ? "Next, complete your finance application for the " +
              name +
              '. Most decisions come back the same day, and the car is held for you while we wait. <span class="todo">[Finance application to be connected.]</span>'
            : "You’re buying the " +
              name +
              " for <b>" +
              total() +
              '</b>. Next, pay securely online, then we’ll confirm your delivery date. <span class="todo">[Secure payment to be connected.]</span>') +
          "</p>";
        lbl = fin ? "Continue to finance application" : "Continue to payment";
      } else if (v === "dep") {
        h =
          '<h3 style="margin:0 0 6px">Reserve for ' +
          gbp(RES_DEP) +
          '</h3><p class="note" style="margin:0 0 12px">' +
          RVN.dep +
          '</p><p style="margin:0 0 14px">We’ll send a secure payment link to ' +
          (user
            ? "<b>" + esc(user.email) + "</b>"
            : "the email on your account") +
          ". The car is reserved as soon as you pay.</p>";
        lbl = "Send my " + gbp(RES_DEP) + " payment link";
      } else {
        var D = st.deal || {};
        h =
          '<h3 style="margin:0 0 6px">Build my deal</h3><p style="margin:0 0 12px">Tell us what you’d like to talk about and when suits you. We’ll call you to build a deal around what we can offer.</p>' +
          '<fieldset class="dtop" id="dtop"><legend>What would you like to talk about?</legend>' +
          ["Part exchange", "Warranty", "Finance and deposit", "Delivery"]
            .map(function (t) {
              return (
                '<label class="rad"><input type="checkbox" value="' +
                t +
                '"' +
                ((D.t || []).indexOf(t) >= 0 ? " checked" : "") +
                "> " +
                t +
                "</label>"
              );
            })
            .join("") +
          "</fieldset>" +
          '<div class="ctl2" style="margin:12px 0"><label>Best time to call<select id="dtime">' +
          [
            "Weekday mornings",
            "Weekday afternoons",
            "Weekday evenings",
            "Saturdays",
          ]
            .map(function (o) {
              return (
                "<option" +
                (D.when === o ? " selected" : "") +
                ">" +
                o +
                "</option>"
              );
            })
            .join("") +
          '</select></label><label>Phone number<input id="dphone" type="tel" autocomplete="tel" value="' +
          esc(D.ph || "") +
          '"></label></div>';
        lbl = "Send my request";
      }
      p.className = "rv";
      p.hidden = false;
      p.innerHTML =
        h +
        '<p class="pxerr" id="rverr" aria-live="polite"></p><button type="button" class="btn" id="rvgo">' +
        lbl +
        '</button> <button type="button" class="btn ghost" id="rvx">Cancel</button><p class="muted small" style="margin:10px 0 0">You’ll need an account for this. If you’re not signed in, we’ll take you to sign in or create one, then bring you straight back here.</p>';
      ["buybtn", "resbtn", "dealbtn"].forEach(function (id) {
        $(id).setAttribute(
          "aria-expanded",
          { buybtn: "buy", resbtn: "dep", dealbtn: "deal" }[id] === v,
        );
      });
      $("rvx").onclick = function () {
        p.hidden = true;
        st.rvOpen = false;
      };
      if ($("dphone"))
        $("dphone").oninput = function () {
          this.classList.remove("miss");
        };
      $("rvgo").onclick = function () {
        if (v === "deal") {
          var t = [].map.call(
              p.querySelectorAll("#dtop input:checked"),
              function (x) {
                return x.value;
              },
            ),
            ph = $("dphone").value.trim(),
            ok = ph.replace(/\D/g, "").length >= 10;
          $("dphone").classList.toggle("miss", !ok);
          $("dtop").classList.toggle("miss", !t.length);
          st.deal = { t: t, when: $("dtime").value, ph: ph };
          if (!ok || !t.length) {
            $("rverr").textContent =
              "Choose at least one topic and add your phone number.";
            return;
          }
        }
        if (!user) {
          after = "#car-" + i;
          location.hash = "#profile";
          return;
        }
        if (user.role !== "buyer") {
          if (user.roles.buyer) {
            user.role = "buyer";
            updProf();
          } else {
            var g = document.createElement("div");
            g.className = "warnb";
            g.innerHTML =
              '<b>You’re signed in as a seller</b><p>Reserving and buying cars uses a buyer account. Add one now: it uses the same sign-in and is linked to you, so any seller rewards can be used on this car.</p><button type="button" class="btn" id="addbuy">Add a buyer account and continue</button>';
            $("rvgo").hidden = true;
            p.insertBefore(g, $("rvgo"));
            $("addbuy").onclick = function () {
              user.roles.buyer = true;
              user.role = "buyer";
              updProf();
              carView(i);
            };
            return;
          }
        }
        if ((v === "dep" || v === "buy") && needId("#car-" + i)) return;
        if (v === "dep") {
          var oth = Object.keys(reserved).filter(function (k) {
            return +k !== i && resvByMe(+k) && !reserved[k].sold;
          })[0];
          if (oth != null) {
            var oc = cars[+oth];
            p.innerHTML =
              '<h3 style="margin:0 0 6px">You already have a car reserved</h3><p>The ' +
              oc.y +
              " " +
              oc.mk +
              " " +
              oc.md +
              " is reserved for you until " +
              reserved[oth].until +
              '. You can hold one car at a time.</p><div class="pxnav"><a class="btn" href="#car-' +
              oth +
              '">Go to that car</a><button type="button" class="btn ghost" id="cxo">Cancel that reservation</button><button type="button" class="btn ghost" id="rvx2">Not now</button></div>';
            $("rvx2").onclick = function () {
              p.hidden = true;
              st.rvOpen = false;
            };
            $("cxo").onclick = function () {
              cancelRes(+oth, function () {
                panel("dep");
              });
            };
            return;
          }
        }
        if (v === "buy") {
          if (myPur && myPur.i !== i && myPur.stage < 3 && !myPur.ret) {
            p.innerHTML =
              '<h3 style="margin:0 0 6px">You’re already buying a car</h3><p>Finish or cancel your purchase of the ' +
              carNm(myPur.i) +
              ' first.</p><a class="btn" href="#profile" id="gopu">Go to My purchase</a>';
            $("gopu").onclick = function () {
              pwant = "pu";
            };
            return;
          }
          var tot = parseInt(total().replace(/[£,]/g, ""), 10) || 0;
          myPur = {
            i: i,
            mode: fin ? "fin" : "cash",
            total: tot,
            stage: 0,
            res: !!resvByMe(i),
            started: new Date().toLocaleDateString("en-GB"),
            dep: fin ? Math.max(0, +$("dep").value || 0) : 0,
            prod: st.prod,
            term: +$("term").value,
            pm: fin ? $("pm").textContent : "",
            dlv: !!st.sel[2],
            wt: st.sel[1] ? WTERMS[st.wt][0] : 0,
            insp: !!st.sel[0],
            px: st.px && pxList[st.pxId] ? pxList[st.pxId].reg : "",
          };
          resv = resv.filter(function (r) {
            return !(r.i === i && r.v === "buy");
          });
          resv.push({ i: i, v: "buy" });
          if (st.rw) {
            var um0 = MAIL.seller.filter(function (m) {
              return m.id === st.rw;
            })[0];
            if (um0) um0.used = name;
          }
          st.rvOpen = false;
          if (fin) {
            addMail("buyer", {
              s: "Finance application started: " + name,
              b: "Finish your application in a few minutes. Most decisions come back the same day.",
              href: "#fin",
              hl: "Continue application",
            });
            location.hash = "#fin";
            return;
          }
          payTok = {
            i: i,
            kind: "bal",
            amt: tot,
            tok: Math.random().toString(36).slice(2),
          };
          addMail("buyer", {
            s: "Pay for your " + name,
            b:
              "Use this secure link to pay " +
              gbp(tot) +
              " for the " +
              name +
              ". The link only works for you.",
            href: "#pay",
            hl: "Pay " + gbp(tot),
          });
          location.hash = "#pay";
          return;
        }
        if (v === "dep") {
          payTok = {
            i: i,
            kind: "res",
            amt: RES_DEP,
            tok: Math.random().toString(36).slice(2),
            rw: st.rw || null,
          };
          MAIL.buyer.unshift({
            id: "p" + Date.now(),
            s: "Your " + gbp(RES_DEP) + " payment link: " + name,
            b:
              "Use this secure link to pay your " +
              gbp(RES_DEP) +
              " non-refundable reservation for the " +
              name +
              ". The car is reserved for " +
              HOLD_DEP +
              " days as soon as you pay. The link only works for you.",
            d: "Just now",
            u: true,
            href: "#pay",
            hl: "Pay " + gbp(RES_DEP),
          });
          st.done = "link";
          showDone();
          return;
        }
        resv.push({ i: i, v: v, deal: st.deal });
        if (v !== "deal" && st.rw) {
          var um = MAIL.seller.filter(function (m) {
            return m.id === st.rw;
          })[0];
          if (um) um.used = name;
        }
        if (v === "deal")
          MAIL.buyer.unshift({
            id: "d" + Date.now(),
            s: "Build my deal request received: " + name,
            b:
              "Thank you" +
              (user.first ? ", " + esc(user.first) : "") +
              ". Your Build my deal request has been received. We’ll message you with the date and time of your call closer to the time, so you know when to expect us. On the call we’ll talk through: " +
              esc(st.deal.t.join(", ").toLowerCase()) +
              ".",
            d: "Just now",
            u: true,
            go: "ov",
          });
        st.done = v;
        showDone();
      };
    }
    function showDone() {
      var v = st.done,
        h,
        fin = st.mode === "fin";
      if (v === "link")
        h =
          '<h3>Payment link sent</h3><p>We’ve sent a secure link to pay your <b class="imp">' +
          gbp(RES_DEP) +
          " non-refundable reservation</b> to <b>" +
          esc(user.email) +
          '</b>. It’s in your profile mail too. The car is reserved as soon as you pay.</p><p style="margin:0 0 4px"><a class="btn" href="#pay">Open the payment link (preview)</a></p><p class="muted small" style="margin:0">In the live service this link only arrives by email and text. <span class="todo">[Payment links and the payment provider to be connected.]</span></p>';
      else if (v === "deal")
        h =
          "<h3>Request received</h3><p>Thank you" +
          (user && user.first ? ", " + esc(user.first) : "") +
          ". Your Build my deal request for the " +
          name +
          ' has been received. We’ll message you with the <b>date and time of your call</b> closer to the time, by email and in your profile, so you know when to expect us.</p><p class="muted small" style="margin:0">The car isn’t held in the meantime. Reserve it if you don’t want to miss it.</p>';
      else if (v === "dep")
        h =
          '<h3>Reservation started</h3><p>Next step: pay the <b class="imp">' +
          gbp(RES_DEP) +
          " non-refundable deposit</b> to hold the " +
          name +
          " for " +
          HOLD_DEP +
          ' days. It comes off your final price. <span class="todo">[Card payment to be connected.]</span></p>';
      else
        h =
          "<h3>" +
          (fin ? "Finance application started" : "Purchase started") +
          "</h3><p>" +
          (fin
            ? "We’ll take you through your finance application for the " +
              name +
              ' next. <span class="todo">[Finance application to be connected.]</span>'
            : "Next, pay securely for the " +
              name +
              ', then choose your delivery date. <span class="todo">[Secure payment to be connected.]</span>') +
          "</p>";
      $("rv").hidden = false;
      $("rv").className = "rvdone";
      $("rv").innerHTML =
        h +
        '<p style="margin:10px 0 0"><a class="lnk" href="#profile">See it in your profile</a></p>';
      if (v !== "deal") {
        $("buybtn").hidden = true;
        $("resbtn").hidden = true;
        $("resnote").hidden = true;
        $("dealb").hidden = true;
      } else $("dealbtn").hidden = true;
    }
    $("buybtn").onclick = function () {
      panel("buy");
    };
    $("resbtn").onclick = function () {
      panel("dep");
    };
    $("dealbtn").onclick = function () {
      panel("deal");
    };
    if (reserved[i] && !resvByMe(i)) {
      $("buybtn").parentNode.hidden = true;
      $("resnote").hidden = true;
      $("dealb").hidden = true;
      var on = !!(user && interest[i]),
        box = document.createElement("div");
      box.className = "resbox";
      box.innerHTML = on
        ? '<h3>You’re on the list</h3><p>Perfect. We’ll let you know if this car comes back on sale, so you can reserve it and buy it for yourself. You’ll get an email and a message in your profile.</p><div class="pvrow"><span class="muted small">Preview:</span><button type="button" class="lnkb" id="oexp">This reservation ends</button></div>'
        : '<h3>This car is reserved for now</h3><p>Someone has reserved it, but reservations don’t always go ahead. Would you like us to tell you if it comes back on sale?</p><button type="button" class="btn" id="intbtn">Register my interest</button><p class="muted small" style="margin:10px 0 0">You’ll need an account. If you’re not signed in, we’ll bring you straight back here.</p>';
      $("buybtn").parentNode.parentNode.insertBefore(
        box,
        $("buybtn").parentNode,
      );
      if ($("oexp"))
        $("oexp").onclick = function () {
          endRes(i, "other");
          carView(i);
        };
      if ($("intbtn"))
        $("intbtn").onclick = function () {
          if (!user) {
            after = "#car-" + i;
            location.hash = "#profile";
            return;
          }
          interest[i] = true;
          MAIL.buyer.unshift({
            id: "i" + Date.now(),
            s: "You’re on the list: " + name,
            b:
              "Thanks" +
              (user.first ? ", " + esc(user.first) : "") +
              ". The " +
              name +
              " is reserved right now. If it comes back on sale, we’ll tell you straight away so you can reserve it and buy it for yourself.",
            d: "Just now",
            u: true,
            href: "#car-" + i,
            hl: "View the car",
          });
          carView(i);
        };
    } else if (resvByMe(i)) {
      if (reserved[i].sold) {
        $("buybtn").parentNode.hidden = true;
        $("dealb").hidden = true;
        $("resnote").innerHTML =
          '<b>You’re buying this car.</b> Follow each step in <a class="lnk" href="#profile" id="gopu2">My purchase</a>.';
        $("gopu2").onclick = function () {
          pwant = "pu";
        };
      } else {
        var dlf = daysLeft(reserved[i].until);
        $("resbtn").hidden = true;
        $("resnote").innerHTML =
          "<b>Reserved for you until " +
          reserved[i].until +
          "</b> (" +
          (dlf === 1 ? "1 day" : dlf + " days") +
          " left). Your " +
          gbp(RES_DEP) +
          ' is already taken off the total above. Choose Buy it now when you’re ready. We’ll email you 48 hours before it ends.<span class="pvrow" style="margin-top:8px"><button type="button" class="lnkb" id="cxme">Cancel my reservation</button></span><span class="pvrow"><span class="muted small">Preview:</span><button type="button" class="lnkb" id="rmnd">The email 48 hours before it ends</button><button type="button" class="lnkb" id="rexp">The reservation runs out</button></span>';
        $("cxme").onclick = function () {
          cancelRes(i, function () {
            carView(i);
          });
        };
        $("rmnd").onclick = function () {
          addMail("buyer", {
            s: "48 hours left on your reservation: " + name,
            b:
              "Your reservation on the " +
              name +
              " ends in 48 hours, on " +
              reserved[i].until +
              ". Buy it now to keep it, or it goes back on sale and your " +
              gbp(RES_DEP) +
              " isn’t refunded.",
            href: "#car-" + i,
            hl: "Buy it now",
          });
          updProf();
          this.textContent = "Email sent, and copied to your mail";
        };
        $("rexp").onclick = function () {
          endRes(i, "expire");
          carView(i);
        };
      }
      if (st.done === "link" || st.done === "dep") st.done = null;
    }
    if (st.done) showDone();
    else if (
      st.rvOpen &&
      st.rv &&
      !(reserved[i] && !resvByMe(i)) &&
      !(st.rv === "dep" && resvByMe(i)) &&
      !(reserved[i] && reserved[i].sold)
    )
      panel(st.rv);
    $("savebtn").onclick = function () {
      if (saved[i]) delete saved[i];
      else saved[i] = 1;
      this.setAttribute("aria-pressed", !!saved[i]);
      $("savetxt").textContent = saved[i]
        ? "You have saved this vehicle"
        : "Save this car";
      if (saved[i]) toast();
      else {
        var o = $("toast");
        if (o) o.remove();
      }
    };
    update();
  }

  function carNm(k) {
    var c = cars[k];
    return c.y + " " + c.mk + " " + c.md;
  }
  function cancelRes(k, cb) {
    mdl(
      '<h2 style="margin:0 0 6px">Cancel your reservation?</h2><p>The ' +
        carNm(k) +
        ' goes back on sale straight away.</p><p><b class="imp">Your ' +
        gbp(RES_DEP) +
        ' isn’t refunded</b> when you cancel because you’ve changed your mind. <span class="todo">[Solicitor to confirm.]</span></p><div class="pxnav"><button type="button" class="btn" id="cxok">Cancel my reservation</button><button type="button" class="btn ghost" data-x>Keep it</button></div>',
      function (m) {
        m.querySelector("#cxok").onclick = function () {
          mdlX();
          endRes(k, "cancel");
          if (cb) cb();
        };
      },
    );
  }
  function endRes(k, why) {
    var nm = carNm(k);
    MAIL.seller.forEach(function (m) {
      if (m.perk && m.used === nm) m.used = null;
    });
    delete reserved[k];
    resv = resv.filter(function (r) {
      return !(r.i === +k && r.v === "dep");
    });
    var M = {
      cancel: [
        "Reservation cancelled: ",
        "You’ve cancelled your reservation and the car is back on sale. As agreed when you reserved, the " +
          gbp(RES_DEP) +
          " isn’t refunded.",
      ],
      expire: [
        "Your reservation has ended: ",
        "Your " +
          HOLD_DEP +
          "-day reservation has run out and the car is back on sale. As agreed when you reserved, the " +
          gbp(RES_DEP) +
          " isn’t refunded. You can reserve it again if it’s still available.",
      ],
      refund: [
        "Your " + gbp(RES_DEP) + " is being refunded: ",
        "The deal couldn’t go ahead through no fault of yours, so your " +
          gbp(RES_DEP) +
          " will be back on your card within 5 to 10 working days.",
      ],
    }[why];
    if (M && user)
      addMail("buyer", {
        s: M[0] + nm,
        b: M[1],
        href: "#car-" + k,
        hl: "View the car",
      });
    if (interest[k] && user) {
      addMail("buyer", {
        s: "Back on sale: " + nm,
        b: "Good news: the car you asked about is available again. Reserve it now before someone else does.",
        href: "#car-" + k,
        hl: "Reserve it now",
      });
      delete interest[k];
    }
    updProf();
  }

  /* profile */
  var PTABS = {
    buyer: [
      ["ov", "Overview"],
      ["pu", "My purchase"],
      ["lt", "Live tracking"],
      ["sv", "Saved cars"],
      ["px", "Part exchange"],
      ["dc", "Documents"],
      ["ml", "Mail"],
    ],
    seller: [
      ["ov", "Overview"],
      ["li", "My listings"],
      ["po", "Offers and payout"],
      ["rv", "Vehicle revenue"],
      ["dc", "Documents"],
      ["ml", "Mail"],
    ],
  };
  var ptab = "ov";
  var STOPS = [
    ["Leeds", 330, 52],
    ["Sheffield", 352, 112],
    ["Derby", 374, 176],
    ["Birmingham", 300, 226],
    ["Your address", 250, 282],
  ];
  function mapSvg() {
    var A = STOPS[1],
      B = STOPS[2],
      f = 0.4,
      tx = A[1] + (B[1] - A[1]) * f,
      ty = A[2] + (B[2] - A[2]) * f;
    var done =
      "M" +
      STOPS[0][1] +
      " " +
      STOPS[0][2] +
      " L" +
      A[1] +
      " " +
      A[2] +
      " L" +
      tx.toFixed(0) +
      " " +
      ty.toFixed(0);
    var todo =
      "M" +
      tx.toFixed(0) +
      " " +
      ty.toFixed(0) +
      " L" +
      B[1] +
      " " +
      B[2] +
      " L" +
      STOPS[3][1] +
      " " +
      STOPS[3][2] +
      " L" +
      STOPS[4][1] +
      " " +
      STOPS[4][2];
    var dots = STOPS.map(function (s, j) {
      var past = j <= 1,
        last = j === 4,
        left = s[1] < 300 || last || j === 1;
      return (
        '<circle cx="' +
        s[1] +
        '" cy="' +
        s[2] +
        '" r="' +
        (last ? 9 : 6) +
        '" class="' +
        (past ? "sd" : last ? "sl" : "sn") +
        '"/><text x="' +
        (left ? s[1] - 16 : s[1] + 16) +
        '" y="' +
        (s[2] + 4) +
        '" text-anchor="' +
        (left ? "end" : "start") +
        '" class="mt">' +
        s[0] +
        "</text>"
      );
    }).join("");
    return (
      '<div class="map"><svg viewBox="0 0 560 320" role="img" aria-label="Schematic map of the delivery route. The transporter is between Sheffield and Derby, with two stops before your address.">' +
      '<rect class="mbg" width="560" height="320"/>' +
      '<path class="rd" d="M20 80Q160 60 300 90T540 70M40 200Q200 180 320 210T540 190M120 10Q140 140 100 310M440 10Q420 150 470 310M20 260Q200 250 540 280"/>' +
      '<path class="rt2" d="' +
      todo +
      '"/><path class="rt1" d="' +
      done +
      '"/>' +
      dots +
      '<g transform="translate(' +
      tx.toFixed(0) +
      "," +
      ty.toFixed(0) +
      ')"><circle r="15" class="tk"/><rect x="-8" y="-4.5" width="11" height="8" rx="1.5" class="tg"/><path d="M4 -4.5h4l3 3.5v4.5H4z" class="tg"/></g>' +
      '<text x="' +
      (tx + 22).toFixed(0) +
      '" y="' +
      (ty + 5).toFixed(0) +
      '" class="mt b">Transporter</text></svg></div>'
    );
  }
  function logsHtml() {
    return '<ol class="route"><li class="done">Collected from seller<small>Leeds, 08:40</small></li><li class="done">Stop 1: delivered<small>Sheffield, 11:05</small></li><li class="now">Heading to stop 2<small>Derby, arriving about 14:10</small></li><li>Stop 3<small>Birmingham, about 15:50</small></li><li>Your address<small>About 17:30</small></li></ol>';
  }
  function docs(list) {
    return (
      '<ul class="pts">' +
      list
        .map(function (d) {
          return (
            "<li><b>" +
            d[0] +
            '</b> <span class="muted">' +
            d[1] +
            "</span></li>"
          );
        })
        .join("") +
      '</ul><p class="note" style="margin-top:14px">Sample documents.</p>'
    );
  }
  function savedCount() {
    return Object.keys(saved).length;
  }

  var upl = {},
    upm = { pay: "fin" },
    upf = {};
  var REQ = {
    id: [
      [
        "lic",
        "Photo driving licence",
        "Front and back. Needed to verify who you are and to arrange delivery.",
      ],
      [
        "addr",
        "Proof of address",
        "A bank statement or utility bill dated within the last 3 months.",
      ],
    ],
    fin: [
      ["bank", "Bank statements", "The last 3 months, all pages."],
      [
        "inc",
        "Proof of income",
        "Your last 3 payslips, or your latest SA302 and tax year overview if you’re self-employed.",
      ],
      [
        "prev",
        "Previous address (if under 3 years)",
        "Proof for any address you’ve lived at in the last 3 years.",
      ],
    ],
    cash: [
      [
        "funds",
        "Proof of funds",
        "A recent bank statement showing the payment will come from your own account.",
      ],
    ],
  };
  function reqRow(r) {
    var f = upl[r[0]];
    return (
      '<div class="req' +
      (f ? " ok" : "") +
      '"><div><b>' +
      r[1] +
      "</b><small>" +
      r[2] +
      '</small></div><div><span class="st2">' +
      (f ? esc(f) + " (preview only, not stored)" : "Not uploaded") +
      '</span> <label class="fup">' +
      (f ? "Replace" : "Choose file") +
      '<input type="file" accept=".pdf,.jpg,.jpeg,.png,.heic" data-u="' +
      r[0] +
      '" aria-label="' +
      r[1] +
      '"></label></div></div>'
    );
  }
  function uploadsHtml() {
    var fin = upm.pay === "fin",
      list = REQ.id.concat(fin ? REQ.fin : REQ.cash),
      done = list.filter(function (r) {
        return upl[r[0]];
      }).length;
    var F = function (k, v) {
      return upf[k] != null ? upf[k] : v;
    };
    var sel = function (k, opts) {
      return (
        '<select data-f="' +
        k +
        '">' +
        opts
          .map(function (o) {
            return (
              "<option" +
              (F(k, "") === o ? " selected" : "") +
              ">" +
              o +
              "</option>"
            );
          })
          .join("") +
        "</select>"
      );
    };
    return (
      '<section class="upl" id="upl" aria-labelledby="upl-h"><h3 id="upl-h">Documents for your purchase</h3>' +
      '<p class="muted" style="margin:0 0 6px"><b>You only need these once you’ve found a car and decided to go ahead.</b> Nothing is asked of you while you browse or save cars. This is for your 2021 Kia Sportage.</p>' +
      '<div class="pg" style="margin-top:16px"><label class="full">Name on your documents<input data-f="fullname" autocomplete="name" value="' +
      esc(F("fullname", fullName())) +
      '"></label></div><label class="agree" style="margin:4px 0 8px"><input type="checkbox" data-chk="nameok"' +
      (upf.nameok ? " checked" : "") +
      "><span>We’ve filled this in from your account. Check it’s your <b>full legal name</b>, including any middle names, exactly as on your driving licence. Lenders reject applications where the names don’t match.</span></label>" +
      '<div class="seg" role="group" aria-label="How you are paying" style="margin:16px 0 4px"><button type="button" data-pay="fin" aria-pressed="' +
      fin +
      '">Finance</button><button type="button" data-pay="cash" aria-pressed="' +
      !fin +
      '">Cash</button></div>' +
      '<div class="bar" aria-hidden="true"><i style="width:' +
      Math.round((done / list.length) * 100) +
      '%"></i></div><p class="note" style="margin:0 0 6px" aria-live="polite">' +
      done +
      " of " +
      list.length +
      " documents added</p>" +
      list.map(reqRow).join("") +
      (fin
        ? '<h3 style="margin-top:34px">Finance details</h3><p class="muted" style="margin:0">These go into your finance proposal. You can save and finish later.</p><div class="pg">' +
          "<label>Employment status" +
          sel("emp", [
            "Choose",
            "Employed full time",
            "Employed part time",
            "Self-employed",
            "Retired",
            "Other",
          ]) +
          "</label>" +
          '<label>Employer<input data-f="er" value="' +
          esc(F("er", "")) +
          '" autocomplete="organization"></label>' +
          '<label>Time with employer (years)<input data-f="yrs" type="number" min="0" value="' +
          esc(F("yrs", "")) +
          '"></label>' +
          '<label>Annual income before tax (£)<input data-f="inc" type="number" min="0" value="' +
          esc(F("inc", "")) +
          '"></label>' +
          "<label>Housing" +
          sel("hs", [
            "Choose",
            "Homeowner",
            "Renting",
            "Living with family",
            "Other",
          ]) +
          "</label>" +
          '<label>Monthly housing cost (£)<input data-f="rent" type="number" min="0" value="' +
          esc(F("rent", "")) +
          '"></label>' +
          '<label>Years at current address<input data-f="ya" type="number" min="0" value="' +
          esc(F("ya", "")) +
          '"></label>' +
          '<label>Dependants<input data-f="dep" type="number" min="0" value="' +
          esc(F("dep", "")) +
          '"></label></div>'
        : "") +
      '<h3 style="margin-top:34px">Delivery details</h3><div class="pg"><label class="full">Delivery address<input data-f="da" value="' +
      esc(F("da", "")) +
      '" autocomplete="street-address"></label><label>Contact number<input data-f="ph" type="tel" value="' +
      esc(F("ph", "")) +
      '" autocomplete="tel"></label><label>Best delivery days<input data-f="dd" value="' +
      esc(F("dd", "")) +
      '" placeholder="e.g. weekday afternoons"></label></div>' +
      '<p class="note" style="margin-top:18px">Preview only: files are not uploaded or stored anywhere, and the finance fields are not submitted. <span class="todo">[Secure upload, storage, retention and data-protection terms to be set up before real documents are collected. Finance proposal fields to match the lender’s form.]</span></p></section>'
    );
  }

  /* seller sample data */
  var STL = {
    live: "Live",
    under: "Under offer",
    waiting: "Offer waiting",
    rejected: "Offer rejected",
    sold: "Sold",
    withdrawn: "Withdrawn",
  };
  var STG = [
    "Price agreed",
    "Buyer found",
    "AA or RAC inspection",
    "Buyer’s payment held safely",
    "Handover",
    "Finance settled",
    "Paid to you",
  ];
  function L(id, y, mk, md, reg, st, mi, o) {
    o = o || {};
    return {
      id: id,
      y: y,
      mk: mk,
      md: md,
      reg: reg,
      st: st,
      mi: mi,
      net: o.net || null,
      offer: o.offer || null,
      fin: !!o.fin,
      prog: o.prog || (st === "live" ? 1 : 0),
      rr: !!o.rr,
      listed: o.listed || "03/11/2026",
      sc: o.sc || null,
      sd: o.sd || "",
      at: o.at || 0,
      resv: !!o.resv,
    };
  }
  var SLIST = [
    L("v17", 2018, "Vauxhall", "Insignia SRi", "NA18 OXP", "waiting", 61200, {
      offer: 8900,
    }),
    L("v18", 2020, "SEAT", "Leon FR", "SN20 KJE", "waiting", 34800, {
      offer: 12450,
      fin: true,
    }),
    L("v13", 2015, "Honda", "Civic 1.8 EX", "RX15 UPN", "under", 79400),
    L("v14", 2018, "Peugeot", "3008 GT Line", "BF18 WKD", "under", 52300),
    L("v15", 2016, "MINI", "Cooper S", "LK16 ZTC", "under", 58900),
    L("v16", 2019, "Kia", "Ceed 3", "YH19 SGO", "under", 33100),
    L("v19", 2017, "Jaguar", "XE R-Sport", "MT17 FUY", "rejected", 64700, {
      offer: 11200,
    }),
    L("v20", 2019, "Volkswagen", "Golf GTD", "LV19 CEN", "sold", 41200, {
      net: 15300,
      prog: 3,
      fin: true,
      sc: "signed",
      sd: "16/11/2026",
      at: 14200,
    }),
    L("v21", 2018, "Audi", "Q3 S line", "WP18 HZB", "sold", 55800, {
      net: 16100,
      prog: 6,
      sc: "signed",
      sd: "08/11/2026",
      at: 15050,
    }),
    L("p1", 2018, "Ford", "Kuga ST-Line", "YC18 LKP", "sold", 57300, {
      net: 13200,
      prog: 7,
      sc: "signed",
      sd: "28/10/2026",
      rr: true,
      listed: "14/10/2026",
    }),
    L("p2", 2017, "BMW", "1 Series 118d M Sport", "WM17 JXE", "sold", 68900, {
      net: 10400,
      prog: 7,
      sc: "signed",
      sd: "19/10/2026",
      at: 9300,
      fin: true,
      listed: "02/10/2026",
    }),
    L("p3", 2019, "Renault", "Clio Iconic", "DE19 TVR", "sold", 31800, {
      net: 8650,
      prog: 7,
      sc: "signed",
      sd: "07/10/2026",
      at: 7900,
      listed: "25/09/2026",
    }),
    L("p4", 2016, "Audi", "A3 Sportback S line", "161-D-23874", "sold", 71400, {
      net: 11300,
      prog: 7,
      sc: "signed",
      sd: "22/09/2026",
      at: 10150,
      listed: "08/09/2026",
    }),
    L("p5", 2020, "Toyota", "C-HR Design", "FX20 NGO", "sold", 26500, {
      net: 17850,
      prog: 7,
      sc: "signed",
      sd: "05/09/2026",
      at: 16500,
      rr: true,
      listed: "20/08/2026",
    }),
    L("v1", 2019, "BMW", "3 Series 320d", "LS19 KHT", "live", 48210, {
      net: 14250,
      fin: true,
      resv: true,
    }),
    L("v2", 2018, "Audi", "A4 2.0 TDI S line", "YD18 PFO", "live", 59900, {
      net: 12100,
    }),
    L("v3", 2020, "Ford", "Focus ST-Line", "MA20 XRC", "live", 27400, {
      net: 11400,
      rr: true,
    }),
    L(
      "v4",
      2017,
      "Mercedes-Benz",
      "C-Class C220d AMG Line",
      "BK17 VNA",
      "live",
      66300,
      { net: 13650 },
    ),
    L("v5", 2021, "Toyota", "Yaris Hybrid", "SF21 OKE", "live", 18900, {
      net: 13900,
    }),
    L("v6", 2019, "Volkswagen", "Polo SE", "191-D-48213", "live", 36200, {
      net: 9250,
    }),
    L(
      "v7",
      2016,
      "Land Rover",
      "Discovery Sport HSE",
      "WR16 TYL",
      "live",
      77800,
      { net: 15400, fin: true },
    ),
    L("v8", 2020, "Hyundai", "Tucson SE Nav", "DY20 FBN", "live", 29600, {
      net: 15100,
    }),
    L("v9", 2018, "Nissan", "Qashqai N-Connecta", "NX18 AZU", "live", 54100, {
      net: 10350,
      rr: true,
    }),
    L("v10", 2019, "Mazda", "MX-5 Sport Nav", "GJ19 RWE", "sold", 22700, {
      net: 14800, prog: 7, sc: "signed", sd: "21/08/2026", at: 13700, listed: "06/08/2026",
    }),
    L("v11", 2020, "Skoda", "Octavia SE L", "KM20 DHX", "sold", 44500, {
      net: 12900, prog: 7, sc: "signed", sd: "02/08/2026", at: 11950, listed: "18/07/2026",
    }),
    L("v12", 2017, "Volvo", "XC60 D4 R-Design", "EO17 LMV", "live", 71200, {
      net: 16750,
      fin: true,
    }),
  ];
  var MAIL = {
    seller: [
      {
        id: "m1",
        s: "Your 2019 Volkswagen Golf GTD has sold",
        b: "Good news: we’ve found a buyer for your Golf GTD. Next, the inspection, then we take the buyer’s payment before the handover. Follow each step in Offers and payout.",
        d: "Today, 08:12",
        u: true,
        veh: "v20",
        go: "po",
      },
      {
        id: "m1b",
        s: "One sale away from Platinum",
        b: "You’ve sold 9 cars with us. Your 2019 BMW 3 Series 320d is reserved by a buyer. Once they complete and you sign the sale contract, you’ll become a Platinum Trusted Seller, our highest tier.",
        d: "Today, 07:55",
        u: true,
        veh: "v1",
        go: "li",
      },
      {
        id: "m2",
        s: "Your offer for the 2020 SEAT Leon FR is ready to sign",
        b: "Thanks for talking it through on the phone. Your offer of £12,450 is ready to sign in Offers and payout.",
        d: "Yesterday, 16:40",
        u: true,
        veh: "v18",
        go: "po",
      },
      {
        id: "k1",
        perk: true,
        amt: 500,
        tier: "Gold",
        s: "Gold ticket: £500 off your next car",
        t: "£500 off",
        tl: "your next car with " + SITE.name,
        code: "GOLD-500",
        b: "You’ve reached Gold Trusted Seller with 5 cars sold. As a thank you, we’ll take £500 off the next car you buy from us.",
        d: "Yesterday, 13:20",
        u: true,
        go: "buy",
      },
      {
        id: "k2",
        perk: true,
        s: "Gold ticket: Retail Ready pack at half price",
        t: "50% off",
        tl: "the Retail Ready pack on every car you list",
        code: "RR-HALF",
        b: "Gold sellers get our Retail Ready pack at half price. It’s applied automatically: you’ll see it on your offer letter and on the Upgrade to Retail Ready button.",
        d: "Yesterday, 13:20",
        u: true,
        go: "po",
      },
      {
        id: "m3",
        s: "Your offer for the 2018 Vauxhall Insignia SRi is ready to sign",
        b: "As discussed, your offer of £8,900 is ready to sign in Offers and payout.",
        d: "Yesterday, 11:05",
        u: false,
        veh: "v17",
        go: "po",
      },
      {
        id: "k0",
        perk: true,
        s: "Silver ticket: priority placement for your listings",
        t: "Priority",
        tl: "placement for every car you list",
        code: "SILVER-TOP",
        b: "You reached Silver with 3 cars sold, so your listings now appear higher for buyers.",
        d: "28/10/2026",
        u: false,
        go: "li",
        silver: true,
      },
      {
        id: "m4",
        s: "Your 2018 Audi Q3 S line: payout on its way",
        b: "The buyer’s payment has cleared and the handover is done. Your payout is being sent to your bank.",
        d: "15/11/2026",
        u: false,
        veh: "v21",
        go: "po",
      },
      {
        id: "m5",
        s: "We’ve received your 2019 Kia Ceed 3",
        b: "Thanks for listing with us. One of our team will call you to agree a price you’re happy with.",
        d: "12/11/2026",
        u: false,
        veh: "v16",
        go: "li",
      },
    ],
    buyer: [
      {
        id: "b1",
        smp: true,
        s: "Your 2021 Kia Sportage is out for delivery",
        b: "Your car is on the transporter and due with you today at about 17:30. Follow it in Live tracking.",
        d: "Today, 08:40",
        u: true,
        go: "lt",
      },
      {
        id: "b2",
        smp: true,
        s: "Documents needed for your finance application",
        b: "Please upload your driving licence, proof of address, bank statements and proof of income in Documents.",
        d: "Yesterday, 10:15",
        u: false,
        go: "dc",
      },
      {
        id: "b3",
        smp: true,
        s: "Reservation confirmed: 2021 Kia Sportage",
        b: "We’ve reserved the car for you. Next steps are in your profile.",
        d: "10/11/2026",
        u: false,
        go: "pu",
      },
    ],
  };
  var POOL = [
    [2019, "Ford", "Fiesta ST-Line"],
    [2018, "Vauxhall", "Corsa SRi"],
    [2020, "Kia", "Sportage GT-Line"],
    [2017, "Nissan", "Juke Tekna"],
    [2019, "Hyundai", "i30 N Line"],
    [2021, "Peugeot", "208 Allure"],
    [2018, "Volkswagen", "Tiguan SEL"],
    [2016, "Mercedes-Benz", "A-Class A180 Sport"],
    [2020, "Skoda", "Kamiq SE"],
    [2019, "Toyota", "Corolla Design"],
    [2017, "Audi", "A1 S line"],
    [2018, "BMW", "X1 xDrive20d"],
    [2020, "MG", "ZS Exclusive"],
    [2019, "SEAT", "Ateca FR"],
    [2016, "Honda", "Jazz EX"],
    [2021, "Renault", "Captur Iconic"],
    [2018, "Mazda", "CX-5 Sport Nav"],
    [2017, "Volvo", "V40 R-Design"],
    [2019, "Citroen", "C5 Aircross Flair"],
    [2020, "Cupra", "Leon VZ1"],
    [2018, "Lexus", "CT 200h"],
    [2019, "MINI", "Countryman Cooper"],
    [2017, "Jaguar", "F-Pace Prestige"],
    [2020, "Tesla", "Model 3 Standard Range"],
    [2018, "Land Rover", "Range Rover Evoque SE"],
    [2019, "Porsche", "Macan"],
    [2016, "Fiat", "500 Lounge"],
    [2020, "Dacia", "Duster Comfort"],
    [2019, "Suzuki", "Vitara SZ-T"],
    [2021, "Volkswagen", "T-Roc Style"],
    [2018, "Ford", "Puma Titanium"],
    [2019, "Kia", "Niro 2"],
  ];
  function genAcct(pre, spec, seed) {
    var r = seed,
      rnd = function () {
        r = (r * 9301 + 49297) % 233280;
        return r / 233280;
      },
      out = [],
      k = 0,
      A = "ABCDEFGHJKLMNOPRSTVWXY",
      ch = function () {
        return A[Math.floor(rnd() * A.length)];
      };
    spec.forEach(function (s) {
      for (var i = 0; i < s[1]; i++) {
        var c = POOL[(seed + k * 7) % POOL.length];
        k++;
        var age = 2026 - c[0],
          mi = Math.round((9000 + age * 8500 + rnd() * 14000) / 100) * 100,
          val = Math.round((22500 - age * 1700 + rnd() * 5000) / 50) * 50,
          st = s[0],
          o;
        if (/Porsche|Land Rover|Jaguar|Tesla/.test(c[1])) val += 9500;
        if (st === "sold") {
          var dd = new Date(2026, 10, 16 - i * 8 - Math.floor(rnd() * 4));
          o = {
            net: val,
            prog: i === 0 ? 3 : i === 1 && s[1] > 2 ? 6 : 7,
            sc: i === 0 && pre === "p" ? "wait" : "signed",
            sd: dd.toLocaleDateString("en-GB"),
            at: Math.round((val * 0.93) / 50) * 50,
            rr: rnd() < 0.3,
            fin: rnd() < 0.25,
            listed: new Date(dd.getTime() - 16 * 864e5).toLocaleDateString(
              "en-GB",
            ),
          };
        } else if (st === "live")
          o = { net: val, rr: rnd() < 0.25, fin: rnd() < 0.2, resv: i === 0 && pre !== "p" };
        else if (st === "waiting" || st === "rejected")
          o = { offer: val, fin: rnd() < 0.3 };
        else o = {};
        out.push(
          L(
            pre + k,
            c[0],
            c[1],
            c[2],
            ch() + ch() + String(c[0]).slice(2) + " " + ch() + ch() + ch(),
            st,
            mi,
            o,
          ),
        );
      }
    });
    return out;
  }
  function acctMail(t, list) {
    var w = list.filter(function (v) {
        return v.st === "waiting";
      }),
      s = list.filter(function (v) {
        return v.st === "sold";
      }),
      M = [],
      n = s.length;
    if (t === "Bronze")
      M.push(
        {
          id: t + "w",
          s: "Welcome to Bronze Trusted Seller",
          b: "You’ve sold your first car with us. Here’s your first reward, and every sale from here moves you towards Silver.",
          d: "Today, 09:02",
          u: true,
          go: "li",
        },
        {
          id: t + "k1",
          perk: true,
          tk: "bronze",
          amt: 100,
          tier: "Bronze",
          s: "Bronze ticket: £100 off your next car",
          t: "£100 off",
          tl: "your next car with " + SITE.name,
          code: "BRONZE-100",
          b:
            "You’ve reached Bronze with " +
            n +
            " cars sold. As a thank you, we’ll take £100 off the next car you buy from us.",
          d: "Today, 09:02",
          u: true,
          go: "buy",
        },
        {
          id: t + "k2",
          perk: true,
          tk: "bronze",
          s: "Bronze ticket: £50 for every friend you refer",
          t: "£50",
          tl: "for every friend who buys or sells with us",
          code: "REFER-50",
          b: "Share your referral code. When a friend buys or sells a car with us, you get £50.",
          d: "Today, 09:02",
          u: false,
          go: "li",
        },
      );
    if (t === "Silver")
      M.push(
        {
          id: t + "w",
          s: "You’ve reached Silver Trusted Seller",
          b:
            "With " +
            n +
            " cars sold, your listings now show higher for buyers and you’re paid faster.",
          d: "Yesterday, 10:30",
          u: true,
          go: "li",
        },
        {
          id: t + "k1",
          perk: true,
          tk: "silver",
          silver: true,
          amt: 250,
          tier: "Silver",
          s: "Silver ticket: £250 off your next car",
          t: "£250 off",
          tl: "your next car with " + SITE.name,
          code: "SILVER-250",
          b:
            "You’ve reached Silver with " +
            n +
            " cars sold. We’ll take £250 off the next car you buy from us.",
          d: "Yesterday, 10:30",
          u: true,
          go: "buy",
        },
        {
          id: t + "k2",
          perk: true,
          tk: "silver",
          silver: true,
          s: "Silver ticket: priority placement for your listings",
          t: "Priority",
          tl: "placement for every car you list",
          code: "SILVER-TOP",
          b: "Your listings now appear higher for buyers.",
          d: "Yesterday, 10:30",
          u: false,
          go: "li",
        },
      );
    if (t === "Platinum")
      M.push(
        {
          id: t + "w",
          s: "Welcome to Platinum, our highest tier",
          b:
            "With " +
            n +
            " cars sold, you’re one of our very best sellers. Thank you. Your rewards are below, and your account manager will be in touch.",
          d: "Today, 08:45",
          u: true,
          go: "li",
        },
        {
          id: t + "k1",
          perk: true,
          tk: "platinum",
          amt: 750,
          tier: "Platinum",
          s: "Platinum ticket: £750 off your next car",
          t: "£750 off",
          tl: "your next car with " + SITE.name,
          code: "PLAT-750",
          b: "As a Platinum seller, we’ll take £750 off the next car you buy from us.",
          d: "Today, 08:45",
          u: true,
          go: "buy",
        },
        {
          id: t + "k2",
          perk: true,
          tk: "platinum",
          s: "Platinum ticket: free Retail Ready on every car",
          t: "Free",
          tl: "Retail Ready pack on every car you list",
          code: "RR-FREE",
          b: "No pack fee for you, ever. It’s applied automatically on your offer letters.",
          d: "Today, 08:45",
          u: true,
          go: "po",
        },
        {
          id: t + "am",
          s: "Meet your account manager, Sophie",
          b: "Hi, I’m Sophie Reid, your account manager. Call or message me directly about any car you’re selling: 0113 496 0123 (sample). I’ll also check in before each listing goes live.",
          d: "Today, 09:10",
          u: true,
          go: "ov",
        },
      );
    w.forEach(function (v, i) {
      M.push({
        id: t + "o" + i,
        s: "Your offer for the " + vname(v) + " is ready to sign",
        b:
          "Thanks for talking it through on the phone. Your offer of " +
          gbp(v.offer) +
          " is ready to sign in Offers and payout.",
        d: i ? "Yesterday, 15:20" : "Today, 11:40",
        u: true,
        veh: v.id,
        go: "po",
      });
    });
    if (s[0])
      M.push({
        id: t + "s0",
        s: "Your " + vname(s[0]) + " has sold",
        b: "Good news: we’ve found a buyer. Next comes the AA or RAC inspection, then the buyer’s payment is held safely until handover.",
        d: "Yesterday, 08:12",
        u: false,
        veh: s[0].id,
        go: "po",
      });
    var rv = list.filter(function (v) { return v.st === "live" && v.resv; })[0],
      cn = list.filter(function (v) { return v.st === "sold" && v.sc !== "wait"; }).length,
      nx = TIERS.filter(function (x) { return x[1] > cn; })[0];
    if (rv && nx && cn + 1 === nx[1])
      M.unshift({ id: t + "up", s: "One sale away from " + nx[0], b: "You’ve sold " + cn + " cars with us. Your " + vname(rv) + " is reserved by a buyer. Once they complete and you sign the sale contract, you’ll become a " + nx[0] + " Trusted Seller.", d: "Today, 07:55", u: true, veh: rv.id, go: "li" });
    return M;
  }
  var ACCT = {},
    curAcct = "Gold";
  function useAcct(t) {
    if (!ACCT.Gold) ACCT.Gold = { list: SLIST, mail: MAIL.seller };
    if (!ACCT[t]) {
      var spec = {
          Bronze: [
            ["waiting", 1],
            ["under", 1],
            ["live", 2],
            ["sold", 2],
          ],
          Silver: [
            ["waiting", 1],
            ["under", 2],
            ["live", 5],
            ["sold", 4],
            ["rejected", 1],
          ],
          Platinum: [
            ["waiting", 2],
            ["under", 2],
            ["live", 8],
            ["sold", 14],
            ["rejected", 1],
          ],
        }[t],
        li = genAcct(
          t.charAt(0).toLowerCase(),
          spec,
          { Bronze: 3, Silver: 11, Platinum: 23 }[t],
        );
      ACCT[t] = { list: li, mail: acctMail(t, li) };
    }
    curAcct = t;
    SLIST = ACCT[t].list;
    MAIL.seller = ACCT[t].mail;
    openVeh = null;
    lfilt = "all";
  }
  function vname(v) {
    return v.y ? v.y + " " + v.mk + " " + v.md : "Your car";
  }
  function vById(id) {
    return SLIST.filter(function (v) {
      return v.id === id;
    })[0];
  }
  function cnt(st) {
    return SLIST.filter(function (v) {
      return v.st === st;
    }).length;
  }
  function tabCounts() {
    var c = {};
    if (!user) return c;
    if (user.role === "buyer") {
      if (user.sample)
        NOTE.buyer.forEach(function (n) {
          if (!seen[n[0]]) c[n[2]] = (c[n[2]] || 0) + 1;
        });
      if (myPur && !myPur.ret && myPur.stage < 2) c.pu = (c.pu || 0) + 1;
    } else {
      c.po = cnt("waiting");
      c.dc = SLIST.filter(function (v) {
        return v.sc === "wait";
      }).length;
    }
    c.ml = mlist().filter(function (m) {
      return m.u && !m.perk;
    }).length;
    return c;
  }
  function perkCount() {
    return user
      ? mlist().filter(function (m) {
          return m.u && m.perk;
        }).length
      : 0;
  }
  function totalCount() {
    var c = tabCounts(),
      n = 0;
    for (var k in c) n += c[k];
    return n;
  }
  function plate(r) {
    var x = String(r).toUpperCase().replace(/\s+/g, "");
    var ie = /^\d{2,3}-?[A-Z]{1,2}-?\d{1,6}$/.test(x);
    if (ie) {
      var m = /^(\d{2,3})-?([A-Z]{1,2})-?(\d{1,6})$/.exec(x);
      r = m[1] + "-" + m[2] + "-" + m[3];
    }
    return (
      '<span class="plate' +
      (ie ? " ie" : "") +
      '" title="' +
      (ie ? "Irish registration" : "UK registration") +
      '"><i aria-hidden="true">' +
      (ie ? "IRL" : "UK") +
      "</i>" +
      esc(r) +
      "</span>"
    );
  }
  function sdot(st) {
    return '<span class="sdot ' + st + '" aria-hidden="true"></span>';
  }
  function vtab(id, title, right, body, cls) {
    return (
      '<details class="vtab' +
      (cls ? " " + cls : "") +
      '" data-vid="' +
      id +
      '"' +
      (openVeh === id ? " open" : "") +
      '><summary><span class="vt-name">' +
      title +
      '</span><span class="vt-r">' +
      right +
      '<span class="chev" aria-hidden="true"></span></span></summary><div class="vt-body">' +
      body +
      '<p style="margin:18px 0 0"><button type="button" class="btn ghost vt-close">Close</button></p></div></details>'
    );
  }
  function stl(v) {
    if (v.st === "live" && v.resv)
      return (
        '<span class="stl">' + sdot("waiting") + "Reserved by a buyer</span>"
      );
    if (v.st === "live" && v.rr && v.rrst && v.rrst !== "done")
      return (
        '<span class="stl">' +
        sdot("waiting") +
        "Retail Ready in progress</span>"
      );
    return '<span class="stl">' + sdot(v.st) + STL[v.st] + "</span>";
  }
  function netHtml(v) {
    return v.net
      ? '<b class="net-ok">' +
          gbp(v.rr ? rrNet(v) : v.net) +
          "</b>" +
          (v.rr
            ? ' <span class="muted small">(' +
              gbp(v.net) +
              " + " +
              gbp(RR_UP) +
              " Retail Ready, " +
              (v.rrpaid
                ? "pack fee paid separately"
                : "less the " + gbp(rrFeeOf(v)) + " pack fee") +
              ")</span>"
            : "")
      : '<span class="net-none">( — )</span> <span class="muted small">Not agreed yet</span>';
  }
  function photos() {
    var h = "";
    for (var n = 1; n <= 6; n++)
      h += '<span class="lph">Photo ' + n + "</span>";
    return '<div class="lphs">' + h + "</div>";
  }
  function listBody(v) {
    var msg = {
      under:
        "We’ll call you to agree a price you’re happy with. After the call, we’ll email your offer to sign.",
      waiting: "Your offer of <b>" + gbp(v.offer) + "</b> is ready to sign.",
      rejected: "You turned down our offer of " + gbp(v.offer) + ".",
      sold: "We’ve found a buyer. Follow the payout steps in Offers and payout.",
      live: v.resv
        ? "A buyer has reserved your car. We’ll let you know as soon as they complete."
        : v.rr && v.rrst && v.rrst !== "done"
          ? "Your car goes live at retail standard as soon as the Retail Ready work is done."
          : "Your car is listed. We’ll handle the buyers and let you know when it sells.",
      withdrawn: "You withdrew this car. " + (v.wdn || ""),
    }[v.st];
    return (
      '<p style="margin:0 0 12px">' +
      msg +
      "</p>" +
      dls(
        [
          ["Status", stl(v)],
          ["Your net amount", netHtml(v)],
        ]
          .concat(
            v.st === "live" || v.st === "sold"
              ? [
                  [
                    "Advertised to buyers at",
                    "<b>" +
                      gbp(advOf(v)) +
                      '</b><br><span class="muted small">Our price to buyers. The difference pays for our service, the buyer’s checks and our safety net.</span>',
                  ],
                ]
              : [],
          )
          .concat([
            ["Mileage", fmt(v.mi)],
            ["Listed", v.listed],
          ]),
      ) +
      '<h3 style="margin:20px 0 10px">Your photos</h3>' +
      photos() +
      rrBlock(v) +
      '<p style="margin:18px 0 0"><button type="button" class="btn" data-gov="po" data-veh="' +
      v.id +
      '">Check offer and payout</button>' +
      (v.st === "withdrawn"
        ? ' <button type="button" class="btn ghost" data-cb="' +
          v.id +
          '">Ask us to relist it</button>'
        : "") +
      ' <button type="button" class="btn ghost" data-gh="seller" data-v="' +
      v.id +
      '">Need help with this car?</button></p>'
    );
  }
  function sellerOv() {
    var tiles = [
      ["live", "Live listings"],
      ["under", "Listings under offer"],
      ["waiting", "Offers waiting"],
      ["rejected", "Offers rejected"],
      ["sold", "Sold"],
    ];
    return (
      attnHtml() +
      (hasPerk(/account manager/)
        ? '<div class="amcard"><div class="am-av" aria-hidden="true">SR</div><div><p class="tier-k" style="margin:0">Your account manager</p><b>Sophie Reid</b><p class="small" style="margin:2px 0 0">0113 496 0123 · sophie@unionmotortrade.co.uk <span class="muted">(sample)</span></p></div></div>'
        : "") +
      '<div class="stat stat2">' +
      tiles
        .map(function (t) {
          return (
            '<button type="button" class="statb" data-lf="' +
            t[0] +
            '"><b>' +
            sdot(t[0]) +
            cnt(t[0]) +
            "</b><span>" +
            t[1] +
            "</span></button>"
          );
        })
        .join("") +
      "</div>" +
      '<p class="note" style="margin:-14px 0 26px">Select a figure to see those listings. Sample listings for preview.</p>' +
      '<h3 style="margin-bottom:10px">How offers work</h3><ul class="pts"><li><b>Under offer:</b> one of our team calls you to agree a price you’re happy with.</li><li><b>Offer waiting:</b> after the call we email your offer. Sign it here or from the email.</li><li><b>Live:</b> once signed, your net amount is fixed and your car is listed. We handle the buyers.</li></ul>'
    );
  }
  var ORD = {
    waiting: 0,
    under: 1,
    live: 2,
    sold: 3,
    rejected: 4,
    withdrawn: 5,
  };
  function byOrder(a) {
    return a
      .map(function (v, n) {
        return [v, n];
      })
      .sort(function (x, y) {
        return ORD[x[0].st] - ORD[y[0].st] || x[1] - y[1];
      })
      .map(function (x) {
        return x[0];
      });
  }
  function sellerLi() {
    var F = [
      ["all", "All"],
      ["waiting", "Offer waiting"],
      ["under", "Under offer"],
      ["live", "Live"],
      ["sold", "Sold"],
      ["rejected", "Offer rejected"],
      ["withdrawn", "Withdrawn"],
    ];
    var list = byOrder(
      SLIST.filter(function (v) {
        return lfilt === "all" || v.st === lfilt;
      }),
    );
    return (
      '<div class="lchips" role="group" aria-label="Filter listings">' +
      F.map(function (f) {
        var n = f[0] === "all" ? SLIST.length : cnt(f[0]);
        return (
          '<button type="button" class="chip" data-lf="' +
          f[0] +
          '" aria-pressed="' +
          (lfilt === f[0]) +
          '">' +
          f[1] +
          " (" +
          n +
          ")</button>"
        );
      }).join("") +
      "</div>" +
      (list.length
        ? list
            .map(function (v) {
              return vtab(
                v.id,
                vname(v),
                (v.st === "live" && hasPerk(/Priority placement/)
                  ? '<span class="toplst">★ Top listing</span>'
                  : "") +
                  (v.hd && v.hd.st === "live"
                    ? '<span class="hdchip">Hot deal</span>'
                    : "") +
                  stl(v) +
                  plate(v.reg),
                listBody(v),
              );
            })
            .join("")
        : '<p class="muted">No listings here.</p>') +
      '<p style="margin-top:18px"><a class="btn ghost" href="#sell">List another car</a></p>'
    );
  }
  function poBody(v) {
    if (v.st === "under")
      return '<p style="margin:0">No offer yet. One of our team will call you to agree a price you’re happy with, then we’ll email your offer to sign.</p>';
    if (v.st === "withdrawn")
      return (
        '<p style="margin:0 0 14px">You withdrew this car. ' +
        (v.wdn || "") +
        '</p><button type="button" class="btn ghost" data-cb="' +
        v.id +
        '">Ask us to relist it</button>'
      );
    if (v.st === "rejected") {
      if (v.rejn >= 2)
        return (
          '<p style="margin:0 0 12px">You’ve turned down two offers for this car' +
          (v.want ? ", hoping for " + gbp(v.want) : "") +
          ". What would you like to do?</p>" +
          (v.onfile
            ? '<p class="muted small" style="margin:0 0 12px">Done. We’ll get in touch if prices for cars like yours go up.</p>'
            : "") +
          '<div class="pxnav">' +
          (v.onfile
            ? ""
            : '<button type="button" class="btn ghost" data-onfile="' +
              v.id +
              '">Keep my details on file</button>') +
          '<button type="button" class="btn ghost" data-wdx="' +
          v.id +
          '">Withdraw my listing</button></div>'
        );
      if (v.want)
        return (
          '<p style="margin:0 0 10px">You turned down our offer of ' +
          gbp(v.offer) +
          " and told us you were hoping for <b>" +
          gbp(v.want) +
          '</b>. One of our team will call you within 2 working days to see if we can get closer.</p><div class="pvrow"><span class="muted small">Preview what happens next:</span><button type="button" class="lnkb" data-revo="' +
          v.id +
          '">Our revised offer arrives</button></div>'
        );
      return (
        '<p style="margin:0 0 14px">You turned down our offer of ' +
        gbp(v.offer) +
        '. If you’d like to talk again, we can call you back.</p><button type="button" class="btn ghost" data-cb="' +
        v.id +
        '">Ask us to call you back</button>'
      );
    }
    if (v.st === "waiting")
      return (
        '<div class="offerl"><p class="muted small" style="margin:0">Your offer, as agreed on the phone</p><p class="offamt">' +
        gbp(v.offer) +
        '</p><p class="muted small" style="margin:0 0 16px">This is your net amount with your mechanical guarantee: what you receive when the car sells' +
        (v.fin ? ", before we settle your finance from it" : "") +
        ". We’ll advertise your car to buyers at " +
        gbp(advOf(v)) +
        ".</p>" +
        '<fieldset class="rrf" data-mgf><legend>1. Mechanical guarantee</legend><div class="rrc">' +
        '<label class="rrcard on"><input type="radio" name="mg-' +
        v.id +
        '" value="yes" checked><span class="rrk">With my guarantee</span><b class="rra">' +
        gbp(v.offer) +
        '</b><span class="small muted">You confirm the car is mechanically sound and cover mechanical faults reported within 30 days of handover.</span></label>' +
        '<label class="rrcard"><input type="radio" name="mg-' +
        v.id +
        '" value="no"><span class="rrk">Without a guarantee</span><b class="rra">' +
        gbp(noG(v)) +
        '</b><span class="small muted">We take on the risk, backed by a third-party warranty, so we pay ' +
        gbp(v.offer - noG(v)) +
        " less.</span></label></div>" +
        '<label class="agree" id="c5-' +
        v.id +
        '" data-c5l><input type="checkbox" data-c5><span>I confirm the car is mechanically sound as far as I know, and I’ll cover any mechanical fault reported within 30 days of handover. <span class="todo">[What the guarantee covers, for how long and any limit to be confirmed by your solicitor.]</span></span></label></fieldset>' +
        '<fieldset class="rrf" data-rrf><legend>2. Retail Ready (optional)</legend><div class="rrc">' +
        '<label class="rrcard"><input type="radio" name="rr-' +
        v.id +
        '" value="no" checked><span class="rrk">As it is</span><b class="rra">+£0</b><span class="small muted">Sold as it is, nothing extra.</span></label>' +
        '<label class="rrcard rrup"><input type="radio" name="rr-' +
        v.id +
        '" value="yes"><span class="rrk">With Retail Ready</span><b class="rra">+' +
        gbp(RR_UP - myRrFee()) +
        '</b><span class="small muted">We pay you ' +
        gbp(RR_UP) +
        " more, less the " +
        feeTxt() +
        " pack fee taken from your sale proceeds. Nothing up front. If the car hasn’t sold within 60 days, the fee is due then.</span>" +
        (rrPerk() ? '<span class="gperk">★ ' + rrPerk() + "</span>" : "") +
        "</label></div>" +
        '<p class="small" style="margin:12px 0 0">We prepare your car to retail standard (valet, smart repairs and a health check), so it sells for more and we can pay you more. <span class="todo">[Pack contents, fee and the extra we pay to be confirmed.]</span></p>' +
        '<label class="agree" id="c4-' +
        v.id +
        '" data-c4l hidden><input type="checkbox" data-c4><span>Please start the Retail Ready work straight away. I understand I can still cancel within 14 days, but I’ll pay for any work already done.</span></label></fieldset><p class="yrecv">You receive <b id="yr-' +
        v.id +
        '">' +
        gbp(v.offer) +
        "</b></p>" +
        '<label class="agree" id="c1-' +
        v.id +
        '"><input type="checkbox" data-c1><span>I’ve spoken to the ' + SITE.name + ' team on the phone and I’m happy with this amount.</span></label>' +
        '<label class="agree" id="c2-' +
        v.id +
        '"><input type="checkbox" data-c2><span>It’s been explained clearly what can change it: anything the inspection finds that I didn’t declare (damage, faults or mileage), or missing keys, service history or documents. If I choose Retail Ready, the pack fee comes out of my sale proceeds.</span></label>' +
        '<label>Sign by typing your full name<input data-sig value="' +
        esc(fullName()) +
        '" autocomplete="name"></label>' +
        '<label class="agree" id="c3-' +
        v.id +
        '"><input type="checkbox" data-c3><span>I’ve checked this is my <b>full legal name</b>, exactly as on my driving licence.</span></label>' +
        '<p class="pxerr" data-err aria-live="polite"></p><div class="pxnav"><button type="button" class="btn" data-sign="' +
        v.id +
        '">Sign and accept offer</button><button type="button" class="btn ghost" data-rej="' +
        v.id +
        '">Turn down this offer</button></div><p class="note small">We also email this offer for you to sign. <span class="todo">[Offer letter wording to be approved by your solicitor.]</span></p></div>'
      );
    var steps = STG.map(function (t, n) {
      var cls = n < v.prog ? "done" : n === v.prog ? "now" : "";
      var sm =
        n === 5 && !v.fin
          ? "<small>no finance on this car</small>"
          : n === 1 && v.st === "live" && n === v.prog
            ? "<small>your car is listed</small>"
            : "";
      return '<li class="' + cls + '">' + t + sm + "</li>";
    }).join("");
    var ex = "";
    if (v.st === "sold" && v.insp)
      ex +=
        '<div class="warnb"><b>The inspection found a difference</b><p>' +
        v.insp.d +
        ". Based on this, we can pay you <b>" +
        gbp(v.insp.n) +
        "</b> instead of " +
        gbp(v.net) +
        '.</p><div class="pxnav"><button type="button" class="btn" data-ia="' +
        v.id +
        '">Accept ' +
        gbp(v.insp.n) +
        '</button><button type="button" class="btn ghost" data-id="' +
        v.id +
        '">Decline and take my car back</button></div><p class="note small" style="margin:8px 0 0"><span class="todo">[Re-offer rules, and who pays to return the car, to be confirmed.]</span></p></div>';
    if (v.st === "sold" && v.inspd)
      ex += '<p class="muted small">' + v.inspd + "</p>";
    if (v.pfail)
      ex +=
        '<div class="warnb"><b>Your payout couldn’t be sent</b><p>Your bank returned the payment of ' +
        gbp(paidOf(v)) +
        '. This usually means the account details have changed. Check your payout account and we’ll send it again.</p><button type="button" class="btn" data-bkfix="' +
        v.id +
        '">Check my payout account</button></div>';
    var pv = [];
    if (v.st === "sold" && v.prog <= 3 && !v.insp && !v.inspd)
      pv.push(["insp", "The inspection finds a difference"]);
    if (v.st === "sold" && v.prog >= 6 && user.bank && !v.pfail && !v.pfixed)
      pv.push(["pfail", "The payout bounces"]);
    if (pv.length)
      ex +=
        '<div class="pvrow"><span class="muted small">Preview what happens next:</span>' +
        pv
          .map(function (x) {
            return (
              '<button type="button" class="lnkb" data-pv="' +
              x[0] +
              '" data-v="' +
              v.id +
              '">' +
              x[1] +
              "</button>"
            );
          })
          .join("") +
        "</div>";
    if (
      v.st === "sold" &&
      (hasPerk(/within 24 hours/) || hasPerk(/within 48 hours/))
    )
      ex +=
        '<p class="perkln">★ <b>' +
        (hasPerk(/within 24 hours/)
          ? "Gold reward: paid within 24 hours of handover"
          : "Silver reward: paid within 48 hours of handover") +
        "</b></p>";
    return (
      dls([
        ["Your net amount", netHtml(v)],
        [
          "Retail Ready",
          v.rr
            ? "Opted in: " +
              gbp(rrFeeOf(v)) +
              " pack fee taken from your proceeds"
            : "Not chosen",
        ],
      ]) +
      ex +
      '<h3 style="margin:22px 0 10px">Payout progress</h3><ol class="tracker st">' +
      steps +
      '</ol><p class="note small" style="margin-top:24px">We only pay you once the buyer’s payment has cleared and any finance is settled' +
      (user.bank
        ? "."
        : ", into your checked payout account. <b>Add your payout account at the top of this tab.</b>") +
      "</p>"
    );
  }

  function soldList() {
    return SLIST.filter(function (v) {
      return v.st === "sold";
    });
  }
  function tierCount() {
    return SLIST.filter(function (v) {
      return v.st === "sold" && v.sc !== "wait";
    }).length;
  }
  function nextTier() {
    return TIERS.filter(function (x) {
      return x[1] > tierCount();
    })[0] || null;
  }
  function paidOf(v) {
    return v.rr ? rrNet(v) : v.net;
  }
  function revTotals() {
    var S = soldList(),
      t = { n: S.length, paid: 0, pend: 0, rr: 0, rrn: 0 };
    S.forEach(function (v) {
      var a = paidOf(v);
      if (v.prog >= 7) t.paid += a;
      else t.pend += a;
      if (v.rr) {
        t.rr += RR_UP - rrFeeOf(v);
        t.rrn++;
      }
    });
    t.all = t.paid + t.pend;
    return t;
  }
  var TIERS = [
    [
      "Bronze",
      1,
      [
        "£100 off your next car with us",
        "£50 for every friend you refer who sells or buys with us",
      ],
    ],
    [
      "Silver",
      3,
      [
        "£250 off your next car with us",
        "Payout within 48 hours of handover",
        "Priority placement for your listings",
      ],
    ],
    [
      "Gold",
      5,
      [
        "£500 off your next car with us",
        "Payout within 24 hours of handover",
        "Retail Ready pack at half price",
        "First pick of hot-deal slots for your cars",
      ],
    ],
    [
      "Platinum",
      10,
      [
        "£750 off your next car with us",
        "Free Retail Ready pack on every car",
        "Your own named account manager",
      ],
    ],
  ];
  function tierOf(n) {
    var t = null;
    TIERS.forEach(function (x) {
      if (n >= x[1]) t = x;
    });
    return t;
  }

  var TUP = {
    Bronze: { h: "Welcome to <b>Bronze</b>", p: "You’re now a Trusted Seller. Your first rewards are yours from today.", c: ["#F3C9A0", "#C98652", "#FFE3B0", "#FFFFFF"] },
    Silver: { h: "You’re now <b>Silver</b>", p: "Your listings now show higher for buyers, and you’re paid faster.", c: ["#FFFFFF", "#DDE3EC", "#BFE3FF", "#C9D0DC"] },
    Gold: { h: "Welcome to <b>Gold</b>", p: "Faster payouts, half-price Retail Ready and first pick of hot deals.", c: ["#FFF1C1", "#FFD36B", "#FFB347", "#FFFFFF"] },
    Platinum: { h: "Welcome to <b>Platinum</b>", p: "Our highest tier. You’re one of our very best sellers, and these rewards are yours from today.", c: ["#C9F2FF", "#E8C8FF", "#FFE3B0", "#BFFFE6", "#FFFFFF"] },
  };
  function tierMails(t, n) {
    var id = "up" + Date.now(), L = t[0], M = [];
    var W = function (s, b) { return { id: id + "w", s: s, b: b, u: true, go: "li" }; };
    if (L === "Bronze") M = [W("Welcome to Bronze Trusted Seller", "You’ve sold your first car with us. Here’s your first reward, and every sale from here moves you towards Silver."),
      { id: id + "k1", perk: true, tk: "bronze", amt: 100, tier: "Bronze", s: "Bronze ticket: £100 off your next car", t: "£100 off", tl: "your next car with " + SITE.name, code: "BRONZE-100", b: "You’ve reached Bronze. As a thank you, we’ll take £100 off the next car you buy from us.", u: true, go: "buy" },
      { id: id + "k2", perk: true, tk: "bronze", s: "Bronze ticket: £50 for every friend you refer", t: "£50", tl: "for every friend who buys or sells with us", code: "REFER-50", b: "Share your referral code. When a friend buys or sells a car with us, you get £50.", u: true, go: "li" }];
    else if (L === "Silver") M = [W("You’ve reached Silver Trusted Seller", "With " + n + " cars sold, your listings now show higher for buyers and you’re paid within 48 hours of handover."),
      { id: id + "k1", perk: true, tk: "silver", silver: true, amt: 250, tier: "Silver", s: "Silver ticket: £250 off your next car", t: "£250 off", tl: "your next car with " + SITE.name, code: "SILVER-250", b: "You’ve reached Silver with " + n + " cars sold. We’ll take £250 off the next car you buy from us. This replaces your Bronze £100 ticket.", u: true, go: "buy" },
      { id: id + "k2", perk: true, tk: "silver", silver: true, s: "Silver ticket: priority placement for your listings", t: "Priority", tl: "placement for every car you list", code: "SILVER-TOP", b: "Your listings now appear higher for buyers.", u: true, go: "li" }];
    else if (L === "Gold") M = [W("Welcome to Gold Trusted Seller", "With " + n + " cars sold, you’re now Gold. You’re paid within 24 hours of handover, get Retail Ready at half price and first pick of hot-deal slots."),
      { id: id + "k1", perk: true, amt: 500, tier: "Gold", s: "Gold ticket: £500 off your next car", t: "£500 off", tl: "your next car with " + SITE.name, code: "GOLD-500", b: "You’ve reached Gold with " + n + " cars sold. We’ll take £500 off the next car you buy from us. This replaces your Silver £250 ticket.", u: true, go: "buy" },
      { id: id + "k2", perk: true, s: "Gold ticket: Retail Ready pack at half price", t: "50% off", tl: "the Retail Ready pack on every car you list", code: "RR-HALF", b: "Gold sellers get our Retail Ready pack at half price. It’s applied automatically on your offer letters.", u: true, go: "po" }];
    else M = [W("Welcome to Platinum, our highest tier", "With " + n + " cars sold, you’re one of our very best sellers. Thank you. Your new rewards are below, and your account manager will be in touch today."),
      { id: id + "k1", perk: true, tk: "platinum", amt: 750, tier: "Platinum", s: "Platinum ticket: £750 off your next car", t: "£750 off", tl: "your next car with " + SITE.name, code: "PLAT-750", b: "As a Platinum seller, we’ll take £750 off the next car you buy from us. This replaces your Gold £500 ticket.", u: true, go: "buy" },
      { id: id + "k2", perk: true, tk: "platinum", s: "Platinum ticket: free Retail Ready on every car", t: "Free", tl: "Retail Ready pack on every car you list", code: "RR-FREE", b: "No pack fee for you, ever. It’s applied automatically on your offer letters.", u: true, go: "po" },
      { id: id + "am", s: "Meet your account manager, Sophie", b: "Hi, I’m Sophie Reid, your account manager. Call or message me directly about any car you’re selling: 0113 496 0123 (sample). I’ll also check in before each listing goes live.", u: true, go: "ov" }];
    MAIL.seller.forEach(function (m) { if (m.perk && m.amt && !m.used && !m.repl) m.repl = L; });
    M.reverse().forEach(function (m) { addMail("seller", m); });
  }
  function tierUp(t0, t1) {
    var n = tierCount(), L = t1[0], lo = L.toLowerCase(), from = t0 ? t0[0] : null, flo = from ? from.toLowerCase() : "none", C = TUP[L], T = [], done = false;
    tierMails(t1, n); updProf();
    var o = document.createElement("div");
    o.className = "tupv f-" + flo + " t-" + lo;
    o.setAttribute("role", "dialog"); o.setAttribute("aria-modal", "true"); o.setAttribute("aria-label", "You’ve reached " + L); o.setAttribute("data-lenis-prevent", "");
    var st = "";
    for (var i = 0; i < 80; i++) { var z = Math.random() * 2.4 + 0.8; st += '<i style="left:' + (Math.random() * 100).toFixed(1) + "%;top:" + (Math.random() * 100).toFixed(1) + "%;width:" + z.toFixed(1) + "px;height:" + z.toFixed(1) + "px;animation-delay:" + (Math.random() * 2.6).toFixed(2) + 's"></i>'; }
    o.innerHTML = '<div class="tup-neb n-' + lo + '"></div><div class="tup-sky">' + st + '</div><div class="tup-fl"></div><button type="button" class="tup-skip">Skip</button><div class="tup-in"><p class="tup-k">Sale contract signed · ' + n + ' cars sold</p><div class="tup-cw"><div class="tup-card tc-' + (from ? flo : "none") + '"><div class="tup-medal" aria-hidden="true">★</div><span class="tup-tn">' + (from || "Seller") + '</span><span class="tup-sub">' + (from ? "Trusted Seller" : SITE.name) + '</span></div></div><h2 class="tup-h">' + C.h + '</h2><p class="tup-p">' + C.p + '</p><ul class="tup-perks">' + t1[2].map(function (p) { return "<li>" + p + "</li>"; }).join("") + '</ul><div class="tup-nav"><button type="button" class="btn" data-tupm>See your rewards in Mail</button><button type="button" class="btn ghost" data-tupx>Continue</button></div></div>';
    document.body.appendChild(o); document.body.classList.add("fsopen");
    var q = function (x) { return o.querySelector(x); }, card = q(".tup-card"), cw = q(".tup-cw");
    function at(ms, f) { T.push(setTimeout(f, ms)); }
    function burst() {
      for (var i = 0; i < 46; i++) { var a = Math.random() * Math.PI * 2, d = 110 + Math.random() * 190, z = 3 + Math.random() * 6, e = document.createElement("span"); e.className = "tup-sp"; e.style.cssText = "--c:" + C.c[i % C.c.length] + ";--x:" + (Math.cos(a) * d).toFixed(0) + "px;--y:" + (Math.sin(a) * d).toFixed(0) + "px;width:" + z + "px;height:" + z + "px;animation-delay:" + (Math.random() * 0.15).toFixed(2) + "s"; cw.appendChild(e); }
      var r = document.createElement("span"); r.className = "tup-ring"; cw.appendChild(r);
      setTimeout(function () { cw.querySelectorAll(".tup-sp,.tup-ring").forEach(function (x) { x.remove(); }); }, 1700);
    }
    function toNew() {
      card.className = "tup-card flip tc-" + (from ? flo : "none");
      setTimeout(function () { card.className = "tup-card tc-" + lo; card.style.transition = "none"; card.style.transform = "rotateY(-90deg) scale(1.08)"; q(".tup-tn").textContent = L; q(".tup-sub").textContent = "Trusted Seller"; void card.offsetWidth; card.style.transition = ""; card.style.transform = ""; card.classList.add("in"); o.classList.add("up"); }, 320);
    }
    function finish() {
      if (done) return; done = true; T.forEach(clearTimeout);
      if (card.className.indexOf("tc-" + lo) < 0) { card.className = "tup-card tc-" + lo; q(".tup-tn").textContent = L; q(".tup-sub").textContent = "Trusted Seller"; }
      card.classList.add("in"); o.classList.add("up");
      ["tup-h", "tup-p", "tup-nav"].forEach(function (c) { q("." + c).classList.add("in"); });
      o.querySelectorAll(".tup-perks li").forEach(function (l) { l.classList.add("in"); });
      q(".tup-skip").hidden = true; q("[data-tupm]").focus();
    }
    function close(m) {
      T.forEach(clearTimeout); o.classList.remove("on");
      setTimeout(function () {
        o.remove(); document.body.classList.remove("fsopen"); updProf(); ptab = m ? "ml" : "ov";
        if (location.hash !== "#profile") location.hash = "#profile"; else profileView();
        setTimeout(function () { var x = document.getElementById("pt-" + ptab); if (x) { x.click(); x.scrollIntoView({ block: "center" }); } }, 80);
      }, 350);
    }
    q(".tup-skip").onclick = finish;
    q("[data-tupx]").onclick = function () { close(false); };
    q("[data-tupm]").onclick = function () { close(true); };
    o.onkeydown = function (e) { if (e.key === "Escape") close(false); };
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(function () {
      o.classList.add("on"); q(".tup-skip").focus();
      if (reduce) { finish(); return; }
      at(150, function () { card.classList.add("in"); });
      at(1300, function () { card.classList.remove("in"); card.classList.add("charge"); });
      at(2450, function () { q(".tup-fl").classList.add("go"); toNew(); });
      at(2700, burst);
      at(3300, function () { q(".tup-h").classList.add("in"); q(".tup-p").classList.add("in"); });
      o.querySelectorAll(".tup-perks li").forEach(function (l, i) { at(3900 + i * 320, function () { l.classList.add("in"); }); });
      at(3900 + t1[2].length * 320 + 250, finish);
    });
  }
  function cnum(v, pre, money) {
    return (
      '<span class="cn" data-cnt="' +
      v +
      '" data-pre="' +
      (pre || "") +
      '" data-m="' +
      (money ? 1 : 0) +
      '">' +
      (pre || "") +
      (money ? gbp(v) : fmt(v)) +
      "</span>"
    );
  }
  function countUp(root) {
    var els = root.querySelectorAll("[data-cnt]");
    if (!els.length) return;
    var red =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    els.forEach(function (e) {
      var to = +e.dataset.cnt,
        pre = e.dataset.pre || "",
        m = e.dataset.m === "1",
        f = function (v) {
          return pre + (m ? gbp(v) : fmt(Math.round(v)));
        };
      if (red) {
        e.textContent = f(to);
        return;
      }
      var t0 = null,
        D = 1300;
      e.textContent = f(0);
      function step(t) {
        if (!t0) t0 = t;
        var k = Math.min(1, (t - t0) / D),
          ease = 1 - Math.pow(1 - k, 3);
        e.textContent = f(to * ease);
        if (k < 1) requestAnimationFrame(step);
        else e.textContent = f(to);
      }
      requestAnimationFrame(step);
    });
  }
  function badgeHtml() {
    var n = tierCount(),
      t = tierOf(n),
      nx = null;
    TIERS.forEach(function (x) {
      if (!nx && x[1] > n) nx = x;
    });
    if (!t) return "";
    var cat = function (p) {
        return /off your next car/.test(p)
          ? "d"
          : /^Payout within/.test(p)
            ? "p"
            : /Retail Ready/.test(p)
              ? "r"
              : p;
      },
      pk = {},
      order = [];
    TIERS.forEach(function (x) {
      if (x[1] <= n)
        x[2].forEach(function (p) {
          var c = cat(p);
          if (!(c in pk)) order.push(c);
          pk[c] = p;
        });
    });
    var perks = order.map(function (c) {
      return pk[c];
    });
    var prog = nx ? Math.round(((n - t[1]) / (nx[1] - t[1])) * 100) : 100;
    var lv = TIERS.indexOf(t) + 1,
      stars = new Array(lv + 1).join("★"),
      sp = "";
    if (lv >= 3)
      for (var q = 0; q < (lv === 4 ? 18 : 9); q++)
        sp +=
          '<i class="tsp" style="left:' +
          ((q * 37 + 11) % 96) +
          "%;top:" +
          ((q * 53 + 7) % 88) +
          "%;animation-delay:" +
          ((q * 0.37) % 2.6).toFixed(2) +
          's"></i>';
    return (
      '<div class="tier tier-' +
      t[0].toLowerCase() +
      '">' +
      sp +
      '<div class="tier-top"><div class="medal" aria-hidden="true"><span class="mst s' +
      lv +
      '">' +
      stars +
      '</span></div><div><p class="tier-k">Trusted Seller · Level ' +
      lv +
      ' of 4</p><h3 class="tier-n">' +
      t[0] +
      '</h3><p class="tier-why">For ' +
      n +
      " car" +
      (n === 1 ? "" : "s") +
      " sold with us, with every inspection matching what you declared.</p></div></div>" +
      '<h4 class="tier-h">Your rewards</h4><ul class="perks">' +
      perks
        .map(function (p) {
          return "<li>" + p + "</li>";
        })
        .join("") +
      "</ul>" +
      (nx
        ? '<div class="tier-next"><div class="tbar"><i style="--w:' +
          prog +
          '%"></i></div><p>' +
          (nx[1] - n) +
          " more sale" +
          (nx[1] - n === 1 ? "" : "s") +
          " to <b>" +
          nx[0] +
          "</b>: " +
          nx[2]
            .map(function (x) {
              return /^£/.test(x) ? x : x.charAt(0).toLowerCase() + x.slice(1);
            })
            .join(", ") +
          ".</p></div>"
        : "") +
      '<div class="tier-cta"><a class="btn" href="#buy">Treat yourself: use your £' +
      (t[0] === "Gold"
        ? 500
        : t[0] === "Silver"
          ? 250
          : t[0] === "Platinum"
            ? 750
            : 100) +
      ' off</a><span class="ref">Your referral code <b id="refc">' +
      refCode() +
      '</b> <button type="button" class="lnkb" id="refcp">Copy</button> <a class="lnk" href="#refer">How it works</a></span></div>' +
      '<p class="note small" style="margin:12px 0 0">Thank you for selling with us. <span class="todo">[Tier thresholds, rewards and their terms to be confirmed.]</span></p></div>'
    );
  }
  function ladderHtml() {
    var n = tierCount(),
      cur = tierOf(n);
    var desc = {
      Bronze: "Your first sale",
      Silver: "Steady seller",
      Gold: "Top seller",
      Platinum: "Our very best sellers",
    };
    return (
      '<section class="ladw"><h3 style="margin:0 0 6px">How to climb the tiers</h3><p class="muted" style="margin:0 0 16px">Every car you sell with us moves you up. Each tier keeps the rewards of the ones below it.</p><ol class="ladder">' +
      TIERS.map(function (x, i) {
        var st = n >= x[1] ? (cur === x ? "now" : "done") : "lock",
          need = x[1] - n;
        return (
          '<li class="lad lad-' +
          x[0].toLowerCase() +
          " " +
          st +
          '"><div class="lad-m" aria-hidden="true">' +
          new Array(i + 2).join("★") +
          '</div><div class="lad-b"><div class="lad-h"><b>' +
          x[0] +
          '</b><span class="lad-req">' +
          x[1] +
          " car" +
          (x[1] > 1 ? "s" : "") +
          ' sold</span><span class="lad-st">' +
          (st === "now"
            ? "You’re here"
            : st === "done"
              ? "✓ Reached"
              : need + " more sale" + (need === 1 ? "" : "s") + " to go") +
          '</span></div><p class="muted small" style="margin:2px 0 6px">' +
          desc[x[0]] +
          '</p><ul class="lad-p">' +
          x[2]
            .map(function (p) {
              return "<li>" + p + "</li>";
            })
            .join("") +
          "</ul></div></li>"
        );
      }).join("") +
      "</ol>" +
      '<div class="ladrules"><h4 style="margin:0 0 8px">What counts as a sale</h4><ul class="pts"><li><b>A sale counts once you’ve signed the sale contract:</b> the buyer has committed and the deal is legally agreed.</li><li><b>Your declaration has to match.</b> If the AA or RAC inspection finds something you didn’t declare, that sale doesn’t count towards your tier.</li><li><b>Pulling out after signing doesn’t count,</b> and a withdrawn or unsold car doesn’t count either.</li><li><b>Climb faster</b> by listing more cars. Selling with your mechanical guarantee or Retail Ready doesn’t change your count, but it does earn you more per car.</li></ul><p class="note small" style="margin:10px 0 0"><span class="todo">[Whether tiers are based on all-time or yearly sales, and whether you can drop a tier, to be confirmed.]</span></p></div></section>'
    );
  }
  function sellerRv() {
    var t = revTotals();
    return (
      badgeHtml() +
      ladderHtml() +
      '<div class="stat stat2 revt"><div class="statb"><b>' +
      cnum(t.n) +
      '</b><span>Cars sold</span></div><div class="statb up big"><b>' +
      cnum(t.all, "", 1) +
      '</b><span>Your total earnings</span></div><div class="statb"><b>' +
      cnum(t.paid, "", 1) +
      '</b><span>Paid to you</span></div><div class="statb"><b>' +
      cnum(t.pend, "", 1) +
      "</b><span>On its way</span></div>" +
      (t.rr
        ? '<div class="statb up"><b>' +
          cnum(t.rr, "+", 1) +
          "</b><span>Extra from Retail Ready</span></div>"
        : "") +
      "</div>" +
      '<p style="margin:0 0 10px"><a class="btn" href="#revenue">Full overview</a></p><p class="note">Your total earnings are everything paid to you, plus what’s on its way. Sample figures for preview.</p>'
    );
  }
  function dnum(d) {
    d = d.split("/");
    return new Date(+d[2], +d[1] - 1, +d[0]);
  }
  function normReg(r) {
    return String(r).toUpperCase().replace(/[\s-]/g, "");
  }
  function revDetail(v) {
    var days = Math.max(1, Math.round((dnum(v.sd) - dnum(v.listed)) / 864e5));
    var steps = STG.map(function (t, n) {
      return (
        '<li class="' +
        (n < v.prog ? "done" : n === v.prog ? "now" : "") +
        '">' +
        t +
        "</li>"
      );
    }).join("");
    return (
      '<div class="rdet">' +
      dls([
        ["Listed", v.listed],
        [
          "Sold",
          v.sd +
            " (" +
            days +
            " day" +
            (days === 1 ? "" : "s") +
            " after listing)",
        ],
        ["Mileage", fmt(v.mi)],
        ["Agreed price", gbp(v.net)],
        [
          "Retail Ready",
          v.rr
            ? "Done: +" +
              gbp(RR_UP) +
              ", less the " +
              gbp(rrFeeOf(v)) +
              " pack fee"
            : "Not chosen",
        ],
        [
          "You made from this car",
          '<b class="net-ok">' + gbp(paidOf(v)) + "</b>",
        ],
        [
          "Finance settled",
          v.fin ? "Yes, from the sale" : "No finance on this car",
        ],
        ["Payout", v.prog >= 7 ? "Paid to you" : "In progress"],
      ]) +
      '<ol class="tracker st" style="margin-top:22px">' +
      steps +
      '</ol><p style="margin:20px 0 0"><button type="button" class="btn ghost" data-docs="' +
      v.id +
      '">See this car’s documents</button></p></div>'
    );
  }
  function revView() {
    var el = $("rev-body");
    if (!user || user.role !== "seller") {
      el.innerHTML =
        '<a class="back" href="#profile">Back</a><h2>Vehicle revenue</h2><p class="muted">Sign in to your seller account to see your sales.</p><p><a class="btn" href="#profile">Sign in</a></p>';
      return;
    }
    var S = soldList()
        .slice()
        .sort(function (a, b) {
          return dnum(b.sd) - dnum(a.sd);
        }),
      t = revTotals(),
      T = tierOf(tierCount());
    el.innerHTML =
      '<a class="back" href="#profile" id="revback">Back to your profile</a><div class="rcpt"><div class="rc-h"><div><p class="muted small" style="margin:0">' + SITE.name +
      (T
        ? ' · <span class="tchip tier-' +
          T[0].toLowerCase() +
          '">★ ' +
          T[0] +
          " Trusted Seller</span>"
        : "") +
      '</p><h2 style="margin:6px 0 2px">Your sales</h2><p class="muted small" style="margin:0">' +
      esc(fullName()) +
      " · " +
      S.length +
      " car" +
      (S.length === 1 ? "" : "s") +
      ' sold</p></div><div class="rc-up"><span>You’ve made</span><b>' +
      cnum(t.all, "", 1) +
      "</b><span>selling with us" +
      (t.rr ? ", including +" + gbp(t.rr) + " from Retail Ready" : "") +
      "</span></div></div>" +
      '<div class="rsearch"><label for="rq" class="sr-only">Search your sold cars</label><input id="rq" type="search" placeholder="Search by registration or car, e.g. LV19 CEN" autocomplete="off"><span class="muted small" id="rqn" aria-live="polite"></span></div>' +
      '<div class="rc-scroll"><table class="rc-t"><thead><tr><th>Sold</th><th>Car</th><th class="n">Agreed price</th><th class="n">Retail Ready</th><th class="n">You made</th><th class="sr-only">Details</th></tr></thead><tbody>' +
      S.map(function (v) {
        return (
          '<tr class="rrow" data-rid="' +
          v.id +
          '" tabindex="0" role="button" aria-expanded="false" data-q="' +
          esc(normReg(v.reg) + " " + vname(v).toUpperCase()) +
          '"><td>' +
          v.sd +
          "</td><td><b>" +
          vname(v) +
          "</b><br>" +
          plate(v.reg) +
          (v.prog < 7
            ? ' <span class="muted small">Payout in progress</span>'
            : "") +
          '</td><td class="n">' +
          gbp(v.net) +
          '</td><td class="n ' +
          (v.rr ? "up" : "muted") +
          '">' +
          (v.rr ? "+" + gbp(RR_UP - rrFeeOf(v)) : "–") +
          '</td><td class="n up">' +
          gbp(paidOf(v)) +
          '</td><td class="n"><span class="chev" aria-hidden="true"></span></td></tr><tr class="rdrow" data-for="' +
          v.id +
          '" hidden><td colspan="6">' +
          revDetail(v) +
          "</td></tr>"
        );
      }).join("") +
      '<tr class="rnone" hidden><td colspan="6" class="muted">No sold cars match that search.</td></tr></tbody><tfoot><tr><td colspan="2">Total</td><td class="n">' +
      gbp(
        S.reduce(function (a, v) {
          return a + v.net;
        }, 0),
      ) +
      '</td><td class="n up">' +
      (t.rr ? "+" + gbp(t.rr) : "–") +
      '</td><td class="n up">' +
      cnum(t.all, "", 1) +
      "</td><td></td></tr></tfoot></table></div>" +
      '<p class="note small" style="margin:16px 0 0">Select a car to see its full details. “You made” is the agreed price you signed for, plus any Retail Ready extra less its pack fee. Sample figures for preview.</p></div>';
    $("revback").onclick = function () {
      ptab = "rv";
    };
    function tog(r, open) {
      var d = el.querySelector('tr.rdrow[data-for="' + r.dataset.rid + '"]');
      open = open == null ? d.hidden : open;
      d.hidden = !open;
      r.classList.toggle("open", open);
      r.setAttribute("aria-expanded", open);
    }
    el.querySelectorAll("tr.rrow").forEach(function (r) {
      r.onclick = function () {
        tog(r);
      };
      r.onkeydown = function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          tog(r);
        }
      };
    });
    el.querySelectorAll("[data-docs]").forEach(function (b) {
      b.onclick = function () {
        openVeh = b.dataset.docs;
        ptab = "dc";
        location.hash = "#profile";
      };
    });
    $("rq").oninput = function () {
      var q = normReg(this.value),
        shown = 0,
        last = null;
      el.querySelectorAll("tr.rrow").forEach(function (r) {
        var ok =
          !q ||
          r.dataset.q.replace(/[\s-]/g, "").indexOf(q) >= 0 ||
          r.dataset.q.indexOf(this.value.toUpperCase().trim()) >= 0;
        r.hidden = !ok;
        if (!ok) tog(r, false);
        if (ok) {
          shown++;
          last = r;
        }
      }, this);
      el.querySelector("tr.rnone").hidden = shown > 0;
      $("rqn").textContent = q
        ? shown + " match" + (shown === 1 ? "" : "es")
        : "";
      if (q && shown === 1) tog(last, true);
    };
    $("rq").onkeydown = function (e) {
      if (e.key === "Enter") {
        var r = el.querySelector("tr.rrow:not([hidden])");
        if (r) {
          tog(r, true);
          r.scrollIntoView({ block: "center", behavior: "smooth" });
        }
      }
    };
    countUp(el);
  }

  function otherRole() {
    return user.role === "buyer" ? "seller" : "buyer";
  }
  function roleHtml() {
    if (user.roles.buyer && user.roles.seller)
      return (
        '<div class="rsw" role="group" aria-label="Switch account"><button type="button" data-sw="buyer" aria-pressed="' +
        (user.role === "buyer") +
        '">Buying</button><button type="button" data-sw="seller" aria-pressed="' +
        (user.role === "seller") +
        '">Selling</button></div>'
      );
    var o = otherRole();
    return (
      '<p style="margin:14px 0 0"><button type="button" class="btn ghost" id="addrole">Add a ' +
      o +
      ' account</button></p><div class="addp" id="addp" hidden><h3 style="margin:0 0 6px">Add a ' +
      o +
      ' account</h3><p style="margin:0 0 6px">Your ' +
      o +
      " account uses this same sign-in, name and email, so both are linked to you. You can switch between buying and selling at any time.</p>" +
      (o === "buyer"
        ? '<p class="muted small" style="margin:0 0 12px">Rewards you earn as a seller can only be used on cars you buy through this linked account. They can’t be passed to anyone else.</p>'
        : '<p class="muted small" style="margin:0 0 12px">Rewards you earn from selling will be ready to use on your next purchase.</p>') +
      '<button type="button" class="btn" id="addok">Add ' +
      o +
      ' account</button> <button type="button" class="btn ghost" id="addno">Not now</button><p class="note small" style="margin:10px 0 0"><span class="todo">[Real account linking and identity checks to be built.]</span></p></div>'
    );
  }
  function rewardsFor() {
    return user && user.roles && user.roles.seller
      ? MAIL.seller.filter(function (m) {
          return m.perk && m.amt && !m.used && !m.repl;
        })
      : [];
  }
  // Reward thresholds: rewards only apply where the car's margin can carry them.
  var RW_FIN_LEND = 10000, RW_FIN_CUT = 3000, RW_FLOOR = 12000;
  function rwMin(amt) {
    return amt <= 250 ? RW_FLOOR : amt <= 500 ? 15000 : 18000;
  }
  function rwOk(m, price, fin, borrow) {
    var need = rwMin(m.amt);
    if (fin && borrow >= RW_FIN_LEND) need = Math.max(RW_FLOOR, need - RW_FIN_CUT);
    return price >= need;
  }
  function rwWhy(m) {
    var n = rwMin(m.amt);
    return "£" + fmt(m.amt) + " rewards apply to cars from £" + fmt(n) + (n > RW_FLOOR ? ", or from £" + fmt(Math.max(RW_FLOOR, n - RW_FIN_CUT)) + " on finance when you borrow £" + fmt(RW_FIN_LEND) + " or more" : "") + ".";
  }

  var ICW =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="3"/><path d="M16 12.5h5M6 6l9-3 1.5 3"/></svg>',
    ICC =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 9.5h19M6 15h4"/></svg>';
  function payView() {
    var el = $("pay-body"),
      T = payTok;
    if (!T) {
      el.innerHTML =
        '<h2>This payment link isn’t valid</h2><p class="muted">It may have been used already or expired. Payment links are only sent by email to the account holder.</p><p><a class="btn" href="#buy">Browse cars</a></p>';
      return;
    }
    if (T.used) {
      el.innerHTML =
        '<h2>This link has already been used</h2><p class="muted">You’ve already paid with this link' +
        (reserved[T.i] && !reserved[T.i].sold
          ? ". The " +
            carNm(T.i) +
            " is reserved for you until " +
            reserved[T.i].until +
            "."
          : ".") +
        '</p><p><a class="btn" href="#car-' +
        T.i +
        '">View your car</a> <a class="btn ghost" href="#profile">Your profile</a></p>';
      return;
    }
    var c = cars[T.i],
      nm = c.y + " " + c.mk + " " + c.md,
      method = null,
      K = T.kind || "res",
      amt = T.amt || RES_DEP;
    function head() {
      return (
        '<p class="muted small" style="margin:0">' + SITE.name + ' · Secure payment</p><h2 style="margin:6px 0 4px">' +
        (K === "res"
          ? "Reserve the "
          : K === "bal"
            ? "Pay for the "
            : "Pay your deposit for the ") +
        nm +
        '</h2><p class="payamt">' +
        gbp(amt) +
        "</p>"
      );
    }
    function draw() {
      el.innerHTML =
        '<div class="paybox">' +
        head() +
        (K === "bal"
          ? (function () {
              var sh = Math.min(amt, sellerShare(c)),
                us = amt - sh;
              return (
                '<div class="splitb"><b>One payment, split automatically</b><div class="row"><span>To the seller, held safely until handover</span><span>' +
                gbp(sh) +
                '</span></div><div class="row"><span>To ' + SITE.name + ': our service, the buyer fee and your extras' +
                (myPur && myPur.res ? ", less your reservation" : "") +
                "</span><span>" +
                gbp(us) +
                '</span></div><p class="small muted" style="margin:8px 0 0">Our payment provider holds the seller’s share and releases it only after you’ve collected the car. <span class="todo">[Split payments to be set up with the payment provider.]</span></p></div>'
              );
            })()
          : "") +
        (K === "res"
          ? '<p class="note" style="margin:0 0 16px">This <b class="imp">non-refundable</b> reservation holds the car for ' +
            HOLD_DEP +
            ' days and comes off your final price. It’s <b class="imp">only returned if the deal can’t go ahead through no fault of yours</b>.</p>'
          : K === "bal"
            ? '<p class="note" style="margin:0 0 16px">This pays for the car in full' +
              (myPur && myPur.res
                ? ", with your " +
                  gbp(RES_DEP) +
                  " reservation already taken off"
                : "") +
              '. You can still cancel within 14 days of handover. <span class="todo">[Solicitor to confirm.]</span></p>'
            : '<p class="note" style="margin:0 0 16px">Your cash deposit for the finance agreement you’ve signed. The lender pays the rest.</p>') +
        '<p style="font-weight:600;margin:0 0 8px">Choose how to pay</p><div class="paym" role="group" aria-label="Payment method">' +
        '<button type="button" class="wal" data-pm="apple" aria-pressed="' +
        (method === "apple") +
        '">' +
        ICW +
        "<span>Pay with Apple Pay</span></button>" +
        '<button type="button" class="wal" data-pm="google" aria-pressed="' +
        (method === "google") +
        '">' +
        ICW +
        "<span>Pay with Google Pay</span></button>" +
        '<button type="button" class="wal" data-pm="card" aria-pressed="' +
        (method === "card") +
        '" aria-expanded="' +
        (method === "card") +
        '">' +
        ICC +
        "<span>Credit or debit card</span></button></div>" +
        (method === "card"
          ? '<p style="margin:0 0 10px"><button type="button" class="btn ghost" id="cfill" style="padding:8px 16px">Fill with an example card (preview)</button> <button type="button" class="lnkb" id="cdecl">Example declined card (preview)</button></p><form class="cardf" id="cardf" novalidate autocomplete="off"><label class="full">Card number<input id="cn" inputmode="numeric" autocomplete="off" placeholder="1234 5678 9012 3456" maxlength="23"></label><label>Expiry date<input id="ce" inputmode="numeric" autocomplete="off" placeholder="MM/YY" maxlength="5"></label><label>Security code<input id="cc" inputmode="numeric" autocomplete="off" placeholder="CVC" maxlength="4"></label><label class="full">Name on card<input id="cnm" autocomplete="off" value="' +
            esc(fullName()) +
            '"></label><label class="full">Billing postcode<input id="cpc" autocomplete="off" style="text-transform:uppercase"></label></form><p class="muted small" style="margin:-4px 0 12px">Preview only: what you type here isn’t saved or sent anywhere. <span class="todo">[In the live service these fields come from the payment provider’s secure form.]</span></p>'
          : "") +
        '<p class="pxerr" id="payerr" aria-live="polite"></p><button type="button" class="btn" id="paygo" style="width:100%">' +
        (method === "apple"
          ? "Pay " + gbp(amt) + " with Apple Pay"
          : method === "google"
            ? "Pay " + gbp(amt) + " with Google Pay"
            : "Pay " + gbp(amt)) +
        '</button><p class="muted small" style="margin:12px 0 0">Preview only: no payment is taken. <span class="todo">[Payment provider to be connected. The official Apple Pay and Google Pay buttons come from the provider.]</span></p></div>';
      el.querySelectorAll("[data-pm]").forEach(function (b) {
        b.onclick = function () {
          method = b.dataset.pm;
          draw();
          if (method === "card") $("cn").focus();
        };
      });
      if ($("cn")) {
        $("cn").oninput = function () {
          var d = this.value.replace(/\D/g, "").slice(0, 19);
          this.value = d.replace(/(.{4})/g, "$1 ").trim();
          this.classList.remove("miss");
        };
        $("ce").oninput = function () {
          var d = this.value.replace(/\D/g, "").slice(0, 4);
          this.value = d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
          this.classList.remove("miss");
        };
        $("cc").oninput = function () {
          this.value = this.value.replace(/\D/g, "").slice(0, 4);
          this.classList.remove("miss");
        };
        ["cnm", "cpc"].forEach(function (k) {
          $(k).oninput = function () {
            this.classList.remove("miss");
          };
        });
        $("cfill").onclick = function () {
          $("cn").value = "4242 4242 4242 4242";
          $("ce").value = "12/30";
          $("cc").value = "123";
          if (!$("cnm").value.trim()) $("cnm").value = "Sam Smith";
          $("cpc").value = "LS1 4AB";
          ["cn", "ce", "cc", "cnm", "cpc"].forEach(function (k) {
            $(k).classList.remove("miss");
          });
          $("payerr").textContent = "";
        };
        $("cdecl").onclick = function () {
          $("cfill").onclick();
          $("cn").value = "4000 0000 0000 0002";
        };
      }
      $("paygo").onclick = function () {
        if (!method) {
          $("payerr").textContent = "Choose how you’d like to pay.";
          return;
        }
        if (method === "card") {
          var n = $("cn").value.replace(/\D/g, ""),
            e = $("ce").value,
            m = /^(\d\d)\/(\d\d)$/.exec(e),
            now = new Date(),
            bad = [];
          var luhn = function (x) {
            var sum = 0,
              alt = false;
            for (var k = x.length - 1; k >= 0; k--) {
              var d = +x[k];
              if (alt) {
                d *= 2;
                if (d > 9) d -= 9;
              }
              sum += d;
              alt = !alt;
            }
            return sum % 10 === 0;
          };
          if (n.length < 13 || !luhn(n)) bad.push("cn");
          if (
            !m ||
            +m[1] < 1 ||
            +m[1] > 12 ||
            new Date(2000 + +m[2], +m[1], 1) <= now
          )
            bad.push("ce");
          if (!/^\d{3,4}$/.test($("cc").value)) bad.push("cc");
          if ($("cnm").value.trim().length < 3) bad.push("cnm");
          if ($("cpc").value.trim().length < 5) bad.push("cpc");
          bad.forEach(function (k) {
            $(k).classList.add("miss");
          });
          if (bad.length) {
            $("payerr").textContent = "Check the card details highlighted.";
            return;
          }
          if (n === "4000000000000002") {
            $("payerr").innerHTML =
              "<b>Your bank declined this payment.</b> Nothing has been taken. Try another card, or contact your bank.";
            return;
          }
          ["cn", "ce", "cc"].forEach(function (k) {
            $(k).value = "";
          });
        }
        processing();
      };
    }
    function processing() {
      el.innerHTML =
        '<div class="paybox payload" role="status" aria-live="polite"><div class="spin" aria-hidden="true"></div><h2 style="margin:18px 0 6px">Processing your payment</h2><p class="muted" style="margin:0">This only takes a moment. Please don’t close this page.</p><ol class="psteps"><li id="ps1">Confirming payment</li><li id="ps2">' +
        (K === "res" ? "Reserving your car" : "Securing your car") +
        '</li><li id="ps3">Sending your confirmation</li></ol></div>';
      var k = 0;
      var tick = setInterval(function () {
        k++;
        var li = $("ps" + k);
        if (li) li.className = "ok";
        if (k >= 3) {
          clearInterval(tick);
          setTimeout(complete, 450);
        }
      }, 650);
    }
    function complete() {
      if (K !== "res") {
        if (myPur) {
          myPur.stage = 1;
          if (K === "bal") myPur.paid = true;
          else myPur.depPaid = true;
        }
        reserved[T.i] = { by: user.email, until: "", sold: true };
        payTok = { used: true, i: T.i, kind: K };
        addMail("buyer", {
          s: "Payment received: " + nm,
          b:
            "Thank you. We’ve received " +
            gbp(amt) +
            (K === "dep" ? " for your deposit" : "") +
            ". The " +
            nm +
            " is yours once it’s handed over. Next, choose collection or delivery.",
          href: "#deliver",
          hl: "Choose collection or delivery",
        });
        updProf();
        el.innerHTML =
          '<div class="paybox paydone"><div class="tick" aria-hidden="true"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M15 27l7 7 15-16"/></svg></div><h2 style="margin:14px 0 8px">Payment complete</h2><p style="margin:0 0 6px">We’ve received <b>' +
          gbp(amt) +
          "</b> for the <b>" +
          nm +
          '</b>.</p><p class="muted" style="margin:0 0 18px">Next, choose collection or delivery. We’ve sent your receipt to <b>' +
          esc(user.email) +
          '</b>.</p><p style="margin:0"><a class="btn" href="#deliver">Choose collection or delivery</a></p></div>';
        return;
      }
      reserved[T.i] = { by: user ? user.email : "you", until: untilDate() };
      resv.push({ i: T.i, v: "dep" });
      if (T.rw) {
        var um = MAIL.seller.filter(function (m) {
          return m.id === T.rw;
        })[0];
        if (um) um.used = nm;
      }
      MAIL.buyer.unshift({
        id: "r" + Date.now(),
        s: "Payment complete: " + nm + " reserved",
        b:
          "Thank you" +
          (user && user.first ? ", " + esc(user.first) : "") +
          ". We’ve received your " +
          gbp(RES_DEP) +
          " reservation payment. The " +
          nm +
          " is reserved for you until " +
          reserved[T.i].until +
          ", and the " +
          gbp(RES_DEP) +
          " comes off the final price.",
        d: "Just now",
        u: true,
        href: "#car-" + T.i,
        hl: "View your car",
      });
      payTok = { used: true, i: T.i, kind: K };
      updProf();
      el.innerHTML =
        '<div class="paybox paydone"><div class="tick" aria-hidden="true"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M15 27l7 7 15-16"/></svg></div><h2 style="margin:14px 0 8px">Payment complete</h2><p style="margin:0 0 6px">The <b>' +
        nm +
        "</b> is now reserved for you until <b>" +
        reserved[T.i].until +
        '</b>.</p><p class="muted" style="margin:0 0 18px">We’ve sent your confirmation to <b>' +
        (user ? esc(user.email) : "your email") +
        '</b> and to the mail in your profile.</p><p style="margin:0"><a class="btn" href="#car-' +
        T.i +
        '">Back to your car</a> <a class="btn ghost" href="#profile">Your profile</a></p></div>';
    }
    draw();
  }

  var FINF = [
      [
        ["dob", "Date of birth (DD/MM/YYYY)", "text", "14/03/1990"],
        [
          "ms",
          "Marital status",
          "select",
          "Married",
          [
            "Single",
            "Married",
            "Civil partnership",
            "Separated",
            "Divorced",
            "Widowed",
          ],
        ],
        ["addr", "Home address", "text", "12 Park Lane, Leeds LS1 4AB"],
        ["ya", "Years at this address", "num", "4"],
        [
          "hs",
          "Housing",
          "select",
          "Renting",
          [
            "Homeowner with a mortgage",
            "Homeowner outright",
            "Renting",
            "Living with family",
            "Other",
          ],
        ],
      ],
      [
        [
          "emp",
          "Employment status",
          "select",
          "Employed full time",
          [
            "Employed full time",
            "Employed part time",
            "Self-employed",
            "Retired",
            "Student",
            "Unemployed",
            "Other",
          ],
        ],
        ["er", "Employer", "text", "Northern Logistics Ltd"],
        ["yr", "Time with employer (years)", "num", "3"],
        ["inc", "Annual income before tax (£)", "num", "34000"],
        ["out", "Monthly housing cost (£)", "num", "850"],
        ["dpd", "Dependants", "num", "0"],
      ],
      [
        ["bn", "Name on the account", "text", ""],
        ["bs", "Sort code", "text", "20-00-00"],
        ["ba", "Account number", "text", "55779911"],
      ],
    ],
    FINT = [
      "About you",
      "Your job and money",
      "Your bank, for monthly payments",
      "Check and send",
    ];
  function finView() {
    var el = $("fin-body");
    if (!user) {
      after = "#fin";
      location.hash = "#profile";
      return;
    }
    if (!myPur || myPur.mode !== "fin") {
      el.innerHTML =
        '<a class="back" href="#profile">Back</a><h2>No finance application in progress</h2><p class="muted">To apply, open a car, choose Pay monthly, then Buy it now.</p><p><a class="btn" href="#buy">Browse cars</a></p>';
      return;
    }
    var P = myPur,
      A = P.app || (P.app = { step: 0, v: { bn: fullName() } }),
      nm = carNm(P.i);
    function head(t) {
      return (
        '<a class="back" href="#car-' +
        P.i +
        '">Back to the car</a><div class="pxw"><p class="muted small" style="margin:0">Finance application · ' +
        nm +
        '</p><h2 style="margin:6px 0 10px">' +
        t +
        "</h2>"
      );
    }
    function draw() {
      if (A.status) {
        result();
        return;
      }
      var n = A.step,
        h =
          head(FINT[n]) +
          '<div class="idbar" aria-hidden="true"><i style="width:' +
          Math.round(((n + 1) / 4) * 100) +
          '%"></i></div><p class="note" style="margin:0 0 18px">Step ' +
          (n + 1) +
          " of 4</p>";
      if (n < 3) {
        h +=
          '<div class="dmgf">' +
          FINF[n]
            .map(function (f) {
              var v = A.v[f[0]] == null ? "" : A.v[f[0]];
              return (
                "<label" +
                (f[0] === "addr" || f[0] === "bn" ? ' class="full"' : "") +
                ">" +
                f[1] +
                (f[2] === "select"
                  ? '<select data-ff="' +
                    f[0] +
                    '"><option value="">Choose</option>' +
                    f[4]
                      .map(function (o) {
                        return (
                          "<option" +
                          (v === o ? " selected" : "") +
                          ">" +
                          o +
                          "</option>"
                        );
                      })
                      .join("") +
                    "</select>"
                  : '<input data-ff="' +
                    f[0] +
                    '"' +
                    (f[2] === "num" ? ' inputmode="numeric"' : "") +
                    ' value="' +
                    esc(v) +
                    '" autocomplete="off">') +
                "</label>"
              );
            })
            .join("") +
          '</div><p style="margin:10px 0 0"><button type="button" class="btn ghost" id="ffill" style="padding:8px 16px">Fill with example details (preview)</button></p>' +
          (n === 2
            ? '<p class="note small">The lender collects your monthly payments from this account by Direct Debit.</p>'
            : "");
      } else
        h +=
          dls([
            ["Car", nm],
            ["Finance type", P.prod],
            ["Term", P.term + " months"],
            ["Monthly payment (example)", P.pm],
            ["Your cash deposit", gbp(P.dep)],
            ["Total amount payable", gbp(P.total)],
          ]) +
          '<label class="agree" id="fa1-l"><input type="checkbox" id="fa1"><span>I agree to a <b>soft search</b> of my credit file to check eligibility. It doesn’t affect my credit score. If I go ahead, the lender will do a full credit check, which is recorded on my file.</span></label>' +
          '<label class="agree" id="fa2-l"><input type="checkbox" id="fa2"><span>The information I’ve given is true and complete, and I can afford the monthly payments now and if my circumstances change.</span></label>' +
          '<p class="note small">We’re a credit broker, not a lender. We work with a small number of lenders and may receive commission from them. <span class="todo">[FCA-approved wording, the lender panel and how commission works to be confirmed.]</span></p>';
      h +=
        '<p class="pxerr" id="fnerr" aria-live="polite"></p><div class="pxnav">' +
        (n > 0
          ? '<button type="button" class="btn ghost" id="fnb">Back</button>'
          : "") +
        '<button type="button" class="btn" id="fnn">' +
        (n === 3 ? "Send my application" : "Next") +
        '</button></div><p class="note small" style="margin-top:14px">Preview only: nothing is sent to a lender. <span class="todo">[Lender application connection to be set up.]</span></p></div>';
      el.innerHTML = h;
      window.scrollTo(0, 0);
      function keep() {
        el.querySelectorAll("[data-ff]").forEach(function (x) {
          A.v[x.dataset.ff] = x.value.trim();
        });
      }
      el.querySelectorAll("[data-ff]").forEach(function (x) {
        x.oninput = x.onchange = function () {
          x.classList.remove("miss");
        };
      });
      if ($("ffill"))
        $("ffill").onclick = function () {
          FINF[n].forEach(function (f) {
            A.v[f[0]] = f[0] === "bn" ? fullName() : f[3];
          });
          draw();
        };
      if ($("fnb"))
        $("fnb").onclick = function () {
          keep();
          A.step--;
          draw();
        };
      $("fnn").onclick = function () {
        keep();
        var bad = 0;
        if (n < 3) {
          el.querySelectorAll("[data-ff]").forEach(function (x) {
            var k = x.dataset.ff,
              v = x.value.trim(),
              ok = !!v;
            if (k === "dob") ok = /^\d{1,2}\/\d{1,2}\/(19|20)\d\d$/.test(v);
            if (k === "bs") ok = v.replace(/\D/g, "").length === 6;
            if (k === "ba") ok = /^\d{8}$/.test(v);
            if (k === "er" && /Retired|Student|Unemployed/.test(A.v.emp || ""))
              ok = true;
            x.classList.toggle("miss", !ok);
            if (!ok) bad++;
          });
          if (bad) {
            $("fnerr").textContent = "Check the details highlighted.";
            return;
          }
          A.step++;
          draw();
          return;
        }
        ["fa1", "fa2"].forEach(function (k) {
          var ok = $(k).checked;
          $(k + "-l").classList.toggle("miss", !ok);
          if (!ok) bad++;
        });
        if (bad) {
          $("fnerr").textContent = "Tick both boxes to send your application.";
          return;
        }
        A.status = "sent";
        addMail("buyer", {
          s: "Finance application sent: " + nm,
          b: "We’ve sent your application to the lender. Most decisions come back within minutes, and we’ll let you know straight away.",
          href: "#fin",
          hl: "See your application",
        });
        updProf();
        draw();
      };
    }
    function result() {
      var s = A.status,
        h;
      if (s === "sent")
        h =
          head("Application sent") +
          '<div class="paybox payload" style="margin:10px 0 16px"><div class="spin" aria-hidden="true"></div><p style="margin:14px 0 0">The lender is reviewing your application. Most decisions come back within minutes. We’ll email and text you as soon as we hear.</p></div><div class="pvrow"><span class="muted small">Preview the lender’s answer:</span><button type="button" class="lnkb" data-fr="ok">Approved</button><button type="button" class="lnkb" data-fr="ref">Needs more information</button><button type="button" class="lnkb" data-fr="no">Declined</button></div></div>';
      else if (s === "ok")
        h =
          head("You’re approved") +
          "<p>Good news: the lender has approved your finance for the " +
          nm +
          ".</p>" +
          dls([
            ["Lender", '<span class="todo">[Lender name]</span>'],
            ["Finance type", P.prod],
            ["Term", P.term + " months"],
            ["Monthly payment", P.pm + " (example)"],
            [
              "Your cash deposit",
              gbp(P.dep) + (P.dep ? ", paid next by card" : ""),
            ],
            ["Total amount payable", gbp(P.total)],
          ]) +
          '<h3 style="margin-top:26px">Sign your finance agreement</h3><p class="muted">Read the pre-contract information and the agreement before you sign. <span class="todo">[Links to the lender’s documents.]</span></p>' +
          '<label class="agree" id="fs1-l"><input type="checkbox" id="fs1"><span>I’ve read the pre-contract information and the agreement, and I understand I have 14 days after signing to withdraw from the finance.</span></label><label>Sign by typing your full name<input id="fsig" value="' +
          esc(fullName()) +
          '"></label><p class="pxerr" id="fserr"></p><button type="button" class="btn" id="fsgo">Sign finance agreement</button><p class="note small"><span class="todo">[The agreement is the lender’s and is signed on their secure e-signature service.]</span></p></div>';
      else if (s === "ref")
        h =
          head("The lender needs a little more information") +
          "<p>This is common and doesn’t mean you’ve been turned down. Please send:</p>" +
          [
            ["fi1", "Proof of income", "Your last 3 payslips"],
            ["fi2", "Bank statements", "The last 3 months, all pages"],
          ]
            .map(function (r) {
              var g = (A.up || {})[r[0]];
              return (
                '<div class="evrow" id="ev-' +
                r[0] +
                '"><div><b>' +
                r[1] +
                "</b><small>" +
                r[2] +
                "</small>" +
                (g
                  ? '<small style="color:var(--ok)">Added: ' +
                    esc(g) +
                    "</small>"
                  : "") +
                '</div><div><label class="fup" style="border:1px solid var(--line);border-radius:999px;padding:7px 16px;cursor:pointer;position:relative;display:inline-block">' +
                (g ? "Replace" : "Add file") +
                '<input type="file" data-fu="' +
                r[0] +
                '" style="position:absolute;opacity:0;width:1px;height:1px"></label></div></div>'
              );
            })
            .join("") +
          '<p class="small"><button type="button" class="lnkb" id="fusmp">Use example files (preview)</button></p><p class="pxerr" id="fuerr"></p><button type="button" class="btn" id="fugo">Send to the lender</button></div>';
      else if (s === "refsent")
        h =
          head("Sent to the lender") +
          '<p>Thanks. The lender usually replies within 24 to 48 hours. The car stays held for you while we wait.</p><div class="pvrow"><span class="muted small">Preview the lender’s answer:</span><button type="button" class="lnkb" data-fr="ok">Approved</button><button type="button" class="lnkb" data-fr="no">Declined</button></div></div>';
      else
        h =
          head("The lender couldn’t approve your application") +
          '<p>We’re sorry. This doesn’t have to be the end: here’s what you can do.</p><div class="optc"><button type="button" class="btn ghost" id="fdep">Try again with a bigger deposit</button><button type="button" class="btn ghost" id="fcash">Pay in full instead</button><button type="button" class="btn ghost" id="fcx">' +
          (P.res
            ? "Cancel and get my " + gbp(RES_DEP) + " back"
            : "Cancel my purchase") +
          '</button></div><p class="note small">You can ask the lender why. A declined application may be recorded on your credit file. <span class="todo">[Decline wording, and whether the reservation is refunded, to be confirmed with the lender and your solicitor.]</span></p></div>';
      el.innerHTML = h;
      window.scrollTo(0, 0);
      el.querySelectorAll("[data-fr]").forEach(function (b) {
        b.onclick = function () {
          A.status = b.dataset.fr;
          var M = {
            ok: [
              "Approved: your finance for the ",
              "Good news. Sign your finance agreement to carry on.",
            ],
            ref: [
              "More information needed: ",
              "The lender needs a little more information. It only takes a minute.",
            ],
            no: [
              "Finance update: ",
              "The lender couldn’t approve your application. See your options.",
            ],
          }[A.status];
          addMail("buyer", { s: M[0] + nm, b: M[1], href: "#fin", hl: "Open" });
          updProf();
          draw();
        };
      });
      if ($("fsgo"))
        $("fsgo").onclick = function () {
          var a = $("fs1").checked,
            nmv = $("fsig").value.trim(),
            b = nmv.indexOf(" ") > 0;
          $("fs1-l").classList.toggle("miss", !a);
          $("fsig").classList.toggle("miss", !b);
          if (!a || !b) {
            $("fserr").textContent =
              "Tick the box and type your full name to sign.";
            return;
          }
          A.signed = nmv;
          addMail("buyer", {
            s: "Finance agreement signed: " + nm,
            b:
              "Thanks. Your signed agreement is in Documents. " +
              (P.dep
                ? "Next, pay your " + gbp(P.dep) + " deposit."
                : "Next, choose collection or delivery."),
            go: "dc",
          });
          if (P.dep) {
            payTok = {
              i: P.i,
              kind: "dep",
              amt: P.dep,
              tok: Math.random().toString(36).slice(2),
            };
            location.hash = "#pay";
          } else {
            P.stage = 1;
            reserved[P.i] = { by: user.email, until: "", sold: true };
            location.hash = "#deliver";
          }
        };
      if ($("fusmp"))
        $("fusmp").onclick = function () {
          A.up = { fi1: "example-payslips.pdf", fi2: "example-statements.pdf" };
          draw();
        };
      el.querySelectorAll("[data-fu]").forEach(function (x) {
        x.onchange = function () {
          if (x.files[0]) {
            A.up = A.up || {};
            A.up[x.dataset.fu] = x.files[0].name;
            draw();
          }
        };
      });
      if ($("fugo"))
        $("fugo").onclick = function () {
          var u = A.up || {},
            bad = 0;
          ["fi1", "fi2"].forEach(function (k) {
            $("ev-" + k).classList.toggle("miss", !u[k]);
            if (!u[k]) bad++;
          });
          if (bad) {
            $("fuerr").textContent = "Add both files to continue.";
            return;
          }
          A.status = "refsent";
          draw();
        };
      if ($("fdep"))
        $("fdep").onclick = function () {
          var cs = carSt[P.i];
          if (cs) {
            cs.mode = "fin";
            cs.rvOpen = false;
            cs.done = null;
          }
          myPur = null;
          location.hash = "#car-" + P.i;
        };
      if ($("fcash"))
        $("fcash").onclick = function () {
          var cs = carSt[P.i];
          if (cs) {
            cs.mode = "cash";
            cs.rvOpen = false;
            cs.done = null;
          }
          myPur = null;
          location.hash = "#car-" + P.i;
        };
      if ($("fcx"))
        $("fcx").onclick = function () {
          var k = P.i;
          resv = resv.filter(function (r) {
            return !(r.i === k && r.v === "buy");
          });
          myPur = null;
          if (reserved[k] && resvByMe(k)) endRes(k, "refund");
          else
            addMail("buyer", {
              s: "Purchase cancelled: " + carNm(k),
              b: "You’ve cancelled your purchase. There’s nothing more to pay.",
              href: "#car-" + k,
              hl: "View the car",
            });
          updProf();
          location.hash = "#profile";
        };
    }
    draw();
  }
  function delView() {
    var el = $("del-body");
    if (!user) {
      after = "#deliver";
      location.hash = "#profile";
      return;
    }
    if (!myPur || myPur.stage < 1) {
      el.innerHTML =
        '<a class="back" href="#profile">Back</a><h2>Nothing to book yet</h2><p class="muted">You can choose collection or delivery once your car is paid for, or your finance is signed.</p><p><a class="btn" href="#profile" id="dgo0">Go to My purchase</a></p>';
      $("dgo0").onclick = function () {
        pwant = "pu";
      };
      return;
    }
    var P = myPur,
      nm = carNm(P.i),
      D =
        P.dd ||
        (P.dd = {
          type: P.dlv ? "Delivery" : "",
          date: "",
          slot: "",
          addr: "",
          ph: user.mob || "",
        }),
      days = wkDays(8);
    function draw() {
      el.innerHTML =
        '<a class="back" href="#profile" id="dback">Back to My purchase</a><div class="pxw"><p class="muted small" style="margin:0">' +
        nm +
        '</p><h2 style="margin:6px 0 14px">Choose collection or delivery</h2>' +
        '<div class="rrc" id="dtype">' +
        [
          [
            "Delivery",
            "Delivered to your door",
            "Tracked live in your profile. " +
              (P.dlv
                ? "Already added at checkout."
                : gbp(OPTS[2][1]) + " (estimate), paid before delivery."),
          ],
          [
            "Collection",
            "Collect it yourself",
            'Free. From the seller’s area or our partner hub near them. <span class="todo">[Collection points to be confirmed.]</span>',
          ],
        ]
          .map(function (o) {
            return (
              '<label class="rrcard' +
              (D.type === o[0] ? " on" : "") +
              '"><input type="radio" name="dty" value="' +
              o[0] +
              '"' +
              (D.type === o[0] ? " checked" : "") +
              '><span class="rrk">' +
              o[1] +
              '</span><span class="small muted">' +
              o[2] +
              "</span></label>"
            );
          })
          .join("") +
        "</div>" +
        '<h3 style="margin-top:24px">Choose a day</h3><div class="dchips" id="ddays">' +
        days
          .map(function (d) {
            return (
              '<button type="button" class="chip" data-day="' +
              d +
              '" aria-pressed="' +
              (D.date === d) +
              '">' +
              d +
              "</button>"
            );
          })
          .join("") +
        "</div>" +
        '<div class="dmgf" style="margin-top:16px"><label>Time<select id="dslot"><option value="">Choose</option>' +
        ["Morning, 8am to 12pm", "Afternoon, 12pm to 5pm"]
          .map(function (o) {
            return (
              "<option" +
              (D.slot === o ? " selected" : "") +
              ">" +
              o +
              "</option>"
            );
          })
          .join("") +
        '</select></label><label>Contact number<input id="dph" type="tel" value="' +
        esc(D.ph) +
        '"></label>' +
        (D.type === "Delivery"
          ? '<label class="full">Delivery address<input id="daddr" value="' +
            esc(D.addr) +
            '" autocomplete="street-address"></label>'
          : "") +
        "</div>" +
        '<p style="margin:10px 0 0"><button type="button" class="btn ghost" id="dfill" style="padding:8px 16px">Fill with example details (preview)</button></p><p class="note small">Bring your driving licence on the day. Someone else can receive the car if you tell us their name first. <span class="todo">[Handover rules to be confirmed.]</span></p><p class="pxerr" id="derr"></p><button type="button" class="btn" id="dgo">Confirm ' +
        (D.type ? D.type.toLowerCase() : "booking") +
        "</button></div>";
      $("dback").onclick = function () {
        pwant = "pu";
      };
      function keep() {
        D.slot = $("dslot").value;
        D.ph = $("dph").value.trim();
        if ($("daddr")) D.addr = $("daddr").value.trim();
      }
      el.querySelectorAll("input[name=dty]").forEach(function (r) {
        r.onchange = function () {
          keep();
          D.type = r.value;
          draw();
        };
      });
      el.querySelectorAll("[data-day]").forEach(function (b) {
        b.onclick = function () {
          keep();
          D.date = b.dataset.day;
          draw();
        };
      });
      $("dfill").onclick = function () {
        keep();
        if (!D.type) D.type = "Delivery";
        if (!D.date) D.date = days[1];
        D.slot = D.slot || "Afternoon, 12pm to 5pm";
        D.ph = D.ph || "07700 900123";
        D.addr = D.addr || "12 Park Lane, Leeds LS1 4AB";
        draw();
      };
      $("dgo").onclick = function () {
        keep();
        var bad = [];
        if (!D.type) bad.push("dtype");
        if (!D.date) bad.push("ddays");
        if (!D.slot) bad.push("dslot");
        if (D.ph.replace(/\D/g, "").length < 10) bad.push("dph");
        if (D.type === "Delivery" && D.addr.length < 8) bad.push("daddr");
        bad.forEach(function (k) {
          if ($(k)) $(k).classList.add("miss");
        });
        if (bad.length) {
          $("derr").textContent = "Fill in everything highlighted.";
          return;
        }
        P.del = { type: D.type, date: D.date, slot: D.slot, addr: D.addr };
        P.stage = 2;
        addMail("buyer", {
          s: D.type + " booked: " + nm,
          b:
            "Your " +
            D.type.toLowerCase() +
            " is booked for " +
            D.date +
            ", " +
            D.slot.toLowerCase() +
            (D.type === "Delivery" ? ", to " + esc(D.addr) : "") +
            ". We’ll remind you the day before.",
          go: "pu",
        });
        updProf();
        el.innerHTML =
          '<div class="paybox paydone"><div class="tick" aria-hidden="true"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M15 27l7 7 15-16"/></svg></div><h2 style="margin:14px 0 8px">' +
          D.type +
          ' booked</h2><p style="margin:0 0 18px"><b>' +
          D.date +
          "</b>, " +
          D.slot.toLowerCase() +
          '.</p><a class="btn" href="#profile" id="dpu">Go to My purchase</a></div>';
        $("dpu").onclick = function () {
          pwant = "pu";
        };
      };
    }
    draw();
  }
  function purHtml() {
    var P = myPur,
      nm = carNm(P.i),
      c = cars[P.i],
      fin = P.mode === "fin";
    var S = [
        fin ? "Finance approved and signed" : "Paid",
        "AA or RAC inspection",
        "Collection or delivery booked",
        "Handover",
        "Yours to keep",
      ],
      k = [0, 1, 3, 4][P.stage] || 0;
    var h =
      '<h3 style="font:300 1.35rem var(--display);margin:0 0 14px">' +
      nm +
      '</h3><ol class="tracker st pu-gap">' +
      S.map(function (t, n) {
        return (
          '<li class="' +
          (n < k ||
          (P.stage === 3 && !P.ret && n <= k && daysLeft(P.retBy) === 0)
            ? "done"
            : n === k
              ? "now"
              : "") +
          '">' +
          t +
          "</li>"
        );
      }).join("") +
      '</ol><div style="margin-top:40px">';
    if (P.ret)
      h +=
        '<div class="warnb"><b>Return requested</b><p>We’ll collect the car on ' +
        P.ret.date +
        '. Your refund is paid within 14 days of us getting it back. <span class="todo">[Refund amount and any deductions to be confirmed by your solicitor.]</span></p></div>';
    else if (P.stage === 0)
      h +=
        '<div class="nextb"><b>Next: ' +
        (fin ? "finish your finance application" : "pay for your car") +
        "</b><p>" +
        (fin
          ? "It takes a few minutes, and most decisions come back the same day."
          : "Pay " +
            gbp(P.total) +
            " securely by card, Apple Pay or Google Pay.") +
        '</p><a class="btn" href="' +
        (fin ? "#fin" : "#pay") +
        '">' +
        (fin ? "Continue application" : "Pay now") +
        "</a></div>";
    else if (P.stage === 1)
      h +=
        '<div class="nextb"><b>Next: choose collection or delivery</b><p>While we inspect and prepare your car, pick the day that suits you.</p><a class="btn" href="#deliver">Choose collection or delivery</a></div>';
    else if (P.stage === 2) {
      h +=
        '<div class="nextb"><b>' +
        P.del.type +
        " booked: " +
        P.del.date +
        "</b><p>" +
        P.del.slot +
        (P.del.type === "Delivery" ? ", to " + esc(P.del.addr) : "") +
        '. Bring your driving licence.</p><a class="btn ghost" href="#deliver">Change the date</a></div><div class="pvrow"><span class="muted small">Preview what happens next:</span><button type="button" class="lnkb" data-pp="rem">The reminder the day before</button><button type="button" class="lnkb" data-pp="ho">Handover day</button></div>';
      if (P.ho)
        h +=
          '<div class="hob" id="hob"><h3 style="margin:0 0 6px">Handover: check before you sign</h3><p class="muted">Take your time. If anything doesn’t match, don’t sign. Tell the driver and call us.</p>' +
          [
            ["h1", "The car matches the photos and the inspection report"],
            ["h2", "The mileage matches what was listed"],
            [
              "h3",
              "You have " +
                c.k +
                " key" +
                (c.k > 1 ? "s" : "") +
                ", the V5C new keeper slip and the service history",
            ],
            ["h4", "Any marks are the ones listed in the condition report"],
          ]
            .map(function (x) {
              return (
                '<label class="agree" id="' +
                x[0] +
                '-l"><input type="checkbox" id="' +
                x[0] +
                '"><span>' +
                x[1] +
                "</span></label>"
              );
            })
            .join("") +
          '<label>Sign by typing your full name<input id="hsig" value="' +
          esc(fullName()) +
          '"></label><p class="pxerr" id="hoerr"></p><div class="pxnav"><button type="button" class="btn" id="hogo">Confirm handover</button><a class="btn ghost" href="#help">Something isn’t right</a></div></div>';
    } else {
      var left = daysLeft(P.retBy);
      h +=
        '<div class="paybox paydone" style="margin:0 0 20px;max-width:640px"><h3 style="margin:0 0 6px">It’s yours. Enjoy your ' +
        c.mk +
        " " +
        c.md +
        '!</h3><p class="muted" style="margin:0">Handover completed on ' +
        P.hoDate +
        ".</p></div>" +
        (left > 0
          ? '<div class="nextb"><b>Changed your mind?</b><p>You have <b>' +
            left +
            " day" +
            (left === 1 ? "" : "s") +
            "</b> left (until " +
            P.retBy +
            ') to cancel and return the car. <span class="todo">[Return rules to be confirmed by your solicitor.]</span></p><button type="button" class="btn ghost" id="retgo">Return my car</button></div>'
          : "") +
        '<div class="nextb"><b>Something wrong with the car?</b><p>Tell us and we’ll put it right. Your legal rights apply, as well as any warranty.</p><button type="button" class="btn ghost" data-gh="buyer" data-t="fault">Report a problem</button></div>' +
        (P.rev
          ? '<p class="muted">Thanks for your review' +
            (P.rev.s ? " (" + P.rev.s + " out of 5)" : "") +
            ".</p>"
          : '<div class="nextb"><b>How was it?</b><p>Your review helps other buyers.</p><div class="stars5" role="group" aria-label="Your rating">' +
            [1, 2, 3, 4, 5]
              .map(function (n) {
                return (
                  '<button type="button" data-star="' +
                  n +
                  '" aria-pressed="' +
                  ((P.star || 0) >= n) +
                  '" aria-label="' +
                  n +
                  " star" +
                  (n > 1 ? "s" : "") +
                  '">★</button>'
                );
              })
              .join("") +
            '</div><label>Anything to add? (optional)<input id="revt"></label><p style="margin:10px 0 0"><button type="button" class="btn" id="revgo">Send review</button></p><p class="note small">Reviews are published as written, good or bad. <span class="todo">[Review policy to be confirmed.]</span></p></div>') +
        '<div class="nextb"><b>Selling your old car?</b><p>Check it against what we list in a minute. It’s free.</p><a class="btn ghost" href="#sell">Sell your car</a></div>';
    }
    h +=
      '</div><div style="margin-top:28px">' +
      dls([
        ["Payment", fin ? P.prod + ", " + P.term + " months" : "Paid in full"],
        ["Total", gbp(P.total)],
        [
          "Extras",
          [
            P.insp ? "Pre-Delivery Assurance Pack" : "",
            P.wt ? "Warranty, " + P.wt + " year" + (P.wt > 1 ? "s" : "") : "",
            P.dlv ? "Delivery" : "",
          ]
            .filter(Boolean)
            .join(", ") || "None",
        ],
        ["Part exchange", P.px || "None"],
        [
          "Need help?",
          '<a class="lnk" href="#help">Get help or make a complaint</a>',
        ],
      ]) +
      "</div>";
    if (P.stage < 2 && !P.ret)
      h +=
        '<p style="margin-top:18px"><button type="button" class="lnkb" id="pucx">Cancel this purchase</button></p>';
    return h;
  }
  function purDocs() {
    var P = myPur,
      L = [];
    if (P.res) L.push(["Reservation receipt", "Ready to view"]);
    if (P.stage >= 1)
      L.push(
        P.mode === "fin"
          ? ["Finance agreement", "Signed"]
          : ["Payment receipt", "Ready to view"],
      );
    else
      L.push([
        P.mode === "fin" ? "Finance agreement" : "Payment receipt",
        "After " + (P.mode === "fin" ? "approval" : "payment"),
      ]);
    L.push([
      "AA or RAC inspection report",
      P.stage >= 1 ? "Ready to view" : "After payment",
    ]);
    L.push([
      "Sale contract",
      P.stage >= 3 ? "Signed at handover" : "Signed at handover",
    ]);
    L.push([
      "Handover report",
      P.stage >= 3 ? "Ready to view" : "After handover",
    ]);
    if (P.wt)
      L.push([
        "Warranty certificate",
        P.stage >= 3 ? "Ready to view" : "After handover",
      ]);
    return vtab(
      "pur",
      carNm(P.i),
      plate(cars[P.i].reg),
      '<ul class="pts">' +
        L.map(function (d) {
          return (
            "<li><b>" +
            d[0] +
            '</b> <span class="muted">' +
            d[1] +
            "</span></li>"
          );
        }).join("") +
        '</ul><p class="note" style="margin-top:14px">In the live service each document opens as a PDF. <span class="todo">[Document storage to be set up.]</span></p>',
    );
  }

  function setView() {
    var el = $("set-body");
    if (!user) {
      after = "#settings";
      location.hash = "#profile";
      return;
    }
    function row(label, val, act) {
      return (
        '<div class="setr"><div><b>' +
        label +
        "</b><span>" +
        val +
        "</span></div>" +
        (act || "") +
        "</div>"
      );
    }
    function eb(k, t) {
      return (
        '<button type="button" class="btn ghost" data-ed="' +
        k +
        '">' +
        t +
        "</button>"
      );
    }
    el.innerHTML =
      '<a class="back" href="#profile">Back to your profile</a><h2>Account settings</h2><p class="lede">Your details, messages and data.</p>' +
      '<section class="sets"><h3>Your details</h3>' +
      row(
        "Full legal name",
        esc(fullName()) + (user.idv ? " · ✓ ID verified" : ""),
        eb("nm", "Change"),
      ) +
      row(
        "Email",
        esc(user.email) + (user.ev ? " · ✓ Verified" : ""),
        eb("em", "Change"),
      ) +
      row(
        "Mobile",
        esc(user.mob || "Not added") + (user.mv ? " · ✓ Verified" : ""),
        eb("mb", "Change"),
      ) +
      row("Password", "••••••••••", eb("pw", "Change")) +
      row(
        "Two-step sign-in",
        user.tsv === false ? "Off" : "On: we text you a code when you sign in",
        eb("ts", user.tsv === false ? "Turn on" : "Turn off"),
      ) +
      (user.roles.buyer
        ? row(
            "Delivery address",
            user.addr ? esc(user.addr) : "Not added",
            eb("ad", user.addr ? "Change" : "Add"),
          )
        : "") +
      (user.roles.seller
        ? row(
            "Payout account",
            user.bank
              ? esc(user.bank.name) + ", account ending " + user.bank.end
              : "Not added",
            '<a class="btn ghost" href="#profile" id="setbk">Manage</a>',
          )
        : "") +
      '</section><div id="seted"></div>' +
      '<section class="sets"><h3>Messages we send you</h3><p class="muted small">We always send the messages you need, like receipts, payment links and delivery updates.</p>' +
      [
        ["buy", "Updates about cars you’ve saved or asked about"],
        ["sell", "Tips to sell your car for more"],
        ["deal", "Hot deals and offers (marketing)"],
        ["txt", "Text messages as well as email"],
      ]
        .map(function (n) {
          return (
            '<label class="agree"><input type="checkbox" data-nt="' +
            n[0] +
            '"' +
            (notif[n[0]] ? " checked" : "") +
            "><span>" +
            n[1] +
            "</span></label>"
          );
        })
        .join("") +
      '<p class="muted small" id="ntok" aria-live="polite" style="margin:4px 0 0"></p></section>' +
      '<section class="sets"><h3>Your data</h3><p class="muted small">Download what we hold about you, or close your account. <a class="lnk" href="#legal">Privacy notice</a> <span class="todo">[Privacy notice to be written.]</span></p><div class="pxnav"><button type="button" class="btn ghost" id="dldata">Download my data</button><button type="button" class="btn ghost danger" id="closeacc">Close my account</button></div><p class="muted small" id="dlok" aria-live="polite"></p></section>';
    if ($("setbk"))
      $("setbk").onclick = function () {
        if (!user.roles.seller) return;
        user.role = "seller";
        ptab = "po";
        updProf();
      };
    el.querySelectorAll("[data-nt]").forEach(function (x) {
      x.onchange = function () {
        notif[x.dataset.nt] = x.checked;
        $("ntok").textContent = "Saved.";
      };
    });
    el.querySelectorAll("[data-ed]").forEach(function (b) {
      b.onclick = function () {
        edit(b.dataset.ed);
      };
    });
    $("dldata").onclick = function () {
      var data = {
        exported: new Date().toISOString(),
        account: {
          name: fullName(),
          email: user.email,
          mobile: user.mob,
          roles: Object.keys(user.roles),
          idVerified: user.idv || false,
          twoStep: user.tsv !== false,
          deliveryAddress: user.addr || null,
        },
        messagePreferences: notif,
        purchase: myPur
          ? { car: carNm(myPur.i), stage: myPur.stage, total: myPur.total }
          : null,
        listings: user.roles.seller
          ? SLIST.map(function (v) {
              return { car: vname(v), reg: v.reg, status: v.st };
            })
          : [],
        cases: complaints.map(function (c) {
          return { ref: c.ref, about: c.a, date: c.d };
        }),
      };
      mdl(
        '<h2 style="margin:0 0 6px">Your data</h2><p class="muted small">In the live service this downloads as a file. We also answer data requests by email within one month.</p><pre class="datapre">' +
          esc(JSON.stringify(data, null, 2)) +
          '</pre><button type="button" class="btn ghost" data-x>Close</button>',
      );
      $("dlok").textContent = "";
    };
    $("closeacc").onclick = function () {
      var act = [];
      if (myPur && myPur.stage < 3 && !myPur.ret)
        act.push("a purchase in progress");
      if (
        Object.keys(reserved).some(function (k) {
          return resvByMe(+k) && !reserved[k].sold;
        })
      )
        act.push("a car reserved");
      if (
        user.roles.seller &&
        SLIST.some(function (v) {
          return (
            ["live", "under", "waiting"].indexOf(v.st) >= 0 ||
            (v.st === "sold" && v.prog < 7)
          );
        })
      )
        act.push("cars listed, or a payout still to come");
      if (act.length) {
        mdl(
          '<h2 style="margin:0 0 6px">You can’t close your account yet</h2><p>You have ' +
            act.join(", and ") +
            ". Finish or cancel " +
            (act.length > 1 ? "these" : "this") +
            ' first, or contact us and we’ll help.</p><div class="pxnav"><a class="btn" href="#help">Contact us</a><button type="button" class="btn ghost" data-x>OK</button></div>',
        );
        return;
      }
      mdl(
        '<h2 style="margin:0 0 6px">Close your account?</h2><p>This deletes your profile, saved cars and messages. It can’t be undone. We keep some records, like receipts and contracts, for as long as the law requires.</p><label>Type CLOSE to confirm<input id="clx" autocomplete="off" style="text-transform:uppercase"></label><p class="pxerr" id="clerr"></p><div class="pxnav"><button type="button" class="btn" id="clok">Close my account</button><button type="button" class="btn ghost" data-x>Keep my account</button></div>',
        function (m) {
          m.querySelector("#clok").onclick = function () {
            if (
              m.querySelector("#clx").value.trim().toUpperCase() !== "CLOSE"
            ) {
              m.querySelector("#clx").classList.add("miss");
              m.querySelector("#clerr").textContent = "Type CLOSE to confirm.";
              return;
            }
            mdlX();
            user = null;
            myPur = null;
            saved = {};
            updProf();
            el.innerHTML =
              '<div class="paybox"><h2 style="margin:0 0 8px">Your account is closed</h2><p>We’ve deleted your profile. We’ll email you to confirm. We keep some records, like receipts and contracts, for as long as the law requires. <span class="todo">[Retention periods to be confirmed.]</span></p><a class="btn" href="#home">Back to the home page</a></div>';
          };
        },
      );
    };
    function edit(k) {
      var box = $("seted"),
        h = "";
      if (k === "nm")
        h =
          '<h3 style="margin:0 0 6px">Change your name</h3><p class="muted small">Your name must match your ID. Changing it means verifying your identity again before you can reserve, buy, sell or get paid.</p><div class="nmrow"><label>First name<input id="e1" value="' +
          esc(user.first) +
          '"></label><label>Middle name(s), optional<input id="e2" value="' +
          esc(user.middle || "") +
          '"></label><label>Last name<input id="e3" value="' +
          esc(user.last) +
          '"></label></div>';
      if (k === "em" || k === "mb")
        h =
          '<h3 style="margin:0 0 6px">Change your ' +
          (k === "em" ? "email" : "mobile number") +
          '</h3><p class="muted small">We’ll send a code to the new ' +
          (k === "em" ? "address" : "number") +
          " to check it’s yours, and let you know at the old one.</p><label>New " +
          (k === "em" ? "email" : "mobile number") +
          '<input id="e1" type="' +
          (k === "em" ? "email" : "tel") +
          '"></label><div id="ecode" hidden><label>Code we sent<input id="e2" class="code" inputmode="numeric" maxlength="6"></label></div>';
      if (k === "pw")
        h =
          '<h3 style="margin:0 0 6px">Change your password</h3><label>Current password<input id="e1" type="password"></label><label>New password<input id="e2" type="password"></label><label>Confirm new password<input id="e3" type="password"></label>';
      if (k === "ad")
        h =
          '<h3 style="margin:0 0 6px">Delivery address</h3><label>Address<input id="e1" value="' +
          esc(user.addr || "") +
          '" autocomplete="street-address"></label>';
      if (k === "ts") {
        if (user.tsv === false) {
          user.tsv = true;
          setView();
          return;
        }
        mdl(
          '<h2 style="margin:0 0 6px">Turn off two-step sign-in?</h2><p>Without it, anyone with your password could sign in. We recommend keeping it on, especially as your account handles payments.</p><div class="pxnav"><button type="button" class="btn ghost" id="tsoff">Turn it off</button><button type="button" class="btn" data-x>Keep it on</button></div>',
          function (m) {
            m.querySelector("#tsoff").onclick = function () {
              mdlX();
              user.tsv = false;
              setView();
            };
          },
        );
        return;
      }
      box.innerHTML =
        h +
        '<p style="margin:10px 0"><button type="button" class="btn ghost" id="efill" style="padding:8px 16px">Fill with example details (preview)</button></p><p class="pxerr" id="eerr"></p><div class="pxnav"><button type="button" class="btn" id="esave">' +
        (k === "em" || k === "mb"
          ? "Send code"
          : k === "nm"
            ? "Save and verify again"
            : "Save") +
        '</button><button type="button" class="btn ghost" id="ecan">Cancel</button></div>';
      box.scrollIntoView({ block: "nearest", behavior: "smooth" });
      $("ecan").onclick = function () {
        box.innerHTML = "";
      };
      $("efill").onclick = function () {
        if (k === "nm") {
          $("e1").value = user.first;
          $("e3").value = user.last + "-Reid";
        }
        if (k === "em") {
          $("e1").value = "kayden.j@example.com";
          if ($("e2")) $("e2").value = "482913";
        }
        if (k === "mb") {
          $("e1").value = "07700 900456";
          if ($("e2")) $("e2").value = "705186";
        }
        if (k === "pw") {
          $("e1").value = "Example-pass-24";
          $("e2").value = $("e3").value = "New-example-pass-1";
        }
        if (k === "ad") $("e1").value = "12 Park Lane, Leeds LS1 4AB";
      };
      $("esave").onclick = function () {
        var e = $("eerr");
        if (k === "nm") {
          var f = $("e1").value.trim(),
            l = $("e3").value.trim();
          if (!f || !l) {
            e.textContent = "Enter your first and last name.";
            return;
          }
          user.first = f;
          user.middle = $("e2").value.trim();
          user.last = l;
          user.name = f;
          user.idv = null;
          updProf();
          addMail(user.role, {
            s: "Your name was changed",
            b:
              "Your name is now " +
              esc(fullName()) +
              ". Please verify your identity again before your next payment.",
            go: "ov",
          });
          needId("#settings");
          return;
        }
        if (k === "em" || k === "mb") {
          var v = $("e1").value.trim(),
            ok =
              k === "em"
                ? /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)
                : v.replace(/\D/g, "").length >= 10;
          $("e1").classList.toggle("miss", !ok);
          if (!ok) {
            e.textContent =
              "Enter a valid " +
              (k === "em" ? "email address" : "mobile number") +
              ".";
            return;
          }
          if ($("ecode").hidden) {
            $("ecode").hidden = false;
            this.textContent = "Verify and save";
            e.textContent = "";
            $("e2").focus();
            return;
          }
          if ($("e2").value !== (k === "em" ? "482913" : "705186")) {
            $("e2").classList.add("miss");
            e.textContent = "That code isn’t right.";
            return;
          }
          if (k === "em") {
            user.email = v;
            user.ev = true;
          } else {
            user.mob = v;
            user.mv = true;
          }
          addMail(user.role, {
            s:
              "Your " +
              (k === "em" ? "email" : "mobile number") +
              " was changed",
            b:
              "If this wasn’t you, contact us straight away. We’ve also told you at your old " +
              (k === "em" ? "email" : "number") +
              ".",
            go: "ov",
          });
          setView();
          return;
        }
        if (k === "pw") {
          if ($("e1").value.length < 8) {
            e.textContent = "Enter your current password.";
            return;
          }
          if ($("e2").value.length < 8) {
            e.textContent = "Use at least 8 characters.";
            return;
          }
          if ($("e2").value !== $("e3").value) {
            e.textContent = "The new passwords don’t match.";
            return;
          }
          addMail(user.role, {
            s: "Your password was changed",
            b: "If this wasn’t you, contact us straight away.",
            go: "ov",
          });
          setView();
          $("ntok").textContent = "";
          return;
        }
        if (k === "ad") {
          var a = $("e1").value.trim();
          if (a.length < 8) {
            e.textContent = "Enter your full address.";
            return;
          }
          user.addr = a;
          setView();
        }
      };
    }
  }
  function helpView() {
    var el = $("help-body"),
      F = helpView.f || (helpView.f = {});
    var faq = [
      [
        "When do sellers get paid?",
        "Once the buyer’s payment has cleared and any finance on the car is settled. Follow each step in Offers and payout.",
      ],
      [
        "Can I cancel after buying?",
        "Yes. You have 14 days from handover to change your mind. Start it from My purchase.",
      ],
      [
        "What if something’s wrong with my car?",
        "Tell us below. Your legal rights apply as well as any warranty, and we’ll help put it right.",
      ],
      [
        "Is my £200 reservation refundable?",
        "Only if the deal can’t go ahead through no fault of yours, for example if your finance is declined.",
      ],
      [
        "How do I change my details?",
        "In Account settings, from your profile.",
      ],
    ];
    var h =
      '<a class="back" href="' +
      (user ? "#profile" : "#home") +
      '">Back</a><h2>Help and complaints</h2><p class="lede">Quick answers, or tell us about a problem and we’ll put it right.</p><p><button type="button" class="btn" data-gh="">Get help now</button> <span class="muted small" style="margin-left:8px">Call back, live chat or email</span></p><h3>Quick answers</h3>' +
      faq
        .map(function (q) {
          return (
            '<details class="vf"><summary>' +
            q[0] +
            '</summary><div><p style="margin:10px 0 4px">' +
            q[1] +
            "</p></div></details>"
          );
        })
        .join("") +
      '<h3 style="margin-top:34px">Raise a problem or complaint</h3>';
    if (!user)
      h +=
        '<p class="muted">Sign in so we can link this to your purchase or sale and keep you updated.</p><a class="btn" href="#profile" id="hsi">Sign in to continue</a>';
    else {
      var opts = [["", "Not about a specific car"]];
      if (myPur)
        opts.push([carNm(myPur.i), carNm(myPur.i) + " (your purchase)"]);
      if (user.roles.seller)
        SLIST.slice(0, 8).forEach(function (v) {
          opts.push([vname(v), vname(v) + " (your listing)"]);
        });
      h +=
        '<form class="signin" id="cpf" novalidate style="max-width:640px"><label>What’s it about?<select id="cpa"><option value="">Choose</option>' +
        [
          "My purchase",
          "Delivery or handover",
          "A fault with my car",
          "Finance",
          "Selling my car",
          "My payout",
          "Payments or refunds",
          "My account",
          "Something else",
        ]
          .map(function (o) {
            return (
              "<option" + (F.a === o ? " selected" : "") + ">" + o + "</option>"
            );
          })
          .join("") +
        '</select></label><label>Which car?<select id="hcc">' +
        opts
          .map(function (o) {
            return (
              '<option value="' +
              esc(o[0]) +
              '"' +
              (F.c === o[0] ? " selected" : "") +
              ">" +
              o[1] +
              "</option>"
            );
          })
          .join("") +
        '</select></label><label>What happened?<textarea id="cpw" rows="4">' +
        esc(F.w || "") +
        '</textarea></label><label>What would put it right?<textarea id="cpr" rows="2">' +
        esc(F.r || "") +
        '</textarea></label><label class="agree"><input type="checkbox" id="cpx"' +
        (F.x ? " checked" : "") +
        '><span>Treat this as a formal complaint</span></label><div><button type="button" class="btn ghost" id="cpfill" style="padding:8px 16px">Fill with example details (preview)</button></div><p class="pxerr" id="cperr" aria-live="polite"></p><div><button class="btn" type="submit">Send</button></div></form>';
    }
    if (complaints.length)
      h +=
        '<h3 style="margin-top:34px">Your cases</h3>' +
        complaints
          .map(function (c, n) {
            if (c.kind === "contact") return ghCase(c, n);
            return (
              '<div class="case"><div class="row"><b>' +
              c.ref +
              '</b><span class="muted small">' +
              c.d +
              '</span></div><p style="margin:4px 0 10px">' +
              esc(c.a) +
              (c.car ? " · " + esc(c.car) : "") +
              (c.formal ? " · Formal complaint" : "") +
              '</p><ol class="tracker st">' +
              ["Received", "Acknowledged", "Final response"]
                .map(function (t, j) {
                  return (
                    '<li class="' +
                    (j <= c.st ? "done" : j === c.st + 1 ? "now" : "") +
                    '">' +
                    t +
                    "</li>"
                  );
                })
                .join("") +
              "</ol>" +
              (c.st < 2
                ? '<div class="pvrow"><span class="muted small">Preview:</span><button type="button" class="lnkb" data-cs="' +
                  n +
                  '">' +
                  (c.st === 0
                    ? "We acknowledge it"
                    : "Our final response arrives") +
                  "</button></div>"
                : '<p class="small" style="margin:16px 0 6px">Our final response is in your mail. Not happy with it? You can refer it to ' +
                  (c.a === "Finance"
                    ? "the Financial Ombudsman Service"
                    : "an independent ombudsman") +
                  ', free. <span class="todo">[Ombudsman details and links to be confirmed.]</span></p><button type="button" class="lnkb" data-cesc="' +
                  n +
                  '">' +
                  (c.esc
                    ? "Referral details sent to your email"
                    : "How to refer it to the ombudsman") +
                  "</button>") +
              "</div>"
            );
          })
          .join("");
    h +=
      '<h3 style="margin-top:34px">How we handle complaints</h3><ol class="tracker st"><li>We acknowledge it within 3 working days</li><li>We investigate and keep you updated</li><li>We send our final response within 8 weeks</li><li>Not happy? You can go to an ombudsman, free</li></ol><p class="note small" style="margin-top:22px">For finance, you can refer your complaint to the <b>Financial Ombudsman Service</b> within 6 months of our final response, or if we haven’t replied within 8 weeks. <span class="todo">[Our complaints procedure, timescales and which ombudsman or dispute scheme covers car sales to be confirmed.]</span></p>';
    el.innerHTML = h;
    if ($("hsi"))
      $("hsi").onclick = function () {
        after = "#help";
      };
    if ($("cpf")) {
      function keep() {
        F.a = $("cpa").value;
        F.c = $("hcc").value;
        F.w = $("cpw").value;
        F.r = $("cpr").value;
        F.x = $("cpx").checked;
      }
      ["cpa", "cpw"].forEach(function (k) {
        $(k).oninput = $(k).onchange = function () {
          this.classList.remove("miss");
        };
      });
      $("cpfill").onclick = function () {
        keep();
        F.a = "A fault with my car";
        F.c = myPur ? carNm(myPur.i) : "";
        F.w =
          "The engine warning light came on two days after delivery, and the car is losing power on the motorway.";
        F.r = "Please arrange a repair under the warranty, or collect the car.";
        F.x = true;
        helpView();
      };
      $("cpf").onsubmit = function (e) {
        e.preventDefault();
        keep();
        var bad = 0;
        if (!F.a) {
          $("cpa").classList.add("miss");
          bad++;
        }
        if ((F.w || "").trim().length < 10) {
          $("cpw").classList.add("miss");
          bad++;
        }
        if (bad) {
          $("cperr").textContent = "Tell us what it’s about and what happened.";
          return;
        }
        var c = {
          ref: SITE.refPrefix + "-" + (10000 + Math.floor(Math.random() * 89999)),
          a: F.a,
          car: F.c,
          w: F.w,
          r: F.r,
          formal: F.x,
          d: new Date().toLocaleDateString("en-GB"),
          st: 0,
        };
        complaints.unshift(c);
        helpView.f = {};
        addMail(user.role, {
          s:
            "We’ve received your " +
            (c.formal ? "complaint" : "message") +
            ": " +
            c.ref,
          b:
            "Thanks for telling us. Your reference is " +
            c.ref +
            ". We’ll reply within 3 working days, and send our final response within 8 weeks at the latest.",
          href: "#help",
          hl: "See your case",
        });
        updProf();
        helpView();
        setTimeout(function () {
          var x = el.querySelector(".case");
          if (x) x.scrollIntoView({ block: "center", behavior: "smooth" });
        }, 40);
      };
    }
    el.querySelectorAll("[data-cs]").forEach(function (b) {
      b.onclick = function () {
        var c = complaints[+b.dataset.cs];
        c.st++;
        addMail(user.role, {
          s:
            (c.st === 1 ? "We’re looking into it: " : "Our final response: ") +
            c.ref,
          b:
            c.st === 1
              ? "We’ve acknowledged your case and a named member of our team is looking into it."
              : "We’ve finished looking into your case. Our final response explains what we found and what we’ll do. If you’re not happy with it, you can refer it to an ombudsman, free.",
          href: "#help",
          hl: "See your case",
        });
        updProf();
        helpView();
      };
    });
    el.querySelectorAll("[data-cesc]").forEach(function (b) {
      b.onclick = function () {
        complaints[+b.dataset.cesc].esc = true;
        helpView();
      };
    });
  }

  var GH = {
    buyer: [
      [
        "nad",
        "The car isn’t as described",
        "It doesn’t match the advert or the inspection report",
        1,
        "If the car doesn’t match its advert or its AA or RAC report at handover, you don’t have to accept it. You get your money back in full, including your £200 reservation.",
      ],
      [
        "fault",
        "A fault since I bought it",
        "Warning lights, noises, something not working",
        1,
        "Your legal rights apply, as well as any warranty. Tell us what’s happening and we’ll arrange an inspection or repair. Please don’t get it repaired before talking to us, or the warranty may not pay.",
      ],
      [
        "pay",
        "A payment or refund",
        "",
        0,
        "Your money is held safely until handover. Refunds go back to the card or account you paid with, within 5 working days of being approved.",
      ],
      [
        "del",
        "Delivery or collection",
        "",
        0,
        "Your booking and live tracking are in My purchase. You can rebook up to 24 hours before.",
      ],
      [
        "fin",
        "My finance",
        "",
        0,
        "Most finance decisions come back within an hour, and the status is in My purchase. If your finance is declined, your £200 reservation is refunded.",
      ],
      [
        "res",
        "My reservation",
        "",
        0,
        "A reservation holds the car for 7 days, and we email you 48 hours before it runs out. You can cancel it from the car’s page.",
      ],
      [
        "oth",
        "Something else",
        "",
        0,
        "Tell us what you need and the right person will pick it up.",
      ],
    ],
    seller: [
      [
        "off",
        "My offer",
        "",
        0,
        "Your offer letter shows what you receive and what buyers see. You can accept it, reject it with a counter price, or ask us to look again.",
      ],
      [
        "pay",
        "My payout",
        "",
        0,
        "We pay you once the buyer’s payment has cleared and any finance on the car is settled. Each step shows in Offers and payout.",
      ],
      [
        "insp",
        "The AA or RAC inspection",
        "",
        0,
        "The inspector comes to you after a buyer pays a deposit, and it takes about an hour. If they find something that wasn’t declared, we’ll talk you through the options before anything changes.",
      ],
      [
        "rr",
        "Retail Ready",
        "",
        0,
        "A local partner does the prep, and you can follow it in My listings. We always ask before any extra work.",
      ],
      [
        "wd",
        "Withdrawing my car",
        "",
        0,
        "You can withdraw your car from My listings. If you’ve signed an offer, check the withdrawal terms first.",
      ],
      [
        "oth",
        "Something else",
        "",
        0,
        "Tell us what you need and the right person will pick it up.",
      ],
    ],
    guest: [
      [
        "buyq",
        "Buying a car",
        "",
        0,
        "Every car has a history check, and an AA or RAC inspection after your deposit. Your money is held safely until handover, and you have 14 days to return the car.",
      ],
      [
        "sellq",
        "Selling my car",
        "",
        0,
        "List your car in a few minutes and we’ll send you an offer. The car stays with you until it sells.",
      ],
      [
        "acct",
        "Signing in or my account",
        "",
        0,
        "Choose “Forgot your details?” on the sign-in page and we’ll text you a code.",
      ],
      [
        "oth",
        "Something else",
        "",
        0,
        "Tell us what you need and we’ll get back to you.",
      ],
    ],
  };
  var ghS = null,
    ghChat = [];
  function ghRole() {
    return user ? (user.role === "seller" ? "seller" : "buyer") : "guest";
  }
  function ghCars() {
    var o = [];
    if (!user) return o;
    if (user.role === "buyer" && myPur)
      o.push({ k: "p", n: carNm(myPur.i), st: "Your purchase" });
    if (user.role === "seller")
      SLIST.slice(0, 8).forEach(function (v) {
        o.push({ k: "v" + v.id, n: vname(v), v: v });
      });
    return o;
  }
  function ghStatus() {
    var c =
      ghCars().filter(function (x) {
        return x.k === ghS.car;
      })[0] || ghCars()[0];
    if (!c) return "";
    if (c.k === "p") {
      var P = myPur,
        fin = P.mode === "fin",
        S = [
          fin ? "Finance approved and signed" : "Paid",
          "AA or RAC inspection",
          "Collection or delivery booked",
          "Handover",
          "Yours to keep",
        ],
        k = [0, 1, 3, 4][P.stage] || 0;
      return (
        "<b>" +
        esc(c.n) +
        "</b>: " +
        (k >= 4 ? "yours to keep" : "next step, " + S[k].toLowerCase()) +
        "."
      );
    }
    var v = c.v,
      p = typeof v.prog === "number" ? v.prog : 0;
    if (v.st !== "sold")
      return (
        "<b>" +
        esc(c.n) +
        "</b>: " +
        (STL[v.st] || "listed").replace(/^(\w)/, function (x) {
          return x.toLowerCase();
        }) +
        "."
      );
    return (
      "<b>" +
      esc(c.n) +
      "</b>: " +
      (p >= STG.length
        ? "paid to you"
        : "next step, " + STG[p].charAt(0).toLowerCase() + STG[p].slice(1)) +
      "."
    );
  }
  function ghOpen(o) {
    o = o || {};
    var r = o.role || ghRole();
    if (r !== ghRole()) r = ghRole();
    ghS = {
      r: r,
      t: null,
      s: 0,
      car: o.v ? "v" + o.v : r === "buyer" && myPur ? "p" : "",
      w: "",
      how: "cb",
      slot: "Within the hour",
      formal: true,
      gn: "",
      gc: "",
    };
    if (!ghS.car) {
      var cs = ghCars();
      if (cs.length) ghS.car = cs[0].k;
    }
    if (o.t) {
      ghS.t =
        GH[r].filter(function (x) {
          return x[0] === o.t;
        })[0] || null;
      if (ghS.t) ghS.s = ghS.t[3] ? 2 : 1;
    }
    ghRender();
  }
  function ghHead() {
    var n = 4;
    return (
      '<div class="gh-steps" aria-hidden="true">' +
      [0, 1, 2, 3]
        .map(function (i) {
          return '<i class="' + (i <= ghS.s ? "on" : "") + '"></i>';
        })
        .join("") +
      "</div>"
    );
  }
  function ghRender() {
    var S = ghS,
      h = ghHead(),
      T = S.t;
    if (S.s === 0) {
      h +=
        '<h2 style="margin:0 0 6px">How can we help?</h2><p class="gh-who">' +
        (user
          ? "Signed in as " +
            esc(user.first || "you") +
            ", " +
            (S.r === "seller" ? "selling" : "buying") +
            ". We’ll show options for that."
          : 'You’re not signed in. <a href="#profile" data-x id="ghsi">Sign in</a> so we can see your deals.') +
        '</p><div class="gh-opts">' +
        GH[S.r]
          .map(function (t, i) {
            return (
              '<button type="button" class="gh-opt" data-ght="' +
              i +
              '">' +
              t[1] +
              (t[2] ? "<small>" + t[2] + "</small>" : "") +
              "</button>"
            );
          })
          .join("") +
        "</div>";
    } else if (S.s === 1) {
      var st = user ? ghStatus() : "";
      h +=
        '<button type="button" class="lnkb" data-ghb="0">Back</button><h2 style="margin:8px 0 4px">' +
        T[1] +
        '</h2><div class="gh-ans"><p>' +
        T[4] +
        "</p>" +
        (st && T[0] !== "oth" ? '<p class="gh-st">' + st + "</p>" : "") +
        "</div>" +
        '<div class="gh-nav"><button type="button" class="btn" id="ghmore">I still need help</button><button type="button" class="btn ghost" id="ghok">That answers it, thanks</button></div>';
    } else if (S.s === 2) {
      var esc1 = !!T[3],
        cs = ghCars(),
        cur = cs.filter(function (x) {
          return x.k === S.car;
        })[0];
      h +=
        '<button type="button" class="lnkb" data-ghb="' +
        (esc1 ? 0 : 1) +
        '">Back</button><h2 style="margin:8px 0 4px">' +
        (esc1 ? "Tell us what’s wrong" : "Talk to our team") +
        "</h2>" +
        (esc1
          ? '<p class="muted small" style="margin:0 0 6px">This goes straight to our complaints team, who can arrange an inspection, a repair or a refund.</p>'
          : "") +
        '<form class="signin" id="ghf" novalidate style="margin:10px 0 0">' +
        (cs.length
          ? '<label>Which car?<select id="ghc">' +
            cs
              .map(function (c) {
                return (
                  '<option value="' +
                  c.k +
                  '"' +
                  (c.k === S.car ? " selected" : "") +
                  ">" +
                  esc(c.n) +
                  (c.st ? " (" + c.st.toLowerCase() + ")" : "") +
                  "</option>"
                );
              })
              .join("") +
            '<option value=""' +
            (S.car === "" ? " selected" : "") +
            ">Not about a specific car</option></select></label>"
          : "") +
        (user
          ? ""
          : '<label>Your name<input id="ghn" autocomplete="name" value="' +
            esc(S.gn) +
            '"></label><label>Mobile or email<input id="ghe" autocomplete="email" value="' +
            esc(S.gc) +
            '"></label>') +
        "<label>" +
        (esc1 ? "What’s happening?" : "Tell us a bit more (optional)") +
        '<textarea id="ghw" rows="3">' +
        esc(S.w) +
        "</textarea></label>" +
        (esc1
          ? '<label>Photos or a video (optional)<input type="file" id="ghp" accept="image/*,video/*" multiple></label>'
          : "") +
        (user && S.car
          ? '<p class="small" style="margin:6px 0 2px">We’ll attach these, so you won’t need to explain twice:</p><div class="gh-att">' +
            ["Car and deal details"]
              .concat(
                esc1 && S.r === "buyer"
                  ? [
                      "AA or RAC report",
                      "Warranty details",
                      "Handover checklist",
                    ]
                  : S.r === "seller"
                    ? ["Offer letter", "Payout progress"]
                    : ["Payment record"],
              )
              .map(function (a) {
                return "<span>✓ " + a + "</span>";
              })
              .join("") +
            "</div>"
          : "") +
        '<p class="small" style="margin:14px 0 4px"><b>How should we get back to you?</b></p><div class="gh-opts" style="margin-top:6px">' +
        [
          [
            "cb",
            "Call me back",
            user && user.mob
              ? "We’ll call " + esc(user.mob)
              : "We’ll call your mobile",
          ],
          ["chat", "Live chat now", "Usually answered in under 2 minutes"],
          ["em", "Email me", "Within 24 hours"],
        ]
          .map(function (m) {
            return (
              '<button type="button" class="gh-opt' +
              (S.how === m[0] ? " sel" : "") +
              '" data-ghh="' +
              m[0] +
              '" aria-pressed="' +
              (S.how === m[0]) +
              '">' +
              m[1] +
              "<small>" +
              m[2] +
              "</small></button>"
            );
          })
          .join("") +
        "</div>" +
        (S.how === "cb"
          ? '<label>When suits you?<select id="ghs">' +
            [
              "Within the hour",
              "This afternoon, 2pm to 5pm",
              "This evening, 5pm to 8pm",
              "Tomorrow morning, 9am to 12pm",
            ]
              .map(function (x) {
                return (
                  "<option" +
                  (S.slot === x ? " selected" : "") +
                  ">" +
                  x +
                  "</option>"
                );
              })
              .join("") +
            "</select></label>"
          : "") +
        (esc1 && user
          ? '<label class="agree"><input type="checkbox" id="ghx"' +
            (S.formal ? " checked" : "") +
            "><span>Treat this as a formal complaint</span></label>"
          : "") +
        '<div><button type="button" class="btn ghost" id="ghfill" style="padding:8px 16px;width:auto">Fill with example details (preview)</button></div><p class="pxerr" id="gherr" aria-live="polite"></p><div class="gh-nav"><button class="btn" type="submit" style="width:auto">' +
        (S.how === "chat" ? "Start chat" : "Send") +
        "</button></div></form>" +
        '<p class="note small" style="margin-top:14px"><span class="todo">[Opening hours, call-back times, live chat provider and response times to be confirmed.]</span></p>';
    } else if (S.s === 3) {
      var c = S.case;
      h +=
        '<div style="text-align:center"><div class="tick" aria-hidden="true" style="margin:4px auto 8px"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M15 27l7 7 15-16"/></svg></div><h2 style="margin:6px 0 6px">' +
        (c.formal ? "Complaint received" : "We’ve got it") +
        '</h2><p style="margin:0 0 4px">Your case number is <b>' +
        c.ref +
        '</b>.</p><p class="muted" style="margin:0 0 16px">' +
        c.promise +
        "</p>" +
        (user
          ? '<div class="gh-nav" style="justify-content:center"><a class="btn" href="#help" data-x>Track it in Help</a><button type="button" class="btn ghost" data-x>Close</button></div>'
          : '<p class="small">We’ve sent the case number to ' +
            esc(S.gc || "you") +
            " by " +
            (/@/.test(S.gc) ? "email" : "text") +
            '.</p><button type="button" class="btn ghost" data-x>Close</button>') +
        "</div>";
    } else if (S.s === 4) {
      h +=
        '<h2 style="margin:0 0 2px">Live chat</h2><p class="muted small" style="margin:0">Case ' +
        S.case.ref +
        (S.case.car ? " · " + esc(S.case.car) : "") +
        '</p><div class="gh-chat" id="ghcl" aria-live="polite">' +
        ghChat
          .map(function (m) {
            return '<div class="gh-b ' + m[0] + '">' + esc(m[1]) + "</div>";
          })
          .join("") +
        '</div><form id="ghcf" class="gh-row"><input id="ghci" placeholder="Type a message" aria-label="Message"><button class="btn" type="submit" style="width:auto;margin:0">Send</button></form><p class="note small" style="margin-top:12px">This chat is saved to your case. <span class="todo">[Live chat provider to be confirmed.]</span></p>';
    }
    var m = mdl(h, null);
    ghWire(m);
  }
  function ghKeep() {
    if ($("ghc")) ghS.car = $("ghc").value;
    if ($("ghw")) ghS.w = $("ghw").value;
    if ($("ghs")) ghS.slot = $("ghs").value;
    if ($("ghx")) ghS.formal = $("ghx").checked;
    if ($("ghn")) ghS.gn = $("ghn").value;
    if ($("ghe")) ghS.gc = $("ghe").value;
  }
  function ghWire(m) {
    var S = ghS;
    m.querySelectorAll("[data-ght]").forEach(function (b) {
      b.onclick = function () {
        S.t = GH[S.r][+b.dataset.ght];
        S.s = 1;
        ghRender();
      };
    });
    m.querySelectorAll("[data-ghb]").forEach(function (b) {
      b.onclick = function () {
        ghKeep();
        S.s = +b.dataset.ghb;
        ghRender();
      };
    });
    if ($("ghsi"))
      $("ghsi").onclick = function () {
        after = location.hash || "#home";
      };
    if ($("ghok"))
      $("ghok").onclick = function () {
        mdlX();
      };
    if ($("ghmore"))
      $("ghmore").onclick = function () {
        S.s = 2;
        ghRender();
      };
    m.querySelectorAll("[data-ghh]").forEach(function (b) {
      b.onclick = function () {
        ghKeep();
        S.how = b.dataset.ghh;
        ghRender();
        var f = $("ghs") || $("ghw");
        if (f) f.focus();
      };
    });
    if ($("ghc"))
      $("ghc").onchange = function () {
        ghKeep();
        ghRender();
      };
    if ($("ghfill"))
      $("ghfill").onclick = function () {
        ghKeep();
        var e = !!S.t[3];
        S.w = e
          ? "The engine warning light came on two days after delivery, and it’s losing power on the motorway."
          : S.r === "seller"
            ? "I accepted the offer last week. When will the inspector be in touch?"
            : "Can you tell me when my refund will reach my account?";
        if (!user) {
          S.gn = "Sam Taylor";
          S.gc = S.how === "em" ? "sam.taylor@example.com" : "07700 900123";
        }
        ghRender();
      };
    if ($("ghf"))
      $("ghf").onsubmit = function (e) {
        e.preventDefault();
        ghKeep();
        var bad = "";
        if (S.t[3] && S.w.trim().length < 10)
          bad = "Tell us what’s happening, so the right person picks it up.";
        if (!user && (!S.gn.trim() || S.gc.trim().length < 6))
          bad = "Add your name, and a mobile number or email we can reply to.";
        else if (!user && S.how === "cb" && /@/.test(S.gc))
          bad = "Add a mobile number so we can call you back.";
        else if (!user && S.how === "em" && !/@/.test(S.gc))
          bad = "Add an email address so we can reply.";
        if (bad) {
          $("gherr").textContent = bad;
          return;
        }
        var cs = ghCars().filter(function (x) {
            return x.k === S.car;
          })[0],
          ref = SITE.refPrefix + "-" + (10000 + Math.floor(Math.random() * 89999)),
          formal = !!(S.t[3] && S.formal && user);
        var promise = formal
          ? "We’ll acknowledge it within 3 working days and send our final response within 8 weeks at the latest. "
          : "";
        promise +=
          S.how === "cb"
            ? "We’ll call you " +
              (S.slot === "Within the hour"
                ? "within the hour"
                : S.slot.replace(/^(\w)/, function (x) {
                    return x.toLowerCase();
                  })) +
              "."
            : S.how === "em"
              ? "We’ll reply by email within 24 hours."
              : "";
        var c = {
          ref: ref,
          a: S.t[1],
          car: cs ? cs.n : "",
          w: S.w,
          r: "",
          formal: formal,
          d: new Date().toLocaleDateString("en-GB"),
          st: 0,
          kind: formal ? undefined : "contact",
          how: S.how,
          promise: promise,
        };
        S.case = c;
        if (user) {
          complaints.unshift(c);
          addMail(user.role, {
            s:
              (formal
                ? "We’ve received your complaint: "
                : "We’ve got your message: ") + ref,
            b:
              "Thanks for getting in touch about “" +
              S.t[1].toLowerCase() +
              "”" +
              (c.car ? " (" + c.car + ")" : "") +
              ". " +
              (promise || "Your chat with our team is saved to this case.") +
              " You can follow it in Help and complaints.",
            href: "#help",
            hl: "See your case",
          });
          updProf();
        }
        if (S.how === "chat") {
          var nm = user ? user.first || "" : S.gn.split(" ")[0];
          ghChat = [
            ["me", S.w.trim() || S.t[1]],
            ["them typ", "Amira is typing…"],
          ];
          S.s = 4;
          ghRender();
          setTimeout(function () {
            if (!ghS || ghS.s !== 4) return;
            ghChat[1] = [
              "them",
              "Hi" +
                (nm ? " " + nm : "") +
                ", I’m Amira from " + SITE.name + "." +
                (c.car
                  ? " I can see your " + c.car + " and everything on your case."
                  : "") +
                " " +
                (S.t[3]
                  ? "I’m sorry about this. Let’s get it sorted. Is the car safe to drive right now?"
                  : "Give me a moment to check that for you."),
            ];
            if (document.getElementById("ghcl")) ghRender();
          }, 1400);
        } else {
          S.s = 3;
          ghRender();
        }
        if (location.hash === "#help") helpView();
      };
    if ($("ghcf")) {
      var cl = $("ghcl");
      cl.scrollTop = cl.scrollHeight;
      $("ghci").focus();
      $("ghcf").onsubmit = function (e) {
        e.preventDefault();
        var t = $("ghci").value.trim();
        if (!t) return;
        ghChat.push(["me", t]);
        ghRender();
        setTimeout(function () {
          if (!ghS || ghS.s !== 4) return;
          ghChat.push([
            "them",
            "Thanks, I’ve added that to your case. I’m checking now and will update you here, or by text if you leave the chat.",
          ]);
          if (document.getElementById("ghcl")) ghRender();
        }, 1200);
      };
    }
  }
  function ghCase(c, n) {
    return (
      '<div class="case"><div class="row"><b>' +
      c.ref +
      '</b><span class="muted small">' +
      c.d +
      '</span></div><p style="margin:4px 0 10px">' +
      esc(c.a) +
      (c.car ? " · " + esc(c.car) : "") +
      " · " +
      ({ cb: "Call back", chat: "Live chat", em: "Email" }[c.how] ||
        "Message") +
      '</p><ol class="tracker st">' +
      ["Received", "With our team", "Sorted"]
        .map(function (t, j) {
          return (
            '<li class="' +
            (j <= c.st ? "done" : j === c.st + 1 ? "now" : "") +
            '">' +
            t +
            "</li>"
          );
        })
        .join("") +
      "</ol>" +
      (c.st < 2
        ? '<div class="pvrow"><span class="muted small">Preview:</span><button type="button" class="lnkb" data-gcs="' +
          n +
          '">' +
          (c.st === 0 ? "Our team picks it up" : "We sort it") +
          "</button></div>"
        : '<p class="small" style="margin:16px 0 6px">Marked as sorted. Still not right?</p><button type="button" class="lnkb" data-gcf="' +
          n +
          '">Raise it as a formal complaint</button>') +
      "</div>"
    );
  }
  document.addEventListener("click", function (e) {
    var b =
      e.target.closest && e.target.closest("[data-gh],[data-gcs],[data-gcf]");
    if (!b) return;
    if (b.hasAttribute("data-gh")) {
      e.preventDefault();
      ghOpen({ role: b.dataset.gh, v: b.dataset.v, t: b.dataset.t });
      return;
    }
    if (b.hasAttribute("data-gcs")) {
      var c = complaints[+b.dataset.gcs];
      c.st++;
      addMail(user.role, {
        s: (c.st === 1 ? "Our team has your case: " : "Sorted: ") + c.ref,
        b:
          c.st === 1
            ? "A named member of our team has picked up your case and will be in touch as promised."
            : "We’ve marked your case as sorted. If it’s not, reply or raise it as a formal complaint from Help.",
        href: "#help",
        hl: "See your case",
      });
      updProf();
      helpView();
      return;
    }
    if (b.hasAttribute("data-gcf")) {
      var d = complaints[+b.dataset.gcf];
      d.kind = undefined;
      d.formal = true;
      d.st = 0;
      addMail(user.role, {
        s: "We’ve received your complaint: " + d.ref,
        b: "We’ve reopened your case as a formal complaint. We’ll acknowledge it within 3 working days and send our final response within 8 weeks at the latest.",
        href: "#help",
        hl: "See your case",
      });
      updProf();
      helpView();
    }
  });
  function refView() {
    var el = $("ref-body");
    if (!user) {
      after = "#refer";
      location.hash = "#profile";
      return;
    }
    var code = refCode(),
      link = "unionmotortrade.co.uk/r/" + code;
    el.innerHTML =
      '<a class="back" href="#profile">Back to your profile</a><h2>Refer a friend</h2><p class="lede">Give a friend your code. When they buy or sell a car with us, you get £50.</p>' +
      '<div class="refc"><span class="muted small">Your code</span><b id="rfc">' +
      code +
      '</b><button type="button" class="btn ghost" id="rfcp" style="padding:7px 16px">Copy code</button><button type="button" class="btn ghost" id="rflk" style="padding:7px 16px">Copy link</button></div><p class="muted small">Your link: ' +
      link +
      ' <span class="todo">[Domain to be confirmed.]</span></p>' +
      '<h3 style="margin-top:30px">How it works</h3><ol class="tracker st"><li>Share your code or link</li><li>Your friend buys or sells a car with us</li><li>Once their 14 days to cancel are up, you get £50</li></ol>' +
      '<h3 style="margin-top:30px">Your referrals</h3>' +
      (refs.length
        ? '<ul class="pts">' +
          refs
            .map(function (r) {
              return (
                "<li><b>" +
                r.n +
                "</b> " +
                r.w +
                '. <span class="muted">' +
                r.st +
                "</span></li>"
              );
            })
            .join("") +
          "</ul>"
        : '<p class="muted">No referrals yet.</p>') +
      '<div class="pvrow"><span class="muted small">Preview:</span><button type="button" class="lnkb" id="rfsim">A friend uses your code</button></div>' +
      '<p class="note small" style="margin-top:24px">We never ask you for your friend’s details, and we only contact them if they sign up. Your friend must be 18 or over and new to us. <span class="todo">[Referral terms: who qualifies, when and how the £50 is paid, any limits, and tax, to be confirmed.]</span></p>';
    function cp(t, b) {
      var done = function () {
        b.textContent = "Copied";
      };
      try {
        navigator.clipboard.writeText(t).then(done, done);
      } catch (x) {
        done();
      }
    }
    $("rfcp").onclick = function () {
      cp(code, this);
    };
    $("rflk").onclick = function () {
      cp("https://" + link, this);
    };
    $("rfsim").onclick = function () {
      refs.unshift({
        n: "Jordan S.",
        w: "bought a car with your code",
        st: "£50 pending until their 14 days to cancel are up",
      });
      addMail(user.role, {
        s: "Your friend used your code",
        b: "Jordan S. bought a car with your code. Your £50 is pending until their 14 days to cancel are up.",
        href: "#refer",
        hl: "See your referrals",
      });
      updProf();
      refView();
    };
  }
  function needId(back) {
    if (user && !user.idv) {
      after = back;
      location.hash = "#verify";
      return true;
    }
    return false;
  }
  function verHtml() {
    if (!user) return "";
    var c = function (ok, t) {
      return (
        '<span class="vchip' +
        (ok ? " ok" : "") +
        '">' +
        (ok ? "✓ " : "") +
        t +
        "</span>"
      );
    };
    return (
      '<div class="vchips">' +
      c(user.ev, "Email verified") +
      c(user.mv, "Mobile verified") +
      (user.idv
        ? c(true, "ID verified")
        : '<button type="button" class="vchip todo-chip" id="idgo">Verify your identity</button>') +
      (user.role === "seller"
        ? c(
            user.bank,
            user.bank ? "Payout account checked" : "Payout account not added",
          )
        : "") +
      "</div>"
    );
  }
  function idView() {
    var el = $("id-body");
    if (!user) {
      after = "#verify";
      location.hash = "#profile";
      return;
    }
    if (user.idv) {
      el.innerHTML =
        '<h2>You’re verified</h2><p class="muted">Your identity was checked on ' +
        user.idv +
        '.</p><p><a class="btn" href="' +
        (after || "#profile") +
        '">Continue</a></p>';
      return;
    }
    var S = { step: 0, doc: null, dp: null, sp: null },
      back = after || "#profile";
    function done() {
      user.idv = new Date().toLocaleDateString("en-GB");
      after = null;
      el.innerHTML =
        '<div class="paybox paydone"><div class="tick" aria-hidden="true"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M15 27l7 7 15-16"/></svg></div><h2 style="margin:14px 0 8px">You’re verified</h2><p style="margin:0 0 6px">Verified as <b>' +
        esc(fullName()) +
        '</b>.</p><p class="muted" style="margin:0 0 18px">You only need to do this once. We keep the result, not copies of your documents.</p><a class="btn" href="' +
        back +
        '">Continue</a></div>';
    }
    function checking() {
      el.innerHTML =
        '<div class="paybox payload" role="status" aria-live="polite"><div class="spin" aria-hidden="true"></div><h2 style="margin:18px 0 6px">Checking your identity</h2><p class="muted" style="margin:0">This usually takes under a minute.</p><ol class="psteps"><li id="is1">Checking your ' +
        S.doc.toLowerCase() +
        ' is genuine</li><li id="is2">Matching your selfie to your photo</li><li id="is3">Confirming your name matches your account</li></ol></div>';
      var k = 0,
        t = setInterval(function () {
          k++;
          var li = $("is" + k);
          if (li) li.className = "ok";
          if (k >= 3) {
            clearInterval(t);
            setTimeout(S.fail ? failed : done, 450);
          }
        }, 700);
    }
    function failed() {
      S.tries = (S.tries || 0) + 1;
      el.innerHTML =
        '<div class="paybox"><h2 style="margin:0 0 8px">We couldn’t verify your identity</h2><p>This usually happens when:</p><ul class="pts"><li>the photo was blurry or had glare</li><li>part of the document was cut off</li><li>the document has expired</li><li>the name doesn’t match the one on your account</li></ul><p class="muted">You can still browse and save cars. You’ll need to be verified to reserve, buy, sell or get paid.</p><div class="pxnav"><button type="button" class="btn" id="idretry">Try again</button><a class="btn ghost" href="#help">Talk to us</a></div><p class="note small">After 3 failed attempts we check your documents by hand, usually within one working day. <span class="todo">[Manual review process to be set up with the ID provider.]</span></p></div>';
      $("idretry").onclick = function () {
        S.step = 0;
        S.doc = null;
        S.dp = null;
        S.sp = null;
        S.fail = false;
        draw();
      };
    }
    function draw() {
      var n = S.step,
        h =
          '<a class="back" href="' +
          back +
          '">Back</a><div class="pxw"><h2 style="margin-bottom:4px">Verify your identity</h2><div class="idbar" aria-hidden="true"><i style="width:' +
          Math.round(((n + 1) / 3) * 100) +
          '%"></i></div><p class="note" style="margin:0 0 18px">Step ' +
          (n + 1) +
          " of 3</p>";
      if (n === 0)
        h +=
          '<p>We check this once, before any money changes hands, so every reservation, sale, payout and reward goes to the right person. It takes about 2 minutes.</p><h3>Which document will you use?</h3><div class="paym" role="group" aria-label="Document">' +
          ["Driving licence", "Passport"]
            .map(function (d) {
              return (
                '<button type="button" data-doc="' +
                d +
                '" aria-pressed="' +
                (S.doc === d) +
                '">' +
                d +
                "</button>"
              );
            })
            .join("") +
          "</div>";
      else if (n === 1)
        h +=
          "<h3>Photo of your " +
          S.doc.toLowerCase() +
          '</h3><p class="muted">The photo page, flat on a table, with all four corners in shot and no glare.</p><div class="shotbox" id="idbox"><label class="fup">' +
          (S.dp ? "Retake photo" : "Take or choose photo") +
          '<input type="file" id="idf" accept="image/*" capture="environment"></label>' +
          (S.dp ? '<span class="got">Added: ' + esc(S.dp) + "</span>" : "") +
          '<p class="note small" style="margin:14px 0 0"><button type="button" class="lnkb" id="idsmp">Use an example photo (preview)</button></p></div>';
      else
        h +=
          '<h3>Take a quick selfie</h3><p class="muted">Face the camera in good light. We compare it with the photo on your ' +
          S.doc.toLowerCase() +
          ' and check it’s a real person.</p><div class="shotbox" id="idbox"><label class="fup">' +
          (S.sp ? "Retake selfie" : "Take selfie") +
          '<input type="file" id="idf" accept="image/*" capture="user"></label>' +
          (S.sp ? '<span class="got">Added: ' + esc(S.sp) + "</span>" : "") +
          '<p class="note small" style="margin:14px 0 0"><button type="button" class="lnkb" id="idsmp">Use an example selfie (preview)</button></p></div><p class="small" style="margin:0"><button type="button" class="lnkb" id="idfail">Preview: what if the check fails</button></p>';
      h +=
        '<p class="pxerr" id="iderr" aria-live="polite"></p><div class="pxnav">' +
        (n > 0
          ? '<button type="button" class="btn ghost" id="idb">Back</button>'
          : "") +
        '<button type="button" class="btn" id="idn">' +
        (n === 2 ? "Check my identity" : "Next") +
        '</button></div><p class="note small" style="margin-top:14px">Preview only: photos aren’t uploaded. <span class="todo">[Identity checks by a specialist provider (for example Veriff, Onfido or Yoti) to be connected.]</span></p></div>';
      el.innerHTML = h;
      el.querySelectorAll("[data-doc]").forEach(function (b) {
        b.onclick = function () {
          S.doc = b.dataset.doc;
          draw();
        };
      });
      if ($("idb"))
        $("idb").onclick = function () {
          S.step--;
          draw();
        };
      if ($("idf"))
        $("idf").onchange = function () {
          if (this.files[0]) {
            if (n === 1) S.dp = this.files[0].name;
            else S.sp = this.files[0].name;
            draw();
          }
        };
      if ($("idfail"))
        $("idfail").onclick = function () {
          S.sp = S.sp || "example-selfie.jpg";
          S.fail = true;
          checking();
        };
      if ($("idsmp"))
        $("idsmp").onclick = function () {
          if (n === 1)
            S.dp = "example-" + S.doc.toLowerCase().replace(" ", "-") + ".jpg";
          else S.sp = "example-selfie.jpg";
          draw();
        };
      $("idn").onclick = function () {
        if (n === 0 && !S.doc) {
          $("iderr").textContent = "Choose a document.";
          return;
        }
        if (n === 1 && !S.dp) {
          $("idbox").classList.add("miss");
          $("iderr").textContent =
            "Add a photo of your " + S.doc.toLowerCase() + ".";
          return;
        }
        if (n === 2) {
          if (!S.sp) {
            $("idbox").classList.add("miss");
            $("iderr").textContent = "Add your selfie.";
            return;
          }
          checking();
          return;
        }
        S.step++;
        draw();
      };
    }
    draw();
  }
  function bankHtml() {
    if (user.bank)
      return (
        '<div class="bankb ok"><b>✓ Payout account checked</b><p>Payouts go to <b>' +
        esc(user.bank.name) +
        "</b>, account ending <b>" +
        user.bank.end +
        '</b>. The name matches your verified name. <button type="button" class="lnkb" id="bkchg">Change</button></p></div>'
      );
    if (!user.idv)
      return (
        '<div class="bankb' +
        (bankNudge ? " glowb" : "") +
        '"><b>Add your payout account</b><p>We need to verify your identity first, then check the bank account is in your name before we pay you.</p><button type="button" class="btn ghost" id="bkid">Verify your identity</button></div>'
      );
    return (
      '<div class="bankb' +
      (bankNudge ? " glowb" : "") +
      '"><b>Add your payout account</b><p>We only pay into an account in your own name. We check the name with your bank before any payout.</p><div class="bkf"><label class="full">Name on the account<input id="bkn" value="' +
      esc(fullName()) +
      '" autocomplete="off"></label><label>Sort code<input id="bks" inputmode="numeric" placeholder="00-00-00" maxlength="8" autocomplete="off"></label><label>Account number<input id="bka" inputmode="numeric" maxlength="8" autocomplete="off"></label></div><p style="margin:10px 0"><button type="button" class="btn ghost" id="bkfill" style="padding:8px 16px">Fill with example details (preview)</button></p><p class="pxerr" id="bkerr" aria-live="polite"></p><button type="button" class="btn" id="bkgo">Check and save</button><p class="note small" style="margin:10px 0 0">Preview only: nothing is saved or sent. <span class="todo">[Bank name check (Confirmation of Payee) through the payment provider to be connected.]</span></p></div>'
    );
  }
  function wireBank(p, redraw) {
    if ($("bkid"))
      $("bkid").onclick = function () {
        ptab = "po";
        needId("#profile");
      };
    if ($("bkchg"))
      $("bkchg").onclick = function () {
        user.bank = null;
        redraw();
      };
    if (!$("bkgo")) return;
    $("bks").oninput = function () {
      var d = this.value.replace(/\D/g, "").slice(0, 6);
      this.value = d.replace(/(\d\d)(?=\d)/g, "$1-");
      this.classList.remove("miss");
    };
    $("bka").oninput = function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 8);
      this.classList.remove("miss");
    };
    $("bkfill").onclick = function () {
      $("bkn").value = fullName();
      $("bks").value = "20-00-00";
      $("bka").value = "55779911";
      $("bkerr").textContent = "";
    };
    $("bkgo").onclick = function () {
      var nm = $("bkn").value.trim(),
        sc = $("bks").value.replace(/\D/g, ""),
        ac = $("bka").value,
        bad = 0;
      [
        ["bks", sc.length === 6],
        ["bka", /^\d{8}$/.test(ac)],
        ["bkn", nm.length > 2],
      ].forEach(function (x) {
        $(x[0]).classList.toggle("miss", !x[1]);
        if (!x[1]) bad++;
      });
      if (bad) {
        $("bkerr").textContent = "Check the details highlighted.";
        return;
      }
      var norm = function (x) {
        return x.toLowerCase().replace(/[^a-z]/g, "");
      };
      if (
        norm(nm) !== norm(fullName()) &&
        norm(nm) !== norm(user.first + user.last)
      ) {
        $("bkn").classList.add("miss");
        $("bkerr").textContent =
          "That name doesn’t match your verified name. We can only pay into an account in your own name.";
        return;
      }
      var b = this;
      b.disabled = true;
      b.textContent = "Checking with your bank…";
      setTimeout(function () {
        user.bank = { name: nm, end: ac.slice(-4) };
        bankNudge = false;
        SLIST.forEach(function (v) {
          if (v.pfail) {
            v.pfail = false;
            v.pfixed = true;
            addMail("seller", {
              s: "Payout sent again: " + vname(v),
              b:
                "We’ve sent your payout of " +
                gbp(paidOf(v)) +
                " to your account ending " +
                user.bank.end +
                ". It should arrive within 2 hours.",
              veh: v.id,
              go: "po",
            });
          }
        });
        redraw();
      }, 1300);
    };
  }

  function finalFig(v, rr, up, cb, mg) {
    var base = up ? v.net : mg === false ? noG(v) : v.offer,
      rows = [["Agreed price for your " + vname(v), gbp(base)]];
    if (!up)
      rows.push([
        "Mechanical guarantee",
        mg === false
          ? "Not included"
          : "Included: you cover faults reported within 30 days",
      ]);
    var fee = myRrFee(),
      pk = rrPerk();
    if (rr) {
      rows.push(["Retail Ready: extra we pay", "+" + gbp(RR_UP)]);
      rows.push([
        "Retail Ready pack fee, taken from your sale proceeds",
        "−" + gbp(RR_FEE),
      ]);
      if (fee < RR_FEE)
        rows.push([
          "★ " + pk,
          "+" + gbp(RR_FEE - fee),
          "rwrow " + (fee === 0 ? "t-platinum" : "t-gold") + " rw-in",
        ]);
    }
    if (v.fin)
      rows.push(["Your finance", "Settled with your lender from the sale"]);
    var you = base + (rr ? RR_UP - fee : 0);
    mdl(
      '<h2 style="margin:0 0 6px">Check your final figures</h2><p class="muted" style="margin:0 0 14px">This is what you’re ' +
        (up ? "agreeing to" : "signing") +
        '. Nothing is taken from you up front.</p><div class="sum" style="margin:0">' +
        rows
          .map(function (r) {
            return (
              '<div class="row' +
              (r[2] ? " " + r[2] : "") +
              '"><span>' +
              r[0] +
              "</span><span>" +
              r[1] +
              "</span></div>"
            );
          })
          .join("") +
        '<div class="row big2"><span>You receive' +
        (v.fin ? ", before your finance is settled" : "") +
        "</span><span>" +
        gbp(you) +
        "</span></div></div>" +
        (rr
          ? '<p class="note small" style="margin:12px 0 0">If your car hasn’t sold within 60 days, the ' +
            gbp(fee) +
            ' pack fee is due then. If you cancel after the work has started, you pay for the work already done, up to the pack fee. <span class="todo">[Cancellation terms to be approved by your solicitor.]</span></p>'
          : "") +
        (up
          ? '<label class="agree" id="ffc-l" style="margin-top:12px"><input type="checkbox" id="ffc"><span>Please start the Retail Ready work straight away. I understand I can still cancel within 14 days, but I’ll pay for any work already done.</span></label>'
          : "") +
        '<p class="pxerr" id="fferr"></p><div class="pxnav" style="margin-top:6px"><button type="button" class="btn" id="ffok">' +
        (up ? "Confirm and add Retail Ready" : "Confirm and sign") +
        '</button><button type="button" class="btn ghost" data-x>Go back</button></div>',
      function (m) {
        m.querySelector("#ffok").onclick = function () {
          if (up && !m.querySelector("#ffc").checked) {
            m.querySelector("#ffc-l").classList.add("miss");
            m.querySelector("#fferr").textContent =
              "Tick the box so we can start the work.";
            return;
          }
          mdlX();
          cb();
        };
      },
    );
  }
  function rrBlock(v) {
    if (v.st !== "live") return "";
    var h = "";
    if (hasPerk(/Priority placement/))
      h +=
        '<p class="perkln">★ <b>Priority placement:</b> your car shows near the top of buyers’ searches. <span class="muted small">Silver reward and above</span></p>';
    if (hasPerk(/hot-deal slots/)) {
      if (!v.hd)
        h +=
          '<div class="hdbox"><b>★ First pick of hot-deal slots</b><p class="small" style="margin:4px 0 10px">Put your car in front of more buyers as one of this month’s hot deals. Gold reward and above.</p><button type="button" class="btn ghost" data-hd="' +
          v.id +
          '">Request a hot-deal slot</button></div>';
      else
        h +=
          '<div class="hdbox"><b>' +
          (v.hd.st === "live"
            ? "Your car is a hot deal"
            : "Hot-deal slot requested") +
          '</b><p class="small" style="margin:4px 0 0">' +
          esc(v.hd.t) +
          (v.hd.st === "live"
            ? ". Live until " + ENDS + "."
            : ". We’ll confirm within 1 working day.") +
          "</p>" +
          (v.hd.st === "live"
            ? ""
            : '<div class="pvrow"><span class="muted small">Preview:</span><button type="button" class="lnkb" data-hdok="' +
              v.id +
              '">We approve it</button></div>') +
          "</div>";
    }
    if (v.rr) {
      var S = ["Booked", "Work in progress", "Done: listed at retail standard"],
        k = v.rrst === "booked" ? 0 : v.rrst === "work" ? 1 : 2;
      h +=
        '<h3 style="margin:22px 0 10px">Retail Ready</h3><ol class="tracker st">' +
        S.map(function (t, n) {
          return (
            '<li class="' +
            (n < k || k === 2 ? "done" : n === k ? "now" : "") +
            '">' +
            t +
            "</li>"
          );
        }).join("") +
        "</ol>" +
        (k < 2
          ? '<p class="small" style="margin:8px 0 0"><button type="button" class="lnkb" data-rradv="' +
            v.id +
            '">Move to the next step (preview)</button></p>'
          : "");
    } else if (!v.fault) {
      h += v.resv
        ? '<div class="rrup-box off"><b>Upgrade to Retail Ready</b><p class="small" style="margin:4px 0 10px">Not available while a buyer has your car reserved. It comes back if the reservation ends.</p><button type="button" class="btn rrbtn" disabled>Upgrade to Retail Ready</button></div>'
        : '<div class="rrup-box"><b>Want more for your car?</b><p class="small" style="margin:4px 0 10px">Upgrade to Retail Ready and we pay you ' +
          gbp(RR_UP) +
          " more, for a " +
          feeTxt() +
          " pack fee taken from your sale proceeds. Available until a buyer reserves your car." +
          (rrPerk() ? ' <span class="gperk">★ ' + rrPerk() + "</span>" : "") +
          '</p><button type="button" class="btn rrbtn" data-rrup="' +
          v.id +
          '">Upgrade to Retail Ready: ' +
          gbp(RR_UP - myRrFee()) +
          " more</button></div>";
    }
    if (v.fault && !v.fault.done)
      h +=
        '<div class="warnb"><b>We found something during preparation</b><p>' +
        v.fault.d +
        ". Fixing it costs about " +
        gbp(v.fault.c) +
        '.</p><div class="pxnav"><button type="button" class="btn" data-fx="pay" data-v="' +
        v.id +
        '">Fix it: ' +
        gbp(v.fault.c) +
        ' from my proceeds</button><button type="button" class="btn ghost" data-fx="low" data-v="' +
        v.id +
        '">Sell as it is for ' +
        gbp(v.net - v.fault.l) +
        '</button><button type="button" class="btn ghost" data-fx="wd" data-v="' +
        v.id +
        '">Withdraw my car</button></div><p class="note small" style="margin:8px 0 0"><span class="todo">[Who authorises extra work, and the most we can spend without asking, to be confirmed.]</span></p></div>';
    if (v.fault && v.fault.done)
      h +=
        '<p class="muted small" style="margin:14px 0 0">' +
        v.fault.done +
        "</p>";
    if (v.rrdue && !v.rrpaid)
      h +=
        '<div class="warnb"><b>Your Retail Ready fee is now due</b><p>Your car hasn’t sold within 60 days, so the ' +
        gbp(rrFeeOf(v)) +
        " pack fee is due now. Your car stays listed at retail standard, and you still get the extra " +
        gbp(RR_UP) +
        ' when it sells.</p><button type="button" class="btn" data-rrpay="' +
        v.id +
        '">Pay ' +
        gbp(rrFeeOf(v)) +
        ' by card</button><p class="note small" style="margin:8px 0 0"><span class="todo">[Payment by the payment provider, and the 60-day rule, to be confirmed.]</span></p></div>';
    if (v.rrpaid)
      h +=
        '<p class="muted small" style="margin:14px 0 0">Retail Ready fee paid. Nothing more comes out of your sale proceeds for it.</p>';
    if (v.slow)
      h +=
        '<div class="warnb"><b>Your car hasn’t sold yet</b><p>It’s been listed for 30 days, and cars like yours are selling for a little less right now. Lower your price by ' +
        gbp(250) +
        ' to sell faster?</p><div class="pxnav"><button type="button" class="btn" data-slow="low" data-v="' +
        v.id +
        '">Lower it by ' +
        gbp(250) +
        '</button><button type="button" class="btn ghost" data-slow="keep" data-v="' +
        v.id +
        '">Keep my price</button></div></div>';
    var nt = nextTier();
    if (nt && tierCount() + 1 === nt[1])
      h += '<p class="perkln tup-hint">✦ <b>This sale takes you to ' + nt[0] + '.</b> When the buyer completes and you sign the sale contract, you’ll become a ' + nt[0] + ' Trusted Seller.</p>';
    var pv = [];
    if (!v.resv) pv.push(["sres", "A buyer reserves it"]);
    else
      pv.push(
        ["send", "The reservation ends"],
        ["ssold", "The buyer completes"],
      );
    if (v.rr && v.rrst !== "done" && !v.fault)
      pv.push(["sfault", "Prep finds a bigger fault"]);
    if (
      v.rr &&
      v.rrst === "done" &&
      !v.rrdue &&
      !v.rrpaid &&
      !v.resv &&
      rrFeeOf(v) > 0
    )
      pv.push(["sunsold", "It hasn’t sold after 60 days"]);
    if (!v.slow && !v.resv) pv.push(["sslow", "It hasn’t sold after 30 days"]);
    h +=
      '<div class="pvrow"><span class="muted small">Preview what happens next:</span>' +
      pv
        .map(function (p) {
          return (
            '<button type="button" class="lnkb" data-pv="' +
            p[0] +
            '" data-v="' +
            v.id +
            '">' +
            p[1] +
            "</button>"
          );
        })
        .join("") +
      "</div>";
    h +=
      '<p style="margin:14px 0 0"><button type="button" class="lnkb" data-wd="' +
      v.id +
      '">Withdraw my car</button></p>';
    return h;
  }
  function sellerPo() {
    var order = ["waiting", "under", "live", "sold", "rejected", "withdrawn"],
      list = [];
    order.forEach(function (st) {
      SLIST.forEach(function (v) {
        if (v.st === st) list.push(v);
      });
    });
    return (
      bankHtml() +
      '<p class="muted" style="max-width:680px;margin-top:0">Offers come from us, after a phone call to agree a price you’re happy with. Open a car to see its offer and payout steps.</p>' +
      list
        .map(function (v) {
          return vtab(
            v.id,
            vname(v),
            (v.st === "waiting" ? '<span class="tbadge in">1</span>' : "") +
              stl(v) +
              plate(v.reg),
            poBody(v),
            v.st === "waiting" ? "glow" : "",
          );
        })
        .join("")
    );
  }
  function sellerDocs() {
    var DL = byOrder(SLIST.slice()).sort(function (a, b) {
      return (b.sc === "wait") - (a.sc === "wait");
    });
    return (
      DL.map(function (v) {
        var d = [["Seller declaration", "Signed"]];
        if (v.st === "waiting")
          d.push([
            "Offer letter",
            "Waiting for your signature (in Offers and payout)",
          ]);
        else if (v.st === "rejected") d.push(["Offer letter", "Turned down"]);
        else if (v.st === "withdrawn")
          d.push([
            "Offer letter",
            v.signed ? "Signed, then withdrawn" : "Not signed",
          ]);
        else if (v.st === "under") d.push(["Offer letter", "Not sent yet"]);
        else d.push(["Offer letter", "Signed"]);
        if (v.st === "sold") {
          d.push(["Sale contract", v.sc === "wait" ? "WAIT" : "Signed"]);
          if (v.fin) d.push(["Finance settlement statement", "Uploaded"]);
          d.push([
            "Handover report",
            v.prog > 4 ? "Ready to view" : "After handover",
          ]);
        }
        var body =
          '<ul class="pts">' +
          d
            .map(function (x) {
              return (
                "<li><b>" +
                x[0] +
                "</b> " +
                (x[1] === "WAIT"
                  ? '<span class="imp">Waiting for your signature</span> <button type="button" class="btn ghost" style="padding:6px 14px;margin-left:8px" data-dsign="' +
                    v.id +
                    '">Sign</button>'
                  : '<span class="muted">' + x[1] + "</span>") +
                "</li>"
              );
            })
            .join("") +
          "</ul>";
        return vtab(
          v.id,
          vname(v),
          (v.sc === "wait" ? '<span class="tbadge in">1</span>' : "") +
            plate(v.reg),
          body,
          v.sc === "wait" ? "glow" : "",
        );
      }).join("") +
      '<p class="note" style="margin-top:14px">Sample documents. In the live service, signing happens through a secure e-signature.</p>'
    );
  }
  function mailHtml() {
    var M = mlist();
    if (!M.length)
      return '<p class="muted">No messages yet. We’ll send updates about your purchases and listings here, and by email.</p>';
    return (
      M.map(function (m) {
        if (m.perk)
          return (
            '<details class="vtab mail ticket' +
            (m.silver ? " silver" : "") +
            (m.tk ? " tk-" + m.tk : "") +
            (m.u ? " unread" : "") +
            '" data-mid="' +
            m.id +
            '"><summary><span class="vt-name"><span class="tk-star" aria-hidden="true">★</span>' +
            (m.u ? '<span class="tk-new">New reward</span>' : "") +
            m.s +
            '</span><span class="vt-r"><span class="small tk-d">' +
            m.d +
            '</span><span class="chev" aria-hidden="true"></span></span></summary><div class="vt-body"><div class="tk-card"><p class="tk-k">' +
            (m.tk
              ? m.tk.charAt(0).toUpperCase() + m.tk.slice(1)
              : m.silver
                ? "Silver"
                : "Gold") +
            ' ticket</p><p class="tk-big">' +
            m.t +
            '</p><p class="tk-l">' +
            m.tl +
            '</p><p class="tk-code">' +
            (m.used
              ? "Used on your " + m.used
              : m.repl
                ? "Replaced by your " + m.repl + " ticket"
                : m.amt
                  ? "One use · cars from £" + fmt(rwMin(m.amt))
                  : "Linked to your account · no code needed") +
            '</p></div><p style="margin:16px 0 14px">' +
            m.b +
            '</p><a class="btn" href="#' +
            (m.go === "li" || m.go === "po" || m.go === "ov"
              ? "profile"
              : m.go) +
            '">' +
            (m.go === "buy"
              ? "Browse cars"
              : m.go === "sell"
                ? "List a car"
                : m.go === "po"
                  ? "See your offers"
                  : m.go === "ov"
                    ? "See your account"
                    : "See your listings") +
            '</a> <button type="button" class="btn ghost vt-close">Close</button><p class="note small" style="margin:12px 0 0">One use, and only by you. ' +
            (m.amt
              ? "It appears at checkout when you buy a car signed in to your linked buyer account."
              : "") +
            ' <span class="todo">[Reward terms, expiry and how the code is applied to be confirmed.]</span></p></div></details>'
          );
        return (
          '<details class="vtab mail' +
          (m.u ? " unread" : "") +
          '" data-mid="' +
          m.id +
          '"><summary><span class="vt-name">' +
          (m.u ? '<span class="udot" aria-label="Unread"></span>' : "") +
          m.s +
          '</span><span class="vt-r"><span class="muted small">' +
          m.d +
          '</span><span class="chev" aria-hidden="true"></span></span></summary><div class="vt-body"><p style="margin:0 0 14px">' +
          m.b +
          "</p>" +
          (m.href
            ? '<a class="btn" href="' +
              m.href +
              '">' +
              (m.hl || "Open") +
              "</a> "
            : m.go
              ? '<button type="button" class="btn" data-gov="' +
                m.go +
                '"' +
                (m.veh ? ' data-veh="' + m.veh + '"' : "") +
                ">Open</button> "
              : "") +
          '<button type="button" class="btn ghost vt-close">Close</button></div></details>'
        );
      }).join("") +
      '<p class="note" style="margin-top:14px">We send each of these to your email too. <span class="todo">[Email sending to be connected.]</span></p>'
    );
  }
  function attnHtml() {
    var L = [];
    if (user.role === "buyer") {
      L = notes().map(function (n) {
        return [n[1], n[2], n[3]];
      });
      if (myPur && !myPur.ret) {
        if (myPur.stage === 0)
          L.push([
            myPur.mode === "fin"
              ? "Finish your finance application for the " + carNm(myPur.i)
              : "Pay for your " + carNm(myPur.i),
            "pu",
            "Open",
          ]);
        if (myPur.stage === 1)
          L.push([
            "Choose collection or delivery for your " + carNm(myPur.i),
            "pu",
            "Choose",
          ]);
      }
      Object.keys(interest).forEach(function (k) {
        if (interest[k]) {
          var c = cars[k];
          L.push([
            "You’re on the list for the " +
              c.y +
              " " +
              c.mk +
              " " +
              c.md +
              ". We’ll tell you if it comes back on sale",
            "ml",
            "Open mail",
          ]);
        }
      });
      resv.forEach(function (r) {
        if (r.v === "deal") {
          var c = cars[r.i];
          L.push([
            "Build my deal call for the " +
              c.y +
              " " +
              c.mk +
              " " +
              c.md +
              ": we’ll message you with the date and time",
            "ml",
            "Open mail",
          ]);
        }
      });
    } else {
      SLIST.forEach(function (v) {
        if (v.st === "waiting")
          L.push([
            "Sign your offer for the " + vname(v),
            "po",
            "Review and sign",
            v.id,
          ]);
        if (v.sc === "wait")
          L.push([
            "Sign the sale contract for the " + vname(v),
            "dc",
            "Open documents",
            v.id,
          ]);
        if (v.pfail)
          L.push([
            "Your payout for the " +
              vname(v) +
              " bounced. Check your payout account",
            "po",
            "Fix it",
            v.id,
          ]);
      });
      if (!user.bank)
        L.push([
          "Add your payout account so we can pay you",
          "po",
          "Add account",
        ]);
    }
    var um = mlist().filter(function (m) {
      return m.u && !m.perk;
    }).length;
    if (um)
      L.push([
        "You have " + um + " new message" + (um > 1 ? "s" : ""),
        "ml",
        "Open mail",
      ]);
    if (!L.length)
      return '<div class="attn" style="border-color:var(--line)"><h3>You’re all caught up</h3><p class="muted small" style="margin:0">Nothing needs your attention right now. We’ll email you when something does.</p></div>';
    return (
      '<div class="attn"><h3><span class="nbadge">' +
      totalCount() +
      "</span>Needs your attention</h3><ul>" +
      L.map(function (n) {
        return (
          "<li><span>" +
          n[0] +
          '</span><button type="button" class="btn ghost" style="padding:8px 16px" data-gov="' +
          n[1] +
          '"' +
          (n[3] ? ' data-veh="' + n[3] + '"' : "") +
          ">" +
          n[2] +
          "</button></li>"
        );
      }).join("") +
      '</ul><p class="note small" style="margin:10px 0 0">We also email you about each of these. <span class="todo">[Email notifications to be connected.]</span></p></div>'
    );
  }
  function pHtml(k) {
    var role = user.role;
    if (role === "buyer") {
      var rlist = resv.length
        ? '<h3 style="margin:28px 0 10px">Your purchases, reservations and requests</h3><ul class="pts">' +
          resv
            .map(function (r) {
              var c = cars[r.i];
              return (
                "<li><b>" +
                c.y +
                " " +
                c.mk +
                " " +
                c.md +
                ".</b> " +
                (r.v === "deal"
                  ? "Build my deal call requested. We’ll message you with the date and time."
                  : r.v === "dep"
                    ? reserved[r.i] && !reserved[r.i].sold
                      ? "Reserved until " +
                        reserved[r.i].until +
                        " (" +
                        daysLeft(reserved[r.i].until) +
                        " days left)."
                      : reserved[r.i]
                        ? "Reserved, now being bought."
                        : "Reservation ended."
                    : "Purchase " +
                      (myPur && myPur.i === r.i
                        ? ["started", "paid", "booked", "complete"][myPur.stage]
                        : "started") +
                      ".") +
                ' <a class="lnk" href="#car-' +
                r.i +
                '">View car</a></li>'
              );
            })
            .join("") +
          "</ul>"
        : "";
      if (k === "ov" && !user.sample) {
        var mine = Object.keys(reserved).filter(function (x) {
          return resvByMe(+x) && !reserved[x].sold;
        });
        return (
          attnHtml() +
          '<div class="stat"><div><b>' +
          (myPur
            ? myPur.ret
              ? "Returning"
              : ["Not paid yet", "Paid", "Booked", "Yours"][myPur.stage]
            : "None yet") +
          "</b><span>" +
          (myPur
            ? "Your " + cars[myPur.i].mk + " " + cars[myPur.i].md
            : "Purchases") +
          "</span></div><div><b>" +
          mine.length +
          "</b><span>Cars reserved</span></div><div><b>" +
          savedCount() +
          "</b><span>Saved cars</span></div></div>" +
          rlist +
          '<p style="margin-top:22px"><a class="btn ghost" href="#buy">Browse cars</a> <a class="btn ghost" href="#deals">See hot deals</a></p>'
        );
      }
      if (k === "ov")
        return (
          attnHtml() +
          '<div class="stat"><div><b>Today, about 17:30</b><span>Your Sportage arrives</span></div><div><b>2</b><span>Stops before yours</span></div><div><b>' +
          savedCount() +
          "</b><span>Saved cars</span></div></div>" +
          '<h3 style="margin-bottom:10px">What’s happening</h3><ul class="pts"><li><b>Your 2021 Kia Sportage is on its way.</b> <button type="button" class="lnkb" data-go="lt">See live tracking</button></li><li><b>Looking for something else?</b> <a class="lnk" href="#buy">Browse cars</a> or <a class="lnk" href="#deals">see hot deals</a></li></ul>' +
          (resv.length
            ? '<h3 style="margin:28px 0 10px">Your purchases, reservations and requests</h3><ul class="pts">' +
              resv
                .map(function (r) {
                  var c = cars[r.i];
                  return (
                    "<li><b>" +
                    c.y +
                    " " +
                    c.mk +
                    " " +
                    c.md +
                    ".</b> " +
                    (r.v === "deal"
                      ? "Build my deal call requested. We’ll message you with the date and time."
                      : r.v === "dep"
                        ? reserved[r.i]
                          ? "Reserved until " + reserved[r.i].until + "."
                          : "Reservation started."
                        : "Purchase started.") +
                    ' <a class="lnk" href="#car-' +
                    r.i +
                    '">View car</a></li>'
                  );
                })
                .join("") +
              "</ul>"
            : "")
        );
      if (k === "pu" && myPur) return purHtml();
      if (k === "pu" && !user.sample)
        return '<p class="muted">You haven’t bought a car yet. When you do, you’ll follow every step here: payment, inspection, delivery and handover.</p><p><a class="btn" href="#buy">Browse cars</a></p>';
      if (k === "pu")
        return (
          '<h3 style="font:300 1.35rem var(--display);margin:0 0 14px">2021 Kia Sportage</h3><div class="puimg"><div class="ph"><span>Photos coming soon</span></div></div><ol class="tracker st pu-gap"><li class="done">Reserved</li><li class="done">Finance approved</li><li class="done">Inspection</li><li class="done">Preparation</li><li class="now">Ready for delivery<small>in transit</small></li><li>Completed</li></ol>' +
          '<div style="margin-top:44px">' +
          dls([
            ["Payment", "PCP, 36 months (sample)"],
            ["Delivery", "Selected, tracked in Live tracking"],
            ["Inspection", "Passed, report in Documents"],
            [
              "Need help?",
              '<a class="lnk" href="#protect">Buyer protection</a>',
            ],
          ]) +
          "</div>"
        );
      if (
        k === "lt" &&
        myPur &&
        myPur.del &&
        myPur.del.type === "Delivery" &&
        myPur.stage === 2 &&
        !myPur.track
      )
        return (
          "<p>Your delivery is booked for <b>" +
          myPur.del.date +
          "</b>, " +
          myPur.del.slot.toLowerCase() +
          '. Live tracking starts on the day.</p><div class="pvrow"><span class="muted small">Preview:</span><button type="button" class="lnkb" data-trk>Delivery day</button></div>'
        );
      if (
        k === "lt" &&
        !user.sample &&
        !(myPur && myPur.track && myPur.stage === 2)
      )
        return '<p class="muted">Nothing on its way yet. Once your delivery is booked, you can follow it here on the day.</p>';
      if (k === "lt")
        return (
          '<div class="stat"><div><b>Today, about 17:30</b><span>Estimated arrival</span></div><div><b>2</b><span>Stops before yours</span></div></div>' +
          mapSvg() +
          '<div style="margin-top:26px">' +
          logsHtml() +
          '</div><p class="note" style="margin-top:16px">Schematic map. <span class="todo">[A live position needs the transport partner’s tracking feed to be connected.]</span></p>'
        );
      if (k === "sv") {
        var ids = Object.keys(saved);
        return ids.length
          ? '<div class="grid">' +
              ids
                .map(function (i) {
                  return card(cars[+i], +i, true, true);
                })
                .join("") +
              "</div>"
          : '<p class="muted">You haven’t saved any cars yet. Use “Save this car” on any car page and it will show up here.</p><p><a class="btn" href="#buy">Browse cars</a></p>';
      }
      if (k === "px") return pxProfile();
      if (k === "ml") return mailHtml();
      if (myPur) return purDocs();
      if (!user.sample)
        return '<p class="muted">No documents yet. Your receipts, contracts and reports appear here once you reserve or buy a car.</p>';
      return vtab(
        "kia",
        "2021 Kia Sportage",
        plate("KM21 XAB"),
        docs([
          ["Reservation confirmation", "Signed"],
          ["Inspection report", "Ready to view"],
          ["Finance agreement", "Waiting for your signature"],
          ["Condition photos at pick-up", "Ready to view"],
          ["Sale contract", "Waiting for your signature"],
        ]) + uploadsHtml(),
      );
    }
    if (k === "ov") return sellerOv();
    if (k === "li") return sellerLi();
    if (k === "po") return sellerPo();
    if (k === "rv") return sellerRv();
    if (k === "ml") return mailHtml();
    return sellerDocs();
  }

  function profileView() {
    var el = $("profile-body");
    if (user && pwant) {
      if (
        PTABS[user.role].some(function (t) {
          return t[0] === pwant;
        })
      )
        ptab = pwant;
      pwant = null;
    }
    if (!user) {
      var role = pxDraft && pxDraft.seller ? "seller" : "buyer";
      var top =
        '<a class="back" href="#home">Back</a><h2>' +
        (after ? "Sign in or create an account" : "Your profile") +
        '</h2><p class="lede">' +
        (after
          ? "You need an account to continue. Sign in or create one here and we’ll take you straight back to where you were."
          : "Sign in or create an account to follow your purchase, your delivery or your listing.") +
        (pwant ? " Sign in as a buyer to see your saved cars." : "") +
        '</p><div class="seg" role="group" aria-label="Account" style="margin:0 0 22px"><button type="button" data-sm="new" aria-pressed="' +
        (simode === "new") +
        '">Create an account</button><button type="button" data-sm="in" aria-pressed="' +
        (simode !== "new") +
        '">I already have an account</button></div>';
      if (simode !== "new") {
        siOther();
        return;
      }
      el.innerHTML =
        top +
        '<form class="signin" id="si"><div><p class="muted" style="margin:0 0 8px;font-size:.88rem">I’m signing in as a</p><div class="seg" role="group" aria-label="Role"><button type="button" data-r="buyer" aria-pressed="' +
        (role === "buyer") +
        '">Buyer</button><button type="button" data-r="seller" aria-pressed="' +
        (role === "seller") +
        '">Seller</button></div></div>' +
        '<div class="nmrow"><label>First name<input name="fname" required autocomplete="given-name"></label><label>Middle name(s), optional<input name="mname" autocomplete="additional-name"></label><label>Last name<input name="lname" required autocomplete="family-name"></label></div><p class="note small" style="margin:-6px 0 0">Use your full legal name, as it appears on your driving licence. We use it on your documents.</p><label>Email<input type="email" name="email" required autocomplete="email"></label><label>Mobile number<input type="tel" name="mob" required autocomplete="tel"></label><label>Create a password<input type="password" name="pw" required minlength="8" autocomplete="new-password"></label><p class="note small" style="margin:-6px 0 0">At least 8 characters.</p><div><button type="button" class="btn ghost" id="sifill" style="padding:8px 16px;margin-bottom:12px">Fill with example details (preview)</button></div><div><button class="btn" type="submit">' +
        (after ? "Continue" : "Sign in or create account") +
        "</button></div>" +
        '<p class="note" style="margin:0">Preview only: there are no accounts yet, so this shows a sample profile and nothing is stored. <span class="todo">[Real sign-in, email and text codes to be connected.]</span></p></form>';
      el.querySelectorAll("button[data-r]").forEach(function (b) {
        b.onclick = function () {
          role = b.dataset.r;
          el.querySelectorAll("button[data-r]").forEach(function (x) {
            x.setAttribute("aria-pressed", x.dataset.r === role);
          });
        };
      });
      $("sifill").onclick = function () {
        var f = $("si");
        if (!f.fname.value) f.fname.value = "Kayden";
        if (!f.lname.value) f.lname.value = "Johnson";
        if (!f.email.value) f.email.value = "kayden@example.com";
        if (!f.mob.value) f.mob.value = "07700 900123";
        if (!f.pw.value) f.pw.value = "Example-pass-24";
      };
      el.querySelectorAll("[data-sm]").forEach(function (b) {
        b.onclick = function () {
          simode = b.dataset.sm;
          fgt = { step: 0 };
          profileView();
        };
      });
      $("si").onsubmit = function (e) {
        e.preventDefault();
        var t = e.target;
        if (!t.reportValidity()) return;
        var pend = {
          role: role,
          first: t.fname.value.trim(),
          middle: t.mname.value.trim(),
          last: t.lname.value.trim(),
          email: t.email.value,
          mob: t.mob.value.trim(),
          roles: {},
        };
        pend.roles[role] = true;
        pend.name = pend.first;
        codeStep(pend);
      };
      function codeStep(pend, login) {
        var tail = pend.mob.replace(/\D/g, "").slice(-3),
          tries = 0;
        el.innerHTML =
          '<a class="back" href="#profile" id="cback">Back</a>' +
          (login
            ? '<h2>Check your phone</h2><p class="lede">We’ve sent a 6-digit code to your mobile ending <b>' +
              tail +
              "</b>. Enter it to sign in.</p>"
            : '<h2>Check your email and phone</h2><p class="lede">We’ve sent a 6-digit code to <b>' +
              esc(pend.email) +
              "</b> and another to your mobile ending <b>" +
              tail +
              "</b>. This confirms they’re really yours.</p>") +
          '<form class="signin" id="vc" novalidate>' +
          (login
            ? ""
            : '<label>Code from your email<input id="ec" inputmode="numeric" maxlength="6" autocomplete="one-time-code" class="code"></label>') +
          '<label>Code from your text message<input id="mc" inputmode="numeric" maxlength="6" autocomplete="one-time-code" class="code"></label>' +
          (login
            ? ""
            : '<label class="agree" style="margin:4px 0"><input type="checkbox" id="tsv" checked><span>Use two-step sign-in, so a code is needed as well as your password. <b>Recommended.</b></span></label>') +
          '<div><button type="button" class="btn ghost" id="vfill" style="padding:8px 16px">Fill with example codes (preview)</button> <button type="button" class="lnkb" id="vwrong">Preview: enter a wrong code</button></div><p class="note small" style="margin:0">Codes expire after 10 minutes.</p><p class="pxerr" id="vcerr" aria-live="polite"></p><div><button class="btn" type="submit" id="vgo">Verify and continue</button> <button type="button" class="lnkb" id="vres">Send new codes</button></div><p class="note" style="margin:0"><span class="todo">[Email and text codes to be connected.]</span></p></form>';
        $("cback").onclick = function (e) {
          e.preventDefault();
          profileView();
        };
        var KS = ["ec", "mc"].filter(function (k) {
          return $(k);
        });
        KS.forEach(function (k) {
          $(k).oninput = function () {
            this.value = this.value.replace(/\D/g, "").slice(0, 6);
            this.classList.remove("miss");
          };
        });
        $("vfill").onclick = function () {
          if ($("ec")) $("ec").value = "482913";
          $("mc").value = "705186";
          $("vcerr").textContent = "";
          KS.forEach(function (k) {
            $(k).classList.remove("miss");
          });
        };
        $("vwrong").onclick = function () {
          KS.forEach(function (k) {
            $(k).value = "111111";
          });
        };
        $("vres").onclick = function () {
          tries = 0;
          $("vgo").disabled = false;
          $("vcerr").textContent =
            "New codes sent. Older codes no longer work.";
        };
        $("vc").onsubmit = function (ev) {
          ev.preventDefault();
          var b = 0;
          KS.forEach(function (k) {
            var ok = /^\d{6}$/.test($(k).value);
            $(k).classList.toggle("miss", !ok);
            if (!ok) b++;
          });
          if (b) {
            $("vcerr").textContent =
              KS.length > 1
                ? "Enter both 6-digit codes."
                : "Enter the 6-digit code.";
            return;
          }
          var wrong = KS.filter(function (k) {
            return $(k).value !== (k === "ec" ? "482913" : "705186");
          });
          if (wrong.length) {
            tries++;
            wrong.forEach(function (k) {
              $(k).classList.add("miss");
            });
            if (tries >= 3) {
              $("vcerr").textContent =
                "Too many wrong codes. For your security, we’ve sent you new ones. Wait 30 seconds, then try again.";
              $("vgo").disabled = true;
              setTimeout(function () {
                if ($("vgo")) $("vgo").disabled = false;
                tries = 0;
              }, 3000);
              return;
            }
            $("vcerr").textContent =
              "That code isn’t right. " +
              (3 - tries) +
              " " +
              (3 - tries === 1 ? "try" : "tries") +
              " left.";
            return;
          }
          user = pend;
          user.ev = true;
          user.mv = true;
          user.tsv = $("tsv") ? $("tsv").checked : true;
          user.name = user.first;
          updProf();
          ptab = "ov";
          pwant = null;
          if (after) {
            var a = after;
            after = null;
            location.hash = a;
            return;
          }
          profileView();
        };
      }
      function siOther() {
        if (simode === "in") {
          el.innerHTML =
            top +
            '<form class="signin" id="si2" novalidate><div><p class="muted" style="margin:0 0 8px;font-size:.88rem">I’m signing in as a</p><div class="seg" role="group" aria-label="Role"><button type="button" data-r="buyer" aria-pressed="' +
            (role === "buyer") +
            '">Buyer</button><button type="button" data-r="seller" aria-pressed="' +
            (role === "seller") +
            '">Seller</button></div></div><label>Email<input type="email" id="s2e" autocomplete="email"></label><label>Password<input type="password" id="s2p" autocomplete="current-password"></label><p style="margin:-6px 0 0"><button type="button" class="lnkb" id="s2f">Forgot your password?</button></p><div><button type="button" class="btn ghost" id="s2fill" style="padding:8px 16px">Fill with example details (preview)</button></div><p class="pxerr" id="s2err" aria-live="polite"></p><div><button class="btn" type="submit">Sign in</button></div><p class="note" style="margin:0">Preview only: this signs you in to a sample returning account that’s already verified. <span class="todo">[Real sign-in to be connected.]</span></p></form>';
          el.querySelectorAll("[data-sm]").forEach(function (b) {
            b.onclick = function () {
              simode = b.dataset.sm;
              fgt = { step: 0 };
              profileView();
            };
          });
          el.querySelectorAll("button[data-r]").forEach(function (b) {
            b.onclick = function () {
              role = b.dataset.r;
              el.querySelectorAll("button[data-r]").forEach(function (x) {
                x.setAttribute("aria-pressed", x.dataset.r === role);
              });
            };
          });
          $("s2fill").onclick = function () {
            $("s2e").value = "kayden@example.com";
            $("s2p").value = "Example-pass-24";
          };
          $("s2f").onclick = function () {
            simode = "forgot";
            fgt = { step: 0 };
            profileView();
          };
          $("si2").onsubmit = function (e) {
            e.preventDefault();
            var em = $("s2e").value.trim(),
              pw = $("s2p").value,
              okE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em),
              okP = pw.length >= 8;
            $("s2e").classList.toggle("miss", !okE);
            $("s2p").classList.toggle("miss", !okP);
            if (!okE || !okP) {
              $("s2err").textContent = "Enter your email and password.";
              return;
            }
            var pend = {
              role: role,
              first: "Kayden",
              middle: "",
              last: "Johnson",
              email: em,
              mob: "07700 900123",
              roles: {},
              idv: "12/10/2026",
            };
            pend.roles[role] = true;
            pend.name = pend.first;
            codeStep(pend, true);
          };
          return;
        }
        var F = fgt;
        if (F.step === 0)
          el.innerHTML =
            top +
            '<form class="signin" id="fg" novalidate><h3 style="margin:0">Reset your password</h3><p class="muted" style="margin:0">Enter the email on your account and we’ll send you a code.</p><label>Email<input type="email" id="fge" autocomplete="email" value="' +
            esc(F.e || "") +
            '"></label><div><button type="button" class="btn ghost" id="fgfill" style="padding:8px 16px">Fill with example details (preview)</button></div><p class="pxerr" id="fgerr"></p><div><button class="btn" type="submit">Send reset code</button> <button type="button" class="lnkb" id="fgback">Back to sign in</button></div></form>';
        else if (F.step === 1)
          el.innerHTML =
            top +
            '<form class="signin" id="fg" novalidate><h3 style="margin:0">Check your email</h3><p class="muted" style="margin:0">If there’s an account for <b>' +
            esc(F.e) +
            '</b>, we’ve sent a 6-digit code. It expires after 10 minutes.</p><label>Code<input id="fgc" class="code" inputmode="numeric" maxlength="6" autocomplete="one-time-code"></label><label>New password<input type="password" id="fgp" autocomplete="new-password"></label><label>Confirm new password<input type="password" id="fgp2" autocomplete="new-password"></label><div><button type="button" class="btn ghost" id="fgfill" style="padding:8px 16px">Fill with example details (preview)</button></div><p class="pxerr" id="fgerr"></p><div><button class="btn" type="submit">Reset password</button> <button type="button" class="lnkb" id="fgback">Back to sign in</button></div></form>';
        else
          el.innerHTML =
            top +
            '<div class="rvdone" style="max-width:520px"><h3 style="margin:0 0 6px">Password changed</h3><p>You can now sign in with your new password. We’ve emailed you to confirm, in case it wasn’t you.</p><button type="button" class="btn" id="fgdone">Sign in</button></div>';
        el.querySelectorAll("[data-sm]").forEach(function (b) {
          b.onclick = function () {
            simode = b.dataset.sm;
            fgt = { step: 0 };
            profileView();
          };
        });
        if ($("fgback"))
          $("fgback").onclick = function () {
            simode = "in";
            profileView();
          };
        if ($("fgdone"))
          $("fgdone").onclick = function () {
            simode = "in";
            fgt = { step: 0 };
            profileView();
          };
        if ($("fgfill"))
          $("fgfill").onclick = function () {
            if ($("fge")) $("fge").value = "kayden@example.com";
            if ($("fgc")) {
              $("fgc").value = "482913";
              $("fgp").value = $("fgp2").value = "New-example-pass-1";
            }
          };
        if ($("fg"))
          $("fg").onsubmit = function (e) {
            e.preventDefault();
            if (F.step === 0) {
              var em = $("fge").value.trim();
              if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) {
                $("fge").classList.add("miss");
                $("fgerr").textContent = "Enter a valid email address.";
                return;
              }
              F.e = em;
              F.step = 1;
              siOther();
              return;
            }
            var c = $("fgc").value,
              a = $("fgp").value,
              b2 = $("fgp2").value,
              bad = 0;
            $("fgc").classList.toggle("miss", c !== "482913");
            $("fgp").classList.toggle("miss", a.length < 8);
            $("fgp2").classList.toggle("miss", a !== b2 || !b2);
            if (c !== "482913") {
              $("fgerr").textContent =
                "That code isn’t right, or it has expired.";
              return;
            }
            if (a.length < 8) {
              $("fgerr").textContent = "Use at least 8 characters.";
              return;
            }
            if (a !== b2) {
              $("fgerr").textContent = "The passwords don’t match.";
              return;
            }
            F.step = 2;
            siOther();
          };
      }
      return;
    }
    var tabs = PTABS[user.role];
    el.innerHTML =
      '<div class="row" style="align-items:center;margin-bottom:6px;flex-wrap:wrap"><h2 style="margin:0">Welcome, ' +
      esc(user.name || "there") +
      '</h2><span class="phl"><a class="lnk" href="#settings">Account settings</a><a class="lnk" href="#help">Help</a><a class="lnk" href="#refer">Refer a friend</a><button class="btn ghost" id="so" type="button">Sign out</button></span></div><p class="muted">' +
      (user.role === "buyer" ? "Buyer" : "Seller") +
      " account." +
      (user.role === "seller" && tierOf(tierCount())
        ? ' <span class="tchip tier-' +
          tierOf(tierCount())[0].toLowerCase() +
          '">★ ' +
          tierOf(tierCount())[0] +
          " Trusted Seller</span>"
        : "") +
      (user.role === "buyer"
        ? ' <button type="button" class="lnkb" id="smpt">' +
          (user.sample ? "Hide" : "Show") +
          " the sample purchase (preview)</button>"
        : " Sample data for preview.") +
      "</p>" +
      verHtml() +
      (user.role === "seller"
        ? '<div class="tierpv"><span class="muted small">Preview a seller account at each tier:</span>' +
          TIERS.map(function (t) {
            return (
              '<button type="button" class="chip tpv-' +
              t[0].toLowerCase() +
              '" data-tpv="' +
              t[0] +
              '" aria-pressed="' +
              (curAcct === t[0]) +
              '">' +
              t[0] +
              "</button>"
            );
          }).join("") +
          "</div>"
        : "") +
      roleHtml() +
      '<div class="tablist" role="tablist" aria-label="Profile" id="ptl" style="margin-top:26px">' +
      tabs
        .map(function (t) {
          return (
            '<button type="button" role="tab" class="tab" id="pt-' +
            t[0] +
            '" data-k="' +
            t[0] +
            '" aria-controls="pp" aria-selected="false" tabindex="-1">' +
            t[1] +
            (t[0] === "sv" && savedCount() ? " (" + savedCount() + ")" : "") +
            '<span class="tbadge" hidden></span>' +
            (t[0] === "ml"
              ? '<span class="gbadge" hidden title="Rewards to open"></span>'
              : "") +
            "</button>"
          );
        })
        .join("") +
      '</div><div role="tabpanel" id="pp"></div>';
    function show(k, focus) {
      ptab = k;
      if (k !== "ov" && NOTE[user.role]) {
        NOTE[user.role].forEach(function (n) {
          if (n[2] === k) seen[n[0]] = true;
        });
      }
      el.querySelectorAll("#ptl .tab").forEach(function (b) {
        var on = b.dataset.k === k;
        b.setAttribute("aria-selected", on);
        b.tabIndex = on ? 0 : -1;
        if (on && focus) b.focus();
      });
      var p = $("pp");
      p.setAttribute("aria-labelledby", "pt-" + k);
      p.innerHTML = pHtml(k);
      p.querySelectorAll("[data-go]").forEach(function (b) {
        b.onclick = function () {
          show(b.dataset.go, true);
        };
      });
      function badges() {
        var c = tabCounts();
        el.querySelectorAll("#ptl .tab").forEach(function (b) {
          var n = c[b.dataset.k] || 0,
            s = b.querySelector(".tbadge");
          s.textContent = n;
          s.hidden = !n;
          var g = b.querySelector(".gbadge");
          if (g) {
            var pn = perkCount();
            g.textContent = pn;
            g.hidden = !pn;
            g.setAttribute(
              "aria-label",
              pn + " reward" + (pn === 1 ? "" : "s") + " to open",
            );
            b.classList.toggle("both", !!(n && pn));
          }
        });
        updProf();
      }
      function again(id) {
        openVeh = id;
        var y = window.scrollY;
        show(ptab);
        window.scrollTo(0, y);
      }
      p.querySelectorAll("[data-gov]").forEach(function (b) {
        b.onclick = function () {
          openVeh = b.dataset.veh || null;
          show(b.dataset.gov, true);
        };
      });
      p.querySelectorAll("[data-lf]").forEach(function (b) {
        b.onclick = function () {
          lfilt = b.dataset.lf;
          if (ptab !== "li") show("li", true);
          else again(null);
        };
      });
      p.querySelectorAll(".vt-close").forEach(function (b) {
        b.onclick = function () {
          var d = b.closest("details");
          d.open = false;
          var r = d.getBoundingClientRect();
          if (r.top < 0) d.scrollIntoView({ block: "start" });
        };
      });
      p.querySelectorAll("details.mail").forEach(function (d) {
        d.addEventListener("toggle", function () {
          if (!d.open) return;
          var m = MAIL[user.role].filter(function (x) {
            return x.id === d.dataset.mid;
          })[0];
          if (m && m.u) {
            m.u = false;
            d.classList.remove("unread");
            var u = d.querySelector(".udot");
            if (u) u.remove();
            badges();
          }
        });
      });
      p.querySelectorAll("[data-cb]").forEach(function (b) {
        b.onclick = function () {
          var v = vById(b.dataset.cb);
          var was = v.st;
          v.st = "under";
          v.offer = null;
          v.want = null;
          v.rejn = 0;
          v.wdn = "";
          addMail("seller", {
            s:
              (was === "withdrawn"
                ? "Relisting requested: "
                : "Call back requested: ") + vname(v),
            b: "Thanks. One of our team will call you within 2 working days to agree a price you’re happy with.",
            veh: v.id,
            go: "li",
          });
          badges();
          again(v.id);
        };
      });
      function wdFlow(v) {
        var work = v.rr && v.rrst && v.rrst !== "booked";
        mdl(
          '<h2 style="margin:0 0 6px">Withdraw your ' +
            vname(v) +
            "?</h2><p>Your car comes off sale straight away" +
            (v.resv ? ", and the buyer’s reservation is cancelled" : "") +
            ".</p>" +
            (v.signed
              ? '<p><b class="imp">You signed our offer, so withdrawing now may mean paying our costs so far.</b></p>'
              : "") +
            (work
              ? "<p><b>The Retail Ready work has started, so we’ll invoice you " +
                gbp(rrFeeOf(v)) +
                " for the work already done.</b></p>"
              : v.rr
                ? "<p>The Retail Ready work hasn’t started, so there’s nothing to pay for it.</p>"
                : "") +
            '<p class="note small"><span class="todo">[Withdrawal terms and any charges to be approved by your solicitor.]</span></p><div class="pxnav"><button type="button" class="btn" id="wdok">Withdraw my car</button><button type="button" class="btn ghost" data-x>Keep it listed</button></div>',
          function (m) {
            m.querySelector("#wdok").onclick = function () {
              mdlX();
              v.st = "withdrawn";
              v.resv = false;
              v.wdn = work
                ? "An invoice for " +
                  gbp(rrFeeOf(v)) +
                  " for the Retail Ready work is in your mail."
                : "";
              addMail("seller", {
                s: "You’ve withdrawn your " + vname(v),
                b:
                  "Your car is no longer for sale." +
                  (work
                    ? " We’ve attached an invoice for " +
                      gbp(rrFeeOf(v)) +
                      " for the Retail Ready work already done."
                    : "") +
                  " If you change your mind, you can ask us to relist it.",
                veh: v.id,
                go: "li",
              });
              badges();
              again(v.id);
            };
          },
        );
      }
      p.querySelectorAll("[data-rej]").forEach(function (b) {
        b.onclick = function () {
          var v = vById(b.dataset.rej);
          mdl(
            '<h2 style="margin:0 0 6px">Turn down this offer?</h2><p class="muted">Our offer for your ' +
              vname(v) +
              " is " +
              gbp(v.offer) +
              '. Tell us why, and we’ll see what we can do.</p><div class="dmgf"><label class="full">Why are you turning it down?<select id="rjr"><option value="">Choose</option><option>I was hoping for more</option><option>I’ve sold it elsewhere</option><option>I’ve decided to keep it</option><option>Other</option></select></label><label class="full" id="rjp-l" hidden>What price were you hoping for? (£)<input id="rjp" inputmode="numeric"></label></div><p class="pxerr" id="rjerr"></p><div class="pxnav"><button type="button" class="btn" id="rjok">Turn down offer</button><button type="button" class="btn ghost" data-x>Keep the offer</button></div>',
            function (m) {
              var r = m.querySelector("#rjr");
              r.onchange = function () {
                m.querySelector("#rjp-l").hidden =
                  r.value !== "I was hoping for more";
                r.classList.remove("miss");
              };
              m.querySelector("#rjok").onclick = function () {
                var why = r.value,
                  pr = parseInt(
                    (m.querySelector("#rjp").value || "").replace(
                      /[,£\s]/g,
                      "",
                    ),
                    10,
                  );
                if (!why) {
                  r.classList.add("miss");
                  m.querySelector("#rjerr").textContent = "Choose a reason.";
                  return;
                }
                if (why === "I was hoping for more" && !(pr > v.offer)) {
                  m.querySelector("#rjp").classList.add("miss");
                  m.querySelector("#rjerr").textContent =
                    "Enter a price higher than our offer.";
                  return;
                }
                mdlX();
                v.rejn = (v.rejn || 0) + 1;
                if (
                  why === "I’ve sold it elsewhere" ||
                  why === "I’ve decided to keep it"
                ) {
                  v.st = "withdrawn";
                  v.wdn =
                    why === "I’ve sold it elsewhere"
                      ? "You told us you’d sold it elsewhere."
                      : "You told us you’re keeping it.";
                  addMail("seller", {
                    s: "Listing closed: " + vname(v),
                    b:
                      "Thanks for letting us know. We’ve taken your car off our list. " +
                      (why === "I’ve decided to keep it"
                        ? "If you change your mind, ask us to relist it."
                        : ""),
                    veh: v.id,
                    go: "li",
                  });
                } else {
                  v.st = "rejected";
                  if (pr) v.want = pr;
                  addMail("seller", {
                    s: "Offer turned down: " + vname(v),
                    b: v.want
                      ? "You told us you were hoping for " +
                        gbp(v.want) +
                        ". One of our team will call you within 2 working days to see if we can get closer."
                      : "Thanks for letting us know. If you’d like to talk again, ask us to call you back from Offers and payout.",
                    veh: v.id,
                    go: "po",
                  });
                }
                badges();
                again(v.id);
              };
            },
          );
        };
      });
      p.querySelectorAll("[data-revo]").forEach(function (b) {
        b.onclick = function () {
          var v = vById(b.dataset.revo);
          v.offer = Math.round((v.offer + v.want) / 2 / 50) * 50;
          v.st = "waiting";
          addMail("seller", {
            s: "Revised offer ready to sign: " + vname(v),
            b:
              "Thanks for talking it through. We’ve looked again and can offer " +
              gbp(v.offer) +
              ". It’s ready to sign in Offers and payout.",
            veh: v.id,
            go: "po",
          });
          badges();
          again(v.id);
        };
      });
      p.querySelectorAll("[data-onfile]").forEach(function (b) {
        b.onclick = function () {
          var v = vById(b.dataset.onfile);
          v.onfile = true;
          again(v.id);
        };
      });
      p.querySelectorAll("[data-wdx]").forEach(function (b) {
        b.onclick = function () {
          var v = vById(b.dataset.wdx);
          v.st = "withdrawn";
          v.wdn = "You withdrew your listing after turning down our offers.";
          addMail("seller", {
            s: "Listing withdrawn: " + vname(v),
            b: "Your car has been taken off our list. If you change your mind, ask us to relist it.",
            veh: v.id,
            go: "li",
          });
          badges();
          again(v.id);
        };
      });
      p.querySelectorAll("[data-hd]").forEach(function (b) {
        b.onclick = function () {
          var v = vById(b.dataset.hd);
          mdl(
            '<h2 style="margin:0 0 6px">Request a hot-deal slot</h2><p class="muted">Choose the extra that comes with your ' +
              vname(v) +
              '. Hot deals show on the home page and the Hot deals page.</p><div class="rrc" style="grid-template-columns:1fr">' +
              [
                "£250 towards the buyer’s finance deposit",
                "Free Pre-Delivery Assurance Pack",
                "Half-price warranty",
              ]
                .map(function (o, n) {
                  return (
                    '<label class="rrcard"><input type="radio" name="hdt" value="' +
                    o +
                    '"' +
                    (n ? "" : " checked") +
                    '><span class="rrk">' +
                    o +
                    "</span></label>"
                  );
                })
                .join("") +
              '</div><p class="note small">Who pays for the extra, and how it affects your net amount, is agreed with you first. <span class="todo">[Hot-deal funding and terms to be confirmed.]</span></p><div class="pxnav"><button type="button" class="btn" id="hdgo">Send request</button><button type="button" class="btn ghost" data-x>Cancel</button></div>',
            function (m) {
              m.querySelector("#hdgo").onclick = function () {
                var t = (m.querySelector("input[name=hdt]:checked") || {})
                  .value;
                mdlX();
                v.hd = { t: t, st: "requested" };
                addMail("seller", {
                  s: "Hot-deal slot requested: " + vname(v),
                  b:
                    "Thanks. You asked for: " +
                    t +
                    ". As a Gold seller you get first pick of slots, and we’ll confirm within 1 working day.",
                  veh: v.id,
                  go: "li",
                });
                badges();
                again(v.id);
              };
            },
          );
        };
      });
      p.querySelectorAll("[data-hdok]").forEach(function (b) {
        b.onclick = function () {
          var v = vById(b.dataset.hdok);
          v.hd.st = "live";
          addMail("seller", {
            s: "Your " + vname(v) + " is now a hot deal",
            b:
              "Your car is live as a hot deal until " +
              ENDS +
              ", with: " +
              v.hd.t +
              ".",
            veh: v.id,
            go: "li",
          });
          badges();
          again(v.id);
        };
      });
      p.querySelectorAll("[data-rrpay]").forEach(function (b) {
        b.onclick = function () {
          var v = vById(b.dataset.rrpay),
            me = b;
          me.disabled = true;
          me.textContent = "Processing…";
          setTimeout(function () {
            v.rrpaid = true;
            v.rrdue = false;
            addMail("seller", {
              s: "Receipt: Retail Ready fee, " + vname(v),
              b:
                "Thanks. We’ve received " +
                gbp(rrFeeOf(v)) +
                ". When your car sells, you receive the full " +
                gbp(rrNet(v)) +
                ".",
              veh: v.id,
              go: "li",
              u: false,
            });
            badges();
            again(v.id);
          }, 900);
        };
      });
      p.querySelectorAll("[data-wd]").forEach(function (b) {
        b.onclick = function () {
          wdFlow(vById(b.dataset.wd));
        };
      });
      p.querySelectorAll("[data-rradv]").forEach(function (b) {
        b.onclick = function () {
          var v = vById(b.dataset.rradv);
          v.rrst = v.rrst === "booked" ? "work" : "done";
          if (v.rrst === "done")
            addMail("seller", {
              s: "Retail Ready done: your " + vname(v) + " is live",
              b: "The preparation is finished and your car is now listed at retail standard. Before-and-after photos are in your listing.",
              veh: v.id,
              go: "li",
            });
          badges();
          again(v.id);
        };
      });
      p.querySelectorAll("[data-rrup]").forEach(function (b) {
        b.onclick = function () {
          var v = vById(b.dataset.rrup);
          finalFig(v, true, true, function () {
            v.rr = true;
            v.rrst = "booked";
            v.rrfee = myRrFee();
            addMail("seller", {
              s: "Retail Ready booked: " + vname(v),
              b:
                "Thanks. We’ll call you within 2 working days to book the preparation at a time that suits you. Your agreed amount is now " +
                gbp(rrNet(v)) +
                ": " +
                gbp(v.net) +
                " plus " +
                gbp(RR_UP) +
                ", less the " +
                gbp(rrFeeOf(v)) +
                " pack fee from your sale proceeds.",
              veh: v.id,
              go: "li",
            });
            badges();
            again(v.id);
          });
        };
      });
      p.querySelectorAll("[data-fx]").forEach(function (b) {
        b.onclick = function () {
          var v = vById(b.dataset.v),
            k = b.dataset.fx;
          if (k === "wd") {
            wdFlow(v);
            return;
          }
          if (k === "pay") {
            v.net -= v.fault.c;
            v.fault.done =
              "Repair approved: " +
              gbp(v.fault.c) +
              " comes out of your sale proceeds, and the Retail Ready work carries on.";
          } else {
            v.net -= v.fault.l;
            v.fault.done =
              "You chose to sell it as it is. Your agreed price is now " +
              gbp(v.net) +
              ", and we’ve finished the rest of the Retail Ready work.";
          }
          addMail("seller", {
            s: "Decision received: " + vname(v),
            b: v.fault.done,
            veh: v.id,
            go: "li",
          });
          badges();
          again(v.id);
        };
      });
      p.querySelectorAll("[data-slow]").forEach(function (b) {
        b.onclick = function () {
          var v = vById(b.dataset.v);
          v.slow = false;
          if (b.dataset.slow === "low") {
            v.net -= 250;
            addMail("seller", {
              s: "Price lowered: " + vname(v),
              b:
                "Your agreed amount is now " +
                gbp(v.net) +
                ". We’ve refreshed your listing so more buyers see it.",
              veh: v.id,
              go: "li",
            });
          }
          badges();
          again(v.id);
        };
      });
      p.querySelectorAll("[data-ia]").forEach(function (b) {
        b.onclick = function () {
          var v = vById(b.dataset.ia);
          v.net = v.insp.n;
          v.inspd =
            "You accepted the revised amount of " +
            gbp(v.net) +
            " after the inspection.";
          v.insp = null;
          v.prog = Math.max(v.prog, 3);
          addMail("seller", {
            s: "Revised amount accepted: " + vname(v),
            b: v.inspd + " The sale carries on as normal.",
            veh: v.id,
            go: "po",
          });
          badges();
          again(v.id);
        };
      });
      p.querySelectorAll("[data-id]").forEach(function (b) {
        b.onclick = function () {
          var v = vById(b.dataset.id);
          v.insp = null;
          v.st = "withdrawn";
          v.wdn =
            "You declined the revised amount after the inspection. We’ll be in touch to return your car.";
          addMail("seller", {
            s: "Sale cancelled: " + vname(v),
            b: "You declined the revised amount after the inspection, so the sale won’t go ahead. We’ll call you to arrange returning your car.",
            veh: v.id,
            go: "li",
          });
          badges();
          again(v.id);
        };
      });
      p.querySelectorAll("[data-bkfix]").forEach(function (b) {
        b.onclick = function () {
          user.bank = null;
          bankNudge = true;
          again(null);
          window.scrollTo(0, 0);
        };
      });
      p.querySelectorAll("[data-pv]").forEach(function (b) {
        b.onclick = function () {
          var v = vById(b.dataset.v),
            k = b.dataset.pv;
          if (k === "sres") {
            v.resv = true;
            addMail("seller", {
              s: "Your " + vname(v) + " has been reserved",
              b:
                "A buyer has paid to reserve your car for " +
                HOLD_DEP +
                " days. We’ll let you know as soon as they complete. While it’s reserved, the Retail Ready upgrade isn’t available.",
              veh: v.id,
              go: "li",
            });
          }
          if (k === "send") {
            v.resv = false;
            addMail("seller", {
              s: "The reservation on your " + vname(v) + " has ended",
              b:
                "The buyer didn’t go ahead, so your car is back on sale. Nothing changes for you" +
                (v.rr
                  ? "."
                  : ", and you can upgrade to Retail Ready again if you’d like."),
              veh: v.id,
              go: "li",
            });
          }
          if (k === "ssold") {
            v.resv = false;
            v.st = "sold";
            v.prog = 2;
            v.sd = new Date().toLocaleDateString("en-GB");
            v.sc = "wait";
            addMail("seller", {
              s: "Your " + vname(v) + " has sold",
              b: "Good news: the buyer has committed. Next comes the AA or RAC inspection. The buyer’s payment is then held safely and released to you after the handover. Please sign the sale contract in Documents." + (function () { var nt = nextTier(); return nt && tierCount() + 1 === nt[1] ? " Signing it makes you a " + nt[0] + " Trusted Seller." : ""; })(),
              veh: v.id,
              go: "dc",
            });
          }
          if (k === "sfault") {
            v.fault = {
              d: "Our technician found the front brake discs and pads are below the safe limit",
              c: 350,
              l: 400,
            };
            addMail("seller", {
              s: "We found something on your " + vname(v),
              b: "During the Retail Ready preparation we found the front brakes need replacing. Choose what you’d like us to do in My listings.",
              veh: v.id,
              go: "li",
            });
          }
          if (k === "sunsold") {
            v.rrdue = true;
            addMail("seller", {
              s: "Retail Ready fee due: " + vname(v),
              b:
                "Your car hasn’t sold within 60 days, so the " +
                gbp(rrFeeOf(v)) +
                " Retail Ready fee is now due. Pay it from My listings. Your car stays listed.",
              veh: v.id,
              go: "li",
            });
          }
          if (k === "sslow") {
            v.slow = true;
            addMail("seller", {
              s: "Your " + vname(v) + " hasn’t sold yet",
              b: "It’s been listed for 30 days. You can lower your price to sell faster, or keep it as it is.",
              veh: v.id,
              go: "li",
            });
          }
          if (k === "insp") {
            v.insp = {
              d: "The mileage is 2,100 higher than you declared and a rear light is cracked",
              n: v.net - 450,
            };
            addMail("seller", {
              s: "Inspection result: " + vname(v),
              b: "The inspection found a difference from your declaration. Please review the revised amount in Offers and payout.",
              veh: v.id,
              go: "po",
            });
          }
          if (k === "pfail") {
            v.pfail = true;
            addMail("seller", {
              s: "Your payout couldn’t be sent: " + vname(v),
              b: "Your bank returned the payment. Please check your payout account in Offers and payout and we’ll send it again.",
              veh: v.id,
              go: "po",
            });
          }
          badges();
          again(v.id);
        };
      });
      p.querySelectorAll("[data-dsign]").forEach(function (b) {
        b.onclick = function () {
          var v = vById(b.dataset.dsign),
            t0 = tierOf(tierCount());
          v.sc = "signed";
          var t1 = tierOf(tierCount());
          badges();
          again(v.id);
          if (t1 && (!t0 || t0[0] !== t1[0]))
            setTimeout(function () {
              tierUp(t0, t1);
            }, 250);
        };
      });
      p.querySelectorAll("[data-sign]").forEach(function (b) {
        b.onclick = function () {
          var v = vById(b.dataset.sign),
            box = b.closest(".offerl"),
            bad = 0;
          if (!user.idv) {
            openVeh = v.id;
            ptab = "po";
            needId("#profile");
            return;
          }
          ["c1", "c2", "c3"].forEach(function (c) {
            var x = box.querySelector("[data-" + c + "]"),
              ok = x.checked;
            $(c + "-" + v.id).classList.toggle("miss", !ok);
            if (!ok) bad++;
          });
          var sg = box.querySelector("[data-sig]"),
            nm = sg.value.trim(),
            okn = nm.indexOf(" ") > 0;
          sg.classList.toggle("miss", !okn);
          if (!okn) bad++;
          var rr =
            (box.querySelector("input[name=rr-" + v.id + "]:checked") || {})
              .value === "yes";
          var mg =
            (box.querySelector("input[name=mg-" + v.id + "]:checked") || {})
              .value !== "no";
          if (rr && !box.querySelector("[data-c4]").checked) {
            $("c4-" + v.id).classList.add("miss");
            bad++;
          }
          if (mg && !box.querySelector("[data-c5]").checked) {
            $("c5-" + v.id).classList.add("miss");
            bad++;
          }
          if (bad) {
            box.querySelector("[data-err]").textContent =
              "Tick the highlighted boxes and type your full name to sign.";
            return;
          }
          finalFig(
            v,
            rr,
            false,
            function () {
              v.mg = mg;
              v.rr = rr;
              v.net = mg ? v.offer : noG(v);
              v.st = "live";
              v.prog = 1;
              v.signed = nm;
              if (rr) {
                v.rrst = "booked";
                v.rrfee = myRrFee();
              }
              if (!user.bank) bankNudge = true;
              addMail("seller", {
                s:
                  "Offer signed: your " +
                  vname(v) +
                  (rr ? " is booked in for Retail Ready" : " is now live"),
                b:
                  "Thanks, " +
                  esc(user.first || "") +
                  ". Your net amount of " +
                  gbp(rr ? rrNet(v) : v.net) +
                  " is agreed" +
                  (rr
                    ? ", after the " +
                      gbp(rrFeeOf(v)) +
                      " pack fee. We’ll call you within 2 working days to book the preparation, and your car goes live as soon as it’s done."
                    : " and your car is now listed. We’ll let you know when it sells.") +
                  (user.bank
                    ? ""
                    : " Next, add your payout account so we can pay you."),
                u: false,
                veh: v.id,
                go: "li",
              });
              ptab = "po";
              badges();
              again(null);
              window.scrollTo(0, 0);
            },
            mg,
          );
        };
      });
      p.querySelectorAll(
        "[data-rrf] input[type=radio],[data-mgf] input[type=radio]",
      ).forEach(function (r) {
        r.onchange = function () {
          var box = r.closest(".offerl"),
            v = vById(box.querySelector("[data-sign]").dataset.sign),
            rr = box.querySelector("[data-rrf] input[value=yes]").checked,
            mg = box.querySelector("[data-mgf] input[value=yes]").checked;
          box.querySelector("[data-c4l]").hidden = !rr;
          box.querySelector("[data-c5l]").hidden = !mg;
          box.querySelectorAll(".rrcard").forEach(function (c) {
            c.classList.toggle("on", c.querySelector("input").checked);
          });
          var y = $("yr-" + v.id);
          y.textContent = gbp(
            (mg ? v.offer : noG(v)) + (rr ? RR_UP - myRrFee() : 0),
          );
          y.classList.remove("ypop");
          void y.offsetWidth;
          y.classList.add("ypop");
        };
      });
      p.querySelectorAll("[data-trk]").forEach(function (b) {
        b.onclick = function () {
          myPur.track = true;
          again(null);
        };
      });
      p.querySelectorAll("[data-pp]").forEach(function (b) {
        b.onclick = function () {
          var P = myPur;
          if (b.dataset.pp === "rem") {
            addMail("buyer", {
              s: "Tomorrow: your " + carNm(P.i),
              b:
                "Your " +
                P.del.type.toLowerCase() +
                " is tomorrow, " +
                P.del.slot.toLowerCase() +
                ". Bring your driving licence. We’ll text you when the driver is on the way.",
              go: "pu",
            });
            badges();
            b.textContent = "Reminder sent to your mail";
          } else {
            P.ho = true;
            P.track = true;
            again(null);
            setTimeout(function () {
              var x = $("hob");
              if (x) x.scrollIntoView({ block: "start", behavior: "smooth" });
            }, 40);
          }
        };
      });
      if ($("hogo"))
        $("hogo").onclick = function () {
          var bad = 0;
          ["h1", "h2", "h3", "h4"].forEach(function (k) {
            var ok = $(k).checked;
            $(k + "-l").classList.toggle("miss", !ok);
            if (!ok) bad++;
          });
          var sg = $("hsig").value.trim(),
            sok = sg.indexOf(" ") > 0;
          $("hsig").classList.toggle("miss", !sok);
          if (!sok) bad++;
          if (bad) {
            $("hoerr").textContent =
              "Check everything, tick each box and type your full name.";
            return;
          }
          var P = myPur;
          P.stage = 3;
          P.ho = false;
          P.hoDate = new Date().toLocaleDateString("en-GB");
          P.retBy = addDays(14);
          addMail("buyer", {
            s: "It’s yours: " + carNm(P.i),
            b:
              "Handover complete. Your documents, including the handover report" +
              (P.wt ? " and warranty certificate" : "") +
              ", are in Documents. You have until " +
              P.retBy +
              " if you change your mind.",
            go: "pu",
          });
          badges();
          again(null);
          window.scrollTo(0, 0);
        };
      if ($("retgo"))
        $("retgo").onclick = function () {
          var P = myPur;
          mdl(
            '<h2 style="margin:0 0 6px">Return your ' +
              carNm(P.i) +
              '?</h2><p class="muted">You can cancel within 14 days of handover. We’ll collect the car and refund you.</p><div class="dmgf"><label class="full">Why are you returning it?<select id="rtr"><option value="">Choose</option><option>I’ve changed my mind</option><option>There’s a fault</option><option>It’s not as described</option><option>Other</option></select></label></div><label class="agree" id="rtc-l"><input type="checkbox" id="rtc"><span>The car is in the same condition as when I got it, apart from normal use.</span></label><p class="note small">If there’s a fault, you may have extra rights. <span class="todo">[Refund amount, any deduction for use or mileage, collection cost and timescales to be confirmed by your solicitor.]</span></p><p class="pxerr" id="rterr"></p><div class="pxnav"><button type="button" class="btn" id="rtok">Request return</button><button type="button" class="btn ghost" data-x>Keep my car</button></div>',
            function (m) {
              m.querySelector("#rtok").onclick = function () {
                var r = m.querySelector("#rtr"),
                  c2 = m.querySelector("#rtc");
                if (!r.value || !c2.checked) {
                  r.classList.toggle("miss", !r.value);
                  m.querySelector("#rtc-l").classList.toggle(
                    "miss",
                    !c2.checked,
                  );
                  m.querySelector("#rterr").textContent =
                    "Choose a reason and tick the box.";
                  return;
                }
                mdlX();
                P.ret = { why: r.value, date: wkDays(3)[2] };
                addMail("buyer", {
                  s: "Return requested: " + carNm(P.i),
                  b:
                    "We’ve received your request. We’ll collect the car on " +
                    P.ret.date +
                    ". Your refund is paid within 14 days of us getting it back.",
                  go: "pu",
                });
                badges();
                again(null);
              };
            },
          );
        };
      p.querySelectorAll("[data-star]").forEach(function (b) {
        b.onclick = function () {
          myPur.star = +b.dataset.star;
          p.querySelectorAll("[data-star]").forEach(function (x) {
            x.setAttribute("aria-pressed", +x.dataset.star <= myPur.star);
          });
        };
      });
      if ($("revgo"))
        $("revgo").onclick = function () {
          myPur.rev = { s: myPur.star || 0, t: $("revt").value };
          again(null);
        };
      if ($("pucx"))
        $("pucx").onclick = function () {
          var P = myPur;
          mdl(
            '<h2 style="margin:0 0 6px">Cancel this purchase?</h2><p>' +
              (P.stage === 1
                ? "You’ve paid, so we’ll refund what you paid within 14 days."
                : "Nothing has been paid yet.") +
              (P.res
                ? " Your " +
                  gbp(RES_DEP) +
                  " reservation isn’t refunded if you cancel because you’ve changed your mind."
                : "") +
              ' <span class="todo">[Cancellation terms to be approved by your solicitor.]</span></p><div class="pxnav"><button type="button" class="btn" id="pcok">Cancel purchase</button><button type="button" class="btn ghost" data-x>Keep it</button></div>',
            function (m) {
              m.querySelector("#pcok").onclick = function () {
                mdlX();
                var k = P.i;
                delete reserved[k];
                resv = resv.filter(function (r) {
                  return r.i !== k || r.v === "deal";
                });
                myPur = null;
                payTok = null;
                addMail("buyer", {
                  s: "Purchase cancelled: " + carNm(k),
                  b:
                    (P.stage === 1
                      ? "We’ll refund what you paid to your card within 14 days."
                      : "There’s nothing more to pay.") +
                    " The car is back on sale.",
                  href: "#car-" + k,
                  hl: "View the car",
                });
                badges();
                again(null);
              };
            },
          );
        };
      badges();
      if (ptab === "po")
        wireBank(p, function () {
          again(null);
          var vc = el.querySelector(".vchips");
          if (vc) vc.outerHTML = verHtml();
        });
      if (ptab === "rv") {
        countUp(p);
        if ($("refcp"))
          $("refcp").onclick = function () {
            var t = $("refc").textContent,
              b = this;
            var done = function () {
              b.textContent = "Copied";
            };
            try {
              navigator.clipboard.writeText(t).then(done, function () {});
            } catch (x) {}
            done();
          };
      }
      if (openVeh) {
        var od = p.querySelector('details[data-vid="' + openVeh + '"]');
        openVeh = null;
        if (od) {
          od.open = true;
          setTimeout(function () {
            od.scrollIntoView({ block: "start", behavior: "smooth" });
          }, 30);
        }
      }
      p.querySelectorAll("[data-pxstart]").forEach(function (b) {
        b.onclick = function () {
          pxDraft = {
            needDetails: true,
            shots: {},
            ev: {},
            dmg: [],
            none: false,
            step: 0,
          };
          pxRet = null;
          location.hash = "#px";
        };
      });
      p.querySelectorAll("input[data-u]").forEach(function (x) {
        x.onchange = function () {
          if (x.files && x.files[0]) {
            upl[x.dataset.u] = x.files[0].name;
            keep(x.dataset.u);
          }
        };
      });
      p.querySelectorAll("button[data-pay]").forEach(function (b) {
        b.onclick = function () {
          upm.pay = b.dataset.pay;
          keep("[data-pay=" + b.dataset.pay + "]");
        };
      });
      p.querySelectorAll("[data-f]").forEach(function (x) {
        x.oninput = x.onchange = function () {
          upf[x.dataset.f] = x.value;
          if (x.dataset.f === "fullname") {
            upf.nameok = false;
            var c = p.querySelector("[data-chk=nameok]");
            if (c) c.checked = false;
          }
        };
      });
      p.querySelectorAll("[data-chk]").forEach(function (x) {
        x.onchange = function () {
          upf[x.dataset.chk] = x.checked;
        };
      });
      function keep() {
        var y = window.scrollY;
        p.innerHTML = pHtml(ptab);
        show(ptab);
        window.scrollTo(0, y);
      }
    }
    el.querySelectorAll("#ptl .tab").forEach(function (b) {
      b.onclick = function () {
        show(b.dataset.k);
      };
    });
    $("ptl").onkeydown = function (e) {
      var ks = tabs.map(function (t) {
          return t[0];
        }),
        n = ks.indexOf(ptab);
      if (e.key === "ArrowRight") n = (n + 1) % ks.length;
      else if (e.key === "ArrowLeft") n = (n + ks.length - 1) % ks.length;
      else return;
      e.preventDefault();
      show(ks[n], true);
    };
    show(
      tabs.some(function (t) {
        return t[0] === ptab;
      })
        ? ptab
        : "ov",
    );
    $("so").onclick = function () {
      user = null;
      ptab = "ov";
      updProf();
      profileView();
    };
    el.querySelectorAll("[data-tpv]").forEach(function (b) {
      b.onclick = function () {
        useAcct(b.dataset.tpv);
        updProf();
        profileView();
        var c = el.querySelector(".tchip");
        if (c) {
          c.classList.remove("tup");
          void c.offsetWidth;
          c.classList.add("tup");
        }
      };
    });
    if ($("smpt"))
      $("smpt").onclick = function () {
        user.sample = !user.sample;
        updProf();
        profileView();
      };
    if ($("idgo"))
      $("idgo").onclick = function () {
        after = "#profile";
        location.hash = "#verify";
      };
    el.querySelectorAll("[data-sw]").forEach(function (b) {
      b.onclick = function () {
        if (user.role === b.dataset.sw) return;
        user.role = b.dataset.sw;
        ptab = "ov";
        updProf();
        profileView();
      };
    });
    if ($("addrole"))
      $("addrole").onclick = function () {
        $("addp").hidden = false;
        this.hidden = true;
        $("addok").focus();
      };
    if ($("addno"))
      $("addno").onclick = function () {
        $("addp").hidden = true;
        $("addrole").hidden = false;
      };
    if ($("addok"))
      $("addok").onclick = function () {
        var o = user.role === "buyer" ? "seller" : "buyer";
        user.roles[o] = true;
        user.role = o;
        ptab = "ov";
        updProf();
        profileView();
      };
  }

  /* part exchange valuation */
  var PXSHOTS = [
    [
      "front",
      "Front",
      "Stand back so the whole front is in shot, with the number plate readable.",
    ],
    ["rear", "Rear", "The whole rear of the car, number plate readable."],
    ["ds", "Driver’s side", "The full side of the car, straight on."],
    ["ps", "Passenger side", "The full side of the car, straight on."],
    [
      "int",
      "Interior",
      "From the open driver’s door, showing the dashboard and front cabin.",
    ],
    ["rs", "Rear seats", "All of the rear seats, from an open rear door."],
    ["fps", "Front passenger seat", "The whole seat, including the bolsters."],
    [
      "dsv",
      "Driver’s seat",
      "The whole seat, including the bolsters and the wear edge.",
    ],
    ["bon", "Under the bonnet", "Bonnet fully open, whole engine bay in shot."],
    ["boot", "In the boot", "Boot open, floor and sides visible."],
    [
      "a1",
      "Alloy: front driver’s side",
      "The whole wheel, face on, including the tyre.",
    ],
    [
      "a2",
      "Alloy: front passenger side",
      "The whole wheel, face on, including the tyre.",
    ],
    [
      "a3",
      "Alloy: rear driver’s side",
      "The whole wheel, face on, including the tyre.",
    ],
    [
      "a4",
      "Alloy: rear passenger side",
      "The whole wheel, face on, including the tyre.",
    ],
    [
      "dash1",
      "Dashboard, engine running",
      "Engine on. The mileage and any warning lights must be clearly readable.",
    ],
    [
      "dash2",
      "Dashboard, ancillaries only",
      "Ignition at the first position with the engine off, so the warning lights show.",
    ],
  ];
  function pxEvidence(D) {
    var e = [];
    e.push([
      "keys",
      "All " + (D.keys === "1" ? "1 key" : D.keys + " keys") + " together",
      "One photo showing every key you said comes with the car.",
    ]);
    if (D.sv !== "None")
      e.push([
        "sv",
        "Service history",
        "The service book stamps or invoices that back up “" + D.sv + "”.",
      ]);
    if (D.v5 === "Yes")
      e.push(["v5", "V5C logbook", "The front page, showing your name."]);
    if (D.pr === "Yes")
      e.push([
        "pr",
        "Private registration",
        "The plate on the car, or your V750 or V778 certificate.",
      ]);
    return e;
  }
  function pxProfile() {
    var intro =
      '<p class="muted" style="max-width:640px">Value your car here and it’s saved to your profile, ready to use on any car you look at. You can save more than one to see which is worth the most.</p>';
    if (!pxList.length)
      return (
        intro +
        '<p><button type="button" class="btn" data-pxstart>Begin part exchange</button></p><p class="note">It takes about 15 minutes: your car’s details, guided photos, a short engine video, a damage check and a signed declaration.</p>'
      );
    var top = Math.max.apply(
      null,
      pxList.map(function (x) {
        return x.val;
      }),
    );
    return (
      intro +
      pxList
        .map(function (P) {
          return (
            '<div class="pxcard" style="max-width:640px"><b class="reg">' +
            esc(P.reg) +
            "</b>" +
            (pxList.length > 1 && P.val === top
              ? ' <em class="rec">Highest estimate</em>'
              : "") +
            '<div class="row" style="margin:8px 0"><span>Ballpark estimate today</span><b>' +
            gbp(P.val) +
            "</b></div>" +
            (P.fn === "Yes" && parseFloat(P.settle) > P.val
              ? '<p class="negq" style="margin:0 0 8px">You owe ' +
                gbp(parseFloat(P.settle) - P.val) +
                " more than this estimate. If you use it, the difference is added to the price of your next car.</p>"
              : "") +
            '<details class="vf" style="margin-top:8px"><summary>What you told us</summary><div>' +
            dls([
              ["Mileage", esc(P.mi)],
              ["Keys", esc(P.keys)],
              ["Service history", esc(P.sv)],
              ["Previous owners", esc(P.ow)],
              ["V5C in your name", esc(P.v5)],
              ["Private reg", esc(P.pr)],
              [
                "Finance owed",
                P.fn === "Yes"
                  ? "Yes, settlement £" + esc(P.settle || "")
                  : "No",
              ],
              ["Photos", Object.keys(P.shots).length + " of " + PXSHOTS.length],
              ["Engine video", P.video ? "Added" : "Missing"],
              [
                "Damage declared",
                P.none
                  ? "None"
                  : P.dmg
                      .map(function (d) {
                        return (
                          esc(d.area) + ": " + esc(d.type) + ". " + esc(d.note)
                        );
                      })
                      .join("<br>"),
              ],
              ["Declaration", "Signed by " + esc(P.signed) + " on " + P.date],
            ]) +
            "</div></details></div>"
          );
        })
        .join("") +
      '<p><button type="button" class="btn" data-pxstart>Add another vehicle</button></p><p class="note">Part exchange values move with the market, so estimates can change between visits. To use one, open any car and choose “Add part exchange vehicle”. Preview only: nothing is stored.</p>'
    );
  }
  function pxView() {
    var el = $("px-body"),
      D = pxDraft;
    if (!D) {
      el.innerHTML =
        '<a class="back" href="#buy">Back to cars</a><h2>Part exchange valuation</h2><p class="muted">Start from a car page: open “Part exchange your car”, fill in your car’s details and choose Proceed.</p>';
      return;
    }
    if (!user) {
      after = "#px";
      location.hash = "#profile";
      return;
    }
    var N = PXSHOTS.length,
      O = D.needDetails ? 1 : 0,
      T = N + 4 + O,
      toCar = pxRet != null && cars[pxRet],
      SL = !!D.seller,
      back = toCar ? "#car-" + pxRet : SL ? "#sell" : "#profile";
    function fileBtn(id, label, accept, cap) {
      return (
        '<label class="fup" id="' +
        id +
        '-l">' +
        label +
        '<input type="file" id="' +
        id +
        '" accept="' +
        accept +
        '"' +
        (cap ? ' capture="environment"' : "") +
        "></label>"
      );
    }
    function draw() {
      var n = D.step,
        h =
          '<a class="back" href="' +
          back +
          '">' +
          (toCar
            ? "Back to the car"
            : SL
              ? "Back to selling"
              : "Back to your profile") +
          '</a><div class="pxw"><h2 style="margin-bottom:4px">' +
          (SL ? "Your listing" : "Part exchange") +
          (D.reg ? ": " + esc(D.reg) : "") +
          '</h2><div class="bar" aria-hidden="true"><i style="width:' +
          Math.round((n / T) * 100) +
          '%"></i></div><p class="note" style="margin:0 0 18px">Step ' +
          (n + 1) +
          " of " +
          T +
          "</p>";
      var m = n - O,
        fv = function (k) {
          return esc(D[k] == null ? "" : D[k]);
        },
        fs = function (k, list) {
          return (
            '<select id="w-' +
            k +
            '"><option value="">Choose</option>' +
            list
              .map(function (o) {
                return (
                  "<option" +
                  (D[k] === o ? " selected" : "") +
                  ">" +
                  o +
                  "</option>"
                );
              })
              .join("") +
            "</select>"
          );
        };
      if (m < 0) {
        h +=
          '<h3>Your car’s details</h3><p class="muted">Tell us what the car is and what comes with it. We’ll ask for a photo of anything you say yes to.</p><div class="dmgf">' +
          '<label>Registration<input id="w-reg" maxlength="12" autocomplete="off" style="text-transform:uppercase" value="' +
          fv("reg") +
          '"></label><label>Mileage<input id="w-mi" inputmode="numeric" value="' +
          fv("mi") +
          '"></label>' +
          "<label>Keys" +
          fs("keys", ["1", "2", "3 or more"]) +
          "</label><label>Service history" +
          fs("sv", ["Full", "Partial", "None"]) +
          "</label>" +
          '<label>Previous owners<input id="w-ow" inputmode="numeric" value="' +
          fv("ow") +
          '"></label><label>Is the V5C in your name?' +
          fs("v5", ["Yes", "No"]) +
          "</label>" +
          "<label>Private reg on the car?" +
          fs("pr", ["No", "Yes"]) +
          "</label><label>Finance still owed?" +
          fs("fn", ["No", "Yes"]) +
          "</label>" +
          '<label class="full">' +
          (SL
            ? "Your asking price (£)"
            : "What you’re hoping to get for it (£)") +
          '<input id="w-val" inputmode="numeric" value="' +
          fv("val") +
          '"></label></div><p style="margin:12px 0 0"><button type="button" class="btn ghost" id="wfill" style="padding:8px 16px">Fill with example details (preview)</button></p>';
      } else if (m < N) {
        var S = PXSHOTS[m],
          got = D.shots[S[0]];
        h +=
          "<h3>Photo " +
          (m + 1) +
          " of " +
          N +
          ": " +
          S[1] +
          '</h3><p class="muted">' +
          S[2] +
          '</p><div class="shotbox" id="box">' +
          fileBtn(
            "pf",
            got ? "Retake photo" : "Take or choose photo",
            "image/*",
            true,
          ) +
          (got ? '<span class="got">Added: ' + esc(got) + "</span>" : "") +
          '<p class="note small" style="margin:14px 0 0"><button type="button" class="lnkb" id="smp">Use a sample photo (preview only)</button></p></div><p class="small" style="margin:0"><button type="button" class="lnkb" id="smpall">Use example photos for all ' +
          N +
          " and skip ahead (preview)</button></p>";
      } else if (m === N) {
        h +=
          '<h3>Engine video</h3><p class="muted">About 10 seconds, with the engine running and the bonnet open, so we can hear it.</p><div class="shotbox" id="box">' +
          fileBtn(
            "pf",
            D.video ? "Replace video" : "Record or choose video",
            "video/*",
            true,
          ) +
          (D.video
            ? '<span class="got">Added: ' + esc(D.video) + "</span>"
            : "") +
          '<p class="note small" style="margin:14px 0 0"><button type="button" class="lnkb" id="smp">Use a sample video (preview only)</button></p></div>';
      } else if (m === N + 1) {
        h +=
          '<h3>Proof of what comes with the car</h3><p class="muted">You told us these come with the car, so we need a photo of each. They must be handed over with it.</p>' +
          pxEvidence(D)
            .map(function (e) {
              var g = D.ev[e[0]];
              return (
                '<div class="evrow" id="ev-' +
                e[0] +
                '"><div><b>' +
                e[1] +
                "</b><small>" +
                e[2] +
                "</small>" +
                (g
                  ? '<small style="color:var(--ok)">Added: ' +
                    esc(g) +
                    "</small>"
                  : "") +
                '</div><div><label class="fup" style="border:1px solid var(--line);border-radius:999px;padding:7px 16px;cursor:pointer;position:relative;display:inline-block">' +
                (g ? "Replace" : "Add photo") +
                '<input type="file" data-ev="' +
                e[0] +
                '" accept="image/*" style="position:absolute;opacity:0;width:1px;height:1px"></label></div></div>'
              );
            })
            .join("") +
          (D.v5 === "Yes"
            ? '<h3 style="margin-top:28px">Keeper name on the V5C</h3><p class="muted">We check the registered keeper matches your verified name.</p><div class="dmgf"><label>Name on the V5C<input id="v5n" value="' +
              esc(D.v5n || "") +
              '" autocomplete="off"></label>' +
              (D.v5mis
                ? '<label>Why is the name different?<select id="v5r"><option value="">Choose</option>' +
                  [
                    "Company car",
                    "Spouse or partner",
                    "Family member",
                    "Recently bought, V5C not updated yet",
                    "Other",
                  ]
                    .map(function (o) {
                      return (
                        "<option" +
                        (D.v5r === o ? " selected" : "") +
                        ">" +
                        o +
                        "</option>"
                      );
                    })
                    .join("") +
                  "</select></label>"
                : "") +
              "</div>"
            : "") +
          (D.fn === "Yes"
            ? '<h3 style="margin-top:28px">Finance on your car</h3><p class="muted">We settle this directly with your lender, so we need the exact figure and their letter.</p><div class="dmgf"><label>Exact settlement figure (£)<input id="st-amt" inputmode="decimal" value="' +
              esc(D.settle || "") +
              '"></label><label>Settlement letter (PDF or photo)<input type="file" id="st-pdf" accept="application/pdf,.pdf,image/*"></label></div>' +
              (D.settlepdf
                ? '<p class="note" style="color:var(--ok);margin:0">Added: ' +
                  esc(D.settlepdf) +
                  "</p>"
                : "")
            : "") +
          '<p class="note small" style="margin-top:14px"><button type="button" class="lnkb" id="smp">Fill with samples (preview only)</button></p>';
      } else if (m === N + 2) {
        h +=
          '<h3>Damage check</h3><p class="muted">Walk slowly around the car and note every mark, inside and out: scratches, dents, chips, scuffed wheels, tears, stains and warning lights. The more accurate this is, the less likely your valuation is to change.</p>' +
          '<div class="dmgf"><label>Where<select id="d-area"><option value="">Choose</option>' +
          [
            "Front",
            "Rear",
            "Driver’s side",
            "Passenger side",
            "Roof",
            "Wheels and tyres",
            "Glass and lights",
            "Interior",
            "Mechanical or warning light",
          ]
            .map(function (o) {
              return "<option>" + o + "</option>";
            })
            .join("") +
          '</select></label><label>What<select id="d-type"><option value="">Choose</option>' +
          [
            "Scratch",
            "Dent",
            "Stone chip",
            "Scuff",
            "Crack",
            "Rust",
            "Tear or stain",
            "Warning light",
            "Mechanical fault",
            "Other",
          ]
            .map(function (o) {
              return "<option>" + o + "</option>";
            })
            .join("") +
          '</select></label><label class="full">Describe it<input id="d-note" placeholder="e.g. 10cm scratch on the rear door"></label><label class="full">Photo of it<input type="file" id="d-ph" accept="image/*"></label></div><button type="button" class="btn ghost" id="d-add">Add this damage</button>' +
          '<ul class="dmgl">' +
          D.dmg
            .map(function (d, j) {
              return (
                "<li><span><b>" +
                esc(d.area) +
                ": " +
                esc(d.type) +
                ".</b> " +
                esc(d.note) +
                (d.ph ? " (photo added)" : "") +
                '</span><button type="button" class="lnkb" data-rm="' +
                j +
                '">Remove</button></li>'
              );
            })
            .join("") +
          "</ul>" +
          '<label class="agree" id="none-l"><input type="checkbox" id="d-none"' +
          (D.none ? " checked" : "") +
          (D.dmg.length ? " disabled" : "") +
          '><span>I’ve walked around the whole car and there is no damage to report.</span></label><p class="small" style="margin:8px 0 0"><button type="button" class="lnkb" id="dsmp">Add an example scratch (preview)</button></p>';
      } else {
        h +=
          "<h3>Check and sign</h3>" +
          dls([
            ["Registration", esc(D.reg)],
            ["Mileage", esc(D.mi)],
            ["Keys", esc(D.keys)],
            ["Service history", esc(D.sv)],
            ["V5C in your name", esc(D.v5)],
            [
              "Finance owed",
              D.fn === "Yes" ? "Yes, settlement £" + esc(D.settle || "") : "No",
            ],
            ["Photos", Object.keys(D.shots).length + " of " + N],
            ["Engine video", D.video ? "Added" : "Missing"],
            [
              "Damage declared",
              D.none
                ? "None"
                : D.dmg.length + " item" + (D.dmg.length === 1 ? "" : "s"),
            ],
          ]) +
          (D.fn === "Yes" && parseFloat(D.settle) > D.val
            ? '<p class="negq"><b>You owe more than this car is worth.</b> Your settlement figure is ' +
              gbp(parseFloat(D.settle)) +
              " and " +
              (SL ? "your asking price" : "our estimate") +
              " is " +
              gbp(D.val) +
              ". " +
              (SL
                ? "If it sells for less than you owe, you’ll need to pay the difference before the sale completes."
                : "The difference of " +
                  gbp(parseFloat(D.settle) - D.val) +
                  " is added to the price of the car you’re buying.") +
              "</p>"
            : "") +
          '<label class="agree" id="ag-l"><input type="checkbox" id="ag"><span>I confirm that the details, photos and video I’ve given are true and accurate, that I’ve declared all the damage and faults I know about, and that everything I’ve said comes with the car (keys, service history, V5C) will be handed over with it. I understand the ' +
          (SL ? "listing and agreed price" : "valuation") +
          " may change or be withdrawn if the car isn’t as described.</span></label>" +
          '<label>Sign by typing your full name<input id="sig" autocomplete="name" value="' +
          esc(D.sig || fullName()) +
          '"></label><label class="agree" id="sigok-l"><input type="checkbox" id="sigok"><span>We’ve filled in the name on your account. I’ve checked this is my <b>full legal name</b>, including any middle names, exactly as on my driving licence.</span></label><p class="note small">Dated ' +
          new Date().toLocaleDateString("en-GB") +
          '. <span class="todo">[Declaration wording to be approved by your solicitor.]</span></p><p class="small" style="margin:0"><button type="button" class="lnkb" id="sgfill">Tick and sign with the example (preview)</button></p>';
      }
      h +=
        '<p class="pxerr" id="pxerr" aria-live="polite"></p><div class="pxnav">' +
        (n > 0
          ? '<button type="button" class="btn ghost" id="pxb">Back</button>'
          : "") +
        '<button type="button" class="btn" id="pxn">' +
        (n === T - 1 ? "Sign and finish" : "Next") +
        '</button></div><p class="note small" style="margin-top:14px">Preview only: photos and files aren’t uploaded or stored.</p></div>';
      el.innerHTML = h;
      wire();
      window.scrollTo(0, 0);
    }
    function err(t) {
      $("pxerr").textContent = t;
    }
    function wire() {
      var n = D.step;
      if ($("pxb"))
        $("pxb").onclick = function () {
          D.step--;
          draw();
        };
      var m = n - O;
      if (m < 0) {
        var KS = ["reg", "mi", "keys", "sv", "ow", "v5", "pr", "fn", "val"];
        KS.forEach(function (k) {
          var x = $("w-" + k);
          x.oninput = x.onchange = function () {
            x.classList.remove("miss");
          };
        });
        $("wfill").onclick = function () {
          var E = {
            reg: "YK19 ABC",
            mi: "42000",
            keys: "2",
            sv: "Full",
            ow: "2",
            v5: "Yes",
            pr: "No",
            fn: "No",
            val: SL ? "9500" : "6500",
          };
          KS.forEach(function (k) {
            var x = $("w-" + k);
            if (!x.value) x.value = E[k];
            x.classList.remove("miss");
          });
          err("");
        };
        $("pxn").onclick = function () {
          var bad = 0,
            V = {};
          KS.forEach(function (k) {
            var x = $("w-" + k);
            V[k] = x.value.trim();
            var ok =
              k === "val"
                ? parseInt(V[k].replace(/[,£]/g, ""), 10) >= 100
                : k === "mi"
                  ? /^\d[\d,]*$/.test(V[k])
                  : !!V[k];
            x.classList.toggle("miss", !ok);
            if (!ok) bad++;
          });
          if (bad) {
            err("Fill in the fields highlighted.");
            return;
          }
          KS.forEach(function (k) {
            D[k] = V[k];
          });
          D.reg = D.reg.toUpperCase();
          D.val = parseInt(V.val.replace(/[,£]/g, ""), 10);
          D.step++;
          draw();
        };
      } else if (m < N) {
        var k = PXSHOTS[m][0];
        $("pf").onchange = function () {
          if (this.files[0]) {
            D.shots[k] = this.files[0].name;
            draw();
          }
        };
        $("smp").onclick = function () {
          D.shots[k] = "sample-" + k + ".jpg";
          draw();
        };
        $("smpall").onclick = function () {
          PXSHOTS.forEach(function (s) {
            if (!D.shots[s[0]]) D.shots[s[0]] = "sample-" + s[0] + ".jpg";
          });
          D.step = O + N;
          draw();
        };
        $("pxn").onclick = function () {
          if (!D.shots[k]) {
            $("box").classList.add("miss");
            err("Add this photo to continue.");
            return;
          }
          D.step++;
          draw();
        };
      } else if (m === N) {
        $("pf").onchange = function () {
          if (this.files[0]) {
            D.video = this.files[0].name;
            draw();
          }
        };
        $("smp").onclick = function () {
          D.video = "sample-engine.mp4";
          draw();
        };
        $("pxn").onclick = function () {
          if (!D.video) {
            $("box").classList.add("miss");
            err("Add the engine video to continue.");
            return;
          }
          D.step++;
          draw();
        };
      } else if (m === N + 1) {
        var keep = function () {
          if ($("st-amt")) D.settle = $("st-amt").value.trim();
          if ($("v5n")) D.v5n = $("v5n").value.trim();
          if ($("v5r")) D.v5r = $("v5r").value;
        };
        el.querySelectorAll("input[data-ev]").forEach(function (x) {
          x.onchange = function () {
            if (x.files[0]) {
              keep();
              D.ev[x.dataset.ev] = x.files[0].name;
              draw();
            }
          };
        });
        if ($("st-pdf"))
          $("st-pdf").onchange = function () {
            if (this.files[0]) {
              keep();
              D.settlepdf = this.files[0].name;
              draw();
            }
          };
        $("smp").onclick = function () {
          pxEvidence(D).forEach(function (e) {
            D.ev[e[0]] = "sample-" + e[0] + ".jpg";
          });
          if (D.v5 === "Yes") {
            D.v5n = fullName();
            D.v5mis = false;
            D.v5r = "";
          }
          if (D.fn === "Yes") {
            D.settle = D.settle || "6240.18";
            D.settlepdf = "sample-settlement.pdf";
          }
          draw();
        };
        $("pxn").onclick = function () {
          keep();
          var bad = 0;
          pxEvidence(D).forEach(function (e) {
            var m = !D.ev[e[0]];
            $("ev-" + e[0]).classList.toggle("miss", m);
            if (m) bad++;
          });
          if (D.v5 === "Yes") {
            var nn = function (x) {
              return String(x || "")
                .toLowerCase()
                .replace(/[^a-z]/g, "");
            };
            if (!D.v5n) {
              $("v5n").classList.add("miss");
              bad++;
            } else if (
              nn(D.v5n) !== nn(fullName()) &&
              nn(D.v5n) !== nn(user.first + user.last)
            ) {
              if (!D.v5mis) {
                D.v5mis = true;
                draw();
                $("pxerr").textContent =
                  "The V5C name doesn’t match your verified name. Tell us why to continue.";
                return;
              }
              if (!D.v5r) {
                $("v5r").classList.add("miss");
                bad++;
              }
            } else D.v5mis = false;
          }
          if (D.fn === "Yes") {
            var a = !(parseFloat(D.settle) > 0);
            $("st-amt").classList.toggle("miss", a);
            var p = !D.settlepdf;
            $("st-pdf").classList.toggle("miss", p);
            if (a || p) bad++;
          }
          if (bad) {
            err("Add everything highlighted to continue.");
            return;
          }
          D.step++;
          draw();
        };
      } else if (m === N + 2) {
        $("d-add").onclick = function () {
          var a = $("d-area"),
            t = $("d-type"),
            no = $("d-note"),
            bad = 0;
          [a, t, no].forEach(function (x) {
            var m = !x.value.trim();
            x.classList.toggle("miss", m);
            if (m) bad++;
          });
          if (bad) {
            err("Fill in the fields highlighted.");
            return;
          }
          D.dmg.push({
            area: a.value,
            type: t.value,
            note: no.value.trim(),
            ph: $("d-ph").files[0] ? $("d-ph").files[0].name : "",
          });
          D.none = false;
          draw();
        };
        el.querySelectorAll("[data-rm]").forEach(function (b) {
          b.onclick = function () {
            D.dmg.splice(+b.dataset.rm, 1);
            draw();
          };
        });
        $("d-none").onchange = function () {
          D.none = this.checked;
          $("none-l").classList.remove("miss");
        };
        $("dsmp").onclick = function () {
          D.dmg.push({
            area: "Rear",
            type: "Scratch",
            note: "10cm scratch on the rear bumper, near the number plate",
            ph: "sample-damage.jpg",
          });
          D.none = false;
          draw();
        };
        $("pxn").onclick = function () {
          if (!D.dmg.length && !D.none) {
            $("none-l").classList.add("miss");
            err(
              "Add each bit of damage, or tick the box to confirm there is none.",
            );
            return;
          }
          D.step++;
          draw();
        };
      } else {
        $("sgfill").onclick = function () {
          $("ag").checked = true;
          $("sigok").checked = true;
          $("sig").value = fullName();
          ["ag-l", "sigok-l"].forEach(function (k) {
            $(k).classList.remove("miss");
          });
          $("sig").classList.remove("miss");
          err("");
        };
        $("pxn").onclick = function () {
          D.sig = $("sig").value.trim();
          var a = !$("ag").checked,
            b = D.sig.length < 3 || D.sig.indexOf(" ") < 0,
            c = !$("sigok").checked;
          $("ag-l").classList.toggle("miss", a);
          $("sig").classList.toggle("miss", b);
          $("sigok-l").classList.toggle("miss", c);
          if (a || b || c) {
            err(
              b
                ? "Type your full name, first and last, to sign."
                : "Tick the boxes highlighted to sign.",
            );
            return;
          }
          D.signed = D.sig;
          D.date = new Date().toLocaleDateString("en-GB");
          D.needDetails = false;
          pxDraft = null;
          if (SL) {
            SLIST.unshift(
              L(
                "n" + Date.now(),
                D.year || "",
                "",
                D.reg,
                D.reg,
                "under",
                parseInt(String(D.mi).replace(/\D/g, ""), 10) || 0,
                { listed: D.date },
              ),
            );
            SLIST[0].md = "";
            SLIST[0].mk = "";
            pwant = "li";
            lfilt = "all";
            location.hash = "#profile";
            return;
          }
          pxList.push(D);
          if (toCar) {
            carSt[pxRet].pxEdit = false;
            location.hash = "#car-" + pxRet;
          } else {
            pwant = "px";
            location.hash = "#profile";
          }
        };
      }
    }
    draw();
  }

  /* sell check */
  var f = $("check"),
    res = $("result");
  f.fin.addEventListener("change", function () {
    var y = f.fin.value === "yes";
    $("settle-l").hidden = $("settlepdf-l").hidden = $("settle-n").hidden = !y;
  });
  Array.prototype.forEach.call(f.elements, function (x) {
    var h = function () {
      x.classList.remove("miss");
    };
    x.addEventListener("input", h);
    x.addEventListener("change", h);
  });
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    var y = parseInt(f.year.value, 10),
      m = parseInt(f.miles.value.replace(/,/g, ""), 10),
      yr = new Date().getFullYear(),
      why = [];
    var pr = parseInt(f.price.value.replace(/[,£\s]/g, ""), 10),
      sv = parseFloat((f.settle.value || "").replace(/[,£]/g, ""));
    var need = [
        [f.reg, f.reg.value.replace(/\s/g, "").length >= 2],
        [f.year, y >= 1980 && y <= yr],
        [f.miles, !isNaN(m) && m >= 0 && m < 1000000],
        [f.price, pr >= 500],
        [f.wo, !!f.wo.value],
        [f.rw, !!f.rw.value],
        [f.fin, !!f.fin.value],
      ],
      bad = 0;
    if (f.fin.value === "yes") {
      need.push([
        f.settle,
        parseFloat(f.settle.value.replace(/[,£]/g, "")) > 0,
      ]);
      need.push([f.settlepdf, f.settlepdf.files.length > 0]);
    }
    need.forEach(function (n) {
      n[0].classList.toggle("miss", !n[1]);
      if (!n[1]) bad++;
    });
    if (bad) {
      res.className = "result bad";
      res.hidden = false;
      res.innerHTML =
        "<h3>A few details need checking</h3><p>Fill in the fields highlighted so we can check your car. The year can’t be later than " +
        yr +
        ", and the asking price needs to be at least £500.</p>";
      return;
    }
    if (yr - y > 10)
      why.push(
        "It’s older than 10 years. We list cars from " +
          (yr - 10) +
          " onwards.",
      );
    if (m >= 120000)
      why.push(
        "It has 120,000 miles or more. We list cars with under 120,000 miles.",
      );
    if (f.wo.value === "yes")
      why.push("We can’t list cars that have been written off.");
    if (f.rw.value === "no")
      why.push(
        "We list roadworthy cars unless we’ve approved otherwise in advance.",
      );
    if (why.length) {
      res.className = "result bad";
      res.hidden = false;
      res.innerHTML =
        "<h3>We can’t list this car yet</h3><ul><li>" +
        why.join("</li><li>") +
        "</li></ul><p>If you have another car that fits, check that one.</p>";
    } else {
      res.className = "result ok";
      res.hidden = false;
      res.innerHTML =
        "<h3>Your car fits our criteria</h3><p>" +
        (f.fin.value === "yes"
          ? "Thanks for the settlement figure and letter: we’ll use them to clear the finance with your lender. "
          : "") +
        "Next, we’ll guide you through photos, a short engine video, a damage check and a signed declaration. It takes about 15 minutes and is saved to your seller account.</p>" +
        (f.fin.value === "yes" && sv > pr
          ? '<p class="negq"><b>You owe more than your asking price.</b> Your settlement figure is ' +
            gbp(sv) +
            " and your asking price is " +
            gbp(pr) +
            ". If the car sells for less than you owe, you’ll need to pay the difference (about " +
            gbp(sv - pr) +
            ' at your asking price) before the sale can complete. We’ll confirm the exact amount once we agree a price. <span class="todo">[How and when the seller pays the shortfall to be confirmed.]</span></p>'
          : "") +
        '<button type="button" class="btn" id="sellgo">Proceed</button><p class="note small" style="margin-top:10px">You’ll need a seller account. If you’re not signed in, we’ll take you to sign in or create one first, then straight into the valuation.</p>';
      $("sellgo").onclick = function () {
        pxDraft = {
          seller: true,
          needDetails: true,
          reg: f.reg.value.trim().toUpperCase(),
          mi: f.miles.value.trim(),
          fn: f.fin.value === "yes" ? "Yes" : "No",
          settle: f.fin.value === "yes" ? f.settle.value.trim() : "",
          settlepdf:
            f.fin.value === "yes" && f.settlepdf.files[0]
              ? f.settlepdf.files[0].name
              : "",
          val: f.price.value.trim(),
          year: f.year.value,
          shots: {},
          ev: {},
          dmg: [],
          none: false,
          step: 0,
        };
        pxRet = null;
        if (!user) {
          after = "#px";
          location.hash = "#profile";
        } else {
          if (user.role !== "seller") {
            user.roles.seller = true;
            user.role = "seller";
            updProf();
          }
          location.hash = "#px";
        }
      };
    }
    res.scrollIntoView({ block: "nearest" });
  });

  /* buy: looking for, filters, sort */
  var FUELS = [
    "Petrol",
    "Diesel",
    "Electric",
    "Hybrid",
    "Mild hybrid",
    "Plug-in hybrid",
  ];
  var SORTS = [
    ["rel", "Relevance (deals first)"],
    ["pa", "Price: low to high"],
    ["pd", "Price: high to low"],
    ["dist", "Distance: nearest first (needs postcode)"],
    ["mi", "Mileage: low to high"],
    ["new", "Age: newest first"],
    ["old", "Age: oldest first"],
    ["rec", "Recently added"],
  ];
  var fm = $("f-make"),
    fmo = $("f-model"),
    fs = $("f-spec"),
    fp = $("f-price"),
    fmi = $("f-miles"),
    ff = $("f-fuel"),
    ft = $("f-trans"),
    fc = $("f-col"),
    fso = $("f-sort"),
    grid = $("grid"),
    none = $("none"),
    type = "";
  var allF = [fm, fmo, fs, fp, fmi, ff, ft, fc];
  function uniqOf(a) {
    return a.filter(function (v, i, x) {
      return x.indexOf(v) === i;
    });
  }
  function cgrp(s) {
    var m = /(blue|grey|black|white|silver|red|green)/i.exec(s);
    return m
      ? m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase()
      : "Other";
  }
  function specOf(c) {
    return c.eng + ", " + c.tr.toLowerCase();
  }
  function opt(sel, vals, first) {
    sel.innerHTML =
      '<option value="">' +
      first +
      "</option>" +
      vals
        .map(function (v) {
          return "<option>" + v + "</option>";
        })
        .join("");
  }
  opt(
    fm,
    uniqOf(
      cars.map(function (c) {
        return c.mk;
      }),
    ).sort(),
    "All makes",
  );
  opt(
    ff,
    FUELS.filter(function (f) {
      return cars.some(function (c) {
        return c.fu === f;
      });
    }),
    "Any",
  );
  opt(
    fc,
    uniqOf(
      cars.map(function (c) {
        return cgrp(c.col);
      }),
    ).sort(),
    "Any",
  );
  fso.innerHTML = SORTS.map(function (s) {
    return '<option value="' + s[0] + '">' + s[1] + "</option>";
  }).join("");
  function fillSpecs() {
    if (!fmo.value) {
      $("l-spec").hidden = true;
      fs.innerHTML = "";
      return;
    }
    opt(
      fs,
      uniqOf(
        cars
          .filter(function (c) {
            return c.mk === fm.value && c.md === fmo.value;
          })
          .map(specOf),
      ).sort(),
      "All specifications",
    );
    $("l-spec").hidden = false;
  }
  function fillModels() {
    if (!fm.value) {
      $("l-model").hidden = true;
      $("l-spec").hidden = true;
      fmo.innerHTML = "";
      fs.innerHTML = "";
      return;
    }
    opt(
      fmo,
      uniqOf(
        cars
          .filter(function (c) {
            return c.mk === fm.value;
          })
          .map(function (c) {
            return c.md;
          }),
      ).sort(),
      "All models",
    );
    $("l-model").hidden = false;
    $("l-spec").hidden = true;
    fs.innerHTML = "";
  }
  function chips() {
    $("chips").innerHTML = ["Any"]
      .concat(TYPES)
      .map(function (t) {
        var v = t === "Any" ? "" : t;
        return (
          '<button type="button" class="chip" data-t="' +
          v +
          '" aria-pressed="' +
          (type === v) +
          '">' +
          t +
          "</button>"
        );
      })
      .join("");
    $("chips")
      .querySelectorAll(".chip")
      .forEach(function (b) {
        b.onclick = function () {
          type = b.dataset.t;
          pcpage = 1;
          chips();
          render();
        };
      });
  }
  var CMP = {
    rel: function (x, y) {
      return (y.c.deal ? 1 : 0) - (x.c.deal ? 1 : 0) || x.c.add - y.c.add;
    },
    pa: function (x, y) {
      return x.c.p - y.c.p;
    },
    pd: function (x, y) {
      return y.c.p - x.c.p;
    },
    dist: function (x, y) {
      return x.c.dist - y.c.dist;
    },
    mi: function (x, y) {
      return x.c.mi - y.c.mi;
    },
    new: function (x, y) {
      return y.c.y - x.c.y || x.c.mi - y.c.mi;
    },
    old: function (x, y) {
      return x.c.y - y.c.y || y.c.mi - x.c.mi;
    },
    rec: function (x, y) {
      return x.c.add - y.c.add;
    },
  };

  /* postcode + pages */
  var PAGE = 12;
  function wirePc(fid, iid, mid, goBuy) {
    $(fid).onsubmit = function (e) {
      e.preventDefault();
      var r = setPc($(iid).value);
      $(mid).textContent = r.msg;
      $(mid).style.color = r.ok ? "" : "var(--bad)";
      if (!r.ok) return;
      $("pc-home-in").value = $("pc-buy-in").value = pcode ? pcode.txt : "";
      if (pcode) {
        fso.value = "dist";
      } else if (fso.value === "dist") {
        fso.value = "rel";
      }
      pcpage = 1;
      render();
      if (goBuy && pcode) location.hash = "#buy";
      $("pc-buy-msg").textContent = r.msg;
    };
  }
  function render() {
    var list = [];
    cars.forEach(function (c, i) {
      if (
        (type && c.t.indexOf(type) < 0) ||
        (fm.value && c.mk !== fm.value) ||
        (fmo.value && c.md !== fmo.value) ||
        (fs.value && specOf(c) !== fs.value) ||
        (fp.value && c.p > +fp.value) ||
        (fmi.value && c.mi > +fmi.value) ||
        (ff.value && c.fu !== ff.value) ||
        (ft.value && c.tr !== ft.value) ||
        (fc.value && cgrp(c.col) !== fc.value)
      )
        return;
      list.push({ c: c, i: i });
    });
    if (fso.value === "dist" && !pcode) fso.value = "rel";
    list.sort(CMP[fso.value]);
    var pages = Math.max(1, Math.ceil(list.length / PAGE));
    if (pcpage > pages) pcpage = pages;
    var shown = list.slice((pcpage - 1) * PAGE, pcpage * PAGE);
    grid.innerHTML = shown
      .map(function (x) {
        return card(x.c, x.i, false, true);
      })
      .join("");
    var pg = $("pager"),
      h = "";
    if (pages > 1) {
      h =
        '<button type="button" data-p="' +
        (pcpage - 1) +
        '"' +
        (pcpage === 1 ? " disabled" : "") +
        ' aria-label="Previous page">Previous</button>';
      for (var q = 1; q <= pages; q++)
        h +=
          '<button type="button" data-p="' +
          q +
          '"' +
          (q === pcpage ? ' aria-current="page"' : "") +
          ' aria-label="Page ' +
          q +
          '">' +
          q +
          "</button>";
      h +=
        '<button type="button" data-p="' +
        (pcpage + 1) +
        '"' +
        (pcpage === pages ? " disabled" : "") +
        ' aria-label="Next page">Next</button>';
    }
    pg.innerHTML = h;
    pg.hidden = pages < 2;
    pg.querySelectorAll("button[data-p]").forEach(function (b) {
      b.onclick = function () {
        pcpage = +b.dataset.p;
        render();
        var t = $("count");
        t.scrollIntoView({ block: "start" });
      };
    });
    $("pagenote").textContent = list.length
      ? "Showing " +
        ((pcpage - 1) * PAGE + 1) +
        " to " +
        Math.min(pcpage * PAGE, list.length) +
        " of " +
        list.length
      : "";
    none.hidden = list.length > 0;
    $("count").textContent =
      list.length +
      (list.length === 1 ? " car" : " cars") +
      (type ? " for “" + type + "”" : "");
    var a = allF.filter(function (s) {
      return s.value;
    }).length;
    $("fcount").textContent = a ? "(" + a + " selected)" : "";
  }
  fm.addEventListener("change", function () {
    fillModels();
    pcpage = 1;
    render();
  });
  fmo.addEventListener("change", function () {
    fillSpecs();
    pcpage = 1;
    render();
  });
  [fs, fp, fmi, ff, ft, fc, fso].forEach(function (s) {
    s.addEventListener("change", function () {
      pcpage = 1;
      render();
    });
  });
  window.__buyRender = render;
  wirePc("pc-home", "pc-home-in", "pc-home-msg", true);
  wirePc("pc-buy", "pc-buy-in", "pc-buy-msg", false);
  $("clear").onclick = function () {
    type = "";
    allF.forEach(function (s) {
      s.value = "";
    });
    fso.value = "rel";
    pcpage = 1;
    fillModels();
    chips();
    render();
  };
  chips();
  pcpage = 1;
  render();
  updProf();
  route();
})();

/* theme */
(function () {
  var b = document.getElementById("theme"),
    mq = window.matchMedia("(prefers-color-scheme:dark)"),
    r = document.documentElement,
    mode = null;
  try {
    mode = localStorage.getItem("umt-theme");
  } catch (e) {}
  function dark() {
    return mode ? mode === "dark" : mq.matches;
  }
  function apply() {
    var d = dark();
    r.setAttribute("data-theme", d ? "dark" : "light");
    b.setAttribute("aria-pressed", d);
    b.setAttribute(
      "aria-label",
      d ? "Switch to light mode" : "Switch to dark mode",
    );
    b.title = b.getAttribute("aria-label");
    document
      .getElementById("th-p")
      .setAttribute(
        "d",
        d
          ? "M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
          : "M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z",
      );
  }
  b.onclick = function () {
    mode = dark() ? "light" : "dark";
    try {
      localStorage.setItem("umt-theme", mode);
    } catch (e) {}
    apply();
  };
  apply();
})();
