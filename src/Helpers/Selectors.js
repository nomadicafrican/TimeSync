// import Appointment from "components/Appointment";

export function getAppointmentsForDay(state, day) {
  // console.log("getappointemets", state);
  console.log("day", day);
  const arr = [];
  for (const element of state.days) {
    if (element.name === day) {
      for (const index of element.appointments) {
        if (state.appointments[index]) {
          arr.push(state.appointments[index]);
        }
      }
    }
  }
  return arr;
}

export function getInterview(state, interview) {
  const obj = {};
  if (interview) {
    obj["student"] = interview.student;
    obj["interviewer"] = state.interviewers[interview.interviewer];
    // return obj;
  } else {
    return null;
  }
  return obj;
}
export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.find((days) => days.name === day);

  let interviewers = [];
  if (filteredDay) {
    interviewers = filteredDay.interviewers.map((id) => {
      return state.interviewers[id];
    });
  }

  return interviewers;
}
