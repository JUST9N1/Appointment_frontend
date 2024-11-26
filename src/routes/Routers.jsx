import { Route, Routes } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import MyAccount from "../Dashboard/user-account/MyAccount";
import Contact from "../pages/Contact";
import DoctorDetails from "../pages/Dcotors/DoctorDetails";
import Doctors from "../pages/Dcotors/Doctors";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import AdminPanel from "../pages/AdminPanel.jsx";
import AdminAccount from "../Dashboard/admin-account/AdminAccount.jsx";

const Routers = () => {

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route path="/users/profile/me" element={<ProtectedRoute allowedRoles={['patient']}><MyAccount /></ProtectedRoute>} />
      <Route path="/doctors/profile/me" element={<ProtectedRoute allowedRoles={['doctor']}><Dashboard /></ProtectedRoute>} />
      <Route path="/admin/profile/me" element={<ProtectedRoute allowedRoles={['admin']}><AdminAccount /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminPanel /></ProtectedRoute>} />

    </Routes>
  );
};

export default Routers;
