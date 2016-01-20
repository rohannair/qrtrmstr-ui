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

const Home = () => {
  return (
    <div className="app">
      <div className="app-globals">
        <Header />
        <Sidebar />
        <Footer />
      </div>
      <div className="app-body">
        <UserList />
      </div>
    </div>
  );
};


export default Home;
