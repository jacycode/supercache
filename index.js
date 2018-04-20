import ReactDOM from 'react-dom';
import React from 'react';
import App from './src/App';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// Server Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./serverWorker.js').then(function(reg) {
        // registration worked
        console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch(function(error) {
        // registration failed
        console.log('Registration failed with ' + error);
    });
}