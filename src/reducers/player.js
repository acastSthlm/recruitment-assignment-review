const episodesReducer = (state = {}, action) => {
  switch (action.type) {
    case "START_EPISODE":
      return { ...state, currentEpisode: action.index };
    default:
      return state;
  }
};

export default episodesReducer;
