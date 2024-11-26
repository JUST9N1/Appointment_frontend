// src/Auth/Login.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Login from "./Login";
import { BASE_URL } from "../config";
import { toast } from "react-toastify"; // Import toast

// Use Vitest for mocking and testing
import { vi } from "vitest";

// Partially mock react-router-dom to only mock useNavigate
vi.mock("react-router-dom", async (importActual) => {
  const actual = await importActual();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock the toast module
vi.mock("react-toastify", async (importActual) => {
  const actual = await importActual();
  return {
    ...actual,
    toast: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

// Mock the fetch function
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        data: { user: "testUser" },
        role: "user",
        token: "123456",
        message: "Login successful!",
      }),
  })
);

describe("Login Component", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    render(
      <Router>
        <AuthContext.Provider value={{ dispatch: mockDispatch }}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders the login form", () => {
    const signInButton = screen.getByRole("button", { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email!/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password!/i)).toBeInTheDocument();
  });

  test("handles input changes", () => {
    const emailInput = screen.getByPlaceholderText(/enter your email!/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password!/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("submits the form successfully", async () => {
    const emailInput = screen.getByPlaceholderText(/enter your email!/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password!/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/auth/login`,
      expect.objectContaining({
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
        }),
      })
    );

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "LOGIN_SUCCESS",
      payload: {
        user: { user: "testUser" },  // Ensure the expected structure
        role: "user",
        token: "123456",
      },
    });

    expect(toast.success).toHaveBeenCalledWith("Login successful!");
  });

  test("handles login failure", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            message: "Invalid credentials.",
          }),
      })
    );

    const emailInput = screen.getByPlaceholderText(/enter your email!/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password!/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(toast.error).toHaveBeenCalledWith("Invalid credentials.");
  });
});
