import React from "react";

interface IFieldTemplate {
  classNames: any;
  description: any;
  children: any;
}

function FieldTemplate(props: IFieldTemplate) {
  const { classNames, description, children } = props;
  return (
    <div className={classNames}>
      {description}
      {children}
    </div>
  );
}

export default FieldTemplate;
