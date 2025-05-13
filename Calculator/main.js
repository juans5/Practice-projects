const display = document.getElementById("display")


function appendToDisplay(input){
    display.value += input
}

function resultDisplay(){
    try{
    display.value = eval(display.value)
    }
    catch (error) {
        display.value = "Error"
        console.error("Error Syntax")
    }
}


function clearDisplay(){
    display.value = ""
}
