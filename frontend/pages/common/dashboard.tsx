import type { NextPage } from "next";
import JSInclude from "../../common/js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(router.pathname);
  }, []);

  return (
    <>
      <div className="db-main-content-left">
        <ul>
          <li className={url == "/statistics" ? "active" : ""}>
            <Link href={"/statistics"}>
              <a className="menu-item">
                <figure>
                  <img src="images/m-icon-1.svg" />
                </figure>
                <figcaption>
                  <h4>Statistics</h4>
                  <p>Lorem Ipsum is simply </p>
                </figcaption>
              </a>
            </Link>
          </li>
          <li className={url == "/credits" ? "active" : ""}>
            <Link href={"/credits"}>
              <a className="menu-item">
                <figure>
                  <img src="images/m-icon-2.svg" />
                </figure>
                <figcaption>
                  <h4>Credits</h4>
                  <p>It is a long established fact</p>
                </figcaption>
              </a>
            </Link>
          </li>
          <li className={(url == "/profile" || url == "/profile-edit" || url == "/change-password") ? "active" : ""}>
            <Link href={"/profile"}>
              <a className="menu-item">
                <figure>
                  <img src="images/m-icon-3.svg" />
                </figure>
                <figcaption>
                  <h4>Profile</h4>
                  <p>There are many variations</p>
                </figcaption>
              </a>
            </Link>
          </li>
          <li className={url == "/setting" ? "active" : ""}>
            <Link href={"/setting"}>
              <a className="menu-item">
                <figure>
                  <img src="images/m-icon-4.svg" />
                </figure>
                <figcaption>
                  <h4>Settings</h4>
                  <p>Contrary to popular belief</p>
                </figcaption>
              </a>
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <a className="menu-item">
                <figure>
                  <img src="images/m-icon-5.svg" />
                </figure>
                <figcaption>
                  <h4>Cyber Octopus</h4>
                  <p>It is a long established fact</p>
                </figcaption>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
