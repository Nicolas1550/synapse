'use client';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { useCallback, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

export type Shape = 'sphere' | 'dna' | 'tree';
export const neuralNodes = [
  { label: 'NEBULA', category: 'PROJECT', detail: 'Universo 3D interactivo: exploración, storytelling y proyectos.', href: '#work' },
  { label: 'MakeUp', category: 'PROJECT', detail: 'E-commerce: la demo muestra funciones que requieren backend.', href: '#work' },
  { label: 'Peluquería', category: 'PROJECT', detail: 'Plataforma de servicios con demostración de su experiencia.', href: '#work' },
  { label: 'SYNAPSE', category: 'PROJECT', detail: 'Interfaz neuronal interactiva desarrollada con React Three Fiber.', href: '#lab' },
  { label: 'React', category: 'SKILL', detail: 'Desarrollo de interfaces, componentes y estado.', href: '#expertise' },
  { label: 'Next.js', category: 'SKILL', detail: 'Aplicaciones web, rutas, rendimiento y SEO.', href: '#expertise' },
  { label: 'TypeScript', category: 'SKILL', detail: 'Tipado, mantenibilidad y arquitectura frontend.', href: '#expertise' },
  { label: 'Three.js', category: 'SKILL', detail: 'Gráficos 3D, WebGL y experiencias interactivas.', href: '#expertise' },
  { label: 'Experiencia', category: 'CAREER', detail: 'Explorá la trayectoria profesional y las colaboraciones.', href: '#experience' },
  { label: 'Contacto', category: 'CONNECT', detail: 'Correo, GitHub y vías para colaborar.', href: '#contact' },
];
const COUNT = 280;
const V = (x:number,y:number,z:number)=>new THREE.Vector3(x,y,z);
function shapePosition(i:number, shape:Shape):THREE.Vector3 {
  const t=i/COUNT;
  if(shape==='dna') {const strand=i%2; const y=-1.7+t*3.4; const a=t*Math.PI*8+strand*Math.PI;return V(Math.cos(a)*.95,y,Math.sin(a)*.95);}
  if(shape==='tree') {const b=i%9;const level=Math.floor(i/9)/Math.ceil(COUNT/9);const a=b*Math.PI*2/9+level*1.8;const r=.15+Math.pow(level,1.6)*1.65;return V(Math.cos(a)*r,-1.7+level*3.4,Math.sin(a)*r);}
  const y=1-2*(i+.5)/COUNT;const r=Math.sqrt(1-y*y);const a=i*Math.PI*(3-Math.sqrt(5));const wobble=1.52+Math.sin(i*4.71)*.07;return V(Math.cos(a)*r*wobble,y*wobble,Math.sin(a)*r*wobble);
}

// V7: an animated organic energy core, rendered with real GLSL shaders.
// It is intentionally non-interactive so project nodes retain pointer priority.
function LivingCore({shape,impact}:{shape:Shape;impact:React.MutableRefObject<{time:number;strength:number}>}) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const uniforms = useMemo(()=>({uTime:{value:0},uMode:{value:0},uPulse:{value:0}}),[]);
  const targetMode=shape==='sphere'?0:shape==='dna'?1:2;
  useFrame((state,dt)=>{
    uniforms.uTime.value=state.clock.elapsedTime;
    const age=performance.now()/1000-impact.current.time;
    uniforms.uPulse.value=age>=0&&age<2.2?Math.sin(Math.min(1,age/2.2)*Math.PI)*impact.current.strength:0;
    uniforms.uMode.value=THREE.MathUtils.damp(uniforms.uMode.value,targetMode,2.8,dt);
    if(group.current){group.current.rotation.y+=dt*.13;group.current.rotation.z=Math.sin(state.clock.elapsedTime*.16)*.12;}
  });
  return <group ref={group}>
    <mesh raycast={()=>{}} scale={[.87,.87,.87]}>
      <icosahedronGeometry args={[1,70]}/>
      <shaderMaterial ref={material} uniforms={uniforms} transparent depthWrite={false} side={THREE.DoubleSide}
        vertexShader={`uniform float uTime; uniform float uMode; uniform float uPulse;
          varying vec3 vNormal; varying vec3 vWorld; varying float vEnergy;
          float wave(vec3 p){return sin(p.x*7.0+uTime*1.4)*sin(p.y*8.0-uTime*.9)*sin(p.z*6.0+uTime*.7);}
          void main(){vec3 p=position; float w=wave(p); float detail=sin(p.x*16.0+uTime*2.2)*sin(p.y*13.0-uTime*1.3)*.035;
            float morph=mix(1.0,1.0+sin(p.y*8.0+uTime)*.10,clamp(uMode,0.0,1.0));
            p+=normal*(w*.16+detail+uPulse*.24*sin(length(p)*8.0-uTime*4.0));p.xz*=morph;
            vNormal=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(p,1.0);vWorld=mv.xyz;vEnergy=w;
            gl_Position=projectionMatrix*mv;}`}
        fragmentShader={`uniform float uTime; uniform float uPulse; varying vec3 vNormal; varying vec3 vWorld; varying float vEnergy;
          void main(){vec3 n=normalize(vNormal);vec3 eye=normalize(-vWorld);
            float rim=pow(1.0-abs(dot(n,eye)),2.15);
            float veins=pow(max(0.0,sin(vEnergy*15.0+vWorld.y*12.0+uTime*1.3)),12.0);
            float stripes=pow(max(0.0,sin(vWorld.x*28.0+vWorld.y*16.0+sin(vWorld.z*9.0+uTime)*3.0)),18.0);
            vec3 deep=vec3(.008,.035,.075);vec3 teal=vec3(.02,.48,.64);vec3 ice=vec3(.40,.95,1.0);
            vec3 color=mix(deep,teal,rim*.85+veins*.23)+ice*(rim*.58+stripes*.27+uPulse*.8);
            float alpha=clamp(.78+rim*.20,0.0,.98);
            gl_FragColor=vec4(color,alpha);}`}/>
    </mesh>
    <mesh raycast={()=>{}} scale={1.14}>
      <sphereGeometry args={[1,48,32]}/>
      <meshBasicMaterial color="#009bde" transparent opacity={.045} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide}/>
    </mesh>
    <mesh raycast={()=>{}} rotation={[.55,.2,.2]}>
      <torusGeometry args={[1.48,.006,6,150]}/>
      <meshBasicMaterial color="#53dfff" transparent opacity={.37} blending={THREE.AdditiveBlending} depthWrite={false}/>
    </mesh>
    <mesh raycast={()=>{}} rotation={[1.25,.7,.4]}>
      <torusGeometry args={[1.66,.004,6,150]}/>
      <meshBasicMaterial color="#b4a2ff" transparent opacity={.23} blending={THREE.AdditiveBlending} depthWrite={false}/>
    </mesh>
    <pointLight color="#2ccfff" intensity={2.2} distance={5}/>
  </group>;
}

function Network({shape,selected,onSelect,onDragChange}:{shape:Shape;selected:number|null;onSelect:(i:number)=>void;onDragChange:(v:boolean)=>void}) {
  const root=useRef<THREE.Group>(null);
  const coreImpact=useRef({time:-100,strength:0});
  const [impactCount,setImpactCount]=useState(0);
  const geometry=useRef<THREE.BufferGeometry>(null);
  const linesGeometry=useRef<THREE.BufferGeometry>(null);
  const anchorMeshes=useRef<(THREE.Mesh|null)[]>([]);
  const [hovered,setHovered]=useState<number|null>(null);
  const anchors=useMemo(()=>neuralNodes.map((_,i)=>(i*23)%COUNT),[]);
  const sphere=useMemo(()=>Array.from({length:COUNT},(_,i)=>shapePosition(i,'sphere')),[]);
  const targets=useMemo(()=>Array.from({length:COUNT},(_,i)=>shapePosition(i,shape)),[shape]);
  const edges=useMemo(()=>{
    const result:number[]=[];
    for(let i=0;i<COUNT;i++) {
      const near=sphere.map((p,j)=>({j,d:p.distanceToSquared(sphere[i])})).filter(x=>x.j!==i).sort((a,b)=>a.d-b.d).slice(0,4);
      for(const n of near)if(n.j>i)result.push(i,n.j);
    }
    return result;
  },[sphere]);
  const graph=useMemo(()=>{
    const adj:number[][]=Array.from({length:COUNT},()=>[]);
    for(let k=0;k<edges.length;k+=2){adj[edges[k]].push(edges[k+1]);adj[edges[k+1]].push(edges[k]);}
    return adj;
  },[edges]);
  const positions=useMemo(()=>new Float32Array(sphere.flatMap(p=>p.toArray())),[sphere]);
  const linePositions=useMemo(()=>new Float32Array(edges.length*3),[edges]);
  const lineColors=useMemo(()=>new Float32Array(edges.length*3),[edges]);
  const velocity=useRef(new Float32Array(COUNT*3));
  const dragging=useRef<{anchor:number;pointerId:number;point:THREE.Vector3;last:THREE.Vector3;moved:boolean}|null>(null);
  const magnet=useRef<{point:THREE.Vector3;active:boolean}>({point:V(0,0,0),active:false});
  const pulse=useRef<{origin:number;started:number;dist:number[]}|null>(null);
  const explosion=useRef<{started:number;directions:THREE.Vector3[]}|null>(null);
  const normal=useMemo(()=>new THREE.Color('#15627c'),[]);
  const bright=useMemo(()=>new THREE.Color('#b9faff'),[]);
  const tempColor=useMemo(()=>new THREE.Color(),[]);
  const tmp=useMemo(()=>new THREE.Vector3(),[]);
  const mousePlane=useMemo(()=>new THREE.Plane(),[]);
  const onNodeClick=useCallback((i:number)=>{
    const origin=anchors[i];const dist=Array(COUNT).fill(Infinity);dist[origin]=0;
    const q=[origin];for(let head=0;head<q.length;head++){const v=q[head];for(const n of graph[v])if(dist[n]===Infinity){dist[n]=dist[v]+1;q.push(n);}}
    pulse.current={origin,started:performance.now()/1000,dist};
    coreImpact.current={time:performance.now()/1000,strength:1.0};
    setImpactCount(v=>v+1);onSelect(i);
  },[anchors,graph,onSelect]);
  const beginDrag=(e:ThreeEvent<PointerEvent>,i:number)=>{
    e.stopPropagation();
    (e.target as Element | null)?.setPointerCapture(e.pointerId);
    const anchor=anchors[i];const p=V(positions[anchor*3],positions[anchor*3+1],positions[anchor*3+2]);
    dragging.current={anchor,pointerId:e.pointerId,point:p.clone(),last:p.clone(),moved:false};
    onDragChange(true);document.body.style.cursor='grabbing';
  };
  const moveDrag=(e:ThreeEvent<PointerEvent>)=>{
    if(!dragging.current||dragging.current.pointerId!==e.pointerId)return;
    e.stopPropagation();const drag=dragging.current;
    // Intersect a plane through the node, parallel to the camera view, then convert into local group space.
    const worldPoint=drag.point.clone();root.current?.localToWorld(worldPoint);
    mousePlane.setFromNormalAndCoplanarPoint(e.camera.getWorldDirection(tmp).negate(),worldPoint);
    const hit=e.ray.intersectPlane(mousePlane,new THREE.Vector3());
    if(hit){root.current?.worldToLocal(hit);drag.last.copy(hit);if(hit.distanceTo(drag.point)>.045)drag.moved=true;}
  };
  const endDrag=(e:ThreeEvent<PointerEvent>,i:number)=>{
    e.stopPropagation();const drag=dragging.current;if(!drag)return;
    const target = e.target as Element | null;
    if(target?.hasPointerCapture(e.pointerId))target.releasePointerCapture(e.pointerId);
    dragging.current=null;onDragChange(false);document.body.style.cursor='pointer';
    if(!drag.moved)onNodeClick(i);else onNodeClick(i); // Release sends an electric chain pulse.
  };
  const explode=(e:ThreeEvent<MouseEvent>)=>{
    e.stopPropagation();explosion.current={started:performance.now()/1000,directions:Array.from({length:COUNT},(_,i)=>{
      const p=V(positions[i*3],positions[i*3+1],positions[i*3+2]);return p.lengthSq()>.001?p.normalize():V(Math.sin(i*4),Math.cos(i*7),Math.sin(i*3)).normalize();
    })};
  };
  useFrame((state,dt)=>{
    const delta=Math.min(dt,.04),now=performance.now()/1000;
    const p=pulse.current;const pulseTime=p?now-p.started:999;
    const blast=explosion.current;const blastTime=blast?now-blast.started:999;
    const impactAge=now-coreImpact.current.time;
    const coreWave=impactAge>=0&&impactAge<1.8?Math.sin(impactAge*10)*Math.exp(-impactAge*2)*.16:0;
    const energy=new Float32Array(COUNT);
    for(let i=0;i<COUNT;i++){
      const off=i*3,target=targets[i],node=V(positions[off],positions[off+1],positions[off+2]);
      const destination=target.clone();
      if(coreWave!==0){const radial=target.clone().normalize();destination.addScaledVector(radial,coreWave);}
      if(blast && blastTime<3.4){const push=Math.sin(Math.min(1,blastTime/2.3)*Math.PI)*1.55;destination.addScaledVector(blast.directions[i],push);}
      const drag=dragging.current;
      if(drag){const original=targets[drag.anchor];const distance=target.distanceTo(original);const influence=Math.exp(-distance*distance/1.0);
        if(i===drag.anchor)destination.copy(drag.last);
        else destination.addScaledVector(drag.last.clone().sub(original),influence*.7);
      }
      if(magnet.current.active&&!drag){const offset=magnet.current.point.clone().sub(target);const d=offset.length();if(d<1.15&&d>.001)destination.addScaledVector(offset,(1-d/1.15)*.16);}
      if(p&&pulseTime<3.5){const d=p.dist[i];const arrival=d*.095;const age=pulseTime-arrival;
        if(age>=0&&age<.8){const strength=Math.sin(age/.8*Math.PI)*Math.exp(-pulseTime*.28);energy[i]=strength;
          const dir=target.clone().sub(targets[p.origin]).normalize();destination.addScaledVector(dir,Math.sin(age*28)*.22*strength);
        }
      }
      const stiffness=drag&&i===drag.anchor?35:18;
      const damp=drag&&i===drag.anchor?11:7.5;
      velocity.current[off]+=(destination.x-node.x)*stiffness*delta;
      velocity.current[off+1]+=(destination.y-node.y)*stiffness*delta;
      velocity.current[off+2]+=(destination.z-node.z)*stiffness*delta;
      const damping=Math.exp(-damp*delta);
      for(let axis=0;axis<3;axis++){velocity.current[off+axis]*=damping;positions[off+axis]+=velocity.current[off+axis]*delta;}
    }
    for(let k=0;k<edges.length;k++){
      const i=edges[k],off=i*3,out=k*3;
      linePositions[out]=positions[off];linePositions[out+1]=positions[off+1];linePositions[out+2]=positions[off+2];
      const strength=Math.max(energy[i],energy[edges[k^1]],Math.max(0,coreWave)*2);
      tempColor.copy(normal).lerp(bright,Math.min(1,strength*1.5));
      lineColors[out]=tempColor.r;lineColors[out+1]=tempColor.g;lineColors[out+2]=tempColor.b;
    }
    if(geometry.current)geometry.current.attributes.position.needsUpdate=true;
    if(linesGeometry.current){linesGeometry.current.attributes.position.needsUpdate=true;linesGeometry.current.attributes.color.needsUpdate=true;}
    anchors.forEach((index,i)=>{
      const mesh=anchorMeshes.current[i];if(!mesh)return;
      mesh.position.set(positions[index*3],positions[index*3+1],positions[index*3+2]);
      mesh.scale.setScalar(1+(selected===i?.24:0)+(hovered===i?.2:0)+energy[index]*1.3);
      (mesh.material as THREE.MeshStandardMaterial).color.set(selected===i?'#ffffff':hovered===i?'#ddffff':'#5deeff');
    });
    if(root.current&&!dragging.current)root.current.rotation.y+=delta*.045;
    if(p&&pulseTime>3.5)pulse.current=null;
    if(blast&&blastTime>3.4)explosion.current=null;
  });
  return <group ref={root}>
    <LivingCore shape={shape} impact={coreImpact}/>
    <pointLight color="#4ceaff" intensity={impactCount%2===0?1.4:1.8} distance={5}/>
    <lineSegments><bufferGeometry ref={linesGeometry}><bufferAttribute attach="attributes-position" args={[linePositions,3]}/><bufferAttribute attach="attributes-color" args={[lineColors,3]}/></bufferGeometry><lineBasicMaterial vertexColors transparent opacity={.34} depthWrite={false} blending={THREE.AdditiveBlending}/></lineSegments>
    <points><bufferGeometry ref={geometry}><bufferAttribute attach="attributes-position" args={[positions,3]}/></bufferGeometry><pointsMaterial color="#84dffb" size={.018} sizeAttenuation transparent opacity={.95} depthWrite={false}/></points>
    {anchors.map((index,i)=><mesh key={i} ref={el=>{anchorMeshes.current[i]=el;}} position={targets[index].toArray()} onPointerDown={e=>beginDrag(e,i)} onPointerMove={e=>{moveDrag(e);if(!dragging.current){const point=e.point.clone();root.current?.worldToLocal(point);magnet.current={point,active:true};}}} onPointerUp={e=>endDrag(e,i)} onPointerOver={e=>{e.stopPropagation();setHovered(i);document.body.style.cursor='grab';}} onPointerOut={()=>{setHovered(null);if(!dragging.current)document.body.style.cursor='auto';}}>
      <sphereGeometry args={[.078,22,22]}/><meshStandardMaterial color="#5deeff" emissive="#18b9f5" emissiveIntensity={1.6} metalness={.28} roughness={.24}/>
    </mesh>)}
    {hovered!==null&&<Html position={[positions[anchors[hovered]*3],positions[anchors[hovered]*3+1]+.2,positions[anchors[hovered]*3+2]]} center style={{pointerEvents:'none',whiteSpace:'nowrap',font:'bold 11px monospace',color:'#d5fcff',textShadow:'0 0 12px #00d9ff'}}>{neuralNodes[hovered].label}</Html>}
    <mesh onClick={e=>{e.stopPropagation();coreImpact.current={time:performance.now()/1000,strength:.8};setImpactCount(v=>v+1);}} onDoubleClick={explode} onPointerMove={e=>{if(dragging.current)return; e.stopPropagation();const p=e.point.clone();root.current?.worldToLocal(p);magnet.current={point:p,active:true};}} onPointerOut={()=>{magnet.current.active=false;}}>
      <sphereGeometry args={[1.03,32,24]}/><meshBasicMaterial transparent opacity={0} depthWrite={false} side={THREE.DoubleSide}/>
    </mesh>
  </group>;
}
export default function NeuralCore({shape='sphere',selected=null,onSelect=()=>{}}:{shape?:Shape;selected?:number|null;onSelect?:(i:number)=>void}){
  const [dragging,setDragging]=useState(false);
  return <div className="neural-canvas" aria-label="Red neuronal interactiva: arrastrá puntos para deformar la red, soltá para emitir energía, doble clic para explosión, rueda para zoom y seleccioná proyectos.">
    <Canvas camera={{position:[0,0,5.7],fov:48}} dpr={[1,1.6]} gl={{alpha:true,antialias:true,powerPreference:"high-performance"}} fallback={<div className="canvas-fallback">NEURAL CORE / ONLINE</div>}>
      <ambientLight intensity={.7}/><Network shape={shape} selected={selected} onSelect={onSelect} onDragChange={setDragging}/>
      <OrbitControls enabled={!dragging} enablePan={false} minDistance={3.2} maxDistance={9} enableDamping dampingFactor={.08} rotateSpeed={.7}/>
    </Canvas>
  </div>;
}
