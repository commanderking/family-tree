import React from "react"
import { Link } from "gatsby"
import SideNav from "../components/SideNav"
import TreeGraph from "../components/TreeGraph"
import "antd/dist/antd.css"

const IndexPage = () => {
  return (
    <div>
      <SideNav />
      <TreeGraph />
    </div>
  )
}

export default IndexPage
