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

	formatBinaryStrings = (bStrings) => {
		let s1, s2;
		[s1, s2] = bStrings;
		let op = this.state.operator;

		// Add leading zeros to make both bit strings same length
		let maxLen = Math.max(s1.length, s2.length);
		let s1Padded = (Array(maxLen + 1 - s1.length).join("0") + s1).split("");
		let s2Padded = (Array(maxLen + 1 - s2.length).join("0") + s2).split("");

		const redSpan = (e) => (<span style={{color: "red", fontWeight: "bold"}}>{e}</span>);
		const normalSpan = (e) => (<span>{e}</span>);

		for (let i = maxLen-1; i >= 0; i--) {
			if (op === "&") {
				if (s1Padded[i] === "1" && s1Padded[i] === s2Padded[i]) {
					s1Padded[i] = redSpan(s1Padded[i]);
					s2Padded[i] = redSpan(s2Padded[i]);
				} else {
					s1Padded[i] = normalSpan(s1Padded[i]);
					s2Padded[i] = normalSpan(s2Padded[i]);
				}
			} else if (op === "|") {
				if (s1Padded[i] === "1" || s2Padded[i] === "1") {
					s1Padded[i] = redSpan(s1Padded[i]);
					s2Padded[i] = redSpan(s2Padded[i]);
				} else {
					s1Padded[i] = normalSpan(s1Padded[i]);
					s2Padded[i] = normalSpan(s2Padded[i]);
				}
			} else if (op === "^") {
				if (s1Padded[i] !== s2Padded[i]) {
					s1Padded[i] = redSpan(s1Padded[i]);
					s2Padded[i] = redSpan(s2Padded[i]);
				} else {
					s1Padded[i] = normalSpan(s1Padded[i]);
					s2Padded[i] = normalSpan(s2Padded[i]);
				}
			}
	}

		s1 = s1Padded.slice(maxLen - s1.length);
		s2 = s2Padded.slice(maxLen - s2.length);

		return [s1, s2];
	}

	render() {
		let result = this.evaluateResult();

		let operatorDropdown = (
			<Select
				name="form-field-name"
				valueRenderer={(v) => <div style={{color: "#bf3131", padding: "3px"}}>{v.label}</div>}
				style={{height: "40px", width: "70px", textAlign: "center"}}
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
									maxLength={16}
									className="numericInput"
									type="text"
									value={this.state.inputs[0]}
									onChange={(e) => this.handleChange(e, 0)}
								/>
							</div>
							<div>
								<input
									maxLength={16}
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

		let bStrings = this.state.inputs.map(
			(e) => ConversionUtils.stringToBinaryString(e)
		);
		let numDigits = Math.max(...bStrings.map((e) => e.replace(/\s/g, '').length));

		bStrings = this.formatBinaryStrings(bStrings);

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
							<div className="binaryResult">
								{bStrings[0]}
							</div>
							<div className="binaryResult">
								{bStrings[1]}
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
