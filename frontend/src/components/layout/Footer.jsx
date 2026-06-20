import { APP_NAME } from "../../config/env";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <span>{APP_NAME}</span>
      <span>{year}</span>
    </footer>
  );
};

export default Footer;
