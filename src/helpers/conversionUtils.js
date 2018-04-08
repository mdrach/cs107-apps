const MAX_BYTES = 4;
const MAX_BIN_LENGTH = MAX_BYTES * 8;
const MAX_HEX_LENGTH = MAX_BIN_LENGTH / 4;

class ConversionUtils {
  static stringToInt(input) {
    // if (input === "")
      // return null;
    input = input.replace(/\s/g, '').toLowerCase(); // remove spaces

    if (/^0x[0-9a-fA-F]+$/.test(input)) // hex
      return parseInt(input, 16);
    if (/^0b[0-1]+$/.test(input))       // binary
      return parseInt(input.substring(2), 2);
    if (/^[0-9]+$/.test(input)) // decimal
      return parseInt(input, 10);
    else
      return null;
  }

  static intToString(val, base, numDigits = null) {
    if (base === 16)
      return "0x" + val.toString(16);
    if (base === 2)
      return ConversionUtils.intToBinaryString(val, numDigits);
    if (base === 10)
      return val.toString(10);


  }

  static intToBinaryString(val, numDigits = null, addSpaces = true) {
    if (val === null) 
      return "";
    let valAsString = val.toString(2);
    let leadingZeros = numDigits ? 
      Array(numDigits + 1 - valAsString.length).join("0") : ""; 
    valAsString = leadingZeros + valAsString;
    let len = valAsString.length;

    // Add spaces between groups of 4 digits
    if (addSpaces) {
      valAsString = valAsString.split("")
      .map((x,i) => ((len - i) % 4 === 0) ? " " + x : x)
      .join("")
      .trim();
    }

    return valAsString
  }

  static stringToBinaryString(input) {
    return ConversionUtils.intToBinaryString(ConversionUtils.stringToInt(input));
  }
}


export default ConversionUtils;
