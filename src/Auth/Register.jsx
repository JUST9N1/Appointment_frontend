import { Alert, Button, Card, Form, Input, Row, Spin, Typography } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import avatar from "../assets/images/doctor-img01.png";
import signupImg from "../assets/images/signup.gif";
import { BASE_URL } from "../config";
import uploadImageToCloudinary from "../utils/uploadCloudinary";

const Register = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
    gender: "",
    photo: ""
  });

  const navigate = useNavigate();

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    try {
      setLoading(true);
      const data = await uploadImageToCloudinary(file);
      setPreviewURL(data.url);
      setSelectedFile(data.url);
      setFormData({ ...formData, photo: data.url });
    } catch (error) {
      setError("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const { confirmPassword, ...registrationData } = formData;

      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setLoading(false);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-wrapper">
      <section className="px-5 lg:px-0">
        <div className="w-full max-w-[1170px] mx-auto rounded-lg shadow md:p-10 justify-center">
          <Card className="form-container">
            <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <div style={{ flex: 1, padding: "20px" }}>
                <Typography.Title level={3} strong className="title">
                  Create an Account
                </Typography.Title>
                <Typography.Text type="secondary" strong className="slogan">
                  Join for exclusive access to our services.
                </Typography.Text>
                <Form
                  layout="vertical"
                  onFinish={handleRegister}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your full name!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter your full name!"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { type: "email", message: "Please input a valid email!" },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter your email!"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Enter your password!"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            "The two passwords do not match!"
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Confirm your password!"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
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
                  <Form.Item>
                    <div className="mb-5 flex items-center justify-between">
                      <label className="text-textColor font-bold text-[16px] leading-7">
                        Are you a:
                        <select
                          className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                        >
                          <option value="patient">Patient</option>
                          <option value="doctor">Doctor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </label>
                      <label className="text-textColor font-bold text-[16px] leading-7">
                        Gender:
                        <select
                          className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                        >
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </label>
                    </div>
                    <div className="mb-5 flex items-center gap-3">
                      {selectedFile && (
                        <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                          <img
                            src={previewURL || avatar}
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
                    <Button
                      type={loading ? "default" : "primary"}
                      htmlType="submit"
                      className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 flex justify-center items-center"
                      size="large"
                      block
                      disabled={loading}
                    >
                      {loading ? <Spin /> : "Create Account"}
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Row justify="center">
                      <Typography.Text type="secondary">
                        Already have an account? <Link to="/login">Login</Link>
                      </Typography.Text>
                    </Row>
                  </Form.Item>
                </Form>
              </div>
              <div style={{ flex: 1 }}>
                <img src={signupImg} alt="Register" className="auth-image" />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Register;
