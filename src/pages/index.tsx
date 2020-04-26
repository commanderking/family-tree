import React from "react"
import { Link } from "gatsby"
import SideNav from "../components/SideNav"
import TreeGraph from "../components/TreeGraph"
import "antd/dist/antd.css"
import { Row, Col } from "antd"
const IndexPage = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={4}>
        <SideNav />
      </Col>
      <Col span={8}>
        <TreeGraph />
      </Col>
    </Row>
  )
}

export default IndexPage
