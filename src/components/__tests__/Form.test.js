import React from "react";

import { render, cleanup } from "@testing-library/react";

import Form from "components/Appointment/Form";
import { fireEvent } from "@testing-library/react/dist";

afterEach(cleanup);

describe("Form", () => {
  const interviewersData = [
    { avatar: "https://i.imgur.com/LpaY82x.png", id: 1, name: "Sylvia Palmer" },
    { avatar: "https://i.imgur.com/T2WwVfS.png", id: 3, name: "Mildred Nazir" },
    { avatar: "https://i.imgur.com/twYrpay.jpg", id: 5, name: "Sven Jones" },
  ];

  it("renders without crashing", () => {
    render(<Form interviewers={interviewersData} />);
  });

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewersData} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewersData} name="Alice Liddell" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Alice Liddell");
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <Form interviewers={interviewersData} onSave={onSave} />
    );
    fireEvent.click(getByText("Save"));
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText, getByAltText } =
      render(<Form interviewers={interviewersData} onSave={onSave} />);

    fireEvent.click(getByText("Save"));
    expect(onSave).not.toHaveBeenCalled();
    fireEvent.click(getByAltText("Sylvia Palmer"));
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByText("Save"));
    expect(queryByText(/The name cannot be left blank./i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("can successfully save after trying to submit without an interviewer", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText, getByAltText } =
      render(<Form interviewers={interviewersData} onSave={onSave} />);
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByText("Save"));

    expect(onSave).not.toHaveBeenCalled();
    fireEvent.click(getByAltText("Sylvia Palmer"));
    fireEvent.click(getByText("Save"));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewersData}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
    fireEvent.click(getByText("Save"));
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByText("Cancel"));

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
