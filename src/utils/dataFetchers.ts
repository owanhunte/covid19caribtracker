import axios from "axios";
import parseISO from "date-fns/parseISO";
import apiEndpoints, { apiEnginePublicBase } from "./apiEndpoints";
import { caribbeanCountries } from "./countries";
import { StatsByCountryType, TotalStatsType } from "../context/statsContext";

export const getTotalGlobalStats = async () => {
  try {
    const response = await axios.get(apiEndpoints.globalStatsSummary);
    return ({
      cases: response.data.data.attributes.cases,
      deaths: response.data.data.attributes.deaths,
      recovered: response.data.data.attributes.recovered,
      lastUpdated: parseISO(response.data.data.attributes.updatedAt)
    } as TotalStatsType);
  }
  catch (error) {
    // TODO: Log error to sentry.io, then re-throw error.
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

export interface Tag {
  uuid: string;
  name: string;
}

export interface NewsPost {
  uuid: string;
  title: string;
  link: string;
  image_url: string;
  image_alt: string;
  body: string;
  summary: string;
  tags: Tag[];
  created: Date;
}

const fallbackImage = "https://engine.covid19caribtracker.com/sites/default/files/2020-03/covid-19-update.jpg";
const fallbackImageAlt = "Covid-19 Coronavirus News update";

const getPostDetail = async (data: any): Promise<NewsPost> => {
  let item: NewsPost = {
    uuid: data.id,
    created: parseISO(data.attributes.createdAt),
    title: data.attributes.title,
    link: data.attributes.source_url.uri,
    image_url: fallbackImage,
    image_alt: fallbackImageAlt,
    body: data.attributes.body.processed,
    summary: data.attributes.body.summary,
    tags: []
  };

  // Get article image.
  try {
    const deepFetchImage = await axios.get(data.relationships.image.links.related.href);
    const deepFetchImageField = await axios.get(deepFetchImage.data.data.relationships.imageFile.links.related.href);
    item.image_url = `${apiEnginePublicBase}${deepFetchImageField.data.data.attributes.uri.url}`
    item.image_alt = deepFetchImage.data.data.relationships.imageFile.data.meta.alt ?? fallbackImageAlt;
  } catch (error) {
    // TODO: Log error to sentry.io.
  }

  // Get article tags.
  try {
    const deepFetchTags = await axios.get(data.relationships.tags.links.related.href);
    deepFetchTags.data.data.forEach((element: any) => {
      item.tags.push({
        uuid: element.id,
        name: element.attributes.name
      });
    });
  } catch (error) {
    // TODO: Log error to sentry.io
  }

  return item;
};

export const getLatestNews = async (): Promise<NewsPost[]> => {
  try {
    const response = await axios.get(`${apiEndpoints.newsArticles}?sort=-createdAt`);
    return Promise.all(response.data.data.map(async (item: any) => getPostDetail(item)));
  }
  catch (error) {
    // TODO: Log error to sentry.io, then re-throw error.
    throw error;
  }
};