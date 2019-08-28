import {
    SET_FILTER
} from '../actions/actions-type';

export default (filter = "all",action) => {
    switch(action.type){
        case SET_FILTER :
            return action.filter;
        default :
            return filter;
    }
}