import moment from "moment";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { get } from "../common/utils/api";
import { Endpoint } from "../common/utils/endpoints";
import { ApiResponse } from "../common/utils/interface";

const QuestFeed: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [questList, setQuestList] = useState([]);
  const [pageData, setpageData] = useState({
    page: 1,
    perPage: 10,
    searchItem: "",
  });
  const [totalPages, settotalPages] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const changePage = (index: number) => {
    setpageData({
      ...pageData,
      page: index,
    });
  };

  const getData = () => {
    get(
      `${Endpoint.getQuest}?page=${pageData?.page}&perPage=${pageData?.perPage}&searchItem=${pageData?.searchItem}`
    ).then((data) => handleResponse(data));
  };

  const handleResponse = (data: ApiResponse) => {
    setpageData({ ...pageData, searchItem: "" });
    // @ts-ignore
    setQuestList([...data?.data]);
    // @ts-ignore
    settotalPages(data?.length);
  };

  return (
    <>
      <div className="wrapper-inner-dashboard">
        <section className="new-box-style-sec">
          <div className="new-box-style-main-block">
            <div className="box-style-content-left-blk">
              <div className="box-style-content-left">
                <figure>
                  <img src="images/main-top-img.png" />
                </figure>
              </div>
            </div>
            <div className="box-style-content-right">
              <div className="quest-feed-blk">
                <div className="quest-feed-head">
                  <h4>{t("Quest_List")}</h4>
                  <div className="quest-feed-search">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search.."
                      value={pageData.searchItem}
                      onChange={(val) =>
                        setpageData({
                          ...pageData,
                          searchItem: val.target.value,
                        })
                      }
                      // onChange={(val)=>console.log(val.target.value)}
                    />
                    <img
                      src="images/search-icon.svg"
                      onClick={() => getData()}
                    />
                  </div>
                </div>
                <div className="feed-item-list">
                  {questList && questList.length ? (
                    <>
                      <ul>
                        {questList.map((ele: any, index: Number) => {
                          return (
                            <>
                              <Link href={`quest-detail/${ele._id}`}>
                                <li className="feed-item-blk">
                                  <div className="feed-item-head">
                                    <a
                                      href="javascript:void(0);"
                                      className="quest-feed-id"
                                    >
                                      {`ID: ${ele?.displayId}`}
                                    </a>
                                    <span>
                                      {moment(ele?.createdAt).format(
                                        "MMM-DD-YYYY"
                                      )}
                                    </span>
                                  </div>
                                  <p>{ele?.title}</p>
                                </li>
                              </Link>
                            </>
                          );
                        })}
                      </ul>

                      <div className="paginate">
                        <Pagination
                          itemClass="page-item"
                          linkClass="page-link"
                          activePage={pageData.page}
                          itemsCountPerPage={pageData.perPage}
                          totalItemsCount={totalPages}
                          pageRangeDisplayed={5}
                          onChange={changePage}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="quest-feed-not-found-blk">
                        <div className="quest-feed-not-found-content">
                          <h4>Quest Not Found</h4>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <Link href={"create-quest"}>
                  <button type="button" className="btn common-btn bt-main-btn">
                    {t("New_Quest")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

//@ts-ignore
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default QuestFeed;
