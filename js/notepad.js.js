
//same function adding at start to show all notes as soon as page reloads
showNotes();
// if a user adds a note then add it to local storage
let addBtn = document.getElementById("addBtn");
 addBtn.addEventListener("click",function(e){
 	let addTxt = document.getElementById("addTxt");
 	let notes = localStorage.getItem("notes");
 	if(notes == null){
 		notesObj=[];  //creating notes array in starting
 	}
 	else{
 		 notesObj=JSON.parse(notes);
 	 }

 	notesObj.push(addTxt.value); //pusing textarea into notes
 	localStorage.setItem("notes",JSON.stringify(notesObj));
 	addTxt.value="";
 	console.log(notesObj);
 	showNotes();
});

//Function showing added notes from Local Storage
    function showNotes(){
 	  let notes = localStorage.getItem("notes");
 	 if(notes == null){
 	 	notesObj=[];
 	     }
 	 else{
 	 	 notesObj=JSON.parse(notes);
 	     }
 	  let html="";
 	 notesObj.forEach(function(element,index){
 	 	html += `
 			<div class=" noteCard card my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
                  <h5 class="card-title"  >Note ${index+1}</h5>
                  <p class="cardInnerTxt card-text">${element}</p>
                  <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
            </div>`
 	 });
 	 let content=document.getElementById("notes");
 	 if(notesObj.length!=0){
 	 		content.innerHTML=html;
 	 		content.setAttribute("style","font-size:22px;");
 	 	}
 	else {
 			content.innerHTML=`You have not Added anything yet!
 								Please Add a Note.
 								`
 			content.setAttribute("style","font-size:20px;");
 }
}

//deleting notes

		function deleteNote(index){
			console.log("I am deleting",index);
			 let notes = localStorage.getItem("notes");
 	 if(notes == null){
 	 	notesObj=[];
 	     }
 	 else{
 	 	 notesObj=JSON.parse(notes);
 	     }
 	     notesObj.splice(index,1);
 	     localStorage.setItem("notes",JSON.stringify(notesObj));
 	     showNotes();

		}

//Adding a Search Feature
	let search = document.getElementById("searchTxt");

	search.addEventListener("input",function(){
		let input_value=search.value.toLowerCase();
		console.log("Searching Started!");
		let noteCards =document.getElementsByClassName("noteCard");
		Array.from(noteCards).forEach(function(e){
			let cardTxt = e.getElementsByTagName("p")[0].innerHTML;
			if(cardTxt.includes(input_value)){
				e.style.display = "block";
			}
			else{
				e.style.display = "none";
			}
		});
	});
