const arrayoffunctions = [];
var findingvalue = false;
var valueofx;
let Operator = {
    addition : 0,
    subtraction : 1,
    multiplication : 2,
    division : 3,
    exponent : 4
}
const bedmasList = ["+","-","*","/","^",null,"c","s","t","l"]
const functions = ["cos","sin","sec","csc","tan","cot","ln"]
const digits = [0,1,2,3,4,5,6,7,8,9]
class Equation {

    constructor(isEvaluated = false, operator, terms, base, exponent, coefficient){
        this.isEvaluated = isEvaluated
        this.operator = operator
        this.terms = terms
        this.base = base
        this.exponent = exponent
        this.coefficient = coefficient
    }

    static InsertMultipleSymbol(input){  //this function adds * to wherever it is needed
        let output = String;
        const things = ["x", "s", "c", "l","t"]
        if(input == "+c"){
            console.log("why does this return zero just out of curiosity?")
            return 0;
        }

        for(let i = 0; i < input.length; i++){
            if(things.includes(input[i]) && Number.isInteger(parseInt(input[i-1]))){
                console.log("Inserted multiplier at:" + i)
                let a = input.slice(0,i);
                let b = input.slice(i);
                input = (a + "*" + b);
            }
        }

        output = input;

        console.log("InsertMultipleSymbol fuction output: " + output);
        return output;
    }
    
    static split (funcInput, bedmasIdentifier = 0){

        console.log("-----Split-----")

        let nextIdentifier = 2
        if (bedmasIdentifier > 9){
            bedmasIdentifier = 0
        }

        let [operator, newFuncInput] = Equation.findOperator(funcInput,true)
        console.log("Currently spliting at: " + bedmasList[bedmasIdentifier] + " and " + (bedmasList[bedmasIdentifier + 1]))

        let inBrackets = 0 // if greater than 0 you are in brackets
        let lastOperatorIndex = 0
        let splitTerms = [] // store a list of the split strings (might be at the wrong scope)
        let storedTermsAsClass = [] // stores a list of the terms and equations in class form

        if (newFuncInput[0] == "(" && newFuncInput[newFuncInput.length - 1] == ")"){
            let isIncased = true

            for (let i = 0; i < newFuncInput.length - 1; i++){
                inBrackets = (newFuncInput[i] == "(") ? inBrackets + 1 : inBrackets
                inBrackets = (newFuncInput[i] == ")") ? inBrackets - 1 : inBrackets

                if (inBrackets == 0){
                    isIncased = false
                    break
                }
            }

            if (isIncased){
                console.log("removing encasing brackets")
                newFuncInput = newFuncInput.substring(1, newFuncInput.length - 1)
                bedmasIdentifier = 0
            }
        }

        inBrackets = 0

        for (let i = 0; i < newFuncInput.length; i++){

            let currentChar = newFuncInput[i]

            if (currentChar == "("){
                console.log("Found open bracket")
                inBrackets++
            }

            else if (currentChar == ")"){
                console.log("Found closed bracket")
                inBrackets--
            }

            else if(currentChar == bedmasList[bedmasIdentifier] && inBrackets <= 0){
                console.log("Split at: " + bedmasList[bedmasIdentifier])
                pushToSplitTerms(i);
                lastOperatorIndex = i;

                i = (bedmasIdentifier > 5) ? i + 2 : i
            }

            else if(currentChar == bedmasList[bedmasIdentifier + 1] && inBrackets <= 0){
                console.log("Split at: " + bedmasList[bedmasIdentifier + 1])
                pushToSplitTerms(i);
                lastOperatorIndex = i;

                i = (bedmasIdentifier + 1 > 5) ? i + 2 : i
                i = (bedmasIdentifier + 1 == 9) ? i - 1 : i
            }
        }

        pushToSplitTerms()

        console.log("Currently we have split the input function into: " + splitTerms)

        function pushToSplitTerms(currentCharIndex) {
            splitTerms.push(newFuncInput.substring(lastOperatorIndex, currentCharIndex));
        }

        for (let i = 0; i < splitTerms.length; i++){
            
            let currentTerm = splitTerms[i]
            let numOperators = 0
            let numVaribles = 0
            let numNumbers = 0
            let isInNumber = false


            for (let e = 0; e < currentTerm.length; e++){ //check if it is a term
                if (bedmasList.includes(currentTerm[e])){
                    isInNumber = false
                    numOperators++

                    if (bedmasList.includes(currentTerm[e], 9)){
                        e++
                    }

                    else if(bedmasList.includes(currentTerm[e], 6)){
                        e += 2
                    }
                }

                else if (currentTerm[e] == "x"){
                    isInNumber = false
                    numVaribles++
                }

                else if (digits.includes(parseInt(currentTerm[e]))) {
                    if (!isInNumber){
                        numNumbers++
                    }

                    isInNumber = true
                }
            }

            console.log("----Check Term----")
            console.log("For " + currentTerm + ": " + "\nNumbers-" + numNumbers + "\nVars-" + numVaribles + "\nOperators-" + numOperators)

            if (numNumbers + numVaribles + numOperators == 0){
                console.log("This split is empty")
            }

            else if(numNumbers + numVaribles == 0){
                console.log("This split only has an operator")
                // might use this to store terms without a base
            }

            else if ((numNumbers + numVaribles) <= 1 && numOperators <= 1){

                console.log("Storing " + currentTerm + " as a term...")

                let newTerm = new Term()
                newTerm.storeValues(currentTerm)
                storedTermsAsClass.push(newTerm)
            }

            else {
                console.log("This split is not a term... storing as equation")
                storedTermsAsClass.push(Equation.split(splitTerms[i], bedmasIdentifier + nextIdentifier))
            }
        }

        return new Equation(undefined, operator, storedTermsAsClass)
    }

    static findOperator(inputFunction, isEquasion){

        for (let i = 0; i < bedmasList.length; i++){
            if (inputFunction[0] == bedmasList[i]){

                let operator = "+"

                if (i < 5){

                    // definitly need to fix issue where the first and last brackets might not be the same set of brackets

                    if(inputFunction[1] == "(" && inputFunction[inputFunction.length - 1] == ")" && isEquasion){
                        operator = bedmasList[i]
                        inputFunction = inputFunction.substring(1)
                    }

                    else if(!isEquasion){
                        operator = bedmasList[i]
                        inputFunction = inputFunction.substring(1)
                    }
                }

                else{
                    if(inputFunction[3] == "(" && inputFunction[inputFunction.length - 1] == ")" && isEquasion){
                        operator = inputFunction.slice(0,3)
                        inputFunction = inputFunction.substring(3)
                    }

                    else if(!isEquasion){
                        operator = inputFunction.slice(0,3)
                        inputFunction = inputFunction.substring(3)
                    }
                }

                console.log("Current function: " + inputFunction)
                console.log("the operator is " + operator)

                return [operator, inputFunction]
            }
        }

        console.log("Current function: " + inputFunction)
        console.log("the operator is +")

        return ["+", inputFunction]
    }

    evaluate(){

        for (let i = 0; i < this.terms; i++){

            let underClass = this.terms[i]

            if (!underClass.isEvaluated){
                underClass.evaluate()
            }
        }

        let numIterations = this.terms.length

        for (let i = 0; i < numIterations - 1; i++){
            let firstClass = this.terms[0]
            let secondClass = this.terms[1]

            if (firstClass == Term && secondClass == Term){
                let base = "x";
                let coefficient = 0;
                let exponent = 0;

                if (digits.includes(firstClass.base) && digits.includes(secondClass.base)){
                    //firstClass.base = (firstClass.operator == "-") ? firstClass.base - (2*firstClass.base) : firstClass.base

                    if (secondClass.exponent == "^"){
                        base = firstClass.base ** secondClass.base
                    }

                    else if (secondClass.exponent == "/"){
                        if(firstClass.base % secondClass.base == 0){

                        }

                        else {
                            result = firstClass.base + " / " + secondClass.base
                        }
                    }
                }
            }
        }
    }
}
class Term {

    constructor(isEvaluated = false, base, operator){
        this.isEvaluated = isEvaluated
        this.base = base
        this.operator = operator
    }

    storeValues(inputFunction) {
        inputFunction = inputFunction.replace(/\(/g, "")
        inputFunction = inputFunction.replace(/\)/g, "")

        console.log("Removed unwanted brackets from: " + inputFunction)

        let [operator, newInputFunction] = Equation.findOperator(inputFunction,false)
        this.operator = operator

        if (newInputFunction[0] !== "x"){
            console.log("Storing " + newInputFunction + " as a number")
            this.base = parseInt(newInputFunction)
        }

        else {
            this.base = newInputFunction
            console.log("Storing " + this.base + " as a varible")
        }
    }
}
function changeinput() {
    var x = document.getElementById("checkbocks").checked;
    if (x){
    document.getElementById("findvalueat").innerText = "Find Value At:";
    document.getElementById("input2").type = "text";
    findingvalue = true;
    }
    else {
    document.getElementById("findvalueat").innerText = "";
    document.getElementById("input2").type = "hidden";
    findingvalue = false;
    document.getElementById('beans8').innerText = ("");
    document.getElementById('beans9').innerText = ("");
    }
    console.log(findingvalue);
}
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
//        var o = simplify(Beanssses)
        document.getElementById("beans4").innerText = (Beanssses);
        if (findingvalue){
            var r = document.getElementById('input2');
            r = r.value;
            valueofx = parseFloat(r);
            console.log(valueofx);
            document.getElementById('beans8').innerText = ("=" + (calculate(Beanss)));
            document.getElementById('beans9').innerText = ("=" + calculate(Beanssses));
            document.getElementById("beans3").innerText = "f'(" + valueofx + ")=";
            document.getElementById("beans1").innerText = "f(" + valueofx + ")=";
        } 
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
        Beanssses = Beanssses + "+c"

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
        while (Beanssses.includes("q") || Beanssses.includes("z")){
            Beanssses = Beanssses.replace("q","-cos");
            Beanssses = Beanssses.replace("z","sin");
        }
        if (findingvalue){
            const coolarray = ((document.getElementById('input2')).value).split(",")
            var s = coolarray[0];
            console.log("s = " + s)
            var e = coolarray[1];
            console.log("e = " + e)
            var x = coolarray[2];
            console.log("x = " + x)
            var d = coolarray[3];
            console.log("d = " + d)
            valueofx = parseFloat(e);
            document.getElementById('beans8').innerText = ("=" + (calculate(Beanss)));
            document.getElementById('beans9').innerText = ("=" + intcalculator(Beanss, s,e,x,d));
            document.getElementById("beans3").innerText = "F(" + e + " - " + s + ")=";
            document.getElementById("beans1").innerText = "f(" + e + ")=";
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
    const GoodInputs = ["cos","sin","tan","csc","sec","cot","ln","e^","log"]
    var p = Boolean;
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
    var a = String;
    a = input;
    var b = String;
    while (a.includes("(")){
        if (!a.includes("(") && (a.includes(")")))
            return "error wrong amount of brackets";
        if (a.indexOf(")") < a.indexOf("("))
            return "wrong order of brackets";
        var q = (a.indexOf("("));
        var intq = (parseFloat(q));
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
        a = a.replace(l, k);
        console.log("a is equal to : " + a);
    }
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
    else if (a.includes("sin") || a.includes("cos") ||  a.includes("tan") ||  a.includes("csc") ||  a.includes("sec") ||  a.includes("cot")){
        if (a.includes("sin")){
            console.log("a is equal to " + a)
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
    else if (a.includes("e^")){
        if (a.includes("{")){
            var m = a.indexOf("{");
            var n = a.indexOf("}");
            var o = a.substring((m+1), n);
            var p = arrayoffunctions[o];
            var l = derivitive(p);
        }
        else{
            var p = a.substring((a.indexOf("^")) + 1);
            l = derivitive(p);
        }
        return ("e^" + p + "*" + l);
            
    }
    else if (a.includes("ln")){
        if (a.includes("{")){
            var m = a.indexOf("{");
            var n = a.indexOf("}");
            var o = a.substring((m+1), n);
            var p = arrayoffunctions[o];
            var l = derivitive(p);
        }
        else{
            var p = a.substring((a.indexOf("ln")) + 2);
            l = derivitive(p);
        }
        return (l + "/" + p);
    }
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
            intpower = parseFloat(power);
            if (locationofsign != 1) {
                constant = a.substring(0, (locationofsign - 1));
                intconstant = parseFloat(constant);
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
            intpower = parseFloat(power);
            if (a.indexOf("{") != 0) {
                constant = a.substring(0, (locationofsign - v));
                intconstant = parseFloat(constant);
                intconstant = (intconstant * intpower);
                constant = intconstant.toString();
            }
            else{
                constant = (power)
            }
            intpower = (intpower - 1);
            power = intpower.toString();
            if (power !== 1)
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
function simplify(input)
{
    let simplifiedEquation = Equation.split(Equation.InsertMultipleSymbol(input))
    console.log(simplifiedEquation)

    return input
}
function integral(input)
{

    //b is the output
    var b = String;

    var x = input.indexOf("x");
    var constant = constant_getter(input,x);
    constant = constant.reverse();
    constant = getmenumber(input,constant);
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

    if (constant == '')
        constant = 1;
    if(input.includes("x") && input.includes("^"))
    {
        //power is the power for x, x is the index of x
        var power = power_getter(input,x);
        power = getmenumber(input,power);
        power++;
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
    
        //other trig stuff
        else if(isTrigFunction(input)){
            if(input.includes("sec^2"))
                b = input.replace("sec^2","tan")
            else if(input.includes("csc^2"))
                b = input.replace("csc^2","-cot")
        }
        else
        {
            b = (constant + "/" + power  + "x^" + power);
        }
        if(xisbelow(input,x)){
            b = input.replace("/","ln")
        }

        return b;

    }

    if (isTrigFunction(input)){
        if(input.includes("sin")){
            b = input.replace("sin","q");
        }
        else if(input.includes("cos")){  
            b = input.replace("cos","z");
        }
        else if(input.includes("secxtan"))
            b = input.replace("secxtan","sec")
    }


    //straight up number
    if(input == 0 || input == '' )
        return "";
    else if(!input.includes("x"))
        return input + "x";
    else if(power == null && isTrigFunction(input) == false){
        if(xisbelow(input,x)){
            b = input.replace("/","ln")
        }
        else{
            power = 2;
            constant = parseFloat(constant);
            constant = (constant / power);
            b = (constant + "x^" + power );
        }
    }

    
    return b;

    function isTrigFunction(input){
        //checks if the input includes a trig function 
        if (input.includes("sin") || input.includes("cos") ||  input.includes("tan") ||  input.includes("csc") ||  input.includes("sec") ||  input.includes("cot"))
            return true;
        else
            return false;
    }
    function xisbelow(input,x){
        for(let i = x - 1; i >= 0; i--){
            if (input[i] == "/")
                return true;
        }
        return false;
    }
}
function getmenumber(input,power)
{
    var total = '';
    for(let q = 0; q < power.length; q++){
        total = total + input[power[q]];
    }
    return total;
}
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
function constant_getter(input, x){
    let results = [];
    for(let i = x - 1; i >= 0; i--){
        if(!isNaN(input[i])){
            results.push(i);
        }
        else{
            return results;
        }
    }
    return results;
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
        z = x[y];
    }
    document.getElementById("img").src = z;
    document.getElementById("Salsfunfactbox").style.border = '3px solid black';
    img.style.visibility = 'visible';
}
function calculate(input){
    function sinner(input) {
        let b = 1.0;
        input = parseFloat(input);
        while (input > 360)
            input = (input - 360);
        while (input < 0)
            input = (input + 360);
        if (input > 180){
            input = (input - 180);
            b = -1;
        }
        x = input;
        b = (b * (((2 * x) * (180 - x))/(40500 - (x * (180 - x))) + (((31 * x) * (180 - x)) / (648000)) + (((x * x) * (180 - x) * (180 - x)) / 583200000)));
        return b;
    }
    let a = input.toString();
    while (a.includes("(")){
        if (!a.includes("(") && (a.includes(")")))
            return "error wrong amount of brackets";
        if (a.indexOf(")") < a.indexOf("("))
            return "wrong order of brackets";
        let q = (a.indexOf("("));
        let intq = (parseFloat(q));
        var intq2 = intq;
        var l = 1  
        while (!(l == 0)){
            intq ++
            if (a.charAt(intq) == "("){
                l ++
                intq2 = intq;
            }
            else if (a.charAt(intq) == ")")
                l = 0;
        }
        var h = a.substring((intq2 + 1), intq)
        var z = calculate(h);
        a = a.replace((a.substring(intq2, (intq + 1))), z)
    }
    if (a.includes("+") || a.includes("-")) {
            let x = 0.0;
            if ((a.indexOf("+") < a.indexOf("-")) || (!a.includes("-"))){

            }
            while(a.includes("+") || a.includes("-")){
                if ((a.indexOf("+") < a.indexOf("-")) || (!a.includes("-"))){
                    x = (-1.0);
                }
                else {
                    x = calculate(1, indexOf("-"));
                    b = (b - x);
                    a = a.substring(a.indexOf("-"))
                }
            }
            return b;
    }
    else if (a.includes("*")) {
            let x = 1;
            let b = 1.0;
            const chunksofa = a.split("*");
            for(let q=0; q<chunksofa.length; q++){
                x = calculate(chunksofa[q])
                b = b * x;
            }
    }
    else if (a.includes("/")) {
            let x = 0;
            const chunksofa = a.split("/");
            let b = calculate(chunksofa[0]);
            for(let q=1; q<chunksofa.length; q++){
                x = calculate(chunksofa[q])
                b = b / x;
            }
    }
    else if (a.includes("n") || a.includes("c")){
        if (a.includes("sin")) {
            var t = a.indexOf("sin");
            var p;
            p = a.substring((a.indexOf("sin")) + 3)
            var g = ("" + a.substring(0, t));
            if (g == "")
                g = 1;
            if (a.includes("x"))
                var p = calculate(p);
            var g = ("" + a.substring(0, t));
            if (g == "")
                g = 1;
            b = (sinner(p) * g)
        }
        else if (a.includes("cos")) {
            var t = a.indexOf("cos");
            var p;
            if (a.includes("{")) {
                var m = a.indexOf("{");
                var n = a.indexOf("}");
                var o = a.substring((m+1), n);
                p = arrayoffunctions[o];
            }
            else{
                p = a.substring((a.indexOf("cos")) + 3)
            }
            var g = ("" + a.substring(0, t));
            if (g == "")
                g = 1;
            var w = calculate(p);
            b = (sinner(w + 90) * g)
        }
        else if (a.includes("tan")){
            var t = a.indexOf("tan");
            var p;
            if (a.includes("{")) {
                var m = a.indexOf("{");
                var n = a.indexOf("}");
                var o = a.substring((m+1), n);
                p = arrayoffunctions[o];
            }
            else{
                p = a.substring((a.indexOf("tan")) + 3)
            }
            var g = ("" + a.substring(0, t));
            if (g == "")
                g = 1;
            var w = calculate(p);
            b = (g * (sinner(w)) / (sinner(w + 90)))
        }
        else if (a.includes("csc")) {
            var t = a.indexOf("csc");
            var p;
            p = a.substring((a.indexOf("csc")) + 3)
            var g = ("" + a.substring(0, t));
            if (g == "")
                g = 1;
            if (a.includes("x"))
                var p = calculate(p);
            var g = ("" + a.substring(0, t));
            if (g == "")
                g = 1;
            b = (g / sinner(p))
        }
        else if (a.includes("sec")) {
            var t = a.indexOf("sec");
            var p;
            p = a.substring((a.indexOf("sec")) + 3)
            var g = ("" + a.substring(0, t));
            if (g == "")
                g = 1;
            if (a.includes("x"))
                var p = calculate(p);
            var g = ("" + a.substring(0, t));
            if (g == "")
                g = 1;
            b = (g / sinner(p + 90))
        }
        else if (a.includes("cot")){
            var t = a.indexOf("cot");
            var p;
            if (a.includes("{")) {
                var m = a.indexOf("{");
                var n = a.indexOf("}");
                var o = a.substring((m+1), n);
                p = arrayoffunctions[o];
            }
            else{
                p = a.substring((a.indexOf("cot")) + 3)
            }
            var g = ("" + a.substring(0, t));
            if (g == "")
                g = 1;
            var w = calculate(p);
            b = (g / (sinner(w)) / (sinner(w + 90)))
        }  
    }
    else if (a.includes("^")){
        if (a.includes("e^")){
            var o = a.indexOf("e^");
            var u = a.substring((o + 1));
            if (o == 0){
                var y = 1.0;
            }
            else{
                var y = a.substring(0, o);
            }
            var p = calculate(u);
            b = (y * (2.718281828459045 ** p))
        }
        else if (a.includes("x") && (a.includes("^"))){
            var b = 1.0;
            var s = a.indexOf("^");
            var e = a.substring(0, (s - 1));
            var f = a.substring((s + 1))
            var j = parseFloat(f);
            while (j > 0){
                b = b * valueofx
                j --
            }
            if (s != 1)
                b = b * e;
        }
        else if (a.includes("{") && (a.includes("^"))){
            var b = 1.0;
            var s = a.indexOf("^");
            var e = a.substring(0, (s - 1));
            var f = a.substring((s + 1))
            var j = parseFloat(f);
            while (j > 0){
                b = b * valueofx
                j --
            }
            if (s != 1)
                b = b * e;
        }
        else if (a.includes("^")){
            var b = 1.0;
            var s = a.indexOf("^");
            var e = parseFloat(a.substring(0, (s)));
            var j = parseFloat(a.substring((s + 1)));
            b = e ** j;
        }
    }
    else if (a.includes("x")){
            var r = a.indexOf("x");
            var c = a.substring(0, r);
            if (c != "")
                b = (valueofx * parseFloat(c)); 
            else
                b = (valueofx * 1);
    }
    else if (a != ""){
        return (parseFloat(input));
    }
    else{
        return 1;
    }
    return (b);
}
function intcalculator(input, begin, end, accuracy, choice){
    if (accuracy > 9){
        return "too high accuracy";
    }
    accuracy = (10 ** accuracy);
    var length = end - begin;
    var sizeofslices = (length / accuracy);
    let currentslice = (parseFloat(begin));
    let b = 0;
    if (choice == 0){
    while (end > currentslice) {
        valueofx = currentslice;
        b = (b + (sizeofslices * calculate(input)));
        currentslice = (currentslice + sizeofslices);
    }
    }
    else if (choice == 1){
        valueofx = currentslice;
        b = (b + (sizeofslices * calculate(input)));
        currentslice = (currentslice + sizeofslices);
        valueofx = currentslice;
        b = (b + (4 * (sizeofslices * calculate(input))));
        currentslice = (currentslice + sizeofslices);
        for (let h = 0; h < ((accuracy - 2) / 2); h++) {
            valueofx = currentslice;
            b = (b + (2 * (sizeofslices * calculate(input))));
            currentslice = (currentslice + sizeofslices);
            valueofx = currentslice;
            b = (b + (4 * (sizeofslices * calculate(input))));
            currentslice = (currentslice + sizeofslices);
        }
        valueofx = currentslice;
        b = (b + (sizeofslices * calculate(input)));
        b = b / 3;
    }
    else if (choice == 2){
        currentslice = (currentslice + (0.5 * sizeofslices));
        while (end > currentslice) {
            valueofx = currentslice;
            b = (b + (sizeofslices * calculate(input)));
            currentslice = (currentslice + sizeofslices);
        }
    }
    else if (choice == 3){
        valueofx = (currentslice);
        b = (b + ((sizeofslices * calculate(input)) / 2));
        while (end > (currentslice + sizeofslices)) {
            valueofx = (currentslice);
            b = (b + (sizeofslices * calculate(input)));
            currentslice = (currentslice + sizeofslices);
        }
        valueofx = (currentslice);
        b = (b + ((sizeofslices * calculate(input)) / 2));
    }
    return b;
}