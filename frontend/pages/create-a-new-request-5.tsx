import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const CreateNewRequest5: NextPage = () => {
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
                        <li className="check-mark active">
                          <h6>Live Session</h6>
                          <span></span>
                        </li>
                      </ul>
                    </div>
                    <div className="quest-steps-count">Steps 5/5</div>
                  </div>
                  <div className="quest-steps-content-blk">
                    <div className="quest-detail-preview-blk">
                      <div className="quest-detail-preview-head">
                        <h4>There are many variations of passages </h4>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry’s standard dummy text ever since the 1500s
                        </p>
                        <p>
                          When an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.
                        </p>
                      </div>
                      <div className="quest-detail-priorities">
                        <h4>Priority</h4>
                        <h5>Standard</h5>
                        <p>Within 5 days we will investigate your issue</p>
                      </div>
                      <div className="quest-detail-preview-files">
                        <h4>Attachments files</h4>
                        <ul>
                          <li>
                            <img src="images/pdf-icon.svg" />
                          </li>
                          <li>
                            <img src="images/word-icon.svg" />
                          </li>
                        </ul>
                      </div>
                      <div className="quest-detail-preview-sessions">
                        <h4>Live Session</h4>
                        <p>October, 12 at 10:30 AM</p>
                      </div>
                    </div>
                  </div>
                  <div className="quest-steps-footer">
                    <button type="button" className="btn common-btn trans-btn">
                      Back
                    </button>
                    <Link href={"quest-detail"}>
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

export default CreateNewRequest5;
