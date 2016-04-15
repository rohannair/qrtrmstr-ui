// Deps
import React from 'react';

// Styles
import styles from './home.css';

// Containers
import UserList from '../../containers/UserList';

// Components
import Header from '../../components/Global/Header';
import Footer from '../../components/Global/Footer';
import Sidebar from '../../components/Global/Sidebar';

const Home = ({children}) => {
  return (
    <div className="app">
      <div className="app-globals">
        <Header />
        <Sidebar />
      </div>
      <div className="app-body">
        {children}
      </div>
    </div>
  );
};


export default Home;
