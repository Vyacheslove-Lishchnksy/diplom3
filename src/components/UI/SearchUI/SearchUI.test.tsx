import { fireEvent, render, screen } from "@testing-library/react";
import SearchUI from "./SearchUI";

describe("SearchUI", () => {
  it("renders the current search value and search icon", () => {
    render(<SearchUI search="ukraine" setSearch={jest.fn()} />);

    expect(screen.getByDisplayValue("ukraine")).toBeInTheDocument();
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  it("updates the search value through setSearch when the user types", () => {
    const setSearch = jest.fn();
    render(<SearchUI search="" setSearch={setSearch} />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "new melody" },
    });

    expect(setSearch).toHaveBeenCalledWith("new melody");
  });

  it("sets the default tab index and forwards input props", () => {
    render(
      <SearchUI
        search=""
        setSearch={jest.fn()}
        aria-label="Search melodies"
        placeholder="Find a melody"
      />,
    );

    const input = screen.getByRole("textbox", { name: "Search melodies" });

    expect(input).toHaveAttribute("placeholder", "Find a melody");
    expect(input).toHaveAttribute("tabindex", "30");
  });
});