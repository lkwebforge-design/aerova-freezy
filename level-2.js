const observer=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.12});document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));
document.querySelectorAll("[data-card]").forEach(card=>{
 let rx=0,ry=0,baseX=0,baseY=0,drag=false,lastX=0,lastY=0,flipped=false;
 const zone=card.parentElement;
 zone.addEventListener("pointermove",e=>{if(drag){ry+=e.clientX-lastX;rx-=e.clientY-lastY;lastX=e.clientX;lastY=e.clientY}else{const r=zone.getBoundingClientRect();ry=((e.clientX-r.left)/r.width-.5)*22;rx=-((e.clientY-r.top)/r.height-.5)*22}card.style.transform=`rotateX(${rx}deg) rotateY(${ry+(flipped?180:0)}deg)`});
 zone.addEventListener("pointerleave",()=>{if(!drag){rx=0;ry=0;card.style.transform=`rotateX(0deg) rotateY(${flipped?180:0}deg)`}});
 zone.addEventListener("pointerdown",e=>{drag=true;lastX=e.clientX;lastY=e.clientY;zone.setPointerCapture(e.pointerId)});
 zone.addEventListener("pointerup",()=>{drag=false});
 zone.addEventListener("click",()=>{if(Math.abs(ry)>35)return;flipped=!flipped;card.style.transform=`rotateX(${rx}deg) rotateY(${ry+(flipped?180:0)}deg)`});
});
