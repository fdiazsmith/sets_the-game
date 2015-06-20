Game = new Mongo.Collection("cardsInDeck");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('numberOfSets', 0);
  console.log("Initializing Sets the game");
  numberOfSets =0;
  /*
    * Helper functions
    */

 var randomPropertyAssigment = function(){
    return Math.min( Math.max(Math.floor(Math.random()*10/3) , 0), 2);
  };


  /*
    * Global Variables
    */
  body = Template.body;
  card = Template.card;
  grid = Template.sets_grid;

  colors  = ["orange", "green"  , "blue"    ];
  shapes  = ["x"     , "circle" , "diamond" ];
  fills   = ["solid" ,  "hashed", "hollow"  ];
  allPossibleCards = [];
  numberOfCards = 0;
  firstPick = [1, 2, 3, 4,  5,  6,  7,  8,  9,  10,  11,  12];
  secondPick =['1d', '2d', '3d', '4d',  '5d',  '6d',  '7d',  '8d',  '9d',  '10d',  '11d',  '12d'];
  thridPick = ['1q', '2q', '3q', '4q',  '5q',  '6q',  '7q',  '8q',  '9q',  '10q',  '11q',  '12q'];
       features = ["color", "shape", "fill"];

  // Game.insert({ "color": colors[randomPropertyAssigment],
  //               "shape": shapes[randomPropertyAssigment],
  //               "fill": fills[randomPropertyAssigment],
  //               "createdAt": new Date() });

  // console.log("Grid onCreated: ", Game.find() );

  // Session.setDefault()

  body.helpers({
    numberOfSets: function(){
      return Session.get("numberOfSets");
    }
  });

  body.events({
    "click #add-card": function(e){
      console.log("adding Card", e.target );
      Game.insert({ color: colors[randomPropertyAssigment],
                    shape: shapes[randomPropertyAssigment],
                    fill: fills[randomPropertyAssigment],
                    selected: false,
                    createdAt: new Date() } );
    },
    "click #remove-card": function(){
      console.log("removing  Card"    );
      Game.remove(  Game.find({}, {sort: {createdAt: -1}}).fetch()[0]._id );
    },
    "click #pattern-check": function () {
      var currentGame = Game.find({});
      var arrayOne = new Array();
      count = 0;
      // allPosiblePermutation([firstPick,firstPick,firstPick], console );
      allPosibleCombinations([firstPick,secondPick ,thridPick], 3);
      currentGame.forEach(function (card){
        // console.log(card);
        // number = 0;
        // arrayOne[count] = (card.color === "orange" )? 3 : (card.color === "blue")?  6 : 9;
        // count++;

      });


      console.log("Game", allPossibleCards, arrayOne);

    }
  });
  /*NOTE: The number of combinations of size r drawn from an input of size n is
          referred to as nCr, which is equal to n! ÷ [r!(n-r)!].
  */
  function multiply(a, b) {
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
  function allPosiblePermutation(choices, con, prefix) {
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
        // console.log("Error is here: ",e);
      } finally {

      }

      // console.log(choices,choices.slice(1),(prefix || []).concat(choices[0][c]))
    }
  }

  function allPosibleCombinations(base, numberOfpicks){
    var r =[], b=[],t=[];
    var one = base[0], two =base[1], three = base[2];
    var counter= 0 ;
    var c
    var ddd;
    // console.log(one,two,three);
    // return;
    for (var i = one.length; i > 0  ; i--) {
      // counter++
      console.log(">>",i, (two.length-i) - two.length);
      for (var p = i-1 ; p> 0; p--) {
        // counter++

        for (var o =  p-1; o > 0 ; o--) {
            counter++
            r[counter] = [i,p,o];
            console.log(r[counter]);
        }
      }
    }
    console.log("<<END>>\n",counter,r);
  }

  function cartesian() {
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

  grid.helpers({
    // cardsInDeck: [
    //   {color: colors[randomPropertyAssigment()]},
    //   {color: colors[randomPropertyAssigment()]},
    //   {color: colors[randomPropertyAssigment()]}
    // ]
    cardsInDeck: function(){
      return Game.find({});
    },
    numberOfCards: function(i){
      return ( i === 12);
    },
    checkForMatch: function(){

    },

  });



  //  // db.cardsInDeck.insert({color : "green",shape : "x",fill  : "solid", createdAt: new Date() });
  cardsSelected = 0;

  grid.onRendered(function(){
  });

  card.helpers({
  });


  card.events({
    'click .card': function(e){
      console.log("clicked>>>>>");
      if($(e.target).hasClass("selected")){
        Game.update(this._id, {$set: {
          selected: false
        }});
        cardsSelected = cardsSelected > 0? cardsSelected -  1 : 0 ;
        console.log("<<<<<hasClass selected");
      }
      else {
        console.log(cardsSelected, "que pasa");
        if (cardsSelected < 3){
        var thisCard = Template.instance();
         Game.update(this._id, {$set: {
          // color: colors[randomPropertyAssigment()],
          // shape: shapes[randomPropertyAssigment()],
          // fill: fills[randomPropertyAssigment()],`
          selected: true

        }});
         // Template.sets_grid.helpers.checkForMatch();

        card[cardsSelected] = this._id;
        console.log("clicked on the card: ", cardsSelected  );
        // console.log(Game.find({}, {sort: {createdAt: -1}}).count());
        if (cardsSelected === 2) checkForPatern(cardsSelected);
        cardsSelected++;

        }
      }

    }
  });
  checkForPatern = function  (numberOfCards) {
    console.log("checking for patterns:");
    var selection ={};
    var results = new Array(features.length);
    for (var i = features.length - 1; i >= 0; i--) {
      console.log("\tfeature", features[i]);
      selection[i]= new Array(numberOfCards);
      for (var c = numberOfCards ; c >= 0; c--) {
        selection[i][c] =  Game.find(card[c]).fetch()[0][features[i]];
        console.log("\t\tcard: " + c+ " id: ", card[c], "feature: ",features[i], "=", selection[i][c]);
        if(selection[i][c+1] != undefined && c === 0){
          if( (selection[i][c] === selection[i][c+1] ) && (selection[i][c+1] === selection[i][c+2] ) ){
            console.log("\t\t\t Match in ", selection[i][c]);
            results[i] = true;
          } else if( (selection[i][c] != selection[i][c+1] ) && (selection[i][c+1] != selection[i][c+2] ) && (selection[i][c+2] != selection[i][c] ) ){
            console.log("\t\t\t Mismatch in all  ", selection[i]);
            results[i] = true;
          }
        }
      };
    };
    if(results[0] && results[1] && results[2] ){
      // Meteor.methods(
      //   Game.update({ _id: { $eq :[card[0],card[1], card[2] ] } }, {$set: {
      //     color: colors[randomPropertyAssigment()],
      //     shape: shapes[randomPropertyAssigment()],
      //     fill: fills[randomPropertyAssigment()],
      //     selected: false

      //   }})
      //   );


      for (var i = numberOfCards; i >= 0; i--) {
        Game.update(card[i], {$set: {
          color: colors[randomPropertyAssigment()],
          shape: shapes[randomPropertyAssigment()],
          fill: fills[randomPropertyAssigment()],
          selected: false

        }})
      };
        cardsSelected = -1;
        console.log("YOU GOT A PATTERN & RESETTING CARDS SELECTED ", cardsSelected);
        numberOfSets++;
        Session.set("numberOfSets", numberOfSets)
    }
    else{
       for (var i = numberOfCards; i >= 0; i--) {
        Game.update(card[i], {$set: {
          selected: false

        }})
      };
      cardsSelected = -1;
      console.log("GOT NOTHING RESETTING CARDS SELECTED ", cardsSelected);
    }

  }



  card.onRendered(function(){
    //randomize and clear the selection
    Game.update(this.data._id, {$set: {
      color: colors[randomPropertyAssigment()],
      shape: shapes[randomPropertyAssigment()],
      fill: fills[randomPropertyAssigment()],
      selected: false
    }});
    console.log("Card onRendered: ");
  });
}




if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
