import { useContext, useState } from "react";
import userImg from "../../assets/images/doctor-img01.png";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loader/Loading";
import { BASE_URL } from "../../config";
import { AuthContext } from "../../contexts/AuthContext";
import useGetProfile from "../../hooks/useFetchData";
import AdminProfile from "./AdminProfile";
import AdminPanel from "../../pages/AdminPanel";
import { Typography, Avatar, Button, Tabs, Card, Row, Col } from 'antd';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const MyAccount = () => {
  const { dispatch } = useContext(AuthContext);
  const [tab, setTab] = useState("doctors");

  const {
    data: adminData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/admin/profile/me`);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <section style={{ padding: '20px' }}>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}

        {!loading && !error && adminData && (
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Card className="text-center">
                <Avatar
                  size={100}
                  src={adminData.photo || userImg}
                  style={{ border: '2px solid #0066ff' }}
                />
                <Title level={3} style={{ marginTop: '20px' }}>{adminData.name}</Title>
                <Text type="secondary">{adminData.email}</Text><br />
                <Text type="secondary">role: {adminData.role}</Text>


                

                <div style={{ marginTop: '50px' }}>
                  <Button
                    onClick={handleLogout}
                    type="primary"
                    block
                    style={{ marginBottom: '10px', backgroundColor: '#181A1E' }}
                  >
                    Logout
                  </Button>
                  <Button
                    type="danger"
                    block
                    style={{ backgroundColor: '#FF4D4F' }}
                  >
                    Delete Account
                  </Button>
                </div>
              </Card>
            </Col>

            <Col xs={24} md={16}>
              <Card>
                <Tabs defaultActiveKey="doctors" onChange={(key) => setTab(key)}>
                  <TabPane tab="Doctors" key="doctors">
                    <AdminPanel />
                  </TabPane>
                  <TabPane tab="Profile Settings" key="settings">
                    <AdminProfile admin={adminData} />
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
