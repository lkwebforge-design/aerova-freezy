const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
const cursor=document.querySelector(".cursor");window.addEventListener("pointermove",e=>{if(cursor)cursor.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`;document.documentElement.style.setProperty("--mx",e.clientX+"px");document.documentElement.style.setProperty("--my",e.clientY+"px")});
document.querySelectorAll(".villa-card").forEach(card=>{card.addEventListener("click",()=>{const room=card.dataset.room;const select=document.querySelector("#villa");[...select.options].forEach(o=>{if(o.textContent.startsWith(room))select.value=o.value});document.querySelector("#booking").scrollIntoView({behavior:"smooth"})});card.addEventListener("pointermove",e=>{const r=card.getBoundingClientRect();card.style.setProperty("--rx",((e.clientY-r.top)/r.height-.5)*-8+"deg");card.style.setProperty("--ry",((e.clientX-r.left)/r.width-.5)*8+"deg")});card.addEventListener("pointerleave",()=>{card.style.setProperty("--rx","0deg");card.style.setProperty("--ry","0deg")})});
document.querySelectorAll(".card-link").forEach(btn=>btn.addEventListener("click",()=>{const text=encodeURIComponent("Hi AURA, I'd like to add "+btn.dataset.experience+" to my stay.");window.open("https://wa.me/94770000000?text="+text,"_blank")}));
document.querySelector("#bookingForm").addEventListener("submit",e=>{e.preventDefault();const a=document.querySelector("#checkin").value,b=document.querySelector("#checkout").value,g=document.querySelector("#guests").value,v=document.querySelector("#villa").value;if(!a||!b||b<=a){alert("Please choose a valid check-in and check-out date.");return}const msg=encodeURIComponent("Hi AURA, I'd like to plan a stay.\n\nCheck-in: "+a+"\nCheck-out: "+b+"\nGuests: "+g+"\nVilla: "+v+"\n\nPlease confirm availability.");window.open("https://wa.me/94770000000?text="+msg,"_blank")});
const menu=document.querySelector(".menu"),mobile=document.querySelector(".mobile-menu");menu.addEventListener("click",()=>mobile.classList.toggle("open"));mobile.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>mobile.classList.remove("open")));
document.querySelectorAll(".hero,.feature-image,.quote-image,.booking").forEach(el=>{
  el.addEventListener("pointermove",e=>{
    const r=el.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    el.style.setProperty("--px",(x*14)+"px"); el.style.setProperty("--py",(y*10)+"px");
  });
  el.addEventListener("pointerleave",()=>{el.style.setProperty("--px","0px");el.style.setProperty("--py","0px")});
});
const parallaxStyle=document.createElement("style");
parallaxStyle.textContent=".hero-bg,.feature-image img,.quote-image img{transform:translate3d(var(--px,0),var(--py,0),0) scale(1.04);transition:transform .25s ease-out}";
document.head.appendChild(parallaxStyle);
