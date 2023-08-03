import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const CreateNewRequest3: NextPage = () => {
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
                        <li className="active">
                          <h6>Attachments</h6>
                          <span></span>
                        </li>
                        <li>
                          <h6>Live Session</h6>
                          <span></span>
                        </li>
                      </ul>
                    </div>
                    <div className="quest-steps-count">Steps 3/5</div>
                  </div>
                  <div className="quest-steps-content-blk">
                    <form>
                      <div className="form-group">
                        <label>Would you like to add any attachments?</label>
                        <div className="custom-attachments-block">
                          <ul>
                            <li>
                              <div className="custom-file-attachments">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  id="validatedCustomFile"
                                  required
                                />
                                <label className="custom-file-label">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="33.837"
                                    height="31.786"
                                    viewBox="0 0 33.837 31.786"
                                  >
                                    {" "}
                                    <g
                                      id="upload-icon"
                                      transform="translate(0 0)"
                                    >
                                      {" "}
                                      <path
                                        id="XMLID_11_"
                                        d="M82.624,19.8l4.552-4.552V34.1a1.538,1.538,0,0,0,3.076,0V15.251L94.8,19.8a1.538,1.538,0,0,0,2.175-2.175L89.8,10.451q-.054-.054-.113-.1c-.017-.014-.035-.026-.052-.039s-.045-.035-.069-.05-.043-.027-.065-.04-.042-.026-.064-.038-.045-.022-.068-.033-.045-.022-.069-.032l-.067-.024c-.025-.009-.05-.019-.075-.026l-.067-.017c-.026-.007-.052-.014-.079-.019s-.052-.008-.077-.012-.047-.008-.071-.01c-.047,0-.095-.007-.142-.007h-.018q-.071,0-.143.007c-.023,0-.046.007-.07.01s-.053.007-.079.012-.051.012-.077.019l-.069.018c-.025.007-.049.017-.073.026s-.046.016-.069.025-.044.02-.066.031-.047.022-.071.034-.041.024-.061.036-.046.026-.068.041-.043.031-.064.047-.038.027-.056.042c-.037.031-.073.063-.108.1l-.005,0-7.177,7.177A1.538,1.538,0,0,0,82.624,19.8Z"
                                        transform="translate(-71.796 -10)"
                                        fill="#bcbcbc"
                                      />{" "}
                                      <path
                                        id="XMLID_12_"
                                        d="M32.3,160a1.538,1.538,0,0,0-1.538,1.538V173.33H3.076V161.538a1.538,1.538,0,0,0-3.076,0v13.33a1.538,1.538,0,0,0,1.538,1.538H32.3a1.538,1.538,0,0,0,1.538-1.538v-13.33A1.538,1.538,0,0,0,32.3,160Z"
                                        transform="translate(0 -144.62)"
                                        fill="#bcbcbc"
                                      />{" "}
                                    </g>{" "}
                                  </svg>
                                  <h4>Drag and Drop Files Here</h4>
                                </label>
                              </div>
                            </li>
                            <li>
                              <div className="custom-uploaded-files">
                                <img src="images/pdf-icon.svg" />
                              </div>
                            </li>
                            <li>
                              <div className="custom-uploaded-files">
                                <img src="images/word-icon.svg" />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="quest-steps-footer">
                    <button type="button" className="btn common-btn trans-btn">
                      Back
                    </button>
                    <Link href={"create-a-new-request-4"}>
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

export default CreateNewRequest3;
