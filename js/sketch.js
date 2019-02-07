//const NEW_LINE = '$'
const TITLES = ['basel.codes', 'processing community day', 'full program here', '09.02.19', '@h3k', '&&', '@hgk', 'basel, switzerland', 'free talks + workshops + party!', 'register online', 'helloworld@basel.codes'];

let index = 0;
let elmIndex = 0;
let elms = document.getElementById('title-animation').children;

// purge info on first load (but SEO saw it!)
if (!sessionStorage.getItem('baselcodes')) {
  for (let i = 0; i < elms.length; i++) {
    elms[i].style.visibility = "hidden";
    elms[i].innerHTML = "";
  }

  write = true;

  SI = setInterval(() => {
    selectedText = TITLES[elmIndex].split('');
    elms[elmIndex].style.visibility = "visible";
    if (write) {
      let letter = selectedText[index];
      elms[elmIndex].innerHTML += letter;
      index++;
    }

    if (index >= selectedText.length) {
      elmIndex++;
      index = 0;
    }

    if (elmIndex >= TITLES.length) {
      write = false;
      clearInterval(SI);
      sessionStorage.setItem('baselcodes', true);
    }
  }, 80); // was 70, slowed down a tad
}

window.onmousemove = (event) => {
  // console.log(event.clientX, event.clientY);
  const x = ((event.clientX / innerWidth) - 0.5) * 2;
  const y = ((event.clientY / innerHeight) - 0.5) * 2;
  // console.log(x, y);
  const shadow = '#ff0 ' + x * 5 + 'px ' + y * 5 + 'px';
  // console.log(shadow);
  // document.getElementById('title-animation').style.textShadow = shadow;
}

let cnv;
const personaggini = [];
function setup() {
  cnv = createCanvas(innerWidth, innerHeight);
  cnv.parent('p5');
  textAlign(CENTER, CENTER)
  let loopc = innerWidth/30;
  let brdr = 20;
  for (let i = 0; i < loopc; i++)personaggini.push(new Boid(random(brdr, width-brdr), random(brdr, height-brdr)));
}

function draw() {
  background(200);
  for (const boid of personaggini) {
    boid.update();
    boid.proximity(personaggini);
    boid.edges();
    boid.show(personaggini);
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

function mousePressed(){
  personaggini.push(new Boid(mouseX, mouseY))
}

window.onblur = function () { noLoop(); }
window.onfocus = function () { loop(); }