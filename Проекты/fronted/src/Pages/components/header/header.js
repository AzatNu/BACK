import { Button } from "../button/button";
import { Link } from "react-router-dom";
import header from './header.module.css'
import { useDispatch } from "react-redux";

export const Header = ({ title, buttonName, link, userMail }) => {

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: "GET_AUTH_USER__EMAIL", payload: [] });
    dispatch({ type: "AUTH_USER__SUCCESS", payload: [] });
  };

  return (
    <div className={header.header}>
      <h2>{title}</h2>
      <h3 title="Вы авторизованы как">{userMail?.getAuthUserEmail}</h3>
      {userMail?.getAuthUserEmail?.length > 1 && <button onClick={handleLogout}>Выход</button>}
      <Link to="/appeals"> <Button>Страница заявок</Button> </Link>
      <Link to={`/${link}`}>
        <Button>{buttonName}</Button>
      </Link>
    </div>
  );
};
