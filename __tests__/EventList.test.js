import React from "react";
import { render, waitFor, within } from "@testing-library/react";
import EventList from "../src/components/EventList";
import { getEvents } from "../src/api";
import App from "../src/App";

describe('<EventList /> component', () => {
    let EventListComponent
    beforeEach(() => {
        EventListComponent = render(<EventList />);
    });
    test('has an element with "list" role', () => {
        expect(EventListComponent.queryByRole('list')).toBeInTheDocument();
    });
    test('renders correct number of events', async () => {
        const allEvents = await getEvents();
        EventListComponent.rerender(<EventList events={allEvents} />);
        expect(EventListComponent.getAllByRole('listitem')).toHaveLength(allEvents.length);
    });

    describe('<EventList /> integration', () => {
        test('renders a list of 32 events when the app is mounted and rendered', async () => {
            const AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppComponent.container.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        })
    })
});
