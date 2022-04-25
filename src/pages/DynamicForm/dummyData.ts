export const schema = {
  type: "object",
  required: ["employeeId", "mobileNumber", "gender"],
  properties: {
    employeeId: {
      type: "string",
      title: "Employee Id",
      pattern: "^[0-9]",
      message: "required fill to numbers"
    },
    email: {
      type: "string",
      title: "Email/User Name",
      format: "email",
    },
    mobileNumber: {
      type: "string",
      title: "Mobile No.",
    },
    gender: {
      type: "string",
      title: "Gender",
      anyOf: [
        {
          title: "Male",
          enum: ["Male"],
        },
        {
          title: "Female",
          enum: ["Female"],
        },
      ],
    },
    status: {
      type: "string",
      title: "Status",
      anyOf: [
        {
          title: "Active",
          enum: ["Active"],
        },
        {
          title: "Inactive",
          enum: ["Inactive"],
        },
      ],
    },
    isMarried: {
      type: "boolean",
      title: "Are you married?",
    },
  },
  uiSchema: {
    status: {
      "ui:widget": "radio",
    },
    status1: {
      "ui:widget": "radio",
    },
  },
};