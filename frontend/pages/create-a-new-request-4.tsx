import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const CreateNewRequest4: NextPage = () => {
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
                        <li className="check-mark active">
                          <h6>Priority</h6>
                          <span></span>
                        </li>
                        <li className="check-mark active">
                          <h6>Attachments</h6>
                          <span></span>
                        </li>
                        <li className="active">
                          <h6>Live Session</h6>
                          <span></span>
                        </li>
                      </ul>
                    </div>
                    <div className="quest-steps-count">Steps 4/5</div>
                  </div>
                  <div className="quest-steps-content-blk">
                    <div className="form-group">
                      <label>
                        Would you like to schedule a live session? ( +1 Credit )
                      </label>
                    </div>
                    <div className="session-schedule-block">
                      <div className="session-schedule-actions mb-4">
                        <button type="button" className="btn common-btn">
                          Yes
                        </button>
                        <button type="button" className="btn common-btn grey">
                          No
                        </button>
                      </div>
                      <div
                        className="calendar-wrapper"
                        id="calendar-wrapper"
                      ></div>
                      <div className="time-slot-list mb-5">
                        <label className="custom-label">Time Slot</label>
                        <div className="custom-control custom-radio custom-control-inline mb-1">
                          <input
                            type="radio"
                            id="card1"
                            name="restaurant"
                            className="custom-control-input"
                            checked={true}
                          />
                          <label className="custom-control-label">
                            10:00 AM
                          </label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline mb-1">
                          <input
                            type="radio"
                            id="card2"
                            name="restaurant"
                            className="custom-control-input"
                            checked={true}
                          />
                          <label className="custom-control-label">
                            10:30 AM
                          </label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline mb-1">
                          <input
                            type="radio"
                            id="card3"
                            name="restaurant"
                            className="custom-control-input"
                            checked={true}
                          />
                          <label className="custom-control-label">
                            11:00 AM
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="quest-steps-footer">
                    <button type="button" className="btn common-btn trans-btn">
                      Back
                    </button>
                    <Link href={"create-a-new-request-5"}>
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

export default CreateNewRequest4;
