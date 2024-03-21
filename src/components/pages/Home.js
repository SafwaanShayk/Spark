/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import "./home.css";

function Home({ featuresRef, homeRef, GuideRef }) {
  return (
    <>
      <div className="home-image" ref={homeRef}>
        <h1>
          <span>Welcome</span> to Graduate Navigator
        </h1>
        <p>
          Join and embark on a journey of limitless possibilities in project
          development. <br /> Whether you are a student, educator, or industry
          professional, our platform is <br /> tailored to meet your unique
          needs and elevate your projects to new heights. <br /> Start building
          your future today!
        </p>
      </div>

      <div className="proj-comp">
        <div className="container">
          <div className="row">
            <div className="col-7">
              <h1>
                <span style={{ color: "#004f98" }}>Join</span> Us Today and
                <br />
                Shape the Future
              </h1>
              <p>
                Whether you're a student, educator, or industry professional,
                [Project Name] is where you belong. Join us today and be a part
                of a community that shapes the future of project development.
                Start building your legacy with us!
              </p>
            </div>
            <div className="col">
              <div className="row">
                <div className="col">
                  <img src={require("../../images/users.svg").default} alt="" />
                  <p>Users</p>
                  <p>2,245,341</p>
                </div>
                <div className="col">
                  <img src={require("../../images/users.svg").default} alt="" />
                  <p>Buyers and Sellers</p>
                  <p>2,245,341</p>
                </div>
                <div className="row">
                  <div className="col">
                    <img
                      src={require("../../images/projects.svg").default}
                      alt=""
                    />
                    <p>Total Projects</p>
                    <p>2,245,341</p>
                  </div>
                  <div className="col">
                    <img
                      src={require("../../images/projects.svg").default}
                      alt=""
                    />
                    <p>Invested Project</p>
                    <p>2,245,341</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="emerging">
        <div className="row">
          <div className="col">
            <img src={require("../../images/dig-mark.png")} alt="" />
          </div>
          <div className="col">
            <h1>
              For Emerging Innovators Transform Your Vision into Tangible
              Success
            </h1>
            <p>
              Fuel your aspirations with Graduate Navigator. Dive into a realm
              of innovation where your ideas transcend into reality. From
              concept inception through insightful comparative analysis, to a
              dynamic marketplace—empower yourself to shape the future of
              project development. Join us and redefine success on your terms.
            </p>
          </div>
        </div>
      </div>

      <div className="elevating">
        <div className="row">
          <div className="col-8">
            <h1>Elevating Your Project Journey</h1>
            <p>
              <span> Empowering Futures </span>Graduate Navigator is more than
              just a web application – it's a catalyst for your success. We
              believe in empowering individuals to reach their full potential.
              <br />
              <span>Fueling Innovation</span> Innovation is at the core of
              Graduate Navigator. We're committed to fueling your creativity and
              guiding you towards groundbreaking project ideas.
            </p>
          </div>
          <div className="col">
            <img src={require("../../images/app.svg").default} alt="" />
          </div>
        </div>
      </div>

      <div className="why">
        <div className="row">
          <div className="col">
            <img src={require("../../images/app1.svg").default} alt="" />
          </div>
          <div className="col-8">
            <h1>Why Graduate Navigator Stands Out</h1>
            <p>
              <span>Comparative Analysis Framework</span> Empower your
              decision-making process with our Comparative Analysis Framework.
              Evaluate and distinguish multiple project concepts, identify
              uniqueness among other projects, and compare past projects with
              yours. Make informed decisions that set your projects apart and
              lead to success. <br />
              <span>Trend-Driven Insights</span> Stay ahead of the curve with
              our Trending Filter. We keep you updated on the latest industry
              trends, ensuring your projects are not just relevant but
              groundbreaking. Graduate Navigator is not just a platform; it's
              your strategic ally in the dynamic world of project development.
            </p>
          </div>
        </div>
      </div>

      <div className="steps" ref={GuideRef}>
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <h1>New in this Industry?</h1>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-md-auto">
            <p>Here’s how it works on Graduate Navigator.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <h4>STEP 1</h4>
            <h2>Explore Innovative Concepts</h2>
            <p>
              Unleash creativity with our Concept Generation Engine. Explore
              original project concepts tailored to market dynamics, user
              inclinations, and advanced domains. Start your journey by
              discovering unique ideas that set the foundation for your next
              project.
            </p>
          </div>
          <div className="col">
            <img src={require("../../images/earth.svg").default} alt="" />
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <h4>STEP 2</h4>
            <h2>Refine and Decide with Comparative Analysis</h2>
            <p>
              Navigate informed decision-making through our Comparative Analysis
              Framework. Refine your project choices, distinguish uniqueness,
              and compare with precision. Shape your projects strategically,
              ensuring they stand out in the competitive landscape of project
              development.
            </p>
          </div>
          <div className="col">
            <img src={require("../../images/Research.svg").default} alt="" />
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <h4>STEP 3</h4>
            <h2>Monetize and Collaborate in Our Marketplace</h2>
            <p>
              Showcase your projects in our Buy and Sell Module. Monetize your
              creativity or find collaborators in our vibrant marketplace
              environment. Join a community where projects come to life through
              collaboration and innovation.
            </p>
          </div>
          <div className="col">
            <img src={require("../../images/investment.svg").default} alt="" />
          </div>
        </div>
      </div>

      <div className="propel">
        <h1>How we Propel Your Project Development</h1>
        <p>
          We empower project development through our Concept Generation Engine,
          aiding in idea inception. Our Comparative Analysis and Advanced
          Filtering guide decision-making, while the Buy and Sell Module
          facilitates collaboration and project realization.
        </p>
      </div>

      <div className="features" ref={featuresRef}>
        <div className="container text-center">
          <h1>Features</h1>
          <p>Few good reasons why you should use Graduate Navigator</p>
          <div className="row align-items-start">
            <div className="col">
              <img src={require("../../images/magicWand.svg").default} alt="" />
              <h1>Concept Generation Engine</h1>
              <p>
                Seamlessly generating original project concepts rooted in market
                dynamics, user inclinations, and specific domains, including
                advanced technologies.
              </p>
              <a href="">
                Get Started <i className="bi bi-arrow-right"></i>
              </a>
            </div>
            <div className="col">
              <img
                src={require("../../images/flyingSaucer.svg").default}
                alt=""
              />
              <h1>Comparative Analysis Framework</h1>
              <p>
                Evaluate and distinguish multiple project concepts, identify
                uniqueness among other projects, and compare past projects with
                yours.
              </p>
              <a href="">
                Get Started <i className="bi bi-arrow-right"></i>
              </a>
            </div>
            <div className="col">
              <img src={require("../../images/celebrate.svg").default} alt="" />
              <h1>Advanced Filtering System</h1>
              <p>
                Navigate the world of project development effortlessly with our
                Advanced Filtering System. Classify project concepts into
                advanced domains.
              </p>
              <a href="">
                Get Started <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="row align-items-start">
            <div className="col">
              <img
                src={require("../../images/boundingBox.svg").default}
                alt=""
              />
              <h1>Trend Analysis Tool</h1>
              <p>
                Keep abreast of the latest developments and trends within your
                chosen field of expertise.
              </p>
              <a href="">
                Get Started <i className="bi bi-arrow-right"></i>
              </a>
            </div>
            <div className="col">
              <img src={require("../../images/box.svg").default} alt="" />
              <h1>Buy and Sell Module</h1>
              <p>
                Showcase your projects to potential buyers or collaborators in a
                marketplace-like environment
              </p>
              <a href="">
                Get Started <i className="bi bi-arrow-right"></i>
              </a>
            </div>
            <div className="col">
              <img
                src={require("../../images/celebrate1.svg").default}
                alt=""
              />
              <h1>User-Friendly Interface</h1>
              <p>
                Experience project initiation like never before with our
                User-Friendly Interface. Designed to be intuitive and accessible
                for a diverse audience of students, educators, and industry
                professionals
              </p>
              <a href="">
                Get Started <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="subscribe">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-8">
              <h1>Subscribe now</h1>
              <p>Never miss a beat on new projects and features.</p>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter email"
                  aria-describedby="button-addon2"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  <i className="bi bi-envelope"></i> Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="container">
          <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 ">
            <div className="col mb-3">
              <a
                href="#"
                className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
              ></a>
              <p className=" ">© 2024</p>
            </div>

            <div className="col mb-3"></div>

            <div className="col mb-3">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0">
                    Home
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0  ">
                    Features
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0  ">
                    Pricing
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0  ">
                    FAQs
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0  ">
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div className="col mb-3">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0  ">
                    Home
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0  ">
                    Features
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0  ">
                    Pricing
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0  ">
                    FAQs
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0  ">
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div className="col mb-3">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0  ">
                    Home
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0  ">
                    Features
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0  ">
                    Pricing
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0  ">
                    FAQs
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0  ">
                    About
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
export default Home;
