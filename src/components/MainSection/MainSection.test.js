import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainSection from './MainSection.js';
import SearchBar from './SearchBar/SearchBar.js';
import FiltersBox from './FiltersBox/FiltersBox.js';
import axios from 'axios';
import mockProducts from '../../Database/mockProducts.js';

jest.mock('axios');

test('Check if renders the Search Bar', () => {
	render(<SearchBar />);

	const textInput = screen.getByTestId('text-input');

	expect(textInput).toBeInTheDocument();
	expect(textInput).toHaveAttribute('type', 'text');
	expect(textInput).toHaveAttribute('placeholder', 'Search here!');
});

test('Check if renders the Filters Box', () => {
	render(<FiltersBox />);

	const filterTitle = screen.getByText(/filters/i);
	const filterLabelByPrice = screen.getByText(/by price:/i);
	const filterLabelByCategory = screen.getByText(/by category:/i);
	const filtersComboBoxes = screen.getAllByRole('combobox');

	expect(filterTitle).toBeInTheDocument();
	expect(filterLabelByPrice).toBeInTheDocument();
	expect(filterLabelByCategory).toBeInTheDocument();
	expect(filtersComboBoxes).toHaveLength(2);
});

test('Check if renders all the 20 items in the MainSection', async () => {
	axios.get.mockResolvedValue({
		data: mockProducts,
	});

	render(<MainSection />);

	const allBoxes = await screen.findAllByRole('listitem');

	expect(allBoxes).toHaveLength(20);
});

// -----------------------------------------------------------------------------

test('Check SearchBar functionality', async () => {
	render(
		<MainSection>
			<SearchBar />
		</MainSection>
	);

	const textInput = screen.getByTestId('text-input');

	fireEvent.change(textInput, { target: { value: 'mens cotton jacket' } });

	const itemBoxExpected = await screen.findByText(/mens cotton jacket/i);

	const itemsBoxesArray = await screen.findAllByRole('listitem');

	expect(itemBoxExpected).toBeInTheDocument();
	expect(itemsBoxesArray).toHaveLength(1);
});

// -----------------------------------------------------------------------------

test('Check Filters functionality I (sort by Price)', async () => {
	render(
		<MainSection>
			<FiltersBox />
		</MainSection>
	);

	userEvent.selectOptions(
		screen.getByTestId('select-price'),
		screen.getByRole('option', { name: /ascending/i })
	);

	await waitFor(() => {
		const itemsBoxesArray = screen.getAllByRole('listitem');

		expect(itemsBoxesArray).toHaveLength(20);
		expect(itemsBoxesArray[0]).toHaveTextContent('$7.95');
		expect(itemsBoxesArray[1]).toHaveTextContent('$9.85');
		expect(itemsBoxesArray[2]).toHaveTextContent('$9.99');
	});
});

test('Check Filters functionality II (sort by Category)', async () => {
	render(
		<MainSection>
			<FiltersBox />
		</MainSection>
	);

	userEvent.selectOptions(
		screen.getByTestId('select-category'),
		screen.getByRole('option', { name: /jewelery/i })
	);

	await waitFor(() => {
		const itemsBoxesArray = screen.getAllByRole('listitem');

		expect(itemsBoxesArray).toHaveLength(4);
		expect(itemsBoxesArray[0]).toHaveTextContent(
			/john hardy women's legends naga gold & silver dragon station chain bracelet/i
		);
		expect(itemsBoxesArray[1]).toHaveTextContent(
			/solid gold petite micropave/i
		);
		expect(itemsBoxesArray[2]).toHaveTextContent(/white gold plated princess/i);
		expect(itemsBoxesArray[3]).toHaveTextContent(
			/pierced owl rose gold plated stainless steel double/i
		);
	});
});
