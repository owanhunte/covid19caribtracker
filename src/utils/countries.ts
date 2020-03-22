export interface CountryType {
  name: string;
  isoCode: string;
  unCode: string;
}

export const countryToFlag = (isoCode: string) => {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
      .toUpperCase()
      .replace(/./g, char =>
        String.fromCodePoint(char.charCodeAt(0) + 127397)
      )
    : isoCode;
};

export const caribbeanCountries: CountryType[] = [
  {
    name: "Anguilla",
    isoCode: "AI",
    unCode: "AIA"
  },
  {
    name: "Antigua and Barbuda",
    isoCode: "AG",
    unCode: "ATG"
  },
  {
    name: "Aruba",
    isoCode: "AW",
    unCode: "ABW"
  },
  {
    name: "Bahamas",
    isoCode: "BS",
    unCode: "BHS"
  },
  {
    name: "Barbados",
    isoCode: "BB",
    unCode: "BRB"
  },
  {
    name: "Belize",
    isoCode: "BZ",
    unCode: "BLZ"
  },
  {
    name: "Bermuda",
    isoCode: "BM",
    unCode: "BMU"
  },
  {
    name: "British Virgin Islands",
    isoCode: "VG",
    unCode: "VGB"
  },
  {
    name: "Cayman Islands",
    isoCode: "KY",
    unCode: "CYM"
  },
  {
    name: "Cuba",
    isoCode: "CU",
    unCode: "CUB"
  },
  {
    name: "Curaçao",
    isoCode: "CW",
    unCode: "CUW"
  },
  {
    name: "Dominica",
    isoCode: "DM",
    unCode: "DMA"
  },
  {
    name: "Dominican Republic",
    isoCode: "DO",
    unCode: "DOM"
  },
  {
    name: "Grenada",
    isoCode: "GD",
    unCode: "GRD"
  },
  {
    name: "Guadeloupe",
    isoCode: "GP",
    unCode: "GLP"
  },
  {
    name: "Guyana",
    isoCode: "GY",
    unCode: "GUY"
  },
  {
    name: "Haiti",
    isoCode: "HT",
    unCode: "HTI"
  },
  {
    name: "Honduras",
    isoCode: "HN",
    unCode: "HND"
  },
  {
    name: "Jamaica",
    isoCode: "JM",
    unCode: "JAM"
  },
  {
    name: "Martinique",
    isoCode: "MQ",
    unCode: "MTQ"
  },
  {
    name: "Montserrat",
    isoCode: "MS",
    unCode: "MSR"
  },
  {
    name: "Nicaragua",
    isoCode: "NI",
    unCode: "NIC"
  },
  {
    name: "Panama",
    isoCode: "PA",
    unCode: "PAN"
  },
  {
    name: "Puerto Rico",
    isoCode: "PR",
    unCode: "PRI"
  },
  {
    name: "St. Barthélemy",
    isoCode: "BL",
    unCode: "BLM"
  },
  {
    name: "St. Martin",
    isoCode: "MF",
    unCode: "MAF"
  },
  {
    name: "St. Kitts and Nevis",
    isoCode: "KN",
    unCode: "KNA"
  },
  {
    name: "St. Lucia",
    isoCode: "LC",
    unCode: "LCA"
  },
  {
    name: "Sint Maarten",
    isoCode: "SX",
    unCode: "SXM"
  },
  {
    name: "St. Vincent and the Grenadines",
    isoCode: "VC",
    unCode: "VCT"
  },
  {
    name: "Suriname",
    isoCode: "SR",
    unCode: "SUR"
  },
  {
    name: "Trinidad and Tobago",
    isoCode: "TT",
    unCode: "TTO"
  },
  {
    name: "Turks and Caicos Islands",
    isoCode: "TC",
    unCode: "TCA"
  },
  {
    name: "U.S. Virgin Islands",
    isoCode: "VI",
    unCode: "VIR"
  }
];