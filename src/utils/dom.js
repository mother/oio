import React from 'react'

const deepTraverse = (nodes, targetNodeNames, iteratorFn, level=0) => {
   if (!Array.isArray(nodes)) nodes = [nodes]
   return nodes.map((node, i) => {
      if (React.isValidElement(node)) {
         if (node.type && targetNodeNames.includes(node.type.name)) {
            return iteratorFn(node, level, i)
         } else if (node.props && node.props.children) {
            const traversedChildren = deepTraverse(node.props.children, targetNodeNames, iteratorFn, level + 1)
            return React.cloneElement(node, { key: `${level},${i}` }, traversedChildren)
         }
      }
      return node
   })
}

export const replaceNodesInDOM = (nodes, targetNodeNames, iteratorFn) => {
   if (!Array.isArray(targetNodeNames)) targetNodeNames = [targetNodeNames]
   return deepTraverse(nodes, targetNodeNames, iteratorFn)
}

export const findNodesinDOM = (rootNodes, ...targetNodeNames) => {
   const results = []
   deepTraverse(rootNodes, targetNodeNames, child => results.push(child))
   return results
}
