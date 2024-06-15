import { Link } from "react-router-dom";


const WhyActSchool = () => {
    return (
        <div className="bg-gray-200 md:px-32 grid grid-cols-1 rounded-lg md:grid-cols-2 items-center justify-center">
            <div>
                <h1 className="text-2xl font-bold pb-4">Welcome to Our <span className="text-red-500">Courses</span></h1>
                <p className="text-sm text-gray-500">Learn at your convenience with our online teaching website. Access a wide range of courses, taught by dedicated instructors, that fit seamlessly into your busy schedule. Study anytime, anywhere, on any device, and take control of your educational journey.</p>
                <Link to='/register'><button className="px-10 py-2 mt-5 bg-gray-800 text-white">Register Now</button></Link>
            </div>
            <div>
                <img className="w-full" src="https://i.ibb.co/kyx2FZs/pngwing-com-2.png" alt="" />
            </div>
        </div>
    );
};

export default WhyActSchool;