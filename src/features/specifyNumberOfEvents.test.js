import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor } from '@testing-library/react';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    test('Default number of events is 32', ({ given, when, then }) => {
        let utils;

        given('the user has not specified a number of events', () => {
            // default state
        });

        when('the user views the list of events', () => {
            utils = render(<App />);
        });

        then('32 events should be displayed by default', async () => {
            await waitFor(() => {
                const eventItems = utils.getAllByTestId('event-item');
                expect(eventItems.length).toBeLessThanOrEqual(32);
            });
        });
    });
});