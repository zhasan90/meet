Feature: End-to-end testing of event details
    Scenario: User can expand an event to see its details.
        Given the user is on the main page
        When the user clicks on an event to expand it
        Then the user should see the details of that event
    Scenario: User can collapse an event to hide details.
        Given the user has expanded an event to see its details
        When the user clicks on the event again to collapse it
        Then the user should not see the details of that event anymore
    Scenario: An event element is collapsed by default.
        Given the user is on the main page
        When the user has not clicked on any event
        Then the user should not see any event details