window.onload = function () {
    ///display the before the page load

    var load = document.getElementById("loader");
    var main = document.getElementById("main");

    // Hide loader and show main content after the entire page has loaded
    load.style.display = "none";
    main.style.display = "block";
    console.log('JavaScript has completely loaded.');
};





var cell = [null, null]
var errorCount = 0;
var emptyCells = new Array(81).fill(null);


//sound assets

var countMusic=new Audio("assets/mixkit-positive-interface-beep-221.wav")
var winMusic=new Audio("assets/win.wav")

var errorCord = [] // for storing the error cordinates 
var tmpErrorCord = []

function createInputBoxes(row, blockNumber) {
    //function to create input boxes
    var blockId = "block" + row + blockNumber;
    // console.log(blockId)
    var block = document.getElementById(blockId);


    for (var i = 0; i < 9; i++) {
        var inp = document.createElement("input");

        inp.readOnly = true;


        inp.setAttribute("type", "text");
        inp.setAttribute("class", "inp");



        block.appendChild(inp);
    }


}



//generate input boxes for all the blocks
for (var i = 1; i <= 3; i++) {
    for (var j = 1; j <= 3; j++) {
        createInputBoxes(i, j)
    }

}



//initialize the suddoku matrix
function initializeMatrix() {
    var matrix = [];
    for (var row = 0; row < 9; row++) {
        var tmp = [];

        for (var col = 0; col < 9; col++) {
            tmp.push(null);

        }
        matrix.push(tmp);
    }
    return matrix;
}

//initialize the matrix
//to store the game moves
var matrix = initializeMatrix();


//function to update the cell for getting the clicked cell
function updateCell(row, col, event) {
    console.log(event.target.value, row, col)
    cell[0] = row;
    cell[1] = col;

    console.log(cell)
}

//add onclick function to inp
var inp = document.getElementsByClassName("inp");
var inp1 = Array.from(inp)
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        inp1[i * 9 + j].onclick = function (event) {
            updateCell(i, j, event);
        };
    }
}




function giveColNumber(row, col) {
    if ((row == 0 || row == 3 || row == 6) && (col == 0 || col == 3 || col == 6)) {
        return 0;
    }

    else if ((row == 0 || row == 3 || row == 6) && (col == 1 || col == 4 || col == 7)) {
        return 1;
    }
    else if ((row == 0 || row == 3 || row == 6) && (col == 2 || col == 5 || col == 8)) {
        return 2;
    }


    else if ((row == 1 || row == 4 || row == 7) && (col == 0 || col == 3 || col == 6)) {
        return 3;
    }
    else if ((row == 1 || row == 4 || row == 7) && (col == 1 || col == 4 || col == 7)) {
        return 4;
    }
    else if ((row == 1 || row == 4 || row == 7) && (col == 2 || col == 5 || col == 8)) {
        return 5;
    }
    else if ((row == 2 || row == 5 || row == 8) && (col == 0 || col == 3 || col == 6)) {
        return 6;
    }

    else if ((row == 2 || row == 5 || row == 8) && (col == 1 || col == 4 || col == 7)) {
        return 7;
    }
    else if ((row == 2 || row == 5 || row == 8) && (col == 2 || col == 5 || col == 8)) {
        return 8;
    }



}

//cordinates of the rows
var rowMatrix = {
    0: ['00', '01', '02', '10', '11', '12', '20', '21', '22'],
    1: ['03', '04', '05', '13', '14', '15', '23', '24', '25'],
    2: ['06', '07', '08', '16', '17', '18', '26', '27', '28'],

    3: ['30', '31', '32', '40', '41', '42', '50', '51', '52'],
    4: ['33', '34', '35', '43', '44', '45', '53', '54', '55'],
    5: ['36', '37', '38', '46', '47', '48', '56', '57', '58'],

    6: ['60', '61', '62', '70', '71', '72', '80', '81', '82'],
    7: ['63', '64', '65', '73', '74', '75', '83', '84', '85'],
    8: ['66', '67', '68', '76', '77', '78', '86', '87', '88']
};

//cordinates of the blocks 


var box = {
    0: ['00', '01', '02', '03', '04', '05', '06', '07', '08'],
    1: ['10', '11', '12', '13', '14', '15', '16', '17', '18'],
    2: ['20', '21', '22', '23', '24', '25', '26', '27', '28'],
    3: ['30', '31', '32', '33', '34', '35', '36', '37', '38'],
    4: ['40', '41', '42', '43', '44', '45', '46', '47', '48'],
    5: ['50', '51', '52', '53', '54', '55', '56', '57', '58'],
    6: ['60', '61', '62', '63', '64', '65', '66', '67', '68'],
    7: ['70', '71', '72', '73', '74', '75', '76', '77', '78'],
    8: ['80', '81', '82', '83', '84', '85', '86', '87', '88']
};




function giveRowNumber(row, col) {

    if (row < 3 && col <= 2) {
        return 0;
    } else if (row < 3 && (col >= 3 && col <= 5)) {
        return 1;
    } else if (row < 3 && (col >= 6 && col <= 8)) {
        return 2;
    } else if ((row >= 3 && row <= 5) && col <= 2) {
        return 3;
    } else if ((row >= 3 && row <= 5) && (col >= 3 && col <= 5)) {
        return 4;
    } else if ((row >= 3 && row <= 5) && (col >= 6 && col <= 8)) {
        return 5;
    } else if ((row >= 6 && row <= 8) && col <= 2) {
        return 6;
    } else if ((row >= 6 && row <= 8) && (col >= 3 && col <= 5)) {
        return 7;
    } else if ((row >= 6 && row <= 8) && (col >= 6 && col <= 8)) {
        return 8;
    }


}


function mapToNumber(row, col) {
    //function to map 2d matrix cordinate to 1d array cordinate
    row = parseInt(row);

    col = parseInt(col);

    var num = row * 9 + col;
    return num;
}

function numInArray(num, array) {
    //check whether number is in the array
    for (var i = 0; i < array.length; i++) {
        if (num == array[i]) {
            return true;
        }
    }
    return false;
}



function getNuniqueValues(n) {
    //get unique n values
    var arr = [];
    for (var i = 0; i < n; i++) {
        var num = Math.floor(Math.random() * 10);
        if (num == 9) {
            num = num - 1;
        }
        //check whether array contains the element
        var status = numInArray(num, arr);

        if (!status) {
            arr.push(num);
        }

        else {
            i--;
        }

    }
    return arr;
}


//function to check whether the num can be inserted in the cell 
//after checking in the block, row and column

function fillingCheckAlgo(row, col, num) {

    //check the filling number in the 
    // 1. row

    var r, c;

    for (var i = 0; i < 9; i++) {

        var cord = rowMatrix[giveRowNumber(row, col)][i];
        // console.log("cord",cord)
        r = parseInt(cord[0]);
        c = parseInt(cord[1]);


        if (matrix[r][c] == num) {

            return false
        }



    }


    // // 2. for block

    for (var i = 0; i < 9; i++) {
        var cord = box[row][i]
        r = parseInt(cord[0]);
        c = parseInt(cord[1]);
        if (matrix[r][c] == num) {

            return false
        }


    }



    // // 3. for col

    for (var i = 0; i < 9; i++) {
        var cord = rowMatrix[i][giveColNumber(row, col)]
        r = parseInt(cord[0]);
        c = parseInt(cord[1]);
        if (matrix[r][c] == num) {

            return false
        }


    }

    //if the element is not present in the row,col and block
    return true;

}

//backtracking algo to fill the sudoku


function solve(matrix) {

    for (var row = 0; row < 9; row++) {

        for (var col = 0; col < 9; col++) {




            if (emptyCells[row * 9 + col] === null) {

                for (var val = 1; val <= 9; val++) {
                    // Check if it is safe to fill
                    if (fillingCheckAlgo(row, col, val)) {
                        matrix[row][col] = val;
                        emptyCells[row * 9 + col] = 1;

                        //update the ui

                        inp1[row * 9 + col].value = val;

                        var solveFurther = solve(matrix);





                        if (solveFurther) {
                            return true;
                        } else {
                            matrix[row][col] = null;

                            emptyCells[row * 9 + col] = null;
                            inp1[row * 9 + col].value = "";
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

//ans matrix to store the ans

solve(matrix); //generate the sudoku

var ans = JSON.parse(JSON.stringify(matrix));

console.log("Matrix", ans)







//now remove some random cells from each block 
for (var i = 0; i < 9; i++) {

    var unique = getNuniqueValues(4);

    for (var j = 0; j < unique.length; j++) {
        var row = parseInt(box[i][unique[j]][0])
        var col = parseInt(box[i][unique[j]][1])

        inp1[row * 9 + col].value = ""
        emptyCells[row * 9 + col] = null;
        matrix[row][col] = null;

    }

}






var emptyCellsForEditing = JSON.parse(JSON.stringify(emptyCells));


//update the bg color of the initilized cells 

for (var i = 0; i < 81; i++) {

    if (emptyCells[i] != null) {
        inp1[i].style.backgroundColor = "#038aff";
    }
}


var but = document.getElementsByClassName("but")
Array.from(but).forEach((element) => {
    element.addEventListener("click", fillCell)
})




function fillCell(event) {

    console.log("Control Clicked", event.target.textContent)
    // console.log("editing", emptyCellsForEditing)

    var r = cell[0];
    var c = cell[1];
    var num = parseInt(event.target.textContent);

    if (emptyCellsForEditing[r * 9 + c] == null) {


        inp1[r * 9 + c].value = num;
        removeDuplicateColor(); //remove 

        fillingUpdateAlgo(r, c, num);
        updateDuplicateCellColor();
        matrix[r][c] = num;   //update the value in the matrix



        //check winner
        checkWinner();




    }

}

function fillingUpdateAlgo(row, col, num) {
    errorCord = []
    //updatebtyhe color of the wrong cell

    //check the filling number in the 
    // 1. row



    var r, c;

    for (var i = 0; i < 9; i++) {

        var cord = rowMatrix[giveRowNumber(row, col)][i];

        r = parseInt(cord[0]);
        c = parseInt(cord[1]);


        if (matrix[r][c] == num) {
            var temp = [r, c]

            errorCord.push(temp);
        }



    }


    // // 2. for block

    for (var i = 0; i < 9; i++) {
        var cord = box[row][i]
        r = parseInt(cord[0]);
        c = parseInt(cord[1]);
        if (matrix[r][c] == num) {

            var temp = [r, c]

            errorCord.push(temp);
        }


    }



    // // 3. for col

    for (var i = 0; i < 9; i++) {
        var cord = rowMatrix[i][giveColNumber(row, col)]
        r = parseInt(cord[0]);
        c = parseInt(cord[1]);
        if (matrix[r][c] == num) {

            var temp = [r, c]

            errorCord.push(temp);
        }


    }

    errorCord = removeDuplicates(errorCord);
    console.log("error", errorCord)


}

function removeDuplicates(nestedArray) {
    return nestedArray.filter((arr, index, self) => {
        const foundIndex = self.findIndex((item) => {
            // Compare each subarray for equality
            return (
                item.length === arr.length &&
                item.every((value, i) => value === arr[i])
            );
        });

        // Keep only the first occurrence of each subarray
        return index === foundIndex;
    });
}


function removeDuplicateColor() {

    for (var i = 0; i < tmpErrorCord.length; i++) {
        r = tmpErrorCord[i][0];
        c = tmpErrorCord[i][1]
        inp1[r * 9 + c].style.border = "none";

    }

    tmpErrorCord = [];

}

function updateDuplicateCellColor() {
    var r, c;
    tmpErrorCord = [...errorCord]

    for (var i = 0; i < errorCord.length; i++) {
        r = errorCord[i][0];
        c = errorCord[i][1]
        inp1[r * 9 + c].style.border = "5px solid red";

    }
    console.log("tmp", tmpErrorCord)




}




function solve11(matrix) {
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (emptyCells[row * 9 + col] === null) {
                for (var val = 1; val <= 9; val++) {
                    // Check if it is safe to fill
                    if (fillingCheckAlgo(row, col, val)) {
                        matrix[row][col] = val;
                        emptyCells[row * 9 + col] = 1;

                        //update the ui

                        inp1[row * 9 + col].value = val;

                        var solveFurther = solve11(matrix);

                        if (solveFurther) {
                            return true;
                        } else {
                            matrix[row][col] = null;
                            emptyCells[row * 9 + col] = null;
                            inp1[row * 9 + col].value = "";
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function checkAllCellsFilled() {

    //check whether all empty cells has been 

    for (var i = 0; i < 81; i++) {
        if (emptyCells[i] == null && inp1[i].value == "") {
            return false;
        }
    }
 
    // console.log("empty cells0 sdsdsdsd", emptyCells)
    // console.log("empty cells0  edit 00 sds d", emptyCellsForEditing)

    return true;

}


function checkWinner() {
    var num;
    var val;

    if (checkAllCellsFilled()) {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
               
                if (matrix[i][j]!=ans[i][j]){
                    console.log("You Lose")
                    return false;
                }
               
            }
        }

        // game won if all the values placed correctly
        console.log("You won");


        //display the popup if game won
        displayPopUp();



        return true;
    }
}

function displayPopUp(){
    winMusic.currentSrc=0;
    winMusic.play();
    var sudWrap=document.getElementById("sudokuWrapper");
    var btnControl=document.getElementById("containerControls");
    var popup=document.getElementById("popup")

    sudWrap.style="filter: blur(8px); -webkit-filter: blur(8px);";
    btnControl.style="filter: blur(8px); -webkit-filter: blur(8px);";
    popup.style.display="flex"

}

function newGame(){
    location.reload();
}

//new game event listener
var ng=document.getElementById("newGame");
ng.addEventListener("click",newGame);

var butx=document.getElementsByClassName("butX");
butx[0].addEventListener("click",newGame);


//reveal ans

function revealAns(){

    var sudWrap=document.getElementById("sudokuWrapper");
    var btnControl=document.getElementById("containerControls");
    var counter=document.getElementById("ansReveal");
    counter.style.display="none";


    sudWrap.style="filter: blur(0); -webkit-filter: blur(0);";
    btnControl.style="filter: blur(0); -webkit-filter: blur(0);"
    for (var i=0;i<9;i++){


        for (var j=0;j<9;j++){
            var index=i*9+j;
            matrix[i][j]=ans[i][j];

            inp1[index].value=ans[i][j];


        }
    }
}

function countdownAns(){
    var sudWrap=document.getElementById("sudokuWrapper");
    var btnControl=document.getElementById("containerControls");

    var popup=document.getElementById("popup")

    sudWrap.style="filter: blur(8px); -webkit-filter: blur(8px);";
    btnControl.style="filter: blur(8px); -webkit-filter: blur(8px);";

    var count=document.getElementById("ansReveal");
    count.style.display="block";

    var countdown=30;
    count.textContent = countdown;
    countMusic.currentSrc=0;
    var countdownInterval = setInterval(function () {
        countdown--;
        countMusic.currentSrc=0;
        countMusic.play();
        count.textContent = countdown;

        if (countdown <= 0) {
            countMusic.pause();
            clearInterval(countdownInterval);
            // document.body.removeChild(countdownDisplay);

            // Add your logic to reveal the answer here
            revealAns();
        }
    }, 1000);

    
}

var ans1=document.getElementById("ans");
ans1.addEventListener("click",countdownAns)




// console.log("Matrix 1", matrix)
// console.log("empty cells ", emptyCells)
// console.log("empty cells edit", emptyCellsForEditing)
// console.log("ans", ans)


// solve11(matrix)
