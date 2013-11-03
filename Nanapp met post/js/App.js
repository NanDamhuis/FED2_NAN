var SCOREAPP = SCOREAPP || {};

(function(){
"use strict";
// Data objecten, hier staat de content in


	SCOREAPP.schedule = {};

	SCOREAPP.ranking = {};

  SCOREAPP.game = {};


//Hier heb ik alle utilities in staan

SCOREAPP.extraDingen = {
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

        console.log("WAZZUP");

        SCOREAPP.extraDingen.reloadpage();


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
      SCOREAPP.extraDingen.gesture();
		}
};

//Het router object connect 'pages' aan elkaar
	SCOREAPP.router = {

		init: function(){
			routie({

				'/game/': function() {
                    console.log("Losse wedstrijd");
					SCOREAPP.page.gamePagina();

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
                sections = qwery('section[data-route]'),
                section = qwery('[data-route=' + route + ']')[0];
                
            // Show active section, hide all other
            if (section) {
                for (var i=0; i < sections.length; i++){
                    sections[i].classList.remove('active');
                }

                section.classList.add('active');

            }

            // Default route
            if (!route) {
                sections[0].classList.add('active');

            }

        }

	};

//In dit object zet ik alle informatie die nodig is om de score te posten
SCOREAPP.post ={

postMethod: function(id, team1, team2, ended) {
             var binnenhalen = new XMLHttpRequest;
             binnenhalen.open(POST,"https://api.leaguevine.com/v1/game_scores/",true);
        

             var dataObject = {

                    "game_id": id,
                    "team_1_score": team1,
                    "team_2_score": team2,
                    "final": ended

            


             };

            binnenhalen.setRequestHeader("Content-Type","application/json");
            binnenhalen.setRequestHeader("Accept","application/json");
            binnenhalen.setRequestHeader("Authorization","bearer 74884efad3");


            binnenhalen.send(JSON.stringify(dataObject));
   
            
        }




};
//De paginaobjecten

    SCOREAPP.page = {

        

        gamePagina: function(){
            console.log("Deze match");
             SCOREAPP.extraDingen.spinner.show();
             promise.get('https://api.leaguevine.com/v1/game_scores/?tournament_id=19389&access_token=c31a4263bb').then(function(error, text, xhr) {
                if (error) {
                  console.log('Error ' + xhr.status);
                  // Stop met de functie
                  return;
                }

                var parsedObject = JSON.parse(text);
                console.log(parsedObject);
                
                SCOREAPP.schedule = parsedObject.objects[0];
                
                SCOREAPP.extraDingen.spinner.hide();

                Transparency.render(qwery('[data-route=game')[0],parsedObject.objects[0]);




            });

            SCOREAPP.router.change();


        },
       

        page2: function() {
              SCOREAPP.extraDingen.spinner.show();
             promise.get('https://api.leaguevine.com/v1/games/?season_id=20167&tournament_id=19389').then(function(error, text, xhr) {
                if (error) {
                  console.log('Error ' + xhr.status);
                  // Stop met de functie
                  return;
                }


                var parsedObject = JSON.parse(text);
                
                
                SCOREAPP.schedule = parsedObject;
                
                SCOREAPP.extraDingen.spinner.hide();

                Transparency.render(qwery('[data-route=schedule')[0],parsedObject);
                 Fader.fadeInWithId("content", 3);

            });

            SCOREAPP.router.change();
        },
        page3: function() {
            SCOREAPP.extraDingen.spinner.show();
            promise.get('https://api.leaguevine.com/v1/pools/?tournament_id=19389&access_token=8ec88ebf01').then(function(error, text, xhr) {
                if (error) {
                  console.log('Error ' + xhr.status);
                  // Stop met de functie
                  return;
                }

                var parsedObject = JSON.parse(text);

                SCOREAPP.ranking = parsedObject.objects;
                SCOREAPP.extraDingen.spinner.hide();
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