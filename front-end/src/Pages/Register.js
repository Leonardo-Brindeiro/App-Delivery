import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context/myContext';
import { genericRoutes } from '../Axios/AxiosRoutes';
import { setLocalStorage } from '../LocalStorage/localStorage';

function Register() {
  const {
    setNewUser,
    setStateBtn,
    newUser,
    stateBtn,
    errorStatus,
    setErrorStatus } = useContext(Context);

  const history = useHistory();

  const verifyValues = () => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const nameMin = 11;
    const numberMin = 5;
    const validateEmail = newUser.email.match(emailRegex);
    const validatePassword = newUser.password.length > numberMin;
    const validateName = newUser.name.length > nameMin;
    if (validateEmail && validatePassword && validateName) return setStateBtn(false);
    return setStateBtn(true);
  };

  const onChangeForms = ({ target: { value, name } }) => {
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleButton = async () => {
    const statusHTTPConflict = 409;
    const { data, status } = await genericRoutes('register', 'post', newUser);
    const { name, email } = newUser;
    setLocalStorage('user', { name, email, role: 'customer', token: data });
    if (status === statusHTTPConflict) return setErrorStatus(true);
    history.push('/customer/products');
  };

  useEffect(() => verifyValues());

  return (
    <div className="d-flex flex-column align-items-center align-self-center register">
      <h1>Cadastro</h1>
      <label htmlFor="name">
        {'Nome: '}
        <input
          data-testid="common_register__input-name"
          type="text"
          name="name"
          placeholder="Digite seu nome"
          onChange={ onChangeForms }
          className="rounded"
        />
      </label>
      <br />
      <label htmlFor="email">
        {'E-mail: '}
        <input
          data-testid="common_register__input-email"
          type="email"
          name="email"
          placeholder="Digite seu email"
          onChange={ onChangeForms }
          className="rounded"
        />
      </label>
      <br />
      <label htmlFor="password">
        {'Senha: '}
        <input
          data-testid="common_register__input-password"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          onChange={ onChangeForms }
          className="rounded"
        />
      </label>
      <br />
      <button
        data-testid="common_register__button-register"
        type="button"
        onClick={ handleButton }
        disabled={ stateBtn }
        className="btn btn-primary btn-lg"
      >
        Cadastre-se
      </button>
      {errorStatus
        && (
          <h3
            data-testid="common_register__element-invalid_register"
          >
            Esse usuário ja existe
          </h3>
        )}
    </div>
  );
}

export default Register;
