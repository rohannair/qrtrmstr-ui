const initialState = {
  users: {},
};

export default function app(state = initialState, { type, users }) {
  switch (type) {
  case 'USERS_RETRIEVED':
    return {
      ...state,
      users: users
    };
  default:
    return state;
  }
}
