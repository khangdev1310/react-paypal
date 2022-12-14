import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";

function App() {
  const [paidFor, setPaidFor] = React.useState(false);

  const amount = "5000";
  const currency = "USD";
  const handleApprove = (orderId) => {
    console.log("orderId", orderId);
    setPaidFor(true);
  };
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AXLazjLNxLRT-5M12Tq6uYUvJBxzvDDKTaLm6Os1FyH1O7odyxXTJBCccEohff8cUMk7MzmshMKvurmP",
      }}
    >
      <div className="test">
        <PayPalButtons
          style={{ layout: "vertical", shape: "pill" }}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={async (data, actions) => {
            const order = await actions.order.capture();
            console.log("order", order);
            handleApprove(data.orderID);
          }}
          onError={(err) => {
            console.log("err", err);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
