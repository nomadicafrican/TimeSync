import React, { useState } from "react";

import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "components/Appointment/Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  console.log("hello", props);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(
      () => {
        transition(SHOW);
      },
      (error) => {
        console.log("Saving error:", error);
        transition(ERROR_SAVE, true);
      }
    );
  };
  const deleteTheInterview = () => {
    if (mode === SHOW) {
      transition(CONFIRM);
    } else {
      transition(DELETING);
      props.cancelInterview(props.id).then(
        () => transition(EMPTY),
        (error) => {
          console.log("Delete error:", error);
          transition(ERROR_DELETE, true);
        }
      );
    }
  };

  function edit() {
    transition(EDIT);
  }
  function closeMessage() {
    back();
  }

  return (
    <>
      <article className="appointment">
        <Header time={props.time} />

        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={deleteTheInterview}
            onEdit={edit}
          />
        )}
        {mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={() => back(EMPTY)}
            onSave={save}
          />
        )}
        {mode === SAVING && <Status message="SAVING" />}
        {mode === DELETING && <Status message="Deleting" />}
        {mode === CONFIRM && (
          <Confirm
            message="Are you sure you want to cancel this appointment"
            onCancel={back}
            onConfirm={deleteTheInterview}
          />
        )}
        {mode === EDIT && (
          <Form
            name={props.interview.student}
            interviewer={props.interview.interviewer.id}
            onCancel={back}
            onSave={save}
            interviewers={props.interviewers}
          />
        )}
        {mode === ERROR_SAVE && (
          <Error
            message="Select an interviewer please or input a name"
            onClose={closeMessage}
          />
        )}
        {mode === ERROR_DELETE && (
          <Error
            message="Could not delete appointment please try again later"
            onClose={closeMessage}
          />
        )}
      </article>
    </>
  );
}
