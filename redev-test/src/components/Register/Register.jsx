import { Button, CustomInput } from "components";
import React, { useState } from "react";
import "./style.css";

export const Register = () => {
  const [name, setName] = useState("");
  const [subName, setSubName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [gender, setGender] = useState("");
  const [registerData, setRegisterData] = useState({
    registerName: name,
    registerSubName: subName,
    registerEmail: email,
    registerPassword: newPassword,
    registerGender: gender,
  });
  const [checked, setChecked] = useState(false);
  const onChangeChecked = () => {
    setChecked(!checked);
  };
  const onChangeGender = (e) => {
    setGender(e.target.value);
  };
  const onChangeName = (e) => {
    const str = e.target.value.toLowerCase().trim();
    const validStr = str.slice(0, 1).toUpperCase() + str.slice(1);
    setName(validStr);
  };
  const onChangeSubName = (e) => {
    const str = e.target.value.toLowerCase().trim();
    const validStr = str.slice(0, 1).toUpperCase() + str.slice(1);
    setSubName(validStr);
  };
  const onChangeEmail = (e) => {
    const str = e.target.value.toLowerCase().trim();
    const validStr = str.slice(0, 1).toUpperCase() + str.slice(1);
    setEmail(validStr);
  };

  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value.trim());
  };
  const showRegistrationData = (e) => {
    e.preventDefault();
    if (name.length < 2 || name.length >= 20) {
      alert("Имя должно содержать от 2 до 20 символов");
      return;
    } else if (subName.length < 2 || subName.length >= 20) {
      alert("Фамилия должна содержать от 2 до 20 символов");
      return;
    } else if (email.length < 3 || newPassword.length >= 30) {
      alert("Почта должна содержать от 3 до 30 символов");
      return;
    } else if (newPassword.length < 6 || newPassword.length >= 20) {
      alert("Пароль должен содержать от 6 до 20 символов");
      return;
    } else if (gender.length === 0) {
      alert("Пожалуйста выберите ваш пол");
      return;
    } else if (checked === false) {
      alert("Ознакомьтесь пожалуйста с правилами портала");
      return;
    } else {
      setRegisterData({
        registerName: name,
        registerSubName: subName,
        registerEmail: email,
        registerPassword: newPassword,
        registerGender: gender,
      });
      setName("");
      setSubName("");
      setEmail("");
      setNewPassword("");
    }
  };

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
