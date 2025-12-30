/*
This is a visualization of the Bubble Sort algorithm using p5.js.

Bubble Sort explained:



##Sorting##


list = [4, 0, 1, 9, 4, 2]

1. Start at the beginning of the list:

    [4, 0, 1, 9, 4, 2]
-----↑--↑-------------
number | nextNumber
  
  if number is smaller than nextNumber, do nothing.         #if (number > nextNumber){ swap them }
  however, if number is larger than nextNumber, swap them.  # list[i], list[i+1] = list[i+1], list[i];

  output after 1st comparison: [0, 4, 1, 9, 4, 2]           # 0 and 4 swapped

  2.Then repeat this process for each pair of adjacent elements until you reach the end of the list 
    it's not necessary to start over from the beginning because the last numbers are already in the correct order.
  
  output:[0, 1, 4, 4, 2, 9]

  It's also used substeps so for each iteration the sorter runs multiple times to run faster

##Counting##


To check if the list is sorted, we can count how many adjacent pairs are in the correct order
  For example, in the list [0, 1, 4, 4, 2, 9]:
  - 0 and 1 are in the correct order (0 < 1)
  - 1 and 4 are in the correct order (1 < 4)
  - 4 and 4 are in the correct order (4 <= 4)
  - 4 and 2 are NOT in the correct order (4 > 2)
  - 2 and 9 are in the correct order (2 < 9)

So, if the number of correct pairs equals the number of elements in the list, the list is sorted.  

  if(CorrectPairs === list.length - 1){
    Then the list is sorted!!!
    Stop the Program.
  }

##Drawing##

To determine the dimensions of each bar in the visualization we can use the following formulas:

  BarWidth = canvasWidth / numberOfBars        #the available space divided by the number of bars

  


  BarHeight = map(value, minValue, maxValue, 1, canvasHeight)  

  example:

      let blockHeight = map(l[j], 1, max(...l), 1, height);                             | 'map()' transforms a value from one range to another range
                                                                                        |
        l[j] = the value of index j(from the for loop) in a list                        |  map(value, 0, 100, 0, 500) 
        max(...l) = the maximum value in the list l                                     | value = 50  -> result = 250          
        1 = minimum value(so that the bars don't disappear becouse their height = 0     |  value = 100 -> result = 500
        height = maximum height of the block so they aren't bigger than the canvas      |  value = 0 -> result = 0
  

    x = index * BarWidth                        #the x position of each bar is determined by its index multiplied by the bar width 
                                                so that they are equally spaced
    y = canvasHeight - BarHeight               #the y position is determined by subtracting the bar height from the canvas height
*/




//CODE:


const numberOfBars = 100;           //set this to whateaver you want
let RandomArray = [];
let substeps = numberOfBars/5;    //decrease the number to increase the number of substeps
let lastCorrectIndex;
let RedBarIndex;
let ItemsToRandomlyAddInMainArray = []
let finishedAnimation = false
let j = 0;

function setup() {
  createCanvas(max(400, numberOfBars), 400);    //limits the canvas width to 400 
  outsideCavas =createCanvas(max(400, numberOfBars)+25, 400+25)
  for(let i = 0;i< numberOfBars;i++){
    RandomArray.push(map(i, 0, numberOfBars, 1, height));                 // adds in the numbers
  }
  shuffle(RandomArray, true)
  
  RedBarIndex = 0;
  lastCorrectIndex = RandomArray.length -1;
}

function getBlockDimensions(list, i){

  var blockWidth = width/list.length;
  var x = i*blockWidth;
  var blockHeight = map(list[i], 1, max(...list), 1, height);
  var y = height - blockHeight;

  values = [x, y, blockWidth, blockHeight]
  return values
}

function SolveSorting(list, i){

  fill(255, 0, 0);
  var [x, y, w, h] = getBlockDimensions(RandomArray, i);
  rect(x, y, w, h);

  if (list[i] >= list[i+1]){
    var lx = list[i];
    var x1 = list[i+1];
    list[i+1] = lx;
    list[i] = x1;
  }
}

function CountCorrect(list){                        //counts the correct items
  var correct = 0;

  for (var i = 0;i < list.length-1; i++){
    if (list[i] <= list[i+1]){
      correct++;
    }
  }
  return correct;
}

function goAndDraw(l){                                //iterate over all the items in a list and draw them

  for (let j = 0;j < l.length;j++){                 

    fill(255);
    
    var [x, y, w, h] = getBlockDimensions(l, j);
    rect(x, y, w, h);
  }
}

function draw() {                         //main loop
  
  frameRate(10)
  if(CountCorrect(RandomArray) !== RandomArray.length - 1){
    outsideCavas.background(117)
    for (current=0;current<substeps;current++){

      background(0);
      goAndDraw(RandomArray);
      
      //substeps = map(mouseX, 0, 200, 1, numberOfBars)      You can add this here to be able to control with the mouse X position the substeps
      
      noStroke()
      RedBarIndex++;
      
      if (RedBarIndex > lastCorrectIndex){
        RedBarIndex = 0;
        lastCorrectIndex -= 1;
      }
      

      if (CountCorrect(RandomArray) !== RandomArray.length - 1) {
        SolveSorting(RandomArray, RedBarIndex);
        }
        goAndDraw(RandomArray)
    }
  }
  else{
    playAnimation()
  }
}

function playAnimation(){
  if (finishedAnimation){
    goAndDraw(RandomArray)
    noLoop()
    fill(255)
    textAlign(CENTER, CENTER);               //|
    textFont('Courier New');                 //|
    textStyle(BOLD)                          //|-- Text Settings
    textSize(64);                            //|
    text('DONE!!!', width / 2, height / 6);  //|
  }

  else{
    if(j > RandomArray.length - 1){
        finishedAnimation = true
      }
    j++;
    fill(0, 255, 0);
    var [x, y, w, h] = getBlockDimensions(RandomArray, j);
    rect(x, y, w, h);
  }
}