// ==UserScript==
// @name        FastConnect
// @description Connection rapide sur JVC
// @include     http://www.jeuxvideo.com/*
// @include     http://*.forumjv.com/*
// @exclude     http://www.jeuxvideo.com/jvchat*
// @version     1.0.3
// ==/UserScript==

function start()
{
	firstlaunch();
	addNewTab();
	loadGraphicInterface();
	loadNicknames();
};

function firstlaunch()
{
	if(localStorage["firstLaunch"] != "1")
	{
		localStorage["nick"] = "";
		localStorage["pass"] = "";
		localStorage["firstLaunch"] = "1";
	}
};

function addNewTab()
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

function loadGraphicInterface()
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
	divSubmitButton.addEventListener("click", function(){fastConnect();}, false);

	var spanSubmitButton = document.createElement("span");
	spanSubmitButton.className = "valid";
	spanSubmitButton.innerHTML = "Valider";

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

function openGraphicInterface()
{
	document.getElementById("box_blackbackground").style.display = "block";
	document.getElementById("box_fastconnect").style.display = "block";
};

function closeGraphicInterface()
{
	document.getElementById("box_blackbackground").style.display = "none";
	document.getElementById("box_fastconnect").style.display = "none";
};

function addNicknames()
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

function loadNicknames()
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

function deleteNicknames()
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

function fastConnect()
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

start();