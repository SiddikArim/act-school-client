import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";

const Instructors = () => {
  const { user } = useAuth();
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch(
      `https://act-school-server-7y8mm3rq1-siddik-arims-projects.vercel.app/instructors`,
      {
        method: "GET",
      }
    )
      .then((data) => data.json())
      .then((data) => {
        setInstructors(data);
      });
  }, [user]);

  return (
    <div className="bg-gray-50 w-full py-20">
      <h1 className="text-center font-semibold text-3xl py-5 mt-10">
        Popular Instructors
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 p-10">
        {instructors.map((inst) => (
          <div key={inst._id} className="card w-96 glass">
            <div className="h-[190px] overflow-hidden">
              <img
                className="w-[150px] mt-10 mx-auto border p-1"
                src={inst?.image}
                alt="car!"
              />
            </div>
            <div className="text-center">
              <h2 className="font-bold pt-5 text-xl uppercase">{inst?.name}</h2>
              <p className="pb-8 text-gray-500">
                <small>{inst?.email}</small>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructors;
