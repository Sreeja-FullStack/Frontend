
function display(val){
    document.getElementById('result').value +=val;

}

function clearScreen(){
    document.getElementById('result').value ='';

}

function solve(){
    try{
        let result = eval(document.getElementById('result').value);
        document.getElementById('result').value = result;
    }
    catch(e){
        document.getElementById('result').value ="Error";
    }
}