import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const About: NextPage = () => {
  return (
    <>
      <div className="wrapper-inner-cms">
        <div className="breadcrumb-block">
          <img src="images/breadcrumb-bg.jpg" />
          <div className="container">
            <div className="breadcrumb-head">
              <h4>About Us</h4>
            </div>
          </div>
        </div>
        <section className="about-us-info-sec">
          <div className="container">
            <div className="about-us-info-block">
              <div className="about-us-info-img">
                <figure>
                  <img src="images/main-top-img.png" />
                </figure>
              </div>
              <div className="about-us-info-content">
                <h4>There are many variations of Passages of Lorem Ipsum</h4>
                <p>
                  Medcity has been present in Europe since 1990, offering
                  innovative solutions, specializing in medical services for
                  treatment of medical infrastructure.
                </p>
                <p>
                  Mistaken idea of denouncing pleasure and praising pain was
                  born and I will give you a complete account of the system, and
                  expound the actual teachings of the great explorer of the
                  truth.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="about-us-info2">
          <figure>
            <img src="images/about-blk-bg.jpg" />
          </figure>
          <div className="container">
            <div className="about-us-info2-content">
              <h4>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </h4>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default{" "}
              </p>
            </div>
          </div>
        </section>
        <section className="about-us-info-sec">
          <div className="container">
            <div className="about-us-info-block">
              <div className="about-us-info-img">
                <figure>
                  <img src="images/about-us-img-2.jpg" />
                </figure>
              </div>
              <div className="about-us-info-content">
                <h4>Lorem Ipsum is simply dummy text of the printing</h4>
                <p>
                  Medcity has been present in Europe since 1990, offering
                  innovative solutions, specializing in medical services for
                  treatment of medical infrastructure.
                </p>
                <p>
                  Mistaken idea of denouncing pleasure and praising pain was
                  born and I will give you a complete account of the system, and
                  expound the actual teachings of the great explorer of the
                  truth.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
