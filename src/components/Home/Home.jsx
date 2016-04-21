// Deps
import React from 'react';

// Styles
import styles from './home.css';

// Containers
import UserList from '../../containers/UserList';

// Components
import Header from '../../components/Global/Header';
import Footer from '../../components/Global/Footer';
import Menu from '../../components/Global/Menu';

const Home = ({children}) => {
  return (
    <div className="app">
      <Header>
        <Menu />
      </Header>

      <div className="app-body">
        {children}
      </div>

      <Footer />
    </div>
  );
};


export default Home;
