import { Link } from "react-router-dom";
import './CheckoutSuccess.css';
import registerImage from "../assets/register.png";

const CheckoutSuccess = () => {
  return (
    <div className="checkout-success-container" style={{ backgroundImage: `url(${registerImage})` }}>
      <div className="overlay">
        <h1 className="success-heading">
          Payment Successful!
        </h1>
        <p className="success-para">
          Thank you for completing your secure online payment.
        </p>
        <Link
          to="/home"
          className="home-link"
        >
          Go Back To Home
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
