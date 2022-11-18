import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import RecipeDetail from './components/RecipeDetail/RecipeDetail'
import CreateRecipe from './components/CreateRecipe/CreateRecipe';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path="/create-recipe" exact component={CreateRecipe} />
          <Route path='/recipes/:id' exact component={RecipeDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
