//Create variables here
var dog, database, foodS, foodStock;
var feedBtn, addFoodBtn;
var fedTime, lastFed;

var food;

var dogimg, goodDog, milkBottleImg;
function preload()
{
	//load images here
  dogimg = loadImage("images/dogImg.png");
  goodDog= loadImage("images/dogImg1.png");
  milkBottleImg= loadImage("images/Milk.png");

}

function setup() {
	createCanvas(800, 550);

  database = firebase.database();

  // Creating Dog
  dog = createSprite(width/2+180, height/2, 100, 50);
  dog.addImage("BOH", dogimg);
  dog.scale =0.15;

  // Creating Milk bottle
  // milkBottle = createSprite(width/2, height/2, 100, 50);
  // milkBottle.addImage("milk", milkBottleImg);
  // milkBottle.scale =0.2;

  // Creating something
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  // Creating buttons
  feedBtn = createButton("Feed"); 
  
  feedBtn.position(500, 130);
  
  food = new Food();
}


function draw() { 
  background(46, 139, 87);
  fill("white");
  text("X:"+mouseX+ " Y:"+mouseY, 10, 50); 


  feedBtn.mousePressed(()=>{

    writeStock(foodS, "-");

  })

  // if(keyWentDown(UP_ARROW))
  // {
  //   writeStock(foodS);
  //   dog.addImage("BOH", goodDog)
  // }

  // else if(keyWentDown(DOWN_ARROW))
  // {
  //   writeStock(foodS);
  //   dog.addImage("BOH", dogimg)
  // }

  if(lastFed>=12)
  {
    text("Last Feed: " + lastFed%12 + "PM", 350, 90);
  }
  
  else if(lastFed==0)
  {
    text("Last Feed: 12 AM", 350, 90);
  }
  else
  {
    text("Last Feed: " +lastFed+" AM", 350, 90);
  }


  fedTime=database.ref("FeedTime");
  fedTime.on("value", function(data){
    lastFed=data.val();
  })


  food.display();
  drawSprites();
  //add styles here
  textSize(25);
  text("Press UP Arrow key to Feed the Dog", 200, 50);

  // textSize(17);
  // text("Press UP Arrow key to Feed the Dog", 200, 50);
}

function readStock(data)
{
  foodS = data.val();
}


function writeStock(x, op)
{

  if(op=="-")
  {
    x=x-1;
  }
  else
  {
    x=x+1;
  }
    
    

  database.ref('/').update({
    Food: x
  })
}