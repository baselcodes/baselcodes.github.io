const NEW_LINE = '$'
const TITLE = 'BASEL.CODES$📆$09.02.19$@H3K🏛 && @HGK🏫$📣$OPEN CALL$FOR WORKSHOPS AND PRESENTATIONS'


let index = 0;
selectedText = '';
write = true;
selectedText = TITLE.split('');
if (selectedText != '') {
  SI = setInterval(() => {
    let myDiv = document.getElementById('title-animation');
    if (write) {
      let letter = selectedText[index];
      if (letter === NEW_LINE) letter = '<br>'
      myDiv.innerHTML += letter;
      myDiv.scrollTop = myDiv.scrollHeight;
      index++;
    }
    if (index >= selectedText.length) {
      write = false;
      setTimeout(() => {
        clearInterval(SI);
      }, 2000);
      myDiv.innerHTML = 'BASEL.CODES<br>📆<br>09.02.19<br><a href="http://www.hek.ch/" target="_blank" rel="noopener noreferrer">@H3K🏛</a> && <a href="https://www.fhnw.ch/de/die-fhnw/hochschulen/hgk" target="_blank" rel="noopener noreferrer">@HGK🏫</a><br>📣<br><a href="https://docs.google.com/forms/d/e/1FAIpQLScsw6eTpP0SagAixIytgZOCWeMpwjwcjG1QJT7PN9V0kR8xIA/viewform" target="_blank" rel="noopener noreferrer">OPEN CALL</a><br>FOR WORKSHOPS AND PRESENTATIONS'
    //   $('#title-animation').lettering();
    }
  }, 100);

}
