import React, { useEffect } from "react"
import family from "../content/family.json"
import { curry } from "rambda"
// https://www.gatsbyjs.org/docs/debugging-html-builds/#how-to-check-if-code-classlanguage-textwindowcode-is-defined
// https://github.com/gatsbyjs/gatsby/issues/309
const TreeModule =
  typeof window !== `undefined` ? require("react-d3-tree") : null

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
  if (hasChildren(node)) {
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

  return (
    <div id="treeWrapper" style={{ width: "1000px", height: "500px" }}>
      {TreeModule && (
        <TreeModule.Tree
          data={tree}
          pathFunc="step"
          nodeSize={{ x: 250, y: 50 }}
          translate={{ x: 100, y: 200 }}
        />
      )}
    </div>
  )
}

export default TreeGraph
