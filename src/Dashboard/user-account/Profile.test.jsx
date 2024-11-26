// src/Dashboard/user-account/Profile.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Profile from "./Profile";
import { vi } from "vitest";
import { BrowserRouter as Router } from "react-router-dom";
import { toast } from "react-toastify";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL } from "../../config"; // Ensure BASE_URL is imported

// Mock toast notifications
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

// Mock the uploadImageToCloudinary function
vi.mock("../../utils/uploadCloudinary", () => ({
  default: vi.fn(() =>
    Promise.resolve({
      url: "http://cloudinary.com/fake-image-url.jpg",
    })
  ),
}));

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

describe("Profile Component", () => {
  const user = {
    _id: "1",
    name: "User Name",
    email: "user@example.com",
    photo: "http://cloudinary.com/user-photo-url.jpg",
    bloodType: "O+",
    gender: "male",
  };

  beforeEach(() => {
    render(
      <Router>
        <Profile user={user} />
      </Router>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders the profile form with initial values", () => {
    expect(screen.getByPlaceholderText(/enter your full name!/i)).toHaveValue(
      user.name
    );
    expect(screen.getByPlaceholderText(/write your blood type!/i)).toHaveValue(
      user.bloodType
    );
  
    // Check if the gender is correctly selected in the Select component
    const genderSelect = screen.getByRole("combobox", { name: /gender/i });
    expect(genderSelect).toHaveValue(user.gender);
  });
  

  test("handles input changes", () => {
    const nameInput = screen.getByPlaceholderText(/enter your full name!/i);
    fireEvent.change(nameInput, { target: { value: "Updated User Name" } });
    expect(nameInput.value).toBe("Updated User Name");
  });
  
  test("uploads an image and updates the state", async () => {
    const fileInput = screen.getByLabelText(/upload photo/i);
    const file = new File(["dummy content"], "example.png", { type: "image/png" });
  
    fireEvent.change(fileInput, { target: { files: [file] } });
  
    await waitFor(() => {
      // Update the method to find the image element
      const uploadedImg = screen.getByRole("img", {
        name: /uploaded photo/i, // Ensure the alt text matches
      });
      expect(uploadedImg).toBeInTheDocument();
      expect(uploadedImg).toHaveAttribute("src", "http://cloudinary.com/fake-image-url.jpg");
    });
  });
  

  test("submits the form successfully", async () => {
    const nameInput = screen.getByPlaceholderText(/enter your full name!/i);
    fireEvent.change(nameInput, { target: { value: "Updated User Name" } });

    const submitButton = screen.getByRole("button", { name: /update/i });
    fireEvent.click(submitButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/users/${user._id}`,
      expect.objectContaining({
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: "Updated User Name",
          email: user.email,
          bloodType: user.bloodType,
          gender: user.gender,
          photo: "http://cloudinary.com/fake-image-url.jpg", // Use the expected photo URL
        }),
      })
    );

    expect(toast.success).toHaveBeenCalledWith("Profile updated successfully.");
  });
});
