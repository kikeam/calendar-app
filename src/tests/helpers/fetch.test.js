import { fetchNoToken, fetchToken } from "../../helpers/fetch";

describe("tests on fetch", () => {
  let token = "";
  test("fetchNoToken should work", async () => {
    const res = await fetchNoToken(
      "auth",
      {
        email: "quique6@gmail.com",
        password: "123456",
      },
      "POST"
    );
    expect(res instanceof Response).toBe(true);
    const body = await res.json();
    expect(body.ok).toBe(true);

    token = body.token;
    console.log(token);
  });

  test("fetchToken should work", async () => {
    localStorage.setItem("token", token);

    const res = await fetchToken(
      "events/608431b97705021720de8cc9",
      {},
      "DELETE"
    );
    const body = await res.json();

    expect(body.msg).toBe("Event does not exists");
  });
});
