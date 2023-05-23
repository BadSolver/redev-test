import { MyContext } from "ContextData";
import { Button, CustomInput } from "components";
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
    <form className="wrapper" onSubmit={showRegistrationData}>
      <h3>Регистрация пользователя</h3>
      <CustomInput
        placeholder="Введите ваше имя"
        value={name}
        onChange={onChangeName}
        type="text"
      />
      <CustomInput
        placeholder="Введите вашу фамилию"
        value={subName}
        onChange={onChangeSubName}
        type="text"
      />
      <CustomInput
        placeholder="Введите вашу почту"
        value={email}
        onChange={onChangeEmail}
        type="email"
      />
      <CustomInput
        placeholder="Введите ваш пароль"
        value={newPassword}
        onChange={onChangeNewPassword}
        type="password"
      />
      <label>
        <select value={gender} onChange={onChangeGender}>
          <option value="nothin">Не выбрано</option>
          <option value="man">Мужской</option>
          <option value="wooman">Женский</option>
        </select>
      </label>
      <label>
        С правилами ознакомлен
        <input
          type="checkbox"
          checked={checked}
          onChange={onChangeChecked}
          className="input-checkbox"
        />
      </label>

      <Button text="Регистрация" onClick={() => {}} type="submit" />
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
