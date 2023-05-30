const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

// https://www.chaijs.com/api/assert/
suite('Unit Tests', function() {
  //  ------------------------------------------------------
  suite('Input Number', function() {
    test('correctly read a whole number input', function() {
      assert.strictEqual(convertHandler.getNum('4gal'), 4, 'convertHandler should correctly read a whole number input.')
    });
    test('correctly read a decimal number input', function() {
      assert.strictEqual(convertHandler.getNum('1.50gal'), 1.50, 'convertHandler should correctly read a decimal number input.')
    });
    test('correctly read a fractional input', function() {
      assert.isOk(convertHandler.getNum('1/2km'), 'convertHandler should correctly read a fractional input.')
    });
    test('correctly read a fractional input with a decimal', function() {
      assert.strictEqual(convertHandler.getNum('1/2km'), 0.5, 'convertHandler should correctly read a fractional input with a decimal.')
    });
    test('correctly return an error on a double-fraction', function() {
      assert.strictEqual(convertHandler.getNum('3/2/3gal'), 'invalid number', 'convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).')
    });
    test('correctly correctly default to a numerical input of 1 when no numerical input', function() {
      assert.strictEqual(convertHandler.getNum('gal'), 1, 'convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.')
    });
  });
  //  ------------------------------------------------------
  suite('Input Unit', function() {
    test('correctly read each valid input unit', function() {
      assert.strictEqual(convertHandler.getUnit('4gal'), 'gal', 'convertHandler should correctly read each valid input unit.')
      assert.strictEqual(convertHandler.getUnit('4l'), 'L', 'convertHandler should correctly read each valid input unit.')
      assert.strictEqual(convertHandler.getUnit('4kg'), 'kg', 'convertHandler should correctly read each valid input unit.')
      assert.strictEqual(convertHandler.getUnit('4lbs'), 'lbs', 'convertHandler should correctly read each valid input unit.')
      assert.strictEqual(convertHandler.getUnit('4mi'), 'mi', 'convertHandler should correctly read each valid input unit.')
      assert.strictEqual(convertHandler.getUnit('4km'), 'km', 'convertHandler should correctly read each valid input unit.')
    });
    test('correctly return an error for an invalid input unit', function() {
      assert.strictEqual(convertHandler.getUnit('4gla'), 'invalid unit', 'convertHandler should correctly return an error for an invalid input unit.')
      assert.strictEqual(convertHandler.getUnit('1.5'), 'invalid unit', 'convertHandler should correctly return an error for an invalid input unit.')
    });
    test('correctly return the correct return unit for each valid input unit', function() {
      assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L', 'convertHandler should correctly return the correct return unit for each valid input unit')
      assert.strictEqual(convertHandler.getReturnUnit('l'), 'gal', 'convertHandler should correctly return the correct return unit for each valid input unit')
      assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi', 'convertHandler should correctly return the correct return unit for each valid input unit')
      assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km', 'convertHandler should correctly return the correct return unit for each valid input unit')
      assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg', 'convertHandler should correctly return the correct return unit for each valid input unit')
      assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs', 'convertHandler should correctly return the correct return unit for each valid input unit')
    });
    test('correctly return the spelled-out string unit for each valid input unit', function() {
      assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons', 'convertHandler should correctly return the spelled-out string unit for each valid input unit.')
      assert.strictEqual(convertHandler.spellOutUnit('l'), 'liters', 'convertHandler should correctly return the spelled-out string unit for each valid input unit.')
      assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers', 'convertHandler should correctly return the spelled-out string unit for each valid input unit.')
      assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles', 'convertHandler should correctly return the spelled-out string unit for each valid input unit.')
      assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds', 'convertHandler should correctly return the spelled-out string unit for each valid input unit.')
      assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms', 'convertHandler should correctly return the spelled-out string unit for each valid input unit.')
    });
  });
  //  ------------------------------------------------------
  suite('Conversion', function() {
    test('correctly convert gal to L', function() {
      assert.strictEqual(convertHandler.convert(1.5,'gal'), 5.67812, 'convertHandler correctly convert gal to L')
    });
    test('correctly convert L to gal', function() {
      assert.strictEqual(convertHandler.convert(1.5,'L'), 0.39626, 'convertHandler correctly convert L to gal')
    });
    test('correctly convert mi to km', function() {
      assert.strictEqual(convertHandler.convert(1.5,'mi'), 2.41401, 'convertHandler correctly convert mi to km')
    });
    test('correctly convert km to mi', function() {
      assert.strictEqual(convertHandler.convert(1.5,'km'), 0.93206, 'convertHandler correctly convert km to mi')
    });
    test('correctly convert lbs to kg', function() {
      assert.strictEqual(convertHandler.convert(1.5,'lbs'), 0.68039, 'convertHandler correctly convert lbs to kg')
    });
    test('correctly convert kg to lbs', function() {
      assert.strictEqual(convertHandler.convert(1.5,'kg'), 3.30694, 'convertHandler correctly convert kg to lbs')
    });
  });
});