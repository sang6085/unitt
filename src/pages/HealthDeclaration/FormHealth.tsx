import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { Box, styled } from "@mui/system";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import DoNotDisturbOnRoundedIcon from "@mui/icons-material/DoNotDisturbOnRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import ImgVn from "assets/logo/vn.png";
import ImgEn from "assets/logo/en.png";
import { useFieldArray } from "react-hook-form";
import ButtonComponent from "./ButtonComponent";
import SelectorComponent from "./SelectorComponent";
import SwitchComponent from "./SwitchComponent";
import TextFieldComponent from "./TextFieldComponent";
import IconButtonComponent from "./IconButtonComponent";

interface IForm {
  control: any;
  register: any;
  setValue: any;
  getValues: any;
  field?: any;
  language?: any;
}
const StyleInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    border: "none",
  },
}));

const FromHealth: React.FC<IForm> = ({ control, register, setValue, getValues, field, language }) => {
  const { fields, remove } = useFieldArray({
    control,
    name: "Form",
  });
  const values = getValues();
  const handleAddTitleInput = () => {
    const values = getValues();
    if (values?.Form) {
      const newObj = [
        ...values?.Form,
        {
          ...values?.Form[values?.Form.length],
          questionVI: "",
          questionEN: "",
          answerOptions: [
            { vi: "", en: "" },
            { vi: "", en: "" },
          ],
          isHidden: false,
          isRequired: true,
          sort: 0,
          subType: "",
          type: "1",
          language: language,
          isCollapseForm: true,
          hideForm: false,
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
        answerOptions: values?.Form[index].answerOptions.concat([{ vi: "", en: "" }]),
      };
      const updatedProjects = [...values?.Form.slice(0, index), newObj, ...values?.Form.slice(index + 1)];
      setValue("Form", updatedProjects);
    }
  };
  const handleRemoveAnswerInput = (indexOne: any, indexTwo: any) => {
    const values = getValues();
    if (values?.Form) {
      const newObj = {
        ...values?.Form[indexOne],
        answerOptions: values?.Form[indexOne].answerOptions.filter((item: any, index: any) => index !== indexTwo),
      };
      const updatedProjects = [...values?.Form.slice(0, indexOne), newObj, ...values?.Form.slice(indexOne + 1)];
      setValue("Form", updatedProjects);
    }
  };
  const handleChangeLanguage = (index: any, e: any) => {
    const values = getValues();
    if (values?.Form) {
      const newObj = { ...values?.Form[index], language: e.target.value };
      const updatedProjects = [...values?.Form.slice(0, index), newObj, ...values?.Form.slice(index + 1)];
      setValue("Form", updatedProjects);
    }
  };
  const handleChangeType = (e: any, index: any) => {
    const values = getValues();
    if (values?.Form) {
      const newObj = { ...values?.Form[index], type: e.target.value };
      const updatedProjects = [...values?.Form.slice(0, index), newObj, ...values?.Form.slice(index + 1)];
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
      const updatedProjects = [...values?.Form.slice(0, index), newObj, ...values?.Form.slice(index + 1)];
      setValue("Form", updatedProjects);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end", my: 2 }}>
        <ButtonComponent
          startIcon={<SaveRoundedIcon />}
          variant="contained"
          color="primary"
          type="submit"
          name="btn-save"
          label="Lưu"
        />
        {/* <Button startIcon={<SaveRoundedIcon />} variant="contained" sx={{ background: "green", ml: 2 }}>
          Lưu tất cả địa điểm
        </Button> */}
      </Box>
      {fields?.map((item: any, index: any) => (
        <Paper key={index} elevation={3} sx={{ my: 3 }}>
          <Accordion defaultExpanded={item?.isCollapseForm} TransitionProps={{ unmountOnExit: true }} sx={{ p: 2 }}>
            {/* question */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Typography data-testid="questionName" variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Câu hỏi {index + 1}
                  </Typography>
                  <TextFieldComponent
                    registerProps={register(
                      item?.language === "vi" ? `Form[${index}].questionVI` : `Form[${index}].questionEN`
                    )}
                    key={item?.language === "vi" ? "vi" : "en"}
                    size="small"
                    fullWidth={true}
                    InputProps={{
                      endAdornment: (
                        <FormControl>
                          <SelectorComponent
                            size="small"
                            labelId="demo-simple-select-label1"
                            id="change-language-handler"
                            name="SelectLanguage"
                            input={<StyleInput />}
                            value={values?.Form[index].language}
                            onChange={(e: any) => handleChangeLanguage(index, e)}
                            children={[
                              {
                                value: "vi",
                                label: <img style={{ width: "26px", height: "16px" }} src={ImgVn} alt="img" />,
                              },
                              {
                                value: "en",
                                label: <img style={{ width: "26px", height: "16px" }} src={ImgEn} alt="img" />,
                              },
                            ]}
                          />
                        </FormControl>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ mt: 4, mr: 10 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                ></AccordionSummary>
              </Box>
            </Box>

            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  pr: 15,
                }}
              >
                <Box sx={{ width: "50%" }}>
                  <Typography variant="subtitle2">Loại</Typography>
                  <SelectorComponent
                    registerProps={register(`Form[${index}].type`)}
                    size="small"
                    labelId="demo-simple-select-label1"
                    id="demo-simple-select"
                    defaultValue={values.Form[index].type}
                    onChange={(ev: any) => handleChangeType(ev, index)}
                    fullWidth
                    children={[
                      { value: "1", label: "Single Choice" },
                      { value: "2", label: "Multi Choice" },
                      { value: "3", label: "Dropdown" },
                      { value: "4", label: "Text" },
                    ]}
                  />
                </Box>
                {values.Form[index].type === "4" ? (
                  <Box sx={{ width: "40%" }}>
                    <Typography variant="subtitle2">Định dạng</Typography>
                    <SelectorComponent
                      size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={values.Form[index].subType}
                      onChange={(e: any) => handleChangeSubType(e, index)}
                      fullWidth
                      children={[
                        { value: "1", label: "Text" },
                        { value: "2", label: "Email" },
                        { value: "3", label: "Phone" },
                        { value: "4", label: "Number" },
                      ]}
                    />
                  </Box>
                ) : (
                  <></>
                )}
              </Box>
            </AccordionDetails>
            {/* End question */}

            {/* Answer */}
            {values.Form[index].type === "4" ? (
              <></>
            ) : (
              <AccordionDetails>
                {item?.answerOptions?.map((itemOne: any, indexOne: any) => (
                  <Box
                    key={indexOne}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      pr: 15,
                      mb: 3,
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Typography variant="subtitle2">Lựa chọn {indexOne + 1}</Typography>
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Box sx={{ width: "50%" }}>
                          <TextFieldComponent
                            registerProps={register(
                              item?.language === "vi"
                                ? `Form[${index}].answerOptions[${indexOne}].vi`
                                : `Form[${index}].answerOptions[${indexOne}].en`
                            )}
                            key={item?.language === "vi" ? "vi" : "en"}
                            defaultValue={item?.language === "vi" ? itemOne?.vi : itemOne?.en}
                            size="small"
                            fullWidth
                          />
                        </Box>
                        {indexOne === Number(item?.answerOptions.indexOf(item?.answerOptions.slice(-1).pop())) ? (
                          <IconButton onClick={() => handleAddAnswerInput(index)}>
                            <AddCircleRoundedIcon sx={{ color: "blue" }} />
                          </IconButton>
                        ) : (
                          <></>
                        )}
                        <IconButton onClick={() => handleRemoveAnswerInput(index, indexOne)}>
                          <DoNotDisturbOnRoundedIcon sx={{ color: "red" }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </AccordionDetails>
            )}
            {/* End Answer */}
            {/* Action Answer */}
            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <SwitchComponent
                  registerProps={register(`Form[${index}].isRequired`)}
                  defaultChecked={item.isRequired}
                  label="Bắt buộc"
                />
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                <SwitchComponent
                  registerProps={register(`Form[${index}].isHidden`)}
                  defaultChecked={item.isHidden}
                  label="Ẩn"
                />
                <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                <IconButtonComponent
                  onClick={() => remove(index)}
                  className="deleteQuestionBtn"
                  children={<DeleteRoundedIcon sx={{ color: "red" }} />}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        </Paper>
      ))}
      <ButtonComponent onClick={() => handleAddTitleInput()} label="Thêm câu hỏi" />
    </>
  );
};

export default FromHealth;
