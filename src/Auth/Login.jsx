import {
  Alert,
  Button,
  Card,
  Flex,
  Form,
  Input,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import registerImage from "../assets/register.png";
import { BASE_URL } from "../config";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      // Remove confirmPassword field from values before sending to server
      const { confirmPassword, ...registrationData } = values;

      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData), // Send data without confirmPassword
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Login failed.");
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          role: result.role,
          token: result.token,
        },
      });

      console.log(result, "login data");

      setLoading(false);
      toast.success(result.message || "Login successful!");
      navigate("/home");
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
            <Flex gap="large" align="center">
              {/* form */}
              <Flex vertical flex={1} style={{ padding: "20px" }}>
                <Typography.Title level={3} strong className="title">
                  Sign In
                </Typography.Title>
                <Typography.Text type="secondary" strong className="slogan">
                  Connect with us!.
                </Typography.Text>
                <Form
                  layout="vertical"
                  onFinish={handleLogin}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { type: "email", message: "Please input a valid email!" },
                    ]}
                  >
                    <Input size="large" placeholder="Enter your email!" />
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
                    <div className="mt-7">
                      <Button
                        type={loading ? "default" : "primary"}
                        htmlType="submit"
                        className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 flex justify-center items-center"
                        size="large"
                        block
                      >
                        {loading ? <Spin /> : "Sign In"}
                      </Button>
                    </div>
                  </Form.Item>
                  <Form.Item>
                    <Row justify="center">
                      <Typography.Text type="secondary">
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                      </Typography.Text>
                    </Row>
                  </Form.Item>
                </Form>
              </Flex>

              {/* Image */}
              <Flex flex={1}>
                <img
                  src={registerImage}
                  alt="Register"
                  className="auth-image"
                />
              </Flex>
            </Flex>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Login;
