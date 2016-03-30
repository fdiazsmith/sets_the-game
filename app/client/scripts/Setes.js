
/**
	* Setes will contain everything about the game.
	* TODO:
	* - [ ] Story initializes the three js environment.
	* NOTE: Classes need to be declared as global for them to be "viewed" by other files.
	* @class Setes
	* @constructor
	*/
Setes = {
	VERSION : "0.2",
}

Setes.init = function(){
  //Public
	self = this;
  self.board = new Board();
	self.deck = new Deck();
  //Private



	console.log("setes loaded");
//   // counter starts at 0
//   Session.setDefault('numberOfSets', 0);
//   console.log("Initializing Sets the game");
//   numberOfSets =0;
//   /*
//     * Helper functions
//     */

//  var randomPropertyAssigment = function(){
//     return Math.min( Math.max(Math.floor(Math.random()*10/3) , 0), 2);
//   };


//   /*
//     * Global Variables
//     */
//   body = Template.body;
//   card = Template.card;
//   grid = Template.sets_grid;

//   features = ["color", "shape"  , "fill"];
//   colors  = ["orange", "green"  , "blue"    ];
//   shapes  = ["x"     , "circle" , "diamond" ];
//   fills   = ["solid" ,  "hashed", "hollow"  ];

//   allPossibleCards = [];
//   numberOfCards = 0;
//   cardsSelected = 0;

//   patternCandidate =[];

//   body.helpers({
//     numberOfSets: function(){
//       return Session.get("numberOfSets");
//     }
//   });

//   body.events({
//     "click #add-card": function(e){
//       console.log("adding Card", e.target );
//       Game.insert({ color: colors[randomPropertyAssigment],
//                     shape: shapes[randomPropertyAssigment],
//                     fill: fills[randomPropertyAssigment],
//                     selected: false,
//                     createdAt: new Date() } );
//     },
//     "click #remove-card": function(){
//       console.log("removing  Card"    );
//       Game.remove(  Game.find({}, {sort: {createdAt: -1}}).fetch()[0]._id );
//     },

//     "click #pattern-check": function () {
//       var currentGame = Game.find({});
//       var count= 0;
//       var arrayColor=[], arrayFill = [], arrayShape=[], cardsIDs=[];
//       // allPosiblePermutation([firstPick,firstPick,firstPick], console );
//       currentGame.forEach(function (card){
//         // console.log(card);
//         cardsIDs[count] = card._id;
//         count++;
//       });
//       allPosibleCombinations(cardsIDs, 3);
//       console.log("Game", currentGame,cardsIDs);
//     }
//   });

//   grid.helpers({
//     cardsInDeck: function(){
//       return Game.find({});
//     },
//     numberOfCards: function(i){
//       return ( i === 12);
//     },
//     checkForMatch: function(){
//     },
//   });

//   //  // db.cardsInDeck.insert({color : "green",shape : "x",fill  : "solid", createdAt: new Date() });


//   grid.onRendered(function(){
//   });

//   card.helpers({
//   });

//   /**
//    * CARD: Envet handlers
//    */

//   card.events({
//     'click .card': function(e){

//       console.log("clicked>>>>>");
//       if($(e.target).hasClass("selected")){
//         Game.update(this._id, {$set: {
//           selected: false
//         }});
//         cardsSelected = cardsSelected > 0? cardsSelected -  1 : 0 ;
//         console.log("<<<<<hasClass selected");
//       }
//       else {
//         if (cardsSelected < 3){
//           var thisCard = Template.instance();
//           Game.update(this._id, {$set: {
//             selected: true
//           }});
//         patternCandidate[cardsSelected] = this._id;
//         console.log("++cardsSelected", cardsSelected);
//         if (cardsSelected == 2) patternSearch(patternCandidate);
//         cardsSelected++;
//         }
//       }
//     }
//   });

//   checkForPatern = function  (cards) {

//     console.log("checking for patterns:", cards.length);
//     var selection ={};
//     var results = new Array(features.length);

//     for (var i = features.length - 1; i >= 0; i--) {
//       console.log("\tfeature", features[i]);
//       selection[i]= new Array(cards.length);
//       for (var c = cards.length ; c >= 0; c--) {
//         selection[i][c] =  Game.find(cards[c]).fetch()[0][features[i]];
//         console.log("\t\tcard: " + c+ " id: ", cards[c], "feature: ",features[i], "=", selection[i][c]);
//         if(selection[i][c+1] != undefined && c === 0){
//           if( (selection[i][c] === selection[i][c+1] ) && (selection[i][c+1] === selection[i][c+2] ) ){
//             console.log("\t\t\t Match in ", selection[i][c]);
//             results[i] = true;
//           } else if( (selection[i][c] != selection[i][c+1] ) && (selection[i][c+1] != selection[i][c+2] ) && (selection[i][c+2] != selection[i][c] ) ){
//             console.log("\t\t\t Mismatch in all  ", selection[i]);
//             results[i] = true;
//           }
//         }
//       };
//     };
//     if(results[0] && results[1] && results[2] ){


//       for (var i = numberOfCards; i >= 0; i--) {
//         Game.update(card[i], {$set: {
//           color: colors[randomPropertyAssigment()],
//           shape: shapes[randomPropertyAssigment()],
//           fill: fills[randomPropertyAssigment()],
//           selected: false

//         }})
//       };
//         cardsSelected = -1;
//         console.log("YOU GOT A PATTERN & RESETTING CARDS SELECTED ", cardsSelected);
//         numberOfSets++;
//         Session.set("numberOfSets", numberOfSets)
//     }
//     else{
//        for (var i = numberOfCards; i >= 0; i--) {
//         Game.update(card[i], {$set: {
//           selected: false
//         }})
//       };
//       cardsSelected = -1;
//       console.log("GOT NOTHING RESETTING CARDS SELECTED ", cardsSelected);
//     }

//   }

//   function patternSearch(cardsID) {
//     candidate = new Array(cardsID.length);
//     for (var i = features.length - 1; i >= 0; i--){
//       for (var p = 0; p < cardsID.length; p++) {
//         candidate[p] = Game.find(cardsID[p]).fetch()[0][features[i]];
//         if(p == cardsID.length-1) {
//           if ( ( candidate[0] == candidate[1] && candidate[1] == candidate[2] ) || ( candidate[0] != candidate[1] && candidate[1] != candidate[2] && candidate[2] != candidate[0] ) ) {
//             if(i == 0 ) {
//               cardsSelected =-1;
//               return true;// console.log("SET CONFIRMED!");
//             }
//           }else {
//             cardsSelected =-1;
//             return false;
//           }
//         }
//       }
//     }
//   }


//   card.onRendered(function(){
//     //randomize and clear the selection
//     Game.update(this.data._id, {$set: {
//       color: colors[randomPropertyAssigment()],
//       shape: shapes[randomPropertyAssigment()],
//       fill: fills[randomPropertyAssigment()],
//       selected: false
//     }});
//     console.log("Card onRendered: ");
//   });
};



/**
	* A function to index the different sortig options
	* @method method_name
	* @param {String} - first_argument. sorting algorithm to choose from
	*/
Setes.method_name = function(first_argument) {
	// body...
};

 /**
	* Find all possible permutations
	* @method allPosiblePermutation
	* @param {String} - choices.
	* @param {String} - con.
	* @param {String} - prefix.
	*
	*NOTE: The number of combinations of size r drawn from an input of size n is
  *      referred to as nCr, which is equal to n! ÷ [r!(n-r)!].
	*/

Setes.allPosiblePermutation = function(choices, con, prefix) {
   numberOfCards++;

   // console.log(choices,choices.slice(1),(prefix || []).concat(choices[0][c]))
   if(!choices.length) {
     allPossibleCards[numberOfCards] = prefix;
       return ;//console.log(prefix);
   }

   for(var c = choices[0].length; c >= 0; c--) {
     // debugger;
     // console.log(choices,choices.slice(1),(prefix || []).concat(choices[0][c]))
     try {
       // usedPositions = [];
       // usedPositions.push(c+1)
       // console.log('usedPositions',usedPositions);
       allPosiblePermutation(choices.slice(1), con.log(choices[0]) , (prefix || []).concat(choices[0][c]) );
     } catch (e) {

     }
   }
 }

/**
	* Find all possible combinations
	* @method allPosibleCombinations
	* @param {String} - base.
	* @param {String} - numberOfpicks.
	*/
Setes.allPosibleCombinations =  function (base, numberOfpicks){
   var r =[];
   var counter = 0;
   for (var i = base.length; i > 0  ; i--) {
     for (var p = i-1 ; p> 0; p--) {
       for (var o =  p-1; o > 0 ; o--) {
           counter++
           r[counter] = [i,p,o];
           try {
             if(patternSearch([base[i], base[p], base[o]])) console.log(r[counter]);;
           } catch (e) {
           }
       }
     }
   }
  //  console.log("<<END of COMBINATIONS>>\n",counter,r);
 }

/**
	*
	* @method cartesian.
	* @return {Int} - r.
	*/
 Setes.cartesian =  function() {
   var r = [],
       arg = arguments, max = arg.length-1;
   function helper(arr, i) {
       for (var j=0, l=arg[i].length; j<l; j++) {
           var a = arr.slice(0); // clone arr
           a.push(arg[i][j]);
           if (i==max)
               r.push(a);
           else
               helper(a, i+1);
       }
   }
   helper([], 0);
   return r;
 }

/**
	*
	* @method multiply.
	* @param {Int} - a.
	* @param {Int} - b.
	* @return {Int} - m.
	*/
 Setes.multiply = function (a, b) {
   var aNumRows = a.length, aNumCols = a[0].length,
       bNumRows = b.length, bNumCols = b[0].length,
       m = new Array(aNumRows);  // initialize array of rows
   for (var r = 0; r < aNumRows; ++r) {
     m[r] = new Array(bNumCols); // initialize the current row
     for (var c = 0; c < bNumCols; ++c) {
       m[r][c] = 0;             // initialize the current cell
       for (var i = 0; i < aNumCols; ++i) {
         m[r][c] += a[r][i] * b[i][c];
       }
     }
   }
   return m;
 }
