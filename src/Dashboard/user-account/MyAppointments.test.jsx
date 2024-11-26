// src/components/MyAppointment.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MyAppointment from "./MyAppointments";
import axios from "axios";
import { message } from "antd";
import { vi } from "vitest";
import { formateDate } from "../../utils/formateDate";
import { BASE_URL } from "../../config";

// Mock axios
vi.mock("axios");

// Mock local storage
Object.defineProperty(window, "localStorage", {
  value: {
    getItem: vi.fn(() => "test-token"),
  },
  writable: true,
});

// Mock message from antd
vi.mock("antd", async (importActual) => {
  const actual = await importActual();
  return {
    ...actual,
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

describe("MyAppointment Component", () => {
  const appointmentsData = [
    {
      _id: "1",
      doctor: { name: "Dr. Smith" },
      ticketPrice: 100,
      appointmentDate: "2024-08-14",
      appointmentTime: "10:00 AM",
      status: "pending",
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: { success: true, data: appointmentsData },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders the appointment list", async () => {
    render(<MyAppointment />);
    
    // Ensure appointments are fetched and displayed
    await waitFor(() => expect(screen.getByText(/my appointments/i)).toBeInTheDocument());

    expect(screen.getByText("Dr. Smith")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText(formateDate("2024-08-14"))).toBeInTheDocument();
    expect(screen.getByText("10:00 AM")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  test("completes an appointment successfully", async () => {
    axios.put.mockResolvedValue({ data: { success: true } });

    render(<MyAppointment />);

    await waitFor(() => expect(screen.getByText("Complete")).toBeInTheDocument());

    const completeButton = screen.getByText("Complete");
    fireEvent.click(completeButton);

    await waitFor(() => expect(axios.put).toHaveBeenCalledTimes(1));
    expect(axios.put).toHaveBeenCalledWith(
      `${BASE_URL}/bookings/complete/1`,
      {},
      { headers: { Authorization: `Bearer test-token` } }
    );

    expect(message.success).toHaveBeenCalledWith("Appointment completed successfully");
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  test("cancels an appointment successfully", async () => {
    axios.put.mockResolvedValue({ data: { success: true } });

    render(<MyAppointment />);

    await waitFor(() => expect(screen.getByText("Cancel")).toBeInTheDocument());

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    await waitFor(() => expect(axios.put).toHaveBeenCalledTimes(1));
    expect(axios.put).toHaveBeenCalledWith(
      `${BASE_URL}/bookings/cancel/1`,
      {},
      { headers: { Authorization: `Bearer test-token` } }
    );

    expect(message.success).toHaveBeenCalledWith("Appointment cancelled successfully");
    expect(screen.getByText("Cancelled")).toBeInTheDocument();
  });

  test("shows error message if fetching appointments fails", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    render(<MyAppointment />);

    await waitFor(() => expect(message.error).toHaveBeenCalledWith("Error fetching appointments"));
  });

  test("shows error message if completing an appointment fails", async () => {
    axios.put.mockRejectedValue(new Error("Network error"));

    render(<MyAppointment />);

    await waitFor(() => expect(screen.getByText("Complete")).toBeInTheDocument());

    const completeButton = screen.getByText("Complete");
    fireEvent.click(completeButton);

    await waitFor(() => expect(message.error).toHaveBeenCalledWith("Error completing the appointment"));
  });

  test("shows error message if cancelling an appointment fails", async () => {
    axios.put.mockRejectedValue(new Error("Network error"));

    render(<MyAppointment />);

    await waitFor(() => expect(screen.getByText("Cancel")).toBeInTheDocument());

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    await waitFor(() => expect(message.error).toHaveBeenCalledWith("Error cancelling the appointment"));
  });
});
