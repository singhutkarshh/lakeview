// To do list
// give a delete button
//add a scroll bar 

function Album(Song,Singer,Genre){
	this.song=Song;
	this.singer=Singer;
	this.genre=Genre; }

//Display Constructor
function Display(){
	
	}

//Add functions to Display prototype (instead we could use classes of ES6)

	function AddUI(){
	   console.log("Adding to UI");
		let songs = localStorage.getItem("songs")
		let singers = localStorage.getItem("singers");
		let genres = localStorage.getItem("genres");
		if(localStorage.getItem("songs") === null ){
			songobj=[];
			singerobj=[];
			genreobj=[];
		}
		else {
		songobj = JSON.parse(songs);
		singerobj = JSON.parse(singers);
		genreobj = JSON.parse(genres);
		}
		let uiString;
		songobj.forEach(function(element,index){
			uiString +=
					`<tr>
					<th scope="row"></th>
				      <th scope="row" >${index+1}</th>
				      <td>${element}</td>
				      <td>${singerobj[index]}</td>
				      <td>${genreobj[index]}</td>
				      <td><button type="submit" class="btn btn-primary " id="${index}" onclick="removeAlbum(this.id)" >Remove</button></td>
				    </tr>`;
		});
	let tableBody = document.getElementById('tableBody');
	tableBody.innerHTML = uiString;

	};

	function removeAlbum(index){
		let songs = localStorage.getItem("songs")
		let singers = localStorage.getItem("singers");
		let genres = localStorage.getItem("genres");
		if(localStorage.getItem("songs") === null ){
			songobj=[];
			singerobj=[];
			genreobj=[];
		}
		else {
		songobj = JSON.parse(songs);
		singerobj = JSON.parse(singers);
		genreobj = JSON.parse(genres);
		}
		songobj.splice(index,1);
		singerobj.splice(index,1);
		genreobj.splice(index,1);

		localStorage.setItem("songs",JSON.stringify(songobj));
		localStorage.setItem("singers",JSON.stringify(singerobj));
		localStorage.setItem("genres",JSON.stringify(genreobj));

		console.log("deleted ${index+1} Album");
		AddUI();
	}

	 Display.prototype.clear = function(){
		let libraryForm = document.getElementById('libraryForm');
		console.log("reset");
		libraryForm.reset();  //resets form
	};

	 Display.prototype.validate = function(album){
	 	let x= album.song;
	 	if( (x.length)< 3) {
	 		return false;
	 	}
	 	else{
	 		return true ;
	 	}
	 	return true;
	 
	  };

	  Display.prototype.showAlert = function(event){
	  	let html;
	  	if(event){
	  	  html = `
	  			<div class="alert alert-success alert-dismissible fade show" role="alert" id="alert">
		      <strong> Success!</strong> Your Album has been added to the Library. 
		      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
		      </div> ` ;
		 }
		 else if(!event){
		 	 html = `
	  			<div class="alert alert-warning alert-dismissible fade show" role="alert" id="alert">
		      <strong> Warning! </strong> Enter atleast 3 characters in the required field. 
		      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
		      </div> ` ;
		 }

		let a = document.getElementById("alertBox");
		a.innerHTML = html;

 	//  Setting timeout for alert message
		setTimeout (function(){
			a.innerHTML="";
		},3000);
	};

	Display.prototype.storeData = function(Song,Singer,Genre){
		
	let songs = localStorage.getItem("songs")
	let singers = localStorage.getItem("singers");
	let genres = localStorage.getItem("genres");
	if(localStorage.getItem("songs") === null ){
		songobj=[];
		singerobj=[];
		genreobj=[];
	}
	else {
	songobj = JSON.parse(songs);
	singerobj = JSON.parse(singers);
	genreobj = JSON.parse(genres);
	}

	songobj.push(Song);
	localStorage.setItem("songs",JSON.stringify(songobj));
	singerobj.push(Singer);
	localStorage.setItem("singers",JSON.stringify(singerobj));
	genreobj.push(Genre);
	localStorage.setItem("genres",JSON.stringify(genreobj));
	console.log(localStorage.getItem("songs"),localStorage.getItem("singers"),localStorage.getItem("genres"));
	};

//All function Definitions end here


//add submit event listener to form(could have used addbtn, click)

let libraryForm = document.getElementById('libraryForm');
AddUI(); //shows the data as soon as page reloads
libraryForm.addEventListener('submit', libraryFormSubmit);
function libraryFormSubmit(e){
	e.preventDefault(); //because a form on submission reloads a page
	console.log("form Submitted");

	let Song=document.getElementById("albumSong").value;
	let Singer=document.getElementById("albumSinger").value;

	// .checked()  tells if a radio is checked or not;
	
	let Genre;
	if(document.getElementById("pop").checked){
		Genre=document.getElementById("pop").value + "(MUSIC)";
	}
	else if(document.getElementById("rock").checked){
		Genre=document.getElementById("rock").value + "(MUSIC)";
	}
	else if(document.getElementById("edm").checked){
		Genre=document.getElementById("edm").value + "(MUSIC)";
	}
	else if(document.getElementById("classical").checked){
		Genre=document.getElementById("classical").value + "(MUSIC)";
	} 
	else if(document.getElementById("Adventure").checked){
		Genre=document.getElementById("Adventure").value + "(BOOK)";
	} 
	else if(document.getElementById("Sci-fi").checked){
		Genre=document.getElementById("Sci-fi").value + "(BOOK)";
	} 
	else if(document.getElementById("Novel").checked){
		Genre=document.getElementById("Novel").value + "(BOOK)";
	} 
	else if(document.getElementById("Documentary").checked){
		Genre=document.getElementById("Documentary").value + "(BOOK)";
	} 
	
	let album = new Album(Song,Singer,Genre);
	console.log(album);

	let display = new Display();

	if(Song.length > 3 && Singer.length>3){
	display.storeData(Song,Singer,Genre); //storing data into Local Storage
	}

	let event;
	if(display.validate(album)){
	AddUI();
	display.clear();
	event = true;
	display.showAlert(event);
	}

	else{
	event = false;
	display.showAlert(event);
	}
}
