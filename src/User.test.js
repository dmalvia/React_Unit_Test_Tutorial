import { render, screen } from "@testing-library/react";
import { usersData } from "./_mocks_/data";
import User from "./User";

const renderWithProps = (searchTerm) => {
  return render(<User users={usersData} searchTerm={searchTerm} />);
};

describe("Test User Component", () => {
  it("render users in user component with search term", async () => {
    const { container } = renderWithProps("dipesh");
    const email = await screen.findAllByTestId("email");
    expect(container).toMatchSnapshot();
    expect(email[0].textContent).toBe("dipesh@gmail.com");
    expect(email.length).toEqual(1);
  });
  it("render users in user component with empty search term", async () => {
    const { container } = renderWithProps("");
    const email = await screen.findAllByTestId("email");
    expect(container).toMatchSnapshot();
    expect(email.length).toEqual(usersData.length);
  });
});
