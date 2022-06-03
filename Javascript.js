
const arrayoffunctions = [];

function beeaans() {

    var Beanss = String;
    Beanss = document.getElementById('input');
    Beanss = Beanss.value;
    
    if (checkInput(Beanss))
    {
        document.getElementById("beans1").innerText = "f(x)=";
        document.getElementById('beans2').innerText = (Beanss);
        document.getElementById("beans3").innerText = "f'(x)=";
        var Beanssses = String;
        Beanssses = derivitive(Beanss);
        while (Beanssses.includes("{")) {
            var t = Beanssses.indexOf("{");
            var y = Beanssses.indexOf("}");
            var d = Beanssses.substring((t + 1), y);
            var bigd = parseInt(d);
            var i = arrayoffunctions[bigd];
            Beanssses = Beanssses.replace(("{" + d + "}"), i);
        }
        while (Beanssses.includes("@")){
            Beanssses = Beanssses.replace("@", "-")
            Beanssses = Beanssses.replace("--", "+") // eventually this line should move to simplify
        }
        document.getElementById("beans4").innerText = (Beanssses);
        var x = Salsfunfacts();
        document.getElementById("Salsfunfacts2").innerText = (x);
    }
    else{
        document.getElementById("beans3").innerText = "Invalid Input";
        document.getElementById("beans2").innerText = "";
        document.getElementById("beans1").innerText = "";
        document.getElementById("Salsfunfacts2").innerText = "";   
        document.getElementById("beans4").innerText = "";
    }

}
function checkInput(input){
    const badInputs = ["a","b","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","u","v","w","y","z","A","B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z","{","}"];
    var daNewArray = input.split("");

    for (var x = 0; x <= daNewArray.length; x++) {
        if (badInputs.includes(daNewArray[x])){
            return false;
        }
        else if (daNewArray[x] == "l")
        {
            if (daNewArray[x + 1] == "n")
                return true;
            return false;
        }
        else if (daNewArray[x] == "s")
        {
            if (daNewArray[x + 1] == "i")
            {
                if (daNewArray[x + 2] == "n")
                    return true;
                return false;
            }
            else if(daNewArray[x + 1] == "e")
            {
                if(daNewArray[x + 2] == "c")
                    return true;
                return false;
            }

            return false;
        }
        else if(daNewArray[x] == "t") 
        {
            if (daNewArray[x + 1] == "a")
            {
                if (daNewArray[x + 2] == "n")
                    return true;
                return false;
            }
            return false;
        }
        else if(daNewArray[x] == "c")
        {
            if (daNewArray[x + 1] == "o")
            {
                if (daNewArray[x + 2] == "s")
                    return true;
                else if(daNewArray[x + 2] == "t")
                    return true;
                return false;
            }
            else if(daNewArray[x + 1] == "s")
            {
                if(daNewArray[x + 2] == "c")
                    return true;
                return false;
            }
            return false;
        }
    }
    return true;

}
function derivitive(input)
{
//  "a" is the input 
    var a = String;
    a = input;
//  "b" is the output 
    var b = String;

    //chain rule
    while (a.includes("(")){
        if (!a.includes("(") && (a.includes(")")))
            return "error wrong amount of brackets";
        if (a.indexOf(")") < a.indexOf("("))
            return "wrong order of brackets";
        var q = (a.indexOf("("));
        var intq = (parseInt(q));
        var l = 1  
        while (!(l == 0)){
            intq ++
            if (a.charAt(intq) == "(")
                l ++
            else if (a.charAt(intq) == ")")
                l --
        }
        var l = a.substring(q, (intq + 1));
        arrayoffunctions.push(l);
        var p = arrayoffunctions.indexOf(l);
        var k = ("{" + p + "}");
        if (l === "(x)")
            a = a.replace("(x)", "x");
        else
            a = a.replace(l, k);
    }

    //sum rule
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

    //difference rule
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

    //trig rules
    else if (a.includes("sin") || a.includes("cos") ||  a.includes("tan") ||  a.includes("csc") ||  a.includes("sec") ||  a.includes("cot")){
        if (a.includes("sin")){
            if (a.includes("{")){
                a = a.replace("sin", "cos");
                var m = a.indexOf("{");
                var n = a.indexOf("}");
                var o = a.substring((m+1), n);
                var p = arrayoffunctions[o];
                var l = derivitive(p);
                b = (a + "*" + l)
            }
            else{
                b = a.replace("sin", "cos");
            }
        }
        else if (a.includes("cos")){
            if (a.includes("{")){
                a = a.replace("cos", "@sin");
                var m = a.indexOf("{");
                var n = a.indexOf("}");
                var o = a.substring((m+1), n);
                var p = arrayoffunctions[o];
                var l = derivitive(p);
                b = (a + "*" + l)
            }
            else{
                var y = a.substring(0, (a.indexOf("cos")));
                var n = a.substring(((a.indexOf("cos")) + 3));
                b = ("@" + y + "sin" + n);
            }
        }
        else if (a.includes("tan")){
            if (a.includes("{")){
                var m = a.indexOf("{");
                var n = a.indexOf("}");
                var o = a.substring((m+1), n);
                var p = arrayoffunctions[o];
                var l = derivitive(p);
                var j = a.substring(0, (a.indexOf("tan")));
                b = (j + "(sec" + p + ")^2" + "*" + l);
            }
            else{
                var y = a.substring(0, (a.indexOf("tan")));
                var n = a.substring(((a.indexOf("tan")) + 3));
                b = (y + "(sec" + n + ")^2");
            }
        }
        else if (a.includes("csc")){
            if (a.includes("{")){
                var m = a.indexOf("{");
                var n = a.indexOf("}");
                var o = a.substring((m+1), n);
                var p = arrayoffunctions[o];
                var l = derivitive(p);
                var j = a.substring(0, (a.indexOf("csc")));
                b = ("@" + j + "csc" + p + "*cot" + p + "*" + l);
            }
            else{
                var y = a.substring(0, (a.indexOf("csc")));
                var n = a.substring(((a.indexOf("csc")) + 3));
                b = ("@" + y + "cscx*cotx");
            }
        }
        else if (a.includes("sec")){
            if (a.includes("{")){
                var m = a.indexOf("{");
                var n = a.indexOf("}");
                var o = a.substring((m+1), n);
                var p = arrayoffunctions[o];
                var l = derivitive(p);
                var j = a.substring(0, (a.indexOf("sec")));
                b = (j + "sec" + p + "*tan" + p + "*" + l);
            }
            else{
                var y = a.substring(0, (a.indexOf("sec")));
                var n = a.substring(((a.indexOf("sec")) + 3));
                b = (y + "secx*tanx");
            }
        }
        else if (a.includes("cot")){
            if (a.includes("{")){
                var m = a.indexOf("{");
                var n = a.indexOf("}");
                var o = a.substring((m+1), n);
                var p = arrayoffunctions[o];
                var l = derivitive(p);
                var j = a.substring(0, (a.indexOf("cot")));
                b = ("@" + j + "(sec" + p + ")^2" + "*" + l);
            }
            else{
                var y = a.substring(0, (a.indexOf("cot")));
                var n = a.substring(((a.indexOf("cot")) + 3));
                b = ("@" + y + "(csc" + n + ")^2");
            }
        }
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
        else if (a.includes("^") && a.includes("{")){
            var constant = String;
            constant = "";
            var power = String;
            var intconstant = 0;
            var intpower = 0;
            var locationofsign = 0;
            var m = a.indexOf("{");
            var n = a.indexOf("}");
            var o = a.substring(m, (n + 1));
            var v = o.length;

            locationofsign = a.indexOf("^");
            power = a.substring((locationofsign + 1));
            intpower = parseInt(power);
            if (a.indexOf("{") != 0) {
                constant = a.substring(0, (locationofsign - v));
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
                b = (constant + o + "^" + power + "*" + derivitive(o));
            else
                b = (constant + o + "*" + derivitive(o))
        }
        else if (a.includes("x")){
            if (a == "x")
                b="1"
            else
                b=a.replace("x", "")
        }
        else if (a.includes("{")){
            var m = a.indexOf("{");
            var n = a.indexOf("}");
            var o = a.substring((m+1), n);
            var s = arrayoffunctions[o];
            var v = s.length;
            var s2 = s.substring(1, (v - 1));
            b = derivitive(a.replace(("{" + o + "}"), s2));
        }
        else {
            b = "0";
        }
    }
    return b;
}
function Salsfunfacts(input){
    document.getElementById("Salsfunfactbox").style.border = '7px double yellow';
    document.getElementById("Salsfunfacts").innerText = "Sal's Fun Facts";
    var x = String;
    var y = 0;
    const z = ["fact0", "fact1", "fact2", "fact3", "fact4", "fact5", "fact6", "fact7", "fact8", "fact9"];
    y = Math.floor(Math.random() * 10);
    x = z[y];
    return x;
}
function simplifying(input){
    var output = String;
    //add sal code here
    return output;
}
function bakedbeans(){
    var Beanss = String;
    Beanss = document.getElementById('input');
    Beanss = Beanss.value;
    
    if (checkInput(Beanss))
    {
        document.getElementById("beans1").innerText = "f(x)=";
        document.getElementById('beans2').innerText = (Beanss);
        document.getElementById("beans3").innerText = "F(x)=";
        var Beanssses = String;
        Beanssses = integral(Beanss);
        while (Beanssses.includes("{")) {
            var t = Beanssses.indexOf("{");
            var y = Beanssses.indexOf("}");
            var d = Beanssses.substring((t + 1), y);
            var bigd = parseInt(d);
            var i = arrayoffunctions[bigd];
            Beanssses = Beanssses.replace(("{" + d + "}"), i);
        }
        while (Beanssses.includes("@")){
            Beanssses = Beanssses.replace("@", "-")
            Beanssses = Beanssses.replace("--", "+") // eventually this line should move to simplify
        }
        document.getElementById("beans4").innerText = (Beanssses);
        document.getElementById("Salsfunfacts2").innerText = (Salsfunfacts());
    }
    else{
        document.getElementById("beans3").innerText = "Invalid Input";
        document.getElementById("beans2").innerText = "";
        document.getElementById("beans1").innerText = "";
        document.getElementById("Salsfunfacts2").innerText = "";   
        document.getElementById("beans4").innerText = "";
    }

}

function integral(input){

}