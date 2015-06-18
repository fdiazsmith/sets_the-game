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
  });

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
