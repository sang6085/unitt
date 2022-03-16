import { Box, Grid, Paper, Typography, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation } from "react-router";
import { getAllMenu, getMenuById, getParentListMenu, updateMenuById } from "../../services/MenuService";
import FallBackComponent from "../../components/FallBackComponent/FallBackComponent";
import { errorHandle } from "../../utils/errorHandler";
import FormWidget from "../../components/FormGeneration/FormWidget";
import Icons from "./Icons";
import "font-awesome/css/font-awesome.min.css";
import { loadCSS } from "fg-loadcss";

const UpdateRole = () => {
  const location = useLocation();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const [id, setId] = React.useState<number | string>(-1);
  const [data, setData] = React.useState<any>();
  const [menuList, setMenuList] = React.useState<any>([]);
  const vertical = "top";
  const horizontal = "right";

  React.useEffect(() => {
    const node = loadCSS("https://use.fontawesome.com/releases/v5.14.0/css/all.css");
    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  React.useEffect(() => {
    const getId = location.pathname.slice(1).split("/")[2];
    if (getId) {
      setId(getId);
      getMenuById(Number(getId)).subscribe((response: any) =>{
        // console.log(response);
        setData(response.data)
      })
      getParentListMenu(Number(getId)).subscribe((response: any) =>{
        setMenuList(
          response.data?.map((item: any) => {
            return { type: "number", title: item.code, enum: [item.id] };
          })
        );
        setLoading(false);
      })
    } else {
      getAllMenu().subscribe((response: any) => {
        const menu = [];
        menu.push({ type: "number", title: response.data[0].code, enum: [response.data[0].id] });
        response.data[0]?.children?.map((item: any) => (
          menu.push({ type: "number", title: item.code, enum: [item.id] })
        ));
        setMenuList(menu);
        setLoading(false);
      });
    }
    axios
      .get(
        "https://gist.githubusercontent.com/sakalauskas/b0c5049d5dc349713a82f1cb2a30b2fa/raw/ce34182e1ac873b0185b03731ec8bd47072c8e0e/FontAwesome-v5.0.9-Free.json"
      )
      .then((response) => {
        console.log(response);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const schema = {
    type: "object",
    required: ["parent", "menuCode", "url", "sort"],
    properties: {
      parent: {
        type: "number",
        title: "Parent",
        anyOf: menuList,
        default: data?.parentId ?? menuList[0]?.enum[0],
      },
      menuCode: {
        type: "string",
        title: "Menu Code",
        default: id >= 0 ? data?.code : "",
      },
      url: {
        type: "string",
        title: "URL",
        default: id >= 0 ? data?.url : "",
      },
      icon: {
        type: "string",
        title: "Icon",
        anyOf: Icons,
        default: id >= 0 ? data?.icon : "",
      },
      sort: {
        type: "number",
        title: "Sort",
        default: id >= 0 ? data?.sort : "",
      },
      isActive: {
        type: "boolean",
        default: true,
        title: "Active: ",
      },
    },
  };

  const uiSchema = {
    isActive: {
      "ui:widget": "radio",
    },
  };

  const onSubmit = (data: any) => {
    updateMenuById({
      ...data.formData,
      id: id,
      isActive: Number(data.formData.isActive),
    }).subscribe((response: any) => {
      if (response.data.success) {
        setData({
          ...data.formData,
          id: id,
        });
        setOpenAlert(true);
      }
    });
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Box>
      <Box className="title">
        <Typography component="h2" variant="h6">
          {id >= 0 ? "Update" : "Add"} Role
        </Typography>
      </Box>
      <Box className="content">
        <Grid container>
          <Grid item xs={12} md={5}>
            {!loading ? (
              <Paper sx={{ px: 4, py: 6 }}>
                <ErrorBoundary FallbackComponent={FallBackComponent} onError={errorHandle}>
                  <FormWidget
                    schema={schema}
                    onSubmit={onSubmit}
                    uiSchema={uiSchema}
                    titleBtn={id >= 0 ? "Update" : "Add"}
                  />
                </ErrorBoundary>
              </Paper>
            ) : null}
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={openAlert}
        autoHideDuration={5000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: "100%" }}>
          Updated Successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UpdateRole;
