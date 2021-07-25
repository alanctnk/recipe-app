import { RECIPESDONE } from '../actions/index';

const initialState = {
  itens: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case RECIPESDONE:
    return {
      ...payload,
    };

  default:
    return state;
  }
};
