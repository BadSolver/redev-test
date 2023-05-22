import { MyContext } from "ContextData";
import { Button } from "components";
import { Form } from "components/Form";
import React, { useContext } from "react";
import "./style.css";

export const Register = () => {
  const {
    showRegistrationData,
    onChangeName,
    onChangeSubName,
    onChangeEmail,
    onChangeNewPassword,
    name,
    subName,
    email,
    newPassword,
    registerData,
    onChangeGender,
    gender,
    onChangeChecked,
    checked,
  } = useContext(MyContext);

  const {
    registerName,
    registerSubName,
    registerEmail,
    registerPassword,
    registerGender,
  } = registerData;

  return (
    <form className="wrapper">
      <h3>Регистрация пользователя</h3>
      <Form
        placeholder="Введите ваше имя"
        name="name"
        value={name}
        onChange={onChangeName}
        type="text"
      />
      <Form
        placeholder="Введите вашу фамилию"
        name="name"
        value={subName}
        onChange={onChangeSubName}
        type="text"
      />
      <Form
        placeholder="Введите вашу почту"
        name="name"
        value={email}
        onChange={onChangeEmail}
        type="email"
      />
      <Form
        placeholder="Введите ваш пароль"
        name="name"
        value={newPassword}
        onChange={onChangeNewPassword}
        type="password"
      />
      <label>
        <select value={gender} onChange={onChangeGender}>
          <option value="man">Мужской</option>
          <option value="wooman">Женский</option>
        </select>
      </label>
      <label>
        С правилами ознакомлен
        <input type="checkbox" checked={checked} onChange={onChangeChecked} className="input-checkbox"/>
      </label>

      <Button text="Регистрация" onClick={showRegistrationData} />
      {registerName && registerSubName && registerEmail && registerPassword ? (
        <div>
          <h3>Проверьте введенные вами данные</h3>
          <ul>
            <li>Ваше имя: {registerName}</li>
            <li>Ваша фамилия: {registerSubName}</li>
            <li>Ваша почта: {registerEmail}</li>
            <li>Ваш пароль: {registerPassword}</li>
            <li>Ваш пол: {registerGender === "man" ? "Мужской" : "Женский"}</li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};
