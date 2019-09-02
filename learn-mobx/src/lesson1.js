import { observable,autorun} from 'mobx';


const number = observable("test");

autorun(() => {
    console.log(value.get());
});

