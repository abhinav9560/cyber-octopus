export const authentication = (actionType, actionData) => {
  return {
    type: actionType,
    payload: actionData,
  };
};
