import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';

const AnimatedSphere = () => {
    const sphereRef = useRef();

    useFrame(({ clock }) => {
        sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
        sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    });

    return (
        <Sphere visible args={[1, 100, 200]} scale={2.5} ref={sphereRef}>
            <MeshDistortMaterial
                key="sphere-material-orange"
                color="#F97316"
                attach="material"
                distort={0.6}
                speed={2}
                roughness={0.2}
            />
        </Sphere>
    );
};

const ThreeScene = () => {
    return (
        <div className="h-full w-full absolute top-0 left-0 -z-10 bg-white dark:bg-[#09090b] transition-colors duration-300 overflow-hidden">
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 5, 2]} intensity={1} />
                <AnimatedSphere />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
};

export default ThreeScene;
