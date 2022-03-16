import { Box, Button, CircularProgress, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllGroupPermission } from "../../services/GroupPermissionService";
import TableComponent from "../../components/Table/Table";
import { SubmitHandler } from "react-hook-form";
import { CommonStyles } from "../../utils/styles";
import Confirm from "../../components/Confirm/Confirm";

const useStyles = makeStyles({
  boxHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  box: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    minWidth: 200,
    fontSize: "14px !important",
    fontWeight: "bold",
  },
});

const GroupManager = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const styles = CommonStyles();

  const { t } = useTranslation();
  const [data, setData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isOpenConfirm, setIsOpenConfirm] = React.useState<boolean>(false);

  const onChangeConfirm: (value: boolean) => void = (value) => {
    setIsOpenConfirm(value);
  };
  interface IFeatureSearch {
    search: string;
    id: number | string;
    featureId: string;
    featureName: string;
    featureType: string;
  }

  React.useEffect(() => {
    async function getData() {
      getAllGroupPermission().subscribe((response: any) => {
        if (response.data.data) {
          setData(response?.data.data);
          setLoading(false);
        }
      });
    }
    getData();
  }, [loading]);

  const onSubmit: SubmitHandler<IFeatureSearch> = (data) => console.log(data);

  const columns = [
    {
      label: "#",
      name: "id",
    },
    {
      name: t("permission_manager.action"),
      label: "",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <>
              {data && (
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Tooltip title={t("detail.view") as string}>
                    <IconButton
                      className={styles.actionIcons}
                      size="small"
                      onClick={() => navigate(`/group-manager/view/${data[tableMeta.rowIndex].id}`)}
                    >
                      <RemoveRedEyeIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t("detail.edit") as string}>
                    <IconButton
                      className={styles.actionIcons}
                      onClick={() => navigate(`/group-manager/edit/${data[tableMeta.rowIndex].id}`)}
                      size="small"
                    >
                      <DriveFileRenameOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t("detail.delete") as string}>
                    <IconButton
                      className={styles.actionIcons}
                      size="small"
                      onClick={() => setIsOpenConfirm(true)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </>
          );
        },
      },
    },
    {
      label: t(`permission_manager.code_permission`),
      name: "codeGroup",
    },
    {
      label: t(`permission_manager.name_permission`),
      name: "nameGroup",
    },
    {
      label: t(`permission_manager.description`),
      name: "description",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const names = ["Name permission", "Name company", "Code company", "Code permission"];

  const options: any = {
    download: false,
    print: false,
    filter: false,
    sort: false,
    search: false,
    viewColumns: false,
    pagination: true,
    rowHover: false,
    selectableRows: "none",
    expandableRows: false,
    textLabels: {
      body: {
        noMatch: loading && <CircularProgress color="primary" />,
      },
    },
  };

  return (
    <Box>
      <Box>
        {/* title */}
        <Box className={classes.boxHeader}>
          <Box className="add-btn">
            <Button onClick={() => navigate("/group-manager/create")} variant="contained">
              {t("button.add")}
            </Button>
          </Box>
        </Box>
        {/* End title */}

        {data && (
          <TableComponent
            title={""}
            data={data}
            columns={columns}
            options={options}
            filter={true}
            formData={[
              {
                label: t(`permission_manager.code_permission`),
                name: "featureId",
              },
              {
                label: t(`permission_manager.name_permission`),
                name: "featureName",
              },
              {
                label: t(`permission_manager.description`),
                name: "featureType",
              },
            ]}
            handleFilter={onSubmit}
          />
        )}
        {isOpenConfirm && (
          <Confirm
            isOpen={isOpenConfirm}
            isConfirm={onChangeConfirm}
            title={t("confirm_delete.are_you_sure")}
            content={t("confirm_delete.warning_delete")}
          />
        )}
      </Box>
    </Box>
  );
};

export default GroupManager;
