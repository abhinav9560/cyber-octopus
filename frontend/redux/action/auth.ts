export const authAction = (actionType: any, actionData: any) => {
  return {
    type: actionType,
    payload: actionData,
  };
};
