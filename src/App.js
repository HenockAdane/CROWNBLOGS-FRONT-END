import React, {useEffect} from "react"
import { useDispatch } from "react-redux"
import logo from './logo.svg';
import './App.scss';

function App() {

  console.log(useDispatch)


  // useEffect(() => {
  //   fetch("https://thawing-beyond-85989.herokuapp.com/products").then(res => {
  //     console.log(res)

  //     // res.status === 200 ? res.json() : (throw new Error(res.status))

  //     if (res.status === 200){
  //       return res.json()
  //     }

  //     else{
  //       alert(res.status)
  //       throw new Error(res.status)
  //     }

  //   }).then(data => console.log(data)).catch(err => console.log(err))

  //   fetch("https://thawing-beyond-85989.herokuapp.com/productss").then(res => {
  //     console.log(res)

  //     // res.status === 200 ? res.json() : (throw new Error(res.status))

  //     if (res.status === 200){
  //       return res.json()
  //     }

  //     else{
  //       alert(res.status)
  //       throw new Error(res.status)
  //     }

  //   }).then(data => console.log(data)).catch(err => console.log(err))
    
    
  // }, [])


  
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
