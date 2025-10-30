import logo from './logo.svg';
import AuthPage from './pages/AuthPage/AuthPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const prefersDark =  window.matchMedia('(prefers-color-scheme: dark').matches;
    const savedTheme = localStorage.getItem('theme');

    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);
  })
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
