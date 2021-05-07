import React from "react";
import { useDispatch } from "react-redux";
import { eventClearActive } from "../../actions/event";
import { uiOpenModal } from "../../actions/ui";

export const AddNewFab = () => {
  const dispatch = useDispatch();
  return (
    <button
      className="btn btn-primary fab"
      onClick={() => {
        dispatch(eventClearActive());
        dispatch(uiOpenModal());
      }}
    >
      <i className="fas fa-plus"></i>
    </button>
  );
};
