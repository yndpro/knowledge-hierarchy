import { observable,autorun} from 'mobx';


const number = observable("test");

console.log(number);
autorun(() => {
    console.log(number);
});

number.set(333);


