import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { genericRoutes } from '../Axios/AxiosRoutes';
import Context from '../Context/myContext';
import { getLocalStorage } from '../LocalStorage/localStorage';

function CheckoutDetails() {
  const { totalPrice, sellers, orders, setOrders, getSellers } = useContext(Context);

  const history = useHistory();

  const onChangeForms = ({ target: { value, name } }) => {
    setOrders((prevOrders) => ({
      ...prevOrders,
      [name]: value,
    }));
  };

  const handleButton = async () => {
    const userToken = getLocalStorage('user').token;

    const carrinho = getLocalStorage('carrinho');

    const { data } = await genericRoutes('sales', 'post', {
      ...orders, totalPrice,
    }, { headers: { Authorization: userToken } });

    await genericRoutes('sales/products', 'post', {
      carrinho, saleId: data.id,
    });

    history.push(`/customer/orders/${data.id}`);
  };

  useEffect(() => {
    getSellers();
  }, []);

  return (
    <div className="form-checkout">
      <h1>Detalhes e Endereço para Entrega</h1>
      <div className="d-flex">
        <label htmlFor="seller">
          P. vendedora responsável:
          <select
            name="sellerId"
            id="seller"
            data-testid="customer_checkout__select-seller"
            onChange={ onChangeForms }
          >
            {sellers.map(({ id, name }, index) => (
              <option key={ index } value={ id }>
                {name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label htmlFor="address">
          Endereço:
          <input
            name="deliveryAddress"
            type="text"
            data-testid="customer_checkout__input-address"
            onChange={ onChangeForms }
            className="form-control"
          />
        </label>
        <label htmlFor="number">
          Número:
          <input
            name="deliveryNumber"
            type="number"
            data-testid="customer_checkout__input-address-number"
            onChange={ onChangeForms }
            className="form-control"
          />
        </label>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ handleButton }
          className="btn btn-success"
        >
          FINALIZAR PEDIDO
        </button>
      </div>
    </div>
  );
}

export default CheckoutDetails;
