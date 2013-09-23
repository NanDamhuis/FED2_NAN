var SCOREAPP = SCOREAPP || {};

(function(){

// Data objecten

	SCOREAPP.game = {
		title:'Gamepagina',
        description:'Hier komt informatie over de wedstrijden te staan',
        items: [
            {
                title: 'Wedstrijd 1',
                description: 'Wedstrijd 1 is het eerste Wedstrijd'
            }, {
                title: 'Wedstrijd 2',
                description: 'Wedstrijd 2 is het tweede Wedstrijd'
            }, {
                title: 'Wedstrijd 3',
                description: 'Wedstrijd 3 is het derde Wedstrijd'
            }, {
                title: 'Wedstrijd 4',
                description: 'Wedstrijd 4 is het vierde Wedstrijd'
            }
        ]
	};

	SCOREAPP.schedule = {
    title:'de scheduulpagina',
        description:'Hier komt het speelscheduul te staan'
	};

	SCOREAPP.ranking = {
		title:'De rankijnpagina',
        description:'Hier komen de rankijnen onder de teams te staan'
	};

// controller object

	SCOREAPP.controller = {

		init: function(){
			//start de router
			SCOREAPP.router.init();
		}
};

//Het router object
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
				'*': function(){
                    console.log("testgame");
					SCOREAPP.page.page1();
				}

			});
		},

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
            Transparency.render(qwery('[data-route=game]')[0], SCOREAPP.game);
            SCOREAPP.router.change();
        },
        page2: function() {
            Transparency.render(qwery('[data-route=schedule]')[0], SCOREAPP.schedule);
            SCOREAPP.router.change();
        },
        page3: function() {
            Transparency.render(qwery('[data-route=ranking]')[0], SCOREAPP.ranking);
            SCOREAPP.router.change();
        }
    }
// Voer deze functie uit als de DOM geladen is
	domready(function() {
	//Kickstart de applicatie
		SCOREAPP.controller.init();
	});


})();