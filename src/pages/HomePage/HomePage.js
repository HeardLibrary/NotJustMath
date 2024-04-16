import Header from "../../components/Header/Header";
import LogoWithText from "./assets/logo-with-text.png";
import "./HomePage.css";

const PURPOSE_TEXT = "[NOT] Just Math is a collection of lesson plans for grades K-5 that seamlessly fuse together mathematical concepts and themes of justice through children’s literature! In a world where classrooms are experiencing a more turbulent geopolitical atmosphere, [NOT] Just Math aims to make it accessible for educators to integrate multidimensional lessons in their classrooms that contribute to a holistic learning experience. The lesson plans that are found at [NOT] Just Math have all been put into practice and were created by teachers, for teachers. We encourage educators to visit our “Upload” tab and share a lesson plan that you have created with similar just-minded mathematical lesson plans. The themes embedded in our lesson plans range from sharing and interpersonal relationships to racism and LGBTQ acceptance, all the while learning skills such as geometry and equations. We hope that [NOT] Just Math serves as a collaborative space for educators to both utilize and expand our growing body of resources for classrooms across the nation to explore important mathematical and justice concepts."
const PASSION_TEXT = "[NOT] Just Math was developed by a team of scholars at Vanderbilt University in collaboration with The Buchanan Library Fellowship Program. Together, the team consisting of University Faculty, staff, and fellows set out to create a space that provides educators an accessible database of math lesson plans that promote “equality, equity, diversity, and social awareness”. [NOT] Just Math aims to create a classroom environment that fosters critical thinking and prompts active engagement in constructive dialogue leading to a more “equitable and just society”. Lesson plans for [NOT] Just Math align with Common Core and “Social Justice Standards” published by “Learning for Justice”. [NOT] Just Math has evolved from a collection of lesson plans to an expansive resource for educators to advance their students’ engagement with both hard mathematical concepts and challenging themes of justice."
const PEOPLE_TEXT = "TBD ..."
const HomePage = () => {

    return (
        <div className="page-container">
            <Header/>
            <img className="home-splash-logo" src={LogoWithText} alt="Page logo"/>
            <div className="home-content-container">
                <div className="home-content">
                    <p className="home-subtitle">Our Purpose</p>
                    <p className="home-paragraph">{PURPOSE_TEXT}</p>
                </div>
                <div className="home-content">
                    <p className="home-subtitle">Our Passion</p>
                    <p className="home-paragraph">{PASSION_TEXT}</p>
                </div>
                <div className="home-content">
                    <p className="home-subtitle">Our People</p>
                    <div className="home-acknowledgements">
                        <div className="home-acknowledgement">Peabody College of Education and Human Development at Vanderbilt University</div>
                        <div className="home-acknowledgement">The Jean and Alexander Heard Libraries at Vanderbilt University</div>
                        <div className="home-acknowledgement">The Buchanan Library Fellowship Program</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;