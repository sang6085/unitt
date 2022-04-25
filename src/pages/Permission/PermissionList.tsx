import { Box, CircularProgress, IconButton, Stack, Tooltip } from "@mui/material";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { getDataPermission } from "services/PermissionManagerService";
import { SubmitHandler } from "react-hook-form";
import { CommonStyles } from "utils/styles";
import StatusCard from "components/StatusCard/StatusCard";
import { useState, useEffect, FC } from "react";
import TableComponent from "components/Table/Table";
import Confirm from "components/Confirm/Confirm";
import { cancelToken } from "api/common";
import ButtonComponent from "components/Button/Button";
interface IFeatureSearch {
  search: string;
  id: number | string;
  featureId: string;
  featureName: string;
  featureType: string;
}

const PermissionManager: FC = () => {
  const navigate = useNavigate();
  const styles = CommonStyles();
  const { t } = useTranslation();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

  const onChangeConfirm: (value: boolean) => void = (value) => {
    setIsOpenConfirm(value);
  };

  useEffect(() => {
    function getData() {
      getDataPermission().subscribe((response: any) => {
        if (response.data.data) {
          setData(response?.data.data);
          setLoading(false);
        }
      });
    }
    getData();
    return () => {
      //CancelToken in componentWillUnmount
      cancelToken();
    }
  }, []);

  const columns = [
    {
      label: "#",
      name: "id",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box>
              {tableMeta.rowIndex + 1}
            </Box>
          );
        },
      },
    },
    {
      name: t("permission_manager.action"),
      label: "",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Stack direction={'row'}>
              <Tooltip title={t("detail.view") as string}>
                <IconButton

                  size="small"
                  onClick={() =>
                    navigate(`/permission-manager/view/${data[tableMeta.rowIndex].id}`)
                  }
                >
                  <RemoveRedEyeIcon className={styles.actionIcons} fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title={t("detail.edit") as string}>
                <IconButton

                  onClick={() =>
                    navigate(`/permission-manager/edit/${data[tableMeta.rowIndex].id}`)
                  }
                  size="small"
                >
                  <DriveFileRenameOutlineIcon className={styles.actionIcons} fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title={t("detail.delete") as string}>
                <IconButton

                  size="small"
                  onClick={() => setIsOpenConfirm(true)}
                >
                  <DeleteIcon className={styles.actionIcons} fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
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
    viewColumns: true,
    pagination: true,
    selectableRows: "none",
    responsive: "standard",
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
      <Box className="add-btn">
        <ButtonComponent onClick={() => navigate("/permission-manager/create")} variant="contained">
          {t("button.add")}
        </ButtonComponent>
      </Box>
      <TableComponent
        title={t('permission_manager.title_table')}
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
