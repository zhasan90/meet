import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loadFeature, defineFeature } from 'jest-cucumber';
import mockData from '../mock-data';
import Event from '../components/Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let utils;
  const event = mockData[0];

  test('An event element is collapsed by default.', ({ given, when, then }) => {
    given('the user is on the main page', () => {
      utils = render(<Event event={event} />);
    });

    when('the user has not clicked on any event', () => {
      // no action needed
    });

    then('the user should not see any event details', () => {
      expect(utils.queryByText(event.description)).toBeNull();
    });
  });

  test('User can expand an event to see its details.', ({ given, when, then }) => {
    given('the user is on the main page', () => {
      utils = render(<Event event={event} />);
    });

    when('the user clicks on an event to expand it', async () => {
      const user = userEvent.setup();
      const button = utils.getByText('Show Details');
      await user.click(button);
    });

    then('the user should see the details of that event', () => {
       expect(utils.queryByText('Hide Details')).toBeInTheDocument();
    });
  });

    test('User can collapse an event to hide details.', ({ given, when, then }) => {
    given('the user has expanded an event to see its details', async () => {
      utils = render(<Event event={event} />);
      const user = userEvent.setup();
      const showButton = utils.queryByText('Show Details');
      await user.click(showButton);
    });

    when('the user clicks on the event again to collapse it', async () => {
      const user = userEvent.setup();
      const hideButton = utils.queryByText('Hide Details');
      await user.click(hideButton);
    });

    then('the user should not see the details of that event anymore', () => {
      expect(utils.queryByText("Hide Details")).not.toBeInTheDocument();
    });
  });

});

// import React from 'react';
// import { loadFeature, defineFeature } from 'jest-cucumber';

// const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

// defineFeature(feature, test => {
//     test("User can expand an event to see its details.", ({ given, when, then }) => {
//         given("the user is on the main page", async () => {

//         });
//         when("the user clicks on an event to expand it", async () => {
            
//         });
//         then("the user should see the details of that event", async () => {

//         });

//     });
// });