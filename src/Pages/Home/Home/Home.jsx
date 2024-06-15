import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import WhyActSchool from "../WhyActSchool/WhyActSchool";
import Instructors from "../../Instructors/Instructors";
import Classes from "../../Classes/Classes";


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>ACT SCHOOL | Home</title>
            </Helmet>
            
            <Banner></Banner>
            
            <WhyActSchool></WhyActSchool>
            <Classes></Classes>
            <Instructors></Instructors>
        </div>
    );
};

export default Home;