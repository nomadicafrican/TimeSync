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

export default function Application(props) {
  const setDay = (day) => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],

    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {
    console.log(id, interview);
  }

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
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      // console.log(all[0].data);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
      console.log("all", all);
      console.log(state);
      // const dailyAppointments = getAppointmentsForDay(
      //   {
      //     days: all[0].data,
      //     appointments: all[1].data,
      //     interviewers: all[2].data,
      //   },
      //   all[0].data
      // );
      // console.log(dailyAppointments);
      // setDailyAppointment(dailyAppointments);
    });
  }, []);
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
      <section className="schedule">{schedule}</section>
    </main>
  );
}
