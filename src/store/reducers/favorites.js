const initialState = {
	loading: false,
	data: []
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case 'ADD_FAVORITE_REQUEST':
			return { ...state, loading: true };
		case 'ADD_FAVORITE_SUCCESS':
			return { ...state, loading: false, data: [...state.data, payload.data] };

		default:
			return state;
	}
};
