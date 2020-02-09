import React, { useEffect, useRef } from "react";
import JsBarcode, { Options } from "jsbarcode";

export default function Barcode({
  value,
  options
}: {
  value: string;
  options?: Options;
}) {
  const svgRef: any = useRef();
  let error;
  useEffect(() => {
    try {
      JsBarcode(svgRef.current, value, options);
      error = false;
    } catch (e) {
      error = true;
    }
  });
  return error ? <div>error</div> : <svg data-testid="gg" ref={svgRef} />;
}
