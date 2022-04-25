import { Box, Collapse, Divider, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { ReactNode, SyntheticEvent, useState } from "react";
import Editor from "@monaco-editor/react";
import Form from "../../components/FormGeneration";
import FormFieldArray from "../../components/FormFieldArray/FormFieldArray";
import { useStyles } from "./DynamicFormStyle";
import { schema } from "./dummyData";
import { useTranslation } from "react-i18next";
import Progress from "components/Loading/Loading";
import ButtonComponent from "components/Button/Button";

interface ITabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Stack
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Stack py={2}>{children}</Stack>}
    </Stack>
  );
}

const DynamicForm = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [jsonData, setJsonData] = useState<any>(schema);
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [tabValue, setTabValue] = useState(0);

  const getErrorMessage = (name: string) => {
    const filterRes = Object.entries(jsonData.properties).filter((item: any) => {
      return item[0] === name.slice(1, name.length);
    });
    const propertyObj: any = filterRes[0][1];

    if (propertyObj) {
      return propertyObj.message;
    }

    return null;
  };

  function transformErrors(errors: any) {
    return errors.map((error: any) => {
      if (error.name === "pattern") {
        error.message =
          getErrorMessage(error.property) ?? `Should match pattern ${error.params.pattern}`;
      }
      if (error.name === "required") {
        error.message = t("error.field_required");
      }
      if (error.name === "format" && error.params.format === "email") {
        error.message = t("error.field_email");
      }
      return error;
    });
  }

  const uiSchema = jsonData.uiSchema;

  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const onSubmit = (formData: any) => console.log(formData);

  const onChangeJSON = (newValue: string | undefined, e: any) => {
    // console.log("onChange", newValue, e);
    setJsonData(JSON.parse(newValue as string));
    
  };

  const onSubmitApplyJson = (formData: any) => {
    setJsonData(formData);
  };

  const rTabs = (str: string) => str?.trim().replace(/^ {4}/gm, "");

  const formatJSON = (val: any = {}) => {
    try {
      const res = JSON.parse(val);
      return JSON.stringify(res, null, 2);
    } catch {
      const errorJson = {
        error: `Error: ${val}`,
      };
      return JSON.stringify(errorJson, null, 2);
    }
  };

  return (
    <Box>
      <Box className="add-btn">
        <ButtonComponent variant="contained">{t("button.save")}</ButtonComponent>
      </Box>
      {/* Form */}
      <Paper elevation={0} className={classes.p2}>
        <Stack direction="row" gap={collapsed ? 1 : 0} className={classes.fullHeight}>
          <Collapse orientation="horizontal" in={collapsed}>
            <Stack direction="row" flex={1} className={classes.fullHeight}>
              <Stack minWidth="600px" className={classes.fullHeight}>
                <Box>
                  <Tabs value={tabValue} onChange={handleChangeTab} aria-label="basic tabs example">
                    <Tab label="JSON" {...a11yProps(0)} />
                    <Tab label="Action" {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                  <Editor
                    height="680px"
                    theme={"light"}
                    language={"json"}
                    loading={Progress}
                    value={formatJSON(rTabs(JSON.stringify(jsonData)))}
                    onChange={onChangeJSON}
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <FormFieldArray jsonData={jsonData} onSubmitApplyJson={onSubmitApplyJson} />
                </TabPanel>
              </Stack>
              <Stack>
                <Divider orientation="vertical" className={classes.mx2} />
              </Stack>
            </Stack>
          </Collapse>
          <Stack flex={1}>
            <Stack direction="row" justifyContent={"space-between"}>
              <Typography variant="h6">{t("menu.dynamic_form")}</Typography>
              <ButtonComponent variant="contained" onClick={() => setCollapsed(!collapsed)}>
                Open/Close Collapse
              </ButtonComponent>
            </Stack>
            <Box mt={4}>
              <Form
                schema={jsonData}
                onSubmit={onSubmit}
                uiSchema={uiSchema}
                titleBtn={t("button.confirm")}
                position="flex-end"
                transformErrors={transformErrors}
              />
            </Box>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default DynamicForm;
