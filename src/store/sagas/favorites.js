import { call, put, select } from 'redux-saga/effects';
import api from '../../services/api';
import { Creators as FavoriteActions } from '../ducks/favorites';

export function* addFavorite({ payload }) {
	try {
		const { data } = yield call(api.get, `/repos/${payload.repository}`);
		const isDuplicated = yield select(state => state.favorites.data.find(favorite => favorite.id === data.id));
		let repositoryData = {};
		if (isDuplicated) {
			yield put(FavoriteActions.addFavoriteFailure('Error, repository duplicated!'));
		} else {
			repositoryData = {
				id: data.id,
				name: data.full_name,
				description: data.description,
				url: data.html_url
			};
			yield put(FavoriteActions.addFavoriteSuccess(repositoryData));
		}
	} catch (error) {
		yield put(FavoriteActions.addFavoriteFailure('Error, repository not found!'));
	}
}
