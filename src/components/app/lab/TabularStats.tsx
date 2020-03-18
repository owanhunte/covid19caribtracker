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
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
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
      fontSize: "1.35rem"
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
      fontSize: "13px !important"
    },
    tableHeadCell: {
      fontSize: "13px !important",
      textTransform: "uppercase"
    }
  })
);

const TabularStats = () => {
  const _statsContext = useContext(StatsContext);
  const classes = useStyles();
  const headCells: HeadCell[] = [
    {
      name: "label",
      label: "Country",
      dataType: ColumnDataType.String
    },
    {
      name: "cases",
      label: "Confirmed",
      dataType: ColumnDataType.Numeric,
      formatData: (data: number) => <Box color="success.main">{data}</Box>
    },
    {
      name: "deaths",
      label: "Deceased",
      dataType: ColumnDataType.Numeric,
      formatData: (data: number) => <Box color="error.main">{data}</Box>
    },
    {
      name: "recovered",
      label: "Recovered",
      dataType: ColumnDataType.Numeric,
      formatData: (data: number) => <Box color="primary.main">{data}</Box>
    },
    {
      name: "critical",
      label: "Critical",
      dataType: ColumnDataType.Numeric,
      formatData: (data: number) => <Box color="warning.main">{data}</Box>
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
              {_statsContext.statsByCountry &&
                _statsContext.statsByCountry.map(row => {
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
      </Paper>
    </div>
  );
};

export default TabularStats;
