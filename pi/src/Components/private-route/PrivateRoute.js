import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()
  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/auth" />
      }}
    ></Route>
  )
}
export function PublicRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()
  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Redirect to="/Home" />  : <Component {...props} />
      }}
    ></Route>
  )
}
