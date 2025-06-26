import React, { useState } from 'react';
import { render } from '@testing-library/react';
import NumberOfEvents from '../src/components/NumberOfEvents';
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents />', () => {
    let getByRole, getByLabelText;

    beforeEach(() => {
        ({ getByRole, getByLabelText } = render(<NumberOfEvents />));
    });

    test('renders the component', () => {
        const label = getByLabelText('Number of Events:');
        expect(label).toBeInTheDocument();
    });

    test('renders input with default value of 32', () => {
        const input = getByRole('spinbutton');
        expect(input).toHaveValue(32);
    });

    test('updates input value when user types', async () => {
        const input = getByRole('spinbutton');
        const user = userEvent.setup();

        await user.clear(input);
        await user.type(input, '10');

        expect(input).toHaveValue(10);
    });

    test('calls setNumberOfEvents when input value changes', async () => {
        const input = getByRole('spinbutton');
        const user = userEvent.setup();

        await user.clear(input);
        await user.type(input, '{backspace}{backspace}10');

        expect(input).toHaveValue(10);
    });
});
