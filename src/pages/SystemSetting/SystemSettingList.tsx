import { Box, CircularProgress, IconButton, Stack, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { cancelToken } from "api/common";
import ButtonComponent from "components/Button/Button";
import Confirm from "components/Confirm/Confirm";
import TableComponent from "components/Table/Table";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { CommonStyles } from "utils/styles";
import RemoveIcon from "@mui/icons-material/Remove";
import { getDataSystemSetting } from "services/SystemSettingsService";

interface IFeatureSearch {
  search: string;
  id: number | string;
  featureId: string;
  featureName: string;
  featureType: string;
}

const SystemSetting = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const styles = CommonStyles();
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const onChangeConfirm: (value: boolean) => void = (value) => {
    setIsOpenConfirm(value);
  };

  useEffect(() => {
    function getData() {
      getDataSystemSetting().subscribe((response: any) => {
        if (response?.data.data) {
          setData(response?.data.data);
          setLoading(false);
        }
      });
    }
    getData();
    return () => {
      //CancelToken in componentWillUnmount
      cancelToken();
    };
  }, []);

  const columns = [
    {
      label: "#",
      name: "id",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return <Box>{tableMeta.rowIndex + 1}</Box>;
        },
      },
    },
    {
      name: t("permission_manager.action"),
      label: "",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Stack direction={"row"}>
              <Tooltip title={t("detail.view") as string}>
                <IconButton
                  size="small"
                  onClick={() =>
                    navigate(`/system-settings/view/${data[tableMeta.rowIndex].id}`)
                  }
                >
                  <RemoveRedEyeIcon className={styles.actionIcons} fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title={t("detail.edit") as string}>
                <IconButton
                  onClick={() =>
                    navigate(`/system-settings/edit/${data[tableMeta.rowIndex].id}`)
                  }
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
          );
        },
      },
    },
    {
      label: t(`system_settings.keys`),
      name: "keys",
    },
    {
      label: t(`system_settings.values`),
      name: "values",
    },
    {
      label: t(`system_settings.description`),
      name: "description",
      options: {
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <Box>
              {data[tableMeta.rowIndex].description.length === 0 ? (
                <RemoveIcon fontSize="small" />
              ) : (
                <>{data[tableMeta.rowIndex].description}</>
              )}
            </Box>
          );
        },
      },
    },
  ];

  const onSubmit: SubmitHandler<IFeatureSearch> = (data) => console.log(data);

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
        <ButtonComponent onClick={() => navigate("/system-settings/create")} variant="contained">
          {t("button.add")}
        </ButtonComponent>
      </Box>
      <TableComponent
        title={t("permission_manager.title_table")}
        data={data}
        columns={columns}
        options={options}
        filter={true}
        formData={[
          {
            label: "ID",
            name: "id"
          },
          {
            label: t(`system_settings.keys`),
            name: "keys",
          },
          {
            label: t(`system_settings.values`),
            name: "values",
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

export default SystemSetting;
