import React, { useState } from "react"
import { Tree, Input } from "antd"
import family from "../content/family.json"

const SideNav = () => {
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
  return (
    <div>
      <Tree
        treeData={family}
        expandedKeys={treeState.expandedKeys}
        autoExpandParent={treeState.autoExpandParent}
        onExpand={handleExpand}
      />
    </div>
  )
}

export default SideNav
