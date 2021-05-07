import { types } from "../types/types";

/* {
  id: new Date().getTime(),
  title: "Cumpleaños de Isabel",
  start: moment().toDate(),
  end: moment().add(2, "hours").toDate(),
  bgColor: "#fffff",
  user: {
    _id: "123",
    name: "Kike",
  },
}, */

const initialState = {
  events: [],
  active: null,
};

export const calendarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.eventSetActive:
      return { ...state, active: payload };

    case types.eventAddNew:
      return { ...state, events: [...state.events, payload] };

    case types.eventClearActive:
      return { ...state, active: null };

    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map((event) =>
          payload.id === event.id ? payload : event
        ),
      };

    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter((event) => state.active.id !== event.id),
        active: null,
      };

    case types.eventsLoaded:
      return {
        ...state,
        events: [...payload],
      };

    case types.eventLogout:
      return {
        ...state,
        active: null,
      };

    default:
      return state;
  }
};
