import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import {
  DefaultInput,
  DefaultTextarea,
} from "../common/component/defaultinput";
import { validateLogin, validateQuestTitle } from "../common/utils/validation";

import DatePicker from "react-datepicker";
import moment from "moment";
import { post } from "../common/utils/api";
import { Endpoint } from "../common/utils/endpoints";
import { ApiResponse } from "../common/utils/interface";
import { DefaultDocument, ShowToast } from "../common/component/common";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
// import DefaultEditor from "./common/defaulteditor";
import dynamic from "next/dynamic";

const DefaultEditor = dynamic(() => import('./common/defaulteditor'), {
  ssr: false
})

const CreateNewRequest1: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [questType, setquestType] = useState(1);
  const [isLiveSession, setisLiveSession] = useState(false);

  const [documentList, setdocumentList] = useState([]);
  const [documentShowList, setdocumentShowList] = useState([]);

  const [stepOneData, setstepOneData] = useState({
    title: "",
    description: "",
  });
  const [liveSession, setliveSession] = useState<any>(new Date());

  const formRef1 = useRef(null);

  useEffect(() => {
  }, []);

  const goBack = () => (step !== 1 ? setStep(step - 1) : "");
  const goFront = () => {
    // console.log(formRef1,'formRef1')
    // console.log(formRef2,'formRef2')
    step < 5 ? setStep(step + 1) : "";
  };

  const addDocument = (event: any) => {
    let temp = documentShowList;
    // @ts-ignore
    temp.push(URL.createObjectURL(event));
    setdocumentShowList([...temp]);

    setdocumentShowList;
    let temp1 = documentList;
    // @ts-ignore
    temp1.push(event);
    setdocumentList([...temp1]);
  };

  const submitQuest = () => {
    let formData = new FormData();
    formData.append("title", stepOneData.title);
    formData.append("description", stepOneData.description);
    formData.append("questType", String(questType));
    formData.append("isLiveSession", isLiveSession ? "1" : "0");
    formData.append("liveSession", liveSession);
    documentList.map((item) => {
      formData.append("image", item);
    });
    post(Endpoint.addQuest, formData, 1).then((data) => handleResponse(data));
  };

  const handleResponse = (data: ApiResponse) => {
    ShowToast(data.message, data.status);
    if (data.status) {
      router.push({
        pathname: "quest-feed",
      });
    } else {
      setStep(1);
      setstepOneData({ title: "", description: "" });
      setquestType(1);
      setdocumentList([]);
      setdocumentShowList([]);
      setliveSession(new Date());
    }
  };

  const deleteImage = (index:number)=>{
    let documents = documentList
    let documentSowList = documentShowList

    documents.splice(index,1)
    documentSowList.splice(index,1)

    setdocumentList([...documents]);
    setdocumentShowList([...documentSowList]);
  }


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
                        <li className={step >= 1 ? "active" : ""}>
                          <h6>{t('Title_&_Decription')}</h6>
                          <span></span>
                        </li>
                        <li className={step >= 2 ? "active" : ""}>
                          <h6>{t('Priority')}</h6>
                          <span></span>
                        </li>
                        <li className={step >= 3 ? "active" : ""}>
                          <h6>{t('Attachments')}</h6>
                          <span></span>
                        </li>
                        <li className={step >= 4 ? "active" : ""}>
                          <h6>{t('Live_Session')}</h6>
                          <span></span>
                        </li>
                        <li className={step >= 5 ? "active" : ""}>
                          <h6>{t('Preview')}</h6>
                          <span></span>
                        </li>
                      </ul>
                    </div>
                    <div className="quest-steps-count">{`${t('Steps')} ${step}/5`}</div>
                  </div>
                  <div className="quest-steps-content-blk">
                    {/* Step 1 */}
                    {step == 1 && (
                      <Formik
                        // @ts-ignore
                        innerRef={formRef1}
                        initialValues={{ title: "", description: "" }}
                        validate={validateQuestTitle}
                        onSubmit={(values, { setSubmitting }) => {
                          setSubmitting(false);
                        }}
                      >
                        {(props) => (
                          <form onSubmit={props.handleSubmit}>
                            <DefaultInput
                              placeholder={t('Quest_Title')}
                              label={t('What_is_your_Quest_About')}
                              name={"title"}
                              type={"text"}
                              value={props.values.title}
                              onChange={props.handleChange("title")}
                              onBlur={() =>
                                props.setFieldTouched("title", true)
                              }
                              error={props.touched.title && props.errors.title}
                            />

                            {/* <DefaultTextarea
                              placeholder={t('Quest_Description')}
                              label={t('What_is_your_Quest_About')}
                              name={"description"}
                              type={"description"}
                              value={props.values.description}
                              onChange={props.handleChange("description")}
                              onBlur={() =>
                                props.setFieldTouched("description", true)
                              }
                              error={
                                props.touched.description &&
                                props.errors.description
                              }
                            /> */}

                            <DefaultEditor
                              placeholder={t('Quest_Description')}
                              label={t('What_is_your_Quest_About')}
                              name={"description"}
                              type={"description"}
                              value={props.values.description}
                              onChange={props.handleChange("description")}
                              onBlur={() =>
                                props.setFieldTouched("description", true)
                              }
                              error={
                                props.touched.description &&
                                props.errors.description
                              }
                            />
                          </form>
                        )}
                      </Formik>
                    )}

                    {/* Step 1 */}

                    {/* Step 2 */}
                    {step == 2 && (
                      <Formik
                        initialValues={{ email: "", password: "" }}
                        // validate={validateLogin}
                        onSubmit={(values, { setSubmitting }) => {
                          setSubmitting(false);
                        }}
                      >
                        {(props) => (
                          <form>
                            <div className="form-group">
                              <label>
                               {t('How_urgent_you_want_your_quest_to_be_solved')}
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
                                        checked={questType == 1 ? true : false}
                                      />
                                      <label
                                        className="custom-control-label"
                                        onClick={() => {
                                          setquestType(1);
                                        }}
                                      >
                                        <div className="timeline-items">
                                          <span className="credits-blk">
                                            +2 {t('Credits')}
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
                                          <h4>{t('Urgent')}</h4>
                                          <p>
                                            Lorem Ipsum is simply dummy text of
                                            the printing and typesetting
                                            industry.
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
                                        checked={questType == 2 ? true : false}
                                      />
                                      <label
                                        className="custom-control-label"
                                        onClick={() => {
                                          setquestType(2);
                                        }}
                                      >
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
                                          <h4>{t('Standard')}</h4>
                                          <p>
                                            Lorem Ipsum is simply dummy text of
                                            the printing and typesetting
                                            industry.
                                          </p>
                                        </div>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        )}
                      </Formik>
                    )}

                    {/* Step 2 */}

                    {/* Step 3 */}
                    {step == 3 && (
                      <Formik
                        initialValues={{ email: "", password: "" }}
                        // validate={validateLogin}
                        onSubmit={(values, { setSubmitting }) => {
                          setSubmitting(false);
                        }}
                      >
                        {(props) => (
                          <form>
                            <div className="form-group">
                              <label>
                               {t('Would_you_like_to_add_any_attachments')}
                              </label>
                              <div className="custom-attachments-block">
                                <ul>
                                  <li>
                                    <div className="custom-file-attachments">
                                      <input
                                        type="file"
                                        className="custom-file-input"
                                        id="validatedCustomFile"
                                        accept="image/*,application/pdf,application/doc,application/docx"
                                        // @ts-ignore
                                        onChange={(e) => addDocument(e.target.files[0] || null) }
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
                                        <h4>{t('Select_Files')}</h4>
                                      </label>
                                    </div>
                                  </li>

                                  {documentShowList.map((ele: any, index) => {
                                    return (
                                      <>
                                        <li>
                                          <div className="custom-uploaded-files">
                                            <button type="button" className="file-close" onClick={()=>deleteImage(index)}>
                                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>
                                            </button>
                                            {/* <img src={ele} /> */}
                                             
                                            <DefaultDocument src={ele} type={documentList[index]['type']} />
                                          </div>
                                        </li>
                                      </>
                                    );
                                  })}
                                </ul>
                              </div>
                            </div>
                          </form>
                        )}
                      </Formik>
                    )}

                    {/* Step 3 */}

                    {/* Step 4 */}
                    {step == 4 && (
                      <Formik
                        initialValues={{ email: "", password: "" }}
                        // validate={validateLogin}
                        onSubmit={(values, { setSubmitting }) => {
                          setSubmitting(false);
                        }}
                      >
                        {(props) => (
                          <form>
                            <div className="form-group">
                              <label>
                                {t('Would_you_like_to_schedule_a_live_session')} ( +1
                                {t('Credits')} )
                              </label>
                            </div>
                            <div className="session-schedule-block">
                              <div className="session-schedule-actions mb-4">
                                <button
                                  type="button"
                                  className={`btn common-btn ${
                                    isLiveSession ? "" : "grey"
                                  }`}
                                  onClick={() => setisLiveSession(true)}
                                >
                                  {t('Yes')}
                                </button>
                                <button
                                  type="button"
                                  className={`btn common-btn ${
                                    isLiveSession ? "grey" : ""
                                  }`}
                                  onClick={() => setisLiveSession(false)}
                                >
                                 {t('No')}
                                </button>
                              </div>

                              {isLiveSession && (
                                <>
                                  <DatePicker
                                    selected={liveSession}
                                    showTimeSelect
                                    onChange={(date) => setliveSession(date)}
                                    className="form-control"
                                    minDate={new Date()}
                                    dateFormat="MMMM-dd-yyyy h:mm aa"
                                  />
                                </>
                              )}

                              {/* <div
                                className="calendar-wrapper"
                                id="calendar-wrapper"
                              ></div>
                              <div className="time-slot-list mb-5">
                                <label className="custom-label">
                                  Time Slot
                                </label>
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
                              </div> */}
                            </div>
                          </form>
                        )}
                      </Formik>
                    )}

                    {/* Step 4 */}

                    {/* Step 5 */}
                    {step == 5 && (
                      <Formik
                        initialValues={{ email: "", password: "" }}
                        // validate={validateLogin}
                        onSubmit={(values, { setSubmitting }) => {
                          setSubmitting(false);
                        }}
                      >
                        {(props) => (
                          <form>
                            <div className="quest-detail-preview-blk">
                              <div className="quest-detail-preview-head">
                                <h4>{stepOneData?.title}</h4>
                                {/* <p>{stepOneData?.description}</p> */}

                                <div dangerouslySetInnerHTML={{ __html: stepOneData?.description }} />

                              </div>
                              <div className="quest-detail-priorities">
                                <h4>
                                  {questType == 1 ? "Urgent" : "Standard"}
                                </h4>
                                {questType == 2 && (
                                  <p>
                                  {t('Within_5_days_we_will_investigate_your_issue')}
                                  </p>
                                )}
                              </div>
                              {/* <div className="quest-detail-preview-files"> */}
                                <h4>{t('Attachments_files')}</h4>
                                <div className="row">
                                {/* <ul> */}
                                  {documentShowList.map((ele: any, index) => {
                                    return (
                                      <>
                                        {/* <li> */}
                                          {/* <img src="images/pdf-icon.svg" /> */}
                                          <DefaultDocument src={ele} type={documentList[index]['type']} />
                                        {/* </li> */}
                                      </>
                                    );
                                  })}
                                {/* </ul> */}
                                </div>
                                {/* <ul>
                                  <li>
                                    <img src="images/pdf-icon.svg" />
                                  </li>
                                  <li>
                                    <img src="images/word-icon.svg" />
                                  </li>
                                </ul> */}
                              {/* </div> */}
                              {isLiveSession && (
                                <div className="quest-detail-preview-sessions">
                                  <h4>{t('Live_Session')}</h4>
                                  <p>
                                    {moment(liveSession).format(
                                      "MMMM-dd-yyyy h:mm a"
                                    )}
                                  </p>
                                </div>
                              )}
                            </div>
                          </form>
                        )}
                      </Formik>
                    )}

                    {/* Step 5 */}
                  </div>
                  <div className="quest-steps-footer">
                    <button
                      type="button"
                      className="btn common-btn trans-btn"
                      onClick={goBack}
                    >
                      {t('BACK')}
                    </button>
                    <button
                      type="button"
                      className="btn common-btn"
                      style={{ marginLeft: "10px" }}
                      // onClick={goFront}
                      onClick={() => {
                        if (step == 1) {
                          // @ts-ignore
                          formRef1.current.submitForm();
                          // @ts-ignore
                          if (
                            // @ts-ignore
                            formRef1.current.isValid &&
                            // @ts-ignore
                            formRef1.current.values.title.trim() &&
                            // @ts-ignore
                            formRef1.current.values.description.trim()
                          ) {
                            // @ts-ignore
                            setstepOneData(formRef1.current.values);
                            setStep(2);
                          } else {
                            alert("form invalid");
                          }
                        } else if (step == 2) {
                          if (!questType) {
                            alert("Please select quest type");
                          } else {
                            setStep(3);
                          }
                        } else if (step == 3) {
                          setStep(4);
                        } else if (step == 4) {
                          if (isLiveSession) {
                            if (liveSession) {
                              setStep(5);
                            }
                          } else {
                            setStep(5);
                          }
                        } else if (step == 5) {
                          submitQuest();
                        }
                      }}
                    >
                      {step == 5 ? t('Submit') : t('SUBMIT')}
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

//@ts-ignore
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default CreateNewRequest1;
