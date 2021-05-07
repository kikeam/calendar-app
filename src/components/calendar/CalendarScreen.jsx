import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Navbar } from "../ui/Navbar";
import { messages } from "../../helpers/calendar-messages-es";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import {
  eventClearActive,
  eventSetActive,
  eventsStartLoading,
} from "../../actions/event";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventFab } from "../ui/DeleteEventFab";

moment.locale("es");

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const { events, active } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(eventsStartLoading());
  }, [dispatch]);

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelect = (e) => {
    dispatch(eventSetActive(e));
  };

  const onSelectSlot = () => {
    dispatch(eventClearActive());
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.user._id === uid ? "#9042f5" : "#CCFF33",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return {
      style,
    };
  };

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onSelectSlot={onSelectSlot}
        selectable={true}
        onView={onViewChange}
        components={{
          event: CalendarEvent,
        }}
        view={lastView}
      />
      <AddNewFab />
      {active && <DeleteEventFab />}
      <CalendarModal />
    </div>
  );
};
