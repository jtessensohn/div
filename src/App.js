// import clsx from 'clsx';
import React, { useReducer } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Search from './components/Search';
import Home from './pages/Home';
import { charIdReducer, charInfoReducer, userDataReducer } from './context/reducers.js'
import Char1 from './pages/Char1';

export const StoreContext = React.createContext()
export const ReducerContext = React.createContext()

function App() {
  const [userDataState, userDataDispatch] = useReducer(userDataReducer, {})
  const [charIdState, charIdDispatch] = useReducer(charIdReducer, [])
  const [charInfoState, charInfoDispatch] = useReducer(charInfoReducer, {})


  return (
    <StoreContext.Provider value={{
      userData: userDataState,
      charIdData: charIdState,
      charInfo: charInfoState,
    }}>
      <ReducerContext.Provider value={{ userDataDispatch, charIdDispatch, charInfoDispatch }}>
        <div className="App w-full h-full bg-yellow-100">
          <Router>
            <>
              <nav>
                <Link to='/'>
                  <h1 className='text-4xl text-center text-red-700'>&lt;div&gt;</h1>
                </Link>
              </nav>
            </>
            <Search />
            <Switch>
              <Route path={`/character/:characterId`}>
                <Char1 />
              </Route>
              <Route path='/' exact>
                <Home />
              </Route>
            </Switch>
          </Router>
        </div>
      </ReducerContext.Provider>
    </StoreContext.Provider>
  );
}

export default App;
