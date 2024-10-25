import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { NavBar } from "./NavBar";
import { AuthContext } from "../auth/AuthContext";
import { BrowserRouter } from "react-router-dom";

//set localstorage instead of setting context
it("Logged out button visibility", () => {
  localStorage.setItem("loggedInStatus", "true");

  render(
    <BrowserRouter>
      {/* <AuthContext.Provider
        value={{
          accessToken: "",
          user: { email: "", name: "" },
          isLoggedIn: false,
          login: () => Promise.resolve(),
          logout: () => Promise.resolve(),
          register: () => Promise.resolve(),
        }}
      > */}
      <NavBar />
      {/* </AuthContext.Provider> */}
    </BrowserRouter>
  );

  expect(screen.queryByText("Login")).toBeInTheDocument();
  expect(screen.queryByText("Sign Up")).toBeInTheDocument();

  expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  expect(screen.queryByText("Items")).not.toBeInTheDocument();
});

it("Logged in button visibility", () => {
  render(
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          accessToken: "",
          user: { email: "", name: "" },
          isLoggedIn: true,
          login: () => Promise.resolve(),
          logout: () => Promise.resolve(),
          register: () => Promise.resolve(),
        }}
      >
        <NavBar />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  expect(screen.queryByText("Logout")).toBeInTheDocument();
  expect(screen.queryByText("Items")).toBeInTheDocument();

  expect(screen.queryByText("Login")).not.toBeInTheDocument();
  expect(screen.queryByText("Sign Up")).not.toBeInTheDocument();
});
