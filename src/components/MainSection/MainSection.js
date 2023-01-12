import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar.js';
import FiltersBox from './FiltersBox/FiltersBox.js';
import { getItems } from '../../Database/Database.js';
import './MainSection.css';

function MainSection() {
	const [items, setItems] = useState([]);
	const [search, setSearch] = useState('');

	const getItemsFromLocalStorage = () => {
		const items = localStorage.getItem('Favorite Items');
		return items ? JSON.parse(items) : [];
	};

	const [favoriteItems, setFavoriteItems] = useState(
		getItemsFromLocalStorage()
	);

	const [sortPrice, setSortPrice] = useState('');
	const [filterCategory, setFilterCategory] = useState('');

	const addItemToFavorites = item => {
		let existentItem = favoriteItems.includes(item.id);

		if (existentItem) {
			let filterTheExistentItem = favoriteItems.filter(
				favItemId => favItemId !== item.id
			);

			setFavoriteItems(filterTheExistentItem);

			let stringItems = JSON.stringify(filterTheExistentItem);
			localStorage.setItem('Favorite Items', stringItems);
		} else {
			setFavoriteItems([...favoriteItems, item.id]);

			let stringItems = JSON.stringify([...favoriteItems, item.id]);
			localStorage.setItem('Favorite Items', stringItems);
		}
	};

	const filteredItemsList = () => {
		let newItemList = [];

		newItemList = items.filter(item => {
			if (filterCategory !== '' && filterCategory !== 'none') {
				return item.category === filterCategory;
			} else {
				return item;
			}
		});

		if (sortPrice === 'ascending') {
			return newItemList.sort((a, b) => (a.price > b.price ? 1 : -1));
		} else if (sortPrice === 'descending') {
			return newItemList.sort((a, b) => (b.price > a.price ? 1 : -1));
		} else {
			return newItemList;
		}
	};

	function onSortSelected(sortValue) {
		setSortPrice(sortValue);
	}

	function onCategorySelected(categoryValue) {
		setFilterCategory(categoryValue);
	}

	useEffect(() => {
		getItems().then(res => setItems(res));
	}, []);

	return (
		<section>
			<SearchBar setSearch={setSearch} />

			<article className='items_container-main'>
				<div className='items_container' role='list'>
					{filteredItemsList()
						.filter(item =>
							search.toLowerCase() === ''
								? item
								: item.title.toLowerCase().includes(search)
						)
						.map(item => (
							<div
								className='item_box'
								style={{ backgroundImage: `url(${item.image})` }}
								key={item.id}
								role='listitem'>
								<div className='item_box-data_container'>
									<div className='item_box-data_container-price_star'>
										<div className='item_box-price'>${item.price}</div>
										<div
											className={
												favoriteItems.includes(item.id)
													? 'star fav'
													: 'star no_fav'
											}
											onClick={() => addItemToFavorites(item)}></div>
									</div>
									<div className='item_box-title'>{item.title}</div>
								</div>
							</div>
						))}
				</div>

				<FiltersBox
					items={items}
					setItems={setItems}
					onSortSelected={onSortSelected}
					onCategorySelected={onCategorySelected}
				/>
			</article>
		</section>
	);
}

export default MainSection;
