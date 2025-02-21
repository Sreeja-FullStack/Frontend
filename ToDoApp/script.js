const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")

function addTask(){
    if(inputBox.value === ""){
        alert("You've to write the text to add!")
    }else{
        let list = document.createElement("li");
        list.innerHTML = inputBox.value;
        listContainer.appendChild(list);
        let span = document.createElement("span")
        span.innerHTML = '\u00d7'
        list.appendChild(span)
    } 
    inputBox.value = ""
    saveTask()
}

listContainer.addEventListener("click", function(event){
    if(event.target.tagName === "LI"){
        event.target.classList.toggle("checked")
        saveTask()
    }else if(event.target.tagName === "SPAN"){
        event.target.parentElement.remove()
        saveTask()
    }
},false);

function saveTask(){
    localStorage.setItem("data", listContainer.innerHTML)
}
function ShowTask(){
    listContainer.innerHTML = localStorage.getItem("data")
}
ShowTask()