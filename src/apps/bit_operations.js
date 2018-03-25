import React from "react";

class BitOperations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val1: 6,
      val2: 3,
      operation: "&"
    };
  }

  handleChange = (e, base) => {
    let val = e.target.value;

    // Error check
    if (val === "")
      val = 0;
    if ((base === 16 && !/[0-9A-F]+/.test(val)) ||
        (base === 2 && !/[0-1]+/.test(val)))
      return;
    

    if (e.target.name === "val1") 
      this.setState({val1: parseInt(val, base)});
    else if (e.target.name === "val2") 
      this.setState({val2: parseInt(val, base)});
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
    
    // TODO: make inputs accept hex / binary only
    return (
      <div>
        <div>
          Value 1 Hex: 0x<input 
            type="text" 
            name="val1" 
            value={this.state.val1.toString(16)} 
            onChange={(e) => this.handleChange(e, 16)} 
          />
          Value 2 Hex: 0x<input 
            type="text" 
            name="val2" 
            value={this.state.val2.toString(16)} 
            onChange={(e) => this.handleChange(e, 16)} 
          />
        </div>
        <div>
          Value 1 Binary: 0b<input 
            type="text" 
            name="val1" 
            value={this.state.val1.toString(2)} 
            onChange={(e) => this.handleChange(e, 2)} 
          />
          Value 2 Binary: 0b<input 
            type="text" 
            name="val2" 
            value={this.state.val2.toString(2)} 
            onChange={(e) => this.handleChange(e, 2)} 
          />
        </div>
        <p>Hex Output: 0x{result.toString(16)}</p>
        <p>Bin Output: 0b{result.toString(2)}</p>
      </div>
    );
  }
}


export default BitOperations;
