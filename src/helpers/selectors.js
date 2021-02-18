export function getAppointmentsForDay(state, day) {
  const outputArr = [];
  state.days.forEach(singleday => {
    if (day === singleday.name) {
      singleday.appointments.forEach(e => {
        const appointementKeys = Object.keys(state.appointments)
        const filteredArr = appointementKeys.filter(appointmentKey => Number(appointmentKey) === e)
        filteredArr.forEach(key => {
          let stringKey = key.toString()
          let objects = state.appointments[stringKey]
          outputArr.push(objects)
        });
      })
    }
  });
  return outputArr;
}


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
