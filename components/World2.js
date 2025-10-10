/*
Auto-generated component for world2.glb model
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { scene } = useGLTF('/world2.glb')
  return <primitive object={scene.clone()} {...props} />
}

useGLTF.preload('/world2.glb')
