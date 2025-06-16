import React from 'react';
import Event from '../src/components/Event';
import { render } from '@testing-library/react';
import mockData from '../src/mock-data';
import userEvent from '@testing-library/user-event';


describe('<Event /> ', () => {
    test('renders event details when "Show Details" is clicked', async () => {
        const event = mockData[0];
        const user = userEvent.setup();
        const EventComponent = render(<Event event={event} />);
        // const { getByText, queryByText } = render(<Event event={event} />);

        expect(EventComponent.queryByText(event.description)).not.toBeInTheDocument();

        const button = EventComponent.getByText('Show Details');
        await user.click(button);

        const details = EventComponent.container.querySelector('.details');
        expect(details).toBeInTheDocument();

        const button2 = EventComponent.getByText('Hide Details');
        await user.click(button2);

        // const details2 = EventComponent.container.querySelector('.details');
        expect(details).not.toBeInTheDocument();
    })

})