(function(m){var h=window.AmazonUIPageJS||window.P,p=h._namespace||h.attributeErrors,f=p?p("DetailPageLazyLoadLibAssets"):h;f.guardFatal?f.guardFatal(m)(f,window):f.execute(function(){m(f,window)})})(function(m,h,p){function f(a,b,d){h.clientLogger&&(d.ap=a,d.ac=b)}function a(a){(function(a){function c(d){a(d.elem).find(".loading_ind").show();d.metrics&&(d.ajaxStart=new Date,a(d.elem).find(".loading_ind:first").fromScreenBottom(function(){d.loadBarTime=new Date},0));try{a.ajax({url:d.url,type:"GET",
timeout:d.timeout,retryLimit:d.retry,tryCount:0,cache:d.cache,success:function(c,e,g){a(d.elem).html(c);d.metrics&&(c=(new Date).getTime(),f("lazyload",d.name,{at:c-d.ajaxStart.getTime(),s:!0,tc:this.tryCount,tt:d.type,lt:d.loadBarTime?c-d.loadBarTime.getTime():0}))},error:function(c,e){this.tryCount++;if(this.tryCount<this.retryLimit)a.ajax(this);else if(a(d.elem).find(".loading_ind").hide(),a(d.elem).find(".failed_load").show(),d.metrics){var g=(new Date).getTime();f("lazyload",d.name,{at:g-d.ajaxStart.getTime(),
s:!1,tc:this.tryCount,tt:d.type,lt:d.loadBarTime?g-d.loadBarTime.getTime():0,xs:c.status,ae:e.toString().substr(0,100)})}}})}catch(e){d.metrics&&f("lazyload",d.name,{s:!1,tt:d.type,ae:e.toString().substr(0,100)})}}a.fn.lazyLoadContent=function(f){f.url&&this.each(function(){var l={elem:this,trigger:["scroll"],threshold:400,metrics:!1,name:"lazy",retry:3,timeout:1E4,cache:!0};a.extend(l,f);var k=!1;h.ue||(l.metrics=!1);for(var p=0;p<l.trigger.length;p++)if("scroll"===l.trigger[p])a(this).fromScreenBottom(function(a,
b){k||(k=!0,l.type=b,c(l))},l.threshold);else if("oncf"===l.trigger[p])if(d&&e)m.when("cf").execute(function(){k||(k=!0,l.type="oncf",c(l))});else h.amznJQ.onCompletion("amznJQ.criticalFeature",function(){k||(k=!0,l.type="oncf",c(l))})})};a.fn.fromScreenBottom=function(c,d){c&&(d||(d=0),this.each(function(){var e=this,g=function(f){var m=a(h).scrollTop()+a(h).height();if(a(e).offset().top-m<d){m="ready";f&&f.type&&(m=f.type);try{c(e,m)}catch(p){}a(h).unbind("scroll",g)}};a(h).bind("scroll",g);g()}))}})(a)}
var d="object"===typeof m&&"function"===typeof m.when,e;d?m.when("jQuery").execute(function(c){a(c)}):a(h.jQuery);d?m.when("isLazyLoadWeblabEnabled").execute(function(a){(e=a)?m.register("lazyLoadLib"):h.amznJQ.declareAvailable("lazyLoadLib")}):h.amznJQ.declareAvailable("lazyLoadLib")});