import { Line } from '@react-three/drei'
import { buildTree, traverseTree } from '../utils/treeParser'
import { TREE_CONFIG } from '../config/planeConfig'

/**
 * Renders connection lines between parent and child nodes in the tree
 */
export function TreeEdges({ nodes, layout }) {
  // Build tree to get parent-child relationships
  const roots = buildTree(nodes)

  const edges = []

  // Traverse tree and collect all parent-child connections
  traverseTree(roots, (node) => {
    if (node.children && node.children.length > 0) {
      const parentPos = layout.get(node.doc_no)

      if (parentPos) {
        node.children.forEach(child => {
          const childPos = layout.get(child.doc_no)

          if (childPos) {
            edges.push({
              key: `${node.doc_no}-${child.doc_no}`,
              parentPos,
              childPos
            })
          }
        })
      }
    }
  })

  return (
    <group position={[0, 0, TREE_CONFIG.edges.zOffset]}>
      {edges.map(({ key, parentPos, childPos }) => (
        <Line
          key={key}
          points={[
            [parentPos.x, -parentPos.y, 0],
            [childPos.x, -childPos.y, 0]
          ]}
          color={TREE_CONFIG.edges.color}
          lineWidth={TREE_CONFIG.edges.width}
          opacity={TREE_CONFIG.edges.opacity}
          transparent
        />
      ))}
    </group>
  )
}
