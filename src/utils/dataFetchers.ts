import axios from "axios";
import parseISO from "date-fns/parseISO";
import apiEndpoints from "./apiEndpoints";
import { caribbeanCountries } from "./countries";
import { StatsByCountryType, TotalStatsType } from "../context/statsContext";

export const getTotalGlobalStats = async () => {
  try {
    const response = await axios.get(apiEndpoints.globalStatsSummary);
    return ({
      cases: response.data.data.attributes.total_cases,
      deaths: response.data.data.attributes.total_deaths,
      recovered: response.data.data.attributes.total_recovered,
      lastUpdated: parseISO(response.data.data.attributes.changed)
    } as TotalStatsType);
  }
  catch (error) {
    // TODO: Log error to sentry.io, then re-throw error.
    console.log(error);
    throw error;
  }
};

export const getStatsByCountry = async () => {
  try {
    const response = await axios.get(`${apiEndpoints.statsByCountry}?sort=-cases`);
    const countriesMap = caribbeanCountries.reduce(
      (accumulator, currentValue) => {
        accumulator[currentValue.isoCode.toLowerCase()] = { ...currentValue, hasConfirmedCases: false };
        return accumulator;
      }, {} as any
    );

    const filteredStats: StatsByCountryType[] = response.data.data.reduce(
      (accumulator: StatsByCountryType[], currentValue: any) => {
        if (countriesMap.hasOwnProperty(currentValue.attributes.country)) {
          accumulator.push({
            country: currentValue.attributes.title,
            isoCode: currentValue.attributes.country,
            cases: currentValue.attributes.cases,
            todayCases: currentValue.attributes.today_cases,
            deaths: currentValue.attributes.deaths,
            todayDeaths: currentValue.attributes.today_deaths,
            recovered: currentValue.attributes.recovered,
            active: currentValue.attributes.active_cases,
            critical: currentValue.attributes.critical,
            lastUpdated: parseISO(currentValue.attributes.changed)
          });
          countriesMap[currentValue.attributes.country].hasConfirmedCases = true;
        }
        return accumulator;
      }, [] as StatsByCountryType[]
    );

    const countriesWithNoConfirmedCases: any[] = [];
    for (const key in countriesMap) {
      if (countriesMap.hasOwnProperty(key) && !(countriesMap[key].hasConfirmedCases)) {
        countriesWithNoConfirmedCases.push({
          label: countriesMap[key].name,
          isoCode: countriesMap[key].isoCode
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