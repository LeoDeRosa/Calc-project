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
//  "a" is the input 
    var a = String;
    a = input;
//  "b" is the output
    var b = String;
    b = "invalid entry";
    //addition rule
    if (a.includes("+")) {
        b = "";
        if (!((a.includes("(")) || a.includes(")")))
        {
            var x = String;
            const chunksofa = a.split("+");
            for(var q=0; q<chunksofa.length;q++){
                if (q != 0)
                    b = (b + "+");
                x = (chunksofa[q]);
                x = derivitive(x);
                b = (b + x);
            }
        }
    }

    //subtraction rule
    else if (a.includes("-")) {
        if (!((a.includes("(")) || a.includes(")")))
        {
            var x = String;
            b = "";
            const chunksofa = a.split("-");
            for(var q=0; q<chunksofa.length;q++){
                if (q != 0)
                    b = (b + "-");
                x = (chunksofa[q]);
                x = derivitive(x);
                b = (b + x);
            }
            return b;
        }
    }

    //product rule
    else if (a.includes("*")){
        var locationofsign = a.indexOf("*");
        var partA = a.substring(0, locationofsign);
        var partB = a.substring(locationofsign+1);
        var partAprime = derivitive(partA);
        var partBprime = derivitive(partB);
        b = (partA + "*" + partBprime + "+" + partB + "*" + partAprime);
    }
    //power rule 
    else if (a.includes("x")){
        if (a.includes("^")){
            var constant = String;
            constant = "";
            var power = String;
            var intconstant = 0;
            var intpower = 0;
            var locationofsign = 0;
            locationofsign = a.indexOf("^");
            power = a.substring((locationofsign + 1));
            intpower = parseInt(power);
            if (locationofsign != 1) {
                constant = a.substring(0, (locationofsign - 1));
                intconstant = parseInt(constant);
                intconstant = (intconstant * intpower);
                constant = intconstant.toString();
            }
            else{
                constant = (power)
            }
            intpower = (intpower - 1);
            power = intpower.toString();
            if (power > 1)
                b = (constant + "x^" + power);
            else
                b = (constant + "x")
        }
        else{
            b=a.replace("x", "")
        }
    }
    else if (!a.includes("x")){
        b="0";
    }
    return b;
}