import { IFunctionGroup } from "../providers/AuthProvider";

export const hasPermissionOn = (menuNumbers: IFunctionGroup[], resourceId: string, actionId: string) => {
  let index = -1;
  if (!actionId) {
    index = menuNumbers.findIndex((e: IFunctionGroup) => {
      return e.functionName === resourceId && e.permission === actionId;
    });
  } else {
    index = menuNumbers.findIndex((e: IFunctionGroup) => {
      return e.functionName === resourceId && e.permission.includes(actionId);
    });
  }
  if (index < 0) return false;
  return true;
};
