// Typing effect in the hero
(function(){
  var text = 'const priti = {\n  role: "Software Developer",\n  stack: ["PHP", "JS", "Python"],\n  education: "MCA, 2023",\n  openToWork: true\n};';
  var el = document.getElementById("typed");
  function paint(s){
    s = s.replace(/&/g,"&amp;").replace(/</g,"&lt;");
    s = s.replace(/"[^"]*"/g,'<span class="s">$&</span>').replace(/^const/,'<span class="k">const</span>').replace(/^(\s+)(\w+):/gm,'$1<span class="p">$2</span>:');
    el.innerHTML = s;
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches){ paint(text); return; }
  var i = 0;
  setTimeout(function tick(){ paint(text.slice(0,i)); if (i++ < text.length) setTimeout(tick, 45); }, 800);
})();

// Reveal on scroll + number counters
(function(){
  var items = document.querySelectorAll(".reveal");
  function count(box){
    box.querySelectorAll("[data-count]").forEach(function(n){
      var end = +n.dataset.count, t0 = null;
      (function step(t){ t0 = t0 || t; var p = Math.min((t - t0)/1200, 1); n.textContent = Math.round(end * p); if (p < 1) requestAnimationFrame(step); })(performance.now());
    });
  }
  if (!("IntersectionObserver" in window)){ items.forEach(function(e){e.classList.add("in"); count(e);}); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); count(e.target); io.unobserve(e.target); } });
  }, {threshold:.15});
  items.forEach(function(e,i){ e.style.transitionDelay = (i % 3) * 90 + "ms"; io.observe(e); });
})();

// Scroll progress bar
(function(){
  var bar = document.getElementById("bar");
  window.addEventListener("scroll", function(){
    var h = document.documentElement;
    bar.style.width = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) * 100) + "%";
  }, {passive:true});
})();

// Mouse glow on cards
document.querySelectorAll(".card").forEach(function(c){
  c.addEventListener("mousemove", function(e){
    var r = c.getBoundingClientRect();
    c.style.setProperty("--mx", (e.clientX - r.left) + "px");
    c.style.setProperty("--my", (e.clientY - r.top) + "px");
  });
});

// Tilt the editor window with the mouse
(function(){
  var ed = document.getElementById("editor");
  if (!ed || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  ed.addEventListener("mousemove", function(e){
    var r = ed.getBoundingClientRect();
    ed.style.setProperty("--ry", ((e.clientX - r.left) / r.width - .5) * 14 + "deg");
    ed.style.setProperty("--rx", (.5 - (e.clientY - r.top) / r.height) * 10 + "deg");
  });
  ed.addEventListener("mouseleave", function(){ ed.style.removeProperty("--ry"); ed.style.removeProperty("--rx"); });
})();

