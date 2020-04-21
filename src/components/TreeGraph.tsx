import React from "react"
import family from "../content/family.json"
import Tree from "react-d3-tree"
import { curry } from "rambda"

function hasChildren(node) {
  return (
    typeof node === "object" &&
    typeof node.childNodes !== "undefined" &&
    node.childNodes.length > 0
  )
}

const mapTree = curry(function map(mapFn, node) {
  const newNode = mapFn(node)
  console.log("node", node)
  if (hasChildren(node)) {
    return newNode
  }
  newNode.children = node.children.map(mapTree(mapFn))
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
    <div id="treeWrapper" style={{ width: "50em", height: "20em" }}>
      <Tree data={tree} />
    </div>
  )
}

export default TreeGraph
