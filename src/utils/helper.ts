import { JWT } from "../interfaces/JWT";
import jwt_decode from "jwt-decode";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { AgentInfoDTO } from "../interfaces/AgentInfo";
import Bowser from "bowser";

export const getExpiredTime = (token: string): number => {
  if (!token) {
    return 1;
  }

  const decoded: JWT = jwt_decode(token);
  return new Date(decoded.exp * 1000).getTime() - new Date().getTime();
};

export const getUserTypeFromToken = (token: string): string => {
  if (!token) {
    return "";
  }
  const decoded: JWT = jwt_decode(token);
  return decoded.userId;
};

export const getMenuNumbers = (token: string): string[] => {
  if (!token) {
    return [];
  }

  const decoded: JWT = jwt_decode(token);
  
  return (
    decoded.menu ?? [
      "dashboard",
      "user_request",
      "profile",
      "bank_duty",
      "bank_duty_detail",
      "user_request_detail",
      "csr_eform",
      "duty_detail",
      "eform",
      "inquiries",
      "inquiries_detail",
      "request",
      "duty_search",
    ]
  );
};

export const getVisitorId = async (): Promise<string> => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  const visitorId = result.visitorId;
  return visitorId;
};

export const getUserAgentInformation = (): AgentInfoDTO => {
  const info = Bowser.parse(window.navigator.userAgent);  
  return {
    deviceType: info.platform.type ?? "",
    browserName: info.browser.name ?? "",
    osPlatform: info.os.name ?? "",
    appVersion: info.browser.version ?? "",
  };
};

export const ensureMaxLength = (
  text: string | undefined,
  maxLength: number
) => {
  if (!text || text.length <= maxLength) {
    return text ?? "";
  }

  return text.substring(0, maxLength);
};
