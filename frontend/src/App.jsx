import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Parties from './pages/Parties';
import PartyDetails from './pages/PartyDetails';
import Images from './pages/Images';
import History from './pages/History';
import ProductDetails from './pages/ProductDetails';
import SalesInvoice from './pages/SalesInvoice';
import Sales from './pages/Sales';
import Purchase from './pages/Purchase';
import PurchaseBill from './pages/PurchaseBill';
import Expense from './pages/Expense';
import SalesPreview from './pages/SalesPreview';
import Settings from './pages/Settings';
import Bank from './pages/Bank';
import PurchasePreview from './pages/PurchasePreview';
import Reports from './pages/Reports';


import { useEffect, useState } from 'react';
import RefrshHandler from './RefreshHandler';

const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" />
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme');
    return (stored === 'dark' || stored === 'light') ? stored : 'light';
  });

  useEffect(() => {
    const next = theme === 'dark' ? 'theme-dark' : 'theme-light';
    const body = document.body;
    body.classList.remove('theme-dark', 'theme-light');
    body.classList.add(next);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/home'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}
              element={<Home section="home" theme={theme} onToggleTheme={toggleTheme} />}
            />
          }
        />
        <Route
          path='/inventory'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}
              element={<Home section="inventory" theme={theme} onToggleTheme={toggleTheme} />}
            />
          }
        />
        <Route
          path='/inventory/:id'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}
              element={<ProductDetails theme={theme} onToggleTheme={toggleTheme} />}
            />
          }
        />
        <Route
          path='/parties'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}
              element={<Parties theme={theme} onToggleTheme={toggleTheme} />}
            />
          }
        />
        <Route
          path='/parties/:id'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}
              element={<PartyDetails theme={theme} onToggleTheme={toggleTheme} />}
            />
          }
        />
        <Route
          path='/images'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}
              element={<Images theme={theme} onToggleTheme={toggleTheme} />}
            />
          }
        />
        <Route
          path='/history'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}
              element={<History theme={theme} onToggleTheme={toggleTheme} />}
            />
          }
        />
        <Route
          path='/sales'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}
              element={<Sales theme={theme} onToggleTheme={toggleTheme} />}
            />
          }
        />
        <Route
          path='/sales/create'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}
              element={<SalesInvoice theme={theme} onToggleTheme={toggleTheme} />}
            />
          }
        />
        <Route
          path='/sales/edit/:id'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}
              element={<SalesInvoice theme={theme} onToggleTheme={toggleTheme} />}
            />
          }
        />
        <Route
          path='/purchase'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}
              element={<Purchase theme={theme} onToggleTheme={toggleTheme} />}
            />
          }
        />
        <Route
          path='/purchase/create'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}
              element={<PurchaseBill theme={theme} onToggleTheme={toggleTheme} />}
            />
          }
        />
        <Route
          path='/purchase/edit/:id'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}
              element={<PurchaseBill theme={theme} onToggleTheme={toggleTheme} />}
            />
          }
        />
        <Route
          path='/expense'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}
              element={<Expense theme={theme} onToggleTheme={toggleTheme} />}
            />
          }
        />
        <Route
          path='/bank'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}
              element={<Bank theme={theme} onToggleTheme={toggleTheme} />}
            />
          }
        />
        <Route
          path='/sales/preview/:id'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}
              element={<SalesPreview theme={theme} onToggleTheme={toggleTheme} />}
            />
          }
        />
        <Route
          path='/purchase/preview/:id'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}
              element={<PurchasePreview theme={theme} onToggleTheme={toggleTheme} />}
            />
          }
        />

        <Route
          path='/reports'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}
              element={<Reports theme={theme} onToggleTheme={toggleTheme} />}
            />
          }
        />
        <Route
          path='/settings'
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}
              element={<Settings theme={theme} onToggleTheme={toggleTheme} />}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
