import React, { useContext } from "react";
import { countryToFlag } from "../../../utils/countries";
import StatsContext from "../../../context/statsContext";
import styles from "../../../styles/v1/theme.module.scss";

const CountriesWithoutCases = () => {
  const _statsContext = useContext(StatsContext);

  return (
    <section className={cx(styles.contentPad, styles.sectionLight)}>
      <div className={styles.withoutCases}>
        <h4 className={styles.justifyCenter}>
          The following Caribbean countries have no confirmed cases of Covid-19
          coronavirus as yet:
        </h4>
        <div className={styles.listItemWrap}>
          {_statsContext.countriesWithNoConfirmedCases?.map(country => (
            <div key={country.isoCode} className={styles.listItem}>
              <span className={styles.inlineFlag}>
                {countryToFlag(country.isoCode)}
              </span>
              <span>{country.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountriesWithoutCases;
