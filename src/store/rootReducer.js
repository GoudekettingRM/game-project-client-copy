import { combineReducers } from "redux";
import user from "./user/reducer.js";

export default combineReducers({
  session: user
});
