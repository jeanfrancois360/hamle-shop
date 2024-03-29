import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Breadcrumb from './Breadcrumb';
import Footer from './Footer';
import Header from './Header';
import MobileMenu from './MobileMenu';

const Layout = ({
  children,
  parent,
  sub,
  subChild,
  noBreadcrumb,
  headerStyle,
}) => {
  const [isToggled, setToggled] = useState(false);
  const toggleClick = () => {
    setToggled(!isToggled);
    isToggled
      ? document.querySelector('body').classList.remove('mobile-menu-active')
      : document.querySelector('body').classList.add('mobile-menu-active');
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('isAuthenticated')) {
      setIsAuthenticated(localStorage.getItem('isAuthenticated'));
      setUser(JSON.parse(localStorage.getItem('user')));
      setToken(localStorage.getItem('token'));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Hémlè FC De Bokto</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/assets/imgs/logos/hemle-logo.svg" />
      </Head>

      {isToggled && (
        <div className="body-overlay-1" onClick={toggleClick}></div>
      )}

      <Header
        headerStyle={headerStyle}
        isToggled={isToggled}
        toggleClick={toggleClick}
        user={user}
        isAuthenticated={isAuthenticated}
        token={token}
      />
      <MobileMenu isToggled={isToggled} toggleClick={toggleClick} />
      <main className="main">
        <Breadcrumb
          parent={parent}
          sub={sub}
          subChild={subChild}
          noBreadcrumb={noBreadcrumb}
          user={user}
          isAuthenticated={isAuthenticated}
        />
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
