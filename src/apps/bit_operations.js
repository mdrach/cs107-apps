import React from "react";
import ValUtils from "../helpers/valUtils"
// import ContentEditable from "react-contenteditable";


class BitOperations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val1: 1,
      val2: 3,
      operation: "&",
    };
  }

  handleChangeVal1 = (e, base) => {
    let inputAsInt = ValUtils.fromString(e.target.value, base);
    if (inputAsInt == null) return;
    this.setState({val1: inputAsInt});
  }

  handleChangeVal2 = (e, base) => {
    let inputAsInt = ValUtils.fromString(e.target.value, base);
    if (inputAsInt == null) return;
    this.setState({val2: inputAsInt});
  }

  evaluateResult = () => {
    let val1 = this.state.val1;
    let val2 = this.state.val2;
    let op = this.state.operation;

    if (op === "&") return val1 & val2;
    if (op === "|") return val1 | val2;
    if (op === "^") return val1 ^ val2;
    throw Error("Invalid bitwise operation");
  }

  render() {
    let result = this.evaluateResult();

    let hexInput = (
      <div className="inputModule hexInputModule">
        <div>
          Hex:
        </div>
        <div>
          <div>
            <input
              type="text"
              value={ValUtils.toHexString(this.state.val1)}
              onChange={(e) => this.handleChangeVal1(e, 16)}
            />
          </div>
          <div>
            <input
              type="text"
              value={ValUtils.toHexString(this.state.val2)}
              onChange={(e) => this.handleChangeVal2(e, 16)}
            />
          </div>
          <div className="result">
            {"0x" + result.toString(16)}
          </div>
        </div>
      </div>
    );

    let numDigits = ValUtils.maxNumBinaryDigits(  
      this.state.val1, 
      this.state.val2
    )  // add zeros to make both binary inputs same length

    let binaryInput = (
      <div className="inputModule binaryInputModule">
        <div>
          Binary:
        </div>
        <div>
          <div>
            <input
              type="text"
              value={ValUtils.toBinaryString(this.state.val1, numDigits)}
              onChange={(e) => this.handleChangeVal1(e, 2)}
            />
          </div>
          <div>
            <input
              type="text"
              value={ValUtils.toBinaryString(this.state.val2, numDigits)}
              onChange={(e) => this.handleChangeVal2(e, 2)}
            />
          </div>
          <div className="result">
            {"0b" + result.toString(2)}
          </div>
        </div>
      </div>
    );


    // TODO: make inputs accept hex / binary only
    return (
      <div className="applet-wrapper">
        <h2 className="applet-title">Bit Operations</h2>
        <div className="applet">
          {hexInput}
          {binaryInput}
        </div>
        <div>
        </div>
      </div>
    );
  }
}


export default BitOperations;
