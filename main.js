function convert(){
    var file = document.getElementById("input").files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            langfile = evt.target.result;
            langfile = JSON.parse(langfile)
            for (let key in langfile) {
                splitline = langfile[key].split(" ")
                for (i = 0; i < splitline.length; i++){
                    word = splitline[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
                    console.log(langfile[key])
                    if(TokiPonaLatin.indexOf(word)!=-1){
                        splitline[i] = splitline[i].replace(word, TokiPonaSitelen[TokiPonaLatin.indexOf(word)])
                    } else {
                        if(!IsTPWord(word)){
                            splitline[i] = splitline[i] + " "
                        }
                    }
                }
                langfile[key] = splitline.join("")
            }
            //console.log(langfile)
            saveFile("tok.json",JSON.stringify(langfile))
            location.reload()
        }
        reader.onerror = function (evt) {
            document.getElementById("error").innerHTML += "mi ken ala lukin e lipu ni<br>";
        }
    }    

}