import { VectorMap } from "@south-paw/react-vector-maps";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import worldLowRes from "../maps/world.json";
import moment from "moment";
import styled from "styled-components";
import Link from "next/link";
import { get } from "../common/utils/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Endpoint } from "../common/utils/endpoints";
import { ApiResponse } from "../common/utils/interface";
import { ShowToast } from "../common/component/common";

//@ts-ignore
const Map = styled.div`
  margin: 1rem auto;
  width: 500px;

  svg {
    stroke: #fff;

    // All layers are just path elements
    path {
      fill: #a82b2b;
      cursor: pointer;
      outline: none;

      // When a layer is hovered
      &:hover {
        fill: rgba(168, 43, 43, 0.83);
      }

      // When a layer is focused.
      &:focus {
        fill: rgba(168, 43, 43, 0.6);
      }

      // When a layer is 'checked' (via checkedLayers prop).
      &[aria-checked="true"] {
        fill: rgba(56, 43, 168, 1);
      }

      // When a layer is 'selected' (via currentLayers prop).
      &[aria-current="true"] {
        fill: rgba(56, 43, 168, 0.83);
      }

      // You can also highlight a specific layer via it's id
      &[id="nz-can"] {
        fill: rgba(56, 43, 168, 0.6);
      }
    }
  }
`;

const AfterLogin2: NextPage = () => {
  const router = useRouter();
  const [mapData, setMapData] = useState();
  const [attacks, setAttacks] = useState([]);
  const [law, setLaw] = useState<any>({});
  const [showLaw, setShowLaw] = useState(false);


  useEffect(() => {
    if (router.query.id) getMap();
  }, [router.query]);

  const getMap = () => {
    get(`${Endpoint.map}?name=${router.query.id}`).then((data) =>
      handleSignup(data)
    );
  };

  const handleSignup = (data: ApiResponse) => {
    if (!data.status) {
      ShowToast(data.message, data.status);
      setTimeout(() => {
        router.back();
      }, 600);
    } else {
      console.log(data.data.attacks);
      setAttacks(data.data.attacks);
      setLaw(data?.data?.law)
      setMapData(data?.data?.data);
    }
  };

  const layerProps = {
    //@ts-ignore
    // onMouseEnter: ({ target }) => console.log(target),
    // //@ts-ignore
    // onMouseLeave: ({ target }) => console.log(target),
    // //@ts-ignore
    // onFocus: ({ target }) => console.log(target),
    // //@ts-ignore
    // onBlur: ({ target }) => console.log(target),
    //@ts-ignore
    onClick: ({ target }) => { },
    // setCountry(getCountryId(target.attributes.name.value)),
    //@ts-ignore
    // onMouseLeave: ({ target }) => console.log(target),
  };

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <div className="wrapper-inner-dashboard">
        <section className="after-login-sec">
          <div className="container">
            <div className="after-login-detail-block">
              <button
                type="button"
                className="after-login-action-btn"
                onClick={goBack}
              >
                <svg
                  id="Group_67037"
                  data-name="Group 67037"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30.779"
                  height="30.779"
                  viewBox="0 0 30.779 30.779"
                >
                  <path
                    id="Path_28912"
                    data-name="Path 28912"
                    d="M0,0H30.779V30.779H0Z"
                    fill="none"
                  />
                  <path
                    id="Path_28913"
                    data-name="Path 28913"
                    d="M13.8,11.984l6.348-6.348,1.813,1.813L15.611,13.8l6.348,6.348-1.813,1.813L13.8,15.611,7.449,21.959,5.636,20.146,11.984,13.8,5.636,7.449,7.449,5.636Z"
                    transform="translate(1.592 1.592)"
                  />
                </svg>
              </button>
              <div className="after-login-detail-left">
                <figure>
                  <Map>
                    <VectorMap {...mapData} layerProps={layerProps} />
                  </Map>
                </figure>
              </div>
              <div className="after-login-detail-right">
                <div className="after-login-detail-head">
                  <h4>{String(router.query.id).toUpperCase()}</h4>
                  {/* <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry’s
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.{" "}
                  </p> */}
                </div>
                <div className="after-login-detail-list">

                  {showLaw ? <>

                    <div className="after-login-detail-right">

                      <div className="after-login-detail-head-2">
                        <h4>{law?.titleEN}</h4>
                      </div>
                      <div className="after-login-info-content-blk">
                        <div className="after-login-info-content">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: law?.descriptionEN,
                            }}
                          />
                          <button
                            type="button"
                            className="btn common-btn"
                            onClick={() => setShowLaw(false)}
                          >
                            Go Back
                          </button>
                        </div>
                      </div>
                    </div>
                  </> : <>
                    <ul>
                      {attacks && !attacks.length && (
                        <div className={'inbetween'}>
                          <h3>No Data Found</h3>
                        </div>
                      )}
                      {law && <>
                        <li onClick={() => setShowLaw(true)}>
                          <a className="item-dtl-blk">
                            <div className="item-dtl-head">
                              <h4>{law?.titleEN}</h4>
                              <h5>
                                Cyber Law
                              </h5>
                              {/* <div
                              dangerouslySetInnerHTML={{
                                __html: law?.descriptionEN,
                              }}
                            /> */}
                            </div>
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16.204"
                                height="26.517"
                                viewBox="0 0 16.204 26.517"
                              >
                                {" "}
                                <path
                                  id="Path_28909"
                                  data-name="Path 28909"
                                  d="M18.313,18.894,8,29.207l2.946,2.946L24.2,18.894,10.946,5.636,8,8.582Z"
                                  transform="translate(-8 -5.636)"
                                />{" "}
                              </svg>
                            </div>
                          </a>
                        </li>
                      </>
                      }
                      {attacks.map((ele: any, index) => {
                        return (
                          <>
                            <li>
                              <Link href={`after-login-3?id=${ele._id}`}>
                                <a className="item-dtl-blk">
                                  <div className="item-dtl-head">
                                    <h4>{ele?.titleEN}</h4>
                                    <h5>
                                      {moment(ele?.createdAt).format(
                                        "MM-DD-YYYY"
                                      )}
                                    </h5>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: ele?.descriptionEN,
                                      }}
                                    />
                                  </div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16.204"
                                    height="26.517"
                                    viewBox="0 0 16.204 26.517"
                                  >
                                    {" "}
                                    <path
                                      id="Path_28909"
                                      data-name="Path 28909"
                                      d="M18.313,18.894,8,29.207l2.946,2.946L24.2,18.894,10.946,5.636,8,8.582Z"
                                      transform="translate(-8 -5.636)"
                                    />{" "}
                                  </svg>
                                </a>
                              </Link>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </>}

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AfterLogin2;
