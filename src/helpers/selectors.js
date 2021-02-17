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