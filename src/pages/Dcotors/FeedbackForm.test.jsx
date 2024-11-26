// src/components/FeedbackForm.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FeedbackForm from "./FeedbackForm";
import { BrowserRouter as Router } from "react-router-dom";
import { toast } from "react-toastify";
import { vi } from "vitest";
import { BASE_URL, token } from "../../config";

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

// Mock useParams to simulate a doctor ID
vi.mock("react-router-dom", async (importActual) => {
  const actual = await importActual();
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
  };
});

// Mock the fetch function
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        message: "Review submitted successfully.",
      }),
  })
);

describe("FeedbackForm Component", () => {
  beforeEach(() => {
    render(
      <Router>
        <FeedbackForm />
      </Router>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders the feedback form", () => {
    expect(
      screen.getByText(/how would you rate the overall experience\?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/share your feedback or suggestion\*/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/write your message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit feedback/i })).toBeInTheDocument();
  });

  test("handles rating selection", () => {
    const starButton = screen.getAllByRole("button")[1]; // Select the second star
    fireEvent.click(starButton);

    expect(starButton).toHaveClass("text-yellowColor");
  });

  test("submits the feedback form successfully", async () => {
    const starButton = screen.getAllByRole("button")[4]; // Select the fifth star
    const textarea = screen.getByPlaceholderText(/write your message/i);
    const submitButton = screen.getByRole("button", { name: /submit feedback/i });

    fireEvent.click(starButton);
    fireEvent.change(textarea, { target: { value: "Great experience!" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/doctors/1/reviews`,
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: 5,
          reviewText: "Great experience!",
        }),
      })
    );

    expect(toast.success).toHaveBeenCalledWith("Review submitted successfully.");
  });

  test("shows error message if fields are missing", async () => {
    const submitButton = screen.getByRole("button", { name: /submit feedback/i });

    fireEvent.click(submitButton);

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Rating & Review Fields are required"));
  });

  test("shows error message if submission fails", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Failed to submit review" }),
      })
    );

    const starButton = screen.getAllByRole("button")[4];
    const textarea = screen.getByPlaceholderText(/write your message/i);
    const submitButton = screen.getByRole("button", { name: /submit feedback/i });

    fireEvent.click(starButton);
    fireEvent.change(textarea, { target: { value: "Great experience!" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(toast.error).toHaveBeenCalledWith("Failed to submit review"));
  });
});
