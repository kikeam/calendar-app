import React, { useEffect, useState } from "react";
import Modal from "react-modal";
//import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../actions/ui";
import {
  eventClearActive,
  eventStartAddNew,
  eventStartUpdate,
} from "../../actions/event";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowadd1 = now.clone().add(1, "hours");
const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowadd1.toDate(),
};

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { active } = useSelector((state) => state.calendar);
  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowadd1.toDate());
  const [titleIsValid, settitleIsValid] = useState(true);

  const [formValues, setformValues] = useState(initEvent);

  const { notes, title, start, end } = formValues;

  useEffect(() => {
    if (active) {
      setformValues(active);
    } else {
      setformValues(initEvent);
    }
  }, [active]);

  const handleInputChange = ({ target }) => {
    setformValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActive());
    setformValues(initEvent);
  };
  const handleStartDateChange = (date) => {
    setDateStart(date);
    setformValues({
      ...formValues,
      start: date,
    });
  };

  const handleEndDateChange = (date) => {
    setDateEnd(date);
    setformValues({
      ...formValues,
      end: date,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        "Error",
        "La fecha de fin debe ser posterior a la fecha de inicio",
        "error"
      );
    }

    if (title.trim().length < 2) {
      return settitleIsValid(false);
    }
    if (active) {
      dispatch(eventStartUpdate(formValues));
    } else {
      dispatch(eventStartAddNew(formValues));
    }
    settitleIsValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      //onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> {active ? "Editar Evento" : "Nuevo Evento"} </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
          <div className="form-group">
            <label>Fecha y hora inicio</label>

            <DateTimePicker
              value={dateStart}
              onChange={(date) => handleStartDateChange(date.toDate())}
              format="DD/MM/yyyy HH:mm"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Fecha y hora fin</label>

            <DateTimePicker
              value={dateEnd}
              onChange={(date) => handleEndDateChange(date.toDate())}
              format="DD/MM/yyyy HH:mm"
              className="form-control"
              minDate={dateStart}
            />
          </div>
        </MuiPickersUtilsProvider>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleIsValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
