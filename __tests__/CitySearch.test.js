import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../src/components/CitySearch";
import { extractLocations, getEvents } from "../src/api";
import App from "../src/App";




describe('<CitySearch /> component', () => {
    let CitySearchComponent;
    let allLocations
    beforeEach(async () => {
        const allEvents = await getEvents();
        allLocations = extractLocations(allEvents);
        CitySearchComponent = render(<CitySearch allLocations={allLocations} />);
    });
    test('renders text input', () => {
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });
    test('suggestions list is hidden by default', () => {
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });
    test('renders a list of suggestions when city textbox gains focus', async () => {
        const user = userEvent.setup();
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.click(cityTextBox);
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).toBeInTheDocument();
        expect(suggestionList).toHaveClass('suggestions');
    });
    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(<CitySearch
            allLocations={allLocations}
            setCurrentCity={() => { }}
        />);

        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, 'Berlin');

        const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];

        await user.click(BerlinGermanySuggestion);

        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });
});

describe('<CitySearch /> integration', () => {
    test('renders suggestions when the app is mounted', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const cityTextBox = within(CitySearchDOM).queryByRole('textbox');

        await user.click(cityTextBox);

        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);


        const suggestionsListItems = within(CitySearchDOM).queryAllByRole('listitem');
        expect(suggestionsListItems).toHaveLength(allLocations.length + 1);
    });
});