import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import avatar from "../../assets/images/avatar-icon.png"; // Ensure this fallback image exists

import { formateDate } from "../../utils/formateDate";
import FeedbackForm from "./FeedbackForm";

const Feedback = ({ reviews, totalRating }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  console.log("Reviews:", reviews); // Debug: Log reviews to check if they are passed correctly

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({totalRating})
        </h4>

        {reviews && reviews.length > 0 ? ( // Check if reviews exist
          reviews.map((review, index) => (
            <div key={index} className="flex justify-between gap-10 mb-[30px]">
              <div className="flex gap-3">
                <figure className="w-10 h-10 rounded-full">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={review?.user?.photo || avatar}
                    alt={review?.user?.name || "User Avatar"}
                  />
                </figure>

                <div>
                  <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                    {review?.user?.name || "Anonymous"}
                  </h5>

                  <p className="text-[14px] leading-6 text-textColor">
                    {formateDate(review?.createdAt)}
                  </p>
                  <p className="text__para mt-3 font-medium text-[15px]">
                    {review.reviewText}
                  </p>
                </div>
              </div>

              <div className="flex gap-1">
                {[...Array(review?.rating || 0)].map((_, starIndex) => (
                  <AiFillStar key={starIndex} color="#0067FF" />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p> // Display a message if no reviews are present
        )}
      </div>

      {!showFeedbackForm && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}

      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
};

export default Feedback;