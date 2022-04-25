import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { getFeature } from "services/FeatureService";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { MUIDataTableOptions } from "mui-datatables";
import { SubmitHandler } from "react-hook-form";
import TableComponent from "components/Table/Table";
import { useTranslation } from "react-i18next";
import { CommonStyles } from "utils/styles";
import { useNavigate } from "react-router";
import Confirm from "components/Confirm/Confirm";
import { cancelToken } from "api/common";
import ButtonComponent from "components/Button/Button";
import { useEffect, useState } from "react";

export interface IDrawerInfo {
  id: number;
  type: string;
}

interface IFeatureSearch {
  search: string;
  id: number | string;
  featureId: string;
  featureName: string;
  featureType: string;
}

const Feature = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { t } = useTranslation();
  const styles = CommonStyles();
  const [loading, setLoading] = useState(true);
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);

  const onChangeConfirm: (value: boolean) => void = (value) => {
    setIsOpenConfirm(value);
  };

  useEffect(() => {
    getFeature().subscribe((res: any) => {
      setData(res.data);
      setLoading(false);
    });
    return () => {
      //CancelToken in componentWillUnmount
      cancelToken();
    }
  }, []);

  const onSubmit: SubmitHandler<IFeatureSearch> = (data) => console.log(data);

  const onNavigatCreate = () => {
    navigate("/features/create");
  };

  const onNavigateEdit = (id: number | string) => {
    navigate(`/features/edit/${id}`);
  };

  const onNavigateView = (id: number | string) => {
    navigate(`/features/view/${id}`);
  };

  const columns = [
    {
      name: "id",
      label: "#",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "manipulation",
      label: t("feature.action"),
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value: any, tableMeta: any) => {
          return (
            <>
              <Tooltip title={t("detail.view") as string}>
                <IconButton onClick={() => onNavigateView(tableMeta.rowData[0])}>
                  <RemoveRedEyeIcon className={styles.actionIcons} />
                </IconButton>
              </Tooltip>
              <Tooltip
                title={t("detail.edit") as string}
                onClick={() => onNavigateEdit(tableMeta.rowData[0])}
              >
                <IconButton>
                  <DriveFileRenameOutlineIcon className={styles.actionIcons} />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("detail.delete") as string}>
                <IconButton onClick={() => setIsOpenConfirm(true)}>
                  <DeleteIcon className={styles.actionIcons} />
                </IconButton>
              </Tooltip>
            </>
          );
        },
      },
    },
    {
      name: "featureId",
      label: t("feature.code_feature"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "featureName",
      label: t("feature.name_feature"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "description",
      label: t("feature.description"),
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "featureType",
      label: t("feature.type_feature"),
      options: {
        filter: true,
        sort: false,
      },
    },
  ];

  const options: MUIDataTableOptions = {
    filterType: "checkbox",
    download: false,
    responsive: "standard",
    print: false,
    filter: false, 
    search: false,
    viewColumns: true,
    rowHover: false,
    sort: false,
    selectableRows: "none",
    textLabels: {
      body: {
        noMatch: loading && <CircularProgress color="primary" />,
      },
    },
  };

  return (
    <Box>
      <Box className="add-btn">
        <ButtonComponent variant="contained" onClick={onNavigatCreate}>
          {t("button.add")}
        </ButtonComponent>
      </Box>

      <TableComponent
        title={t("table.search_results")}
        data={data}
        columns={columns}
        options={options}
        filter={true}
        formData={[
          {
            label: t("feature.code_feature"),
            name: "featureId",
          },
          {
            label: t("feature.name_feature"),
            name: "featureName",
          },
          {
            label: t("feature.type_feature"),
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

export default Feature;
