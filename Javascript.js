const arrayoffunctions = [];
var findingvalue = false;
var valueofx;
const bedmasList = ["+","-","*","/","^",null,"c","s","t","l"];
const functions = ["cos","sin","sec","csc","tan","cot","ln"];
const digits = [0,1,2,3,4,5,6,7,8,9];
class Equation {
    constructor(operator, objects){
        this.operator = operator;
        this.objects = objects;
    }

    static InsertMultipleSymbol(input){  //this function adds * to wherever it is needed
        let output = String;
        const things = ["x", "s", "c", "l","t","("];
        if(input == "+c"){
            return 0;
        }

        for(let i = 0; i < input.length; i++){
            if(things.includes(input[i]) && Number.isInteger(parseInt(input[i-1]))){
                /*for (let j = i-1; j >= 0 ; j--){
                    let numBrackets = 0;
                    if (input[j] == ")"){
                        numBrackets++;
                        continue;
                    }
                    else if (input[j] == "("){
                        numBrackets--;
                    }
                    if (isNaN(Number(input[j]))&&numBrackets <= 0){
                        input = input.substring(0,j) + "(" + input.substring(j+1);
                        break;
                    }
                }
                for (let j = i+1; j < input.length; j++){
                    let numBrackets = 0;
                    if (input[j] == "("){ 
                        numBrackets++;
                        continue;
                    }
                    else if (input[j] == ")"){
                        numBrackets--;  
                    }
                    if (isNaN(Number(input[j]))&&numBrackets <= 0){
                        input = input.substring(0,j) + ")" + input.substring(j+1);  
                        break;
                    }
                }*/
                console.log("Inserted multiplier at:" + i);
                let a = input.slice(0,i);
                let b = input.slice(i);
                input = (a + "*" + b);
            }
        }

        output = input;

        console.log("InsertMultipleSymbol fuction output: " + output);
        return output;
    }
    
    static split (funcInput, bedmasIdentifier = 0, firstRun = true){

        console.log("-----Split-----");

        let nextIdentifier = 2;

        if (bedmasIdentifier > 9){
            bedmasIdentifier = 0;
        }
        
        let operator = "+";

        if (!firstRun){ //if this is not the first run, we need to find the operator
            [operator, funcInput] = Equation.findOperator(funcInput,true);
        }

        else{
            console.log("First run... not this time");
        }

        console.log("Currently spliting at: " + bedmasList[bedmasIdentifier] + " and " + (bedmasList[bedmasIdentifier + 1]));

        let inBrackets = 0; // if greater than 0 you are in brackets
        let lastOperatorIndex = 0;
        let splitTerms = []; // store a list of the split strings (might be at the wrong scope)
        let storedTermsAsClass = []; // stores a list of the objects and equations in class form

        if (funcInput[0] == "(" && funcInput[funcInput.length - 1] == ")"){
            let isIncased = true;

            for (let i = 0; i < funcInput.length - 1; i++){
                inBrackets = (funcInput[i] == "(") ? inBrackets + 1 : inBrackets;
                inBrackets = (funcInput[i] == ")") ? inBrackets - 1 : inBrackets;

                if (inBrackets == 0) {
                    isIncased = false;
                    break;
                }
            }

            if (isIncased){
                console.log("removing encasing brackets");
                funcInput = funcInput.substring(1, funcInput.length - 1);
                bedmasIdentifier = 0;
            }
        }

        inBrackets = 0;

        for (let i = 0; i < funcInput.length; i++){

            let currentChar = funcInput[i];

            if (currentChar == "("){
                console.log("Found open bracket");
                inBrackets++;
            }

            else if (currentChar == ")"){
                console.log("Found closed bracket");
                inBrackets--;
            }

            else if(currentChar == bedmasList[bedmasIdentifier] && inBrackets <= 0){
                console.log("Split at: " + bedmasList[bedmasIdentifier]);
                pushToSplitTerms(i);
                lastOperatorIndex = i;

                i = (bedmasIdentifier > 5) ? i + 2 : i;
            }

            else if(currentChar == bedmasList[bedmasIdentifier + 1] && inBrackets <= 0){
                console.log("Split at: " + bedmasList[bedmasIdentifier + 1]);
                pushToSplitTerms(i);
                lastOperatorIndex = i;

                i = (bedmasIdentifier + 1 > 5) ? i + 2 : i;
                i = (bedmasIdentifier + 1 == 9) ? i - 1 : i;
            }
        }

        pushToSplitTerms();

        console.log("Currently we have split the input function into: " + splitTerms);

        function pushToSplitTerms(currentCharIndex) {
            splitTerms.push(funcInput.substring(lastOperatorIndex, currentCharIndex));
        }

        for (let i = 0; i < splitTerms.length; i++){
            
            let currentTerm = splitTerms[i];
            let numOperators = 0;
            let numVaribles = 0;
            let numNumbers = 0;
            let isInNumber = false;

            for (let e = 0; e < currentTerm.length; e++){ //check if it is a term
                if (bedmasList.includes(currentTerm[e])){
                    isInNumber = false;
                    numOperators++;

                    if (bedmasList.includes(currentTerm[e], 9)){
                        e++;
                    }

                    else if(bedmasList.includes(currentTerm[e], 6)){
                        e += 2;
                    }
                }

                else if (currentTerm[e] == "x"){
                    isInNumber = false;
                    numVaribles++;
                }

                else if (digits.includes(parseInt(currentTerm[e]))) {
                    if (!isInNumber){
                        numNumbers++;
                    }

                    isInNumber = true;
                }
            }

            console.log("----Check Split----");
            console.log("For " + currentTerm + ": " + "\nNumbers-" + numNumbers + "\nVars-" + numVaribles + "\nOperators-" + numOperators);

            if (numNumbers + numVaribles + numOperators == 0){
                console.log("This split is empty");
            }

            else if ((numNumbers + numVaribles) <= 1 && numOperators <= 1){

                console.log("Storing " + currentTerm + " as a term...");

                let newTerm = new Split();
                newTerm.storeValues(currentTerm);
                storedTermsAsClass.push(newTerm);
            }

            else {
                console.log("This split is not a term... storing as equation");
                storedTermsAsClass.push(Equation.split(splitTerms[i], bedmasIdentifier + nextIdentifier, false));
            }
        }

        return new Equation(operator, storedTermsAsClass)
    }

    static findOperator(inputFunction, isEquasion){

        for (let i = 0; i < bedmasList.length; i++){
            if (inputFunction[0] == bedmasList[i]){

                let operator = "+";

                if (i < 5){

                    // definitly need to fix issue where the first and last brackets might not be the same set of brackets

                    operator = bedmasList[i];
                    inputFunction = inputFunction.substring(1);
                    
                    /*
                    if(inputFunction[1] == "(" && inputFunction[inputFunction.length - 1] == ")" && isEquasion){
                        operator = bedmasList[i];
                        inputFunction = inputFunction.substring(1);
                    }

                    else if(!isEquasion){
                        operator = bedmasList[i];
                        inputFunction = inputFunction.substring(1);
                    }
                    */
                }

                else{

                    operator = inputFunction.slice(0,3);
                    inputFunction = inputFunction.substring(3);

                    /*
                    if(inputFunction[3] == "(" && inputFunction[inputFunction.length - 1] == ")" && isEquasion){
                        operator = inputFunction.slice(0,3);
                        inputFunction = inputFunction.substring(3);
                    }

                    else if(!isEquasion){
                        operator = inputFunction.slice(0,3);
                        inputFunction = inputFunction.substring(3);
                    }

                    */
                }

                console.log("Current function: " + inputFunction);
                console.log("the operator is " + operator);

                return [operator, inputFunction];
            }
        }

        console.log("Current function: " + inputFunction);
        console.log("the operator is +");

        return ["+", inputFunction];
    }

    bedmasEval(){

        let returnValues = [new Equation("+", [])]; //array of equasions that contain 1 or more terms

        for (let i = 0; i < this.objects.length; i++){
            returnValues.push(this.objects[i].bedmasEval());
        }

        console.log("Current equations being simplified: ");
        console.log(returnValues.toString());

        return new Equation(this.operator, simplifyMathObj(returnValues)); //must retun a equasion with terms
    }

    toString(){
        return this.operator+"["+this.objects.toString()+"]";
    }
}
function gcdFunc(a, b){

    // Euclid's algorithm

    if (b == 0) {
        return a;
    }   
    return gcdFunc(b, a % b);
}
function sameArrayValues(a, b){
    //check if two arrays have the same values
    if (a.length != b.length){
        return false;
    }
    
    const arr1test = a.slice().sort()
    const arr2test = b.slice().sort()
    return !arr1test.some((val, idx) => !val.isEqual(arr2test[idx]) );
}
function simplifyMathObj(operatingObj){//operationObj is a array of equasions that contain 1 or more terms

    let baseArrayOfTerms = [];

    console.log("Checking integerity of Current equations...")
    console.log(operatingObj.toString())

    for(let eqIndex in operatingObj){

        if (eqIndex == 0){
            baseArrayOfTerms = operatingObj[eqIndex].objects;
            continue;
        }

        let equation = operatingObj[eqIndex];
        console.log("The current equation: ");
        console.log(baseArrayOfTerms.toString());

        switch (equation.operator){
            case "+":
                
                console.log('Adding ' + baseArrayOfTerms.toString() + ' to ' + equation.objects.toString());
                baseArrayOfTerms = addPolynomials(baseArrayOfTerms, equation.objects);
                break;

            case "-":

                console.log('Subtracting ' + baseArrayOfTerms.toString() + ' from ' + equation.objects.toString());
                baseArrayOfTerms = subtractPolynomials(baseArrayOfTerms, equation.objects);
                break;

            case "*":
                
                console.log('Multiplying ' + baseArrayOfTerms.toString() + ' by ' + equation.objects.toString());
                baseArrayOfTerms = multiplyPolinomials(baseArrayOfTerms, equation.objects);
                break;

            case "/":

                console.log('Dividing ' + baseArrayOfTerms.toString() + ' by ' + equation.objects.toString());
                baseArrayOfTerms = dividePolynomials(baseArrayOfTerms, equation.objects);
                break;

            case "^":

                // take two lists of terms and raise one of them to the power of the other
                console.log('Raising ' + baseArrayOfTerms.toString() + ' to the power of ' + equation.objects.toString());
                baseArrayOfTerms = raisePolynomials(baseArrayOfTerms, equation.objects);
                break;
        }
    }

    baseArrayOfTerms = fixPowers(baseArrayOfTerms);

    console.log("The result of this step of simplification: ");
    console.log(baseArrayOfTerms.toString());
    

    return baseArrayOfTerms;

    function simplifyPolynomial(polynomial){
        //simplify a polynom
        //merge terms with the same powers
        let newPolynomial = [...polynom];

        for (let i = 0; i < newPolynomial.length; i++){
            for (let j = i + 1; j < newPolynomial.length; j++){
                if (sameArrayValues(newPolynomial[i].powers,newPolynomial[j].powers)){
                    newPolynomial[i].coefficient = newPolynomial[i].coefficient.add(newPolynomial[j].coefficient);
                    newPolynomial.splice(j, 1);
                    j--;
                }
            }
        }
        return newPolynomial;
    }

    function fixPowers(polynomial){
        //fix the powers of a polynomial
        //if a term has a power of 0 it should be removed

        console.log(polynomial.toString());

        let newPolynomial = [...polynomial];

        for (let i = 0; i < newPolynomial.length; i++){
            for (let j = 0; j < newPolynomial[i].powers.length; j++){

                if (newPolynomial[i].powers[j].exponent == 0){
                    newPolynomial[i].powers.splice(j, 1);
                    j--;
                }
            }
        }
        return newPolynomial;
    }

    function addPolynomials(baseTermList, operatingTermList){

        let newTermList = [...baseTermList];

        console.log("Adding Polynomials(Term Lists)");
        console.log(newTermList.toString());
        console.log(operatingTermList.toString());
    
        for (let i = 0; i < operatingTermList.length; i++){
    
            let currentOperatingTerm = operatingTermList[i];
            let doesContain = false;
    
            for (let e = 0; e < newTermList.length; e++){
    
                console.log("Checking if " + currentOperatingTerm.toString() + " is already in the list");
                let currentBaseTerm = newTermList[e];
                if (sameArrayValues(currentOperatingTerm.powers, currentBaseTerm.powers)){
    
                    doesContain = true;
    
                    console.log("Found a match");
                    console.log(currentOperatingTerm.toString());
                    console.log(currentBaseTerm.toString());

                    currentBaseTerm.coefficient = currentOperatingTerm.coefficient.add(currentBaseTerm.coefficient);          
                }
            }
    
            if (!doesContain){

                console.log("No match found");
                console.log(currentOperatingTerm.toString());

                newTermList.push(currentOperatingTerm);
            }
        }
        console.log("The new term list: ");
        console.log(newTermList.toString());
        return newTermList;
    }
    
    function subtractPolynomials(baseTermList, operatingTermList){

        let newTermList = [...baseTermList];

        console.log("Subtracting Polynomials(Term Lists)");
        console.log(baseTermList.toString());
        console.log(operatingTermList.toString());
    
        for (let i = 0; i < operatingTermList.length; i++){
    
            let currentOperatingTerm = operatingTermList[i];
            let doesContain = false;
    
            for (let e = 0; e < newTermList.length; e++){
    
                let currentBaseTerm = newTermList[e];
    
                if (sameArrayValues(currentOperatingTerm.powers, currentBaseTerm.powers)){
    
                    doesContain = true;
    
                    console.log("Found a match");
                    console.log(currentOperatingTerm.toString());
                    console.log(currentBaseTerm.toString());
    
                    currentBaseTerm.coefficient = currentBaseTerm.coefficient.subtract(currentOperatingTerm.coefficient);
                }
            }
    
            if (!doesContain){

                console.log("No match found");
                console.log(currentOperatingTerm.toString());

                currentOperatingTerm.coefficient.numerator *= -1;
                newTermList.push(currentOperatingTerm);
            }
        }
        return newTermList;
    }

    function multiplyPolinomials(baseTermList, operatingTermList) {

        let resultList = [];
    
        for (let i = 0; i < baseTermList.length; i++){
            let currentBaseTerm = baseTermList[i];
    
            for (let j = 0; j < operatingTermList.length; j++){
                let currentOperatingTerm = operatingTermList[j];
    
                let resultCoefficient = currentBaseTerm.coefficient.multiply(currentOperatingTerm.coefficient);
    
                console.log("Multiplying " + currentBaseTerm.toString() + " and " + currentOperatingTerm.toString());
                console.log(resultCoefficient.toString());
    
                let weAreOne = [...Object.create(currentBaseTerm.powers), ...Object.create(currentOperatingTerm.powers)];
                console.log(weAreOne.toString());

                let resultPowers = [];
    
                for (let k = 0; k < weAreOne.length; k++){
                    let currentPower = Object.create(weAreOne[k]);
    
                    let contains = false;
    
                    for (let l = 0; l < resultPowers.length; l++){
                        let addedPower = resultPowers[l];
                        
                        if (currentPower.base == addedPower.base){
                            console.log("Found matching base: " + currentPower.base);
                            contains = true;
                            addedPower.exponent += currentPower.exponent;
                        }
                    }
                    
                    if (!contains){
                        resultPowers.push(currentPower);
                    }
                }
    
                resultList.push(new Term(resultCoefficient, resultPowers));
                console.log("The result of this step: ");
                console.log(resultList.toString());
            }
        }
    
        return resultList;
    }

    function dividePolynomials(baseTermList, operatingTermList) {
        
        let resultList = [];
    
        for (let i = 0; i < baseTermList.length; i++){
            let currentBaseTerm = baseTermList[i];
    
            for (let j = 0; j < operatingTermList.length; j++){
                let currentOperatingTerm = operatingTermList[j];
    
                let resultCoefficient = currentBaseTerm.coefficient.divide(currentOperatingTerm.coefficient);
    
                console.log("Dividing " + currentBaseTerm.toString() + " and " + currentOperatingTerm.toString());
                console.log(resultCoefficient.toString());
    
                let weAreOne = [...Object.create(currentBaseTerm.powers), ...Object.create(currentOperatingTerm.powers)];
                console.log(weAreOne.toString());

                let resultPowers = [];
    
                for (let k = 0; k < weAreOne.length; k++){
                    let currentPower = Object.create(weAreOne[k]);
    
                    let contains = false;
    
                    for (let l = 0; l < resultPowers.length; l++){
                        let addedPower = resultPowers[l];
                        
                        if (currentPower.base == addedPower.base){
                            console.log("Found matching base: " + currentPower.base);
                            contains = true;
                            addedPower.exponent -= currentPower.exponent;
                        }
                    }
                    
                    if (!contains){
                        resultPowers.push(currentPower);
                    }
                }
    
                resultList.push(new Term(resultCoefficient, resultPowers));
                console.log("The result of this step: ");
                console.log(resultList.toString());
            }
        }
    
        return resultList;
    }

    function raisePolynomials(baseTermList, operatingTermList) {

        let largeNewTermList = [];
        

        for (let i = 0; i < baseTermList.length; i++){
            let currentBaseTerm = baseTermList[i];

            for (let j = 0; j < operatingTermList.length; j++){
                let currentOperatingTerm = operatingTermList[j];

                let newTermList = [...baseTermList];
                if (!isNaN(currentOperatingTerm.coefficient.numerator)){
                    console.log("Raising " + currentBaseTerm.toString() + " to " + currentOperatingTerm.toString());

                    for (let k = 1; k < currentOperatingTerm.coefficient.numerator; k++){
                        newTermList = multiplyPolinomials(newTermList, baseTermList);
                    } 
                }
                largeNewTermList.push(...newTermList);
            }
        }

        return largeNewTermList;
    }
}
class Fraction{
    
    constructor(numerator, denominator = 1){
        this.numerator = numerator;
        this.denominator = denominator;
    }

    static simplify(fraction){
        let gcd = gcdFunc(fraction.numerator, fraction.denominator);

        if (fraction.denominator < 0){
            fraction.numerator *= -1;
            fraction.denominator *= -1;
        }

        return new Fraction(fraction.numerator / gcd, fraction.denominator / gcd);
    }
    
    toString(){
        return this.numerator + "/" + this.denominator;
    }

    add(fraction2){
        console.log(this.numerator + " + " + fraction2.numerator);
        let numerator = this.numerator * fraction2.denominator + fraction2.numerator * this.denominator;
        let denominator = this.denominator * fraction2.denominator;

        return Fraction.simplify(new Fraction(numerator, denominator));
    }

    subtract(fraction2){
        console.log(this.numerator + " - " + fraction2.numerator);
        let numerator = this.numerator * fraction2.denominator - fraction2.numerator * this.denominator;
        let denominator = this.denominator * fraction2.denominator;

        return Fraction.simplify(new Fraction(numerator, denominator));
    }

    multiply(fraction2){
        let numerator = this.numerator * fraction2.numerator;
        let denominator = this.denominator * fraction2.denominator;

        return Fraction.simplify(new Fraction(numerator, denominator));
    }

    divide(fraction2){
        let numerator = this.numerator * fraction2.denominator;
        let denominator = this.denominator * fraction2.numerator;

        return Fraction.simplify(new Fraction(numerator, denominator));
    }

    equals(fraction2){
        return this.numerator == fraction2.numerator && this.denominator == fraction2.denominator;
    }
}
class Split {
    constructor(base, operator){
        this.base = base;
        this.operator = operator;
    }

    storeValues(inputFunction) {
        inputFunction = inputFunction.replace(/\(/g, "");
        inputFunction = inputFunction.replace(/\)/g, "");

        console.log("Removed unwanted brackets from: " + inputFunction);

        let [operator, newInputFunction] = Equation.findOperator(inputFunction,false);
        this.operator = operator;

        if (newInputFunction[0] !== "x"){
            console.log("Storing " + newInputFunction + " as a number");
            this.base = parseInt(newInputFunction);
        }

        else {
            this.base = newInputFunction;
            console.log("Storing " + this.base + " as a varible");
        }
    }

    bedmasEval(){

        console.log("Found term")

        let newTerm = new Term(new Fraction(this.base), []);

        if(this.base == "x"){
            newTerm = new Term(new Fraction(1), [new Power(this.base)]);
        }

        return new Equation(this.operator,[newTerm]);
    }

    toString(){
        return this.operator + this.base;
    }
}
class Term {
    constructor(coefficient = new Fraction(0,1), powers = []) {
        this.powers = powers;
        this.coefficient = coefficient;
    }

    toString() {
        
        let string = "";

        if(this.coefficient.denominator == 1 ){
            if (this.coefficient.numerator == 1 && this.powers.length != 0) {
                
            }
            else{
                string += this.coefficient.numerator;
            }
        }

        else {
            string += this.coefficient.toString();
        }

        for (let power in this.powers) {
            power = this.powers[power];
            if (power.exponent == 1) {
                string += power.base;
            }
            else {
                string += power.base + "^" + power.exponent;
            }
        }

        return string;
    }
}
class Power {
    constructor(base = 1, exponent = 1){
        this.base = base;
        this.exponent = exponent;
    }
    isEqual(power){
        console.log("running isEqual");
        return this.base == power.base && this.exponent == power.exponent;
    }
    toString(){
        return this.base + "^" + this.exponent;
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
    const badInputs = ["a","b","c","d","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","y","z","A","B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z","{","}"];
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
        else if (a.indexOf("ln") == 0){
            var p = a.substring((a.indexOf("ln")) + 2);
            l = "1";
        }
        else{
            var p = a.substring((a.indexOf("ln")) + 2);
            l = derivitive(p);
        }
        return (l + "/" + p);
    }
    else if ((a.indexOf("^") < a.indexOf("x")) && (a.includes("^"))){
        if (a.substring((a.indexOf("^")) + 1) == "x"){
            return ("(" + a + ")*ln(" + (a.substring(0, a.indexOf("^"))) + ")");
        }
        else{
            return ("(" + a + ")*ln(" + (a.substring(0, a.indexOf("^"))) + ")*(" + derivitive(a.substring(a.indexOf("^") + 1)) + ")");
        }
    }
    else if (a.includes("log")){
        if (a.includes(",")){
            var r = a.substring(((a.indexOf("g")) + 1), a.indexOf(","));
            var e = a.substring(((a.indexOf(",")) + 1));
        }
        else{
            var r = "10";
            var e = a.substring((a.indexOf("g")) + 1)
        }
        if (e == "x"){
            var p = 1;
        }
        else{
            var p = derivitive(e);
        }
        return (p + "/(" + e + "*ln" + r + ")");
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

    let simplifiedEquation = Equation.split(Equation.InsertMultipleSymbol(input));

    console.log(simplifiedEquation.toString());
    console.log("\n-----Splitting is Complete-----");
    console.log("");

    simplifiedEquation = simplifiedEquation.bedmasEval();
    console.log(simplifiedEquation.toString());

    return input;
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
            return b;
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
            return b;
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
            balls = String;
            power = 2;
            constant = parseFloat(constant);
            balls = (constant + "/" + power);
            b = (balls + "x^" + power );
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
        if(!isNaN(input[i]) || (input[i] == ".")){
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
        if(!isNaN(input[i]) || (input[i] == ".")){
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
        input = (parseFloat(input) * 57.295779513082321);
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
        return (b);
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
    if (a.includes("+") || a.includes("-")){
        if (((a.indexOf("+") < a.indexOf("-")) && (a.indexOf("+") != (-1))) || (a.indexOf("-") == (-1))){
            var g = ("+");
        }
        else{
            var g = ("-");
        }
        var w = calculate(a.substring(0, a.indexOf(g)));
        a = a.substring(((a.indexOf(g))));
        let p = 0.0;
        let h = Boolean;
        while(a.includes("+") || a.includes("-")){
            h = (((a.indexOf("+") < a.indexOf("-")) && (a.indexOf("+") != (-1))) || (a.indexOf("-") == (-1)));
            a = a.substring(1);
            if (!(a.includes("+") || a.includes("-"))){
                p = calculate(a);
                a = "";
            }
            else{
                if (((a.indexOf("+") < a.indexOf("-")) && (a.indexOf("+") != (-1))) || (a.indexOf("-") == (-1))){
                    g = ("+");
                }
                else{
                    g = ("-");
                }
            p = calculate(a.substring(0, a.indexOf(g)));
            a = a.substring(a.indexOf(g));
            }
            if (h){
                w = w + p;
            }
            else{
                w = w - p;
            }
        }
        return(w)
    }
    if (a.includes("*") || a.includes("/")){
        if (((a.indexOf("*") < a.indexOf("/")) && (a.indexOf("*") != (-1))) || (a.indexOf("/") == (-1))){
            var g = ("*");
        }
        else{
            var g = ("/");
        }
        var w = calculate(a.substring(0, a.indexOf(g)));
        a = a.substring(((a.indexOf(g))));
        let p = 0.0;
        let h = Boolean;
        while(a.includes("*") || a.includes("/")){
            h = (((a.indexOf("*") < a.indexOf("/")) && (a.indexOf("*") != (-1))) || (a.indexOf("/") == (-1)));
            a = a.substring(1);
            if (!(a.includes("*") || a.includes("/"))){
                p = calculate(a);
                a = "";
            }
            else{
                if (((a.indexOf("*") < a.indexOf("/")) && (a.indexOf("*") != (-1))) || (a.indexOf("/") == (-1))){
                    g = ("*");
                }
                else{
                    g = ("/");
                }
            p = calculate(a.substring(0, a.indexOf(g)));
            a = a.substring(a.indexOf(g));
            }
            if (h){
                w = (w * p);
            }
            else{
                w = (w / p);
            }
        }
        return(w)
    }
    else if (a.includes("^")){
        var b = 1.0;
        var s = a.indexOf("^");
        if (a.charAt(s - 1) == "x" || a.charAt(s - 1) == "e"){
            var e = calculate(a.charAt(s - 1));
            if (s != 1){
                b = parseFloat(a.substring(0, (s - 1)));
            }
        }
        else{
            var e = calculate(a.substring(0, (s)));
        }
        var j = calculate(a.substring((s + 1)));
        return (b * (e ** j));
    }
    else if (a.includes("l")){
        console.log("equal to  " + a);
        if (a.indexOf("l") == 0){
            var b = 1.0
        }
        else{
            var b = calculate(a.substring(0, a.indexOf("l")));
        }
        if (a.includes("log")){
            if (a.includes(",")){
                var q = calculate(a.substring((a.indexOf("g") + 1), a.indexOf(",")));
                var r = calculate(a.substring((a.indexOf(",") + 1)));
                b = b * ((Math.log10(r)) / (Math.log10(q)));
            }
            else{
                var q = calculate(a.substring(a.indexOf("g") + 1));
                b = b * ((Math.log10(q)));
            }
        }
        else if (a.includes("ln")){
            console.log("calculate" + (a.substring(a.indexOf("n") + 1)));
            var q = calculate(a.substring(a.indexOf("n") + 1));
            b = b * (Math.log(q));
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
            b = (sinner(w + 1.5707963267) * g);
            console.log("b =  " + b);
            console.log("w =  " + w);
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
            b = (g * (sinner(w)) / (sinner(w + 1.570796326794897)))
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
            b = (g / sinner(p + 1.570796326794897))
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
            b = (g * (sinner(w + 1.570796326794897))/ (sinner(w)));
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
    else if (a.includes("e")){
        if (a == "e"){
            return 2.718281828459045;
        }
        else{
            return ((parseFloat(a.substring(0, a.indexOf("e")))) * 2.718281828459045);
        }
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
    if (accuracy > 8){
        return "too high accuracy";
    }
    accuracy = (10 ** accuracy);
    var length = end - begin;
    var sizeofslices = (length / accuracy);
    let currentslice = (parseFloat(begin));
    let b = 0;
    if (choice == 0){
        for (let h = 0; h < (accuracy); h++) {
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
        for (let h = 0; h < (accuracy); h++) {
            valueofx = currentslice;
            b = (b + (sizeofslices * calculate(input)));
            currentslice = (currentslice + sizeofslices);
        }
    }
    else if (choice == 3){
        valueofx = (currentslice);
        b = (b + ((sizeofslices * calculate(input)) / 2));
        for (let h = 0; h < (accuracy); h++) {
            valueofx = (currentslice);
            b = (b + (sizeofslices * calculate(input)));
            currentslice = (currentslice + sizeofslices);
        }
        valueofx = (currentslice);
        b = (b + ((sizeofslices * calculate(input)) / 2));
    }
    return b;
}