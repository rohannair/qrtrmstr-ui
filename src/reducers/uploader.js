import {
  UPLOAD_SUCCESS,
  UPLOAD_PENDING,
  UPLOAD_ERROR,
  UPLOAD_DELETE,
} from '../constants';


const initialState = {
  loading: false,
  img: null
};

export default function uploader(state = initialState, action) {
  switch (action.type) {
  case UPLOAD_SUCCESS:
    return {
      ...state,
      img: action.data,
      loading: false
    };

  case UPLOAD_ERROR:
    return state;

  case UPLOAD_PENDING:
    return {
      ...state,
      loading: true
    };

  case UPLOAD_DELETE:
    return {
      ...state,
      img: null
    };

  default:
    return state;
  }

};
