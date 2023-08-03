export const tempAction = (actionType: any, actionData: any) => {
  return {
    type: actionType,
    payload: actionData,
  };
};
