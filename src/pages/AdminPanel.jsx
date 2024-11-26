import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, token } from "../config";

const { Option } = Select;

const AdminPanel = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/doctors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch doctors", error);
      message.error("Failed to fetch doctors");
      setLoading(false);
    }
  };

  const approveDoctor = async (id) => {
    try {
      console.log(`Approving doctor with ID: ${id}`);
      const response = await axios.patch(
        `${BASE_URL}/doctors/approve-doctor/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Approve response:", response);
      message.success("Doctor approved successfully");
      fetchDoctors();
    } catch (error) {
      console.error("Failed to approve doctor", error);
      message.error("Failed to approve doctor");
    }
  };

  const editDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    form.setFieldsValue(doctor);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedDoctor(null);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Updating doctor with values:", values);
      const response = await axios.put(
        `${BASE_URL}/doctors/${selectedDoctor._id}`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Update response:", response);
      message.success("Doctor updated successfully");
      fetchDoctors();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to update doctor", error);
      message.error("Failed to update doctor");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
    },
    {
      title: "Status",
      dataIndex: "isApproved",
      key: "isApproved",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            disabled={record.isApproved === "approved"}
            onClick={() => approveDoctor(record._id)}
          >
            Approve
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => editDoctor(record)}>
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={doctors}
        loading={loading}
        rowKey="_id"
      />
      <Modal
        title="Edit Doctor"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="specialization"
            label="Specialization"
            rules={[
              { required: true, message: "Please select the specialization!" },
            ]}
          >
            <Select>
              <option value="surgeon">Surgeon</option>
              <option value="neurologist">Neurologist</option>
              <option value="dermatologist">Dermatologist</option>
              <option value="cardiologist">Cardiologist</option>
              <option value="psychiatrist">Psychiatrist</option>
              <option value="pulmonologist">Pulmonologist</option>
              <option value="general">General</option>
              <option value="urologist">Urologist</option>
              <option value="dentist">Dentist</option>
              <option value="orthopaedic">Orthopaedic</option>
            </Select>
          </Form.Item>
          <Form.Item
            name="bio"
            label="Bio"
            rules={[{ required: true, message: "Please input the bio!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ticketPrice"
            label="Ticket Price"
            rules={[
              { required: true, message: "Please input the ticket price!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminPanel;
