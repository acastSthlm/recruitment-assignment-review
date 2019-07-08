import { combineReducers } from "redux";
import episodesReducer from "./episodes";
import playerReducer from "./player";

export default combineReducers({ episodes: episodesReducer, player: playerReducer });
