const LIMITS = {
  "char_bit": 8,
  "schar_min": -128,
  "schar_max": 127,
  "uchar_max": 255,
  "char_min": -128,
  "char_max": 127,
  "mb_len_max": 16,
  "shrt_min": -32768,
  "shrt_max": 32767,
  "ushrt_max": 65535,
  "int_min": -2147483648,
  "int_max": 2147483647,
  // "uint_max": 4294967295,
  // "long_min": -9223372036854775808,
  // "long_max": 9223372036854775807,
  // "ulong_max": 18446744073709551615
}



class ConversionUtils {
  static stringToInt(input) {
    // if (input === "")
      // return null;
    let result = null;

    input = input.replace(/\s/g, '').toLowerCase(); // remove spaces

    let not = /^~[^~<<>>]+$/.test(input);
    if (not) input = input.substring(1);

    if (/^0x[0-9a-fA-F]+$/.test(input)) {  // hex
        result = parseInt(input, 16) & 0xFFFFFFFF;
    } else if (/^0b[0-1]+$/.test(input)) {       // binary
        result = parseInt(input.substring(2), 2) & 0xFFFFFFFF;
    } else if (/^-?[0-9]+$/.test(input)) {          // decimal
      result = parseInt(input, 10) & 0xFFFFFFFF;  // wrap around
    } else if (LIMITS[input])                       // limit constant
      result = LIMITS[input];
    if (/^[^<>]+<<[^<>]+$/.test(input)) {    // left shift
      let oldVal, amount;
      [oldVal, amount] = input.split("<<").map(
        (e) => ConversionUtils.stringToInt(e)
      );
      if (oldVal !== null && amount !== null) {
        result = ConversionUtils.nonWrappingLeftShift(oldVal, amount);
      }
    } else if (/^[^<>]+>>[^<>]+$/.test(input)) {     // right shift
      let oldVal, amount;
      [oldVal, amount] = input.split(">>").map(
        (e) => ConversionUtils.stringToInt(e)
      );
      if (oldVal !== null && amount !== null) {
        result = ConversionUtils.nonWrappingLeftShift(oldVal, -amount);
      }
    }
    return (not) ? ~result : result;
  }

  static nonWrappingLeftShift(val, amount) {
    if (amount > 0) {
      for (let i = 0; i < amount; i++) {
        val = (val & (~0 >>> 1)) << 1;
      } 
    } else {
      for (let i = 0; i < Math.abs(amount); i++) {
        val = (val & (~1)) >> 1;
      } 
    }
    return val;
  }

  static intToString(val, base, numDigits = null) {
    if (val === null)
      return "<invalid input>"

    if (base === 16)
      return "0x" + (val >>> 0).toString(16); // >>> 0 to interpret as unsigned
    if (base === 2)
      return ConversionUtils.intToBinaryString(val, numDigits);
    if (base === 10)
      return val.toString(10);

    return "<invalid input>";
  }

  static intToBinaryString(val, numDigits = null, addSpaces = true) {
    if (val === null) 
      return "<invalid input>";
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

  static stringToBinaryString(input, numDigits = null) {
    return ConversionUtils.intToBinaryString(ConversionUtils.stringToInt(input), numDigits);
  }
}


export default ConversionUtils;
