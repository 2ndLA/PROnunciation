import React from "react";
import "./App.css";
import List from '../src/components/List';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <audio controls>
          <source src={require("./audio/mysql.m4a")} type="audio/mpeg" />
          您的浏览器不支持 audio 元素。
        </audio>  
      </header> */}
      <List />
    </div>
  );
}

export default App;
