import React from 'react';
import './FiltersBox.css';

function FiltersBox({ onSortSelected, onCategorySelected }) {
	function sortByPrice(e) {
		onSortSelected(e.target.value);
	}

	function sortByCategory(e) {
		onCategorySelected(e.target.value);
	}

	return (
		<div className='items_container-filter_box'>
			<h3 className='filter_box-title'>Filters</h3>

			<div className='filter_box-filters_container'>
				<div className='filter_box-filter filter_box-first_filter'>
					<h5>By Price:</h5>

					<div className='filter_box-select'>
						<select onChange={sortByPrice} data-testid='select-price'>
							<option value='none' role='option'>
								-
							</option>
							<option value='ascending' role='option'>
								Ascending
							</option>
							<option value='descending' role='option'>
								Descending
							</option>
						</select>
					</div>
				</div>

				<div className='filter_box-filter filter_box-second_filter'>
					<h5>By Category:</h5>

					<div className='filter_box-select'>
						<select onChange={sortByCategory} data-testid='select-category'>
							<option value='none' role='option'>
								-
							</option>
							<option value="men's clothing" role='option'>
								Men&apos;s Clothing
							</option>
							<option value="women's clothing" role='option'>
								Women&apos;s Clothing
							</option>
							<option value='jewelery' role='option'>
								Jewelery
							</option>
							<option value='electronics' role='option'>
								Electronics
							</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FiltersBox;
