import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { startCheking, startLogin, startRegister } from "../../actions/auth";
import { types } from "../../types/types";
import Swal from "sweetalert2";
import * as fetchModule from "../../helpers/fetch";

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const middlewares = [thunk];

const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe("tests on auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("should startLogin correct", async () => {
    await store.dispatch(startLogin("quique6@gmail.com", "123456"));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: "60847442bf251400156f342b", name: "Enrique" },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-time",
      expect.any(Number)
    );
  });

  test("should startLogin incorrect", async () => {
    await store.dispatch(startLogin("quique6@gmail.com", "1234567"));

    const actions = store.getActions();

    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith("Error", "wrong password", "error");
  });

  test("should startRegister correct", async () => {
    fetchModule.fetchNoToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "Carlos",
          token: "abc",
        };
      },
    }));
    await store.dispatch(startRegister("test@test.com", "123456", "test"));

    const actions = store.getActions();

    expect(actions).toEqual([
      { type: "[auth] Login", payload: { uid: "123", name: "Carlos" } },
    ]);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-time",
      expect.any(Number)
    );
  });

  test("should startCheking correct", async () => {
    fetchModule.fetchToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "Carlos",
          token: "abc",
        };
      },
    }));
    await store.dispatch(startCheking());

    const actions = store.getActions();

    expect(actions).toEqual([{ type: "[auth] Finish Checking Login State" }]);
  });
});
