import { Button } from "@mui/material";
import React from "react";
import MForm from "react-jsonschema-form";
import FieldTemplate from "./FieldTemplate";
import BaseInput from "./BaseInput";
import SelectWidget from "./SelectWidget";
import RadioWidget from "./RadioWidget";
import { Box } from "@mui/system";

interface IFormWidget {
  onSubmit: any;
  uiSchema: any;
  schema: any;
  liveValidate?: boolean;
  titleBtn: string;
  position?: string 
}

const widgets = {
  BaseInput,
  SelectWidget,
  RadioWidget,
};

const FormWidget = ({
  onSubmit,
  uiSchema = {},
  position,
  schema,
  liveValidate = true,
  titleBtn,
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
      >
        <Box sx={{display: "flex", justifyContent: `${position || "flex-start"}` }}>
          <Button type="submit" variant="contained">
            {titleBtn}
          </Button>
        </Box>
      </MForm>
    </div>
  );
};

export default FormWidget;
