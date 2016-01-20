const initialState = {
  token: null
};

export default function accountActions(state = initialState, { type, token }) {
  switch (type) {
  case 'LOG_IN':
    return {
      ...state,
      token
    };
  case 'LOG_OUT':
    return {
      ...state,
      token: null
    };
  default:
    return state;
  }

};
