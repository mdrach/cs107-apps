
const MAX_BYTES = 4;

class ValUtils {
  static calcNumBinaryDigits(val) {
    return Math.ceil(val.toString(2).length / 4) * 4;
  }

  static maxNumBinaryDigits(val1, val2) {
    return Math.max(
      ValUtils.calcNumBinaryDigits(val1), 
      ValUtils.calcNumBinaryDigits(val2)
    );
  }

  static fromString(val, base) {
    if (base == 2) return ValUtils.fromBinaryString(val);
    if (base == 16) return ValUtils.fromHexString(val);
    return null;
  }

  static fromBinaryString(val) {
    val = val.replace(/\s/g, '');  //remove spaces
    if (val.length >= 2 && val.substring(0,2).toLowerCase() == "0b") {
      val = val.substring(2);
    }

    //Error check
    if (!/^[0-1]+$/.test(val)) {
      return; 
    }
    if (val.length > MAX_BYTES * 4) {
      if (val[0] != 0) {
      return;
      } else {
        val = val.substring(1);
      }
    }
    return parseInt(val, 2);
  }

  static fromHexString(val) {
    val = val.replace(/\s/g, '');  //remove spaces
    if (val.length >= 2 && val.substring(0,2).toLowerCase() == "0x") {
      val = val.substring(2);
    }

    // Error check
    if (val === "")
      return 0;
    if (!/^[0-9a-fA-F]+$/.test(val)) { // not valid hex
      return;
    }
    if (val.length > MAX_BYTES * 2) {
      if (val[0] != 0) { // too long
      return;
      } else {
        val = val.substring(1);
      }
    }
    return parseInt(val, 16);
  }

  static toBinaryString(val, numDigits = 32) {
    let valAsString = val.toString(2);
    let leadingZeros = Array(numDigits + 1 - valAsString.length).join("0");
    let entireNumber = leadingZeros + valAsString;
    let i = 0;
    while (i < entireNumber.length) {
      if (i % 5 == 0){
        entireNumber = entireNumber.substring(0,i) + " " + entireNumber.substring(i);
      }
      i++;
    }
    return "0b" + entireNumber;
  }

  static toHexString(val) {
    let valAsString = val.toString(16);
    let leadingZeros = ""; //Array(MAX_BYTES * 2 + 1 - valAsString.length).join("0");
    return "0x" + leadingZeros + valAsString;
  }
}


export default ValUtils;
