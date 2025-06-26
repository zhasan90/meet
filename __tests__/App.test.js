import { render } from "@testing-library/react";
import React from "react";
import App from "../src/App.jsx";

describe("<App/> component", () => {
    let AppDOM;
    beforeEach(() => {
        AppDOM = render(<App />).container.firstChild;
    });
    test('renders list of events', () => {
        expect(AppDOM.querySelector('#events-list')).toBeInTheDocument();
    });
    test('renders CitySearch', () => {
        expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
    });
    test('renders number of events', () => {
        expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
    });
});