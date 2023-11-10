import { useLocation } from 'react-router-dom';
import './App.css';
import Footer from './pages/Footer';
import Header from './pages/Header';
import Menu_Left from './pages/Menu_Left';
import MenuAcc from './pages/MenuAcc';
import Menu_right from './pages/Menu_right';

function App(props) {
  let params1 = useLocation();

  function renderMenu() {
    if (params1.pathname.includes("account")) {
      return <MenuAcc />;
    } 
    else if (params1.pathname.includes("profie")) {
      return <MenuAcc />;
    } else if (params1.pathname.includes("cart")) {
      // Render Cart related content here
    } 
    else if (params1.pathname.includes("checkout")) {
      // Render Cart related content here
    } 
    else if (params1.pathname.includes("register")) {
      // Render Register related content here
    } else if (params1.pathname.includes("login")) {
      // Render Login related content here
    } else if (params1.pathname === "/") {
      // Hide Menu_Left on the home page
      return null;
    } else {
      return <Menu_Left />;
    }
  }

  return (
    <div>
      <Header />
      <section>
        <div className='container'>
          <div className='row'>
            {renderMenu()}
            
            {/* Hiển thị trang tương ứng */}
            {props.children}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
