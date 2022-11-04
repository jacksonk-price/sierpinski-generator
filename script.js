let canvas = document.getElementById('canvas');

let ctx = canvas.getContext('2d');
ctx.fillStyle = '#fff';

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let pointSize = [1, 1];

let startingPoint = setStartingPoint();
const pointA = setA();
const pointB = setB();
const pointC = setC();

function setStartingPoint(){
    startingX = canvasWidth / 2;
    startingY = canvasHeight / 2;

    plotPoint(startingX, startingY);
    
    return [startingX, startingY];
}

function setA(){
    pointAX = canvasWidth / 2;
    pointAY = 0;

    plotPoint(pointAX, pointAY);

    return [pointAX, pointAY];
}

function setB(){
    pointBX = 0;
    pointBY = canvasHeight;

    plotPoint(pointBX, pointBY);

    return [pointBX, pointBY];
}

function setC(){
    pointCX = canvasWidth;
    pointCY = canvasHeight;

    plotPoint(pointCX, pointCY);

    return [pointCX, pointCY];
}

function plotPoint(x, y){
    ctx.fillRect(x, y, pointSize[0], pointSize[1]);
}

function rollDice(){
    let num = Math.floor(Math.random() * 6) + 1;
    return num;
}

function findMidpoint(x1, y1, x2, y2){
    let x =  (x1 + x2) / 2;
    let y =  (y1 + y2) / 2;

    return [x, y];
}

const sleep = (time) => {
    return new Promise(resolve => setTimeout(resolve, time))
}

const startGeneration = async () => {
    let randNum;
    let newPoint;
    ctx.clearRect(0, 0, 1000, 900);

    for (let i = 0; i < 100000; i++){
        randNum = rollDice();
        switch(true) {
            case randNum == 1 || randNum == 2:
                newPoint = findMidpoint(pointA[0], pointA[1], startingPoint[0], startingPoint[1] );
                break;
            case randNum == 3 || randNum == 4:
                newPoint = findMidpoint(pointB[0], pointB[1], startingPoint[0], startingPoint[1] );
                break;
            case randNum == 5 || randNum == 6:
                newPoint = findMidpoint(pointC[0], pointC[1], startingPoint[0], startingPoint[1] );
                break;
            default:
                console.log('Something went terribly wrong... ' + randNum);
            }
        await sleep(2);
        startingPoint = newPoint;
        plotPoint(newPoint[0], newPoint[1]);
    }
}

let generateButton = document.getElementById('generate-btn');

let clearButton = document.getElementById('clear-btn');

generateButton.addEventListener("click", startGeneration);

clearButton.addEventListener("click", function(){
    return;
});



