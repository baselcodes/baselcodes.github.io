//const NEW_LINE = '$'
const TITLE = 'basel.codes 🎉 processing community day 📆 09.02.19 🏛 @h3k && 🏫 @hgk basel, switzerland 📣 open call for workshops and presentations 🤟'


let index = 0;
selectedText = '';
write = true;
selectedText = TITLE.split('');
if (selectedText != '') {
  SI = setInterval(() => {
    let myDiv = document.getElementById('title-animation');
    if (write) {
      let letter = selectedText[index];
      //if (letter === NEW_LINE) letter = '<br>'
      myDiv.innerHTML += letter;
      myDiv.scrollTop = myDiv.scrollHeight;
      index++;
    }
    if (index >= selectedText.length) {
      write = false;
      setTimeout(() => {
        clearInterval(SI);
      }, 2000);
      myDiv.innerHTML = '<p>basel.codes</p><a href="https://day.processing.org" target="_blank" >🎉 processing community day</a><p>📆 09.02.19</p><a href="http://www.hek.ch/" target="_blank" >🏛 @h3k</a><p>&&</p><a href="https://www.fhnw.ch/de/die-fhnw/hochschulen/hgk" target="_blank" >🏫 @hgk</a><p>basel, switzerland</p><a href="https://docs.google.com/forms/d/e/1FAIpQLScsw6eTpP0SagAixIytgZOCWeMpwjwcjG1QJT7PN9V0kR8xIA/viewform" target="_blank" >📣 open call for workshops and presentations</a><a href="mailto:helloworld@basel.codes">🤟</a>'
      //   $('#title-animation').lettering();
    }
  }, 100);

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
let balls = [];
function setup(){
  cnv = createCanvas(innerWidth, innerHeight);
  cnv.parent('p5')
  for(let i = 0; i< 50; i++)balls.push(new Ball());
}

function draw(){
  background(200);
  for (const ball of balls) {
    ball.update();
    // ball.proximity(balls);
    ball.show(balls);
  }
}

function windowResized(){
  resizeCanvas(innerWidth, innerHeight);
}

window.onblur = function() { noLoop(); }
window.onfocus = function() { loop(); }