$(document).ready(function() {
	TwoLetter.init();
});

TwoLetter = {

	totalQuestionCount: 10,
	// totalQuestionCount: 3,
	showAnswerSeconds: 2,
	// showAnswerSeconds: 1,
	validWordWeight: .6,
	// validWordWeight: 0.10,

	correctCount: 0,
	incorrectCount: 0,
	incorrectValidWords: null,
	incorrectInvalidWords: null,
	displayingValidWord: null,
	askedWords: null,
	askedFakeWords: null,

	timeoutID: null,

	init: function() {

		$("#start").click(function() {
			TwoLetter.startQuiz();
		});

		$("#play_again").click(function() {
			TwoLetter.startQuiz();
		});

		$('#yes_button').click(function() {
			TwoLetter.respondToAnswer(true);
		});

		$('#no_button').click(function() {
			TwoLetter.respondToAnswer(false);
		});
	},

	startQuiz: function() {

		this.correctCount = 0;
		this.incorrectCount = 0;
		this.incorrectValidWords = [];
		this.incorrectInvalidWords = [];
		this.askedWords = [];
		this.askedFakeWords = [];

		this.showQuestion();
	},

	showQuestion: function() {

		this.displayingValidWord = Math.random() < this.validWordWeight;
		var askedWordsArray;
		var wordsArray;
		if (this.displayingValidWord) {
			askedWordsArray = this.askedWords;
			wordsArray = this.wordList;
		}
		else {
			askedWordsArray = this.askedFakeWords;
			wordsArray = this.fakeWordList;
		}

		var word = this.getRandomWord(wordsArray);
		if (askedWordsArray.indexOf(word) >= 0) {
			word = this.getRandomWord(wordsArray);
			if (askedWordsArray.indexOf(word) >= 0) {
				word = this.getRandomWord(wordsArray);
			}
		}
		this.currentWord = word;
		askedWordsArray.push(word);
		$("#question_word")[0].innerHTML = word;

		$("#quiz_question").show();
		$("#start_button").hide();
		$("#quiz_answer").hide();
		$("#quiz_finish").hide();
	},

	getRandomWord: function(wordArray) {
		var randomIndex = Math.floor(Math.random() * wordArray.length);
		return wordArray[randomIndex];
	},

	respondToAnswer: function(responseIsYes) {

		var responseIsCorrect = responseIsYes && this.displayingValidWord
								|| !responseIsYes && !this.displayingValidWord;
		if (responseIsCorrect) {

			this.correctCount++;
		}
		else {
			this.incorrectCount++;
			if (this.displayingValidWord) {
				this.incorrectValidWords.push(this.currentWord);
			}
			else {
				this.incorrectInvalidWords.push(this.currentWord);
			}
		}

		this.showAnswer(responseIsCorrect);
	},

	showQuestionOrFinish: function() {

		if (TwoLetter.totalQuestionCount <= TwoLetter.correctCount + TwoLetter.incorrectCount) {
			TwoLetter.finish();
		}
		else {
			TwoLetter.showQuestion();
		}
	},

	showAnswer: function(responseIsCorrect) {

		if (responseIsCorrect) {
			$("#correct").show();
			$("#incorrect").hide();
		}
		else {
			$("#correct").hide();
			$("#incorrect").show();
		}

		$("#quiz_question").hide();
		$("#start_button").hide();
		$("#quiz_answer").show();
		$("#quiz_finish").hide();

		if (this.timeoutID) {
			clearTimeout(this.timeoutID);
		}
		this.timeoutID = setTimeout(this.showQuestionOrFinish, this.showAnswerSeconds * 1000);
	},

	finish: function() {

		$("#score_correct")[0].innerHTML = this.correctCount;
		$("#score_incorrect")[0].innerHTML = this.incorrectCount;

		if (this.incorrectValidWords.length) {
			$("#words_valid")[0].innerHTML = this.incorrectValidWords.join(', ');
			$("#words_valid_notice").show();
		}
		else {
			$("#words_valid_notice").hide();
		}
		if (this.incorrectInvalidWords.length) {
			$("#words_invalid")[0].innerHTML = this.incorrectInvalidWords.join(', ');
			$("#words_invalid_notice").show();
		}
		else {
			$("#words_invalid_notice").hide();
		}


		$("#quiz_question").hide();
		$("#start_button").hide();
		$("#quiz_answer").hide();
		$("#quiz_finish").show();
	}
}



TwoLetter.wordList = [
	'AA',
	'AB',
	'AD',
	'AE',
	'AG',
	'AH',
	'AI',
	'AL',
	'AM',
	'AN',
	'AR',
	'AS',
	'AT',
	'AW',
	'AX',
	'AY',
	'BA',
	'BE',
	'BI',
	'BO',
	'BY',
	'DE',
	'DO',
	'ED',
	'EF',
	'EH',
	'EL',
	'EM',
	'EN',
	'ER',
	'ES',
	'ET',
	'EX',
	'FA',
	'FE',
	'GO',
	'HA',
	'HE',
	'HI',
	'HM',
	'HO',
	'ID',
	'IF',
	'IS',
	'IN',
	'IT',
	'JO',
	'KA',
	'KI',
	'LA',
	'LI',
	'LO',
	'MA',
	'ME',
	'MI',
	'MM',
	'MO',
	'MU',
	'MY',
	'NA',
	'NE',
	'NO',
	'NU',
	'OD',
	'OE',
	'OF',
	'OH',
	'OI',
	'OM',
	'ON',
	'OP',
	'OS',
	'OW',
	'OX',
	'OY',
	'PA',
	'PE',
	'PI',
	'QI',
	'RE',
	'SH',
	'SI',
	'SO',
	'TA',
	'TI',
	'TO',
	'UH',
	'UM',
	'UN',
	'UP',
	'US',
	'UT',
	'WE',
	'WO',
	'XI',
	'XU',
	'YA',
	'YE',
	'YO',
	'ZA'
	];

TwoLetter.fakeWordList = [
	'AF',
	'AK',
	'AO',
	'AP',
	'AU',
	'AZ',
	'BB',
	'BU',
	'DA',
	'DD',
	'DI',
	'DU',
	'DY',
	'EA',
	'EB',
	'EE',
	'EG',
	'EI',
	'EO',
	'EP',
	'EU',
	'EY',
	'EZ',
	'FI',
	'FO',
	'FU',
	'FY',
	'GA',
	'GE',
	'GI',
	'GU',
	'GY',
	'HH',
	'HU',
	'HY',
	'IE',
	'IG',
	'IH',
	'IL',
	'IM',
	'IO',
	'IP',
	'IR',
	'IV',
	'IX',
	'JA',
	'JE',
	'JI',
	'JU',
	'KE',
	'LE',
	'LU',
	'LY',
	'MN',
	'NI',
	'NY',
	'OA',
	'OB',
	'OG',
	'OJ',
	'OK',
	'OL',
	'OO',
	'OT',
	'OU',
	'OZ',
	'PO',
	'PU',
	'PY',
	'QA',
	'QE',
	'QO',
	'QU',
	'RA',
	'RO',
	'SA',
	'SE',
	'SU',
	'TE',
	'TU',
	'TY',
	'UD',
	'UG',
	'UI',
	'UL',
	'UR',
	'WA',
	'WI',
	'WU',
	'XA',
	'XE',
	'XO',
	'XX',
	'YI',
	'YU',
	'ZE',
	'ZO',
];

// TwoLetter.FakeFirstLetters = [
// ];
// 
// TwoLetter.FakeSecondLetters = [
// ];