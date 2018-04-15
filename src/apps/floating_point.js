import React from "react";

class FloatingPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sign: 1,
      exp: -5 + 127,
      mantissa: 0b10010000000000000000000 
    };
  }

  // 0-padded binary exponent representation
  getExp = () => {
    let val = this.state.exp.toString(2);
    return "00000000".substr(val.length) + val;
  }

  // 0-padded binary mantissa representation
  getMantissa = () => {
    let val = this.state.mantissa.toString(2);
    let val2= "00000000000000000000000".substr(val.length) + val;
    return val2;
  }

  getFloatInBinary = () => {
    let val = "1" + this.getMantissa();
    let toShift = this.state.exp - 127;
    if (toShift >= 23) {
      let trailingZeros = toShift - (val.length - 1);
      val = val + "0".repeat(trailingZeros) + ".0";
    } else if (toShift <= -1) {
      let leadingZeros = Math.max(Math.abs(toShift + 1), 0);
      val = "0." + "0".repeat(leadingZeros) + val;
    } else {
      val = val.substr(0, toShift + 1) + "." + val.substr(toShift + 1);
    }
    return val;
  }

  // TODO allow adding 0s at beginning and end of number
  generateInteractiveView = () => {
    let binaryFloat = this.getFloatInBinary();
    let passedDecimal = false;


    let mapper = (ch, ix) => {
      let name = (this.state.exp < 0) ? 
        this.state.exp + ix :
        127 + ix;
      if (passedDecimal) 
        name = name - 1;
      if (ch === ".") {
        passedDecimal = true;
        name = "decimal";
      }
      return (
        <button key={name} name={name} onClick={this.handleDecimalClick}>
          {ch} 
        </button>
      );
    }

    let sign = (
      <button key="sign" name="sign" onClick={() => this.setState({sign: this.state.sign ^ 1})}>
        <span>{this.state.sign === 1 ? "-" : ""}&nbsp;</span>
      </button>
    );

    return (
      <div>
        {sign}
        {binaryFloat.split("").map(mapper)}
      </div>
    );
  }

  handleDecimalClick = (e) => {
    let newExp = parseInt(e.target.name, 10);
    if (!Number.isInteger(newExp)) return;
    this.setState({exp: newExp});
  }

  handleBinaryUpdate = (e) => {
    let val = e.target.val + Array(32).join("0").substring(0, 32); // TODO make real
    let newSign = parseInt(val[0], 2);
    let newExp = parseInt(val.substring(1,9), 2);
    let newMantissa = parseInt(val.substring(9), 2);
    this.setState({
      sign: newSign,
      exp: newExp,
      mantissa: newMantissa
    });
  }

  // TODO limit inputs to binary
  render() {
    return (
      <div className="app-wrapper">
        <div className="app-title">Floating Point Numbers</div>
        <div className="app-description">
          32-bit floating point numbers have three parts. <br/>
          The <em>mantissa</em> (rightmost 23 bits) contains the digits of the number.  <br />
          The <em>exponent</em> (middle 8 bits) determines the location of the decimal point within the digits of the mantissa.  <br/>
          Finally, the <em>sign bit</em> specifies whether the number is positive or negative.
        </div>
        <div className="app-input-modules">
          <div>
            <input 
              type="text" 
              value={this.state.sign} 
              onChange={(e) => this.handleBinaryUpdate(e)}
            />
          </div>

          <div>
            (-1)^sign x 2^(exponent-127) x 1.mantissa
          </div>

          <div>
            {this.generateInteractiveView()}
          </div>
        </div>

      </div>
    );
  }
}


export default FloatingPoint;
