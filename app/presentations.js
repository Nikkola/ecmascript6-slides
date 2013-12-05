window.presentations = [];
 

var testPresentation = {
	id: 1,
	name: 'ECMAScript 6. Будущее рядом',
	image: 'images/logo.jpg',
	author: 'Чернобаев Николай',
	slides: [
		{
			image: 'images/javascript-language.jpg'
		},
		{ 
			title: 'javascript везде!',
			link: [
				{
					linkName : 'Мобильные приложения',
					linkUrl  : 'http://phonegap.com/' 
				},
				{
					linkName : 'Back-end (сервер)',
					linkUrl  : 'http://nodejs.org/' 
				},
				{
					linkName : 'Десктоп',
					linkUrl  : 'http://www.tidesdk.org/' 
				},
				{
					linkName : 'Игры...',
					linkUrl  : 'http://html5game.ru/index.php' 
				},
				{
					linkName : '...даже такие',
					linkUrl  : 'http://www.unrealengine.com/html5/' 
				},
				{
					linkName : '3D',
					linkUrl  : 'http://codepen.io/befamous/pen/442915109539f48b92700c137c3fafe9?11' 
				},
				{
					linkName : 'Matrix',
					linkUrl  : 'http://famo.us/'
				}, 
				{
					linkName : 'Роботы и...',
					linkUrl  : 'http://fightcodegame.com' 
				},
				{
					linkName : '...hardware',
					linkUrl  : 'http://nodebots.io/' 
				},
				{
					linkName : 'Visual/Color Tracking (Google Glass)',
					linkUrl  : 'http://www.youtube.com/watch?v=i5-WKOqLDOo' 
				},
				{
					linkName : 'SMS',
					linkUrl  : 'http://www.zeepmobile.com/developers/getting_started/register_your_app' 
				},
				{
					linkName : 'Биология',
					linkUrl  : 'http://genomejs.com' 
				}

			]			 
		},  
		{ 
			title: 'Проблемы.',
			bullets:[ 
			'Единый глобальный неймспейс и глобальные переменные',
			'Прототипное наследование сложное и не всем понятное',
			'Точность Float (0.4 + 0.2)',
			'Область видимости только в функциях (блочной нет)',
			'Проблемы c массивами (они все объекты и псевдомассивы)',
			'=== и и !== и их злые близнецы == и !=',
			'for...in и hasOwnProperty',
			'место для вашего варианта'
		]

		},
		{ 
			title: 'Выход есть!'
		},
		{ 
			image: 'images/superman.jpg'
		},
		{ 
			image: 'images/ecmascript6_superman.jpg'
		}, 

		{ 
		    snippet: [
				{
					heading: 'Блочная область видимости',
					url: 'snippets/es6_let.html'
		 		}
		    ]
		},
		{ 
			snippet: [
				{ 
					heading: '',
					url: 'snippets/es6_let2.html'
		 		}
		    ]
		},
		{ 
		    snippet: [
		    		{ 
						heading: 'Модули',
						url: 'snippets/es6_modules.html'
		    		}
		 	]
		}, 
		{ 
		    snippet: [
		    		{ 
						heading: 'Классы',
						url: 'snippets/es6_classes.html'
		    		}
		 	]
		},
		{ 
		    snippet: [
		    		{ 
						heading: 'String',
						url: 'snippets/es6_string.html'
		    		}
		 	]
		},
		{ 
		    snippet: [
		    		{ 
						heading: 'Number',
						url: 'snippets/es6_number.html'
		    		}
		 	]
		},
		{ 
		    snippet: [
		    		{ 
						heading: 'Object',
						url: 'snippets/es6_object.html'
		    		} 
		 	]
		},
		{ 
		    snippet: [
		    		{ 
						heading: 'Array',
						url: 'snippets/es6_arrays.html'
		    		}
		 	]
		},
		{ 
		    snippet: [
		    		{ 
						heading: 'Function',
						url: 'snippets/es6_functions.html'
		    		}
		 	]
		}, 
		{ 
		    snippet: [
		    		{ 
						heading: 'Math',
						url: 'snippets/es6_math.html'
		    		}
		 	]
		},
		{ 
		    snippet: [
		    		{ 
						heading: 'Строки-шаблоны',
						url: 'snippets/es6_string_templates.html'
		    		}
		 	]
		},
		{ 
		    snippet: [
		    		{ 
						heading: 'Коллекции',
						url: 'snippets/es6_collections.html'
		    		} 
		 	]
		}, 
		{ 
		    snippet: [
		    		{ 
						heading: 'Цикл for...of',
						url: 'snippets/es6_for_of.html'
		    		}
		 	]
		},
		{ 
			title: 'Полезные ссылки!', 
			link: [
				{
					linkName : 'https://github.com/google/traceur-compiler',
					linkUrl  : 'https://github.com/google/traceur-compiler' 
				},
				{
					linkName : 'http://square.github.io/es6-module-transpiler/',
					linkUrl  : 'http://square.github.io/es6-module-transpiler/' 
				}, 
				{
					linkName : 'https://github.com/paulmillr/es6-shim',
					linkUrl  : 'https://github.com/paulmillr/es6-shim' 
				},
				{
					linkName : 'https://github.com/ModuleLoader/es6-module-loader',
					linkUrl  : 'https://github.com/ModuleLoader/es6-module-loader' 
				},
				{
					linkName : 'http://kangax.github.io/es5-compat-table/es6/',
					linkUrl  : 'http://kangax.github.io/es5-compat-table/es6/' 
				},

				{
					linkName : 'Reflector :)',
					linkUrl  : 'https://www.justareflektor.com/'
					
				}
			]		
		},




		//доп.
		// { 
		//     snippet: [
		//     		{ 
		// 				heading: 'Итераторы',
		// 				url: 'snippets/es6_iterators.html'
		//     		} 
		//  	]
		// }, 
		// { 
		//     snippet: [
		//     		{ 
		// 				heading: 'Генераторы',
		// 				url: 'snippets/es6_generators.html'
		//     		} 
		//  	]
		// }, 
		// { 
		//     snippet: [
		//     		{ 
		// 				heading: 'Деструктуризация',
		// 				url: 'snippets/es6_destructuring_assignment.html'
		//     		} 
		//  	]
		// }, 





		{
			title: 'Спасибо, за внимание!', 
			link: [
				{
					linkName : 'http://vk.com/chernobaev.nick',
					linkUrl  : 'http://vk.com/chernobaev.nick' 
				},
				{
					linkName : 'www.facebook.com/nickolay.chernobaev',
					linkUrl  : 'www.facebook.com/nickolay.chernobaev' 
				}, 
				{
					linkName : 'https://twitter.com/NickyMeloman',
					linkUrl  : 'https://twitter.com/NickyMeloman' 
				}
			]
		},
		{
			image: [
				{
					heading: 'Удачи в разработке.',
					src: 'images/chinchillin.jpg'
				}
			]
		}
	]
}

 
presentations.push(testPresentation);