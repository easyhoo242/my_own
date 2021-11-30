gsap.registerPlugin(DrawSVGPlugin);

const tl = gsap.timeline({paused: true});

tl.from('.prints > *',{
  duration: 1,
  drawSVG: "0%",
  ease: 'none',
  stagger: 0.1,
})
tl.from('.draw > *',{
  duration: 1,
  drawSVG: "0%",
  ease: 'none',
  stagger: 0.1,
}, '<1')

const button = document.querySelector('.button');

button.addEventListener("mouseenter",  (e) => {
  tl.restart()
});