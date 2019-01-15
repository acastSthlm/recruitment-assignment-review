const episodesReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_EPISODES":
      return [...state, ...action.episodes];
    default:
      return state;
  }
};

export default episodesReducer;
