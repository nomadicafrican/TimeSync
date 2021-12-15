import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function useApplicationData() {
  const setDay = (day) => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],

    appointments: {},
    interviewers: {},
  });
  function bookInterview(id, interview) {
    const dayUpdater = state.days.findIndex((day) =>
      day.appointments.includes(id)
    );
    const day = {
      ...state.days.find((day) => day.name === state.day),
      spots: state.days[dayUpdater].spots - 1,
    };
    const days = state.days;
    days[dayUpdater] = day;

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState((prev) => ({ ...prev, appointments, days }));
    });
  }
  function cancelInterview(id) {
    const dayUpdater = state.days.findIndex((day) =>
      day.appointments.includes(id)
    );
    const day = {
      ...state.days.find((day) => day.name === state.day),
      spots: state.days[dayUpdater].spots + 1,
    };
    const days = state.days;
    days[dayUpdater] = day;

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`api/appointments/${id}`, appointments[id]).then(() => {
      setState((prev) => ({ ...prev, appointments, days }));
    });
  }
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
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview, setState };
}
