import "./AboutUs.css";
import placeholder from "./assets/img-placeholder.jpeg";
import arrow from "./assets/down-right.png";
import deanWager from "./assets/Dr-Wager.jpg";

const AboutUs = () => {
    return (
        <div className="about-us-page-container">
            <div className="hero">
                <h3>Subtile</h3>
                <h2>Lorem ispum dolor sit amet, consectetur adipiscing elit</h2>
            </div>

            <div className="pictures-container">
                <img className="picture-large" src={placeholder}></img>
                <img className="picture-small" src={placeholder}></img>
            </div>
            <div className="text-container">
                <div className="section-container">
                    <p className="section-title">Our Purpose<img src={arrow} /></p>
                    <p className="section-text">{PurposeText}</p>
                </div>
                <div className="section-container">
                    <p className="section-title">Our Passion<img src={arrow} /></p>
                    <p className="section-text">{PassionText}</p>
                </div>
            </div>
            <div className="meet-team-container">
                <h2>Meet the Team</h2>
                <div className="team-grid">
                    <div className="team-member">
                        <img src={deanWager}></img>
                        <div className="team-member-overlay">
                            <p>Dr. Wager is the founder of NJM! She is currently the Dean of Undergraduate Academic Affairs at Peabody College, Vanderbilt University. </p>
                        </div>
                        <p>Dr. Anita Wager</p>
                    </div>
                    <div className="team-member">
                        <img></img>
                        <p>Person 2</p>
                    </div>
                    <div className="team-member">
                        <img></img>
                        <p>Person 3</p>
                    </div>
                    <div className="team-member">
                        <img></img>
                        <p>Person 4</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
const PurposeText = "[Not] Just Math is a collection of lesson plans for grades K-5 that seamlessly fuse together mathematical concepts and themes of justice through children’s literature! In a world where classrooms are experiencing a more turbulent geopolitical atmosphere, [Not] Just Math aims to make it accessible for educators to integrate multidimensional lessons in their classrooms that contribute to a holistic learning experience. The lesson plans that are found at [Not] Just Math have all been put into practice and were created by teachers, for teachers. We encourage educators to visit our “Upload” tab and share a lesson plan that you have created with similar just-minded mathematical lesson plans. The themes embedded in our lesson plans range from sharing and interpersonal relationships to racism and LGBTQ acceptance, all the while learning skills such as geometry and equations. We hope that [Not] Just Math serves as a collaborative space for educators to both utilize and expand our growing body of resources for classrooms across the nation to explore important mathematical and justice concepts."

const PassionText = "[Not] Just Math was developed by a team of scholars at Vanderbilt University in collaboration with The Buchanan Library Fellowship Program. Together, the team consisting of University Faculty, staff, and fellows set out to create a space that provides educators an accessible database of math lesson plans that promote “equality, equity, diversity, and social awareness”. [Not] Just Math aims to create a classroom environment that fosters critical thinking and prompts active engagement in constructive dialogue leading to a more “equitable and just society”. Lesson plans for [Not] Just Math align with Common Core and “Social Justice Standards” published by “Learning for Justice”. [Not] Just Math has evolved from a collection of lesson plans to an expansive resource for educators to advance their students’ engagement with both hard mathematical concepts and challenging themes of justice."
export default AboutUs;