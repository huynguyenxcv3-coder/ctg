import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei'
import * as THREE from 'three'

type ModelProps = React.ComponentPropsWithoutRef<'group'>

// 1. Box Fan Model (AHU / Quạt thông gió dạng hộp)
function BoxFanModel(props: ModelProps) {
  const fanBladeRef = useRef<THREE.Group>(null)
  
  useFrame((_, delta) => {
    if (fanBladeRef.current) {
      fanBladeRef.current.rotation.z -= delta * 10 // Smooth spinning
    }
  })

  // Soft Minimalist Industrial Materials
  const casingMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff', // Pure white casing
    metalness: 0.2,
    roughness: 0.1,
  })

  const innerMaterial = new THREE.MeshStandardMaterial({
    color: '#e4e4e7', // Soft gray inside
    metalness: 0.1,
    roughness: 0.8,
  })

  const bladeMaterial = new THREE.MeshStandardMaterial({
    color: '#a1a1aa', // Elegant zinc blade
    metalness: 0.6,
    roughness: 0.3,
  })
  
  const grillMaterial = new THREE.MeshStandardMaterial({
    color: '#d4d4d8', 
    metalness: 0.8,
    roughness: 0.2,
    wireframe: true
  })

  return (
    <group {...props} dispose={null}>
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.1}>
        {/* Main Rectangular Casing */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3, 3, 2]} />
          <primitive object={casingMaterial} />
        </mesh>

        {/* Hollow Inside */}
        <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 2.01, 64]} />
          <primitive object={innerMaterial} />
        </mesh>
        
        {/* Flange / Duct connection ring */}
        <mesh position={[0, 0, -1.05]}>
          <torusGeometry args={[1.35, 0.05, 16, 64]} />
          <primitive object={casingMaterial} />
        </mesh>
        <mesh position={[0, 0, -1.2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.35, 1.35, 0.3, 64]} />
          <primitive object={casingMaterial} />
        </mesh>

        {/* Spinning Fan Blades inside */}
        <group ref={fanBladeRef} position={[0, 0, 0.5]}>
          {/* Hub */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.4, 32]} />
            <primitive object={bladeMaterial} />
          </mesh>
          
          {/* Blades */}
          {Array.from({ length: 5 }).map((_, i) => (
            <group key={i} rotation={[0, 0, (i * Math.PI * 2) / 5]}>
              <mesh position={[0, 0.7, 0]} rotation={[0, Math.PI / 6, 0]}>
                <boxGeometry args={[0.02, 1.1, 0.4]} />
                <primitive object={bladeMaterial} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Front Protective Grill */}
        <mesh position={[0, 0, 1.05]}>
          <circleGeometry args={[1.4, 64]} />
          <primitive object={grillMaterial} />
        </mesh>
      </Float>
    </group>
  )
}

// 2. Centrifugal Fan Model (Quạt ly tâm con sò)
function CentrifugalFanModel(props: ModelProps) {
  const casingMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff', 
    metalness: 0.1,
    roughness: 0.2,
  })
  
  return (
    <group {...props} dispose={null}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.15}>
         {/* Scroll Casing */}
         <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[1.5, 1.5, 1.2, 64, 1, false, 0, Math.PI * 1.5]} />
            <primitive object={casingMaterial} side={THREE.DoubleSide} />
         </mesh>
         
         {/* Side plates */}
         <mesh position={[0, 0, 0.6]} rotation={[0, 0, Math.PI / 4]}>
            <circleGeometry args={[1.5, 64, 0, Math.PI * 1.5]} />
            <primitive object={casingMaterial} side={THREE.DoubleSide} />
         </mesh>
         <mesh position={[0, 0, -0.6]} rotation={[0, 0, Math.PI / 4]}>
            <circleGeometry args={[1.5, 64, 0, Math.PI * 1.5]} />
            <primitive object={casingMaterial} side={THREE.DoubleSide} />
         </mesh>

         {/* Discharge Outlet (Hình chữ nhật) */}
         <mesh position={[1.06, 1.06, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[1.5, 0.05, 1.2]} />
            <primitive object={casingMaterial} />
         </mesh>
         
         {/* Motor Box */}
         <mesh position={[0, 0, -1.2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 1, 64]} />
            <meshStandardMaterial color="#e4e4e7" metalness={0.3} roughness={0.6} />
         </mesh>
      </Float>
    </group>
  )
}

// 3. Filter System Model (Hộp lọc bụi túi)
function FilterBoxModel(props: ModelProps) {
  const boxMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    metalness: 0.1,
    roughness: 0.1,
  })
  
  return (
    <group {...props} dispose={null}>
      <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
        {/* Main Chamber */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[2, 3, 2]} />
          <primitive object={boxMaterial} />
        </mesh>
        
        {/* Hopper (Phễu gom bụi) */}
        <mesh position={[0, -1.5, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.414, 1.5, 4]} />
          <primitive object={boxMaterial} />
        </mesh>
        
        {/* Inlet Pipe */}
        <mesh position={[-1.2, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.5, 64]} />
          <meshStandardMaterial color="#e4e4e7" metalness={0.2} roughness={0.4} />
        </mesh>

        {/* Outlet Pipe */}
        <mesh position={[0, 2.3, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.6, 64]} />
          <meshStandardMaterial color="#e4e4e7" metalness={0.2} roughness={0.4} />
        </mesh>
      </Float>
    </group>
  )
}


interface DuctModelProps {
  type?: 'box-fan' | 'centrifugal' | 'filter';
}

export function DuctModel3D({ type = 'box-fan' }: DuctModelProps) {
  return (
    <div className="w-full h-full bg-transparent cursor-grab active:cursor-grabbing relative">
      <Canvas camera={{ position: [4, 2, 5], fov: 40 }}>
        {/* Soft, elegant lighting */}
        <ambientLight intensity={1} color="#ffffff" />
        <directionalLight position={[5, 10, 5]} intensity={1.2} color="#ffffff" castShadow />
        <directionalLight position={[-5, -10, -5]} intensity={0.8} color="#f4f4f5" />
        
        <Environment preset="studio" />
        
        {type === 'box-fan' && <BoxFanModel position={[0, 0, 0]} />}
        {type === 'centrifugal' && <CentrifugalFanModel position={[0, 0, 0]} />}
        {type === 'filter' && <FilterBoxModel position={[0, 0, 0]} />}
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 1.5}
        />
        
        <ContactShadows resolution={1024} scale={15} blur={3} opacity={0.15} far={10} color="#000000" position={[0, -2.5, 0]} />
      </Canvas>
    </div>
  )
}
