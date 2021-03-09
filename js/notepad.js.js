
//same function adding at start to show all notes as soon as page reloads
showNotes();

//for preventing null error bug
if(localStorage.getItem("notes")==null){
	localStorage.clear();
}
// if a user adds a note then add it to local storage
let addBtn = document.getElementById("addBtn");

 addBtn.addEventListener("click",function(e){
 	let titleTxt = document.getElementById("titleTxt");
 	let addTxt = document.getElementById("addTxt");
 	let titles = localStorage.getItem("titles")
 	let notes = localStorage.getItem("notes");
 	if(notes == null){
 		notesObj=[];  //creating notes array in starting
 		titleObj=[];
 	}
 	else{
 		 titleObj =JSON.parse(titles);
 		 notesObj=JSON.parse(notes);
 	 }
 	notesObj.push(addTxt.value); //pusing textarea into notes
 	titleObj.push(titleTxt.value);
 	localStorage.setItem("notes",JSON.stringify(notesObj));
 	localStorage.setItem("titles",JSON.stringify(titleObj));
 	addTxt.value="";
 	titleTxt.value="";
 	console.log("Note Added!")
 	showNotes();
});

//Function showing added notes from Local Storage
    function showNotes(){
     let titles = localStorage.getItem("titles")
 	  let notes = localStorage.getItem("notes");
 	 if(notes == null){
 		notesObj=[];  //creating notes array in starting
 		titleObj=[];
 	}
 	else{
 		 titleObj =JSON.parse(titles);
 		 notesObj=JSON.parse(notes);
 	 }
 	  let html="";
 	 notesObj.forEach(function(element,index){
 	 	html += `
 			<div class=" noteCard card my-2 mx-2" style="width:18rem;">
            <div class="card-body">
                  <h5 class="card-title"  >${titleObj[index]}</h5>
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
			console.log("Note Deleted");
			 let notes = localStorage.getItem("notes");
			 let titles=localStorage.getItem("titles");
 	 if(notes == null){
 	 	notesObj=[];
 	 	titleObj=[];
 	     }
 	 else{
 	 	 notesObj=JSON.parse(notes);
 	 	 titleObj=JSON.parse(titles);
 	     }
 	     notesObj.splice(index,1);
 	     titleObj.splice(index,1);
 	     localStorage.setItem("notes",JSON.stringify(notesObj));
 	     localStorage.setItem("titles",JSON.stringify(titleObj));
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
