const app = new PIXI.Application({
  resolution: devicePixelRatio, backgroundColor: 0x121212
});
document.getElementById('graphics-container').appendChild(app.view);

const graphics = new PIXI.Graphics();

let canvasWidth = app.screen.width;
let canvasHeight = app.screen.height;

let pointSize = [0.5, 0.5];

let triangle = true;

// declare all points needed
let startingPoint = [(canvasWidth / 2), (canvasHeight / 2)];
let pointA;
let pointB;
let pointC;
let pointD;

let triangleBtn = document.getElementById('triangle-btn');
let squareBtn = document.getElementById('square-btn');
triangleBtn.addEventListener('click', clickTriangle);
squareBtn.addEventListener('click', clickSquare);

clickTriangle();

document.getElementById('generate-btn').addEventListener('click', function(){
    start();
});

document.getElementById('clear-btn').addEventListener('click', function(){
    clearCanvas();
});

function start(){
    // run generation here. Check which shape user has selected and then choose appropriate generation and canvas set
    if (triangle){
        generateTriangle();
        console.log('generating a triangle...');
    }else{
        generateSquare();
        console.log('generating a square...');
    }
}

function clickTriangle(){
    triangleBtn.classList.remove('opacity-50');
    squareBtn.classList.add('opacity-50');
    triangle = true;
}

function clickSquare(){
    squareBtn.classList.remove('opacity-50');
    triangleBtn.classList.add('opacity-50');
    triangle = false;
}

function rollDie(){
    let num = 0;
    if (triangle){
        num = Math.floor(Math.random() * 6) + 1;
    }else{
        num = Math.floor(Math.random() * 4) + 1;
    }
    return num;
}

function setA(){
    let pointAX;
    let pointAY;

    if (triangle){
        pointAX = (canvasWidth / 2);
        pointAY = 0;
    }else{
        pointAX = 0;
        pointAY = 0;
    }

    return [pointAX, pointAY];
}

function setB(){
    let pointBX;
    let pointBY;

    if (triangle){
        pointBX = 0;
        pointBY = canvasHeight;
    }else{
        pointBX = canvasWidth;
        pointBY = 0;
    }

    return [pointBX, pointBY];
}

function setC(){
    let pointCX;
    let pointCY;

    if (triangle){
        pointCX = canvasWidth;
        pointCY = canvasHeight;
    }else{
        pointCX = 0;
        pointCY = canvasHeight;
    }

    return [pointCX, pointCY];
}

function setD(){
    let pointDX;
    let pointDY;

    // point D is only used on the square generation, so no conditional is needed
    pointDX = canvasWidth;
    pointDY = canvasHeight;

    return [pointDX, pointDY];
}

function plotPoint(pointX, pointY){
    graphics.drawRect(pointX, pointY, pointSize[0], pointSize[1]);
}

function findMidPoint(x1, y1, x2, y2){
    let x = (x1 + x2) / 2;
    let y = (y1 + y2) / 2;

    return [x, y];
}

function generateTriangle(){
    setPoints();
    clearCanvas();

    graphics.beginFill(0xFFFFFF);

    let randNum;
    let newStartPoint;

    for (let i = 0; i < 100000; i++){
        randNum = rollDie();

        switch(true){
            case randNum == 1 || randNum == 2:
                newStartPoint = findMidPoint(startingPoint[0], startingPoint[1], pointA[0], pointA[1]);
                break;
            case randNum == 3 || randNum == 4:
                newStartPoint = findMidPoint(startingPoint[0], startingPoint[1], pointB[0], pointB[1]);
                break;
            case randNum == 5 || randNum == 6:
                newStartPoint = findMidPoint(startingPoint[0], startingPoint[1], pointC[0], pointC[1]);
                break;
            default: 
                console.log('Something went wrong with the switch statement in the square generation');
        }
        plotPoint(newStartPoint[0], newStartPoint[1]);
        startingPoint = newStartPoint;
    }
    graphics.endFill();
    app.stage.addChild(graphics);
}

function generateSquare(){
    setPoints();
    clearCanvas();

    graphics.beginFill(0xFFFFFF);

    let randNum;
    let newStartPoint;
    let prevNum;

    for (let i = 0; i < 100000; i++){
        randNum = rollDie();
        if (randNum != prevNum){
            switch(true){
                case randNum == 1:
                    newStartPoint = findMidPoint(startingPoint[0], startingPoint[1], pointA[0], pointA[1]);
                    break;
                case randNum == 2:
                    newStartPoint = findMidPoint(startingPoint[0], startingPoint[1], pointB[0], pointB[1]);
                    break;
                case randNum == 3:
                    newStartPoint = findMidPoint(startingPoint[0], startingPoint[1], pointC[0], pointC[1]);
                    break;
                case randNum == 4:
                    newStartPoint = findMidPoint(startingPoint[0], startingPoint[1], pointD[0], pointD[1]);
                    break;
                default: 
                    console.log('Something went wrong with the switch statement in the square generation');
            }
        }else{
            continue;
        }
        prevNum = randNum;
        plotPoint(newStartPoint[0], newStartPoint[1]);
        startingPoint = newStartPoint;
    }
    graphics.endFill();
    app.stage.addChild(graphics);
}

function clearCanvas(){
    graphics.clear();
}

function setPoints(){
    pointA = setA();
    pointB = setB();
    pointC = setC();
    pointD = setD();
}

