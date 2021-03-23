import React, { useState, SetStateAction, Dispatch } from "react"
import { Tree } from "antd"

type Props = {
  setSelectedFamilyMember: Dispatch<SetStateAction<string>>
  familyTree: Array<any>
}

const SideNav = ({ setSelectedFamilyMember, familyTree }: Props) => {
  const [treeState, setTreeState] = useState({
    expandedKeys: ["0-0", "0-0-1", "0-0-1-1"],
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
        showLine={true}
        expandedKeys={treeState.expandedKeys}
        autoExpandParent={treeState.autoExpandParent}
        onExpand={handleExpand}
        onSelect={handleSelect}
      />
    </div>
  )
}

export default SideNav
