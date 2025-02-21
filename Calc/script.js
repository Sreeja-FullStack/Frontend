const display = document.getElementById("display")


function append(input){
    display.value += input;
}

function clearDisplay() {
    display.value = "";
  }

function calculate(){
    display.value = eval(display.value);
}
function toggleSign() {
    // Toggle the sign of the number in the display
    if (display.value !== "") {
        if (display.value.charAt(0) === '-') {
            display.value = display.value.substring(1);
        } else {
            display.value = '-' + display.value;
        }
    }
}