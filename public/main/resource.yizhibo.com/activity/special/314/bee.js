(function(){if(window.yxbee&&window.yxbee.timer){return}var c=(window.yxbee&&window.yxbee.params)||{};var b={sampling:c.sampling||100,key:c.key||"yzb",uploadURL:c.uploadURL||"//letsgo.e.weibo.com/stracker/fe/report"};var a={jsonToQuery:function(e){var f="";if(!e){return f}for(var d in e){if(typeof e[d]==="object"){e[d]=(Array.isArray(e[d]))?e[d].join():JSON.stringify(e[d])}f+=d+"="+e[d]+"&"}return f.replace(/&$/,"")},queryToJson:function(e){var d={};if(!e){return d}e.split("&").forEach(function(g){var f=g.split("=");if(f.length<2){f[1]=null}if(d[f[0]]){if(!Array.isArray(d[f[0]])){d[f[0]]=[d[f[0]]]}d[f[0]].push(f[1])}else{d[f[0]]=f[1]}});return d},getUrl:function(e){var d=b.uploadURL+"?"+a.jsonToQuery(e);var f=location.search.substr(1);if(f){var g=a.queryToJson(f);delete g.secdata;d+="&"+a.jsonToQuery(g)}return d},send:function(e){var d=new Image(1,1);d.onload=d.onerror=d.onabort=function(){d.onload=d.onerror=d.onabort=null;d=null};d.src=e},sendData:function(e){if(b.sampling<100){if(parseInt(Math.random()*100)>parseInt(b.sampling)){return}}var d=a.getUrl(e);a.send(d)},timer:function(){var f=window.performance||window.msPerformance||window.webkitPerformance||window.mozPerformance;var e=f&&f.timing;if(!e){a.sendData({pv:1,key:b.key});return}a.navigationStart=e.navigationStart||e.fetchStart||undefined;if(a.navigationStart&&!e.loadEventEnd){setTimeout(function(){a.timer()},500);return}var d={i_s_fetch:e.responseStart-a.navigationStart,i_s_render:e.domContentLoadedEventEnd-a.navigationStart,is_loaded:e.loadEventEnd-a.navigationStart,key:b.key,pv:1};a.getFrame(d)},err:function(f){var g={err:1,key:b.key,filename:f.filename+" line:"+f.lineno+"col"+f.colno,error:f.error,srcElement:f.srcElement.tagName};a.sendData(g)},frame:function(e){if(Date.now()-a.frameStime>1000){var f=e;f.frame=a.frameNo-1;a.sendData(f);return}a.frameNo++;return requestAnimationFrame(function(){a.frame(e)})},getFrame:function(d){a.frameStime=Date.now();a.frameNo=0;a.frame(d)},click:function(){},bind:function(){window.addEventListener("error",a.err);a.timer()},init:function(){if(/(dev|test|chk)/.test(document.location.hostname)){return}a.bind();a.click()}};a.init();window.yxbee=a})();