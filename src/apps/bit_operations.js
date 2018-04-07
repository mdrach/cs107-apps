import React from "react";
import ValUtils from "../helpers/valUtils"


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
    let inputAsInt = ValUtils.fromString(e.target.value, this.state.val1, base);
    this.setState({val1: inputAsInt});
  }

  handleChangeVal2 = (e, base) => {
    let inputAsInt = ValUtils.fromString(e.target.value, this.state.val2, base);
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


    let operators = [ { key: '&', value: '&', text: '&' },
      { key: '|', value: '|', text: '|' }, 
      { key: '^', value: '^', text: '^' }
    ];
    let hexInput = (
      <div className="inputModule">
        <h2 className="appletTitle">
          Hex:
        </h2>
        <div className="valuesAndSign">
          <div className="sign">
            <button>&</button>
          </div>
          <div className="hexInputModule">
            <div>
              <div>
                <input
                  className="numericInput"
                  type="text"
                  value={ValUtils.toHexString(this.state.val1)}
                  onChange={(e) => this.handleChangeVal1(e, 16)}
                />
              </div>
              <div>
                <input
                  className="numericInput"
                  type="text"
                  value={ValUtils.toHexString(this.state.val2)}
                  onChange={(e) => this.handleChangeVal2(e, 16)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="result">
          {"0x" + result.toString(16)}
        </div>
      </div>
    );

    let numDigits = Math.max(
      this.state.val1.toString(2).length,
      this.state.val2.toString(2).length
    );  // add zeros to make both binary inputs same length

    let binaryInput = (
      <div className="inputModule binaryInputModule">
        <div>
          Binary:
        </div>
        <div>
          <div>
            <input
              className="numericInput"
              type="text"
              value={ValUtils.toBinaryString(this.state.val1)}
              onChange={(e) => this.handleChangeVal1(e, 2)}
            />
          </div>
          <div>
            <input
              className="numericInput"
              type="text"
              value={ValUtils.toBinaryString(this.state.val2)}
              onChange={(e) => this.handleChangeVal2(e, 2)}
            />
          </div>
          <div className="result">
            {ValUtils.toBinaryString(result, numDigits)}
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
