"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
commonJS

*/

/*var counter = 1;

function increase() {
	counter ++;
}

function decrease() {
	counter --
}


module.exports = {
	counter : counter,
	increase : increase,
	decrease : decrease
};*/

var counter = 1;

function increase() {
  exports.counter = counter += 1;
}

function decrease() {
  exports.counter = counter -= 1;
}

exports.counter = counter;
exports.increase = increase;
exports.decrease = decrease;
