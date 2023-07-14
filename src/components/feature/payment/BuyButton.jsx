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
          buy-button-id="buy_btn_1NTuVWJToJkpvaJvIA9AmI39"
          publishable-key="pk_live_51MtkMPJToJkpvaJvlAtY6rPCnhvLrxfb2AhDR9RGAdrmly6blmDimRCeaGsUiML3zQUeZ54MvEtGi3Qjldaei8qo00pFoQKNue"
        ></stripe-buy-button>
      </div>
    </>
  );
};

export default BuyButtonComponent;
