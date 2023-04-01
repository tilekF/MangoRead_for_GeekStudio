import { combineReducers } from 'redux';
import makeOrder from '../reducers/data'
const rootReducers = () => combineReducers({
    makeOrder,
})

export default rootReducers;