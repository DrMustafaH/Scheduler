import {
  GET_INITIAL_DATA,
  SET_DAY,
  UPDATE_APPOINTMENT,
  UPDATE_SPOTS,
} from "./constants";

// sugar function to use to update state to get initial data
export const updateInitialData = (payload) => ({
  type: GET_INITIAL_DATA,
  payload,
});

// sugar function to use to update day in state when selected in app
export const updateDay = (newDay) => ({
  type: SET_DAY,
  day: newDay,
});

// sugar function to use to update appointment in state when appointment is booked or cancelled
export const updateAppointment = (newAppointment) => ({
  type: UPDATE_APPOINTMENT,
  appointment: newAppointment,
});

// sugar function to use to update spots number in state
export const updateSpot = (direction) => ({
  type: UPDATE_SPOTS,
  direction,
});
