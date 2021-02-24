import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./Login/Login";
import Register from "./Register/register";
import Land from "./Landing/Land";
import Withdraw from "./Landing/postReq";
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/newuser" component={Register} />
          <Route exact path="/Landing" component={Land} />
          <Route exact path="/withdraw" component={Withdraw} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
