/**
 * Project: Matrix Calculator
 * Author: Christine Ng
 * Created: September 28, 2024
 * Description: This JavaScript file contains the function to perform basic matrix calculation
 *              including addition and subtraction.
 */


/**
 * Asks client for the dimension of the two matrices they would like to perform operations on.
 * The dimension of a matrix must be positive integers.
 */

arrA = [];
arrB = [];

document.getElementById("dimension-input").addEventListener("submit", (event)=> {
        event.preventDefault();
        rowA = parseFloat(document.getElementById("row-a").value);
        rowB = parseFloat(document.getElementById("row-b").value);
        colA = parseFloat(document.getElementById("col-a").value);
        colB = parseFloat(document.getElementById("col-b").value);

        if(!(Number.isInteger(rowA) && Number.isInteger(rowB) && 
                Number.isInteger(colA) && Number.isInteger(colB)
                && rowA > 0 && rowB > 0 && colA > 0 && colB > 0)){
            window.alert("Dimensions of matrices must be positive integers");
            document.getElementById("error-message").textContent = 
                "Dimensions of matrices must be positive integers";
        } else {
            document.getElementById("error-message").textContent = "";
            document.getElementById("confirm-dimension").style.display = "none";
            dimension();
        }
    }  
);

/**
 * Set up the dimension of the matrices they would like to perform operation on.
 */
function dimension(){
    document.getElementById("matrix-A").innerHTML = "";
    document.getElementById("matrix-B").innerHTML = "";
    containerA = document.getElementById("matrix-A");
    containerB = document.getElementById("matrix-B");

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
    document.getElementById("arr-A").innerHTML = `Matrix A: <br>${formatMatrixDisplay(arrA)}`;
    document.getElementById("arr-B").innerHTML = `Matrix B: <br>${formatMatrixDisplay(arrB)}`;
}

function changeDimension(){
    document.getElementById("confirm-dimension").style.display = "inline";
    clearMatrix();
}

/**
 * Performs matrix addition
 * @throws {Error} If one of the matrices are empty or the two matrices have different dimensions
 */
function addition(){
    if(arrA == undefined || arrB == undefined){
        if(rowA === rowB || colA === colB){
            const arrResult = [];
            for(let i = 0; i < rowA; i++){
                arrResult.push([]);
                for(let j = 0; j < colA; j++){
                    arrResult[i][j] = arrA[i][j] + arrB[i][j];
                }
            }
        
            updateMatrixDisplay("arr-A", "A", arrA);
            updateMatrixDisplay("arr-B", "B", arrB);
            updateMatrixDisplay("arr-result", "Result", arrResult);
            document.getElementById("load-result").style.display = "inline";
            loadResult(arrResult);
        } else{
            alert("Matrices have to be in same dimension. Please change the dimension of matrix");
            changeDimension();
        } 
    } else {
        alert("Matrices can't be empty");

        //
        console.log("A: " + arrA);
        console.log("B: " + arrB);
    }  
}

/**
 * Performs matrix subtraction
 * @throws {Error} If one of the matrices are empty or the two matrices have different dimensions
 */
function subtraction(){
    if(arrA.length == 0 || arrB.length == 0){
        window.alert("Matrix can't be empty");
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

    updateMatrixDisplay("arr-A", "A", arrA);
    updateMatrixDisplay("arr-B", "B", arrB);
    updateMatrixDisplay("arr-result", "Result", arrResult);
    document.getElementById("load-result").style.display = "inline";
}

function multiplication(){
    const arrResult = [];
    for (let rowA = 0; rowA < arrA.length; rowA++) {
        arrResult[rowA] = [];
        for (let colB = 0; colB < arrB[0].length; colB++) {
            arrResult[rowA][colB] = 0; 
            for (let colA = 0; colA < arrA[0].length; colA++) {
                arrResult[rowA][colB] += arrA[rowA][colA] * arrB[colA][colB];
            }
        }
    }

    updateMatrixDisplay("arr-A", "A", arrA);
    updateMatrixDisplay("arr-B", "B", arrB);
    updateMatrixDisplay("arr-result", "Result", arrResult);
    document.getElementById("load-result").style.display = "inline";
}



function formatMatrixDisplay(arr){
    return arr.map(row => row.join(', ')).join('<br>');
}

function updateMatrixDisplay(id, name, arr){
    document.getElementById(id).innerHTML = `Matrix ${name}: <br>${formatMatrixDisplay(arr)}`;
}

function loadResult(result){
    document.getElementById("load-result").addEventListener("click", (event) => {
        const buttonClicked = event.target;
        console.log(buttonClicked.getAttribute('id'));

        buttonClicked.getAttribute('id') == 'rslt-into-A'? arrA = result : arrB = result;

        updateMatrixDisplay("arr-A", "A", arrA);
        updateMatrixDisplay("arr-B", "B", arrB);
        updateMatrixDisplay("arr-result", "Result", result);
    })
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
    document.getElementById("arr-result").innerHTML = "";
    document.getElementById("load-result").style.display = "none";
    // document.getElementById("confirm-dimension").style.display = "inline";
}