import React from 'react';
import './App.css';
import './styles/main.css'

function App() {
  return (
     <div className="main_block">
       <div className="form">
         <img className="logo_main" src={`${process.env.PUBLIC_URL}/main_logo.jpg`}/>
       <h1>Сервис анализа мнений пользователей социальных сетей</h1>
        <div>
          <input type="text" name="query"/>
          <input type="button"/>
        </div>
        <div className="social">
          <span>
            <img src={`${process.env.PUBLIC_URL}/vk_logo.png`}/>
          </span>
        </div>
       </div>
     </div>
  );
}

export default App;
