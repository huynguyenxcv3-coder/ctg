import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Float, Preload } from '@react-three/drei'
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

  // Memoize materials to prevent recreation on every render
  const materials = useMemo(() => ({
    casing: new THREE.MeshStandardMaterial({
      color: '#ffffff', // Pure white casing
      metalness: 0.2,
      roughness: 0.1,
    }),
    inner: new THREE.MeshStandardMaterial({
      color: '#e4e4e7', // Soft gray inside
      metalness: 0.1,
      roughness: 0.8,
    }),
    blade: new THREE.MeshStandardMaterial({
      color: '#a1a1aa', // Elegant zinc blade
      metalness: 0.6,
      roughness: 0.3,
    }),
    grill: new THREE.MeshStandardMaterial({
      color: '#d4d4d8', 
      metalness: 0.8,
      roughness: 0.2,
      wireframe: true
    })
  }), [])

  return (
    <group {...props} dispose={null}>
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.1}>
        {/* Main Rectangular Casing */}
        <mesh position={[0, 0, 0]} material={materials.casing}>
          <boxGeometry args={[3, 3, 2]} />
        </mesh>

        {/* Hollow Inside */}
        <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]} material={materials.inner}>
          <cylinderGeometry args={[1.3, 1.3, 2.01, 24]} />
        </mesh>
        
        {/* Flange / Duct connection ring */}
        <mesh position={[0, 0, -1.05]} material={materials.casing}>
          <torusGeometry args={[1.35, 0.05, 8, 24]} />
        </mesh>
        <mesh position={[0, 0, -1.2]} rotation={[Math.PI / 2, 0, 0]} material={materials.casing}>
          <cylinderGeometry args={[1.35, 1.35, 0.3, 24]} />
        </mesh>

        {/* Spinning Fan Blades inside */}
        <group ref={fanBladeRef} position={[0, 0, 0.5]}>
          {/* Hub */}
          <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.blade}>
            <cylinderGeometry args={[0.2, 0.2, 0.4, 12]} />
          </mesh>
          
          {/* Blades */}
          {Array.from({ length: 5 }).map((_, i) => (
            <group key={i} rotation={[0, 0, (i * Math.PI * 2) / 5]}>
              <mesh position={[0, 0.7, 0]} rotation={[0, Math.PI / 6, 0]} material={materials.blade}>
                <boxGeometry args={[0.02, 1.1, 0.4]} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Front Protective Grill */}
        <mesh position={[0, 0, 1.05]} material={materials.grill}>
          <circleGeometry args={[1.4, 24]} />
        </mesh>
      </Float>
    </group>
  )
}

// 2. Centrifugal Fan Model (Quạt ly tâm con sò)
function CentrifugalFanModel(props: ModelProps) {
  const casingMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#ffffff', 
    metalness: 0.1,
    roughness: 0.2,
    side: THREE.DoubleSide
  }), [])
  
  const motorMaterial = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: "#e4e4e7", 
    metalness: 0.3, 
    roughness: 0.6 
  }), [])

  return (
    <group {...props} dispose={null}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.15}>
         {/* Scroll Casing */}
         <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]} material={casingMaterial}>
            <cylinderGeometry args={[1.5, 1.5, 1.2, 24, 1, false, 0, Math.PI * 1.5]} />
         </mesh>
         
         {/* Side plates */}
         <mesh position={[0, 0, 0.6]} rotation={[0, 0, Math.PI / 4]} material={casingMaterial}>
            <circleGeometry args={[1.5, 24, 0, Math.PI * 1.5]} />
         </mesh>
         <mesh position={[0, 0, -0.6]} rotation={[0, 0, Math.PI / 4]} material={casingMaterial}>
            <circleGeometry args={[1.5, 24, 0, Math.PI * 1.5]} />
         </mesh>

         {/* Discharge Outlet (Hình chữ nhật) */}
         <mesh position={[1.06, 1.06, 0]} rotation={[0, 0, -Math.PI / 4]} material={casingMaterial}>
            <boxGeometry args={[1.5, 0.05, 1.2]} />
         </mesh>
         
         {/* Motor Box */}
         <mesh position={[0, 0, -1.2]} rotation={[Math.PI / 2, 0, 0]} material={motorMaterial}>
            <cylinderGeometry args={[0.5, 0.5, 1, 24]} />
         </mesh>
      </Float>
    </group>
  )
}

// 3. Filter System Model (Hộp lọc bụi túi)
function FilterBoxModel(props: ModelProps) {
  const materials = useMemo(() => ({
    box: new THREE.MeshStandardMaterial({
      color: '#ffffff',
      metalness: 0.1,
      roughness: 0.1,
    }),
    pipe: new THREE.MeshStandardMaterial({
      color: "#e4e4e7", 
      metalness: 0.2, 
      roughness: 0.4 
    })
  }), [])
  
  return (
    <group {...props} dispose={null}>
      <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
        {/* Main Chamber */}
        <mesh position={[0, 0.5, 0]} material={materials.box}>
          <boxGeometry args={[2, 3, 2]} />
        </mesh>
        
        {/* Hopper (Phễu gom bụi) */}
        <mesh position={[0, -1.5, 0]} rotation={[0, Math.PI / 4, 0]} material={materials.box}>
          <coneGeometry args={[1.414, 1.5, 4]} />
        </mesh>
        
        {/* Inlet Pipe */}
        <mesh position={[-1.2, 0.5, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.pipe}>
          <cylinderGeometry args={[0.3, 0.3, 0.5, 16]} />
        </mesh>

        {/* Outlet Pipe */}
        <mesh position={[0, 2.3, 0]} material={materials.pipe}>
          <cylinderGeometry args={[0.3, 0.3, 0.6, 16]} />
        </mesh>
      </Float>
    </group>
  )
}


interface DuctModelProps {
  type?: 'box-fan' | 'centrifugal' | 'filter';
}

export function DuctModel3D({ type = 'box-fan' }: DuctModelProps) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '100px', threshold: 0.01 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full bg-transparent cursor-grab active:cursor-grabbing relative min-h-[300px]" style={{ touchAction: 'pan-y' }}>
      {isInView ? (
        <Canvas 
          camera={{ position: [4, 2, 5], fov: 40 }} 
          dpr={1} 
          performance={{ min: 0.5 }} 
          gl={{ 
            antialias: false, 
            powerPreference: "high-performance",
            alpha: true,
            stencil: false,
            depth: true
          }}
        >
          {/* Soft, elegant lighting */}
          <ambientLight intensity={1} color="#ffffff" />
          <directionalLight position={[5, 10, 5]} intensity={1.2} color="#ffffff" />
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
          
          <ContactShadows resolution={128} scale={15} blur={2} opacity={0.1} far={10} color="#000000" position={[0, -2.5, 0]} />
          <Preload all />
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-zinc-50/50 rounded-2xl">
          <div className="w-8 h-8 border-2 border-zinc-200 border-t-zinc-800 rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
