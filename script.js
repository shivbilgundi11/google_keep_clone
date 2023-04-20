const textArea = document.querySelector("textarea"),
  titleInput = document.querySelector(".title-input"),
  inputFooter = document.querySelector(".input-footer"),
  descInput = document.querySelector(".desc-input"),
  closeBtn = document.querySelector(".close"),
  addBtn = document.querySelector(".add"),
  colorIcon = document.querySelector(".color-icon"),
  colorPalette = document.querySelector(".color-pallet"),
  main = document.querySelector("main"),
  inputContainer = document.querySelector(".input-container"),
  notesCont = document.querySelector(".notes-wrapper"),
  buttons = document.querySelectorAll(".clr");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");

let isUpdate = false;
let updateId;

//Toggling The Color Palette...
colorIcon.addEventListener("click", () => {
  colorPalette.classList.toggle("hidden");
});

//Displaying the title-input and color-pallette on the focus of textarea...
textArea.addEventListener("focus", () => {
  titleInput.style.display = "block";
  descInput.style.height = "100px";
  inputFooter.style.display = "flex";
});
//Hiding the title-input and color-pallette onclick of closeBtn...
closeBtn.addEventListener("click", closeInput);
function closeInput() {
  isUpdate = false;
  inputContainer.style.backgroundColor = "";

  titleInput.value = "";
  textArea.value = "";

  titleInput.style.display = "none";
  descInput.style.height = "40px";
  inputFooter.style.display = "none";

  addBtn.innerText = "Add";


  if (!colorPalette.classList.contains("hidden")) {
    colorPalette.classList.add("hidden");
  } else {
    return false;
  }
}
//Opening the input-cont onclick of editIcon...
function openInput() {
  titleInput.value = "";
  textArea.value = "";

  titleInput.style.display = "block";
  descInput.style.height = "100px";
  inputFooter.style.display = "flex";

  textArea.focus();

  if (!colorPalette.classList.contains("hidden")) {
    colorPalette.classList.add("hidden");
  } else {
    return false;
  }
}

//Now the main function's starts here...

//bg color for inputCont on the click of particular btn...
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    let color = btn.style.backgroundColor;

    inputContainer.style.backgroundColor = color;
    colorPalette.classList.add("hidden");
  });
});



//displaying the data from the local storage...
function showNotes() {
  document.querySelectorAll('.card').forEach(note => note.remove());
  notes.forEach((note, index) => {
    let noteDiv = `<div class="card" style="background-color: ${note.bg};">
                        <div class="title-cont">
                            <h4 class="card-title">
                                ${note.title}
                            </h4>
                        </div>

                        <div class="desc-cont">
                            <p class="card-desc">${note.description}</p>
                        </div>

                        <div class="card-footer">
                            <h5 class="date">${note.date}</h5>

                            <div class="settings-icons">
                                <i class="ri-pencil-fill" onclick="updateNote('${index}', '${note.title}', '${note.description}', '${note.bg}')"></i>
                                <i class="ri-delete-bin-fill" onclick="deleteNote(${index})"></i>
                            </div>
                        </div>
                    </div>`;

    notesCont.insertAdjacentHTML("afterbegin", noteDiv);
  });
};
showNotes();



//deleting the note from the notes list on delete icon is clicked...
function deleteNote(noteId) {
  let confirmDelete = confirm("Are you sure you want to delete this note?");

  if (!confirmDelete) {
    return;
  };

  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  closeInput();
  showNotes();
};



//update the notes on click on edit icon...
function updateNote(noteId, title, desc, background){
  isUpdate = true;
  updateId = noteId;
  openInput();
  addBtn.innerText = "Update"
  inputContainer.style.backgroundColor = background;

  titleInput.value = title;
  textArea.value = desc;
  bg = background;
};



//getting the data and storing in the local storage...
addBtn.addEventListener("click", () => {
  let noteTitle = titleInput.value,
    noteDesc = textArea.value,
    bgColor = inputContainer.style.backgroundColor;

  if (noteTitle || noteDesc) {
    let dateObj = new Date(),
      month = months[dateObj.getMonth()],
      day = dateObj.getDate(),
      year = dateObj.getFullYear();

    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      date: `${month} ${day}, ${year}`,
      bg : bgColor
    };

    if(!isUpdate){
      notes.push(noteInfo);
    }else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }


    localStorage.setItem("notes", JSON.stringify(notes));

    closeInput();
    showNotes();
  }
});