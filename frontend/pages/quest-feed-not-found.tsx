import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const QuestNotFound: NextPage = () => {
  return (
    <>
      <div className="wrapper-inner-dashboard">
        <section className="new-box-style-sec">
          <div className="container">
            <div className="new-box-style-main-block">
              <div className="box-style-content-left-blk">
                <div className="box-style-content-left">
                  <figure>
                    <img src="images/main-top-img.png" />
                  </figure>
                </div>
              </div>
              <div className="box-style-content-right">
                <div className="quest-feed-not-found-blk">
                  <div className="quest-feed-not-found-content">
                    <h4>Quest Not Found</h4>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry’s{" "}
                    </p>
                    <button type="button" className="btn common-btn">
                      New Quest
                    </button>
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

export default QuestNotFound;
