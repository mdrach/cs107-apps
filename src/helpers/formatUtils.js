import React from "react";

class FormatUtils {
	static formatBinaryStrings(bStrings, op) {
		let s1, s2;
		[s1, s2] = bStrings;

		// Add leading spaces to make both bit strings same length
		let maxLen = Math.max(s1.length, s2.length);
		let s1Padded = (Array(maxLen + 1 - s1.length).join("0") + s1);
		let s2Padded = (Array(maxLen + 1 - s2.length).join("0") + s2);

		let redStyle = {color: "red", fontWeight: "bold"};
		let blackStyle = {color: "black"};

		let s1Style = [];
		let s2Style = [];

		for (let i = maxLen-1; i >= 0; i--) {
			if (op === "&") {
				if (s1Padded[i] === "1" && s1Padded[i] === s2Padded[i]) {
					s1Style.unshift(redStyle);
					s2Style.unshift(redStyle);
				} else {
					s1Style.unshift(blackStyle);
					s2Style.unshift(blackStyle);
				}
			} else if (op === "|") {
				if (s1Padded[i] === "1" || s2Padded[i] === "1") {
					s1Style.unshift(redStyle);
					s2Style.unshift(redStyle);
				} else {
					s1Style.unshift(blackStyle);
					s2Style.unshift(blackStyle);
				}
			} else if (op === "^") {
				if (s1Padded[i] !== s2Padded[i]) {
					s1Style.unshift(redStyle);
					s2Style.unshift(redStyle);
				} else {
					s1Style.unshift(blackStyle);
					s2Style.unshift(blackStyle);
				}
			}
		}
		s1Style = FormatUtils.getGreyStyle(s1, s1Style);
		s2Style = FormatUtils.getGreyStyle(s2, s2Style);

		let s1StyledSpans = s1Padded.split("").map((c,i) => (<span key={i} style={s1Style[i]}>{c}</span>));
		let s2StyledSpans = s2Padded.split("").map((c,i) => (<span key={i} style={s2Style[i]}>{c}</span>));

		s1StyledSpans = s1StyledSpans.slice(maxLen - s1.length);
		s2StyledSpans = s2StyledSpans.slice(maxLen - s2.length);

		return [s1StyledSpans, s2StyledSpans];
	}

	static greyLeadingZeros(s) {
		let styleArray = [];
		styleArray = FormatUtils.getGreyStyle(s, styleArray);
		return s.split("").map((c,i) => (<span key={i} style={styleArray[i]}>{c}</span>));

	}

	static getGreyStyle(s, styleArray) {
		let greyStyle = {color: "#DDD", fontWeight: "normal"};

		for (let i = 0; i < s.length; i++) {
			if (s[i] === "1")
				break;
			styleArray[i] = greyStyle;
		}

		return styleArray;
	}
}


export default FormatUtils;
