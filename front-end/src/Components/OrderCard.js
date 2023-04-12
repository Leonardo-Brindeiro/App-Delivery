import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function OrderCard({ id, status, saleDate, totalPrice }) {
  const formatedDate = (data) => {
    const fullDate = new Date(data);
    const date = fullDate.getDate();
    const month = fullDate.getMonth();
    const year = fullDate.getFullYear();

    if (`${date}`.length === 1 && `${month}`.length === 1) {
      return `0${date}/0${month + 1}/${year}`;
    }

    if (`${date}`.length === 1) {
      return `0${date}/${month + 1}/${year}`;
    }

    if (`${month}`.length === 1) {
      return `${date}/0${month + 1}/${year}`;
    }
  };

  return (
    <Link
      to={ `/customer/orders/${id}` }
      className="link rounded"
    >
      <div className="d-flex justify-content-between order-card">
        <p
          data-testid={ `customer_orders__element-order-id-${id}` }
          className="order-data"
        >
          {id}
        </p>
        <p
          data-testid={ `customer_orders__element-delivery-status-id-${id}` }
          className="order-data"
        >
          {status}
        </p>
        <p
          data-testid={ `customer_orders__element-order-date-${id}` }
          className="order-data"
        >
          {
            formatedDate(saleDate)
          }
        </p>
        <p
          data-testid={ `customer_orders__element-card-price-id-${id}` }
          className="order-data"
        >
          {`${totalPrice}`.replace('.', ',')}
        </p>
      </div>
    </Link>

  );
}

OrderCard.propTypes = {
  id: PropTypes.number,
  status: PropTypes.string,
  date: PropTypes.string,
  price: PropTypes.number,
}.isRequired;

export default OrderCard;
