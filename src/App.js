// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import React from "react";
import { useState, useEffect } from "react";

export default function App() {
  const [currency, setCurrency] = useState(10);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConvertedValue] = useState();
  const [loading, setIsloading] = useState(false);

  useEffect(
    function () {
      async function request() {
        setIsloading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${currency}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        console.log(data.rates[toCur]);
        setConvertedValue(Number(data.rates[toCur]));
        setIsloading(false);
      }
      if (fromCur === toCur) {
        setConvertedValue(currency);
      } else {
        request();
      }
    },
    [currency, fromCur, toCur]
  );
  return (
    <div>
      <input
        type="text"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        disabled={loading}
      />
      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={loading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={loading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {currency ? (
        <p>
          {converted}
          {toCur}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
