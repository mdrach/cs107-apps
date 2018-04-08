import React from "react";
import {BinaryUtils, HexUtils} from "../helpers/conversionUtils"
import Select from 'react-select';

class BitOperations extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			val1: 1,
			val2: 3,
			operator: "&",
		};
	}

	handleChange = (e, base, whichVal) => {
		let val = e.target.value;
		if (val === "") 
			return null;

		let inputAsInt = base === 16 ?
			HexUtils.fromString(val) :
			BinaryUtils.fromString(val);

		if (isNaN(inputAsInt))
			return;


		if (whichVal === 1) 
			this.setState({val1: inputAsInt});
		else 
			this.setState({val2: inputAsInt});
	}


	evaluateResult = () => {
		let val1 = this.state.val1;
		let val2 = this.state.val2;
		let op = this.state.operator;

		if (op === "&") return val1 & val2;
		if (op === "|") return val1 | val2;
		if (op === "^") return val1 ^ val2;
		throw Error("Invalid bitwise operator");
	}

	// renderOption = (o) => {
		// return (
			// <div style={{fontSize: "45px"	}}>{o.label}</div>
		// );
	// }

	// renderValue = (v) => {
		// return (
			// <div style={{fontSize: "45px"	}}>{v.label}</div>
		// );
	// }

	render() {
		let result = this.evaluateResult();

		let operatorDropdown = (
			// <div>
				// <select value={this.state.operator} onChange={(e) => this.setState({operator: e.target.value})} name="text">
					// <option value="&">&</option> 
					// <option value="|">|</option>
					// <option value="^">^</option>
				// </select>
			// </div>


			<Select
				name="form-field-name"
				valueRenderer={(v) => <div style={{color: "#bf3131", padding: "3px"}}>{v.label}</div>}
				arrowRenderer={() => ""}
				style={{height: "40px", width: "60px", textAlign: "center"}}
				searchable={false}
				value={this.state.operator}
				clearable={false}
				onChange={(s) => this.setState({operator: s.value})}
				options={[
					{ value: '&', label: '&' },
					{ value: '|', label: '|' },
					{ value: '^', label: '^' },
				]}
			/>     

		);

		let hexInput = (
			<div className="inputModule">
				<div className="moduleTitle">
					Hex:
				</div>
				<div className="valuesAndOperator">
					<div className="operator">
						{operatorDropdown}
					</div>
					<div className="hexInputModule">
						<div>
							<div>
								<input
									className="numericInput"
									type="text"
									value={HexUtils.toString(this.state.val1)}
									onChange={(e) => this.handleChange(e, 16, 1)}
								/>
							</div>
							<div>
								<input
									className="numericInput"
									type="text"
									value={HexUtils.toString(this.state.val2)}
									onChange={(e) => this.handleChange(e, 16, 2)}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="result">
					{HexUtils.toString(result)}
				</div>
			</div>
		);

		let numDigits = Math.max(
			this.state.val1 ? this.state.val1.toString(2).length : 0,
			this.state.val2 ? this.state.val2.toString(2).length : 0
		);  // add zeros to make both binary inputs same length

		let binaryInput = (
			<div className="inputModule">
				<div className="moduleTitle">
					Binary:
				</div>
				<div className="valuesAndOperator">
					<div className="operator">
						{this.state.operator}
					</div>
					<div className="binaryInputModule">
						<div>
							<div>
								<input
									className="numericInput"
									type="text"
									value={BinaryUtils.toString(this.state.val1)}
									onChange={(e) => this.handleChange(e, 2, 1)}
								/>
							</div>
							<div>
								<input
									className="numericInput"
									type="text"
									value={BinaryUtils.toString(this.state.val2)}
									onChange={(e) => this.handleChange(e, 2, 2)}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="result">
					{BinaryUtils.toString(result, numDigits)}
				</div>
			</div>
		);

		// TODO: make inputs accept hex / binary only
		return (
			<div className="appletWrapper">
				<h2 className="appletTitle">Bit Operations</h2>
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
