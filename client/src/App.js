
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Menu from './components/Menu'
import Login from './components/Login';
import Signup from './components/Signup';
import Errorpage from './components/Errorpage';
import PageLayout from './components/PageLayout';
import Logout from './components/Logout';
import { createContext, useReducer } from 'react';

import { initialState, reducer } from './components/reducer/UseReducer';
import Cart from './components/Cart';
import Order from './components/Order';
import AdminPageLayout from './components/admin/AdminPageLayout';
import AdminHome from './components/admin/AdminHome';
import Users from './components/admin/Users';
import AdminAbout from './components/admin/AdminAbout';
import Edit from './components/Edit';
import { ContextReducer } from './components/reducer/ContextReducer';
import Orders from './components/admin/Orders';
import Messages from './components/admin/Messages';
import Foods from './components/admin/Foods';


const Routing = () => {
  return (
    <ContextReducer>
      <Routes>
        <Route element={<PageLayout />}>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/order' element={<Order />} />
          <Route exact path='cart' element={<Cart />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/menu' element={<Menu />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/logout' element={<Logout />}></Route>
          <Route exact path='/edit/:id' element={<Edit />} />
        </Route>
        <Route element={<AdminPageLayout />}>
          <Route exact path='/admin' element={<AdminHome />} />
          <Route exact path='/adminAbout' element={<About />} />
          <Route exact path='/users' element={<Users />} />
          <Route exact path='/users' element={<AdminAbout />} />
          <Route exact path='/userOrders' element={<Orders />} />
          <Route exact path='/userMessages' element={<Messages />} />
          <Route exact path='/foods' element={<Foods />} />


        </Route>
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </ContextReducer>
  )
}

//Context API
export const UserContext = createContext();

function App() {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Routing />
      </UserContext.Provider>
    </>
  );
}

export default App;
