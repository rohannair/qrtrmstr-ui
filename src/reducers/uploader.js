const initialState = {
  loading: false,
  img: null
};

export default function uploader(state = initialState, action) {
  switch (action.type) {
  case 'UPLOAD_SUCCESSFUL':
    return {
      ...state,
      img: action.data,
      loading: false
    };

  case 'DELETE_IMAGE':
    debugger;
    return {
      ...state,
      img: null
    };

  case 'UPLOAD_FAILED':
    return state;

  case 'SET_LOADING':
    return {
      ...state,
      loading: true
    };

  default:
    return state;
  }

};
