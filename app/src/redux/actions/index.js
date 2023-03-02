export const SAVE_USER = "SAVE USER";
export const SAVE_USERS = "SAVE USERS";

export const SAVE_TOKEN = "SAVE_TOKEN";
export const FETCH_MENU = "FETCH_MENU";
export const FETCH_CATS = "FETCH_CATS";
const apiUrl = process.env.REACT_APP_BE_URL;

export const saveUserAction = (user) => {
  return {
    type: SAVE_USER,
    payload: user,
  };
};

export const fetchCatsAction = (accessToken) => {
  return async (dispatch, getState) => {
    try {
      const fetchCatsOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(
        `${apiUrl}/dishes/category`,
        fetchCatsOptions
      );
      const fetchedCats = await response.json();
      dispatch({ type: FETCH_CATS, payload: fetchedCats });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserAction = (accessToken) => {
  return async (dispatch, getstate) => {
    try {
      const fetchMenuOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(`${apiUrl}/users/`, fetchMenuOptions);
      if (response.ok) {
        const fetchedData = await response.json();
        dispatch({ type: SAVE_USERS, payload: fetchedData });
        saveTokenAction(fetchedData.accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const saveTokenAction = (token) => {
  return {
    type: SAVE_TOKEN,
    payload: token,
  };
};

export const fetchMenuAction = (accessToken) => {
  return async (dispatch, getstate) => {
    try {
      const fetchMenuOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(`${apiUrl}/dishes`, fetchMenuOptions);
      if (response.ok) {
        const fetchedData = await response.json();
        dispatch({ type: FETCH_MENU, payload: fetchedData });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
