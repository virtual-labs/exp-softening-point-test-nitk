var p=Math.floor(Math.random()*(3));
var screensVal = 0;
var tries = 0;
var minute = 5,sec = 0;
var bubbleInt = 0;
var tempRange = Math.floor(Math.random() * (40 - 20 + 1) ) + 20;
var temp1 = 0, temp2 = 0, soft = 0, qCount = 0;

// Prompt questions during simulation
//Questions object
var questions = {
	ans1:0,
	options:[],
	nextFunction:function(){},
	// setOptions:function(d1,d2,d3,d4){
		// questions.options = new Array(d1,d2,d3,d4);
	// },
	setOptions:function(d1,d2,d3,d4,d5){
		if(d5 == 0 && d4!=0)
			questions.options = new Array(d1,d2,d3,d4);
		else if(d4 == 0 && d5 == 0)
		{
			questions.options = new Array(d1,d2,d3);
		}
		else 
		{
			questions.options = new Array(d1,d2,d3,d4,d5);
		}
	},
	setAns:function(ans){
		if(simsubscreennum == 8){
			if(soilType == "Fine grained soil")
				questions.ans1 = 3;
			else if(soilType == "Sandy soil")
				questions.ans1 = 2;
		}
		else
		questions.ans1 = ans;
	},
	frameQuestions:function(qun){
		var myDiv  = document.getElementById("question-div");
		var myDiv1 = document.getElementById("divq");
		myDiv.style.visibility = "visible";
		if(simsubscreennum == 8)
			document.getElementById("divq").innerHTML = qun+""+soilType;
		else
			document.getElementById("divq").innerHTML = qun;
		//Create and append select list
		var selectList = document.createElement("select");
		selectList.setAttribute("id", "mySelect");
		selectList.setAttribute("autocomplete", "off");
		// selectList.setAttribute("onchange", "questions.setAnswer()");
		
		var button1 = document.createElement("input");
		button1.setAttribute("onclick","questions.setAnswer(this)");
		button1.setAttribute("type","button");
		button1.setAttribute("value","OK");
		
		// Appending the contents to the division
		myDiv1.appendChild(selectList);
		myDiv1.appendChild(button1);

	//Create and append the options
		for (var i = 0; i < questions.options.length; i++) {
			var opt = document.createElement("option");
			opt.setAttribute("value", questions.options[i]);
			opt.innerHTML = questions.options[i];
			selectList.appendChild(opt);
		}
	},
	setAnswer:function(ev){
		var x = document.getElementById("mySelect");
		var i = x.selectedIndex;
		if(i == 0)
		{
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You have not selected any value";
			document.getElementById("divq").appendChild(dispAns);		
			setTimeout(function(){
				dispAns.innerHTML = "";
			},200);
		}
		else if(i == questions.ans1)
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are right<span class='boldClass'>&#128077;</span> ";
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
		else
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are Wrong<span class='boldClass'>&#128078;</span><br>Answer is: "+x.options[questions.ans1].text;
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
	},
	setCallBack:function(cb){
		nextFunction = cb;
	},
	callNextFunction:function()
	{
		setTimeout(function()
		{
			// document.getElementById("question-div").innerHTML = "";
			document.getElementById("question-div").style.visibility = "hidden";
			nextFunction();
		},800);
	}
}

function checkInputValid(e) {
	e.value = e.value.match(/\d*(\.\d*)?/)[0];
}
function navNext()
{
	for(temp=0;temp<=5;temp++)
	{
		document.getElementById("canvas"+temp).style.visibility="hidden";
	}
	simsubscreennum+=1;
	document.getElementById("canvas"+simsubscreennum).style.visibility="visible";
	document.getElementById("nextButton").style.visibility="hidden";
	magic();
}

//-----------------------------------------blink arrow on the next step---------------------------------------------
//blink arrow on the next step
function animatearrow()
{
     if (document.getElementById('arrow1').style.visibility=="hidden")
         document.getElementById('arrow1').style.visibility="visible";
     else
         document.getElementById('arrow1').style.visibility="hidden";
}


//stop blinking arrow
function myStopFunction() 
{
     clearInterval(myInt);
     document.getElementById('arrow1').style.visibility="hidden";
}

//animate arrow at position
function animateArrowATPosition(left,top,degg)
{
	document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:"+left+"px; top: "+top+"px; height: 30px; z-index: 10;";
	document.getElementById("arrow1").style.WebkitTransform = "rotate("+degg+"deg)"; 
	 // Code for IE9
	document.getElementById("arrow1").style.msTransform = "rotate("+degg+"deg)";
	 // Standard syntax
	document.getElementById("arrow1").style.transform = "rotate("+degg+"deg)";
}

function magic()
{
	if(simsubscreennum==1)
	{
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(300,420,180);
		document.getElementById("can1-1").onclick=function()
		{
			myStopFunction();
			document.getElementById("can1-1").onclick="";
			document.getElementById("can1-1").src = "images/bunsenon.png";
			document.getElementById("can1-2").style.visibility = "visible";
			setTimeout(function()
			{
				myInt = setInterval(function(){ animatearrow(); }, 500);
				animateArrowATPosition(175,315,180);
				document.getElementById("can1-2").onclick=function()
				{
					myStopFunction();
					document.getElementById("can1-2").onclick="";
					document.getElementById("can1-2").style.visibility = "hidden";
					document.getElementById("can1-3").style.visibility = "visible";
					document.getElementById("can1-3").style.animation = "bitMove 1s forwards";
					setTimeout(function()
					{
						document.getElementById("can1-4").style.visibility = "visible";
						document.getElementById("can1-4").style.animation = "thermoMove 0.5s forwards";
						setTimeout(function()
						{
							document.getElementById("can1-4").src = "images/thermocut.png";
							document.getElementById("can1-5").style.visibility = "visible";
							document.getElementById("can1-6").style.visibility = "visible";
							setTimeout(function()
							{
								document.getElementById("can1-6").style.animation = "thermoZoomMove 1s forwards";
								setTimeout(function(){
									var q1 = Object.create(questions);
									generateQuestion(q1,"Pouring temperature of bitumen material is: ","","50&deg;C","27&deg;C","90&deg;C","95&deg;C",3,pourBitumenIntoRing,450,300,250,150);
									// setDialog("Pouring temperature of bituminous material is 90<sup>0</sup>C",480,300,100,220);
								},1100);
							},800);
						},500);
					},1200);
				}
			},500);
		}	
	}
	
	else if(simsubscreennum==2)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can1-8").style.visibility = "hidden";
		document.getElementById("can1-7").style.visibility = "hidden";
		document.getElementById("can1-7a").style.visibility = "hidden";
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(525,395,-90);
		document.getElementById("can2-4").onclick=function()
		{
			myStopFunction();
			document.getElementById("can2-4").onclick="";
			document.getElementById("can2-4").style.visibility ="hidden";
			document.getElementById("can2-4a").style.visibility  ="visible";
			document.getElementById("can2-4a").style.animation = "ring1Move 1s forwards linear";
			setTimeout(function(){
				document.getElementById("can2-4a").style.animation = " ";
				document.getElementById("can2-4a").style.left = "508px";
				document.getElementById("can2-4a").style.visibility = "hidden";
				document.getElementById("can2-6").style.visibility = "visible";
				setTimeout(function(){
					myInt = setInterval(function(){ animatearrow(); }, 500);
					animateArrowATPosition(565,395,-90);
					document.getElementById("can2-5").onclick=function()
					{
						myStopFunction();
						document.getElementById("can2-5").onclick="";
						document.getElementById("can2-5").style.visibility = "hidden"
						document.getElementById("can2-4a").style.visibility = "visible"
						document.getElementById("can2-4a").style.animation = "ring2Move 1s forwards linear";
						setTimeout(function(){
							document.getElementById("can2-4a").style.visibility = "hidden";
							document.getElementById("can2-7").style.visibility = "visible";
							document.getElementById("can2-8").style.visibility = "visible";
							document.getElementById("can2-9").style.visibility = "visible";
							setTimeout(function(){
								myInt = setInterval(function(){ animatearrow(); }, 500);
								animateArrowATPosition(522,400,-90);
								document.getElementById("can2-8").onclick=function()
								{
									myStopFunction();
									document.getElementById("can2-8").onclick="";
									document.getElementById("can2-8").style.visibility = "hidden";
									document.getElementById("can2-8b").style.visibility = "visible";
									document.getElementById("can2-8b").style.animation = "ball1Move 1s forwards linear";
									setTimeout(function(){
										document.getElementById("can2-8").style.visibility = "hidden";
										document.getElementById("can2-2").style.visibility = "hidden";
										document.getElementById("can2-8b").style.animation = " ";
										document.getElementById("can2-8b").style.left = "498px";
										document.getElementById("can2-8b").style.visibility = "hidden";
										document.getElementById("can2-8a").style.visibility = "visible";
										document.getElementById("can2-6").src = "images/tt1.png";
										setTimeout(function(){
											myInt = setInterval(function(){ animatearrow(); }, 500);
											animateArrowATPosition(552,400,-90);
											document.getElementById("can2-9").onclick=function()
											{
												myStopFunction();
												document.getElementById("can2-9").onclick="";
												document.getElementById("can2-9").style.visibility = "hidden";
												document.getElementById("can2-8b").style.visibility = "visible";
												document.getElementById("can2-8b").style.animation = "ball2Move 1s linear";
												setTimeout(function(){
													document.getElementById("can2-8b").style.visibility = "hidden";
													document.getElementById("can2-3").style.visibility = "hidden";
													document.getElementById("can2-9a").style.visibility = "visible";
													document.getElementById("can2-7").src = "images/tt1.png";
													setTimeout(function(){
														document.getElementById("can2-0").style.visibility = "visible";
														document.getElementById("can2-8a").style.visibility = "hidden";
														document.getElementById("can2-9a").style.visibility = "hidden";
														document.getElementById("can2-6").src = "images/tt2.png";
														document.getElementById("can2-7").src = "images/tt2.png";
														myInt = setInterval(function(){ animatearrow(); }, 500);
														animateArrowATPosition(390,395,-90);
														document.getElementById("can2-6").onclick=function()
														{
															myStopFunction();
															document.getElementById("can2-6").onclick="";
															document.getElementById("can2-6").style.visibility = "hidden";
															document.getElementById("can2-10a").style.visibility = "visible";
															document.getElementById("can2-10a").style.animation = "ballRing1Move 1s forwards linear";
															setTimeout(function(){
																document.getElementById("can2-10a").style.animation = " ";
																document.getElementById("can2-10a").style.left = "378px";
																document.getElementById("can2-10a").style.visibility = "hidden";
																document.getElementById("can2-10").style.visibility = "visible";
																document.getElementById("can2-6").style.visibility = "hidden";
																setTimeout(function(){
																	myInt = setInterval(function(){ animatearrow(); }, 500);
																	animateArrowATPosition(442,395,-90);
																	document.getElementById("can2-7").onclick=function()
																	{
																		myStopFunction();
																		document.getElementById("can2-7").onclick="";
																		document.getElementById("can2-7").style.visibility = "hidden";
																		document.getElementById("can2-10a").style.visibility = "visible";
																		document.getElementById("can2-10a").style.animation = "ballRing2Move 1s forwards linear";
																		setTimeout(function(){
																			document.getElementById("can2-10a").style.visibility = "hidden";
																			document.getElementById("can2-11").style.visibility = "visible";
																			document.getElementById("can2-7").style.visibility = "hidden";
																			setTimeout(function(){
																				document.getElementById("can2-1").style.visibility = "hidden";
																				var q2 = Object.create(questions);
																				generateQuestion(q2,"Number of steel balls used is: ","","4","3","1","2",4,screen2Proceed,450,300,200,150);
																				// document.getElementById("nextButton").style.visibility = "visible";
																			},200);
																		},1000);
																	}
																},500);
															},1000);
														}
													},500);
												},1000);
											}
										},500);
									},1000);
								}
							},500);
						},1100);
					}
				},500);
			},1100);
		}
		
	}
	
	else if(simsubscreennum==3)
	{
		document.getElementById("nextButton").style.visibility = "hidden";	
		document.getElementById("can2-0").style.visibility = "hidden";	
		document.getElementById("can2-10").style.visibility = "hidden";	
		document.getElementById("can2-11").style.visibility = "hidden";	
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(550,350,360);
		document.getElementById("can3-1").onclick=function()
		{
			myStopFunction();
			document.getElementById("can3-1").onclick = "";
			document.getElementById("can3-1").style.animation = "bottleMove 0.8s forwards";
			setTimeout(function(){
				document.getElementById("can3-1").src = "images/halfBottle.png";	
				document.getElementById("can3-1").style.visibility = "hidden";	
				document.getElementById("can3-1a").style.visibility = "visible";
				document.getElementById("can3-2a").style.visibility = "visible";
				document.getElementById("can3-1").onclick="";
				document.getElementById("can3-2").style.animation = "waterMove 2s forwards";
				setTimeout(function(){
					document.getElementById("can3-2a").style.visibility = "hidden";
				},1000);
				setTimeout(function()
				{
					document.getElementById("can3-1").style.visibility = "visible";	
					document.getElementById("can3-1a").style.visibility = "hidden";
					setTimeout(function(){
						document.getElementById("can3-1").style.animation = "bottleMove 1s reverse";
						setTimeout(function(){
							document.getElementById("can3-1").style.visibility = "hidden";
							document.getElementById("can3-3").style.visibility = "visible";
							myInt = setInterval(function(){ animatearrow(); }, 500);
							animateArrowATPosition(550,350,360);
							document.getElementById("can3-3").onclick=function()
							{
								myStopFunction();
								document.getElementById("can3-3").onclick = "";
								document.getElementById("can3-3").style.animation = "ringBallApparatusMove 2s forwards linear";
								setTimeout(function(){
									document.getElementById("can3-3").style.visibility = "hidden";
									document.getElementById("can3-3a").style.visibility = "visible";
									document.getElementById("nextButton").style.visibility = "visible";
								},2000);
							}
						},800);
					},500);
				},2000);
			},800);
		}
	}
	else if(simsubscreennum==4)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can3-0").style.visibility = "hidden";
		document.getElementById("can3-3a").style.visibility = "hidden";
		myInt = setInterval(function(){ animatearrow(); }, 500);
		animateArrowATPosition(630,450,360);
		document.getElementById("can4-1").onclick=function()
		{
			myStopFunction();
			document.getElementById("can4-1").onclick = "";
			document.getElementById("can4-1").style.animation = "waterBeakerMove 1s forwards linear";
			setTimeout(function(){
				document.getElementById("can4-1").style.visibility = "hidden";
				document.getElementById("can4-2").style.visibility = "visible";
				document.getElementById("can4-3").style.visibility = "visible";
				document.getElementById("can4-4").style.visibility = "visible";
				setTimeout(function(){
					document.getElementById("can4-5").style.visibility = "visible";
					myInt = setInterval(function(){ animatearrow(); }, 500);
					animateArrowATPosition(630,450,360);
					document.getElementById("can4-5").onclick=function(){
						myStopFunction();
						document.getElementById("can4-5").onclick = "";
						document.getElementById("can4-5").style.visibility = "hidden";
						setTimeout(function(){
							document.getElementById("can4-5b").style.visibility = "visible";
							document.getElementById("can4-5b").style.animation = "capMove 3.5s forwards linear";
							setTimeout(function(){
								document.getElementById("can4-5b").style.visibility = "hidden";
								document.getElementById("can4-4").style.visibility = "hidden";
								document.getElementById("can4-5a").style.visibility = "visible";
								document.getElementById("can4-4a").style.visibility = "visible";
								myInt = setInterval(function(){ animatearrow(); }, 500);
								animateArrowATPosition(280,280,360);
								document.getElementById("can4-5a").onclick=function(){
									myStopFunction();
									document.getElementById("can4-5a").onclick = "";
									document.getElementById("can4-5a").src = "images/cap.png";
									document.getElementById("can4-4a").src = "images/r1.png";
									document.getElementById("can4-7a").style.visibility = "visible";
									document.getElementById("can4-7b").style.visibility = "visible";
									document.getElementById("can4-8a").style.visibility = "visible";
									document.getElementById("can4-8b").style.visibility = "visible";
									setTimeout(function(){
										document.getElementById("can4-6b").style.visibility = "visible";
										myInt = setInterval(function(){ animatearrow(); }, 500);
										animateArrowATPosition(520,450,360);
										document.getElementById("can4-6b").onclick=function(){
											myStopFunction();
											document.getElementById("can4-6b").onclick = "";
											document.getElementById("can4-6b").style.visibility = "hidden";
											setTimeout(function(){
											document.getElementById("can4-6c").style.visibility = "visible";
											document.getElementById("can4-6c").style.animation = "bitThermoMove 3.5s forwards linear";
											setTimeout(function(){
												document.getElementById("can4-6c").style.visibility = "hidden";
												document.getElementById("can4-6").style.visibility = "visible";
												document.getElementById("can4-6a").style.visibility = "visible";
												document.getElementById("can4-6d").style.visibility = "visible";
												document.getElementById("nextButton").style.visibility = "visible";
											},3500);
											},20);
										}
									},50);
								}
							},3600);
						},50);
					}
				},500);
			},1000);
		}
	}
	else if(simsubscreennum == 5)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can4-0").style.visibility = "hidden";
		document.getElementById("can4-4a").style.visibility = "hidden";
		document.getElementById("can4-5a").style.visibility = "hidden";
		document.getElementById("can4-7a").style.visibility = "hidden";
		document.getElementById("can4-7b").style.visibility = "hidden";
		document.getElementById("can4-8a").style.visibility = "hidden";
		document.getElementById("can4-8b").style.visibility = "hidden";
		document.getElementById("can4-6a").style.visibility = "hidden";
		document.getElementById("can4-6d").style.visibility = "hidden";
		document.getElementById("can4-2").style.visibility = "hidden";
		document.getElementById("can4-3").style.visibility = "hidden";
		document.getElementById("can4-6").style.visibility = "hidden";
		var q3 = Object.create(questions);
		generateQuestion(q3,"Initial temperature maintained should be: ","","2&deg;C","4&deg;C","5&deg;C","6&deg;C",3,screen5Proceed,450,250,200,150);
		
	}
	else if(simsubscreennum == 6)
	{
		document.getElementById("nextButton").style.visibility = "hidden";
		document.getElementById("can5-0").style.visibility = "hidden";
		document.getElementById("can5-6").style.visibility = "hidden";
		document.getElementById("can5-4a").style.visibility = "hidden";
		document.getElementById("can5-5a").style.visibility = "hidden";
		document.getElementById("res").style.visibility = "hidden";
		document.getElementById("can5-10a").style.visibility = "hidden";
		document.getElementById("can5-10b").style.visibility = "hidden";
		document.getElementById("can5-8a").style.visibility = "hidden";
		document.getElementById("can5-8b").style.visibility = "hidden";
		document.getElementById("can5-6a").style.visibility = "hidden";
		document.getElementById("can5-6d").style.visibility = "hidden";
		document.getElementById("can5-3").style.visibility = "hidden";
		document.getElementById("can5-2").style.visibility = "hidden";
		document.getElementById("can5-0a").style.visibility = "hidden";
		document.getElementById("can5-0b").style.visibility = "hidden";
		document.getElementById("can5-0b").style.visibility = "hidden";
		document.getElementById("can5-0b").style.visibility = "hidden";
		setTimeout(function(){
			document.getElementById("rs1").innerHTML = temp1+"&deg;C";
			document.getElementById("rs2").innerHTML = temp2+"&deg;C";
			// document.getElementById("rs3").innerHTML = ((temp1+temp2)/2)+"&deg;C";
			// document.getElementById("rs4").innerHTML = ((temp1+temp2)/2)+"&deg;C";
			soft = ((temp1+temp2)/2);
			var avg = document.getElementById("rs3");
			
			var inputVal = document.createElement("input");
		var checkVal = document.createElement("input");
		var rightVal = document.createElement("span");
		inputVal.setAttribute("type","text");
		inputVal.setAttribute("id","res1");
		inputVal.setAttribute("oninput","checkInputValid(this)");
		rightVal.setAttribute("id","rightAns");
		inputVal.classList.add("inputStyle");
		checkVal.setAttribute("type","button");
		checkVal.setAttribute("id","chk");
		checkVal.setAttribute("cursor","pointer");
		checkVal.setAttribute("onclick","checkResult();");
		checkVal.setAttribute("value","CHECK");
		avg.appendChild(inputVal);
		avg.appendChild(rightVal);
		avg.appendChild(checkVal);
			
		},500);
		
		
	}
	
}

function pourBitumenIntoRing()
{
	for(var k = 4; k<=6; k++){
		document.getElementById("can1-"+k).style.visibility = "hidden";
	}
	myInt = setInterval(function(){ animatearrow(); }, 500);
	animateArrowATPosition(300,420,180);
	document.getElementById("can1-1").onclick=function()
	{
		myStopFunction();
		document.getElementById("can1-1").onclick="";
		setTimeout(function()
		{
			document.getElementById("can1-1").style.visibility = "hidden";
			document.getElementById("can1-2").style.visibility = "hidden";
			setTimeout(function()
			{
				document.getElementById("can1-3").style.visibility = "hidden";
				document.getElementById("can1-11").style.visibility = "visible";
				document.getElementById("can1-7").style.visibility = "visible";
				document.getElementById("can1-7a").style.visibility = "visible";
				document.getElementById("can1-8").style.visibility = "visible";
				document.getElementById("v1-1").style.visibility = "visible";
				myInt = setInterval(function(){ animatearrow(); }, 500);
				animateArrowATPosition(380,180,-90);
				document.getElementById("can1-11").onclick=function()
				{
					myStopFunction();
					document.getElementById("can1-11").onclick="";
					document.getElementById("v1-1").style.visibility = "hidden";
					document.getElementById("can1-11").style.animation = "pourBitMove 1.2s forwards";
					setTimeout(function(){
							document.getElementById("can1-11").style.visibility = "hidden";
							document.getElementById("can1-12").style.visibility = "visible";
							setTimeout(function(){
								document.getElementById("can1-7").src = "images/mld4.png";
								document.getElementById("can1-12").style.visibility = "hidden";
								document.getElementById("can1-11").style.visibility = "visible";
								document.getElementById("can1-11").style.top = "180px";
								document.getElementById("can1-11").style.left = "180px";
								document.getElementById("can1-12").style.left = "230px";
								document.getElementById("can1-12").style.top = "180px";
								document.getElementById("can1-11").style.animation = "pourBitSideMove 1.5s forwards";
								setTimeout(function(){
									document.getElementById("can1-7a").src = "images/mld4.png";
									document.getElementById("can1-12").style.visibility = "visible";
									document.getElementById("can1-11").style.visibility = "hidden";
									setTimeout(function(){
										document.getElementById("can1-12").style.visibility = "hidden";
										screensVal = 1;
										setDialog("After cooling for 30 minutes in air, If required level the material in the ring by removing the excess material with a warmed, sharp knife.",420,300,120,340);
									},800);
								},1600);
							},500);
						},1300);
					}
			},800);
		},500);
	}
}
function screen2Proceed()
{
	document.getElementById("nextButton").style.visibility = "visible";
}
function screen5Proceed()
{
	screensVal = 2;
	setDialog("Note the temperature when any of the bitumen touches the bottom plate.",420,250,120,340);
}
function applyHeatAndStir()
{
	
	myInt = setInterval(function(){ animatearrow(); }, 500);
	animateArrowATPosition(340,230,-90);
	document.getElementById("can5-0a").onclick=function()
	{
		myStopFunction();
		document.getElementById("can5-0a").onclick="";
		document.getElementById("can5-0a").src = "images/switch1a.png";
		setTimeout(function(){
			myInt = setInterval(function(){ animatearrow(); }, 500);
			animateArrowATPosition(105,490,180);
			document.getElementById("can5-0b").onclick=function()
			{
				myStopFunction();
				document.getElementById("can5-0b").onclick="";
				document.getElementById("can5-0b").src = "images/switch2a.png";
				document.getElementById("can5-9a").style.visibility = "visible";
				document.getElementById("can5-9b").style.visibility = "visible";
				document.getElementById("can5-11a").style.visibility = "visible";
				myInt = setInterval(function(){ animatearrow(); }, 500);
				animateArrowATPosition(255,460,-90);
				document.getElementById("can5-11a").onclick=function()
				{
					myStopFunction();
					document.getElementById("can5-11a").onclick="";
					document.getElementById("can5-11a").style.visibility = "hidden";
					document.getElementById("can5-11b").style.visibility = "visible";
					document.getElementById("v5-1").style.visibility = "visible";
					document.getElementById("v5-2").style.visibility = "visible";
					document.getElementById("res").style.visibility = "visible";
					setTimeout(function(){
						document.getElementById("can5-11b").style.visibility = "hidden";
						document.getElementById("can5-12a").style.visibility = "visible";
						myInt = setInterval(function(){ animatearrow(); }, 500);
						animateArrowATPosition(300,460,-90);
						document.getElementById("can5-12a").onclick=function()
						{
							myStopFunction();
							document.getElementById("can5-12a").onclick="";
							document.getElementById("can5-12a").style.visibility = "hidden";
							document.getElementById("can5-12b").style.visibility = "visible";
							setTimeout(function()
							{
								updateTemperature();
								document.getElementById("can5-12b").style.visibility = "hidden";
							},500);
						}
					},500);
				}		
			}
		},100);
	}
}
function bubbleEffect()
{
	var posLeft=Math.floor(Math.random() * (180 - 75 + 1) ) + 75;
	var posTop=Math.floor(Math.random() * (360 - 250 + 1) ) + 250;
  	var bbl = document.createElement("img");
	bbl.setAttribute("src", "images/buble.png");
	bbl.setAttribute("id", "bubble");
	bbl.style = "position:absolute;left:"+posLeft+"px;top:"+posTop+"px";
	document.getElementById("canvas5").appendChild(bbl);
	bbl.style.animation = "bubbleMove 3s forwards linear";
	// setTimeout(function()
	// {
		// clearInterval(bubbleInt);
		// bbl.style.visibility = "hidden";
	// },3100);
}

//Timer temperature
function updateTemperature()
{
	if(minute<100)
	{
		setTimeout(function(){
			dispMin();
		},100);
	}
}
function dispMin()
{
	if(minute<=9)
		document.getElementById("v5-1").innerHTML = "0"+minute+".";
	else
		document.getElementById("v5-1").innerHTML = minute+".";
	if(sec <= 5)
	{
		setTimeout(function(){
			dispSec();
		},100);
	}
}
function dispSec()
{
	document.getElementById("v5-2").innerHTML = sec+"0&deg;C";
	if(sec == 5){
		minute++;
		sec = 0;
		setTimeout(function(){
			updateTemperature();
			// if(minute == 50)
			// {
				// clearInterval(bubbleInt);
			// }
			if(minute == 20)
			{
				bubbleInt = setInterval(function(){ bubbleEffect(); }, 200)	
			}
			if(minute == (tempRange-10) )
			{
				document.getElementById("can5-7a").style.animation = "ballStretch 4s forwards linear";
				setTimeout(function(){
					document.getElementById("can5-7a").style.visibility = "hidden";
					document.getElementById("can5-10a").style.animation = "bitStretch 5.5s forwards linear";
					setTimeout(function(){
						document.getElementById("v5-3").innerHTML = "Temperature at which the ball 1 drops = "+minute+"&deg;C";
						document.getElementById("v5-1").style.color = "red";
						document.getElementById("v5-2").style.color = "red";
						temp1 = minute;
					},5500);
				},3600);
			}
			if(minute == ((tempRange+1)-10))
			{
				document.getElementById("can5-7b").style.animation = "ballStretch 4s forwards linear";
				setTimeout(function(){
					document.getElementById("can5-7b").style.visibility = "hidden";
					document.getElementById("can5-10b").style.animation = "bitStretch 5.5s forwards linear";
					setTimeout(function(){
						document.getElementById("v5-4").innerHTML = "Temperature at which the ball 2 drops = "+minute+"&deg;C";
						temp2 = minute;
						document.getElementById("can5-10b").style.animation = "";
						document.getElementById("can5-10b").style.transformOrigin = "";
						document.getElementById("can5-10b").style = "position:absolute;left:145px; top:305px;width:25px;height:35px;"
						document.getElementById("can5-10b").style.animation = "bitStretch2 2.5s forwards linear";
						setTimeout(function(){
							document.getElementById("can5-10b").style = "position:absolute;left:145px;top:322px;width:28px;height:20px;"
							document.getElementById("v5-1").style.color = "white";
							document.getElementById("v5-2").style.color = "white";
							clearInterval(bubbleInt);
							document.getElementById("bubble").style.visibility = "hidden";
							turnOffMachine();
						},1000);
					},5600);
				},3600);
			}
		},50);
	}
	else if(sec < 5)
	{
		sec += 5
		setTimeout(function(){
			dispSec();
		},100);
	}
}
function turnOffMachine()
{
	myInt = setInterval(function(){ animatearrow(); }, 500);
	animateArrowATPosition(105,490,180);
	document.getElementById("can5-0b").onclick=function()
	{
		myStopFunction();
		document.getElementById("can5-0b").onclick="";
		document.getElementById("can5-0b").src = "images/switch2.png";
		document.getElementById("v5-1").style.visibility = "hidden";
		document.getElementById("v5-2").style.visibility = "hidden";		
		document.getElementById("can5-9a").style.visibility = "hidden";		
		document.getElementById("can5-9b").style.visibility = "hidden";	
		clearInterval(bubbleInt);
		setTimeout(function(){
			myInt = setInterval(function(){ animatearrow(); }, 500);
			animateArrowATPosition(340,230,-90);
			document.getElementById("can5-0a").onclick=function()
			{
				myStopFunction();
				document.getElementById("can5-0a").onclick="";
				document.getElementById("can5-0a").src = "images/switch1.png";
				document.getElementById("nextButton").style.visibility = "visible";	
			}
		},100);
	}
		
}
function checkResult()
{
	var idd = document.getElementById("res1");
	var idd1 = document.getElementById("chk");
	var ansId = document.getElementById("rightAns");
		// console.log(idd.value);

	// document.getElementById("alertId").style.visibility = "hidden";
	// document.getElementById("alertId").style.animation = "";
	if(!idd.value  || !idd.value!=" ")
	{
		// document.getElementById("alertId").style.visibility = "visible";
		// document.getElementById("alertId").style.animation = "blink_effect 1s infinite";
	}
	else if(Math.round(idd.value) != Math.round(soft))
	{
		// console.log(2);
		qCount++;
		// blinkStop();
		idd.style.borderColor = "red";
		ansId.style.color = "red";
		ansId.innerHTML= "&#10008;";
		ansId.classList.remove("resultStyle");
		if(qCount == 2)
		{
			idd1.value = "RESULT";
		}
		if(qCount == 3)
		{
			idd1.style.visibility = "hidden";
			idd.parentNode.removeChild(idd);
			ansId.classList.add("resultStyle");
			ansId.style.color = "black";
			ansId.innerHTML= soft+"&deg;C";
			document.getElementById("rs4").innerHTML= "<strong>Softening point of bitumen = </strong>"+ soft+"&deg;C";
			var q4 = Object.create(questions);																								
			generateQuestion(q4,"Bitumen sample with this softening point is suitable to be used in:","","Shimla","Rajasthan","Shimla & Karnataka","All of the above",2,finalStatement,300,350,300,200);
		}
	}
	else
	{
		idd1.style.visibility = "hidden";
		idd.parentNode.removeChild(idd);
		ansId.classList.add("resultStyle");
		ansId.style.color = "black";
		ansId.innerHTML= soft+"&deg;C"+"<span style='color:green;font-size:20px;'>&#10004;</span>";
			document.getElementById("rs4").innerHTML= "<strong>Softening point of bitumen = </strong>"+ soft+"&deg;C";
		var q4 = Object.create(questions);																								
			generateQuestion(q4,"Bitumen sample with this softening point is suitable to be used in:","","Shimla","Rajasthan","Shimla & Karnataka","All of the above",2,finalStatement,300,350,300,200);
	}
}
function generateQuestion(qObject,qn,op1,op2,op3,op4,op5,ansKey,fn,dleft,dright,dwidth,dheight)
{
	document.getElementById('question-div').style.left=dleft+"px";											
	document.getElementById('question-div').style.top=dright+"px";												
	document.getElementById('question-div').style.width=dwidth+"px";
	document.getElementById('question-div').style.height=dheight+"px";
	qObject.setOptions(op1,op2,op3,op4,op5);
	qObject.setAns(ansKey);
	qObject.frameQuestions(qn);	
	qObject.setCallBack(fn);	
}
function finalStatement()
{
	document.getElementById("hintspan").style.visibility = "hidden";
	document.getElementById("p8-1").style.visibility = "visible";
	document.getElementById("p8-1").style.animation  ="slidePara 2s forwards";
}

function setDialog(textContent,leftPos,topPos,heightVal,widthVal)
{
	document.getElementById("divp").innerHTML = textContent;
	document.getElementById('dialog-div').style.left=leftPos+"px";											
	document.getElementById('dialog-div').style.top=topPos+"px";												
	// document.getElementById('dialog-div').style.height=heightVal+"px";
	// document.getElementById('dialog-div').style.width=widthVal+"px";
	document.getElementById('dialog-div').style.visibility="visible";											
}
function hideDialog()
{
	document.getElementById("dialog-div").style.visibility = "hidden";
	if(simsubscreennum == 1 && screensVal == 0)
	{
		pourBitumenIntoRing();
	}
	else if(simsubscreennum == 1 && screensVal == 1)
	{
		document.getElementById("nextButton").style.visibility = "visible";
	}
	else if(simsubscreennum == 5 && screensVal == 2)
	{
		applyHeatAndStir()
	}
}
	
function setTopLeft(divid,leftPos,topPos,imgsrc)
{
	document.getElementById(divid).src = imgsrc;
	document.getElementById(divid).style.top = topPos+"px";
	document.getElementById(divid).style.left = leftPos+"px";
}
