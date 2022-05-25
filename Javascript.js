
function beeaans() {
    var Beanss = String;
    
    Beanss = document.getElementById('input');
    document.getElementById('beans').innerText = (Beanss.value);
    const Beansssize = Beanss.value.length;
    document.getElementById('Beans').innerText = checkInput(Beanss);
    
}

function checkInput(input){
    const badInputs = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

    for (i in Range(input)) {
        if (badInputs.includes(i)){
            return("Bad Input")
        }
    }
    return("Good Input")

}