$(function(){
	var wordString = 'A computer is a general purpose device that can be programmed to carry out a set of arithmetic or logical operations automatically. Since a sequence of operations can be readily changed, the computer can solve more than one kind of problem.';
	var words = wordString.split(' ');
	
	var wordSpeed = 500;
	var wordIndex = 0;
	function nextWord(){
		if (wordIndex >= words.length){
			clearInterval(wordTick);
			return;
		}
		
		setWord(words[wordIndex++]);
	};
	
	var wordTick = setInterval(nextWord, wordSpeed);
	
	var wordDisplay = $('#wordDisplay');
	var wordSections = wordDisplay.find('span');
	function setWord(word){
		var redIndex = Math.floor(word.length / 2) - 1;
		var first = word.slice(0, redIndex);
		var middle = word[redIndex];
		var end = word.slice(redIndex + 1);
		
		wordSections.eq(0).text(first);
		wordSections.eq(1).text(middle);
		wordSections.eq(2).text(end);
	}
});