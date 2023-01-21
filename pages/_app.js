/* eslint-disable no-prototype-builtins */
import { useEffect, useState } from 'react';
// import "react-input-range/lib/css/index.css";
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
import 'react-responsive-modal/styles.css';
// import WOW from 'wowjs';
// Swiper Slider
import 'swiper/css';
import 'swiper/css/navigation';
import StorageWrapper from '../components/ecommerce/storage-wrapper';
import '../public/assets/css/main.css';
import store from '../redux/store';
import Preloader from './../components/elements/Preloader';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [wasCalled, setWasCalled] = useState(false);
  useEffect(() => {
    setLoading(true);
    // Get user location
    let defaultExists = localStorage.getItem('default_currency');
    if (defaultExists === null) {
      getLocation();
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    // new WOW.WOW({
    //     live: false
    //   }).init()
  }, []);

  const getLocation = () => {
    let chosenCurrency = localStorage.getItem('default_currency');
    let counter = 0;
    let token = 'e46cc087c50c0e'
    const settings = {
      async: true,
      crossDomain: true,
      method: 'GET',
      processData: false,
    };

    if (chosenCurrency === null && wasCalled === false) {
      counter++;
      console.log('counter:', wasCalled);
      setWasCalled(true);
      fetch(`https://ipinfo.io/json?token=${token}`, settings)
        .then(function (response) {
          return response.json();
        })
        .then(function (payload) {
          setWasCalled(true);
          if (payload.hasOwnProperty('country')) {
            if(payload.country != 'CM'){
            localStorage.setItem('default_currency', 'USD');
            }
            else{
              localStorage.setItem('default_currency', 'XAF');
            }
            return true;
          } else {
            localStorage.setItem('default_currency', 'XAF');
            return true;
          }
        });
    } else {
      localStorage.setItem('default_currency', chosenCurrency);
    }
  }


  return (
    <>
      {!loading ? (
        <Provider store={store}>
          <StorageWrapper>
            <Component {...pageProps} />
            <ToastContainer />
          </StorageWrapper>
        </Provider>
      ) : (
        <Preloader />
      )}
    </>
  );
}

export default MyApp;
