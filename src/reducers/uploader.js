const initialState = {
  loading: false,
  img: null
};

export default function uploader(state = initialState, action) {
  switch (action.type) {
  case 'UPLOAD_SUCCESSFUL':
    return {
      ...state,
      img: action.data
    };

  default:
    return state;
  }

};
