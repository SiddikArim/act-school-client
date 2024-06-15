import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
  const { createNewUser, updateUserProfile, logOut } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const { password, confirm, email } = data;
    // TODO: have to add password expression
    if (password !== confirm) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Password not matched",
        showConfirmButton: false,
        timer: 1500,
      });
      logOut();
      return;
    }

    createNewUser(email, password)
      .then((result) => {
        const registeredUser = result.user;
        console.log(registeredUser);
        if (registeredUser) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User successfully created",
            showConfirmButton: false,
            timer: 1500,
          });
        }

        updateUserProfile(data.name, data.image).then(() => {
          const newUser = {
            name: data.name,
            email: data.email,
            image: data.image,
            role: "user",
          };
          fetch(
            "https://act-school-server-7y8mm3rq1-siddik-arims-projects.vercel.app/users",
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(newUser),
            }
          );
          reset();
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="md:w-3/4 mx-auto px-10">
      <Helmet>
        <title>ACT SCHOOL | Register</title>
      </Helmet>

      <h1 className="font-semibold text-center text-3xl py-10">
        Please Register
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input
          className="bg-slate-200 py-2 w-full px-5 rounded-md my-2"
          {...register("name", { required: true })}
          placeholder="Your Full Name"
        />
        {errors.name && (
          <span className="text-sm text-red-500">Name is required</span>
        )}
        <input
          className="bg-slate-200 py-2 w-full px-5 rounded-md my-2"
          {...register("email", { required: true })}
          placeholder="Valid Email"
        />
        {errors.email && (
          <span className="text-sm text-red-500">Email is required</span>
        )}
        {/* <input className="bg-slate-200 py-2 w-full px-5 rounded-md my-2" {...register("password", { required: true })} placeholder="Password" type="password" />
                {errors.password && <span className="text-sm text-red-500">Password is required</span>} */}
        <input
          type="password"
          className="bg-slate-200 py-2 w-full px-5 rounded-md my-2"
          {...register("password", {
            required: true,
            minLength: 6,
            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
          })}
          placeholder="Password"
        />
        {errors.password?.type === "required" && (
          <p className="text-red-600">Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-red-600">Password must be 6 characters</p>
        )}
        {errors.password?.type === "pattern" && (
          <p className="text-red-600">
            Password must have one Uppercase, one special character.
          </p>
        )}
        <input
          className="bg-slate-200 py-2 w-full px-5 rounded-md my-2"
          {...register("confirm")}
          placeholder="Confirm Password"
          type="password"
        />
        <input
          className="bg-slate-200 py-2 w-full px-5 rounded-md my-2"
          {...register("image", { required: true })}
          placeholder="Image URL"
        />
        {errors.image && (
          <span className="text-sm text-red-500">Image URL is required</span>
        )}{" "}
        <br />
        <div className="text-center">
          <input
            className="bg-gray-600 text-white px-8 py-2 rounded-sm my-5 cursor-pointer"
            type="submit"
            value="Register"
          />
        </div>
      </form>
      <p className="text-center pb-5">
        <small>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Please Login
          </Link>{" "}
        </small>
      </p>

      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
