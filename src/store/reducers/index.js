import { combineReducers } from 'redux';
import makeOrder from './data'
const rootReducers = () => combineReducers({
    makeOrder,
})

export default rootReducers;