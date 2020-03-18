import axios from "axios";
import apiEndpoints from "./apiEndpoints";
import { caribbeanCountries, CountryNameType } from "./countries";
import { StatsByCountryType, TotalStatsType } from "../context/statsContext";

export const getCaribbeanCountryNames = () => {
  return caribbeanCountries.reduce(
    (accumulator, currentValue) => {
      accumulator.push({ name: currentValue.name, label: currentValue.label });
      return accumulator;
    }, [] as CountryNameType[]
  );
}

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
    const countryNamesMap = getCaribbeanCountryNames().reduce(
      (accumulator, currentValue) => {
        accumulator[currentValue.name] = { hasConfirmedCases: false, displayLabel: currentValue.label };
        return accumulator;
      }, {} as any
    );

    const filteredStats: StatsByCountryType[] = response.data.reduce(
      (accumulator: StatsByCountryType[], currentValue: StatsByCountryType) => {
        if (countryNamesMap.hasOwnProperty(currentValue.country)) {
          accumulator.push({ ...currentValue, label: countryNamesMap[currentValue.country].displayLabel });
          countryNamesMap[currentValue.country].hasConfirmedCases = true;
        }
        return accumulator;
      }, [] as StatsByCountryType[]
    );

    const countriesWithNoConfirmedCases: string[] = [];
    for (const key in countryNamesMap) {
      if (countryNamesMap.hasOwnProperty(key) && !(countryNamesMap[key].hasConfirmedCases)) {
        countriesWithNoConfirmedCases.push(countryNamesMap[key].displayLabel);
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