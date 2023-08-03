import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const CreateNewRequest2: NextPage = () => {
  return (
    <>
      <div className="wrapper-inner-dashboard">
        <section className="new-box-style-sec">
          <div className="container">
            <div className="new-box-style-main-block">
              <div className="box-style-content-left-blk">
                <div className="box-style-content-left">
                  <h4>Helpful hints for each step</h4>
                  <ul>
                    <li>- How to name the title</li>
                    <li>- Provider as much details as possible</li>
                    <li>- Etc.</li>
                  </ul>
                  <figure>
                    <img src="images/main-top-img.png" />
                  </figure>
                </div>
              </div>
              <div className="box-style-content-right">
                <div className="quest-steps-block">
                  <div className="quest-steps-head">
                    <div className="step-process">
                      <ul className="progessbar-list">
                        <li className="check-mark active">
                          <h6>Title & Decription</h6>
                          <span></span>
                        </li>
                        <li className="active">
                          <h6>Priority</h6>
                          <span></span>
                        </li>
                        <li>
                          <h6>Attachments</h6>
                          <span></span>
                        </li>
                        <li>
                          <h6>Live Session</h6>
                          <span></span>
                        </li>
                      </ul>
                    </div>
                    <div className="quest-steps-count">Steps 2/5</div>
                  </div>
                  <div className="quest-steps-content-blk">
                    <form>
                      <div className="form-group">
                        <label>
                          How urgent you want your quest to be solved?
                        </label>
                        <div className="custom-timeline-block">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="custom-control custom-radio custom-control-inline">
                                <input
                                  type="radio"
                                  id="customRadioInline1"
                                  name="timeline"
                                  className="custom-control-input"
                                  checked={true}
                                />
                                <label className="custom-control-label">
                                  <div className="timeline-items">
                                    <span className="credits-blk">
                                      +2 Credits
                                    </span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="36.938"
                                      height="36.938"
                                      viewBox="0 0 36.938 36.938"
                                    >
                                      {" "}
                                      <g
                                        id="star"
                                        transform="translate(10.45 10.138)"
                                      >
                                        {" "}
                                        <path
                                          id="Path_28896"
                                          data-name="Path 28896"
                                          d="M31.528,5.409A18.469,18.469,0,0,0,5.409,31.528,18.469,18.469,0,0,0,31.528,5.409ZM26.3,29.347l-7.83-4.117-7.83,4.117,1.5-8.719L5.8,14.453l8.755-1.272,3.915-7.933,3.915,7.933,8.755,1.272L24.8,20.628Z"
                                          transform="translate(-10.45 -10.138)"
                                        />{" "}
                                        <path
                                          id="Path_28897"
                                          data-name="Path 28897"
                                          d="M160.885,146.35l-5.541-.805-2.478-5.021-2.478,5.021-5.541.805,4.01,3.908-.947,5.519,4.956-2.606,4.956,2.606-.947-5.519Z"
                                          transform="translate(-144.847 -140.524)"
                                        />{" "}
                                      </g>{" "}
                                    </svg>
                                    <h4>Urgent</h4>
                                    <p>
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry.
                                    </p>
                                  </div>
                                </label>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="custom-control custom-radio custom-control-inline">
                                <input
                                  type="radio"
                                  id="customRadioInline2"
                                  name="timeline"
                                  className="custom-control-input"
                                />
                                <label className="custom-control-label">
                                  <div className="timeline-items">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="36.938"
                                      height="36.938"
                                      viewBox="0 0 36.938 36.938"
                                    >
                                      {" "}
                                      <g
                                        id="star"
                                        transform="translate(10.45 10.138)"
                                      >
                                        {" "}
                                        <path
                                          id="Path_28896"
                                          data-name="Path 28896"
                                          d="M31.528,5.409A18.469,18.469,0,0,0,5.409,31.528,18.469,18.469,0,0,0,31.528,5.409ZM26.3,29.347l-7.83-4.117-7.83,4.117,1.5-8.719L5.8,14.453l8.755-1.272,3.915-7.933,3.915,7.933,8.755,1.272L24.8,20.628Z"
                                          transform="translate(-10.45 -10.138)"
                                        />{" "}
                                        <path
                                          id="Path_28897"
                                          data-name="Path 28897"
                                          d="M160.885,146.35l-5.541-.805-2.478-5.021-2.478,5.021-5.541.805,4.01,3.908-.947,5.519,4.956-2.606,4.956,2.606-.947-5.519Z"
                                          transform="translate(-144.847 -140.524)"
                                        />{" "}
                                      </g>{" "}
                                    </svg>
                                    <h4>Standard</h4>
                                    <p>
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry.
                                    </p>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="quest-steps-footer">
                    <button type="button" className="btn common-btn trans-btn">
                      Back
                    </button>
                    <Link href={"create-a-new-request-3"}>
                      <button type="button" className="btn common-btn">
                        Continue
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CreateNewRequest2;
