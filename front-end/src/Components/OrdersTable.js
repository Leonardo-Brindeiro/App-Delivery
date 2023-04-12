import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../Context/myContext';
import { genericRoutes } from '../Axios/AxiosRoutes';

function OrdersTable({ id, sellerId, saleDate, status }) {
  const { sellers, setUpdate3 } = useContext(Context);

  const sellerName = () => {
    if (sellers.length !== 0 && sellerId) {
      const seller = sellers.find((s) => s.id === sellerId);
      return seller.name;
    }

    return '';
  };

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

  const handleDeliveryBtn = () => {
    genericRoutes(`sales/orders/${id}`, 'put', { status: 'Entregue' });
    setUpdate3(true);
  };

  const dTStatus = 'customer_order_details__element-order-details-label-delivery-status';
  return (
    <table className="table table-bordered table-hover mt-2">
      <thead>
        <tr>
          <th>id</th>
          <th>vendedor</th>
          <th>data</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {`Pedido ${id}`}
          </td>
          <td
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {sellerName()}
          </td>
          <td
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            {formatedDate(saleDate)}
          </td>
          <td data-testid={ dTStatus }>{status}</td>
          <td>

            <button
              type="button"
              disabled={ status !== 'Em Trânsito' }
              data-testid="customer_order_details__button-delivery-check"
              onClick={ handleDeliveryBtn }
              className="btn btn-success"
            >
              MARCAR COMO ENTREGUE
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

OrdersTable.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  date: PropTypes.string,
  status: PropTypes.string,
  index: PropTypes.number,
}.isRequired;

export default OrdersTable;
