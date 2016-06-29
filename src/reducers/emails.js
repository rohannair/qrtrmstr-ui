const defaultState = {
  list: [],
  total: 0
};

export default function emails(state = defaultState, action) {

  switch (action.type) {

  case 'EMAILS_RETRIEVED':
    return {
      ...state,
      list: action.payload.results,
      total: action.payload.total
    };

  default:
    return state;
  }
}
