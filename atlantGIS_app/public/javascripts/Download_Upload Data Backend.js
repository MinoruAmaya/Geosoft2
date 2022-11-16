//Download Part




<div className="field" >
    <div className="ui icon input">
        <i className="file alternate icon"></i>
        <input 
        type="file"
        name="file"
        // value={this.State.file}
        placeholder="lesson file..."
        onChange={this.handleChange}
        />
    </div>
</div>

//When data is added to the form, 
//regardless of the input, the onChange function handles what 
//is inputted by storing it in this component’s local state, 
//as shown below.
state = {
    title: '',
    description:'',
    file:'',
    fileName:'',
    rating: null,
    timesUsed: 0,
    grade:'',
    subject:''
}

//When the user clicks the “Submit Lesson” button, 
//the information stored in the state above is what will be posted 
//to the Rails API.
//This is the handleChange that is utilized by all of my input fields.

handleChange = event => {
    //console.log(event.target.files)
    //console.log(event.target.value)
    if (event.target.files) {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    } else {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
}
//The above may be look a little confusing, specifically the event.target.files[0] part. 
//When the file is saved, there is a lot of information that is sent as part of event.target.files, 
//which is an array. What we want is the file itself, which is the first element of that array, 
//hence the [0]. 
//As you can see above, I got in the habit of console.logging my values to learn 
//exactly what was being received.





<form className="Lets Submit" onSUbmit={this.handleSubmit}></form>


handleSubmit= event => {
    event.preventDefault()
    //console.log(this.state.file)
    this.setState({
        fileName: this.state.file.name
    }, () => this.convertToString())
}

convertToString= () => {
    this.getString(this.state.file).then(data => this.handleSubmitWithFile(data))
}


getString = file => {
    return new Promise ((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload= ()=> resolve(reader.result.split(',')[1]);
        reader.oneerror = error => reject(error);
    });
}




resolve(reader.result.split(','[1]));






const {MongoClient} = require ('mongodb')
const url = 'mongodb://localhost:27017'  //connect to URL
const client = new MongoClient(url)//mongodb client


/*

fetch('http://localhost:27017/........, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        file: fileData,
        file_name: this.state.fileName,
        times_used: this.state.timesUsed


    })
})

*/





//File Upload




function dateiauswahl(evt) {
    // FileList-Objekt des input-Elements auslesen, auf dem 
    // das change-Event ausgelöst wurde (event.target)
    var files = evt.target.files; 
  
    // Deklarierung eines Array Objekts mit Namen "fragmente". Hier werden die Bausteine
    // für die erzeugte Listenausgabe gesammelt.
    var fragmente = [];
    // Zählschleife; bei jedem Durchgang den Namen, Typ und 
    // die Dateigröße der ausgewählten Dateien zum Array hinzufügen
    for (var i = 0, f; f = files[i]; i++) {
      fragmente.push('<li><strong>', f.name, '</strong> (', f.type || 'n/a', ') - ',
                     f.size, ' bytes</li>');
    }
    // Alle Fragmente im fragmente Array aneinanderhängen, in eine unsortierte Liste einbetten
    // und das alles als HTML-Inhalt in das output-Elements mit id='dateiListe' einsetzen.
    document.getElementById('dateiListe').innerHTML = '<ul>' + fragmente.join('') + '</ul>';
  }
  
  // UI-Events erst registrieren wenn das DOM bereit ist!
  document.addEventListener("DOMContentLoaded", function() {
    // Falls neue Eingabe, neuer Aufruf der Auswahlfunktion
    document.getElementById('dateien').addEventListener('change', dateiauswahl, false);
  });
