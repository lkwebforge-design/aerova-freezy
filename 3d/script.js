import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js";

const loader=document.querySelector("#loader"), line=document.querySelector(".loader-line i");
requestAnimationFrame(()=>line.style.width="100%");
window.addEventListener("load",()=>setTimeout(()=>{loader.style.opacity="0";loader.style.visibility="hidden"},900));

const canvas=document.querySelector("#scene");
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.7)); renderer.setSize(innerWidth,innerHeight); renderer.outputColorSpace=THREE.SRGBColorSpace;
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(35,innerWidth/innerHeight,.1,100); camera.position.set(0,0,7.5);
const group=new THREE.Group(); scene.add(group);
scene.add(new THREE.AmbientLight(0xffffff,.55));
const key=new THREE.PointLight(0xc9a6ff,22,12); key.position.set(3,3,4); scene.add(key);
const rim=new THREE.PointLight(0xff8c72,14,10); rim.position.set(-4,-1,2); scene.add(rim);

const core=new THREE.Mesh(new THREE.IcosahedronGeometry(1.35,5),new THREE.MeshPhysicalMaterial({color:0x9b76d9,roughness:.18,metalness:.42,transmission:.18,thickness:.8,clearcoat:1,clearcoatRoughness:.12}));
group.add(core);
const shell=new THREE.Mesh(new THREE.IcosahedronGeometry(1.65,2),new THREE.MeshBasicMaterial({color:0xb99aff,wireframe:true,transparent:true,opacity:.1}));
group.add(shell);

const dust=new THREE.BufferGeometry(), count=420, pos=new Float32Array(count*3);
for(let i=0;i<count;i++){const r=THREE.MathUtils.randFloat(2.3,5.8), a=Math.random()*Math.PI*2, b=Math.acos(THREE.MathUtils.randFloatSpread(2));pos[i*3]=r*Math.sin(b)*Math.cos(a);pos[i*3+1]=r*Math.cos(b);pos[i*3+2]=r*Math.sin(b)*Math.sin(a)}
dust.setAttribute("position",new THREE.BufferAttribute(pos,3));
scene.add(new THREE.Points(dust,new THREE.PointsMaterial({color:0xc9a6ff,size:.012,transparent:true,opacity:.7})));

let mx=0,my=0,targetX=0,targetY=0,scroll=0;
addEventListener("pointermove",e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});
addEventListener("scroll",()=>scroll=scrollY);
function resize(){renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix()} addEventListener("resize",resize);

const clock=new THREE.Clock();
function tick(){const t=clock.getElapsedTime();targetX+=(mx*.65-targetX)*.035;targetY+=(my*.35-targetY)*.035;
group.rotation.y=targetX+scroll*.00025;group.rotation.x=targetY+Math.sin(t*.45)*.05;
core.rotation.x=t*.12;core.rotation.z=t*.18;shell.rotation.y=-t*.09;shell.rotation.x=t*.06;
dust.rotation.y=t*.015; dust.rotation.x=Math.sin(t*.08)*.1;
group.position.x=-targetX*.7; group.position.y=targetY*.35-scroll*.00012;
renderer.render(scene,camera);requestAnimationFrame(tick)} tick();

const io=new IntersectionObserver(entries=>entries.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.14});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

document.querySelectorAll(".card-wrap").forEach(card=>{
 let startX=0,startY=0,dragging=false;
 card.addEventListener("click",()=>card.classList.toggle("flipped"));
 card.addEventListener("pointerdown",e=>{dragging=true;startX=e.clientX;startY=e.clientY;card.setPointerCapture(e.pointerId)});
 card.addEventListener("pointerup",e=>{if(Math.abs(e.clientX-startX)>18)card.classList.toggle("flipped");dragging=false});
 card.addEventListener("pointermove",e=>{if(!dragging)return;const dx=e.clientX-startX;card.querySelector(".card").style.transform=`rotateY(${dx*.45}deg) rotateX(${(e.clientY-startY)*-.08}deg)`});
 card.addEventListener("pointerleave",()=>{if(!dragging)card.querySelector(".card").style.transform=""});
});

const cursor=document.querySelector(".cursor");addEventListener("pointermove",e=>{cursor.style.left=e.clientX+"px";cursor.style.top=e.clientY+"px"});
document.querySelectorAll("a,.card-wrap").forEach(el=>{el.addEventListener("mouseenter",()=>{cursor.style.width="34px";cursor.style.height="34px"});el.addEventListener("mouseleave",()=>{cursor.style.width="12px";cursor.style.height="12px"})});