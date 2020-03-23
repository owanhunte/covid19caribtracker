import React, { useContext } from "react";
import {
  Paper,
  Toolbar,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  caribbeanCountries,
  countryToFlag,
  CountryType
} from "../../../utils/countries";
import StatsContext, {
  StatsByCountryType
} from "../../../context/statsContext";

enum ColumnDataType {
  String = "string",
  Numeric = "numeric"
}

interface DataTableHeadProps {
  classes: ReturnType<typeof useStyles>;
  headCells: HeadCell[];
}

interface HeadCell {
  name: keyof StatsByCountryType;
  label: string;
  dataType: ColumnDataType;
  formatData?(data: any): React.ReactNode;
}

const DataTableHead = (props: DataTableHeadProps) => {
  const { classes, headCells } = props;
  return (
    <TableHead classes={{ root: classes.tableRow }}>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.name}
            className={classes.tableHeadCell}
            align={
              headCell.dataType === ColumnDataType.Numeric ? "center" : "left"
            }
            padding="default"
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
      backgroundColor: "rgba(255, 255, 255, 0.95)"
    },
    toolbarRoot: {
      paddingLeft: "16px !important",
      paddingRight: "16px !important"
    },
    toolbarTitle: {
      flex: "1 1 100%",
      fontSize: "1.45rem"
    },
    table: {
      minWidth: 750,
      "& .MuiTableCell-sizeSmall": {
        padding: "11px 24px 11px 16px"
      }
    },
    tableBody: {
      height: 350,
      display: "block",
      overflow: "auto"
    },
    tableRow: {
      display: "table",
      tableLayout: "fixed",
      width: "100%"
    },
    tableCell: {
      fontSize: "14px !important",
      whiteSpace: "nowrap",
      padding: "11px 12px 11px 12px !important",
      overflow: "hidden",
      textOverflow: "ellipsis",

      "&:first-child": {
        width: 160,
        [theme.breakpoints.up("sm")]: {
          width: 175
        }
      }
    },
    tableHeadCell: {
      fontSize: "14px !important",
      textTransform: "uppercase",
      padding: "11px 12px 11px 12px",

      "&:first-child": {
        width: 160,
        [theme.breakpoints.up("sm")]: {
          width: 175
        }
      }
    },
    inlineFlag: {
      marginRight: 10
    },
    newCasesStyle: {
      backgroundColor: "rgb(255,238,170)",
      fontWeight: 500,
      paddingTop: 11,
      paddingBottom: 11,
      marginTop: "-21px",
      marginBottom: "-22px"
    },
    skeleton: {
      margin: "20px auto 0"
    }
  })
);

const TabularStats = () => {
  const _statsContext = useContext(StatsContext);
  const classes = useStyles();
  const headCells: HeadCell[] = [
    {
      name: "country",
      label: "Country",
      dataType: ColumnDataType.String,
      formatData: (data: string) => {
        // Get the isoCode for this country.
        let country: CountryType = caribbeanCountries[0];
        for (let index = 0; index < caribbeanCountries.length; index++) {
          country = caribbeanCountries[index];
          if (country.name === data) {
            break;
          }
        }

        return (
          <React.Fragment>
            <span className={classes.inlineFlag}>
              {countryToFlag(country.isoCode)}
            </span>
            <span title={country.name}>{country.name}</span>
          </React.Fragment>
        );
      }
    },
    {
      name: "cases",
      label: "Confirmed",
      dataType: ColumnDataType.Numeric,
      formatData: (data: string) => (
        <Box color="success.main">{parseInt(data).toLocaleString()}</Box>
      )
    },
    {
      name: "todayCases",
      label: "New Cases",
      dataType: ColumnDataType.Numeric,
      formatData: (data: string) => {
        return data ? (
          <Box className={classes.newCasesStyle}>
            +{parseInt(data).toLocaleString()}
          </Box>
        ) : (
          <Box>{parseInt(data).toLocaleString()}</Box>
        );
      }
    },
    {
      name: "deaths",
      label: "Deceased",
      dataType: ColumnDataType.Numeric,
      formatData: (data: string) => (
        <Box color="error.main">{parseInt(data).toLocaleString()}</Box>
      )
    },
    {
      name: "recovered",
      label: "Recovered",
      dataType: ColumnDataType.Numeric,
      formatData: (data: string) => (
        <Box color="primary.main">{parseInt(data).toLocaleString()}</Box>
      )
    },
    {
      name: "critical",
      label: "Critical",
      dataType: ColumnDataType.Numeric,
      formatData: (data: string) => (
        <Box color="warning.main">{parseInt(data).toLocaleString()}</Box>
      )
    }
  ];

  const formatCell = (item: any, dataType: ColumnDataType) => {
    return (
      <span>
        {dataType === ColumnDataType.String
          ? item
          : parseInt(item).toLocaleString()}
      </span>
    );
  };

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Toolbar className={classes.toolbarRoot}>
          <Typography
            className={classes.toolbarTitle}
            variant="h6"
            id="tableTitle"
          >
            Stats by Country
          </Typography>
        </Toolbar>
        {!_statsContext.statsByCountry && (
          <div style={{ paddingBottom: 40 }}>
            <Skeleton
              component="div"
              variant="rect"
              animation="wave"
              width="90%"
              height={300}
              classes={{
                root: classes.skeleton
              }}
            />
          </div>
        )}
        {_statsContext.statsByCountry && (
          <TableContainer>
            <Table
              className={classes.table}
              aria-label="caribbean covid-19 stats table"
              size="small"
            >
              <caption>
                Covid-19 Coronavirus stats for Caribbean countries
              </caption>
              <DataTableHead classes={classes} headCells={headCells} />
              <TableBody classes={{ root: classes.tableBody }}>
                {_statsContext.statsByCountry.map(row => {
                  return (
                    <TableRow
                      hover
                      key={row.country}
                      classes={{ root: classes.tableRow }}
                    >
                      {headCells.map(headCell => (
                        <TableCell
                          key={headCell.name}
                          className={classes.tableCell}
                          align={
                            headCell.dataType === ColumnDataType.Numeric
                              ? "center"
                              : "left"
                          }
                        >
                          {headCell.formatData
                            ? headCell.formatData(row[headCell.name])
                            : formatCell(
                                row[headCell.name],
                                headCell.dataType ?? ColumnDataType.String
                              )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </div>
  );
};

export default TabularStats;
