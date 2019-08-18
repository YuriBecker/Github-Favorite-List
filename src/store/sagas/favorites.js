import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import { addFavoriteSuccess } from '../actions/favorites';

export function* addFavorite({ payload }) {
	const { data } = yield call(api.get, `/repos/${payload.repository}`);

	const repositoryData = {
		id: data.id,
		name: data.full_name,
		description: data.description,
		url: data.html_url
	};

	yield put(addFavoriteSuccess(repositoryData));
}
