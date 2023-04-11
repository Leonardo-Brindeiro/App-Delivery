import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getLocalStorage, removeLocalStorage } from '../LocalStorage/localStorage';

function NavBar() {
  const [userName, setUserName] = useState('');
  const history = useHistory();
  const { role } = getLocalStorage('user');

  useEffect(() => { setUserName(getLocalStorage('user').name); }, []);

  const onClickLogout = () => {
    removeLocalStorage('user');
    history.push('/login');
  };

  const onClickProducts = () => {
    history.push('/customer/products');
  };

  const onClickOrders = () => {
    history.push(`/${role}/orders`);
  };

  return (
    <div className="products d-inline-flex navbar">
      <button
        type="button"
        onClick={ onClickProducts }
        data-testid="customer_products__element-navbar-link-products"
        className="w-25 navbar-btn btn btn-info"
      >
        Produtos
      </button>
      <button
        type="button"
        onClick={ onClickOrders }
        data-testid="customer_products__element-navbar-link-orders"
        className="w-25 navbar-btn btn btn-info"
      >
        Meus Pedidos
      </button>
      <h2
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {userName}
      </h2>
      <button
        type="button"
        onClick={ onClickLogout }
        data-testid="customer_products__element-navbar-link-logout"
        className="navbar-btn btn btn-danger"
      >
        Sair
      </button>
    </div>
  );
}

export default NavBar;
