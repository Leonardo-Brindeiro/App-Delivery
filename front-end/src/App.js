import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Customer from './Pages/Customer';
import Checkout from './Pages/Checkout';
import CustomerOrders from './Pages/CustomerOrders';
import CustomerOrdersDetails from './Pages/CustomerOrdersDetails';
import AdminManager from './Pages/AdminManager';
import SellerOrders from './Pages/SellerOrders';
import SellerOrdersDetails from './Pages/SellerOrdersDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={ () => <Redirect to="/login" /> } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ Customer } />
      <Route exact path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/orders" component={ CustomerOrders } />
      <Route exact path="/customer/orders/:id" component={ CustomerOrdersDetails } />
      <Route exact path="/admin/manage" component={ AdminManager } />
      <Route exact path="/seller/orders" component={ SellerOrders } />
      <Route exact path="/seller/orders/:id" component={ SellerOrdersDetails } />
    </Switch>
  );
}

export default App;
