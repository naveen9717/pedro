import {createStore} from 'redux';
import {Reducers} from '../reducer';

const store = createStore(Reducers);

export {store};
