import React, { useEffect, useRef, useState } from "react";
import JsBarcode, { Options } from "jsbarcode";

export default function Barcode({
  value,
  options
}: {
  value: string;
  options?: Options;
}) {
  const svgRef: any = useRef();
  const [err, setErr] = useState(false);
  useEffect(() => {
    try {
      JsBarcode(svgRef.current, value, options);
      setErr(false);
    } catch (e) {
      setErr(true);
    }
  }, [value, options]);
  return (
    <>
      {err && <div>Άκυρο barcode: {value}</div>}
      <svg
        style={{ display: err ? "none" : undefined }}
        data-testid="gg"
        ref={svgRef}
      />
    </>
  );
}
