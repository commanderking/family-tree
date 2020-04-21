import React from "react"
import family from "../content/family.json"
import Tree from "react-d3-tree"
import { curry } from "rambda"

// reference for traversing trees

function hasChildren(node) {
  return (
    typeof node === "object" &&
    typeof node.children !== "undefined" &&
    node.children.length > 0
  )
}

const mapTree = curry(function map(mapFn, node) {
  const newNode = mapFn(node)
  console.log("node", node)
  if (hasChildren(node)) {
    console.log("has children")
    newNode.children = node.children.map(mapTree(mapFn))
  }
  return newNode
})

const mapFunction = node => {
  return {
    ...node,
    name: node.title,
  }
}

const TreeGraph = () => {
  const tree = mapTree(mapFunction, family[0])

  console.log("tree", tree)
  return (
    <div id="treeWrapper" style={{ width: "1000px", height: "500px" }}>
      <Tree
        data={tree}
        pathFunc="step"
        nodeSize={{ x: 250, y: 50 }}
        translate={{ x: 100, y: 200 }}
      />
    </div>
  )
}

export default TreeGraph