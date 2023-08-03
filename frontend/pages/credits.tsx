import type { NextPage } from "next";
import Dashboard from "./common/dashboard";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { get, post } from "../common/utils/api";
import { Endpoint } from "../common/utils/endpoints";
import { ApiResponse } from "../common/utils/interface";
import { ShowToast } from "../common/component/common";
import { DefaultInput } from "../common/component/defaultinput";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// Paypal
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

// Stripe
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Alert } from "react-bootstrap";

const stripePromise = loadStripe(
  "pk_test_51Hqz01INbYYQLVlhrDuT5I66Il9smwMyA0CqhetkBXQPRRrjeH6JWHJQlwVbBljkgvfdSVZinpWAdinwuVw1WExe00u3pgLjl1"
);

const options = {
  style: {
    base: {
      color: "#424770",
      letterSpacing: "0.025em",
      fontFamily: "Source Code Pro, monospace",
      "::placeholder": {
        color: "#aab7c4",
      },
      fontSize: "18px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Credits: NextPage = () => {
  const [data, setData] = useState<any>({});
  const [amount, setamount] = useState<any>("");
  const { t } = useTranslation();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    get(Endpoint.credits).then((data) => handleResponse(data));
  };

  const handleResponse = (data: ApiResponse) => {
    setData(data?.data);
    if (!data.status) {
      ShowToast(data.message, data.status);
    }
  };

  const topUp = () => {
    if (isNaN(amount)) {
      alert("Please enter a valid value");
    } else {
      post(Endpoint.topUp, { amount: Number(amount) }).then((data) =>
        handleTopUp(data)
      );
    }
  };

  const handleTopUp = (data: ApiResponse) => {
    setamount("");
    getProfile();
    ShowToast(data.message, data.status);
  };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner, money }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          // amount: money,
        },
      });
    }, [currency, money]);

    return (
      <>
        {/* {(money && isPending) && <div className="spinner" >Loading</div>} */}
        <PayPalButtons
          disabled={false}
          // forceReRender={[money, currency]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: money,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function () {
              // Your code here after capture the order
              if (data.payerID && data.orderID) {
                topUp();
              }
            });
          }}
        />
      </>
    );
  };

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const createOptions = () => {
      return {
        style: {
          base: {
            fontSize: "10px",
            color: "#424770",
            letterSpacing: "0.025em",
            fontFamily: "Source Code Pro, monospace",
            "::placeholder": {
              color: "#aab7c4",
            },
          },
          invalid: {
            color: "#9e2146",
          },
        },
      };
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (elements == null) {
        return alert("Something Went Wrong");
      }
      // @ts-ignore
      const { error, token } = await stripe?.createToken( elements.getElement(CardElement) );

      if (token) {
        if (isNaN(amount)) {
          alert("Please enter a valid value");
        } else {
          post(Endpoint.stripePay, {
            amount: Number(amount),
            token: token.id,
          }).then((data) => handleStripeTopUP(data));
        }
      } else {
        return alert(error.message);
      }
    };

    const handleStripeTopUP = (data: ApiResponse) => {
      setamount("");
      getProfile();
      ShowToast(data.message, data.status);
    };

    return (
      <form onSubmit={handleSubmit}>
        <CardElement
          options={options}
          onReady={() => {
            console.log("CardElement [ready]");
          }}
          onChange={(event) => {
            console.log("CardElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardElement [blur]");
          }}
          onFocus={() => {
            console.log("CardElement [focus]");
          }}
        />

        <button
          type="submit"
          className="btn common-btn mb-3"
          style={{ marginTop: "15px" }}
          disabled={!stripe || !elements}
        >
          Pay
        </button>
      </form>
    );
  };

  return (
    <>
      <div className="wrapper-inner-dashboard">
        <section className="dashboard-info-sec">
          <div className="container">
            <div className="dashboard-content-main-block">
              <Dashboard />
              <div className="db-main-content-center">
                <div className="">
                  <img src="images/main-top-img.png" />
                </div>
              </div>

              <div className="db-main-content-right">
                <div className="db-credits-info-blk">
                  <div className="db-credits-score-board">
                    <h4>{t("Your_Credits")}</h4>
                    <h2>{Number(data?.wallet).toFixed(2)}</h2>
                  </div>
                  {/* <p>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don’t
                    look even slightly believable.
                  </p> */}

                  <DefaultInput
                    placeholder={t("amount")}
                    name={"amount"}
                    type={"amount"}
                    value={amount}
                    maxLength={8}
                    onChange={(e) => setamount(e.target.value)}
                  />

                  {/* <button
                    type="button"
                    className="btn common-btn"
                    onClick={topUp}
                  >
                    {t("Top_Up")}
                  </button> */}

                  <PayPalScriptProvider
                    options={{
                      "client-id": "test",
                      components: "buttons",
                      currency: "USD",
                    }}
                  >
                    <ButtonWrapper
                      currency={"USD"}
                      money={amount}
                      showSpinner={false}
                    />
                  </PayPalScriptProvider>

                  <h5>-----OR-----</h5>

                  <Elements stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>
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
export default Credits;
