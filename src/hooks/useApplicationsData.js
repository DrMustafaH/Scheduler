import { useEffect, useReducer } from "react";
import axios from "axios";
import {
  updateAppointment,
  updateDay,
  updateInitialData,
  updateSpot,
} from "./actions";
import { appReducer, initialState } from "./appReducer";

export function useApplicationData() {
  let [state, dispatch] = useReducer(appReducer, initialState);

  const setDay = (day) => {
    dispatch(updateDay(day));
  };

  // function to book interview and add it to API
  function bookInterview(id, interview, type) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    return axios
      .put(`/api/appointments/${appointment.id}`, {
        id: appointment.id,
        time: appointment.time,
        interview: appointment.interview,
      })
      .then((res) => {
        if (res.status === 204) {
          if (type !== "edit") {
            dispatch(updateSpot("decrease"));
          }
          dispatch(updateAppointment(appointment));
        }
      });
  }

  // function to cancel interview and remove it from API
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    return axios
      .delete(`/api/appointments/${appointment.id}`, {
        id: appointment.id,
        time: appointment.time,
        interview: null,
      })
      .then((res) => {
        if (res.status === 204) {
          dispatch(updateAppointment(appointment));
          dispatch(updateSpot("increase"));
        }
      });
  }

  // logic to retrieve data from API
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      let res = {
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      };
      dispatch(updateInitialData(res));
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
