import {combineReducers} from 'redux';
import commonReducer from './reducers';
import {reducer as form} from 'redux-form';
export default reducers = combineReducers({
  root: commonReducer,
  form: form,
});
