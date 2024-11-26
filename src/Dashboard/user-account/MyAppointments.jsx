import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message, Button } from 'antd';
import { formateDate } from "../../utils/formateDate";
import { BASE_URL } from "../../config";

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/bookings/my-appointments`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('API Response:', response);
        if (response.data.success && Array.isArray(response.data.data)) {
          setAppointments(response.data.data);
        } else {
          throw new Error('Data format is incorrect');
        }
      } catch (error) {
        message.error('Error fetching appointments');
      }
    };

    fetchAppointments();
  }, [token]);

  const completeAppointment = async (bookingId) => {
    try {
      await axios.put(`${BASE_URL}/bookings/complete/${bookingId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(appointments.map(app => 
        app._id === bookingId ? { ...app, status: 'completed' } : app
      ));
      message.success('Appointment completed successfully');
    } catch (error) {
      message.error('Error completing the appointment');
    }
  };

  const cancelAppointment = async (bookingId) => {
    try {
      await axios.put(`${BASE_URL}/bookings/cancel/${bookingId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(appointments.map(app => 
        app._id === bookingId ? { ...app, status: 'cancelled' } : app
      ));
      message.success('Appointment cancelled successfully');
    } catch (error) {
      message.error('Error cancelling the appointment');
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">My Appointments</h1>
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Doctor</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Appointment Date</th>
            <th scope="col" className="px-6 py-3">Appointment Time</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((item) => (
            <tr key={item._id}>
              <td className="px-6 py-4">
                <div className="text-base font-semibold">{item.doctor.name}</div>
              </td>
              <td className="px-6 py-4">{item.ticketPrice}</td>
              <td className="px-6 py-4">{formateDate(item.appointmentDate)}</td>
              <td className="px-6 py-4">{item.appointmentTime}</td>
              <td className="px-6 py-4">{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</td>
              <td className="px-6 py-4">
                <Button 
                  type="primary" 
                  onClick={() => completeAppointment(item._id)} 
                  disabled={item.status !== 'pending'}
                  className="mr-2"
                >
                  Complete
                </Button>
                <Button 
                  type="danger" 
                  onClick={() => cancelAppointment(item._id)} 
                  disabled={item.status !== 'pending'}
                >
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAppointment;
