import React from 'react'

const deepTraverse = (nodes, targetNodeNames, iteratorFn, level = 0) => {
   const nodesArray = Array.isArray(nodes) ? nodes : [nodes]
   return nodesArray.map((node, i) => {
      if (React.isValidElement(node)) {
         // TODO: targetNodeNames.includes(node.type.name) causes issues with uglify mangle
         if (node.type && targetNodeNames.includes(node.type.name)) {
            return iteratorFn(node, level, i)
         } else if (node.props && node.props.children) {
            const traversedChildren = deepTraverse(
               node.props.children,
               targetNodeNames,
               iteratorFn,
               level + 1
            )
            return React.cloneElement(
               node,
               { key: `${level},${i}` },
               traversedChildren
            )
         }
      }
      return node
   })
}

export const replaceNodesInDOM = (nodes, targetNodeNames, iteratorFn) => {
   const targetNodeNamesArr = Array.isArray(targetNodeNames) ? targetNodeNames : [targetNodeNames]
   return deepTraverse(nodes, targetNodeNamesArr, iteratorFn)
}

export const findNodesinDOM = (rootNodes, ...targetNodeNames) => {
   const results = []
   deepTraverse(rootNodes, targetNodeNames, child => results.push(child))
   return results
}
