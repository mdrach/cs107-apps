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

  // TODO limit inputs to binary
  render() {
    return (
      <div>
        <h2>Floating Point</h2>
        <div>
          <input 
            type="text" 
            value={this.state.sign} 
            onChange={(e) => this.setState({sign: parseInt(e.target.value, 2)})}
          />
          <input 
            type="text" 
            value={this.getExp()} 
            onChange={(e) => this.setState({exp: parseInt(e.target.value, 2)})}
          />
          <input 
            type="text" 
            value={this.getMantissa()} 
            onChange={(e) => this.setState({mantissa: parseInt(e.target.value, 2)})} 
          />
        </div>
        <div>
          (-1)^sign x 2^(exponent-127) x 1.mantissa
        </div>
        <div>
          {this.generateInteractiveView()}
        </div>
      </div>
    );
  }
}


export default FloatingPoint;
