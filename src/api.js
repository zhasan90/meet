import mockData from "./mock-data.js";


export const extractLocations = (events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
};

const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
        'https://q13rgiwvbc.execute-api.eu-central-1.amazonaws.com/dev/api/get-access-token' + '/' + encodeCode
    );
    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);


    return access_token;
};

const removeQuery = () => {
    let newurl;
    if (window.history.pushState && window.location.pathname) {
        newurl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname;
        window.history.pushState("", "", newurl);
    } else {
        newurl = window.location.protocol + "//" + window.location.host;
        window.history.pushState("", "", newurl);
    }
};

const checkToken = async (accessToken) => {
    const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
};

export const getEvents = async () => {
    if (window.location.href.startsWith("http://localhost")) {
        return mockData;
    }

    const token = await getAccessToken();

    if (token) {
        removeQuery();
        const url = "https://q13rgiwvbc.execute-api.eu-central-1.amazonaws.com/dev/api/get-calendar-events" + "/" + token;
        const response = await fetch(url);
        const result = await response.json();
        if (result) {
            return result.events;
        } else return null;
    }
};

export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));


    if (!accessToken || tokenCheck.error) {
        await localStorage.removeItem("access_token");
        const searchParams = new URLSearchParams(window.location.search);
        const code = await searchParams.get("code");
        if (!code) {
            const response = await fetch(
                "https://q13rgiwvbc.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
            );
            const result = await response.json();
            const { authUrl } = result;
            return (window.location.href = authUrl);
        }
        return code && getToken(code);
    }
    return accessToken;
};

// breakdown of what’s happening line 14 to 31:

// The code checks whether an access token was found.
// If no token is found (!accessToken), the code then checks for an authorization code.
// If no authorization code is found (!code), the user is automatically redirected to the Google Authorization screen, where they can sign in and receive their code.