
$(document).ready(function(){

var start_audio = new Audio('assets/sounds/starwars_start.mp3');
var lost_audio = new Audio('assets/sounds/lost.mp3');
var win_audio = new Audio('assets/sounds/victory.mp3');
var battle_audio = new Audio('assets/sounds/battle1.mp3');



var person1 = {
	name: "Ewok",
	health: 110,
	attack: 10,
	counter: 10
}

console.log(person1.health);

var person2 = {
	name: "Luke",
	health: 120,
	attack: 20,
	counter: 20
}



var person3 = {
	name: "Darth Vader",
	health: 130,
	attack: 30,
	counter: 30
}
var person4 = {
	name: "Darth Plagueis",
	health: 140,
	attack: 40,
	counter: 40
}

var characterObj;
var enemyObj;
var count = 4; 
var characterAttack;
var characterHealth
var enemyCounter;
var enemyHealth;
var characterName;
var enemyName;

//===============================================
// 			Function to Choose Character 
//===============================================

// choose initial character
var gamestart = false;

	$(".character").on("click", function(){
		// $(".character").off("click");
		if(gamestart == false){
			$(this).addClass("chosenCharacter")

			$(".chosenCharacter").appendTo(".yourCharacter");
			$(".chosenCharacter").find(".border").css("background-color", "#5AD");


			$(".character").not(".chosenCharacter").addClass("defaultEnemies").appendTo(".yourEnemies").find(".border").css("background-color","red").fadeTo("slow", .50);
		

			characterObj = characterId($(this).attr("id"))
			characterHealth = characterObj.health;
			characterAttack = characterObj.attack;
			characterName = characterObj.name;

			console.log("your dude: " + characterObj.name);
			$(".message").text("You have chosen " + characterName + "! Now choose who you would like to fight!");

			gamestart = true;
			start_audio.play();
		}
	});


//===============================================
// 			Function to Choose Enemy 
//===============================================


var fightstart = false;

	$(document).on("click", ".defaultEnemies", function(){
		if(fightstart == false){
			$(this).addClass("chosenEnemy").appendTo(".defender").find(".border").fadeTo("slow",1).css("background-color","red");
			
			enemyObj = characterId($(this).attr("id"))
			enemyHealth = enemyObj.health;
			enemyCounter = enemyObj.counter;
			enemyName = enemyObj.name;

			console.log("the enemy: "+ enemyObj.name);
			fightstart =true
			$(".message").text("You have chosen to battle "+ enemyName + "! Click the Attack Button to damage your Enemy!")

			start_audio.play();
		}
	});


//===============================================
// 			Function to Attack
//===============================================

var gameon = true; 
$("#attackbtn").on("click", function(){
	if(gameon && fightstart){
		console.log("enemy health before: " + enemyHealth);
		console.log("character attack: " + characterAttack);
		enemyHealth -= characterAttack;

		$(".chosenEnemy").find(".health").text(enemyHealth);
		
		console.log("enemy health after: " + enemyHealth);
		characterAttack += characterAttack;
		characterHealth -= enemyCounter;
		$(".chosenCharacter").find(".health").text(characterHealth);
		

		console.log("person1 health: " + person1.health);

		$(".message").text("You attacked "+ enemyName + " for "+ characterAttack + " damage and " + enemyName + " has counter with "+ enemyCounter + " damage!");
		gamewin(characterHealth, enemyHealth);
		battle_audio.play();

		

	}
});
 


 //===============================================
// 			Function for flicker
//===============================================


// function flickerfunction(){

// var flicker =	setInterval(function () {
// 	    $(".chosenEnemy").find(".border").css("background-color", function () {
// 	        this.switch = !this.switch
// 	        return this.switch ? "red" : ""
// 	    });
// 	}, 100);

// }

// function stopFlicker(){
// 	clearInterval(flicker())
// }

//===============================================
// 			Function to define win or loss
//===============================================

function gamewin(character,enemy){
	if(character < 0){
		console.log("you lose & show reset button");
		gameon = false; 
		

		$(".reset").html("<button id='resetbtn' class='btn btn-basic btn-xs ''><h3>Reset</h3></button>");
		$(".message").text("You Were Defeated!");

		setTimeout(lost_audio.play(),2000);

	}else if(enemy < 0){
		
		console.log("Enemy Defeated");
		$(".message").text("You defeated " + enemyName + "!");
		$(".chosenEnemy").hide();


		count -= 1; 
		if( count == 1){
			$(".message").text("YOU WIN! YOU'VE DEFEATED ALL ENEMIES!!!");
			$(".reset").html("<button id='resetbtn' class='btn btn-basic btn-xs ''><h3>Reset</h3></button>");
			win_audio.play();
		}
		// $(document).children(".yourEnemies" , ".defaultEnemies").length;
		fightstart = false;

	}else{
		return;
	}
}


//===============================================
// 			Function to associate character to object
//===============================================

function characterId(dude){
	
		switch(dude){
			case "person1" :
				return person1
			case "person2" :
				return person2
			case "person3" :
				return  person3
			case "person4" :
				return person4
	} 
		
}
// var test = characterId("person1");
// console.log(test);



//===============================================
// 			Rest Function
//===============================================

$(".reset").on("click", function(){
	$(".defaultEnemies").appendTo(".characterList").removeClass("defaultEnemies").addClass("character");
	$(".chosenCharacter").appendTo(".characterList").removeClass("chosenCharacter").addClass("character");
	// $(".character").on("click");
	gamestart = false;
	fightstart = false;
	gameon= true;
	$(".character").show().removeClass("chosenEnemy");
	$(".character").find(".border").css("background-color", "white").fadeTo("slow",1);
	$(".reset").html("");

	$("#person1").find(".health").text(person1.health);
	$("#person2").find(".health").text(person2.health);
	$("#person3").find(".health").text(person3.health);
	$("#person4").find(".health").text(person4.health);
	count = 4;
	$(".message").text("");

	
});





});
