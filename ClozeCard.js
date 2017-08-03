var BasicCard = require ("./BasicCard.js");
var fs = require("fs");

var ClozeCard = function (text, cloze){
	this.text = text;
	this.cloze = cloze;
	this.clozeDeleted = this.text.replace(this.cloze, ' ___________');
	this.create = function(){
		ClozeCard.prototype.create = function() {
		var data = {
			text: this.text,
			cloze: this.cloze,
			clozeDeleted : this.clozeDeleted,
			type: "cloze",
			};
			fs.appendFile("log.txt", JSON.stringify(data) + ',', "utf8", function(error) {
				if (error) {
					console.log(error);
				}
			});
		};
	};
}
module.exports = ClozeCard;