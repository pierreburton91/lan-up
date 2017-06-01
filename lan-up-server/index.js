var express = require('express');
var server = express();
var fs = require('fs');

/*==================================
	Enable CORS
==================================*/
server.use(function(req, res, next) {
  	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});

/*==================================
	File System functions
==================================*/
function getHallOfFame(rootDirectory, pushResults, onError) {
	fs.readdir(rootDirectory, function(err,servers) {
		if (err) {
			onError(err);
			return;
		}
		servers.forEach(function(server) {
			fs.readdir(rootDirectory + server, function(err, games) {
				if (err) {
					onError(err);
					return;
				}
				games.forEach(function(game) {
					fs.readdir(rootDirectory+server+'/'+game, function(err, files) {
						if (err) {
							onError(err);
							return;
						}
						files.forEach(function(log) {
							fs.readFile(rootDirectory+server+'/'+game+'/'+log, function(err, data) {
								if (err) {
									onError(err);
									return;
								}
								var result = [];
								var dataArray = data.toString().split('\n');

								dataArray.forEach(function(property) {
									var propArray = property.split(':');
									var obj = JSON.parse('{ "name": "'+propArray[0]+'", "score": '+parseInt(propArray[1])+'}');

									result.push(obj);
									return result;
								});
								pushResults(result);
							});
						});
					});
				});
			});
		});
	});
};
function getByServer(rootDirectory, pushResults, onError) {
	fs.readdir(rootDirectory, function(err, games) {
		if (err || !games) {
			onError(err);
			return;
		}
		else {
		games.forEach(function(game) {
			fs.readdir(rootDirectory+'/'+game, function(err, files) {
				if (err || !files) {
					onError(err);
					return;
				}
				files.forEach(function(log) {
					fs.readFile(rootDirectory+'/'+game+'/'+log, function(err, data) {
						if (err) {
							onError(err);
							return;
						}
						var result = [];
						var dataArray = data.toString().split('\n');

						dataArray.forEach(function(property) {
							var propArray = property.split(':');
							var obj = JSON.parse('{ "name": "'+propArray[0]+'", "score": '+parseInt(propArray[1])+'}');

							result.push(obj);
							return result;
						});
						pushResults(result);
					});
				});
			});
		});
		}
	});
};
function getByGame(rootDirectory, pushResults, onError) {
	fs.readdir(rootDirectory, function(err, files) {
		if (err || !files) {
			onError(err);
			return;
		}
		files.forEach(function(log) {
			fs.readFile(rootDirectory+'/'+log, function(err, data) {
				if (err) {
					onError(err);
					return;
				}
				var result = [];
				var dataArray = data.toString().split('\n');

				dataArray.forEach(function(property) {
					var propArray = property.split(':');
					var obj = JSON.parse('{ "name": "'+propArray[0]+'", "score": '+parseInt(propArray[1])+'}');

					result.push(obj);
					return result;
				});
				pushResults(result);
			});
		});
	});
};
function getServersAndGamesList(rootDirectory, pushResults, onError) {
	fs.readdir(rootDirectory, function(err,servers) {
		if (err) {
			onError(err);
			return;
		}
		var result = [];
		servers.forEach(function(server) {
			fs.readdir(rootDirectory + server, function(err, games) {
				if (err) {
					onError(err);
					return;
				}
				var gamesArray = [];
				games.forEach(function(property) {
					gamesArray.push('"'+property+'"');
					return gamesArray;
				});
				var obj = JSON.parse('{ "server": "'+server+'", "games": ['+gamesArray+']}');
				result.push(obj);
				pushResults(result);
			});
			
		});
	});
};
function getMatchingUsers(rootDirectory, userInput, pushResults, onError) {
	fs.readdir(rootDirectory, function(err,servers) {
		if (err) {
			onError(err);
			return;
		}
		servers.forEach(function(server) {
			fs.readdir(rootDirectory + server, function(err, games) {
				if (err) {
					onError(err);
					return;
				}
				games.forEach(function(game) {
					fs.readdir(rootDirectory+server+'/'+game, function(err, files) {
						if (err) {
							onError(err);
							return;
						}
						files.forEach(function(log) {
							fs.readFile(rootDirectory+server+'/'+game+'/'+log, function(err, data) {
								if (err) {
									onError(err);
									return;
								}
								var result = [];
								var dataArray = data.toString().split('\n');

								dataArray.forEach(function(property) {
									var propArray = property.split(':');
									var user = propArray[0];
									if (user.toUpperCase().includes(userInput.toUpperCase())){
										result.push(user);
										return result;
									}
								});
								pushResults(result);
							});
						});
					});
				});
			});
		});
	});
};
function getUserProfile(rootDirectory, user, pushResults, onError) {
	fs.readdir(rootDirectory, function(err,servers) {
		if (err) {
			onError(err);
			return;
		}
		servers.forEach(function(server) {
			fs.readdir(rootDirectory + server, function(err, games) {
				if (err) {
					onError(err);
					return;
				}
				games.forEach(function(game) {
					fs.readdir(rootDirectory+server+'/'+game, function(err, files) {
						if (err) {
							onError(err);
							return;
						}
						files.forEach(function(log) {
							fs.readFile(rootDirectory+server+'/'+game+'/'+log, function(err, data) {
								if (err) {
									onError(err);
									return;
								}
								var result = [];
								var dataArray = data.toString().split('\n');

								dataArray.forEach(function(property) {
									var propArray = property.split(':');
									if (propArray[0].toUpperCase() === user.toUpperCase()) {
										logNumber = log.replace(".txt", "");
										var obj = JSON.parse('{ "server": "'+server+'", "game": "'+game+'", "session": '+parseInt(logNumber)+', "score": '+parseInt(propArray[1])+'}');

										result.push(obj);
										return result;
									}
									
								});
								pushResults(result);
							});
						});
					});
				});
			});
		});
	});
};
function sort(input) {
	input.sort((a,b) => (b.score - a.score));
	return input;
};
function logErrors(error) {
	fs.readdir('/', function(err, files) {
		if (err) {
			throw err;
		}
		if(files.find(file => {return file = 'errors.txt'})) {
			var date = new Date();
			fs.appendFile('errors.txt', ''+date+':\r\n'+error+'\r\n\r\n', function (err) {
			  if (err) throw err;
			});
		}
		else {
			fs.writeFile('errors.txt', ''+date+':\r\n'+error+'\r\n\r\n', function (err) {
			  if (err) throw err;
			});
		}
	});
};

//Hall of Fame
server.get('/', function(req, res) {

	var scores = [];
	var timer;
	getHallOfFame('ranking/', function(result) {
		clearTimeout(timer);
		if (scores != []) {
			result.forEach(function(obj) {
				var reference = scores.find(target => target.name === obj.name);
				if (reference) {
					var score = reference.score + obj.score;
					var newObj = { "name": ""+obj.name+"", "score": score };
					Object.assign(reference, newObj);
				}
				else {
					scores.push(obj);
				}
			});
		}
		else {
			scores = result;
		}
		sort(scores);
		timer = setTimeout(function(){res.json(scores)}, 500);
	}, function(err) {
		logErrors(err);
		res.status(404).send('Not found');
	});
});

//Ranking by server
server.get('/ranking/:server', function(req, res) {
	var scores = [];
	var timer;
	getByServer('ranking/'+req.params.server.toLowerCase(), function(result) {
		clearTimeout(timer);
		if (scores != []) {
			result.forEach(function(obj) {
				var reference = scores.find(target => target.name === obj.name);
				if (reference) {
					var score = reference.score + obj.score;
					var newObj = { "name": ""+obj.name+"", "score": score };
					Object.assign(reference, newObj);
				}
				else {
					scores.push(obj);
				}
			});
		}
		else {
			scores = result;
		}
		sort(scores);
		timer = setTimeout(function(){res.json(scores)}, 500);
	}, function(err) {
		logErrors(err);
		res.status(404).send('Not found');
	});
});

//Ranking by game on specific server
server.get('/ranking/:server/:game', function(req, res) {
	var scores = [];
	var timer;
	getByGame('ranking/'+req.params.server.toLowerCase()+'/'+req.params.game, function(result) {
		clearTimeout(timer);
		if (scores != []) {
			result.forEach(function(obj) {
				var reference = scores.find(target => target.name === obj.name);
				if (reference) {
					var score = reference.score + obj.score;
					var newObj = { "name": ""+obj.name+"", "score": score };
					Object.assign(reference, newObj);
				}
				else {
					scores.push(obj);
				}
			});
		}
		else {
			scores = result;
		}
		sort(scores);
		timer = setTimeout(function(){res.json(scores)}, 500);
	}, function(err) {
		logErrors(err);
		res.status(404).send('Not found');
	});
});

//Servers and games by server list
server.get('/itemslist', function(req, res) {
	var items = [];
	var timer;
	getServersAndGamesList('ranking/', function(result) {
		clearTimeout(timer);
		Object.assign(items, result);
		
		timer = setTimeout(function(){
			items.sort((a,b) => {
				if(a.server < b.server) {return -1};
    			if(a.server > b.server) {return 1};
    			return 0;
    		});
			res.json(items)
		}, 500);
	}, function(err) {
		logErrors(err);
		res.status(404).send('Not found');
	});
});

//Search datalist
server.get('/datalist/:userInput', function(req, res) {
	var datalist = [];
	var timer;
	getMatchingUsers('ranking/', req.params.userInput, function(result) {
		clearTimeout(timer);
		if (datalist != [] && datalist.length <= 10) {
			result.forEach(function(item) {
				var reference = datalist.find(target => target === item);
				if (reference) {
					return;
				}
				else {
					datalist.push(item);
				}
			});
		}
		else {
			datalist = result;
		}
		timer = setTimeout(function(){
			if (datalist.length == 0) {
				res.status(404).send('Not found');
			}
			else {
				res.json(datalist);
			}
		}, 500);
	}, function(err){
		logErrors(err);
		res.status(404).send('Not found');
	});
});

//User records
server.get('/player/:user', function(req, res) {
	var userScores = [];
	var timer;
	getUserProfile('ranking/', req.params.user, function(result) {
		clearTimeout(timer);
		if (userScores != []) {
			userScores = userScores.concat(result);
		}
		else {
			userScores = result;
		}

		timer = setTimeout(function(){
			userScores.sort((a,b) => (a.session - b.session));
			res.json(userScores);
		}, 500);
	}, function(err){
		logErrors(err);
		res.status(404).send('Not found');
	});
});

//Other routes
server.get('*', function(req, res) {
	res.status(404).send('Not found');
});

server.listen(4000, function() {
	console.log('Listening on port 4000!');
});