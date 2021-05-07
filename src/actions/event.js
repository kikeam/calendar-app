import Swal from "sweetalert2";
import { fetchToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const res = await fetchToken("events", event, "POST");
      const body = await res.json();
      if (body.ok) {
        event.id = body.event.id;
        event.user = {
          _id: uid,
          name: name,
        };

        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActive = () => ({
  type: types.eventClearActive,
});

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const res = await fetchToken(`events/${event.id}`, event, "PUT");
      const body = await res.json();

      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventStartDelte = () => {
  return async (dispatch, getState) => {
    const { active } = getState().calendar;
    try {
      const res = await fetchToken(`events/${active.id}`, {}, "DELETE");
      const body = await res.json();

      if (body.ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventDeleted = () => ({
  type: types.eventDeleted,
});

export const eventsStartLoading = () => {
  return async (dispatch) => {
    try {
      const res = await fetchToken("events");
      const body = await res.json();
      console.log(body);

      const events = prepareEvents(body.msg);
      dispatch(eventsLoaded(events));
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventsLoaded = (events) => ({
  type: types.eventsLoaded,
  payload: events,
});

export const eventLogout = () => ({
  type: types.eventLogout,
});
