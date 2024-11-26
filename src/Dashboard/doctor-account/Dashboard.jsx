import React, { useState } from "react";
import starIcon from "../../assets/images/Star.png";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loading";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import DoctorAbout from "../../pages/Dcotors/DoctorAbout";
import Tabs from "./Tabs";
import Profile from "./Profile";
import Appointments from './Appointments';

const Dashboard = () => {
  const { data, loading, error } = useFetchData(
    `${BASE_URL}/doctors/profile/me`
  );

  const [tab, setTab] = useState("overview");

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loader />}
        {error && !loading && <Error />}

        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <Tabs tab={tab} setTab={setTab} />
            <div className="lg:col-span-2">
              {data.isApproved === "pending" && (
                <div className="flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg">
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-5 h-5 mr-3 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 1a9 9 0 100 18 9 9 0 000-18zm0 1a8 8 0 100 16 8 8 0 000-16zm.707 3.293a1 1 0 00-1.414 0l-4 4a1 1 0 001.414 1.414L9 8.414V13a1 1 0 102 0V8.414l2.293 2.293a1 1 0 001.414-1.414l-4-4z"
                    />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div className="ml-3 text-sm font-medium">
                    To get approval, please complete your profile. We'll review
                    it manually and approve within 3 days.
                  </div>
                </div>
              )}

              <div className="mt-8">
                {tab === "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-10">
                      <figure className="max-w-[200px] max-h-[200px]">
                        <img
                          src={data.photo}
                          alt="Profile"
                          className="w-full"
                        />
                      </figure>

                      <div>
                        <span
                          className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px]
                        leading-4 lg:text-[16px] lg:leading-6 font-semibold"
                        >
                          {data.specialization}
                        </span>

                        <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-3">
                          {data.name}
                        </h3>

                        <div className="flex items-center gap-[6px]">
                          <span
                            className="flex items-center gap-[6px] text-headingColor text-[14px]
                              leading-5 lg:text-[16px] lg:leading-6 font-semibold"
                          >
                            <img src={starIcon} alt="star" />
                            {data.averageRating}
                          </span>
                          <span
                            className="text-textColor text-[14px]
                              leading-5 lg:text-[16px] lg:leading-6 font-semibold"
                          >
                            ({data.totalRating})
                          </span>
                        </div>

                        <p className="text__para font-[15px] lg:max-w-[390px] leading-6">
                          {data?.bio}
                        </p>
                      </div>
                    </div>

                    <DoctorAbout
                      name={data.name}
                      about={data.about}
                      qualifications={data.qualifications}
                      experiences={data.experiences}
                    />
                  </div>
                )}
                {tab === "appointments" && <Appointments appointments={data.appointments}/>}
                {tab === "settings" && <Profile doctorData={data} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
