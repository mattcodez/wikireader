"use strict";
$(function(){
	jQuery.ajaxSettings.traditional = true;
	
	var wordString = 'A computer is a general purpose device that can be programmed to carry out a set of arithmetic or logical operations automatically. Since a sequence of operations can be readily changed, the computer can solve more than one kind of problem.';
	var words = wordString.split(' ');
	
	var wordSpeed = 500;
	var wordIndex = 0;
	function nextWord(){
		if (wordIndex >= words.length){
			stop();
			return;
		}
		
		setWord(words[wordIndex++]);
	};
	
	var wordTick = null;
	function start(){
		wordTick = setInterval(nextWord, wordSpeed);
		prevHolder.empty();
		nextHolder.empty();
	}
	
	function stop(){
		clearInterval(wordTick);
	}
	
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
	
	var prevHolder = $('.prev');
	var nextHolder = $('.next');
	var wordRange = 10;
	function setContextWords(i){
		//Prev list
		prevHolder.empty();
		for (var j = Math.max(i - wordRange, 0); j < (i - 1); j++){
			prevHolder.append($('<span></span>').text(words[j]));
		}
		
		//Next list
		nextHolder.empty();
		for (var j = i + 1; j < Math.min(i + wordRange, words.length); j++){
			nextHolder.prepend($('<span></span>').text(words[j]));
		}
	}
	
	var wpmHolder = $('h2.wpm span');
	function setWPMTitle(wordSpeed){
		wpmHolder.text(Math.floor((1000 / wordSpeed) * 60));
	}
	
	setWPMTitle(wordSpeed);
	
	var speedVariance = 50;
	$(document.body).on('keyup', function(e){
		switch (e.which) {
			case 38: //up
				changeSpeed(wordSpeed - speedVariance);
			break;
			
			case 40: //down
				changeSpeed(wordSpeed + speedVariance);
			break;
		}
	});
	
	$(window).on('mousewheel', function(e, delta){
		if (delta > 0){
			changeSpeed(wordSpeed - speedVariance);
		}
		else if (delta < 0){
			changeSpeed(wordSpeed + speedVariance);
		}
	});
	
	function changeSpeed(speed){
		stop();
		
		if (speed < speedVariance){
			speed = speedVariance;
		}
		wordSpeed = speed;
		setWPMTitle(speed);
		
		start();
	}
	
	$('button.start').on('click', function(e){
		start();
	});
	$('button.stop').on('click', function(e){
		stop();
		setContextWords(wordIndex);
	});
	$('button.reset').on('click', function(e){
		wordIndex = 0;
	});
	
	$('button.url').on('click', function(e){
		var title = $('input.url').val();
		if (!title) return;
		
		var url = 'http://en.wikipedia.org/w/api.php?callback=?';
		var query = {
			'format': 'json',
			'action': 'query',
			'titles': title,
			'prop':   ['revisions', 'extracts'],
			'rvprop': 'content',
			'rvparse':''
		};
		
		$.getJSON(url, query, function(data){
			stop();
			
			var pages = 
				data && data.query && data.query.pages;
			var page = data.query.pages[Object.keys(data.query.pages)[0]]; //first page
			if (page && page.extract){
				var text = $('<div></div>').html(page.extract).text();
				words = text.split(' ');
				wordIndex = 0;
			}

			start();
		});
	});
});