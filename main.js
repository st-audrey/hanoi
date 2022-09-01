var message = document.getElementById("message");
message.innerHTML = "hello"

var counter = 0;
var animation_time = "1000";
var solution = document.getElementById("solution");

var disc_number_input = document.getElementById("disc_number");
disc_number.value = null;

var stacks = {
    'start': [],
    'mid': [],
    'end': [],
}

var res_history = []

//welcome();
renderBoard();
function welcome(){
    var body = document.getElementById("welcome");
    body.classList.add("welcome");

    setTimeout(() => {
        var main = document.getElementById("main");
        main.classList.add("main");
        renderBoard();
      }, "2000")


}

function renderBoard(){
    for(i = 1; i < 4 ; i++){
        var container = document.getElementById("container");
    
        var stack_container = document.createElement("div");
        stack_container.classList.add("stack-container");
    
        var happend_point = document.createElement("div");
        happend_point.classList.add("happend-point");
        happend_point.setAttribute('id',"happend-point"+i)
    
        container.appendChild(stack_container);
        stack_container.appendChild(happend_point);
    };
}


function checkInputValue(action_type){

    var disc_number_value = parseInt(disc_number_input.value);
    counter = 0;

    if(disc_number_value > 0 && disc_number_value <= 5){
        
        if(disc_number_value == 1){
            message.innerHTML = "vous avez choisi 1 disque";
        }else{
            message.innerHTML = "vous avez choisi " + disc_number_value + " disques";
        }

        if(action_type == 'create'){
            createDisks(disc_number_value);
            renderDisks();
            console.log(disc_number_value, stacks)
        }else if(action_type == 'resolve'){
            runAlgoText(disc_number_value, 'start', 'end', 'mid');
           renderAnimation();

        }

    }else{
        message.innerHTML = "merci de renseigner un chiffre entre 1 et 5";
    }
}

function resetGame(){
    stacks = {
        'start': [],
        'mid': [],
        'end': [],
    }

    renderDisks();
}

function createDisks(disc_number){

    resetGame();

    for(i = 0; i < disc_number ; i++){

        stacks['start'].push(i + 1);
    }
}

function renderDisks(){

    console.log("stack", stacks);

    var happend_point1 = document.getElementById("happend-point1");
    var happend_point2 = document.getElementById("happend-point2");
    var happend_point3 = document.getElementById("happend-point3");

    while(happend_point1.firstChild){
        happend_point1.removeChild(happend_point1.lastChild);
    }
    while(happend_point2.firstChild){
        happend_point2.removeChild(happend_point2.lastChild);
    }
    while(happend_point3.firstChild){
        happend_point3.removeChild(happend_point3.lastChild);
    }

    for(i = 0; i < stacks['start'].length; i++){
        var disk = document.createElement("div");
        disk.classList.add("disk");
        disk.classList.add("disk"+stacks['start'][i]);
        disk.setAttribute('id',"disk"+stacks['start'][i]);
        happend_point1.appendChild(disk);
    }

    for(i = 0; i < stacks['mid'].length; i++){
        var disk = document.createElement("div");
        disk.classList.add("disk");
        disk.classList.add("disk"+stacks['mid'][i]);
        disk.setAttribute('id',"disk"+stacks['mid'][i]);
        happend_point2.appendChild(disk);
    }

    for(i = 0; i < stacks['end'].length; i++){
        var disk = document.createElement("div");
        disk.classList.add("disk");
        disk.classList.add("disk"+stacks['end'][i]);
        disk.setAttribute('id',"disk"+stacks['end'][i]);
        happend_point3.appendChild(disk);
    }
 
}

function renderAnimation(){
    setTimeout(() => {
        if(res_history.length == 0) {
            return;
        }
        stacks = res_history[0];
        res_history.splice(0, 1);
        renderDisks();
        renderAnimation();
    }, animation_time);
}

function moveDisk(disk_number, to){
    stacks[to].unshift(disk_number);
}

function removeDisk(disk_number, from){
    stacks[from].splice(stacks[from].findIndex(disk => disk == disk_number, 1), 1);
}


function runAlgoText(n, starting_stack, ending_stack, swap_stack){
 
    if(n === 0){
        solution.innerHTML = "nombre de mouvements minimum = " + counter;
        return;
    }

    runAlgoText(n-1, starting_stack, swap_stack, ending_stack);
    counter ++;
    removeDisk(n, starting_stack);
    moveDisk(n, ending_stack);
    // deep copy of the board state
    res_history.push(JSON.parse(JSON.stringify(stacks)));
    runAlgoText(n-1, swap_stack, ending_stack, starting_stack)
    
};