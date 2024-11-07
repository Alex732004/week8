import React, { useEffect, useState } from "react";
import Input from "@/components/Input";

export default function Converter() {
  const [celsius, setCelsius] = useState(0);
  const [fahrenheit, setFahrenheit] = useState(32);

  useEffect(() => {
    console.log("UseEffect is called");
  }, []);
  console.log("I' called");

  const handleChange = (isCelsius) => (value) => {
    if (isCelsius) {
      setCelsius(value);
      setFahrenheit((value * 9) / 5 + 32);
    } else {
      setFahrenheit(value);
      setCelsius(((value - 32) * 5) / 9);
    }
  };

  return (
    <div>
      <h1>Converter</h1>
      <Input title="Celcius" value={celsius} onChange={handleChange(true)} />
      <br />
      <Input
        title="Fahrenheit"
        value={fahrenheit}
        onChange={handleChange(false)}
      />
    </div>
  );
}