// src/Auth/Register.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "./Register";
import { BASE_URL } from "../config";
import { vi } from "vitest";
import { toast } from "react-toastify";

// Mock the react-toastify module
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
        message: "Registration successful!",
      }),
  })
);

// Mock the uploadImageToCloudinary utility function
vi.mock("../utils/uploadCloudinary", () => ({
  default: vi.fn(() =>
    Promise.resolve({
      url: "http://cloudinary.com/fake-image-url.jpg",
    })
  ),
}));

describe("Register Component", () => {
  beforeEach(() => {
    render(
      <Router>
        <Register />
      </Router>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders the registration form", () => {
    expect(screen.getByText(/create an account/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your full name!/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email!/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password!/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm your password!/i)).toBeInTheDocument();
  });

  test("handles input changes", () => {
    const nameInput = screen.getByPlaceholderText(/enter your full name!/i);
    const emailInput = screen.getByPlaceholderText(/enter your email!/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password!/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm your password!/i);

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
    expect(passwordInput.value).toBe("password123");
    expect(confirmPasswordInput.value).toBe("password123");
  });

  test("submits the form successfully", async () => {
    const nameInput = screen.getByPlaceholderText(/enter your full name!/i);
    const emailInput = screen.getByPlaceholderText(/enter your email!/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password!/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm your password!/i);
    const submitButton = screen.getByRole("button", { name: /create account/i });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/auth/signup`,
      expect.objectContaining({
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
          role: "patient",
          gender: "",
          photo: "", // Default if not uploading image
        }),
      })
    );

    expect(toast.success).toHaveBeenCalledWith("Registration successful!");
  });

  test("handles registration failure", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            message: "Registration failed.",
          }),
      })
    );

    const nameInput = screen.getByPlaceholderText(/enter your full name!/i);
    const emailInput = screen.getByPlaceholderText(/enter your email!/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password!/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm your password!/i);
    const submitButton = screen.getByRole("button", { name: /create account/i });

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(toast.error).toHaveBeenCalledWith("Registration failed.");
  });
});
