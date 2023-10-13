import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { usersData, badResponse } from "./_mocks_/data";
import App from "./App";

const searchValue = "test";
const server = setupServer(
  rest.get("https://reqres.in/api/users/", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(usersData));
  }),
  rest.get("https://reqres.in/api/users/Bad", (req, res, ctx) => {
    return res(ctx.status(400), ctx.json(badResponse));
  })
);

describe("Test App component", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders header text as Users", async () => {
    const { container } = render(<App />);
    const headerText = screen.getByText(/Users/i);
    expect(container).toMatchSnapshot();
    expect(headerText).toBeTruthy();
  });

  it("Search bar - input is empty", async () => {
    const { container } = render(<App />);
    const inputSearch = await waitFor(() =>
      screen.findByPlaceholderText(/Search users/i)
    );
    expect(container).toMatchSnapshot();
    expect(inputSearch).toHaveAttribute("value", "");
  });

  it("Search bar - input has value", async () => {
    const { container } = render(<App />);
    const inputSearch = await waitFor(() =>
      screen.findByPlaceholderText(/Search users/i)
    );
    fireEvent.change(inputSearch, { target: { value: searchValue } });
    expect(container).toMatchSnapshot();
    expect(inputSearch).toHaveAttribute("value", searchValue);
  });

  it("return JSON when the response is ok", async () => {
    expect.assertions(3);
    const res = await fetch("https://reqres.in/api/users/", { method: "GET" });
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(res.ok).toBe(true);
    expect(JSON.stringify(data)).toBe(JSON.stringify(usersData));
  });

  it("return JSON when the response is Bad", async () => {
    expect.assertions(3);
    const res = await fetch("https://reqres.in/api/users/Bad", {
      method: "GET",
    });
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(res.ok).toBe(false);
    expect(JSON.stringify(data)).toBe(JSON.stringify(badResponse));
  });
});
