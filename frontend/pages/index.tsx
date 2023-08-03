import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiResponse, RootState } from "../common/utils/interface";
import { get, post } from "../common/utils/api";
import { Endpoint } from "../common/utils/endpoints";
import { globalAction } from "../redux/action/global";
import { Global } from "../redux/constants";

let OwlCarousel: any;

const Home: NextPage = () => {
  const [owl, setOwl] = useState("");
  const dispatch = useDispatch();

  const authData = useSelector((state: RootState) => state?.authReducer);

  useEffect(() => {
    OwlCarousel = dynamic(import("react-owl-carousel"), {
      ssr: false,
    });
    setOwl(OwlCarousel);
    getGlobalSetting();
  }, []);

  const getGlobalSetting = () => {
    get(Endpoint.getGlobalSetting).then((data) => handleResponse(data));
  };

  const handleResponse = (data: ApiResponse) => {
    if (data.status) {
      // @ts-ignore
      dispatch(
        globalAction(Global, {
          title: data?.data?.title,
          description: data?.data?.description,
          address: data?.data?.address,
          phone: data?.data?.phone,
          email: data?.data?.email,
          facebook: data?.data?.facebook,
          twitter: data?.data?.twitter,
          linkden: data?.data?.linkden,
        })
      );
    } else {
    }
  };

  return (
    <div className="wrapper-inner">
      <section className="main-top-section">
        <img className="main-top-bg" src="images/main-top-bg.png" />
        <div className="container">
          <div className="main-top-content-blk">
            <div className="main-top-left-content">
              <div className="main-top-sec-content-block">
                <div className="main-top-sec-content">
                  <h2>Cyber Octopus</h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry’s
                    standard dummy text ever since the 1500s, when an unknown
                  </p>
                  {authData && !authData.token && (
                    <>
                      <div className="action-btn-blk">
                        <Link href={"login"}>
                          <a className="btn common-btn">Login</a>
                        </Link>
                        <Link href={"signup"}>
                          <a
                            className="btn common-btn trans-btn"
                            style={{
                              marginLeft: "10px",
                            }}
                          >
                            Sign Up
                          </a>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="main-top-right-content">
              <div className="main-top-img-block">
                <figure className="d-flex">
                  <img src="images/main-top-img.png" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="info-detail-sec">
        <div className="container">
          <div className="info-detail-sec-head mb-5">
            <h4>Trusted By big and small companies</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry’s standard dummy text
              ever since the 1500s, when an unknown
            </p>
          </div>
          <div className="row mb-5">
            <div className="col-md-3">
              <div className="info-detail-item" style={{ display: "block" }}>
                <img src="images/micro-icon.svg" />
                <h4>Lorem Ipsum is simply</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="info-detail-item">
                <img src="images/micro-icon.svg" />
                <h4>Lorem Ipsum is simply</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="info-detail-item">
                <img src="images/micro-icon.svg" />
                <h4>Lorem Ipsum is simply</h4>
              </div>
            </div>
            <div className="col-md-3">
              <div className="info-detail-item">
                <img src="images/micro-icon.svg" />
                <h4>Lorem Ipsum is simply</h4>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button type="button" className="btn common-btn">
              Read More <i className="fas fa-long-arrow-alt-right"></i>
            </button>
          </div>
        </div>
      </section>
      <section className="info-content-sec">
        <div className="container">
          <div className="info-content-block mb-7">
            <div className="info-content-detail">
              <div className="info-content-dtl-blk">
                <h4>Quest Module</h4>
                <h2>Cybersecurity Matters Made Easy</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry’s
                  standard dummy text ever since the 1500s, when an unknown
                </p>
                <ul>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry’s{" "}
                  </li>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting
                  </li>
                </ul>
                <button className="btn common-btn">
                  Read More <i className="fas fa-long-arrow-alt-right"></i>
                </button>
              </div>
            </div>
            <div className="info-content-img-blk">
              <figure style={{ display: "block" }}>
                <img src="images/info-bg-1.png" />
              </figure>
            </div>
          </div>
          <div className="info-content-block left-img-block">
            <div className="info-content-img-blk">
              <figure style={{ display: "block" }}>
                <img src="images/info-bg-1.png" />
              </figure>
            </div>
            <div className="info-content-detail">
              <div className="info-content-dtl-blk">
                <h4>Awarness Module</h4>
                <h2>Entertaining Education For Practical Learning</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry’s
                  standard dummy text ever since the 1500s, when an unknown
                </p>
                <ul>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry’s{" "}
                  </li>
                  <li>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting
                  </li>
                </ul>
                <button className="btn common-btn">
                  Read More <i className="fas fa-long-arrow-alt-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="courses-info-detail-sec">
        <div className="animate-shape shape-1"></div>
        <div className="animate-shape shape-2"></div>
        <div className="container">
          <div className="courses-info-detail-sec mb-5">
            <h4>Sneakpeak of our coures</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry’s standard dummy text
              ever since the 1500s, when an unknown
            </p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="courses-info-detail-item">
                <figure style={{ display: "block" }}>
                  <img src="images/info-bg-1.png" />
                </figure>
                <div className="courses-info-detail">
                  <div className="courses-info-nm-blk">
                    <a href="javascript:void(0);" className="courses-nm">
                      Enter the Matrix
                    </a>
                    <span>Free Course</span>
                  </div>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </p>
                  <div className="courses-info-tags">
                    <a href="javascript:void(0);" className="course-tag">
                      Advance
                    </a>
                    <a href="javascript:void(0);" className="course-tag">
                      Lorem Ipsum
                    </a>
                    <a href="javascript:void(0);" className="course-tag">
                      1 Hour
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="courses-info-detail-item">
                <figure style={{ display: "block" }}>
                  <img src="images/info-bg-1.png" />
                </figure>
                <div className="courses-info-detail">
                  <div className="courses-info-nm-blk">
                    <a href="javascript:void(0);" className="courses-nm">
                      Lorem Ipsum is simply
                    </a>
                    <span>Past Course</span>
                  </div>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </p>
                  <div className="courses-info-tags">
                    <a href="javascript:void(0);" className="course-tag">
                      Advance
                    </a>
                    <a href="javascript:void(0);" className="course-tag">
                      Lorem Ipsum
                    </a>
                    <a href="javascript:void(0);" className="course-tag">
                      2 Hour
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="courses-info-detail-item">
                <figure style={{ display: "block" }}>
                  <img src="images/info-bg-1.png" />
                </figure>
                <div className="courses-info-detail">
                  <div className="courses-info-nm-blk">
                    <a href="javascript:void(0);" className="courses-nm">
                      Enter the Matrix
                    </a>
                    <span>Free Course</span>
                  </div>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </p>
                  <div className="courses-info-tags">
                    <a href="javascript:void(0);" className="course-tag">
                      Advance
                    </a>
                    <a href="javascript:void(0);" className="course-tag">
                      Lorem Ipsum
                    </a>
                    <a href="javascript:void(0);" className="course-tag">
                      3 Hour
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cyber-intelligence-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="cyber-intelligence-sec-head mb-4">
                <h4>Cyber Intelligence</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry’s
                  standard dummy{" "}
                </p>
              </div>
              <div className="cyber-intelligence-blk mb-3">
                <h4>Legislation Changes</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry’s{" "}
                </p>
              </div>
              <div className="cyber-intelligence-blk mb-3">
                <h4>Data Breaches</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry’s{" "}
                </p>
              </div>
              <div className="cyber-intelligence-blk ">
                <h4>Local News</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry’s{" "}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="cyber-intelligence-img-blk">
                <figure>
                  <img src="images/cyber-intelligence-img.png" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="upcoming-features-sec">
        <div className="animate-shape shape-1"></div>
        <div className="animate-shape shape-2"></div>
        <div className="container">
          <div className="upcoming-features-sec-head mb-5">
            <h4>Upcoming Features</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry’s standard dummy text
              ever since the 1500s, when an unknown
            </p>
          </div>
          <div className="features-list-block">
            <div className="features-list">
              <ul>
                <li className="active">
                  <div className="features-list-item">
                    <h4>@2021</h4>
                    <h2>Product Launch</h2>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content
                    </p>
                  </div>
                </li>
                <li>
                  <div className="features-list-item">
                    <h4>@2021</h4>
                    <h2>Product Launch</h2>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content
                    </p>
                  </div>
                </li>
                <li>
                  <div className="features-list-item">
                    <h4>@2021</h4>
                    <h2>Product Launch</h2>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content
                    </p>
                  </div>
                </li>
                <li>
                  <div className="features-list-item">
                    <h4>@2021</h4>
                    <h2>Product Launch</h2>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content
                    </p>
                  </div>
                </li>
                <li>
                  <div className="features-list-item">
                    <h4>@2021</h4>
                    <h2>Product Launch</h2>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="client-testimonials-sec">
        <div className="container">
          <div className="client-testimonials-sec-head mb-5">
            <h4>What Our Clients say</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry’s standard dummy text
              ever since the 1500s, when an unknown
            </p>
          </div>

          {owl && (
            <OwlCarousel className="owl-theme" loop margin={10} nav dots>
              <div className="item">
                <div className="testimonials-item">
                  <div className="testimonials-desc">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.
                    </p>
                  </div>
                  <div className="testimonials-info">
                    <figure>
                      <img src="images/say-img1.png" />
                    </figure>
                    <div className="testimonials-info-nm">
                      <h4>Christine Rose</h4>
                      <p>Lorem Ipsum</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="testimonials-item">
                  <div className="testimonials-desc">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.
                    </p>
                  </div>
                  <div className="testimonials-info">
                    <figure>
                      <img src="images/say-img1.png" />
                    </figure>
                    <div className="testimonials-info-nm">
                      <h4>Christine Rose</h4>
                      <p>Lorem Ipsum</p>
                    </div>
                  </div>
                </div>
              </div>
            </OwlCarousel>
          )}
        </div>
      </section>
      <section className="info-detail-sec-2">
        <div className="container">
          <div className="info-detail-sec-2-head mb-5">
            <h4>Use Cases</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry’s standard dummy text
              ever since the 1500s, when an unknown
            </p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="info-detail-item-2">
                <h4>Use case #1</h4>
                <h2>Lorem Ipsum is simply</h2>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.{" "}
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-detail-item-2">
                <h4>Use case #1</h4>
                <h2>Lorem Ipsum is simply</h2>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.{" "}
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="info-detail-item-2">
                <h4>Use case #1</h4>
                <h2>Lorem Ipsum is simply</h2>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
