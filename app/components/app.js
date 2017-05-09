const React = require('react');
const ReactDOM = require('react-dom');

const Board = require('./board')
require('./app.css');
const App = ()=>(
  <div className="app">
    <Board />
  </div>
);



module.exports = App;
