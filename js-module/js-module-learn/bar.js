/*
commonJS



var counter = 1;

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


let counter = 1;

function increase() {
    counter ++;
}

function decrease() {
    counter --
}


export {
    counter ,
    increase ,
    decrease
}

