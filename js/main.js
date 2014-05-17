$(function(){
	var wordString = 'A computer is a general purpose device that can be programmed to carry out a set of arithmetic or logical operations automatically. Since a sequence of operations can be readily changed, the computer can solve more than one kind of problem.';
	var words = wordString.split(' ');
	
	var wordSpeed = 200;
	var wordIndex = 0;
	function nextWord(){
		if (wordIndex >= words.length){
			clearInterval(wordTick);
			return;
		}
		
		setWord(words[++wordIndex]);
	};
	
	var wordTick = setInterval(nextWord, wordSpeed);
	
	var wordDisplay = $('#wordDisplay');
	function setWord(word){
		wordDisplay.text(word);
	}
});