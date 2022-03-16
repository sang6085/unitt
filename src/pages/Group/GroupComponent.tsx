import React from "react";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import { getAllGroup } from "../../services/MenuGroupService";
import { Box, CircularProgress, Radio } from "@mui/material";
import { useTranslation } from "react-i18next";

const getMuiTheme = () =>
  createTheme({
    overrides: {
      MUIDataTableSearch: {
        searchIcon: {
          opacity: 0,
        },
      },
    },
  });

interface IGroupComponent {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  valueGroup: any;
  valueSelect: any;
}

const GroupComponent = (props: IGroupComponent) => {
  const { t } = useTranslation();
  const [dataTableGroup, setDataTableGroup] = React.useState([]);

  React.useEffect(() => {
    getAllGroup().subscribe((res: any) => {
      if (res.data.success) {
        setDataTableGroup(res.data.data);
      }
    });
  }, []);

  const columnsTableGroup: any = [
    {
      name: "",
      label: "#",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return <Box sx={{ marginLeft: 2 }}>{tableMeta.rowIndex + 1}</Box>;
        },
      },
    },
    {
      name: "groupName",
      label: t(`menu_group.name`),
    },
    {
      name: "id",
      label: "ID",
    },
    {
      name: "groupCode",
      label: t(`menu_group.Action`),
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box>
              <Radio
                checked={props.valueSelect === tableMeta.rowData[3]}
                id={tableMeta.rowData[2]}
                onChange={props.handleChange}
                value={tableMeta.rowData[3]}
                name="radio-buttons"
              />
            </Box>
          );
        },
      },
    },
  ];

  const optionsTableGroup: any = {
    download: false,
    print: false,
    filter: false,
    search: true,
    viewColumns: false,
    pagination: false,
    selectableRows: "none",
    expandableRows: false,
    renderExpandableRow: (rowData: any, rowMeta: any) => {
      // console.log(rowData, rowMeta);
      return <React.Fragment></React.Fragment>;
    },
    textLabels: {
      body: {
        noMatch: dataTableGroup.length === 0 && (
          <CircularProgress color="primary" />
        ),
      },
    },
  };

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        title="Group"
        data={dataTableGroup}
        columns={columnsTableGroup}
        options={optionsTableGroup}
      />
    </MuiThemeProvider>
  );
};

export default GroupComponent;
