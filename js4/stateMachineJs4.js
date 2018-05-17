$(function(){
	fsm = new StateMachine({
		init: "initial",
		transitions:[
			{name:"step1",from:"initial",to:"kill"},
			{name:"step2",from:"kill",to:"deadwords"},
			{name:"step3",from:"deadwords",to:"playerwords"},
			{name:"step4",from:"playerwords",to:"initial"}
		],
		methods:{
//			onStep1:function() { console.log('I melted') },
		}
	});
	
	//=杀手杀人
	var prevTxt = decodeURI(document.referrer).split("js4/")[1].split(".html")[0];
	console.log(prevTxt);

	if(prevTxt == "杀手杀人"){
		fsm.step1();
	}

})
