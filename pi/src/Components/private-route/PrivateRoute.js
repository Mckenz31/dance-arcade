import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()
  console.log(currentUser,"current user private route")
  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/auth" />
      }}
    ></Route>
  )
}