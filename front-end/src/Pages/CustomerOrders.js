import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import OrderCard from '../Components/OrderCard';
import { genericRoutes } from '../Axios/AxiosRoutes';

function CustomerOrders() {
  // const user = JSON.parse(localStorage.getItem('user'));
  const [sales, setSales] = useState([]);

  const getSales = async () => {
    const { data } = await genericRoutes('sales', 'get');
    setSales(data);
    return sales;
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div>
      <NavBar />
      {sales.map((sale) => (
        <OrderCard
          key={ sale.id }
          id={ sale.id }
          status={ sale.status }
          saleDate={ sale.saleDate }
          totalPrice={ sale.totalPrice }
        />
      ))}
      { /* Passar os props Id, Price, Status e date atraves de um map */}
    </div>
  );
}

export default CustomerOrders;
