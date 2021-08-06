import { combineReducers } from "redux";
import backlogReducer from "./backlogReducer";
import alertReducer from "./alertReducer";
import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
  alerts: alertReducer,
  errors: errorReducer,
  project: projectReducer,
  backlog: backlogReducer,
  security: securityReducer
});
