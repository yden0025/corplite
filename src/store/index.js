import { createStore, combineReducers } from "redux";

let initialState = {
  address: {
    geolocation: {
      lat: "",
      long: "",
    },
    city: "",
    street: "",
    number: 0,
    zipcode: "",
  },
  id: 0,
  email: "",
  username: "",
  password: "",
  name: {
    firstname: "",
    lastname: "",
  },
  phone: "",
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return payload;
    case "UPDATE":
      return { ...state, ...payload };
    default:
      return state;
  }
};

const store = createStore(combineReducers({ user: userReducer }));

export default store;
