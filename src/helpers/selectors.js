// selector function to get an array of appointments object for specific day
export function getAppointmentsForDay(state, day) {
  const outputArr = [];
  state.days.forEach((singleday) => {
    if (day === singleday.name) {
      singleday.appointments.forEach((e) => {
        outputArr.push(state.appointments[e]);
      });
    }
  });
  return outputArr;
}

// selector function to get an array of interviwers object for specific day
export function getInterviewersForDay(state, day) {
  const outputArr = [];
  state.days.forEach((singleday) => {
    if (day === singleday.name) {
      singleday.interviewers.forEach((e) => {
        outputArr.push(state.interviewers[e]);
      });
    }
  });
  return outputArr;
}

// selector function to get an object of interviewer who had an appointment with student name
export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  let outputObj = {};
  outputObj.student = interview.student;
  outputObj.interviewer = state.interviewers[interview.interviewer];
  return outputObj;
}
