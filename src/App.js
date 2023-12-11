import { useLocation } from 'react-router-dom';
import './App.css';
import Footer from './pages/Footer';
import Header from './pages/Header';
import Menu_Left from './pages/Menu_Left';
import MenuAcc from './pages/MenuAcc';
import { UserContext } from './UserContext';
import { useState } from 'react';

function App(props) {
  const location = useLocation();
  const [tongqty, setQty] = useState();

  function loginContext(xx) {
    setQty(xx);
  }

  function renderMenu() {
    if (location.pathname.includes("account") || location.pathname.includes("profie")) {
      return <MenuAcc />;
    } else if (location.pathname.includes("payment") || location.pathname.includes("checkout")) {
      // Render Cart related content here
    }
   else if (location.pathname.includes("cart") ){
    // Render Cart related content here
  } 
    else if (location.pathname.includes("register")) {
      // Render Register related content here
    } else if (location.pathname.includes("login")) {
      // Render Login related content here
    } else if (location.pathname === "/") {
      // Hide Menu_Left on the home page
      return null;
    } else if (location.pathname.includes("pdf")) {
      // Hide Menu_Left on the PDFViewer page
      return null;
    } else {
      return <Menu_Left />;
    }
  }

  return (
    <>
      <UserContext.Provider value={{
        tongqty: tongqty,
        loginContext: loginContext
      }}>
        {/* Header component */}
        <Header />

        {/* Section with container and rows */}
        <section>
          <div className='container'>
            <div className='row'>
              {/* Render menu items */}
              {renderMenu()}

              {/* Display the content passed as children */}
              {props.children}
            </div>
          </div>
        </section>

        {/* Footer component */}
        <Footer />
      </UserContext.Provider> {/* Closing tag for UserContext.Provider */}
    </>
  );
}

export default App;
