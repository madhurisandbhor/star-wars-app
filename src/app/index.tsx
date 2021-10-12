import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "components/Header";
import DashboardWrapper from "containers/Dashboard";
import NotFound from "components/PageNotFound";
import CharacterDetails from "components/Details";
import Theme from "theme";
import "./app.css";

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
      <Theme>
        <Router basename={process.env.PUBLIC_URL}>
          <div data-testid="app-id">
            <Header />
            <div>
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
      </Theme>
    </MyContext.Provider>
  );
}

export default App;
