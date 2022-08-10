var message = document.getElementById("message");
message.innerHTML = "hello"

var counter = 0;

var solution = document.getElementById("solution");

var disc_number_input = document.getElementById("disc_number");
disc_number.value = null;


function checkInputValue(){
    var disc_number_value = parseInt(disc_number_input.value);

    if(disc_number_value > 0 && disc_number_value <= 5){
        console.log(disc_number_value);

        if(disc_number_value == 1){
            message.innerHTML = "vous avez choisi 1 disque";
        }else{
            message.innerHTML = "vous avez choisi " + disc_number_value + " disques";
        }

        counter = 0;
        runSolution(disc_number_value, 'A', 'C', 'B');

    }else{
        message.innerHTML = "merci de renseigner un chiffre entre 1 et 5";
    }
}


function runSolution(n, starting_stack, ending_stack, swap_stack){
 
    if(n === 1){
        counter ++;
        solution.innerHTML = "nombre de mouvements minimum = " + counter;
        console.log('disque 1 bouge de ' + starting_stack + ' à ' + ending_stack);
        return;
    }

    runSolution(n-1, starting_stack, swap_stack, ending_stack);
    counter ++;
    console.log('disque ' + (n-1) + ' bouge de ' + starting_stack + ' à ' + ending_stack);
    runSolution(n-1, swap_stack, ending_stack, starting_stack);
    counter ++;
    
};