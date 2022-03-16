import { BsCalendar3, BsFillPersonFill } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { GrSupport } from "react-icons/gr";

import { logout } from "../../pages/Login/LoginSlice";
import msalInstance from "../../utils/auth/msal";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../stores/Store";
import { LocalStorageKey } from "../../configs/consts";
import { useTranslation } from "react-i18next";
export const Setting = () => {
  const navigate = useNavigate();
  const aadToken = useAppSelector((state) => state.user.aadToken);
  const dispatch = useAppDispatch();
  const {t} = useTranslation()
  const onLogout = async () => {
    if (aadToken) {
      await msalInstance.logoutPopup();
    }
    // await dispatch(logout());
    localStorage.removeItem(LocalStorageKey.TOKEN);
    localStorage.removeItem(LocalStorageKey.REFRESH_TOKEN);
    localStorage.removeItem(LocalStorageKey.AAD_TOKEN);
    window.location.reload();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ marginLeft: "15px", fontSize: "14px", marginTop: "5px" }}>
        Welcome!
      </span>

      <div className="action-setting">
        <BsFillPersonFill style={{ fontSize: "20px" }} />
        <span style={{ marginLeft: "15px", fontSize: "14px" }}>{t(`menusetting.profile`)}</span>
      </div>

      <div className="action-setting">
        <AiOutlineSetting style={{ fontSize: "20px" }} />
        <span style={{ marginLeft: "15px", fontSize: "14px" }}>{t(`menusetting.setting`)}</span>
      </div>
      <div className="action-setting">
        <BsCalendar3 style={{ fontSize: "20px" }} />
        <span style={{ marginLeft: "15px", fontSize: "14px" }}>{t(`menusetting.support`)}</span>
      </div>
      <div className="action-setting">
        <GrSupport style={{ fontSize: "20px" }} />
        <span style={{ marginLeft: "15px", fontSize: "14px" }}>{t(`menusetting.activity`)}</span>
      </div>
      <div className="action-logout" onClick={onLogout}>
        <BiLogOut style={{ fontSize: "20px" }} />
        <span style={{ marginLeft: "15px", fontSize: "14px" }}>{t(`menusetting.logout`)}</span>
      </div>
    </div>
  );
};
