import React, { FC, Fragment, useEffect, useState } from "react";
import clsx from "clsx";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DoNotDisturbOnRoundedIcon from "@mui/icons-material/DoNotDisturbOnRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useFieldArray, useForm } from "react-hook-form";
import ButtonComponent from "components/Button/Button";
import { useStyles } from "components/FormFieldArray/FormFieldArrayStyle";
import Progress from "components/Loading/Loading";
import { useTranslation } from "react-i18next";

interface IFormFieldArray {
  jsonData: any;
  onSubmitApplyJson: (formData: any) => void;
}

const FormFieldArray: FC<IFormFieldArray> = ({ jsonData, onSubmitApplyJson }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { control, handleSubmit, getValues, setValue, register } = useForm();

  const { fields, remove } = useFieldArray({
    control,
    name: "Form",
  });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkRadio = (name: string) => {
      const index = Object.entries(jsonData.uiSchema).findIndex((item: any) => {
        if (name === item[0]) {
          return item[1]["ui:widget"] === "radio";
        }
        return false;
      });

      return index < 0 ? false : true;
    };

    const getType = (type: string, anyOf: any, name: string) => {
      if (checkRadio(name)) return "3";
      if (anyOf?.length) {
        return "2";
      }
      if (type === "boolean") return "4";
      return "1";
    };

    const getSubtype = (format: string, pattern: string) => {
      if (pattern) return "4";
      if (format === "email") return "2";
      if (format === "number") return "3";
      return "1";
    };

    const getRequired = (requiredArr: any, name: string) => {
      const index = requiredArr.findIndex((value: string) => {
        return value === name;
      });
      return index < 0 ? false : true;
    };

    const getOption = (anyOf: any) => {
      const result: any = [];
      anyOf?.forEach((item: any) => {
        result.push({
          title: item.title,
        });
      });
      return result;
    };

    const getData = async () => {
      setLoading(true);
      const response = await Object.entries(jsonData?.properties).map((item: any) => {
        return {
          name: item[0],
          title: item[1].title,
          type: getType(item[1].type, item[1].anyOf, item[0]),
          subType: getSubtype(item[1].format, item[1].pattern),
          answerOptions: getOption(item[1].anyOf),
          required: getRequired(jsonData?.required, item[0]),
          disabled: item[1].disabled ? true : false,
          pattern: item[1].pattern ?? "",
          message: item[1].message,
        };
      });
      setValue("Form", response);
      setLoading(false);
    };
    getData();
  }, [setValue, jsonData]);

  const values = getValues();

  const handleAddTitleInput = () => {
    const values = getValues();
    if (values?.Form) {
      const newObj = [
        ...values?.Form,
        {
          ...values?.Form[values?.Form.length],
          name: "",
          title: "",
          type: "1",
          subType: "1",
          answerOptions: [{ title: "" }, { title: "" }],
          required: false,
          disabled: false,
          pattern: "",
          message: "",
        },
      ];
      setValue("Form", newObj);
    }
  };

  const handleAddAnswerInput = (index: any) => {
    const values = getValues();
    if (values?.Form) {
      const newObj = {
        ...values?.Form[index],
        answerOptions: values?.Form[index].answerOptions.concat({ title: "" }),
      };
      const updatedProjects = [
        ...values?.Form.slice(0, index),
        newObj,
        ...values?.Form.slice(index + 1),
      ];
      setValue("Form", updatedProjects);
    }
  };

  const handleRemoveAnswerInput = (indexOne: any, indexTwo: any) => {
    const values = getValues();
    if (values?.Form) {
      const newObj = {
        ...values?.Form[indexOne],
        answerOptions: values?.Form[indexOne].answerOptions.filter(
          (item: any, index: any) => index !== indexTwo
        ),
      };
      const updatedProjects = [
        ...values?.Form.slice(0, indexOne),
        newObj,
        ...values?.Form.slice(indexOne + 1),
      ];
      setValue("Form", updatedProjects);
    }
  };

  const handleChangeType = (e: any, index: any) => {
    const values = getValues();
    if (values?.Form) {
      const newObj = { ...values?.Form[index], type: e.target.value };
      const updatedProjects = [
        ...values?.Form.slice(0, index),
        newObj,
        ...values?.Form.slice(index + 1),
      ];
      setValue("Form", updatedProjects);
    }

    if (values?.Form[index].answerOptions.length === 0 && e.target.value !== "4") {
      handleAddAnswerInput(index);
      handleAddAnswerInput(index);
    }
  };

  const handleChangeSubType = (e: any, index: any) => {
    // setValueFormat(ev.target.value);
    const values = getValues();
    if (values?.Form) {
      const newObj = { ...values?.Form[index], subType: e.target.value };
      const updatedProjects = [
        ...values?.Form.slice(0, index),
        newObj,
        ...values?.Form.slice(index + 1),
      ];
      setValue("Form", updatedProjects);
    }
  };

  const onSubmit = async (data: any) => {
    const requiredData: any = [];
    var propertiesData: any = {};
    var uiSchema: any = {};

    const getAnyOf = (answerOptions: any) => {
      const result: any = [];
      answerOptions?.forEach((item: any) => {
        result.push({
          title: item.title,
          enum: [item.title],
        });
      });
      return result;
    };

    const getFormat = (subType: string) => {
      if (subType === "2") return "email";
      if (subType === "3") return "number";
      return null;
    };

    const getValueObj = (item: any) => {
      var valueObj = {};

      valueObj = { ...valueObj, title: item.title };

      if (item.disabled) {
        valueObj = { ...valueObj, disabled: true };
      }

      if (item.type === "4") {
        valueObj = { ...valueObj, type: "boolean" };
      } else {
        valueObj = { ...valueObj, type: "string" };
      }

      if (item.type === "2" || item.type === "3") {
        valueObj = { ...valueObj, anyOf: getAnyOf(item.answerOptions) };
      }

      if (getFormat(item.subType)) {
        valueObj = { ...valueObj, format: getFormat(item.subType) };
      }

      if (item.subType === "4" && item.pattern) {
        valueObj = { ...valueObj, pattern: item.pattern, message: item.message };
      }

      return valueObj;
    };

    data.Form.forEach((item: any) => {
      if (item.required) {
        requiredData.push(item.name);
      }

      if (item.type === "3") {
        uiSchema = { ...uiSchema, [item.name]: { "ui:widget": "radio" } };
      }

      if (item.title && item.name) {
        propertiesData = {
          ...propertiesData,
          [item.name]: getValueObj(item),
        };
      }
    });

    const response = {
      type: "object",
      required: requiredData,
      properties: propertiesData,
      uiSchema: uiSchema,
    };
    onSubmitApplyJson(response);
  };

  return (
    <Box>
      {loading ? (
        <Progress />
      ) : (
        <Paper elevation={0}>
          <form onSubmit={handleSubmit(onSubmit)} className="formHealth">
            {fields?.map((item: any, index: any) => (
              <Accordion
                defaultExpanded={item?.isCollapseForm}
                TransitionProps={{ unmountOnExit: true }}
                className={classes.accordion}
              >
                {/* question */}
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box className={classes.w90}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <FormLabel>Name</FormLabel>
                        <TextField
                          {...register(`Form[${index}].name`)}
                          key={item?.language === "vi" ? "vi" : "en"}
                          size="small"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormLabel>{t("dynamic_form.title")}</FormLabel>
                        <TextField
                          {...register(`Form[${index}].title`)}
                          key={item?.language === "vi" ? "vi" : "en"}
                          size="small"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                  </Box>

                  <Box>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className={classes.pt3}
                    />
                  </Box>
                </Stack>

                <AccordionDetails className={classes.p0}>
                  <Stack flexDirection="row" justifyContent="space-between" className={classes.w90}>
                    <Grid container spacing={1}>
                      <Grid item xs={6} width="100%">
                        <FormLabel>{t("dynamic_form.type")}</FormLabel>
                        <Select
                          {...register(`Form[${index}].type`)}
                          size="small"
                          labelId="demo-simple-select-label1"
                          id="demo-simple-select"
                          defaultValue={values.Form[index].type}
                          onChange={(ev) => handleChangeType(ev, index)}
                          fullWidth
                        >
                          <MenuItem value={"1"}>Text</MenuItem>
                          <MenuItem value={"2"}>Select Option</MenuItem>
                          <MenuItem value={"3"}>Radio</MenuItem>
                          <MenuItem value={"4"}>Checkbox</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={6}>
                        {values.Form[index].type === "1" ? (
                          <Fragment>
                            <FormLabel>{t("dynamic_form.format")}</FormLabel>
                            <Select
                              size="small"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={values.Form[index].subType}
                              onChange={(e) => handleChangeSubType(e, index)}
                              fullWidth
                            >
                              <MenuItem value={"1"}>Text</MenuItem>
                              <MenuItem value={"2"}>Email</MenuItem>
                              <MenuItem value={"3"}>Number</MenuItem>
                              <MenuItem value={"4"}>Regex</MenuItem>
                            </Select>
                          </Fragment>
                        ) : (
                          <></>
                        )}
                      </Grid>
                    </Grid>
                  </Stack>
                </AccordionDetails>
                {/* End question */}

                {/* Answer */}
                {values.Form[index].type === "1" || values.Form[index].type === "4" ? (
                  <></>
                ) : (
                  <AccordionDetails className={clsx(classes.p0, classes.w90)}>
                    {item?.answerOptions?.length &&
                      item?.answerOptions?.map((itemAns: any, indexAns: any) => (
                        <Stack direction="row" justifyContent="space-between" key={indexAns}>
                          <Box className={classes.fullWidth}>
                            <FormLabel>
                              {t("dynamic_form.option")} {indexAns + 1}
                            </FormLabel>
                            <Stack direction="row">
                              <Box className={classes.w50}>
                                <TextField
                                  {...register(`Form[${index}].answerOptions[${indexAns}].title`)}
                                  size="small"
                                  fullWidth
                                />
                              </Box>
                              {indexAns ===
                              Number(
                                item?.answerOptions.indexOf(item?.answerOptions.slice(-1).pop())
                              ) ? (
                                <IconButton onClick={() => handleAddAnswerInput(index)}>
                                  <AddCircleRoundedIcon className={classes.colorBlue} />
                                </IconButton>
                              ) : (
                                <></>
                              )}
                              <IconButton onClick={() => handleRemoveAnswerInput(index, indexAns)}>
                                <DoNotDisturbOnRoundedIcon className={classes.colorRed} />
                              </IconButton>
                            </Stack>
                          </Box>
                        </Stack>
                      ))}
                  </AccordionDetails>
                )}
                {/* End Answer */}

                {values.Form[index].subType === "4" ? (
                  <Box className={classes.w90}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <FormLabel>{t("dynamic_form.regex")}</FormLabel>
                        <TextField {...register(`Form[${index}].pattern`)} size="small" fullWidth />
                      </Grid>
                      <Grid item xs={6}>
                        <FormLabel>{t("dynamic_form.error_message")}</FormLabel>
                        <TextField {...register(`Form[${index}].message`)} size="small" fullWidth />
                      </Grid>
                    </Grid>
                  </Box>
                ) : (
                  <></>
                )}
                {/* Action Answer */}
                <AccordionDetails className={clsx(classes.w90, classes.p0)}>
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    className={classes.mt1}
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          {...register(`Form[${index}].disabled`)}
                          defaultChecked={item.disabled}
                        />
                      }
                      label={t("dynamic_form.hide") as string}
                    />
                    <Divider orientation="vertical" flexItem className={classes.mx2} />
                    <FormControlLabel
                      control={
                        <Switch
                          {...register(`Form[${index}].required`)}
                          defaultChecked={item.required}
                        />
                      }
                      label={t("dynamic_form.require") as string}
                    />
                    <Divider orientation="vertical" flexItem className={classes.mx2} />
                    <IconButton onClick={() => remove(index)}>
                      <DeleteRoundedIcon className={classes.colorRed} />
                    </IconButton>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            ))}
            <Stack direction="row" mt={1} justifyContent="flex-end" className={classes.w90}>
              <ButtonComponent variant="contained" onClick={() => handleAddTitleInput()}>
                {t("button.append")}
              </ButtonComponent>
              <ButtonComponent variant="contained" type="submit" className={classes.ml1}>
                {t("button.apply")}
              </ButtonComponent>
            </Stack>
          </form>
        </Paper>
      )}
    </Box>
  );
};

export default FormFieldArray;
