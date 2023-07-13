import "./BuyButton.css";
import * as React from "react";
import { getAuth } from "firebase/auth";

const BuyButtonComponent = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    console.log(user.uid);
    console.log(user.email);
  }

  // Paste the stripe-buy-button snippet in your React component
  return (
    <>
      <div className="text-center">
        <stripe-buy-button
          client-reference-id={user && user.uid}
          customer-email={user && user.email}
          buy-button-id="buy_btn_1NHv7sEpxgMDK8rjcKJIJ1mV"
          publishable-key="pk_test_51LOHwtEpxgMDK8rjzvhZ8jLEYWt1impUZLfiml6le8xt5l1ggcJje0lgAgHlXpB6GEP7hULJOSUNCoFy1LzeMuKN001c7HP5jj"
        ></stripe-buy-button>
      </div>
    </>
  );
};

export default BuyButtonComponent;
