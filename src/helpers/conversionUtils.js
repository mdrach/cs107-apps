const MAX_BYTES = 4;
const MAX_BIN_LENGTH = MAX_BYTES * 8;
const MAX_HEX_LENGTH = MAX_BIN_LENGTH / 4;

const INT32_MAX = (2**31)-1;
const INT32_MIN = -(2**31);

class ConversionUtils {
  static stringToInt(input) {
    // if (input === "")
      // return null;
    input = input.replace(/\s/g, '').toLowerCase(); // remove spaces

    if (/^0x[0-9a-fA-F]{1,8}$/.test(input)) // hex
      return parseInt(input, 16);
    if (/^0b[0-1]{1,32}$/.test(input))       // binary
      return parseInt(input.substring(2), 2);
    if (/^-?[0-9]+$/.test(input)) {          // decimal
      let val = parseInt(input, 10);
      if ((val <= INT32_MAX) && (val >= INT32_MIN))
        return val;
    }
    return null;
  }

  static intToString(val, base, numDigits = null) {
    if (base === 16)
      return "0x" + (val >>> 0).toString(16); // >>> 0 to interpret as unsigned
    if (base === 2)
      return ConversionUtils.intToBinaryString(val, numDigits);
    if (base === 10)
      return val.toString(10);


  }

  static intToBinaryString(val, numDigits = null, addSpaces = true) {
    if (val === null) 
      return "";
    val = val >>> 0; // interpret as unsigned value
    let valAsString = val.toString(2); 

    let leadingZeros = numDigits ? 
      Array(numDigits + 1 - valAsString.length).join("0") : ""; 
    valAsString = leadingZeros + valAsString;

    if (val < 0)
      valAsString = "-" + valAsString;

    // Add spaces between groups of 4 digits
    let len = valAsString.length;
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
