var SCOREAPP = SCOREAPP || {};

(function(){
"use strict";
// Data objecten, hier staat de content in

	SCOREAPP.game = {
		 
	};

	SCOREAPP.schedule = {
    title:'Pool A - schedule',
        items: [
    { date: "Monday, 9:00am", team1: "Chasing", team1Score: "13", team2: "Amsterdam Money Gang", team2Score: "9"},
    { date: "Monday, 9:00am", team1: "Boomsquad", team1Score: "15", team2: "Beast Amsterdam", team2Score: "11"},
    { date: "Monday, 10:00am", team1: "Beast Amsterdam", team1Score: "14", team2: "Amsterdam Money Gang", team2Score: "12"},
    { date: "Monday, 10:00am", team1: "Chasing", team1Score: "5", team2: "Burning Snow", team2Score: "15"},
    { date: "Monday, 11:00am", team1: "Boomsquad", team1Score: "11", team2: "Amsterdam Money Gang", team2Score: "15"},    
    { date: "Monday, 11:00am", team1: "Burning Snow", team1Score: "15", team2: "Beast Amsterdam", team2Score: "6"},
    { date: "Monday, 12:00pm", team1: "Chasing", team1Score: "8", team2: "Beast Amsterdam", team2Score: "15"},
    { date: "Monday, 12:00pm", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"},
    { date: "Monday, 1:00pm", team1: "Chasing", team1Score: "15", team2: "Boomsquad", team2Score: "14"},
    { date: "Monday, 1:00pm", team1: "Burning Snow", team1Score: "15", team2: "Amsterdam Money Gang", team2Score: "11"}
    ]
	};

	SCOREAPP.ranking = {
		title:'Pool A - Ranking',
         items: [
    { team: "Chasing", Win: "2", Lost: "2", Sw: "7", Sl: "9", Pw: "35", Pl: "39"},
    { team: "Boomsquad", Win: "2", Lost: "2", Sw: "9", Sl: "8", Pw: "36", Pl: "34"},
    { team: "Burning Snow", Win: "3", Lost: "1", Sw: "11", Sl: "4", Pw: "36", Pl: "23"},
    { team: "Beast Amsterdam", Win: "2", Lost: "2", Sw: "6", Sl: "8", Pw: "30", Pl: "34"},
    { team: "Amsterdam Money Gang", Win: "1", Lost: "3", Sw: "6", Sl: "10", Pw: "30", Pl: "37"}
    ]
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
            promise.get('https://api.leaguevine.com/v1/pools/?order_by=%5Bid%5D&fields=%5Bstandings%5D&access_token=441ea6a1da').then(function(error, text, xhr) {
                if (error) {
                  console.log('Error ' + xhr.status);
                  // Stop met de functie
                  return;
                }

                var parsedObject = JSON.parse(text);     
                SCOREAPP.game = parsedObject.objects[0].standings[0,1,2,3];     
                Transparency.render(qwery('[data-route=game')[0], SCOREAPP.game);
                // console.log('The page contains ' + text.length + ' character(s).');
                // console.log(text);

                for(var i = 0; i < parsedObject.objects.length; i++) {
                    SCOREAPP.game = parsedObject.objects[i];
                    console.log(parsedObject.objects[i].standings[0]);
                }
            });

            SCOREAPP.router.change();
            
        },
        page2: function() {
            Transparency.render(qwery('[data-route=schedule]')[0], SCOREAPP.schedule);
            SCOREAPP.router.change();
        },
        page3: function() {
            Transparency.render(qwery('[data-route=ranking]')[0], SCOREAPP.ranking);
            SCOREAPP.router.change();
        },

        movies: function () {
            promise.get('http://dennistel.nl/movies').then(function(error, text, xhr) {
                if (error) {
                  console.log('Error ' + xhr.status);
                  return;
                }

                SCOREAPP.movies = JSON.parse(text);          
                Transparency.render(qwery('[data-route=movies')[0], SCOREAPP.movies);
                console.log('The page contains ' + text.length + ' character(s).');
                console.log(text)
            });
            SCOREAPP.router.change();
        }
    }
// Voer deze functie uit als de DOM geladen is
	domready(function() {
	//Kickstart de applicatie
		SCOREAPP.controller.init();
	});


})();