import React, { useState } from "react";

const buttons = [
  { label: "7" },
  { label: "8" },
  { label: "9" },
  { label: "/", type: "operator" },
  { label: "4" },
  { label: "5" },
  { label: "6" },
  { label: "*", type: "operator" },
  { label: "1" },
  { label: "2" },
  { label: "3" },
  { label: "-", type: "operator" },
  { label: "0" },
  { label: "." },
  { label: "=", type: "operator" },
  { label: "+", type: "operator" },
];

export default function Calculator() {
  const [result, setResult] = useState("");

  const onClick = (label) => {
    if (label === "=") {
      setResult(eval(result).toString());
    } else {
      setResult(result + label);
    }
  };

  return (
    <div style={{ width: 200 }}>
      <h1>Calculator</h1>
      <input
        type="text"
        style={{ width: "100%", height: 40 }}
        readOnly={true}
        value={result}
      />
      <div
        style={{ display: "grid", gridTemplateColumns: "auto auto auto auto" }}
      >
        {buttons.map(({ label, type }) => (
          <button
            style={{
              height: 40,
              border: "none",
              background: type === "operator" ? "orange" : "darkgray",
            }}
            key={label}
            onClick={() => onClick(label)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
