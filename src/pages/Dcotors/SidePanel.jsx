import React, { useState, useCallback } from 'react';
import convertTime from '../../utils/convertTime';
import { BASE_URL, token } from '../../config';
import { toast } from 'react-toastify';
import { DatePicker, TimePicker, Modal, Button, Form } from 'antd';
import moment from 'moment';

const SidePanel = ({ doctorId, ticketPrice, timeSlots = [] }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const bookingHandler = async (values) => {
    try {
      const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 'user-id',
          date: values.date.format('YYYY-MM-DD'),
          time: values.time.format('HH:mm')
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message + ' Please try again!');
      }

      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    form.validateFields()
      .then((values) => {
        bookingHandler(values);
        setVisible(false);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const disabledDate = useCallback((current) => {
    const day = current.format('dddd').toLowerCase();
    return !timeSlots.some(slot => slot.day.toLowerCase() === day) || current.isBefore(moment(), 'day');
  }, [timeSlots]);

  if (!timeSlots || timeSlots.length === 0) {
    return <p>No available time slots.</p>;
  }

  return (
    <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
      <div className='flex items-center justify-between'>
        <p className='text__para mt-0 font-semibold'>Ticket Price</p>
        <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
          Rs {ticketPrice}
        </span>
      </div>

      <div className='mt-[30px]'>
        <p className='text__para mt-0 font-semibold text-headingColor'>Available Time Slots:</p>
        <ul className='mt-3'>
          {timeSlots.map((item, index) => (
            <li key={index} className='flex items-center justify-between mb-2'>
              <p className='text-[15px] leading-6 text-textColor font-semibold'>
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className='text-[15px] leading-6 text-textColor font-semibold'>
                {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <Button type="primary" onClick={handleOpenModal} className='btn px-2 w-full rounded-md'>
        Book Appointment
      </Button>

      <Modal title="Book Appointment" visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item
            name="date"
            label="Select Date"
            rules={[{ required: true, message: 'Please select a date!' }]}
          >
            <DatePicker disabledDate={disabledDate} />
          </Form.Item>
          <Form.Item
            name="time"
            label="Select Time"
            rules={[{ required: true, message: 'Please select a time!' }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SidePanel;
