function ConvertHandler() {

  this.getNum = function(input) {
    // console.log(input)
    let result;
    if (/(\/[\d.]+\/)/.test(input)){
      result = "invalid number"  // double fraction error
      return result
    };
    if (/(\/\/)/.test(input)){
      result = "invalid number"  // double fraction error
      return result
    };
    result = eval(input.replaceAll(/[a-zA-Z]/g, ""));
    if (result == undefined) result = 1;
    // console.log(`getNum ${result}`)
    return result;
  };

  this.getUnit = function(input) {
    const allowedUnit = ['L','gal','kg','lbs','km','mi']
    let result = input;
    result = result.replaceAll(/[\d./]/g, "").toLowerCase();
    if ( result == "l") result = "L";
    if ( ! allowedUnit.includes(result)) result = "invalid unit";
    // console.log(`getUnit ${result}`)
    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit.toLowerCase()) {
      case 'gal':
        return 'L'
      case 'l':
        return 'gal'
      case 'lbs':
        return 'kg'
      case 'kg':
        return 'lbs'
      case 'mi':
        return 'km'
      case 'km':
        return 'mi'
    }
    // console.log(`getReturnUnit ${result}`)
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit.toLowerCase()) {
      case 'gal':
        return 'gallons'
      case 'l':
        return 'liters'
      case 'lbs':
        return 'pounds'
      case 'kg':
        return 'kilograms'
      case 'mi':
        return 'miles'
      case 'km':
        return 'kilometers'
    }
    // console.log(`spellOutUnit ${result}`)
    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit.toLowerCase()) {
      case 'gal':
        if (!initNum) return galToL
        result = initNum * galToL;
        break;
      case 'l':
        if (!initNum) return 1 / galToL
        result = initNum / galToL;
        break;
      case 'lbs':
        if (!initNum) return lbsToKg
        result = initNum * lbsToKg;
        break;
      case 'kg':
        if (!initNum) return 1 / lbsToKg
        result = initNum / lbsToKg;
        break;
      case 'mi':
        if (!initNum) return miToKm
        result = initNum * miToKm;
        break;
      case 'km':
        if (!initNum) return 1 / miToKm
        result = initNum / miToKm;
        break;
      default:
        result = 999999
        break;
    }
    // console.log(`convert ${result}`)

    // 5 decimal places
    result = parseFloat(result.toFixed(5));
    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = "";

    if(initNum == "invalid number"){
      result = 'invalid number';
    } else if(initUnit == "invalid unit"){
      result = 'invalid unit';
    } else {
    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    }
    // console.log(`getString ${result}`)  
    return result;
  };

}

module.exports = ConvertHandler;
