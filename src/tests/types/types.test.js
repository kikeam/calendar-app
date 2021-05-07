import { types } from "../../types/types";

describe("tests on types", () => {
  test("should be equal", () => {
    expect(types).toEqual({
      uiOpenModal: "[ui] Open Modal",
      uiCloseModal: "[ui] Close Modal",

      eventSetActive: "[event] Set Active",
      eventLogout: "[event] Event Logout",
      eventStartAddNew: "[event] Start Add New",
      eventAddNew: "[event] Add New",
      eventClearActive: "[event] Clear Active",
      eventUpdated: "[event] Event Updated",
      eventDeleted: "[event] Event Deleted",
      eventsLoaded: "[event] Events Loaded",

      authCheckingFinish: "[auth] Finish Checking Login State",
      authStartLogin: "[auth] Start Login",
      authLogin: "[auth] Login",
      authStartRegister: "[auth] Start Register",
      authStartTokenRenew: "[auth] Start Token Renew",
      authLogout: "[auth] Logout",
    });
  });
});
