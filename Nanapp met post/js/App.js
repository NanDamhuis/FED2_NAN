
//Hier maak ik de namespace van de app aan, als deze nog niet bestaat wordt er een nieuw object aangemaakt.
var SCOREAPP = SCOREAPP || {};

(function(){
"use strict";
// Data objecten, hier staat de content in


	SCOREAPP.schedule = {};

	SCOREAPP.ranking = {};

  SCOREAPP.game = {};


//Hier heb ik alle utilities in staan

SCOREAPP.extraStuff = {
        spinner: {
            spinnerObject: document.getElementById("spinner"), 
            show: function () {
                this.spinnerObject.className = "spin";
            },
            hide: function () {
                this.spinnerObject.className ="stopspin";
            }
        },

      gesture:function(){
        $$("#refresh").doubleTap(function () {

        console.log("reloading the matrix");

        SCOREAPP.extraStuff.reloadpage();


        });
      },

      reloadpage:function(){

        location.reload()
      }
    };

// controller object, vanuit hier initiate ik bepaalde functies en methods

	SCOREAPP.controller = {

		init: function(){
			//start de router
			SCOREAPP.router.init();
      SCOREAPP.extraStuff.gesture();
		}
};

//Het router object connect 'pages' aan elkaar
	SCOREAPP.router = {

		init: function(){
			routie({

				'/game/:id': function(id){
                    console.log("Losse wedstrijd");
					SCOREAPP.page.gamePagina(id);

				},
				'/schedule': function(){
                    console.log("Schedule");
					  SCOREAPP.page.page2();
				},
				'/ranking': function(){
                    console.log("Ranking");
					SCOREAPP.page.page3();
				},
                
				'*': function(){
                    console.log("Schedule");
					SCOREAPP.page.page2();
				}

			});
		},
//deze functie geeft de class active mee aan de content zodat het zichtbaar wordt



       change: function () {
            var route = window.location.hash.slice(2),
                sections = qwery('section[data-route]');
              

            for (var i=0; i < sections.length; i++) {
                sections[i].classList.remove('active');
            }
            
            if (route.search("/") != -1) {
              route = route.substring(0, route.search("/"));
            }


            var section = qwery('[data-route=' + route + ']')[0];
            section.classList.add('active');

            // Default route
            if (!route) {
                sections[0].classList.add('active');
            }
        }
  };

//In dit object zet ik alle informatie die nodig is om de score te posten
SCOREAPP.post ={

          postMethod: function(id, team1, team2, ended) {
            //alert("do post");
             var xhr = new XMLHttpRequest;
             xhr.open("POST","https://api.leaguevine.com/v1/game_scores/",true);
        

             var dataObject = {
                    "game_id": id,
                    "team_1_score": team1,
                    "team_2_score": team2,
                    "final": ended
             };

            xhr.setRequestHeader("Content-Type","application/json");
            xhr.setRequestHeader("Accept","application/json");
            xhr.setRequestHeader("Authorization","bearer 9c0e5646cc");


            xhr.send(JSON.stringify(dataObject));
            
        }




};
//De paginaobjecten

    SCOREAPP.page = {
        gamePagina: function(id){
             SCOREAPP.extraStuff.spinner.show();
             promise.get('https://api.leaguevine.com/v1/games/'+ id +'/?access_token=0bcd55f999').then(function(error, text, xhr) {
                if (error) {
                  console.log('Error ' + xhr.status);
                  // Stop met de functie
                  return;
                }

                var parsedObject = JSON.parse(text);
     
                SCOREAPP.game = parsedObject.objects;
                           
                SCOREAPP.extraStuff.spinner.hide();

                var directives = {
                  postscorebutton: {
                    onclick: function() {
                      return "SCOREAPP.post.postMethod(" + this.id + ", " + this.team_1_score + ", " + this.team_2_score +", false)";
                    }
                  }
                }

                Transparency.render(qwery('[data-route=game]')[0],parsedObject, directives);

            });

            SCOREAPP.router.change();


        },
       
        page2: function() {
      
            SCOREAPP.extraStuff.spinner.show();
            promise.get('https://api.leaguevine.com/v1/games/?tournament_id=19389&limit=100&access_token=eed184cbd8').then(function(error, text, xhr) {
                if (error) {
                  console.log('Error ' + xhr.status);
                  // Stop met de functie
                  return;
                }


                var parsedObject = JSON.parse(text);
                
                
                SCOREAPP.schedule = parsedObject.objects;
                
              //met deze directives geef ik aan het adjusten van de page de juiste ID mee van de wedstrijd
                  var directives = {
                      adjust: {
                        href: function(params) {
                          return "#/game/" + SCOREAPP.schedule[0].id;
                      }
                    }
                  } 

                SCOREAPP.extraStuff.spinner.hide();
                Transparency.render(qwery('[data-route=schedule')[0],parsedObject, directives);


            });

            SCOREAPP.router.change();

        },
        page3: function() {
            SCOREAPP.extraStuff.spinner.show();
            promise.get('https://api.leaguevine.com/v1/pools/?tournament_id=19389&access_token=8ec88ebf01').then(function(error, text, xhr) {
                if (error) {
                  console.log('Error ' + xhr.status);
                  // Stop met de functie
                  return;
                }

                var parsedObject = JSON.parse(text);

                SCOREAPP.ranking = parsedObject.objects;
                SCOREAPP.extraStuff.spinner.hide();
                Transparency.render(qwery('[data-route=ranking')[0],parsedObject.objects);

            });

            SCOREAPP.router.change();

        }
    };

// Voer deze functie uit als de DOM geladen is
	domready(function() {
	//Kickstart de applicatie
		SCOREAPP.controller.init();
	});


})();