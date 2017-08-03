var inquirer = require("inquirer");
var fs = require ("fs");
var BasicFlashcard = require("./BasicCard.js");
var ClozeFlashcard = require ("./ClozeCard.js");

inquirer.prompt([{
	name: 'command',
	message: 'What would you like to do?',
	type: 'list',
	choices: ['add-flashcard','show-all-cards']
}]).then(function(answer) {
	if (answer.command === 'add-flashcard') {
		addCard();
	} else if (answer.command === 'show-all-cards') {
		showCards();
	}
});

var addCard = function(){
	inquirer.prompt([{
		name: 'cardType',
		message: "What kind of flashcard would you like to create?",
		type: 'list',
		choices: ['basic-flashcard','cloze-flashcard']
	}]).then(function(answer) {
		if (answer.cardType === 'basic-flashcard') {
			inquirer.prompt([{
				name: 'front',
				message: 'What is the question?',
				validate: function(input) {
					if (input === '') {
						console.log('Please proivde a question');
						return false;
					} else {
						return true;
					}
				}
			}, {
				name: 'back',
				message: 'What is the answer?',
				validate: function(input) {
					if (input === '') {
						console.log('PLease provide an asnwer');
						return false;
					} else {
						return true;
					}
				}
			}]).then(function(answer) {
				var NewBasic = new BasicFlashcard(answer.front, answer.back);
					NewBasic.create();
					whatsNext();
			});
		} else if (answer.cardType === 'cloze-flashcard') {
			inquirer.prompt([{
				name: 'text',
				message: 'What is the full text',
				validate: function(input) {
					if (input === '') {
						console.log('PLease provide full text');
						return false;
					} else {
						return true;
					}
				}
			}, {
				name: 'cloze',
				message: 'What is the cloze portion?',
				validate: function(input) {
					if (input === '') {
						console.log("Please provide the cloze portion");
						return false;
					} else {
						return true;
					}
				}	
			}]).then(function(answer) {
				var text = answer.text;
				var cloze = answer.cloze;
				if (text.includes(cloze)) {
					var newCloze = new ClozeFlashcard(text, cloze);
					newCloze.create();
					whatsNext();
				} else {
					console.log('The cloze portion you provide is not found in the full text. Please try again.');
					addCard();
				}	
			});
		}
	});
};

var whatsNext = function() {
	inquirer.prompt([{
		name: 'nextAction',
		message: "What woudld you like to do next?",
		type: 'list',
		choices: ['create-new-card', 'show-all-cards', 'nothing']
	}]).then(function(answer) {
		if (answer.nextAction === 'create-new-card') {
			addCard();
		} else if (answer.nextAction === 'show-all-cards') {
			return;
		}
	});
};

var showCards = function() {
	fs.readFile('log.txt', 'utf8', function(error, data) {
		if (error) {
			console.log("error occured: " + error);
		}
		var questions = data.split(';');
		var notBlank = function(value) {
			return value;
		};
		questions = questions.filter(notBlank);
		var count = 0;
		showQuestions(questions, count);
	});
};
var showQuestions = function(array, index) {
	questions = array[index];
	var parsedQuestion = JSON.parse(questions);
	var questionText;
	var correctResponse;
	if (parsedQuestion.type === 'basic') {
		questionText = parsedQuestion.front;
		correctResponse = parsedQuestion.back;
	} else if (parsedQuestion.type === 'cloze') {
		questionText = parseQuestion.clozeDeleted;
		correctResponse = parseQuestion.cloze;
	}
	inquirer.prompt([{
		name: 'response',
		message: questionText
	}]).then(function(answer) {
		if (answer.response === correctResponse) {
			console.log("Correct!");
			if (index < array.length - 1) {
				showQuestion (array, length + 1);
			}
		}
	});
};