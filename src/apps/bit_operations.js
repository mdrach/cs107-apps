import React from "react";
import ConversionUtils from "../helpers/conversionUtils"
import FormatUtils from "../helpers/formatUtils"
import Select from 'react-select';

class BitOperations extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputs: ["1 << 2", "0x107"],
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
				valueRenderer={
					(v) => <div className="input-module__operator-dropdown__value">
						{v.label}
					</div>
				}
				className="input-module__operator-dropdown"
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
			<div className="input-module">
				<div className="input-module__body">
					<div className="input-module__operator">
						{operatorDropdown}
					</div>
					<div className="input-module__inputs input-module__inputs--hex">
						<div>
							<div>
								<input
									autoFocus
									maxLength={16}
									className="input-module__input input-module__input--hex"
									type="text"
									value={this.state.inputs[0]}
									onChange={(e) => this.handleChange(e, 0)}
								/>
							</div>
							<div>
								<input
									maxLength={16}
									className="input-module__input input-module__input--hex"
									type="text"
									value={this.state.inputs[1]}
									onChange={(e) => this.handleChange(e, 1)}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="input-module__result">
					{ConversionUtils.intToString(result, 16)}
				</div>
			</div>
		);

		let bStrings = this.state.inputs.map(
			(e) => ConversionUtils.stringToBinaryString(e)
		);
		let numDigits = Math.max(...bStrings.map((e) => e.replace(/\s/g, '').length));

		bStrings = FormatUtils.formatBinaryStrings(bStrings, this.state.operator);

		let binaryInput = (
			<div className="input-module">
				<div className="input-module__body">
					<div className="input-module__operator">
						{this.state.operator}
					</div>
					<div className="input-module__inputs input-module__inputs--binary">
						<div>
							<div className="input-module__input">
								{bStrings[0]}
							</div>
							<div className="input-module__input">
								{bStrings[1]}
							</div>
						</div>
					</div>
				</div>
				<div className="input-module__result">
					{ConversionUtils.intToString(result, 2, numDigits)}
				</div>
			</div>
		);

		// TODO: make inputs accept hex / binary only
		return (
			<div className="app-wrapper">
				<h2 className="app-title">Bit Operations</h2>
				<div className="app">
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
