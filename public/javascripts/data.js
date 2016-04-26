function getData() {
	var iframe = document.getElementById('proxy');
	var data = iframe.contentWindow.name;
	alert(data);
}