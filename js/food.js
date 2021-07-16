class Food
{
    constructor()
    {

        this.milkBottleImg= loadImage("./images/Milk.png");
        // image = loadImage("./images/Milk.png");
        this.addFoodBtn = createButton("Add Food"); 
        this.milkBottle = createSprite(180, height/2, 100, 50);
        this.milkBottle.addImage("milk", this.milkBottleImg);
        this.milkBottle.scale =0.1;
    }
    
    getFoodStock()
    {
        var foodStockRef = database.ref('lastFeed');
        foodStockRef.on("value", function(data){
            foodStockRef = data.val()
        })
    }
    
    updateFoodStock(state)
    {
        database.ref('/').update({
            // gameState : state
        });
    }
    
    deductFoodStock()
    {
        
    }
    
    
    
    display()
    {
        
        this.addFoodBtn.mousePressed(()=>{
            writeStock(foodS);
            
            imageMode(CENTER);
            image(this.milkBottleImg, 205, height/2, 70, 80)
        })


        this.addFoodBtn.position(600, 130);
    }
}