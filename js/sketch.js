const NEW_LINE = '$'
const TITLE = 'BASEL.CODES 📆 09.02.19 🏛 @H3K && 🏫 @HGK'


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
      $('#title-animation').lettering();
    }
  }, 100);

}
