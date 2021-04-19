export const userDataReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERDATA":
      return action.payload;
    default:
      return state
  }
}

export const charIdReducer = (state, action) => {
  switch (action.type) {
    case "SET_CHARID":
      return action.payload;
    default:
      return state
  }
}

export const charInfoReducer = (state, action) => {
  switch (action.type) {
    case "SET_CHARINFO":
      return action.payload;
    default:
      return state
  }
}
