// constants/activity.constants.js

export const ACTIVITY_TYPE = {
  CHECKOUT: 0,
  CHECKIN: 1,
  FORM_SUBMIT: 2,
  FORM_UPDATE: 3,
  RE_CHECKOUT: 4,
  RE_CHECKIN: 5,
};
export const ACTIVITY_MAP = {
  0: "CHECKOUT",
  1: "CHECKIN",
  4: "RE_CHECKOUT",
  3: "RE_CHECKIN",
  5: "FORM_SUBMIT",
};

export const ACTIVITY_SOURCE = {
  MANUAL: "MANUAL",
  AUTO: "AUTO",
  SYSTEM: "SYSTEM",
};
