import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "components/Header";
import DashboardWrapper from "containers/Dashboard";
import NotFound from "components/PageNotFound";
import CharacterDetails from "components/Details";
import './App.css'

export type AppContext = {
  favChars: string[];
  setFavChars: (value: string[]) => void;
};

export const MyContext = createContext<AppContext>({
  favChars: [],
  setFavChars: () => {},
});

function App() {
  const [favChars, setFavChars] = useState<string[]>([]);

  return (
    <MyContext.Provider value={{ favChars, setFavChars }}>
      <Router>
        <div className="app">
          <Header />
          <div className="app-body">
            <Switch>
              <Route exact path="/" component={DashboardWrapper} />
              <Route
                exact
                path="/character-details"
                component={CharacterDetails}
              />
              <Route path="" component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
