import axios from "axios";
import apiEndpoints from "./apiEndpoints";
import { caribbeanCountries } from "./countries";
import { StatsByCountryType, TotalStatsType } from "../context/statsContext";

export const getTotalGlobalStats = async () => {
  try {
    const response = await axios.get(apiEndpoints.globalStatsSummary);
    return (response.data as TotalStatsType);
  }
  catch (error) {
    // TODO: Log error to sentry.io, then re-throw error.
    throw error;
  }
};

export const getStatsByCountry = async () => {
  try {
    const response = await axios.get(apiEndpoints.statsByCountry);
    const countryNamesMap = caribbeanCountries.reduce(
      (accumulator, currentValue) => {
        accumulator[currentValue.name] = { ...currentValue, hasConfirmedCases: false };
        return accumulator;
      }, {} as any
    );

    const filteredStats: StatsByCountryType[] = response.data.reduce(
      (accumulator: StatsByCountryType[], currentValue: StatsByCountryType) => {
        if (countryNamesMap.hasOwnProperty(currentValue.country)) {
          accumulator.push({ ...currentValue, label: countryNamesMap[currentValue.country].label, isoCode: countryNamesMap[currentValue.country].isoCode });
          countryNamesMap[currentValue.country].hasConfirmedCases = true;
        }
        return accumulator;
      }, [] as StatsByCountryType[]
    );

    const countriesWithNoConfirmedCases: any[] = [];
    for (const key in countryNamesMap) {
      if (countryNamesMap.hasOwnProperty(key) && !(countryNamesMap[key].hasConfirmedCases)) {
        countriesWithNoConfirmedCases.push({
          label: countryNamesMap[key].label,
          isoCode: countryNamesMap[key].isoCode
        });
      }
    }

    return {
      statsByCountry: filteredStats,
      countriesWithNoConfirmedCases
    };
  }
  catch (error) {
    // TODO: Log error to sentry.io, then re-throw error.
    throw error;
  }
}