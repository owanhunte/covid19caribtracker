export interface CountryType {
  name: string;
  label: string;
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
    label: "Anguilla",
    isoCode: "AI",
    unCode: "AIA"
  },
  {
    name: "Antigua and Barbuda",
    label: "Antigua and Barbuda",
    isoCode: "AG",
    unCode: "ATG"
  },
  {
    name: "Aruba",
    label: "Aruba",
    isoCode: "AW",
    unCode: "ABW"
  },
  {
    name: "Barbados",
    label: "Barbados",
    isoCode: "BB",
    unCode: "BRB"
  },
  {
    name: "British Virgin Islands",
    label: "British Virgin Islands",
    isoCode: "VG",
    unCode: "VGB"
  },
  {
    name: "Cayman Islands",
    label: "Cayman Islands",
    isoCode: "KY",
    unCode: "CYM"
  },
  {
    name: "Cuba",
    label: "Cuba",
    isoCode: "CU",
    unCode: "CUB"
  },
  {
    name: "Curaçao",
    label: "Curaçao",
    isoCode: "CW",
    unCode: "CUW"
  },
  {
    name: "Dominica",
    label: "Dominica",
    isoCode: "DM",
    unCode: "DMA"
  },
  {
    name: "Dominican Republic",
    label: "Dominican Republic",
    isoCode: "DO",
    unCode: "DOM"
  },
  {
    name: "Grenada",
    label: "Grenada",
    isoCode: "GD",
    unCode: "GRD"
  },
  {
    name: "Guadeloupe",
    label: "Guadeloupe",
    isoCode: "GP",
    unCode: "GLP"
  },
  {
    name: "Guyana",
    label: "Guyana",
    isoCode: "GY",
    unCode: "GUY"
  },
  {
    name: "Haiti",
    label: "Haiti",
    isoCode: "HT",
    unCode: "HTI"
  },
  {
    name: "Honduras",
    label: "Honduras",
    isoCode: "HN",
    unCode: "HND"
  },
  {
    name: "Jamaica",
    label: "Jamaica",
    isoCode: "JM",
    unCode: "JAM"
  },
  {
    name: "Martinique",
    label: "Martinique",
    isoCode: "MQ",
    unCode: "MTQ"
  },
  {
    name: "Montserrat",
    label: "Montserrat",
    isoCode: "MS",
    unCode: "MSR"
  },
  {
    name: "Nicaragua",
    label: "Nicaragua",
    isoCode: "NI",
    unCode: "NIC"
  },
  {
    name: "Panama",
    label: "Panama",
    isoCode: "PA",
    unCode: "PAN"
  },
  {
    name: "Puerto Rico",
    label: "Puerto Rico",
    isoCode: "PR",
    unCode: "PRI"
  },
  {
    name: "St. Barth",
    label: "St. Barthélemy",
    isoCode: "BL",
    unCode: "BLM"
  },
  {
    name: "Saint Martin",
    label: "St. Martin",
    isoCode: "MF",
    unCode: "MAF"
  },
  {
    name: "St. Kitts and Nevis",
    label: "St. Kitts and Nevis",
    isoCode: "KN",
    unCode: "KNA"
  },
  {
    name: "Saint Lucia",
    label: "St. Lucia",
    isoCode: "LC",
    unCode: "LCA"
  },
  {
    name: "Sint Maarten",
    label: "Sint Maarten",
    isoCode: "SX",
    unCode: "SXM"
  },
  {
    name: "St. Vincent Grenadines",
    label: "St. Vincent and the Grenadines",
    isoCode: "VC",
    unCode: "VCT"
  },
  {
    name: "Trinidad and Tobago",
    label: "Trinidad and Tobago",
    isoCode: "TT",
    unCode: "TTO"
  },
  {
    name: "U.S. Virgin Islands",
    label: "U.S. Virgin Islands",
    isoCode: "VI",
    unCode: "VIR"
  }
];