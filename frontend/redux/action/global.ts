export const globalAction = (actionType: any, actionData: any) => {
  return {
    type: actionType,
    payload: actionData,
  };
};
