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
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  }

  function remove() {
    if (mode === SHOW) {
      transition(CONFIRM);
    } else {
      transition(DELETING);
      props.cancelInterview(props.id).then(() => transition(EMPTY));
    }
  }

  function edit() {
    transition(EDIT);
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
            onDelete={remove}
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
            onConfirm={remove}
          />
        )}
        {mode === EDIT && (
          <Form
            name={props.student}
            interviewer={props.interview}
            onCancel={back}
            onSave={save}
            interviewers={props.interviewers}
          />
        )}
      </article>
    </>
  );
}
