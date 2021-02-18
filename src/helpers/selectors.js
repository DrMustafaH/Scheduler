// selector function to get an array of appointments object for specific day
export function getAppointmentsForDay(state, day) {
  const outputArr = [];
  state.days.forEach(singleday => {
    if (day === singleday.name) {
      singleday.appointments.forEach(e => {
        const appointementKeys = Object.keys(state.appointments)
        const filteredArr = appointementKeys.filter(appointmentKey => Number(appointmentKey) === e)
        filteredArr.forEach(key => {
          const stringKey = key.toString()
          const appointmentObj = state.appointments[stringKey]
          outputArr.push(appointmentObj)
        });
      })
    }
  });
  return outputArr;
}


// selector function to get an array of interviwers object for specific day
export function getInterviewersForDay(state, day) {
  const outputArr = [];
  let newfilteredArr = "";
  state.days.forEach(singleday => {
    if (day === singleday.name) {
      singleday.appointments.forEach(e => {
        const appointmentKeys = Object.keys(state.appointments)
        const toNumbers = arr => arr.map(Number);
        const appointmentKeysNumber = toNumbers(appointmentKeys)
        const filteredArr = appointmentKeysNumber.filter(appointmentKey => singleday.appointments.includes(appointmentKey))
        newfilteredArr = filteredArr;
      })
    }
  });
  if (newfilteredArr.length > 0) {
    newfilteredArr.forEach(key => {
      const stringAppointmentKey = key.toString()
      if (state.appointments[stringAppointmentKey].interview !== null) {
        const interviewerID = state.appointments[stringAppointmentKey].interview.interviewer
        outputArr.push(state.interviewers[interviewerID])
      }
    });
  }
  return outputArr;
}


// selector function to get an object of interviewer who had an appointment with student name
export function getInterview(state, interview) {
  if (interview === null) {
    return null
  }
  let outputObj = null;
  const appointmentKeys = Object.keys(state.appointments)
  for (const key of appointmentKeys) {
    const interviewInfo = state.appointments[key].interview
    if (interviewInfo !== null) {
      outputObj = {}
      outputObj.student = interviewInfo.student
      const interviewersKey = interviewInfo.interviewer
      const stringInterviewersKey = interviewersKey.toString()
      outputObj.interviewer = state.interviewers[stringInterviewersKey]
    }
  }
  return outputObj
}
