$('.app-icon').draggable();

var notepadCode = $('#notepadCode').html();

function openNotepad() {
  eval(notepadCode);
}
