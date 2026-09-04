const menuBtn=document.getElementById("menuBtn"),nav=document.getElementById("navLinks");
menuBtn?.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const progress=document.getElementById("progress");
window.addEventListener("scroll",()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(scrollY/h*100)+"%"},{passive:true});

document.getElementById("year").textContent=new Date().getFullYear();

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach((el,i)=>{el.style.transitionDelay=(i%4)*60+"ms";observer.observe(el)});

const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll(".nav-links a")];
const spy=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){navLinks.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id))}}),{rootMargin:"-35% 0px -55% 0px"});
sections.forEach(s=>spy.observe(s));

const canvas=document.getElementById("network"),ctx=canvas?.getContext("2d");
let dots=[];
function resize(){if(!canvas)return;canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);dots=Array.from({length:Math.min(55,Math.floor(innerWidth/24))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18}))}
function draw(){if(!ctx)return;ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of dots){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,1,0,Math.PI*2);ctx.fillStyle="rgba(100,170,255,.55)";ctx.fill()}for(let i=0;i<dots.length;i++)for(let j=i+1;j<dots.length;j++){const a=dots[i],b=dots[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<130){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(77,141,255,${.16*(1-d/130)})`;ctx.stroke()}}requestAnimationFrame(draw)}
addEventListener("resize",resize);resize();draw();