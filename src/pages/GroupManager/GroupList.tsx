import { Box, CircularProgress, IconButton, Stack, Tooltip } from "@mui/material";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllGroupPermission } from "services/GroupPermissionService";
import TableComponent from "components/Table/Table";
import { SubmitHandler } from "react-hook-form";
import { CommonStyles } from "utils/styles";
import Confirm from "components/Confirm/Confirm";
import { cancelToken } from "api/common";
import ButtonComponent from "components/Button/Button";
import { useEffect, useState } from "react";

const GroupManager = () => {
  const navigate = useNavigate();
  const styles = CommonStyles();

  const { t } = useTranslation();
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

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

  useEffect(() => {
    function getData() {
      getAllGroupPermission().subscribe((response: any) => {
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

  const onSubmit: SubmitHandler<IFeatureSearch> = (data) => console.log(data);

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
            <>
              {data && (
                <Stack direction={"row"}>
                  <Tooltip title={t("detail.view") as string}>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/group-manager/view/${data[tableMeta.rowIndex].id}`)}
                    >
                      <RemoveRedEyeIcon className={styles.actionIcons} fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t("detail.edit") as string}>
                    <IconButton
                      onClick={() => navigate(`/group-manager/edit/${data[tableMeta.rowIndex].id}`)}
                      size="small"
                    >
                      <DriveFileRenameOutlineIcon className={styles.actionIcons} fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t("detail.delete") as string}>
                    <IconButton size="small" onClick={() => setIsOpenConfirm(true)}>
                      <DeleteIcon className={styles.actionIcons} fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
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
    viewColumns: true,
    pagination: true,
    rowHover: false,
    selectableRows: "none",
    responsive: "standard",
    expandableRows: false,
    textLabels: {
      body: {
        noMatch: loading && <CircularProgress color="primary" />,
      },
    },
  };

  return (
    <Box>
      {/* title */}
      <Box className="add-btn">
        <ButtonComponent onClick={() => navigate("/group-manager/create")} variant="contained">
          {t("button.add")}
        </ButtonComponent>
        {/* End title */}
      </Box>

      {data && (
        <TableComponent
          title={t('group_manager.title_table')}
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
  );
};

export default GroupManager;
