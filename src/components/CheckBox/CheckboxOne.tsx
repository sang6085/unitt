import React from "react";
import { Input } from "reactstrap";
import "./Checkbox.scss";

interface ICheckbox {
  checked?: boolean;
}

export const CheckBoxOne: React.FC<ICheckbox> = ({ checked }) => {
  return (
    <div>
      <div className="checkbox1">
        <input
          checked={checked}
          type="checkbox"
          className="input-cb1"
          id="input-cb1"
        />
        <label htmlFor="input-cb1"></label>
      </div>
    </div>
  );
};

export const CheckBoxTwo: React.FC<ICheckbox> = ({ checked }) => {
  return (
    <div>
      <div className="checkbox2">
        <input
          checked={checked}
          type="checkbox"
          className="input-cb2"
          id="input-cb2"
        />
        <label htmlFor="input-cb2"></label>
      </div>
    </div>
  );
};
export const CheckBoxGreen: React.FC<ICheckbox> = ({ checked }) => {
  return (
    <>
      <Input checked={checked} type="checkbox" className="checkbox-green" />
    </>
  );
};
export const CheckBoxRed: React.FC<ICheckbox> = ({ checked }) => {
  return (
    <>
      <Input checked={checked} type="checkbox" className="checkbox-red" />
    </>
  );
};
