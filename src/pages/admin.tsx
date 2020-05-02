import React from "react"
import { Router } from "@reach/router"
import { Link } from "gatsby"
import { login, isAuthenticated, getProfile, logout } from "../utils/auth"
// auth0 reference :https://auth0.com/blog/securing-gatsby-with-auth0/

const Admin = ({ path }) => <p>Admin Page</p>

const AdminPage = () => {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
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
        <Admin path="/admin" />
      </Router>
    </div>
  )
}
export default AdminPage
