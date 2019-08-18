// TYPES
export const Types = {
	ADD_REQUEST: 'favorites/ADD_REQUEST',
	ADD_SUCCESS: 'favorites/ADD_SUCCESS',
	ADD_FAILURE: 'favorites/ADD_FAILURE'
};

// REDUCER
const initialState = {
	loading: false,
	data: [],
	error: null
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case Types.ADD_REQUEST:
			return { ...state, loading: true };
		case Types.ADD_SUCCESS:
			return { ...state, loading: false, error: null, data: [...state.data, payload.data] };
		case Types.ADD_FAILURE:
			return { ...state, loading: false, error: payload.error };
		default:
			return state;
	}
};

// ACTIONS

export const Creators = {
	addFavoriteRequest: repository => ({
		type: Types.ADD_REQUEST,
		payload: { repository }
	}),

	addFavoriteSuccess: data => ({
		type: Types.ADD_SUCCESS,
		payload: { data }
	}),

	addFavoriteFailure: error => ({
		type: Types.ADD_FAILURE,
		payload: { error }
	})
};
