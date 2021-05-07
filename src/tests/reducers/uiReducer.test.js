import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";

const initialState = {
  modalOpen: false,
};

describe("tests on uiReducer", () => {
  test("should return default state", () => {
    const state = uiReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test("should open and close modal", () => {
    const openModal = uiOpenModal();
    const closeModal = uiCloseModal();
    let state = uiReducer(initialState, openModal);
    expect(state).toEqual({ modalOpen: true });
    state = uiReducer(initialState, closeModal);
    expect(state).toEqual({ modalOpen: false });
  });
});
