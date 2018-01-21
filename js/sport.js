function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr];
}
function sport(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		let stop = true;
		for(let attr in json){
			let cur = 0;
			if(attr == "opacity"){
				cur = parseInt(parseFloat(getStyle(obj,attr)) * 100);
			}else{
				cur = parseInt(getStyle(obj,attr));
			}
			let speed = (json[attr] - cur) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(cur != json[attr]){
				stop = false;
			}
			if(attr == "opacity"){
				obj.style.opacity = (cur + speed) / 100;
				obj.style.filter = "alpha(opacity=" + (cur + speed) + ")";
			}else{
				obj.style[attr] = cur + speed + "px";
			}
		}
		if(stop){
			clearInterval(obj.timer);
			if(typeof fn == "function"){
				fn();
			}
		}
	},30);
}
