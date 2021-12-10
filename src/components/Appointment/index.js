import React, { useState } from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";

export default function Appointment(props) {
  return (
    <>
      <article className="appointment">
        <Header time={props.time} />
        {props.interview ? (
          <Show student={props.student} interviewer={props.interview} />
        ) : (
          <Empty />
        )}
      </article>
    </>
  );
}
