import React from "react";
import { useTranslation } from "react-i18next";
import { Languages, LocalStorageKey } from "../../configs/consts";
import { setLocale } from "../../pages/Login/LoginSlice";
import { useAppDispatch } from "../../stores/Store";
import "./Changelanguage.scss"

const ChangeLanguage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  // const [language, setLanguage] = React.useState(
  //   parseInt(localStorage.getItem(LocalStorageKey.LANGUAGE) ?? "1")
  // );
  const changeLanguage = (id: number) => {
    // setLanguage(id);
    const language = Languages.find((l) => l.id === id);
    i18n.changeLanguage(language?.shortName);
    localStorage.setItem(LocalStorageKey.LANGUAGE, id.toString());
    dispatch(setLocale({ locale: id.toString() }));
  };
  return (
    <div>
      <select
        className="select"
        onChange={(e) => changeLanguage(parseInt(e.target.value))}
      >
        {Languages.map((option) => (
          <option
            className="option-select"
            key={option.id}
            value={option.id.toString()}
          >
            {t(`language.${option.name}`)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChangeLanguage;
