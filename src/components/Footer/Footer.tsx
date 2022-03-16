import ChangeLanguage from "../Changelanguage/Changelanguage";

const Footer = () => {
  return (
    <div style={{padding: 30}}>
      <div style={{display: "flex", justifyContent: "flex-end"}}>
        <ChangeLanguage />
      </div>
    </div>
  );
};

export default Footer;
