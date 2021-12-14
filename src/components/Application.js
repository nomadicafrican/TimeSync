import React from "react";
import DayList from "./DayList";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import "components/Appointment";
import Appointment from "components/Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "Helpers/Selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  // bookInterview();
  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  // console.log(state);

  // useEffect(() => {
  //   const testURL = `/api/days`;
  //   axios.get(testURL).then((response) => {
  //     console.log("response", response.data);
  //     setDays(response.data);
  //   });
  // }, []);

  // const dailyAppointments = getAppointmentsForDay(state, state.days);

  // console.log("state", state.interviewers);
  // if (!dailyAppointments.length) {
  //   return null;
  // }

  // const schedule = dailyAppointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interview);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment time="5pm" />
      </section>
    </main>
  );
}
