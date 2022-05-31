
const arrayoffunctions = [];

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
        while (Beanssses.includes("<")) {
            var t = Beanssses.indexOf("<");
            var y = Beanssses.indexOf(">");
            var d = Beanssses.substring((t + 1), y);
            var bigd = parseInt(d);
            var i = arrayoffunctions[bigd];
            Beanssses = Beanssses.replace(("<" + d + ">"), i)
        }
        document.getElementById("beans4").innerText = (Beanssses);
    //}
    //else
        //document.getElementById("Invalid Fuction, Please check Initial Fuction")
    var x = Salsfunfacts();
    document.getElementById("Salsfunfacts2").innerText = (x);

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
//  "b" is the output set as "invalid entry" by default
    var b = "invalid entry";
    //chain rule
    while (a.includes("(")){
        if (!a.includes("(") && (a.includes(")")))
            return "error wrong amount of brackets";
        if (a.indexOf(")") < a.indexOf("("))
            return "wrong order of bracketts";
        var q = (a.indexOf("("));
        var intq = (parseInt(q));
        var l = 1      
        while (!(l = 0)){
            intq ++
            if (a.charAt(intq) = "(")
                l ++
            else if (a.charAt(intq) = ")")
                l --
        }
        return "success";
        var l = a.substring(q, (intq + 1));
        arrayoffunctions.push(l);
        return "success";
        var p = arrayoffunctions.indexOf(l);
        if (!(l = "(x)"))
            a = a.replace("(x)", "x");
        else
            a = a.replace(l, "<" + p + ">")
        return "success";
    }

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
        const chunksofathesecond = a.split("*");
        var insert = String;
        var z2 = 0;
        b = "";
        for(var z=0; z<chunksofathesecond.length;z++) {
            insert = "";
            if (z != 0)
                b = (b + "+");
            z2 = 0;
            insert = derivitive(chunksofathesecond[z])
            while(z2<chunksofathesecond.length){
                if (z2 != z)
                    insert = (insert + "*" + chunksofathesecond[z2]);
                z2++
            }
            b = (b + insert);
        }
    }

    //division rule
    else if (a.includes("/")){
        var positionofsign = a.indexOf("/");
        var parta = String;
        var partb = String;
        var dparta = String;
        var dpartb = String;
        parta = a.substring(0, positionofsign);
        partb = a.substring((positionofsign + 1));
        dparta = derivitive(parta);
        dpartb = derivitive(partb);
        b = ("(" + dparta + "*" + partb + "-" + dpartb + "*" + parta + ")/(" + partb + ")^2");
    }

    //power rule 
    else {
        if (a.includes("^") && a.includes("x")){
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
        else if (a.includes("x")){
            if (a == "x")
                b="1"
            else
                b=a.replace("x", "")
        }
        else {
            b=0;
        }
    }
    return b;
}
function Salsfunfacts(input){
    document.getElementById("Salsfunfactbox").style.border = '5px double red';
    document.getElementById("Salsfunfacts").innerText = "Sal's Fun Facts";
    var x = String;
    var y = 0;
    const z = ["fact0", "fact1", "fact2", "fact3", "fact4", "fact5", "fact6", "fact7", "fact8", "fact9"];
    y = Math.floor(Math.random() * 10);
    x = z[y];
    return x;
}