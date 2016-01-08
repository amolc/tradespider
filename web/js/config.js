var instance = "local";

if (instance == "dev"){
	var baseURL="http://188.166.216.245:5555/api/";
	var socketUrl = 'http://188.166.216.245:5555';
}else if(instance == "local"){
	var baseURL="http://localhost:5555/api/";
	var socketUrl = 'http://localhost:5555';
}
