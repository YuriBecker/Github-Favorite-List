import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as FavoritesActions from '../../store/actions/favorites';

function Main({ favorites, addFavoriteRequest }) {
	const [inputText, setInputText] = useState('');

	const handleAddRepository = e => {
		e.preventDefault();
		addFavoriteRequest(inputText);
		setInputText('');
	};

	return (
  <>
    <form onSubmit={handleAddRepository}>
      <input
        type="text"
        value={inputText}
        placeholder="user/repository"
        onChange={e => setInputText(e.target.value)}
      />
      <button type="submit">Search</button>
      {favorites.loading && <span>Loading...</span>}
    </form>

    <ul>
      {favorites.data.map(favorite => (
        <li key={favorite.key}>
          <p>
            <strong>{favorite.name}</strong>
            {favorite.description}
          </p>
          <a href={favorite.url}>Link</a>
        </li>
				))}
    </ul>
  </>
	);
}

Main.propTypes = {
	addFavoriteRequest: PropTypes.func.isRequired,
	favorites: PropTypes.shape({
		loading: PropTypes.bool.isRequired,
		data: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number,
				name: PropTypes.string,
				description: PropTypes.string,
				url: PropTypes.string
			})
		).isRequired
	}).isRequired
};

const mapStateToProps = state => ({
	favorites: state.favorites
});

const mapDispathToProps = dispath => bindActionCreators(FavoritesActions, dispath);

export default connect(
	mapStateToProps,
	mapDispathToProps
)(Main);
