import { Alert, Button, Form, Input, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config"; // assuming token is stored in local storage
import uploadImageToCloudinary from "../../utils/uploadCloudinary";

const { Option } = Select;

const AdminProfile = ({ admin }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    role: "",
  });

  useEffect(() => {
    if (admin) {
      const { name, email, photo, gender, role } = admin;
      setFormData({ name, email, photo, gender, role });
      form.setFieldsValue({ name, email, gender, role });
    }
  }, [admin, form]);

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    try {
      setLoading(true);
      const data = await uploadImageToCloudinary(file);
      setFormData((prevFormData) => ({
        ...prevFormData,
        photo: data.url,
      }));
    } catch (error) {
      setError("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const { confirmPassword, ...registrationData } = values;

      

      // Ensure photo is included in registrationData if it's updated
      if (formData.photo) {
        registrationData.photo = formData.photo;
      }

      const res = await fetch(`${BASE_URL}/admin/${admin._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(registrationData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed.");
      }

      toast.success("Profile updated successfully.");
      navigate("/admin/profile/me");
    } catch (error) {
      toast.error(error.message || "Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <Form
        form={form}
        onFinish={handleRegister}
        initialValues={{
          name: formData.name,
          email: formData.email,
          gender: formData.gender,
        }}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input size="large" placeholder="Enter your full name!" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: false, message: "Please input your password!" }]}
        >
          <Input.Password size="large" placeholder="Enter your password!" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: false,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("The two passwords do not match!");
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Confirm your password!"
          />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please select your gender!" }]}
        >
          <Select placeholder="Select your gender" size="large">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        {error && (
          <Alert
            description={error}
            type="error"
            showIcon
            closable
            className="alert"
          />
        )}

        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt=""
                className="w-full rounded-full"
              />
            </figure>
          )}
          <div className="relative w-[160px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>

        <Form.Item>
          <Button
            type={loading ? "default" : "primary"}
            htmlType="submit"
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 flex justify-center items-center"
            size="large"
            block
            disabled={loading}
          >
            {loading ? <Spin /> : "Update"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminProfile;
