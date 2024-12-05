import "./AboutUs.css";
import collage from "./assets/collage.jpg";

import "@blueprintjs/core/lib/css/blueprint.css";

const AboutUs = () => {
    return (
        <div className="about-us-page-container">
            <div className="hero">
                <h3>Empowering Education Through Justice</h3>
                <h2 style={{ color: "#e9c46a" }}>Integrating Social Justice Themes in K-5 Math Education</h2>
            </div>

            <div className="main-container">

                <img src={collage} style={{ maxWidth: "50%" }} />
                <div className="text-container">
                    <blockquote class="bp5-blockquote" style={{ color: "white", fontSize: "1.3rem", lineHeight: "1.3", textAlign: "justify" }}>
                        The idea for these lesson plans was sparked in 2008 when I taught my first math methods course as I sought a way to integrate math, social justice and literacy. In the years since, I have been committed to supporting teachers to find space for conversations about difficult and/or challenged topics. These lessons can be a starting point for these discussions.
                    </blockquote>
                    <h3 style={{ color: "white" }}>
                        --   Dr. Anita Wager
                        (Founder, [Not] Just Math)
                    </h3>
                </div>
            </div>


            <div className="meet-team-container">
                <h2 style={{ color: "#e9c46a" }}>Acknowledgements</h2>

            </div>
        </div>
    )
}

export default AboutUs;