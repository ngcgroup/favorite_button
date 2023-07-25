import React from 'react';
import logo from './logo.svg';
import './App.css';
import FavoriteButton from './fav-button/FavoriteButton';
import ContributionsWidget from './contribution_widget/contributions/ContributionsWidget';

function App() {
  return (
    <div>
    
        <ContributionsWidget label="Thank you for your purchase. Your patronage helps us donate up to $1 to one of these charities."/>
        
     
    </div>
  )
}

export default App;
