const stage=document.querySelector("#stage");
const orbWrap=document.querySelector(".orb-wrap");
const orb=document.querySelector(".orb");

let tx=0,ty=0,cx=0,cy=0;
stage.addEventListener("pointermove",(e)=>{
  const r=stage.getBoundingClientRect();
  const x=(e.clientX-r.left)/r.width-.5;
  const y=(e.clientY-r.top)/r.height-.5;
  tx=x*18; ty=y*-18;
});
stage.addEventListener("pointerleave",()=>{tx=0;ty=0});

function loop(){
  cx+=(tx-cx)*.08; cy+=(ty-cy)*.08;
  orbWrap.style.transform=`rotateX(${cy}deg) rotateY(${cx}deg)`;
  orb.style.transform=`translateZ(0) rotateX(${-cy*.35}deg) rotateY(${-cx*.35}deg)`;
  requestAnimationFrame(loop);
}
loop();

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("visible")});
},{threshold:.15});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.querySelector(".magnetic").addEventListener("pointermove",(e)=>{
  const b=e.currentTarget.getBoundingClientRect();
  const x=(e.clientX-(b.left+b.width/2))*.12;
  const y=(e.clientY-(b.top+b.height/2))*.12;
  e.currentTarget.style.transform=`translate(${x}px,${y}px)`;
});
document.querySelector(".magnetic").addEventListener("pointerleave",(e)=>e.currentTarget.style.transform="");
