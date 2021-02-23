import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: [],
  });
  const setDay = (day) => setState({ ...state, day });

  // function to book interview and add it to API
  function bookInterview(id, interview, type) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`/api/appointments/${appointment.id}`, {
        id: appointment.id,
        time: appointment.time,
        interview: appointment.interview,
      })
      .then((res) => {
        if (res.status === 204) {
          let updatedState = { ...state, appointments };
          if (type !== "edit") {
            const updatedDays = spotsUpdater("decrease", state);
            updatedState = { ...updatedState, days: updatedDays };
          }
          setState(updatedState);
        }
      });
  }

  // function to cancel interview and remove it from API
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`/api/appointments/${appointment.id}`, {
        id: appointment.id,
        time: appointment.time,
        interview: null,
      })
      .then((res) => {
        if (res.status === 204) {
          const updatedDays = spotsUpdater("increase", state);
          setState({ ...state, appointments, days: updatedDays });
        }
      });
  }

  // function to update remaining spot counter
  function spotsUpdater(type, currentState) {
    const days = [...currentState.days];
    days.forEach((singleDay, i) => {
      if (singleDay.name === currentState.day) {
        const day = { ...singleDay };
        if (type === "increase") {
          day.spots++;
        } else if (type === "decrease") {
          day.spots--;
        }
        days[i] = day;
      }
    });
    return days;
  }

  // logic to retrieve data from API
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  const outputObj = {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
  return outputObj;
}
