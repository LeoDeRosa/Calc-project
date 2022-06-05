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
        while (Beanss.includes(" ")){
            Beanss = Beanss.replace(" ", "")
        }
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
        epicpictures();
    }
    else{
        document.getElementById("beans3").innerText = "Invalid Input";
        document.getElementById("beans2").innerText = "";
        document.getElementById("beans1").innerText = "";
        document.getElementById("Salsfunfacts").innerText = "";
        document.getElementById("Salsfunfactbox").style.border = '0px double yellow';
        document.getElementById("Salsfunfacts2").innerText = "ENTER A VALID INPUT TO RECEIVE YOUR FUN FACT";   
        document.getElementById("beans4").innerText = "";
    }
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
        epicpictures();
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
    const badInputs = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","y","z","A","B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z","{","}"];
    const GoodInputs = ["cos","sin","tan","csc","sec","cot","ln","e^x","log"]
    var p = Boolean;
    var u = String;
    for (let x = 0; x < (input.length);) {
        p = false;
        if ((badInputs.indexOf(input.charAt(x))) != -1){
            for (c = 0; c < GoodInputs.length; c++){
                if (input.indexOf(GoodInputs[c]) == x){
                    p = true;
                    x = (x + ((GoodInputs[c]).length) - 1);
                }
            }
            if (!p)
                return false;
        }
        input = input.substring(1);
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
function Salsfunfacts(){
    document.getElementById("Salsfunfactbox").style.border = '7px double yellow';
    document.getElementById("Salsfunfacts").innerText = "Leo and Jacobs Fun Facts";
    var x = String;
    var y = 0;
    const z = ["Although some historians give credit to the ancient Greeks for discovering calculus, many scholars recognize Sir Isaac Newton and Gottfried Wilhelm von Leibniz who, independent of one another, developed its concepts.",
     "Newton wanted to have a new way to predict where to see planets in the sky, because astronomy had always been a popular and useful form of science, and knowing more about the motions of the objects in the night sky was important for navigation of ships. So he started to work on Calculus",
      "Leibniz wanted to measure the space (area) under a curve (a line that is not straight).",
       "The name calculus was the Latin word for a small stone the ancient Romans used in counting and gambling. The English word calculate comes from the same Latin word.",
        "Some parts of modern calculus come from Newton, such as its uses in physics. Other parts come from Leibniz, such as the symbols used to write it.",
         "Both Newton and Leibniz were the first to design a system that describes how things change over time, and can predict how they will change in the future.",
          "Until calculus was invented, the only way to work this out was to cut the time into smaller and smaller pieces, so the average speed over the smaller time would get closer and closer to the actual speed at a point in time. This was a very long and hard process, and had to be done each time people wanted to work something out.",
           "In the 1670s and 1680s, Sir Isaac Newton in England and Gottfried Leibniz in Germany figured out calculus at the same time, working separately from each other.",
            "Before Newton and Leibniz, the word “calculus” referred to any body of mathematics, but in the following years, calculus became a popular term for a field of mathematics based upon their insights.",
             "By the middle of the 17th century, European mathematics had changed its primary repository of knowledge. In comparison to the last century which maintained Hellenistic mathematics as the starting point for research, Newton, Leibniz and their contemporaries increasingly looked towards the works of more modern thinkers"];
    y = Math.floor(Math.random() * 10);
    x = z[y];
    return x;
}
function simplify(input){
    var output = String;
    //add sal code here
    return output;
}
function integral(input)
{
    //b is the output
    var b = String;
    if(input.includes("x") && input.includes("^"))
    {
        //power is the power for x, x is the index of x
        var x = input.indexOf("x");
        var power = power_getter(input,x);
        power = getmenumber(input,power);
        power = +power + 1;

        var constant = constant_getter(input,x);
        constant = getmenumber(input,constant);
        console.log(constant);  
        //adds up all the numbers for the power, 
        function getmenumber(input,power)
        {
            var total = '';
            for(let q = 0; q < power.length; q++){
                total = total + input[power[q]];
                console.log(total)
            }
            return total;
        }
        //gets the index of all the numbers that x will be to the power of
        function power_getter(input, x){
            let results = [];
            for(let i = x + 2; i < input.length; i++){
                if(!isNaN(input[i])){
                    results.push(i);
                }
                else{
                    return results;
                }
            }
            return results;
        }
        //gets index of constants
        function constant_getter(input, x){
            let results = [];
            for(let i = x - 1; i >= 0; i--){
                if(!isNaN(input[i])){
                    results.push(i);
                    console.log(i)
                }
                else{
                    return results;
                }
            }
            return results;
        }
        //addition
        if (input.includes("+")) {
            {
                b = '';
                var x = String;
                const chunksofa = input.split("+");
                for(var q=0; q<chunksofa.length;q++){
                    if (q != 0)
                        b = (b + "+");
                    x = (chunksofa[q]);
                    x = integral(x);
                    b = (b + x);
                }
            }
        }
    
        //subtractions
        else if (input.includes("-")) {
            {
                b = '';
                var x = String;
                const chunksofa = input.split("-");
                for(var q=0; q<chunksofa.length;q++){
                    if (q != 0)
                        b = (b + "-");
                    x = (chunksofa[q]);
                    x = integral(x);
                    b = (b + x);
                }
            }
        }
        else if(!input.includes("-") && !input.includes("+"))
            b =  (constant + "/" + power  + "x^" + power);
        return b;
    }
    else if (input.includes("sin") || input.includes("cos") ||  input.includes("tan") ||  input.includes("csc") ||  input.includes("sec") ||  input.includes("cot")){
        if(input.includes("sin")) {

        }
        else if (input.includes("cos")){

        }



    }

    //straight up number
    if(input == 0 || input == '' )
        return "";
    else if(!input.includes("x"))
        return input + "x";
}
function epicpictures(){
    const x = [
        "./Assets/Leib1.jpg",
        "./Assets/Leib2.jpg",
        "./Assets/Leib3.jpg",
        "./Assets/Leib4.jpg",
        "./Assets/Leib5.jpg",
        "./Assets/Newt1.jpg",
        "./Assets/Newt2.jpg",
        "./Assets/Newt3.jpg",
        "./Assets/Newt4.jpg",
        "./Assets/Newt5.jpg",
        "./Assets/QUbe.png",
        "./Assets/URBOI.png"

    ]
    y = Math.floor(Math.random() * 31);
    var z = String;
    if (y == 30){
        y = Math.round(y);
        z = x[10];
    }
    else if(y == 25){
        y = Math.round(y);
        z = x[11];
    }
    else{

        y = (y / 3);
        y = Math.round(y);
        console.log(y)
        z = x[y];
    }
    document.getElementById("img").src = z;
    document.getElementById("Salsfunfactbox").style.border = '3px solid black';
}
function calculate(input, valueofx){
    var a = String;
    a = input.toString();
    var b = 0.0;
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
    //sum 
    if (a.includes("+")) {
        {
            var x = 0;
            const chunksofa = a.split("+");
            for(var q=0; q<chunksofa.length;q++){
                x = (chunksofa[q]);
                x = calculate(x, valueofx);
                b = b + x;
            }
        }
    }
    //difference 
    else if (a.includes("-")) {
        {
            var x = 0;
            const chunksofa = a.split("-");
            for(var q=0; q<chunksofa.length;q++){
                x = (chunksofa[q]);
                x = calculate(x, valueofx);
                b = b - x;
            }
        }
    }
    //product
    if (a.includes("*")) {
        {
            var x = 0;
            const chunksofa = a.split("*");
            for(var q=0; q<chunksofa.length;q++){
                x = (chunksofa[q]);
                x = calculate(x, valueofx);
                b = b * x;
            }
        }
    }
    //quotient 
    else if (a.includes("/")) {
        {
            var x = 0;
            const chunksofa = a.split("/");
            for(var q=0; q<chunksofa.length;q++){
                x = (chunksofa[q]);
                x = calculate(x , valueofx);
                b = b / x;
            }
        }
    }
    //sine
    else if (a.includes("sin")) {
        var t = a.indexOf("sin");
        var p;
        if (a.includes("{")) {
            var m = a.indexOf("{");
            var n = a.indexOf("}");
            var o = a.substring((m+1), n);
            p = arrayoffunctions[o];
        }
        else{
            p = a.substring((a.indexOf("sin")) + 3)
        }
        var g = a.substring(0, t)
        if (g = "")
            g = 1 
        
        var w = calculate(p, valueofx);
        b = sinner(g, w)
    }
    //cosine
    else if (a.includes("cos")) {
        var t = a.indexOf("sin")
        var m = a.indexOf("{");
        var n = a.indexOf("}");
        var o = a.substring((m+1), n);
        var g = a.substring(0, t)
        var p = arrayoffunctions[o];
        var w = calculate(p, valueofx)
        w = w - 90;
        b = sinner(g, w)
    }
    //only x and a constant left
    else if (a.includes("x")){
        if (a == "x")
            b = valueofx;
        else
            b = (parseInt(a.substring(0, a.indexOf("x"))) * valueofx)
    }
    else{
        b = parseInt(input);
    }
    return (b.toString());
}
function sinner(constant, input) {
let b = 0.0;
while (input > 360)
    input = input - 360;
while (input < 0)
    input = input + 360;
if (input < 180){
    input = input - 180;
    b = -1;
}
b = (b * (constant * ((4 * input * (180 - input)) / (40500 - (input * (180 - input))))))
return b;
}