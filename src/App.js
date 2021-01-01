import React, {useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import logo from './logo.svg';
import './App.scss';
import {
  Redirect,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignIn from "./JScomponents/SignIn";
import SignUp from "./JScomponents/SignUp";
import Header from "./JScomponents/Header";
import Profile from "./JScomponents/Profile";
import { updateUser } from "./redux/userReducer";
import ConfirmationPage from "./JScomponents/ConfirmationPage";

function App() {

  const currentUser = useSelector(state => state.userReducer.currentUser)
  const dispatch = useDispatch()

  // console.log(useDispatch)
   
  const [state, setState] =  useState(({
    movies: []
  }))


  useEffect(() => {

    const JSONuser = localStorage.getItem("crownBlogsUser")
    const user = JSON.parse(JSONuser)
      dispatch(updateUser(user))
    



      

    
    
  }, [dispatch])





  let confirmedSwitch = (<Switch>

    

    <Route exact={true} path="/profile" render={()=>(
        <Profile />
      )}
      />

    <Route exact={true} path="*" render={()=>(
        <Redirect to="/profile" />
      )}
      />

  </Switch>)
  
  let unconfirmedSwitch = <Switch>

    <Route exact={true} path="/confirmationPage" render={()=>(
            <ConfirmationPage />
          )}
          />

    <Route exact={true} path="*" render={()=>(
            <Redirect to="/confirmationPage" />
          )}
          />
      
  </Switch>
  
  let noUserSwitch = (<Switch>

    <Route exact={true} path="/signIn" render={()=>(
        <SignIn />
      )}
      />

    <Route exact={true} path="/signUp" render={()=>(
        <SignUp />
      )}
      />

      <Route exact={true} path="*" render={()=>(
        <Redirect to="/signIn" />
      )}
      />
  </Switch>)
  
  
  return (
    <div className="App">


    {currentUser ? <Header /> : false}



    

    {currentUser && currentUser.confirmed ? confirmedSwitch : currentUser ? unconfirmedSwitch : noUserSwitch}
      
    </div>
  );
}

export default App;
