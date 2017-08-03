var fs = require("fs");

var BasicCard = function(front, back){
	this.front = front;
	this.back = back;
	this.create = function() {
		// grabbing the properties
		var data = {
			front: this.front,
			back: this.back,
			type: "basic",
		};
		//appending the file 
		fs.appendFile("log.txt", JSON.stringify(data) + ',', "utf8", function(error) {
			if (error) {
				console.log(error);
			}
		});
	};
}

module.exports = BasicCard;