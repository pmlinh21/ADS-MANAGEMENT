function render(){
	var inp = document.getElementById("box");
	var data = `
<svg xmlns="http://www.w3.org/2000/svg" width="${inp.offsetWidth}" height="${inp.offsetHeight}">
<foreignObject width="100%" height="100%">
<div xmlns="http://www.w3.org/1999/xhtml" 
style="font-family: sans-serif;
font-weight: 500;
color: #7E94AB; font-size: 16px;">
${inp.value}
</div>
</foreignObject>
</svg>`;
	var blob = new Blob( [data], {type:'image/svg+xml'} );
	var url=URL.createObjectURL(blob);
	inp.style.backgroundImage="url("+URL.createObjectURL(blob)+")";
}
onload=function(){
  render();
  ro = new ResizeObserver(render);
	ro.observe(document.getElementById("box"));
}