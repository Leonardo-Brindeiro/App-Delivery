import React from 'react';
import PropTypes from 'prop-types';

function OrdersTableBody({ index, name, quantity, price, subtotal }) {
  return (
    <table className="table table-bordered table-hover table-striped">
      <tbody>
        <tr>
          <td
            data-testid={
              `customer_order_details__element-order-table-item-number-${index}`
            }
            className="number-item"
          >
            {index + 1}
          </td>
          <td
            data-testid={
              `customer_order_details__element-order-table-name-${index}`
            }
            className="name-item"
          >
            {name}
          </td>
          <td
            data-testid={
              `customer_order_details__element-order-table-quantity-${index}`
            }
            className="qty-item"
          >
            {quantity}
          </td>
          <td
            data-testid={
              `customer_order_details__element-order-table-unit-price-${index}`
            }
            className="price-item"
          >
            {`${price}`.replace('.', ',')}
          </td>
          <td
            data-testid={
              `customer_order_details__element-order-table-sub-total-${index}`
            }
          >
            {`${subtotal}`.replace('.', ',')}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

OrdersTableBody.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  subtotal: PropTypes.number,
}.isRequired;

export default OrdersTableBody;
