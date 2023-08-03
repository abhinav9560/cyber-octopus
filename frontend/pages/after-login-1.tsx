import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import worldLowRes from "../maps/world.json";
// import { VectorMap } from "@south-paw/react-vector-maps";
import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";
import router from "next/router";
// import DottedMap from "dotted-map";

import VectorMap, {
  Layer,
  Tooltip,
  Border,
  Font,
} from "devextreme-react/vector-map";

import * as mapsData from "devextreme/dist/js/vectormap-data/world.js";

//@ts-ignore
const Map = styled.div`
  margin: 1rem auto;
  width: 1000px;

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

const countries = {
  Russia: { totalArea: 17.12, color: "#1E90FF" },
  Canada: { totalArea: 9.98, color: "#B8860B" },
  China: { totalArea: 9.59, color: "#BDB76B" },
  "United States": { totalArea: 9.52, color: "#FFA07A" },
  Brazil: { totalArea: 8.51, color: "#3CB371" },
  Australia: { totalArea: 7.69, color: "#D8BFD8" },
  India: { totalArea: 3.29, color: "#DB7093" },
  Argentina: { totalArea: 2.78, color: "#FFD700" },
  Kazakhstan: { totalArea: 2.72, color: "#CD5C5C" },
  Algeria: { totalArea: 2.38, color: "#B0C4DE" },
};

const bounds = [-180, 85, 180, -60];

const AfterLogin1: NextPage = () => {
  const [country, setCountry] = useState("india");

  const getCountryId = (name: any) => {
    return String(name).toLowerCase().replace(" ", "-");
  };

  // const map = new DottedMap({
  //   height: 60,
  //   grid: "diagonal",
  // });

  // map.addPin({
  //   lat: 40.73061,
  //   lng: -73.935242,
  //   svgOptions: { color: "#d6ff79", radius: 0.6 },
  // });
  // map.addPin({
  //   lat: 48.8534,
  //   lng: 2.3488,
  //   svgOptions: { color: "#fffcf2", radius: 0.6 },
  // });

  // const svgMap = map.getSVG({
  //   radius: 0.22,
  //   color: "#423B38",
  //   shape: "circle",
  //   backgroundColor: "white",
  // });

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
    onClick: ({ target }) => {
      setCountry(getCountryId(target.attributes.name.value));
      router.push(
        `/after-login-2?id=${getCountryId(target.attributes.name.value)}`
      );
    },
    //@ts-ignore
    // onMouseLeave: ({ target }) => console.log(target),
  };

  function customizeTooltip(arg) {
    const name = arg.attribute("name");
    const country = countries[name];
    if (country) {
      return {
        text: `${name}: ${country.totalArea}M km&#178`,
        color: country.color,
      };
    }
    return null;
  }

  function clickHandler({ target }) {
    if (target && countries[target.attribute("name")]) {
      target.selected(!target.selected());
    }
  }

  function customizeLayer(elements) {
    elements.forEach((element) => {
      const country = countries[element.attribute("name")];
      if (country) {
        element.applySettings({
          color: country.color,
          hoveredColor: "#e0e000",
          selectedColor: "#008f00",
        });
      }
    });
  }

  return (
    <>
      <div className="wrapper-inner-dashboard">
        <section className="after-login-sec">
          <div className="container">
            <div className="after-login-map-blk">
              {/* <Map>
                <VectorMap {...worldLowRes} layerProps={layerProps} />;
              </Map> */}

              <VectorMap id="vector-map" bounds={bounds} onClick={clickHandler}>
                <Layer
                  dataSource={mapsData.world}
                  customize={customizeLayer}
                ></Layer>
                <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
                  <Border visible={true}></Border>
                  <Font color="#fff"></Font>
                </Tooltip>
              </VectorMap>

              {/* <div dangerouslySetInnerHTML={{ __html: svgMap }} /> */}

              <div className="middle-logo">
                <a className="middle-logo-btn">Cyber Octopus</a>
              </div>
              <Link href={`/after-login-2?id=${country}`}>
                <div className="octopus-info-dtl">
                  <h4>Click Here For Details</h4>

                  <h6>{`Country: ${country.toUpperCase()}`}</h6>
                </div>
              </Link>

              {/* <img src="images/after-login-map-2.png" /> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AfterLogin1;
