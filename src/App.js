import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';


import { CustomersListContainer } from "./pages/customerslist/CustomersListContainer";
import { CustomerEditContainer } from "./pages/customerEdit/CustomerEditContainer";
import { CounterContainer } from "./pages/counter/CounterContainer";
import { ProductsListContainer } from "./pages/productList/ProductsListContainer";
import { AppMenu } from "./AppMenu";

function App() {
  return (
    <Router>
      <div>
        <AppMenu />
        <div>
          <Switch>
            <Route path="/CustomerList" component={CustomersListContainer} />
           
            <Route path="/ProductList" component={ProductsListContainer} />
            <Route path="/counter" component={CounterContainer} />
            <Route path="/customerEdit/:customerId" render={(props) => <CustomerEditContainer {...props.match.params} />} />
            <Route path="/" component={CustomersListContainer} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;