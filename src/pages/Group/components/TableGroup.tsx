import { getAllGroup } from "services/MenuGroupService";
import { Box, CircularProgress, Radio } from "@mui/material";
import { useTranslation } from "react-i18next";
import {useStyles} from "pages/Group/PermissionFeatureStyles"
import TableComponent from "components/Table/Table";
import { cancelToken } from "api/common";
import { useEffect, useState, Fragment, ChangeEvent } from "react";
interface IGroupComponent {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  valueGroup: any;
  valueSelect: any;
}

const GroupComponent = (props: IGroupComponent) => {
  const { t } = useTranslation();
  const [dataTableGroup, setDataTableGroup] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    getAllGroup().subscribe((res: any) => {
      if (res.data.success) {
        setDataTableGroup(res.data.data);
      }
    });
    return () => {
      //CancelToken in componentWillUnmount
      cancelToken();
    }
  }, []);

  const columnsTableGroup: any = [
    {
      name: "",
      label: "#",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return <Box ml={2} >{tableMeta.rowIndex + 1}</Box>;
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
                id={(tableMeta.rowData[2]).toString()}
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
    filterType: "checkbox",
    download: false,
    responsive: "standard",
    print: false,
    filter: false,
    search: true,
    viewColumns: true,
    sort: false,
    rowHover: false,
    selectableRows: "none",
    renderExpandableRow: (rowData: any, rowMeta: any) => {
      // console.log(rowData, rowMeta);
      return <Fragment></Fragment>;
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
    <Box className={classes.table}>
      <TableComponent
        title={t('menu_manager.group')}
        data={dataTableGroup}
        columns={columnsTableGroup}
        options={optionsTableGroup}
      />
    </Box>
  );
};

export default GroupComponent;
