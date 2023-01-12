import React from 'react';
import './SearchBar.css';

function SearchBar({ setSearch }) {
	return (
		<div className='search_bar'>
			<input
				type='text'
				placeholder='Search here!'
				className='search_bar-text'
				data-testid='text-input'
				onChange={e => setSearch(e.target.value)}></input>
		</div>
	);
}

export default SearchBar;
