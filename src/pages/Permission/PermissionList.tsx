import { Box, Button, CircularProgress, IconButton, Tooltip } from "@mui/material";
import React from "react";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import { getDataPermission } from "../../services/PermissionManagerService";
import { SubmitHandler } from "react-hook-form";
import { CommonStyles } from "../../utils/styles";
import StatusCard from "../../components/StatusCard/StatusCard";

import TableComponent from "../../components/Table/Table";
import Confirm from "../../components/Confirm/Confirm";
interface IFeatureSearch {
  search: string;
  id: number | string;
  featureId: string;
  featureName: string;
  featureType: string;
}
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

const PermissionManager: React.FC = () => {
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

  React.useEffect(() => {
    async function getData() {
      getDataPermission().subscribe((response: any) => {
        if (response.data.data) {
          setData(response?.data.data);
          setLoading(false);
        }
      });
    }
    getData();
  }, [loading]);

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
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Tooltip title={t("detail.view") as string}>
                <IconButton
                  className={styles.actionIcons}
                  size="small"
                  onClick={() =>
                    navigate(`/permission-manager/view/${data[tableMeta.rowIndex].id}`)
                  }
                >
                  <RemoveRedEyeIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title={t("detail.edit") as string}>
                <IconButton
                  className={styles.actionIcons}
                  onClick={() =>
                    navigate(`/permission-manager/edit/${data[tableMeta.rowIndex].id}`)
                  }
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
          );
        },
      },
    },
    {
      label: t(`permission_manager.name_company`),
      name: "nameCompany",
    },
    {
      label: t(`permission_manager.code_permission`),
      name: "codePermission",
    },
    {
      label: t(`permission_manager.name_permission`),
      name: "namePermission",
    },
    {
      label: t(`permission_manager.description`),
      name: "description",
    },
    {
      label: t(`permission_manager.status`),
      name: "status",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <>
              {data[tableMeta.rowIndex].status === 0 ? (
                <StatusCard type="inactive" children={t("permission_manager.non_active")} />
              ) : (
                <StatusCard type="active" children={t("permission_manager.active")} />
              )}
            </>
          );
        },
      },
    },
  ];
  const onSubmit: SubmitHandler<IFeatureSearch> = (data) => console.log(data);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const names = ["Name permission", "Name company", "Code company", "Code permission"];

  const options: any = {
    download: false,
    print: false,
    filter: false,
    search: false,
    sort: false,
    viewColumns: false,
    pagination: true,
    selectableRows: "none",
    rowHover: false,
    expandableRows: false,
    textLabels: {
      body: {
        noMatch: loading && <CircularProgress color="primary" />,
      },
    },
  };
  return (
    <Box>
      <Box className={classes.boxHeader}>
        <Box className="add-btn">
          <Button onClick={() => navigate("/permission-manager/create")} variant="contained">
            {t("button.add")}
          </Button>
        </Box>
      </Box>
      <TableComponent
        title={""}
        data={data}
        columns={columns}
        options={options}
        filter={true}
        formData={[
          {
            label: t(`permission_manager.name_company`),
            name: "featureId",
          },
          {
            label: t(`permission_manager.code_permission`),
            name: "featureName",
          },
          {
            label: t(`permission_manager.name_permission`),
            name: "featureType",
          },
        ]}
        handleFilter={onSubmit}
      />
      {isOpenConfirm && (
        <Confirm
          isOpen={isOpenConfirm}
          isConfirm={onChangeConfirm}
          title={t("confirm_delete.are_you_sure")}
          content={t("confirm_delete.warning_delete")}
        />
      )}
    </Box>
  );
};

export default PermissionManager;
