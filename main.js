var message = document.getElementById("message");
message.innerHTML = "hello"

var counter = 0;

var solution = document.getElementById("solution");

var disc_number_input = document.getElementById("disc_number");
disc_number.value = null;

var disks_stock = [1, 2, 3, 4, 5];

var stacks = [ 
    [], 
    [], 
    [] 
];

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
    for(i = 1; i < stacks.length + 1 ; i++){
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
        }else if(action_type == 'resolve'){
            console.log('test');
           runAlgoMove(disc_number_value, stacks[0], stacks[2], stacks[1]);
           renderDisks();

        }

    }else{
        message.innerHTML = "merci de renseigner un chiffre entre 1 et 5";
    }
}

function resetGame(){
    stacks = [ [], [], [] ];

    renderDisks();
}

function createDisks(disc_number){

    resetGame();

    for(i = disc_number; i > 0 ; i--){

        stacks[0].push(disks_stock[i-1]);

        
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

    for(i = 0; i < stacks[0].length; i++){
        var disk = document.createElement("div");
        disk.classList.add("disk");
        disk.classList.add("disk"+stacks[0][i]);
        disk.setAttribute('id',"disk"+stacks[0][i]);
        happend_point1.appendChild(disk);
    }

    for(i = 0; i < stacks[1].length; i++){
        var disk = document.createElement("div");
        disk.classList.add("disk");
        disk.classList.add("disk"+stacks[1][i]);
        disk.setAttribute('id',"disk"+stacks[1][i]);
        happend_point2.appendChild(disk);
    }

    for(i = 0; i < stacks[2].length; i++){
        var disk = document.createElement("div");
        disk.classList.add("disk");
        disk.classList.add("disk"+stacks[2][i]);
        disk.setAttribute('id',"disk"+stacks[2][i]);
        happend_point3.appendChild(disk);
    }
 
}


function moveDisk(disk_number, to){
    to.unshift(disk_number);
}

function removeDisk(disk_number, from){
    from.splice(from.findIndex(disk => disk == disk_number,1));
}


function runAlgoMove(n, starting_stack, ending_stack, swap_stack){

    var start = 'départ';
    var end = 'arrivée';
    var vide = 'vide';

    console.log(n, starting_stack, ending_stack, swap_stack)

    if(n === 1){
        counter ++;
        removeDisk(n, starting_stack);
        moveDisk(n, ending_stack);
        console.log('disque 1 bouge de ' + start + ' à ' + end);
        return;
    }

    runAlgoMove(n-1, starting_stack, swap_stack, ending_stack);
    counter ++;
    console.log('disque ' + (n-1) + ' bouge de ' + start + ' à ' + end);
    runAlgoMove(n-1, swap_stack, ending_stack, starting_stack);
    counter ++;
    
};


function runAlgoText(n, starting_stack, ending_stack, swap_stack){
 
    if(n === 1){
        counter ++;
        solution.innerHTML = "nombre de mouvements minimum = " + counter;
        return;
    }

    runAlgoText(n-1, starting_stack, swap_stack, ending_stack);
    counter ++;
    runAlgoText(n-1, swap_stack, ending_stack, starting_stack);
    counter ++;
    
};