import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Error from "../Error/Error";
import Loader from "../Loader/Loading";
import DoctorCard from "./DoctorCard";

const DoctorList = () => {
  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);

  // Ensure doctors is an array
  const doctorsArray = Array.isArray(doctors) ? doctors : [];

  return (
    <>
      {loading && <Loader />}
      {error && <Error message={error.message} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-8 mt-8 lg:mt-14">
          {doctorsArray.map((doctor) => (
            <DoctorCard key={doctor?._id} doctor={doctor} />
          ))}
        </div>
      )}
    </>
  );
};

export default DoctorList;
