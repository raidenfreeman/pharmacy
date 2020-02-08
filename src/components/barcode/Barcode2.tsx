import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

export default function BarcodeF({ value }: { value: string }) {
  const svgRef: any = useRef();
  useEffect(() => {
    JsBarcode(svgRef.current, value);
  });
  return <svg ref={svgRef} />;
}
