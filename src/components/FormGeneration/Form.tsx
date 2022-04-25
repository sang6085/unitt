import React from "react";
import MForm, { FormProps } from "react-jsonschema-form";
import FieldTemplate from "./FieldTemplate";
import BaseInput from "./TextFieldComponent";
import SelectWidget from "./SelectComponent";
import RadioWidget from "./RadioComponent";
import CheckboxWidget from "./CheckboxComponent";

import ButtonComponent from "../Button/Button";
import { Stack } from "@mui/material";

interface IFormWidget extends FormProps<any>{
  titleBtn: string;
  position?: string;
}

const widgets = {
  BaseInput,
  SelectWidget,
  CheckboxWidget,
  RadioWidget,
};

const FormWidget = ({
  onSubmit,
  uiSchema = {},
  position,
  schema,
  liveValidate = true,
  titleBtn,
  transformErrors
}: IFormWidget) => {
  return (
    <div>
      <MForm
        noHtml5Validate
        FieldTemplate={FieldTemplate}
        schema={schema}
        uiSchema={uiSchema}
        widgets={widgets}
        showErrorList={false}
        liveValidate={liveValidate}
        onSubmit={onSubmit}
        transformErrors={transformErrors}
      >
        {titleBtn ? (
          <Stack alignItems={`${position || "flex-start"}`}>
            <ButtonComponent type="submit" variant="contained">
              {titleBtn}
            </ButtonComponent>
          </Stack>
        ) : (
          <></>
        )}
      </MForm>
    </div>
  );
};

export default FormWidget;
