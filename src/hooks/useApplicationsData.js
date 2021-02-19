import { useState, useEffect } from "react";
import axios from 'axios'

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });

  const setDay = day => setState({ ...state, day });
  const setAppointments = appointments => setState({ ...state, appointments })

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${appointment.id}`, {
      id: appointment.id,
      time: appointment.time,
      interview: appointment.interview
    })
      .then((res) => {
        if (res.status === 204) {
          setAppointments(appointments);
        }
      })
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${appointment.id}`, {
      id: appointment.id,
      time: appointment.time,
      interview: null
    })
      .then((res) => {
        if (res.status === 204) {
          setAppointments(appointments);
        }
      })
  }


  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])

  const outputObj = {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
  return outputObj
}