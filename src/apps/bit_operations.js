import React from "react";
import ConversionUtils from "../helpers/conversionUtils"
import FormatUtils from "../helpers/formatUtils"
import Select from 'react-select';

const NUM_BINARY_DIGITS = 32;

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
									onFocus={(e) => {
										var val = e.target.value;
										e.target.value = '';
										e.target.value = val;
									}}
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
					<div className="input-module__opposite-cols">
						<span>{"Hex: "}</span> 
						<span >{ConversionUtils.intToString(result, 16)}</span>
					</div>
					<div className="input-module__opposite-cols">
						<span>{"Decimal: "}</span> 
						<span>{ConversionUtils.intToString(result, 10)}</span>
					</div>
				</div>
			</div>
		);


		let bStrings = this.state.inputs.map(
			(e) => ConversionUtils.stringToBinaryString(e, NUM_BINARY_DIGITS)
		);
		// let numDigits = Math.max(...bStrings.map((e) => e.replace(/\s/g, '').length));

		if (!bStrings[0].includes("invalid") && !bStrings[1].includes("invalid")) { // TODO fix ugly hack
			bStrings = FormatUtils.formatBinaryStrings(bStrings, this.state.operator);

		} else if (!bStrings[0].includes("invalid")) {
			bStrings[0] = FormatUtils.greyLeadingZeros(bStrings[0]);
		} else if (!bStrings[1].includes("invalid")) {
			bStrings[1] = FormatUtils.greyLeadingZeros(bStrings[1]);
		}

		let formattedResult = FormatUtils.greyLeadingZeros(
			ConversionUtils.intToString(result, 2, NUM_BINARY_DIGITS)
		);

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
					{formattedResult}
				</div>
			</div>
		);

		// TODO: make inputs accept hex / binary only
		return (
			<div className="app-wrapper">
				<div className="app-title">Bitwise Operation Explorer</div>
				<div className="app-description">
					{"Play around with "} <span style={{fontWeight: "bold"}}>signed 32-bit ints</span>{"!"}<br/>  
					{"Define the bit patten using hexadecimal (0x7AF3B), \
							binary (0b0110), decimal (107), limits (INT_MAX), \
							and simple bit shifts (1 << 3)."}<br/>  
							{"Experiment with different bitwise operations (&, |, ^, ~)."}

						</div>
						<div className="app-input-modules">
							{hexInput}
							{binaryInput}
						</div>
						<div className="app-decimal-result">
						</div>
						<div className="app-bitwise-info">
							{HexBinaryDecimalTable()}
							{BitwiseOperatorTable()}
						</div>
					</div>
		);
	}
}

const HexBinaryDecimalTable = () => {
	let rows = [];
	for (let i = 0; i <= 0xF; i++) {
		rows[i] = (
			<tr key={i}>
				<td>{i.toString(16).toUpperCase()}</td>
				<td>{ConversionUtils.intToBinaryString(i, 4)}</td>
				<td>{i.toString(10)}</td>
			</tr>
		);
	}
	return (
		<table className="app-bitwise-info__conversion-table">
			<tbody>
				<tr>
					<th>Hexadecimal</th>
					<th>Binary</th>
					<th>Decimal</th>
				</tr>
				{rows}
			</tbody>
		</table>
	);
}

const BitwiseOperatorTable = () => {
	let testCases = [[1, 1], [1, 0], [0, 1], [0, 0]];
	let andRows = testCases.map((c) => {
		return (
			<tr key={c}>
				<td>{c[0]}</td>
				<td>{c[1]}</td>
				<td style={{
					fontWeight: "bold", 
					backgroundColor:"#DDD"
				}}>{c[0] & c[1]}</td>
		</tr>
		);
	});
	let orRows = testCases.map((c) => {
		return (
			<tr key={c}>
				<td>{c[0]}</td>
				<td>{c[1]}</td>
				<td style={{
					fontWeight: "bold", 
					backgroundColor:"#DDD"
				}}>{c[0] | c[1]}</td>
		</tr>
		);
	});
	let exOrRows = testCases.map((c) => {
		return (
			<tr key={c}>
				<td>{c[0]}</td>
				<td>{c[1]}</td>
				<td style={{
					fontWeight: "bold", 
					backgroundColor:"#DDD"
				}}>{c[0] ^ c[1]}</td>
		</tr>
		);
	});

	return (
		<div className="app-bitwise-info__operator-tables">
			<table className="app-bitwise-info__operator-table">
				<tbody>
					<tr>
						<th colSpan="3">& (AND)</th>
					</tr>
					{andRows}
				</tbody>
			</table>
			<table className="app-bitwise-info__operator-table">
				<tbody>
					<tr>
						<th colSpan="3">| (OR)</th>
					</tr>
					{orRows}
				</tbody>
			</table>
			<table className="app-bitwise-info__operator-table">
				<tbody>
					<tr>
						<th colSpan="3">^ (EXOR)</th>
					</tr>
					{exOrRows}
				</tbody>
			</table>
			<table className="app-bitwise-info__operator-table">
				<tbody>
					<tr>
						<th colSpan="2">~ (NOT)</th>
					</tr>
					<tr>
						<td>{1}</td>
						<td style={{
							fontWeight: "bold", 
							backgroundColor:"#DDD"
						}}>{0}</td>
				</tr>
				<tr>
					<td>{0}</td>
					<td style={{
						fontWeight: "bold", 
						backgroundColor:"#DDD"
					}}>{1}</td>
			</tr>
		</tbody>
		</table>
	</div>
	);
}


export default BitOperations;
