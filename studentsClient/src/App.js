import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <Router basename='/'>
      <Header />
      <main className='h-auto min-h-screen pt-14 md:pt-16'>
        <Route path='/' component={HomeScreen} />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
