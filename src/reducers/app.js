const initialState = {
  users: {},
  showModal: false
};

export default function app(state = initialState, { type, users }) {
  switch (type) {
  case 'USERS_RETRIEVED':
    return {
      ...state,
      users: users
    };
  case 'TOGGLE_NEW_USER_MODAL':
    return {
      ...state,
      showModal: !state.showModal
    };
  default:
    return state;
  }
}
