// PaymentForm.js
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import QRCode from "qrcode.react";
import "./PaymentForm.css"; // Importing our custom CSS

/**
 * Card Number:    4242 4242 4242 4242
    Expiration Date: 12 / 34
    CVC:             123
    ZIP:             90210
 */
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [amount, setAmount] = useState("");
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    if (event.target.value === "qr_code") {
      // Generate QR code value when QR code payment is selected
      setQrCodeValue(`amount:${amount}`);
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Generate a mock order number for demonstration purposes
    const mockOrderNumber = `ORD-${Math.floor(Math.random() * 1000000)}`;
    setOrderNumber(mockOrderNumber);

    if (paymentMethod === "credit_card" && stripe && elements) {
      const cardElement = elements.getElement(CardElement);
      // Process payment via credit card using Stripe

      // Create a Payment Method
      const { paymentMethod, error: stripeError } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });
      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
      } else {
        // Send the paymentMethod.id to your server for processing
        const response = await fetch("http://localhost:4000/process-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount: parseInt(amount) }),
        });
        const paymentResult = await response.json();

        if (paymentResult.success) {
          // Payment succeeded
          alert("Payment successful!");
        } else {
          // Payment failed
          setError(paymentResult.message);
        }
        setProcessing(false);
      }
    } else if (paymentMethod === "qr_code") {
      // Display QR code for payment
      setQrCodeValue(`amount:${amount};order_number:${mockOrderNumber}`);
    }
    // For cash on delivery, the order number has been generated above
  };

  return (
    <div className="payment-form-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-row">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            className="amount-input"
          />
        </div>
        <div className="form-row">
          <label>
            <input
              type="radio"
              value="cash_on_delivery"
              checked={paymentMethod === "cash_on_delivery"}
              onChange={handlePaymentMethodChange}
            />
            Cash on Delivery
          </label>
        </div>
        <div className="form-row">
          <label>
            <input
              type="radio"
              value="qr_code"
              checked={paymentMethod === "qr_code"}
              onChange={handlePaymentMethodChange}
            />
            Generate QR Code
          </label>
          {paymentMethod === "qr_code" && amount && (
            <QRCode
              value={qrCodeValue}
              size={128}
              level={"H"}
              includeMargin={true}
              className="qr-code"
            />
          )}
        </div>
        <div className="form-row">
          <label>
            <input
              type="radio"
              value="credit_card"
              checked={paymentMethod === "credit_card"}
              onChange={handlePaymentMethodChange}
            />
            Credit Card
          </label>
          {paymentMethod === "credit_card" && (
            <CardElement className="card-element" />
          )}
        </div>
        <button type="submit" className="submit-btn" disabled={!amount}>
          Pay
        </button>
      </form>
      <br />
      {orderNumber && (
        <div className="order-number">Your order number: {orderNumber}</div>
      )}
      {paymentMethod === "qr_code" && qrCodeValue && (
        <QRCode
          value={qrCodeValue}
          size={128}
          level={"H"}
          includeMargin={true}
          className="qr-code"
        />
      )}
    </div>
  );
};

export default PaymentForm;
