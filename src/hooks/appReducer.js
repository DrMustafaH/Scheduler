import {
  GET_INITIAL_DATA,
  SET_DAY,
  UPDATE_APPOINTMENT,
  UPDATE_SPOTS,
} from "./constants";

export const initialState = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: [],
};

export function appReducer(state, action) {
  switch (action.type) {
    case GET_INITIAL_DATA:
      return {
        ...state,
        days: action.payload.days,
        appointments: action.payload.appointments,
        interviewers: action.payload.interviewers,
      };
    case SET_DAY:
      return {
        ...state,
        day: action.day,
      };
    case UPDATE_APPOINTMENT:
      const appointments = {
        ...state.appointments,
        [action.appointment.id]: action.appointment,
      };
      return {
        ...state,
        appointments,
      };
    case UPDATE_SPOTS:
      const days = [...state.days];
      days.forEach((singleDay, i) => {
        if (singleDay.name === state.day) {
          const day = { ...singleDay };
          if (action.direction === "increase") {
            day.spots++;
          } else if (action.direction === "decrease") {
            day.spots--;
          }
          days[i] = day;
        }
      });
      return {
        ...state,
        days,
      };
    default:
      throw new Error(`Action ${action.type} is undefined`);
  }
}
