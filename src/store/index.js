import { createStore, compose, applyMiddleware } from 'redux';
import createSagamiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';

const middlewares = [];
const sagaMiddleware = createSagamiddleware();

middlewares.push(sagaMiddleware);

const composer =
	process.env.NODE_ENV === 'development'
		? compose(
				applyMiddleware(...middlewares),
				console.tron.createEnhancer()
		  )
		: applyMiddleware(...[]);

const store = createStore(reducers, composer);

sagaMiddleware.run(sagas);

export default store;
