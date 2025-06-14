import mockData from "./mock-data.js";
export const extractLocations = (events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
};

export const getEvents = async () => {
    return mockData;
};