import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";
import useInstructor from "../../Hooks/useInstructor";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Classes = () => {
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [classes, setInstructors] = useState([]);
  const navigate = useNavigate();
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    fetch(
      `https://act-school-server-7y8mm3rq1-siddik-arims-projects.vercel.app/approved-classes`,
      {
        method: "GET",
      }
    )
      .then((data) => data.json())
      .then((data) => {
        setInstructors(data);
      });
  }, [user]);

  const handleSelectClass = (cls) => {
    if (!user) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please login to continue",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
      return;
    } else if (isAdmin || isInstructor) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `${user.displayName}, You can not select any item`,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const { _id, price, instructorName, course, image } = cls;
    const selectedItem = {
      courseId: _id,
      price,
      instructorName,
      course,
      image,
      studentEmail: user?.email,
    };

    axiosSecure.post("/selectedClass", selectedItem).then((data) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully Added to your choice list",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  return (
    <div className="bg-gray-50 my-10 rounded-lg">
      <h1 className="text-center font-semibold text-3xl py-5 mt-10">
        Popular Classes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 ">
        {classes.map((cls) => (
          <div key={cls._id} className="card w-96 glass">
            <div className="h-[190px] overflow-hidden">
              <figure>
                <img
                  className="mx-auto rounded-t-2xl h-fit w-full"
                  src={cls?.image}
                  alt="car!"
                />
              </figure>
            </div>
            <div className="text-center">
              <h2 className="font-bold pt-5 text-2xl uppercase">
                {cls?.course}
              </h2>{" "}
              <hr className="py-2 mt-2" />
              <p className="text-gray-500">Instructor: {cls?.instructorName}</p>
              <p className=" text-gray-500p">Available Seats: {cls?.seats}</p>
              <p className="text-2xl border font-bold w-[40%] mx-auto rounded-lg py-2 my-2">
                $ {cls?.price}
              </p>
              <button
                onClick={() => handleSelectClass(cls)}
                className={
                  "bg-gray-800 px-8 py-2 my-3 text-white hover:bg-slate-900 rounded-lg"
                }
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
