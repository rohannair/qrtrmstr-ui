const initialState = {
  users: [],
  showModal: false
};

export default function app(state = initialState, { type, users, new_user }) {
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

  case 'NEW_USER_CREATED':
    return {
      ...state,
      users: [
        ...state.users,
        new_user
      ]
    };

  default:
    return state;
  }
}
