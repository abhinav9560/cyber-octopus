import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

const Signup2: NextPage = () => {
  return (
    <>
      <div className="wrapper-inner-pages">
        <img src="images/main-top-bg.png" />
        <section className="main-form-section">
          <div className="container">
            <div className="main-form-block">
              <div className="main-form-left">
                <img src="images/main-top-img.png" />
              </div>
              <div className="main-form-right">
                <div className="form-block">
                  <form className="" action="">
                    <div className="form-head">
                      <h4>Sign Up</h4>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Where do you work?</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="lorem lipsum"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>What is your role?</label>
                          <select className="form-control">
                            <option>Select Your Role</option>
                            <option selected>Lorem</option>
                            <option>Category 2</option>
                            <option>Category 3</option>
                            <option>Category 4</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="form-group form-terms-condition">
                      <label className="coustom-check-box">
                        <input type="checkbox" checked={true} />
                        <span className="checkmark"></span>
                        <p>
                          I accept{" "}
                          <a href="javascript:void(0);">terms of use</a> &{" "}
                          <a href="javascript:void(0);">Privacy policy</a>
                        </p>
                      </label>
                    </div>
                    <div className="form-btn-group">
                      <button className="btn common-btn">Register</button>
                    </div>
                    <div className="form-social-login-blk">
                      <div className="form-social-login-head">
                        <h4>Or Sign Up</h4>
                      </div>
                      <ul className="social-logins">
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="social-login-items"
                            style={{ marginRight: "5px" }}
                          >
                            <FontAwesomeIcon
                              icon={["fab", "facebook-f"]}
                              size={"xs"}
                              color={"white"}
                              style={{ padding: '15px 18px 15px 15px' }}
                            />
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="social-login-items"
                            style={{ marginRight: "5px" }}
                          >
                            <FontAwesomeIcon
                              icon={["fab", "linkedin-in"]}
                              size={"10x"}
                              color={"white"}
                              style={{ padding: "15px" }}
                            />
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:void(0);"
                            className="social-login-items"
                          >
                            <FontAwesomeIcon
                              icon={["fab", "twitter"]}
                              size={"10x"}
                              color={"white"}
                              style={{ padding: "15px" }}
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="form-footer">
                      <Link href={"signup"}>
                        <a className="back-link">
                          <i className="ri-arrow-left-line"></i> Back
                        </a>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Signup2;
