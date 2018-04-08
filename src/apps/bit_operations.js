import React from "react";
import ConversionUtils from "../helpers/conversionUtils"
import Select from 'react-select';

class BitOperations extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputs: ["0x1", "0x3"],
			operator: "&",
		};
	}

	handleChange = (e, whichVal) => {
		let input = e.target.value;

		if (isNaN(ConversionUtils.stringToInt(input)))
			return;

		let inputs = this.state.inputs;
		inputs[whichVal === 0 ? 0 : 1] = input;
		this.setState({inputs: inputs});
	}


	evaluateResult = () => {
		let val1 = ConversionUtils.stringToInt(this.state.inputs[0]);
		let val2 = ConversionUtils.stringToInt(this.state.inputs[1]);
		let op = this.state.operator;

		if (op === "&") return val1 & val2;
		if (op === "|") return val1 | val2;
		if (op === "^") return val1 ^ val2;
		throw Error("Invalid bitwise operator");
	}

	render() {
		let result = this.evaluateResult();

		let operatorDropdown = (
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
									value={this.state.inputs[0]}
									onChange={(e) => this.handleChange(e, 0)}
								/>
							</div>
							<div>
								<input
									className="numericInput"
									type="text"
									value={this.state.inputs[1]}
									onChange={(e) => this.handleChange(e, 1)}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="result">
					{ConversionUtils.intToString(result, 16)}
				</div>
			</div>
		);

		let vals = this.state.inputs.map(
			(e) => ConversionUtils.stringToBinaryString(e)
		);
		let numDigits = Math.max(...vals.map((e) => e.replace(/\s/g, '').length));

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
								{vals[0]}
							</div>
							<div>
								{vals[1]}
							</div>
						</div>
					</div>
				</div>
				<div className="result">
					{ConversionUtils.intToString(result, 2, numDigits)}
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
