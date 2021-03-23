import React, { useState, useMemo, useEffect } from "react"
import SideNav from "../components/SideNav"
import "antd/dist/antd.css"
import { Row, Col } from "antd"
import _ from "lodash"
import Profile from "./familyMemberProfile/Profile"
import { FamilyMember } from "../types/FamilyTree"
import familyTree from "../../content/family.json"

var flattenChildren = function (tree, key, collection) {
  if (!tree[key] || tree[key].length === 0) return
  for (var i = 0; i < tree[key].length; i++) {
    var child = tree[key][i]
    collection.push(child)
    flattenChildren(child, key, collection)
  }
  return collection
}

const getFamilyMembers = (familyTree: FamilyMember[]) => {
  const familyMembersByHead = familyTree.map(value => {
    const flattenedChildren = flattenChildren(value, "children", [value])
    return flattenedChildren
  })
  return _.flatten(familyMembersByHead)
}

const TreeDirectory = () => {
  const [selectedFamilyMember, setSelectedFamilyMember] = useState("0-0-1-1")
  const familyMembers = useMemo(() => getFamilyMembers(familyTree), [
    familyTree,
  ])

  if (!familyTree) {
    return <div>Loading...</div>
  }

  const familyMember = familyMembers.find(member => {
    return member.key === selectedFamilyMember
  })

  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <SideNav
          familyTree={familyTree}
          setSelectedFamilyMember={setSelectedFamilyMember}
        />
      </Col>
      <Col span={16}>
        <Profile familyMember={familyMember} />
      </Col>
    </Row>
  )
}

export default TreeDirectory
