const MAX_BYTES = 4;
const MAX_BIN_LENGTH = MAX_BYTES * 8;
const MAX_HEX_LENGTH = MAX_BIN_LENGTH / 4;

class BinaryUtils {
  static fromString(val) {
    val = val.replace(/\s/g, '');  //remove spaces
    if (val.length >= 2 && val.substring(0,2).toLowerCase() === "0b")
      val = val.substring(2);
    if (val === null)
      return null;

    //Error check
    if (!/^[0-1]+$/.test(val)) { // Not valid binary
      return NaN; 
    }
    if (val.length > MAX_BIN_LENGTH) { // Too long
      if (val[0] !== 0)
        return NaN;
      else
        val = val.substring(1);
    }
    return parseInt(val, 2);
  }

  static toString(val, numDigits = null, addSpaces = true) {
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
}

class HexUtils {
  static fromString(val) {
    val = val.replace(/\s/g, '');  //remove spaces
    if (val.length >= 2 && val.substring(0,2).toLowerCase() === "0x") {
      val = val.substring(2);
    }
    if (val === "")
      return null;

    // Error check
    if (!/^[0-9a-fA-F]+$/.test(val)) // not valid hex
      return NaN;
    if (val.length > MAX_HEX_LENGTH) {
      if (val[0] !== 0) // too long
        return NaN;
      else
        val = val.substring(1);
    }
    return parseInt(val, 16);
  }

  static toString(val) {
    if (!val)
      return "0x"
    let valAsString = val.toString(16);
    return "0x" + valAsString;
  }
}


export {BinaryUtils, HexUtils};
