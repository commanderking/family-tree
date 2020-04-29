import React from "react"
import { Router } from "@reach/router"
import { Link } from "gatsby"
import { login, isAuthenticated, getProfile, logout } from "../utils/auth"
// auth0 reference :https://auth0.com/blog/securing-gatsby-with-auth0/

const Login = ({ path }) => <p>Login</p>
const Admin = ({ path }) => (
  <div>
    <h1>Admin </h1>
  </div>
)

const AdminPage = () => {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  return (
    <div>
      <nav>
        <Link to="/admin">Admin</Link> <Link to="/admin/login">Login</Link>{" "}
        <Link to="/account/billing">Billing</Link>
        <a
          href="#logout"
          onClick={e => {
            logout()
            e.preventDefault()
          }}
        >
          Log Out
        </a>
      </nav>
      <Router>
        <Login path="/admin" />
        <Admin path="/admin/login" />
      </Router>
    </div>
  )
}
export default AdminPage
