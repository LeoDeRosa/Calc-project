
function beeaans() {

    var Beanss = String;
    Beanss = document.getElementById('input');
    Beanss = Beanss.value;

    if (Beanss.value != "")
    {
        document.getElementById("beans1").innerText = "F(x)=";
        document.getElementById('beans2').innerText = (Beanss);
    }

    //if (checkInput(Beanss))
    //{
        document.getElementById("beans3").innerText = "F'(x)=";
        var Beanssses = String;
        Beanssses = derivitive(Beanss);
        document.getElementById("beans4").innerText = (Beanssses);
    //}
    //else
        //document.getElementById("Invalid Fuction, Please check Initial Fuction")

    
}
function checkInput(input){
    const badInputs = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","y","z"];

    for (i in Range(input)) {
        if (badInputs.includes(i)){
            return(false)
        }
    }
    return(true)

}
function derivitive(input)
{
    var a = String;
    var b = String;
    a = input;

    //addition rule
    if ((a.includes("-")) || (a.includes("+"))) {
        if ((a.includes("(")) || a.includes(")")){
            
        }
        else{
            
        }
    }
    else{
        return "false";
    }
}