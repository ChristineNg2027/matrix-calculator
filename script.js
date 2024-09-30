/**
 * Project: Matrix Calculator
 * Author: Christine Ng
 * Created: September 28, 2024
 * Description: This JavaScript file contains the function to perform basic matrix calculation
 *              including addition and subtraction.
 */


/**
 * Asks client for the dimension of the matrices they would like to perform operation on.
 * @throws {TypeError} If the input is not a positive integer.
 */
function dimension(){
    containerA = document.getElementById("matrix-A");
    containerB = document.getElementById("matrix-B");
    rowA = parseInt(document.getElementById("row-a").value);
    rowB = parseInt(document.getElementById("row-b").value);
    colA = parseInt(document.getElementById("col-a").value);
    colB = parseInt(document.getElementById("col-b").value);
    
    if(!(Number.isInteger(rowA) && Number.isInteger(rowB) && 
            Number.isInteger(colA) && Number.isInteger(colB)
            && rowA > 0 && rowB > 0 && colA > 0 && colB > 0)){
        window.alert("Dimensions of matrices must be positive integers");
        throw new TypeError("Dimensions of matrices must be positive integers");
    }

    containerA.style.setProperty("--columns", "repeat(" + colA + ", 1fr)");
    containerA.style.setProperty("--rows", "repeat(" + rowA + ", 1fr)");
    containerB.style.setProperty("--columns", "repeat(" + colB + ", 1fr)");
    containerB.style.setProperty("--rows", "repeat(" + rowB + ", 1fr)");

    for(let i = 1; i <= rowA; i++){
        for(let j = 1; j <= colA; j++){
            var input = document.createElement("input");
            input.type = "number";
            input.id = "a" + i + j;
            containerA.appendChild(input);
        }
    }

    for(let i = 1; i <= rowB; i++){
        for(let j = 1; j <= colB; j++){
            var input = document.createElement("input");
            input.type = "number";
            input.id = "b" + i + j;
            containerB.appendChild(input);
        }
    }

}

/**
 * Sets up the matrices by using data input by client in each cell of the matrices.
 */
function setUp(){
    arrA = [];
    arrB = [];
    
    for(let i = 1; i <= rowA; i++){
        arrA.push([]);
        for(let j = 1; j <= colA; j++){
            arrA[i - 1][j - 1] = parseFloat(document.getElementById("a" + i + j).value);
        }
    }

    for(let i = 1; i <= rowB; i++){
        arrB.push([]);
        for(let j = 1; j <= colB; j++){
            arrB[i - 1][j - 1] = parseFloat(document.getElementById("b" + i + j).value);
        }
    }    
    document.getElementById("arr-A").innerHTML = arrA;
    document.getElementById("arr-B").innerHTML = arrB;
}

/**
 * Performs matrix addition
 * @throws {Error} If one of the matrices are empty or the two matrices have different dimensions
 */
function addition(){
    if(arrA.length === 0 || arrB.length === 0){
        alert("Matrices can't be empty");
    }

    if(rowA != rowB || colA != colB){
        alert("Matrices have to be in same dimension");
        throw new Error("Matrices have to be in same dimension");
    }

    const arrResult = [];
    for(let i = 0; i < rowA; i++){
        arrResult.push([]);
        for(let j = 0; j < colA; j++){
            arrResult[i][j] = arrA[i][j] + arrB[i][j];
        }
    }
    document.getElementById("arr-A").innerHTML = arrA;
    document.getElementById("arr-B").innerHTML = arrB;
    document.getElementById("end").innerHTML = arrResult;
}

/**
 * Performs matrix subtraction
 * @throws {Error} If one of the matrices are empty or the two matrices have different dimensions
 */
function subtraction(){
    if(arrA.length == 0 || arrB.length == 0){
        alert("Matrix can't be empty");
    }

    if(rowA != rowB || colA != colB){
        alert("Matrices have to be in same dimension");
        throw new Error("Matrices have to be in same dimension");
    }

    const arrResult = [];
    for(let i = 0; i < rowB; i++){
        arrResult.push([]);
        for(let j = 0; j < colB; j++){
            arrResult[i][j] = arrA[i][j] - arrB[i][j];
        }
    }
    document.getElementById("arr-A").innerHTML = arrA;
    document.getElementById("arr-B").innerHTML = arrB;
    document.getElementById("end").innerHTML = arrResult;
}

/**
 * Clears the matrices for next round of calculation
 */
function clearMatrix(){
    arrA.length = 0;
    arrB.length = 0;
    document.querySelectorAll("input").forEach(input => input.value = "");
    document.getElementById("arr-A").innerHTML = arrA;
    document.getElementById("arr-B").innerHTML = arrB;
}