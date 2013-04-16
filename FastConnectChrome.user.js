// ==UserScript==
// @name        FastConnect
// @description FastConnect to your JVC Account.
// @include     http://www.jeuxvideo.com/*
// @include     http://*.forumjv.com/*
// @exclude     http://www.jeuxvideo.com/jvchat*
// @run-at      document-end
// @version     2.1.0
// ==/UserScript==

//Insert a function in the head of a webpage.
function insertHead(name, scriptFunction)
{
	var script = document.createElement("script");
	script.id = name;
	script.type = "text/javascript";
	if (name == "init")
	{
		script.innerHTML = "(" + scriptFunction + ")();";
	}
	else
	{
		script.innerHTML = scriptFunction;
	}
	document.head.appendChild(script);
	console.log("Function " + name + " has been registered.");
};

var init = function init()
{
	firstLaunch();
	addNewTab();
	loadGraphicInterface();
	loadNicknames();
};

var firstLaunch = function firstLaunch()
{
	if(localStorage["firstLaunch"] != "1")
	{
		localStorage["nick"] = "";
		localStorage["pass"] = "";
		localStorage["firstLaunch"] = "1";
	}
};

var addNewTab = function addNewTab()
{
	//Get divConnect
	var divConnect = document.getElementById("connexion");
	//Get After
	var divAfter = document.getElementById("compte");
	//Create divFastConnect
	var divFastConnect = document.createElement("div");
	divFastConnect.innerHTML = '<a href="#" id="modala">Mes comptes</a>';
	//Add divFastConnect
	divConnect.insertBefore(divFastConnect, divAfter);
	divFastConnect.addEventListener("click", function(){openGraphicInterface();}, false);
};

var loadGraphicInterface = function loadGraphicInterface()
{
	//div Black Background
	var divBackground = document.createElement("div");
	divBackground.className = "modal_generic modal_generic_overflow";
	divBackground.id = "box_blackbackground";
	divBackground.style.display = "none"
	document.body.appendChild(divBackground);

	//div Fast Connect
	var divFastConnect = document.createElement("div");
	divFastConnect.className = "modal_generic";
	divFastConnect.id = "box_fastconnect";
	divFastConnect.style.display = "none";

	var divFastConnectBlock = document.createElement("div");
	divFastConnectBlock.className = "modal_generic_main";
	divFastConnectBlock.style.marginTop = "20%";

	var aFastConnectBlockClose = document.createElement("a");
	aFastConnectBlockClose.className = "modal_generic_close fermer";
	aFastConnectBlockClose.href = "#";
	aFastConnectBlockClose.addEventListener("click", function(){closeGraphicInterface();}, false);

	var divFastConnectBlockTitle = document.createElement("div");
	divFastConnectBlockTitle.className = "modal_generic_header";
	divFastConnectBlockTitle.innerHTML = 'Mes Comptes';

	var divFastConnectBlockContent = document.createElement("div");
	divFastConnectBlockContent.className = "modal_generic_content";

	var formFastConnectBlock = document.createElement("div");
	formFastConnectBlock.className = "generic_form";
	formFastConnectBlock.method = "post";

	var fieldsetFormFastConnectBlock = document.createElement("fieldset");

	var divAccountName = document.createElement("div");
	divAccountName.className = "pseudo_gb_connect";

	var labelAccountName = document.createElement("label");
	labelAccountName.for = "pseudo_gb_connect";

	var spanAccountName = document.createElement("span");
	spanAccountName.className = "requis";
	spanAccountName.innerHTML = "*";

	var strongAccountName = document.createElement("strong");
	strongAccountName.innerHTML = " Pseudo :&nbsp;";

	var selectAccountName = document.createElement("select");
	selectAccountName.id = "pseudo_gb_connect_fast";
	selectAccountName.name = "pseudo_gb_connect";
	selectAccountName.style.width = "150px";

	var spanSpace = document.createElement("span");
	spanSpace.innerHTML = "&nbsp;";
	
	var spanSpace2 = document.createElement("span");
	spanSpace2.innerHTML = "&nbsp;";


	var aAccountName = document.createElement("a");
	aAccountName.target = "_top";
	aAccountName.rel = "nofollow";
	aAccountName.className = "small formlink";
	aAccountName.href = "#";
	aAccountName.innerHTML = "Ajouter un pseudonyme ?";
	aAccountName.addEventListener("click", function(){addNicknames();}, false);
	
	var imgDeleteNick = document.createElement("img");
	imgDeleteNick.src = "http://image.jeuxvideo.com/pics/forums/bt_forum_avertirmod.gif"
	imgDeleteNick.alt = "Supprimer ce pseudonyme";
	imgDeleteNick.addEventListener("click", function(){deleteNicknames();}, false);

	var divFormButtons = document.createElement("div");
	divFormButtons.className = "form_boutons";

	var divSubmitButton = document.createElement("button");
	divSubmitButton.className = "bt_ok";

	var spanSubmitButton = document.createElement("span");
	spanSubmitButton.className = "valid";
	spanSubmitButton.innerHTML = "Valider";
	spanSubmitButton.addEventListener("click", function(){fastConnect();}, false);

	divFastConnect.appendChild(divFastConnectBlock);
	divFastConnectBlock.appendChild(aFastConnectBlockClose);
	divFastConnectBlock.appendChild(divFastConnectBlockTitle);
	divFastConnectBlock.appendChild(divFastConnectBlockContent);
	divFastConnectBlockContent.appendChild(formFastConnectBlock);
	formFastConnectBlock.appendChild(fieldsetFormFastConnectBlock);
	fieldsetFormFastConnectBlock.appendChild(divAccountName);
	divAccountName.appendChild(labelAccountName);
	divAccountName.appendChild(selectAccountName);
	divAccountName.appendChild(spanSpace);
	divAccountName.appendChild(aAccountName);
	divAccountName.appendChild(spanSpace2);
	divAccountName.appendChild(imgDeleteNick);
	fieldsetFormFastConnectBlock.appendChild(divFormButtons);
	divFormButtons.appendChild(divSubmitButton);
	divSubmitButton.appendChild(spanSubmitButton);
	labelAccountName.appendChild(spanAccountName);
	labelAccountName.appendChild(strongAccountName);

	document.body.appendChild(divFastConnect);
};

var openGraphicInterface = function openGraphicInterface()
{
	document.getElementById("box_blackbackground").style.display = "block";
	document.getElementById("box_fastconnect").style.display = "block";
};

var closeGraphicInterface = function closeGraphicInterface()
{
	document.getElementById("box_blackbackground").style.display = "none";
	document.getElementById("box_fastconnect").style.display = "none";
};

var addNicknames = function addNicknames()
{
	var nick = prompt("Entrer un pseudonyme: ","");
	var pass = prompt("Entrer un mot de passe: ");
	var nick = nick.slice(0,15);
	var pass = pass.slice(0,12);
	var nickArray = localStorage["nick"].split(",");
	var passArray = localStorage["pass"].split(",");
	if(localStorage["nick"].split(",").length - 1 == 0)
	{
		nick = nick + ",";
		pass = pass + ",";
	}
	nickArray[localStorage["nick"].split(",").length] = nick;
	passArray[localStorage["pass"].split(",").length] = pass;
	localStorage["nick"] = nickArray;
	localStorage["pass"] = passArray;
	loadNicknames();	
};

var loadNicknames = function loadNicknames()
{
	var nickArray = localStorage["nick"].split(",");
	document.getElementById("pseudo_gb_connect_fast").innerHTML = "";
	for(var i = 0 ; i < nickArray.length ; i++)
	{
		if(nickArray[i] == ""){continue;}
		else
		{
			var optionAccountName = document.createElement("option");
			optionAccountName.value = i;
			optionAccountName.innerHTML = nickArray[i];
			document.getElementById("pseudo_gb_connect_fast").appendChild(optionAccountName);
		}
	}
};

var deleteNicknames = function deleteNicknames()
{
	function unset(array, valueOrIndex)
	{
	var output=[];
	for(var i in array){
		if (i!=valueOrIndex)
			output[i]=array[i];
	}
	return output;
	};
	var nickArray = localStorage["nick"].split(",");
	var passArray = localStorage["pass"].split(",");
	nickArray = unset(nickArray, document.getElementById("pseudo_gb_connect_fast").value);
	passArray = unset(passArray, document.getElementById("pseudo_gb_connect_fast").value);
	localStorage["nick"] = nickArray;
	localStorage["pass"] = passArray;
	loadNicknames();
};

var fastConnect = function fastConnect()
{
	var url = "http://www.jeuxvideo.com/profil/ajax_connect.php";
	var nickArray = localStorage["nick"].split(",");
	var passArray = localStorage["pass"].split(",");
	var pseudo = nickArray[document.getElementById("pseudo_gb_connect_fast").value];
	var pass = passArray[document.getElementById("pseudo_gb_connect_fast").value];
	var data = "pseudo=" + pseudo + "&pass=" + pass + "&retenir=1"
	jQuery.ajax(
	{
		type: "POST",
		url: url,
		data: data,
		success: function(contents){
			location.reload();
			//console.log(contents);
		}
	});
}

//FastConnect Initialization
insertHead("firstLaunch", firstLaunch)
insertHead("addNewTab", addNewTab);
insertHead("loadGraphicInterface", loadGraphicInterface);
insertHead("openGraphicInterface", openGraphicInterface);
insertHead("closeGraphicInterface", closeGraphicInterface);
insertHead("addNicknames", addNicknames);
insertHead("loadNicknames", loadNicknames);
insertHead("deleteNicknames", deleteNicknames);
insertHead("fastConnect", fastConnect);
insertHead("init", init);