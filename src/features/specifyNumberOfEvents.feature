Feature: Specify Number of Events
    Scenario: Default number of events is 32
        Given the user has not specified a number of events
        When the user views the list of events
        Then 32 events should be displayed by default

