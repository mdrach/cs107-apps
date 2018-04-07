
const MAX_BYTES = 4;

class ValUtils {
  static calcNumBinaryDigits(val) {
    return val.toString(2).length;
    // return Math.ceil(val.toString(2).length / 4) * 4;
  }


  static fromString(val, prevVal, base) {
    if (base === 2) return ValUtils.fromBinaryString(val, prevVal);
    if (base === 16) return ValUtils.fromHexString(val, prevVal);
    return null;
  }

  static fromBinaryString(val, prevVal) {
    val = val.replace(/\s/g, '');  //remove spaces
    if (val.length >= 2 && val.substring(0,2).toLowerCase() === "0b") {
      val = val.substring(2);
    }

    //Error check
    if (val === "")
      return null;
    if (!/^[0-1]+$/.test(val)) {
      return prevVal; 
    }
    if (val.length > MAX_BYTES * 8) {
      if (val[0] !== 0) {
      return prevVal;
      } else {
        val = val.substring(1);
      }
    }
    return parseInt(val, 2);
  }

  static fromHexString(val, prevVal) {
    val = val.replace(/\s/g, '');  //remove spaces
    if (val.length >= 2 && val.substring(0,2).toLowerCase() === "0x") {
      val = val.substring(2);
    }

    // Error check
    if (val === "")
      return null;
    if (!/^[0-9a-fA-F]+$/.test(val)) { // not valid hex
      return prevVal;
    }
    if (val.length > MAX_BYTES * 2) {
      if (val[0] !== 0) { // too long
      return prevVal;
      } else {
        val = val.substring(1);
      }
    }
    return parseInt(val, 16);
  }

  static toBinaryString(val, numDigits = null) { //TODO cleanup
    if (val === null)
      return "";
    let valAsString = val.toString(2);
    let leadingZeros = numDigits ? Array(numDigits + 1 - valAsString.length).join("0") : ""; 
    let entireNumber = leadingZeros + valAsString;
    let i = entireNumber.length;
    for (i = 0; i < entireNumber.length; i++) {
      if (i % 5 === 0){
        entireNumber = entireNumber.substring(0,entireNumber.length - i) + " " + entireNumber.substring(entireNumber.length - i);
      }
    }
    return entireNumber.trim();
  }

  static toHexString(val) {
    if (val === null)
      return "";
    let valAsString = val.toString(16);
    let leadingZeros = ""; //Array(MAX_BYTES * 2 + 1 - valAsString.length).join("0");
    return "0x" + leadingZeros + valAsString;
  }
}


export default ValUtils;
