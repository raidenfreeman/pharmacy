import React from "react";
import JsBarcode from "jsbarcode";

// const getDOMNode = (ref: any) => ref;

export class Barcode extends React.Component<{ value: string }> {
  private myRef: React.RefObject<SVGSVGElement>;

  constructor(props: any) {
    super(props);
    this.update = this.update.bind(this);
    this.myRef = React.createRef();
    debugger
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  update() {
    const renderElement = this.myRef.current;
    debugger
    // @ts-ignore
    new JsBarcode(renderElement, this.props.value);
  }

  render() {
    // if (this.props.renderer === "svg") {
    //   return <svg ref="renderElement" />;
    // } else if (this.props.renderer === "canvas") {
    //   return <canvas ref="renderElement" />;
    // } else if (this.props.renderer === "img") {
    return <svg ref={this.myRef} />;
    // }
  }
}
