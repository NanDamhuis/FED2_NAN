var SCOREAPP = SCOREAPP || {};

(function(){
"use strict";
// Data objecten, hier staat de content in

	SCOREAPP.game = {
	};

   
	SCOREAPP.schedule = {
	};

	SCOREAPP.ranking = {
	};

// RENAME!
SCOREAPP.spinner = {
        spinner: {
            spinnerObject: document.getElementById("spinner"), 
            show: function () {
                this.spinnerObject.className = "spin";
            },
            hide: function () {
                this.spinnerObject.className ="stopspin";
            }
        }
    };
//een leeg object waar de data van dennistel.nl in terecht komt
SCOREAPP.movies = {};
// controller object, op dit moment niet meer dan een doorgeefluik

	SCOREAPP.controller = {

		init: function(){
			//start de router
			SCOREAPP.router.init();
		}
};

//Het router object connect 'pages' aan elkaar
	SCOREAPP.router = {

		init: function(){
			routie({

				'/game': function() {
                    console.log("testgame");
					SCOREAPP.page.page1();
				},
				'/schedule': function(){
                    console.log("testschedule");
					  SCOREAPP.page.page2();
				},
				'/ranking': function(){
                    console.log("testranking");
					SCOREAPP.page.page3();
				},
                '/movies': function() {
                    SCOREAPP.page.movies();
                },
				'*': function(){
                    console.log("testgame");
					SCOREAPP.page.page1();
				}

			});
		},
//deze functie geeft de class active mee aan de content

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

//Het paginaobject

    SCOREAPP.page = {
        page1: function() {
              
            promise.get('https://api.leaguevine.com/v1/games/?season_id=20167&tournament_id=19389').then(function(error, text, xhr) {
                if (error) {
                  console.log('Error ' + xhr.status);
                  // Stop met de functie
                  return;
                }


                var parsedObject = JSON.parse(text);

                SCOREAPP.game = parsedObject;
                
                Transparency.render(qwery('[data-route=game')[0],parsedObject);

            });

            SCOREAPP.router.change();
            
        },
        page2: function() {
              SCOREAPP.spinner.spinner.show();
             promise.get('https://api.leaguevine.com/v1/games/?season_id=20167&tournament_id=19389').then(function(error, text, xhr) {
                if (error) {
                  console.log('Error ' + xhr.status);
                  // Stop met de functie
                  return;
                }


                var parsedObject = JSON.parse(text);
                console.log(parsedObject.objects[0].team_1);
                
                SCOREAPP.schedule = parsedObject;
                
                SCOREAPP.spinner.spinner.hide();
                Transparency.render(qwery('[data-route=schedule')[0],parsedObject);

            });

            SCOREAPP.router.change();
        },
        page3: function() {
            SCOREAPP.spinner.spinner.show();
            promise.get('https://api.leaguevine.com/v1/pools/?tournament_id=19389&access_token=8ec88ebf01').then(function(error, text, xhr) {
                if (error) {
                  console.log('Error ' + xhr.status);
                  // Stop met de functie
                  return;
                }

                var parsedObject = JSON.parse(text);

                SCOREAPP.ranking = parsedObject.objects;
                
                Transparency.render(qwery('[data-route=ranking')[0],parsedObject.objects);

            });
            SCOREAPP.spinner.spinner.hide();
            SCOREAPP.router.change();
        }
    }
// Voer deze functie uit als de DOM geladen is
	domready(function() {
	//Kickstart de applicatie
		SCOREAPP.controller.init();
	});


})();