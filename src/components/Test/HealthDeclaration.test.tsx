import React from "react";
import { shallow } from "enzyme";
import AddQuestionButton from "../../pages/HealthDeclaration/ButtonComponent";
import SelectorComponent from "../../pages/HealthDeclaration/SelectorComponent";
import SwitchComponent from "../../pages/HealthDeclaration/SwitchComponent";
import IconButtonComponent from "../../pages/HealthDeclaration/IconButtonComponent";
import TextFieldComponent from "../../pages/HealthDeclaration/TextFieldComponent";

describe("Health Declaration Form", () => {
  // test button
  it("Test click event add question", () => {
    const mockCallBack = jest.fn();
    const button = shallow(<AddQuestionButton onClick={mockCallBack} name="addQuestionButton" />);
    expect(mockCallBack.mock.calls.length).toEqual(0);
    button.find(".addQuestionButton").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it("Test click event delete question", () => {
    const mockCallBack = jest.fn();
    const button = shallow(<IconButtonComponent onClick={mockCallBack} />);
    expect(mockCallBack.mock.calls.length).toEqual(0);
    button.simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  // selector

  it("Test render change selector correctly", () => {
    const selector = shallow(<SelectorComponent value="en" />);
    expect(selector.getElement().props.value).toEqual("en");
  });

  it("Test onchange event change selector", () => {
    const mockCallBack = jest.fn();
    const selector = shallow(<SelectorComponent onChange={mockCallBack} value="en" />);
    expect(mockCallBack.mock.calls.length).toEqual(0);
    selector.simulate("change");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  // switch button ( toggle)

  it("Test render switch button correcly", () => {
    const switches = shallow(<SwitchComponent label="Test Switch" />);
    expect(switches.getElement().props.label).toEqual("Test Switch");
  });

  // it("Test OnChange event switch button", () => {
  //   const mockCallBack = jest.fn();
  //   const defaultChecked = true;
  //   const switches = shallow(
  //     <SwitchComponent label="Bắt buộc" defaultChecked={defaultChecked} registerProps={mockCallBack} />
  //   );
  //   // expect(mockCallBack.mock.calls.length).toEqual(defaultChecked);
  //   console.log();

  //   switches.find(".switches-button").simulate("click");
  //   console.log(switches.find(".switches-button").getElement().props.defaultChecked);
  //   // expect(Boolean(mockCallBack.mock.calls.length)).toEqual(defaultChecked);
  // });

  // test textfield
  it("Test value of text field", () => {
    const mockCallBack = jest.fn();
    const textfield = shallow(<TextFieldComponent registerProps={mockCallBack} />);
    expect(textfield.text()).not.toBeNull();
    const textfieldAddDefaultValue = shallow(
      <TextFieldComponent defaultValue="value text" registerProps={mockCallBack} />
    );
    expect(textfieldAddDefaultValue.getElement().props.defaultValue).toEqual("value text");
  });

  // test form
  it("Test submit button is clicked", () => {
    const mockCallBack = jest.fn();
    const button = shallow(<AddQuestionButton onClick={mockCallBack} name="submit-form" type="submit" />);
    expect(mockCallBack.mock.calls.length).toEqual(0);
    button.find(".submit-form").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });
});
