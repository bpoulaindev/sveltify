import { w as writable } from "./index2.js";
const userProfileStore = writable(null);
const tokenStore = writable(null);
export {
  tokenStore as t,
  userProfileStore as u
};
