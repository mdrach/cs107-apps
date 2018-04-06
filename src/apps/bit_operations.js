import React from "react";
// import ContentEditable from "react-contenteditable";


class BitOperations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val1: 6,
      val2: 3,
      operation: "&"
    };
  }

	convertInput = (val, base) => {
    if (val.length >= 2 && (val[1].toLowerCase() === "b" || 
        val[1].toLowerCase() === "x"))   // TODO make this less hacky
      val = val.substring(2); 


    // Error check
    if (val === "")
      val = 0;
    if ((base === 16 && !/^[0-9a-fA-F]+$/.test(val)) ||
        (base === 2 && !/^[0-1]+$/.test(val)))
      return null;

		return parseInt(val, base);
	}

  handleChangeVal1 = (e, base) => {
		let inputAsInt = this.convertInput(e.target.value, base);
		if (inputAsInt == null) return;
		this.setState({val1: inputAsInt});
  }

  handleChangeVal2 = (e, base) => {
		let inputAsInt = this.convertInput(e.target.value, base);
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
								value={"0x" + this.state.val1.toString(16)}
								onChange={(e) => this.handleChangeVal1(e, 16)}
							/>
            </div>
            <div>
							<input
								type="text"
								value={"0x" + this.state.val2.toString(16)}
								onChange={(e) => this.handleChangeVal2(e, 16)}
							/>
            </div>
            <div className="result">
            {"0x" + result.toString(16)}
            </div>
          </div>
      </div>
    );

    let binaryInput = (
      <div className="inputModule binaryInputModule">
        <div>
          Binary:
        </div>
          <div>
            <div>
							<input
								type="text"
								value={"0b" + this.state.val1.toString(2)}
								onChange={(e) => this.handleChangeVal1(e, 2)}
							/>
            </div>
            <div>
							<input
								type="text"
								value={"0b" + this.state.val2.toString(2)}
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
