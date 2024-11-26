// src/components/AdminProfile/AdminProfile.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminProfile from "./AdminProfile";
import { BrowserRouter as Router } from "react-router-dom";
import { BASE_URL } from "../../config";
import { vi } from "vitest";
import { toast } from "react-toastify";

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
        message: "Profile updated successfully.",
      }),
  })
);

describe("AdminProfile Component", () => {
  const admin = {
    _id: "1",
    name: "Admin User",
    email: "admin@example.com",
    photo: "http://cloudinary.com/fake-photo-url.jpg",
    gender: "female",
    role: "admin",
  };

  beforeEach(() => {
    render(
      <Router>
        <AdminProfile admin={admin} />
      </Router>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });  

  test("handles input changes", () => {
    const nameInput = screen.getByPlaceholderText(/enter your full name!/i);

    fireEvent.change(nameInput, { target: { value: "New Admin Name" } });

    expect(nameInput.value).toBe("New Admin Name");
  });

  test("submits the form successfully", async () => {
    const nameInput = screen.getByPlaceholderText(/enter your full name!/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password!/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm your password!/i);
    const submitButton = screen.getByRole("button", { name: /update/i });
  
    fireEvent.change(nameInput, { target: { value: "New Admin Name" } });
    fireEvent.change(passwordInput, { target: { value: "newpassword123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "newpassword123" } });
    fireEvent.click(submitButton);
  
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/admin/${admin._id}`,
      expect.objectContaining({
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: "New Admin Name",
          email: admin.email,
          password: "newpassword123",
          gender: admin.gender,
          photo: admin.photo,
          // Ensure to include or exclude `role` based on actual logic
        }),
      })
    );
  
    expect(toast.success).toHaveBeenCalledWith("Profile updated successfully.");
  });  
});
