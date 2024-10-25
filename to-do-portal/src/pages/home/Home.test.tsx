import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Home } from "./Home";

describe("Home", () => {
  it("renders the Home component", () => {
    const home = render(<Home />);

    expect(home).toMatchSnapshot();
  });
});
