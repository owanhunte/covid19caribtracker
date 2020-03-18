import React from "react";

export interface TotalStatsType {
  cases: number;
  deaths: number;
  recovered: number;
}

export interface StatsByCountryType {
  country: string;
  label?: string;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  active: number;
  critical: number;
}

export interface StatsContextType {
  totalStats?: TotalStatsType;
  totalCaribbeanStats?: TotalStatsType;
  statsByCountry?: StatsByCountryType[];
  countriesWithNoConfirmedCases?: string[];
  cacheExpiresOn?: number;
}

const StatsContext = React.createContext<StatsContextType>({});

StatsContext.displayName = "covid19StatsContext";

export default StatsContext;