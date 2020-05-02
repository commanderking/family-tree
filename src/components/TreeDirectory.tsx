import React, { useState, useMemo } from "react"
import SideNav from "../components/SideNav"
import "antd/dist/antd.css"
import { Row, Col } from "antd"
import familyTree from "../content/family.json"
import _ from "lodash"
import Profile from "./familyMemberProfile/Profile"
import { FamilyMember } from "../types/FamilyTree"

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
  const [selectedFamilyMember, setSelectedFamilyMember] = useState(null)

  const familyMembers = useMemo(() => getFamilyMembers(familyTree), [
    familyTree,
  ])

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