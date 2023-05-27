var langfile
function init(){
    var file = document.getElementById("input").files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            langfile = evt.target.result;
        }
        reader.onerror = function (evt) {
            document.getElementById("error").innerHTML += "mi ken ala lukin e lipu ni<br>";
        }
    }
}

function splitMora(word) {
    let splitword = Array.from(word);
    for (let letter = 0; letter < splitword.length; letter++) {
      if (letter >= splitword.length - 1) {
        break;
      }
      if (
        "ptksmnljw".includes(splitword[letter]) &&
        "aeiou".includes(splitword[letter + 1])
      ) {
        splitword[letter] = splitword[letter] + splitword.splice(letter + 1, 1)[0];
      }
    }
    return splitword;
  }

function IsTPWord(word){
    for(letter = 0; letter < word.length; letter++){
        if("ptksmnljwaeiou".indexOf(word[letter])==-1){
            return(false)
        }
    }
    if(word.indexOf("-") == -1){
        for(morph = 0; morph < splitMora(word).length; morph++){
            if(splitMora(word)[morph].length == 1 && "aeioun".indexOf(splitMora(word)[morph])==-1){
                return(false)
                break
            }
        }
    }
    return(true)
}

function saveFile(filename, data) {
    const blob = new Blob([data], {type: 'text/csv'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}