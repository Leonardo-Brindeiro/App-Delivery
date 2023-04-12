import React, { useCallback, useContext, useEffect, useState } from 'react';
import Context from '../Context/myContext';
import { getLocalStorage } from '../LocalStorage/localStorage';

function CheckoutTable() {
  const { totalPrice, setTotalPrice } = useContext(Context);
  const [cartItems, setCartItems] = useState();

  const getTotalPrice = useCallback(() => {
    const carrinho = getLocalStorage('carrinho');
    if (carrinho) {
      const total = carrinho.reduce((acc, cur) => +cur.subtotal + acc, 0);
      setTotalPrice(total.toFixed(2));
    }
  }, [setTotalPrice]);

  const removeItem = (itemId) => {
    const newSell = cartItems.filter((item) => {
      console.log(itemId);
      return item.id !== Number(itemId);
    });
    console.log(newSell);
    localStorage.setItem('carrinho', JSON.stringify(newSell));
    getTotalPrice();
    setCartItems(newSell);
  };

  useEffect(
    () => {
      setCartItems(getLocalStorage('carrinho'));
      getTotalPrice();
    },
    [getTotalPrice],
  );

  return (
    <div>
      <h1>Finalizar pedido</h1>
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {
            cartItems?.filter((i) => i.quantity !== 0).map((item, index) => (
              <tr key={ index }>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-name-${index}`
                  }
                >
                  {item.name}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  {item.quantity}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  {`${item.price}`.replace('.', ',')}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  {`${item.subtotal}`.replace('.', ',')}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-remove-${index}`
                  }
                >
                  <button
                    type="button"
                    value={ item.id }
                    onClick={ (ele) => removeItem(ele.target.value) }
                    className="btn btn-danger"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <p
        data-testid="customer_checkout__element-order-total-price"
        className="total-price"
      >
        {`${totalPrice}`.replace('.', ',')}
      </p>
    </div>
  );
}

export default CheckoutTable;
