import React, { useState, SetStateAction, Dispatch, Children } from "react"
import { Tree, Input } from "antd"

type Props = {
  setSelectedFamilyMember: Dispatch<SetStateAction<string>>
  familyTree: Array<any>
}

const SideNav = ({ setSelectedFamilyMember, familyTree }: Props) => {
  const [treeState, setTreeState] = useState({
    expandedKeys: [],
    autoExpandParent: true,
  })

  const handleExpand = expandedKeys => {
    setTreeState({
      expandedKeys,
      autoExpandParent: false,
    })
  }

  const handleSelect = (keys, event) => {
    setSelectedFamilyMember(event.node.key)
  }
  return (
    <div>
      <Tree
        treeData={familyTree}
        expandedKeys={treeState.expandedKeys}
        autoExpandParent={treeState.autoExpandParent}
        onExpand={handleExpand}
        onSelect={handleSelect}
      />
    </div>
  )
}

export default SideNav
