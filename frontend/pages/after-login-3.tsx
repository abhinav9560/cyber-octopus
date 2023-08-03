import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import worldLowRes from "../maps/world.json";
import styled from "styled-components";
import Link from "next/link";
import { VectorMap } from "@south-paw/react-vector-maps";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Endpoint } from "../common/utils/endpoints";
import { get } from "../common/utils/api";
import { ApiResponse } from "../common/utils/interface";

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

const AfterLogin3: NextPage = () => {
  const router = useRouter();
  const [mapData, setMapData] = useState();
  const [attack, setAttack] = useState<any>({});

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
    onClick: ({ target }) => {},
    // setCountry(getCountryId(target.attributes.name.value)),
    //@ts-ignore
    // onMouseLeave: ({ target }) => console.log(target),
  };

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    if (router.query.id) getData();
  }, [router.query]);

  const getData = () => {
    get(`${Endpoint.getSingleAttack}?id=${router.query.id}`).then((data) =>
      handleResponse(data)
    );
  };

  const handleResponse = (data: ApiResponse) => {
    console.log(data);
    setMapData(data?.data?.data);
    setAttack(data?.data?.attacks);
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
                  id="arrow_back_black_24dp"
                  xmlns="http://www.w3.org/2000/svg"
                  width="29.92"
                  height="29.92"
                  viewBox="0 0 29.92 29.92"
                >
                  <path
                    id="Path_28910"
                    data-name="Path 28910"
                    d="M0,0H29.92V29.92H0Z"
                    fill="none"
                  />
                  <path
                    id="Path_28911"
                    data-name="Path 28911"
                    d="M28.28,17.06H13.108l6.969-6.969-1.77-1.758L8.333,18.307l9.973,9.973,1.758-1.758-6.956-6.969H28.28Z"
                    transform="translate(-3.347 -3.347)"
                  />
                </svg>
              </button>
              <div className="after-login-detail-left">
                <figure>
                  <Map>
                    <VectorMap {...mapData} layerProps={layerProps} />;
                  </Map>
                </figure>
              </div>
              <div className="after-login-detail-right">
                <div className="after-login-detail-head-2">
                  <h4>{attack?.titleEN}</h4>
                </div>
                <div className="after-login-info-content-blk">
                  <div className="after-login-info-content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: attack?.descriptionEN,
                      }}
                    />
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

export default AfterLogin3;
