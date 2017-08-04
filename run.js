var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	username: 'root',
	password: '11',
	database: 'playlistDB'
});

connection.connect(function(error) {
	if (error) throw error {
		console.log('error connecting '+ error.stack);
		return;
	}
	console.log('connected as id' + connection.threadId);

function afterConnection {
	connection.query('SELECT + FROM products', function(error, result){
		if(error) throw error;
		console.log(result);
	}
});
	connection.destroy();
};