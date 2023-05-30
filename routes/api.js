'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res) {
    
    console.log(req.query.input)
    const input = req.query.input
    
    let initNum = convertHandler.getNum(input)
    let initUnit = convertHandler.getUnit(input)
    let returnUnit = convertHandler.getReturnUnit(initUnit)
    let returnNum = convertHandler.convert(initNum, initUnit)
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)

    const returnObj = {
      'initNum' : initNum,
      'initUnit' : initUnit,
      'returnNum' : returnNum,
      'returnUnit' : returnUnit,
      'string' : string
    }
    // error handling resnpose
    if(initUnit == "invalid unit" && initNum == "invalid number") return res.send('invalid number and unit')
    if(initUnit == "invalid unit") return res.send('invalid unit')
    if(initNum == "invalid number") return res.send('invalid number')
    // console.log(returnObj)
    return res.json(returnObj);
  });
  
};
