!function o(r,s,d){function l(t,e){if(!s[t]){if(!r[t]){var a="function"==typeof require&&require;if(!e&&a)return a(t,!0);if(c)return c(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=s[t]={exports:{}};r[t][0].call(i.exports,function(e){return l(r[t][1][e]||e)},i,i.exports,o,r,s,d)}return s[t].exports}for(var c="function"==typeof require&&require,e=0;e<d.length;e++)l(d[e]);return l}({1:[function(o,e,t){
/**
 * @license
 * Copyright (c) 2014, Amazon.com
 * APE SafeFrame v1.50.007904c -- 2018-10-19T00:35:25+0000
*/
!function(C,L){var e=o("./components/msgHandler"),t=o("./components/adBlockerHandler"),F=o("./components/counters"),l=o("./components/cacheChecker"),k=o("./components/adBarTracer"),R=o("./components/ajaxRequest"),c=e.util,u=e.viewability,p=e.messenger,N=e.logError,D=p.appendErrorDetails,a=e.loadScript,B=e.sendCsmMetric,W=e.sendCsmCounter,O=e.addCsmTag,n=e.fireViewableLatencyMetrics,V=e.hasClass,z=e.createIframeWithName,P=e.logCounter,_=e.collapseSlot,H=e.resizeSafeFrameAd,U=e.delayLoad,q=e.getMediaCentralOrigin,j=e.scriptValidator,J=e.sizeValidator,Q=e.appendJsScript,X=e.checkAgainstWhitelist,Y=new t.AdBlockerCSMMediator(W);function i(){if(C.DAsf)C.DAsf.loadAds();else{C.DAsf={version:"1.50.007904c"},W(null,null,F.SF_VERSION_COUNTERS.VERSION+":"+C.DAsf.version,1);var f="text/x-dacx-safeframe",e=q(),m=e+"/images/G/01/ape/sf/desktop/sf-1.50.007904c._V482046906_.html",g=e+"/images/G/01/ape/sf/whitelisted/desktop/sf-1.50.007904c._V482046901_.html",h={1:"Enabled",0:"NotEnabled","-1":"Unknown"},w="data-arid",v="d16g_postMessageUnsupported",y="d16g_postMessageSupported",b=F.ABP_STATUS_COUNTERS,S=F.AD_LOAD_COUNTERS,a=F.MESSENGER_COUNTERS,i={},o={},A={},I={},r=null,s=null;s=c.safeFunctionWrapper(c.debounce(function(){return function(e,t){var a=!0;for(var n in o)if(o[n].iframe&&o[n].iframe.contentWindow&&!o[n].alreadyRendered){a=!1;var i=o[n].slot;u.findPercentInView(i)>=e?o[n].timeout||(o[n].timeout=setTimeout(d(n),t)):o[n].timeout&&(clearTimeout(o[n].timeout),o[n].timeout=null)}a&&(c.removeWindowListener("scroll",s),c.removeWindowListener("resize",s))}(u.PERCENT_VIEWABLE,u.DURATION_VIEWABLE)},100)),p.supportedCommands={sendAdBarTrace:function(e,t){e.options.arid in I&&I[e.options.arid].logTrace(t.field,t.traceInfo)},logAPIInvocation:function(e,t){W(null,null,a.API+t.apiName,1),W(e.options.slot,e.options.placementId,a.API+t.apiName,1),e.options.arid in I&&I[e.options.arid].logTrace("apiCalls",t)},resizeSafeFrameAd:function(e,t){c.addWindowListener("resize",i[e.options.arid].defaultResizeSafeFrameHandler),H(e.options.arid,e.options.size.width,e.options.size.height,e.options.maxAdWidth,p,A)},changeSize:function(e,t){var a=e.options.allowedSizes;if(X(t,a,J))e.iframe.height=t.height,e.iframe.width=t.width;else{var n="Size is not whitelisted: "+t.width+" x "+t.height+D(e.options.arid);N(n)}},collapseSlot:function(e,t){_(A[e.options.arid].placementDivId),"nav-sitewide-msg"===e.options.slotName&&U("amznJQ.available:navbarJSLoaded",function(){void 0!==parent.navbar&&"function"==typeof parent.navbar.unHideSWM&&parent.navbar.unHideSWM()})},embedScript:function(e,t){var a=e.options.allowedDomains;if(X(t.src,a,j))e.slot=L.getElementById(A[e.options.arid].placementDivId),void 0!==e.slot&&Q(t.src,e.slot,t.charset);else{var n="Domain is not whitelisted: "+t.src+D(e.options.arid);N(n)}},logError:function(e,t){N(t.message+D(e.options.arid)+": "+e.options.slot,t.error)},sendMetrics:function(e,t){B(t.metric,e.options.slot,e.options.placementId,t.metricMsg)},countMetric:function(e,t){W(e.options.slot,e.options.placementId,t.metricMsg,t.value)},addCsmTag:function(e,t){O(t.tag,e.options.slot,e.options.placementId,t.msg)},fireViewableLatencyMetrics:function(e,t){n(e.options.arid,e.options.slot,e.options.placementId)},customMessage:function(e,t){p.customMessage(t.key,t.body)},notifyWhenViewable:function(e,t){o[e.options.arid]||(e.rendered=!1,o[e.options.arid]=e),s(),c.addWindowListener("scroll",s),c.addWindowListener("resize",s)},enableViewabilityTracker:function(e){p.updateViewability(e.options.arid);var t=c.throttle(p.updateViewability,20);T(e.options.arid,e.options.slot,"viewabilityTracker",function(){t(e.options.arid)}),c.addWindowListener("scroll",i[e.options.arid].viewabilityTracker),c.addWindowListener("resize",i[e.options.arid].viewabilityTracker),c.addListener(L,"visibilitychange",i[e.options.arid].viewabilityTracker)},enableNoInventoryViewabilityTrackerAndInvokeFallback:function(e){p.takeSnapshotOfSlotPosition(e.options.arid),p.updateNoInventoryViewability(e.options.arid),p.sendMessageToAd(e.options.arid,"handleFallbackBehavior",{});var t=c.throttle(p.updateNoInventoryViewability,20);T(e.options.arid,e.options.slot,"noInventoryViewabilityTracker",function(){t(e.options.arid)}),c.addWindowListener("scroll",i[e.options.arid].noInventoryViewabilityTracker),c.addWindowListener("resize",i[e.options.arid].noInventoryViewabilityTracker),c.addListener(L,"visibilitychange",i[e.options.arid].noInventoryViewabilityTracker)},loadAdBlockerDetectorScript:function(e,t){var a=q()+"/images/G/01/ads/advertising/ads._TTH_.js?cachebust="+Math.ceil(99989999*Math.random()+1e4),n=c.safeFunctionWrapper(function(){Y.updateAdBlockerIsDisabled(e.options.arid,!1),p.sendMessageToAd(e.options.arid,"forceFallback",{})}),i=c.createScript(a,"text/javascript","APE_adblockerdetector",n,function(){Y.updateAdBlockerIsDisabled(e.options.arid,!0)}),o=L.getElementById(A[e.options.arid].placementDivId);o?o.appendChild(i):L.body.appendChild(i)},updateAdImpressionsFired:function(e,t){Y.updateAdImpressionsFired(e.options.arid,t.isImpFired)},updateAdViewabilityFired:function(e,t){Y.updateAdViewabilityFired(e.options.arid,t.isViewed)},updateNoInventoryViewabilityFired:function(e,t){Y.updateNoInventoryViewabilityFired(e.options.arid,t.isViewed)},updateAdImgLoaded:function(e,t){Y.updateAdImgLoaded(e.options.arid,t.isLoaded)},loadAdFeedback:function(e,t){var a=p.adMap[e.options.arid].iframe;e.options.adCreativeMetaData=t,function(e,o){var t={};if(t.isFeedbackLoaded=e.isFeedbackLoaded,e&&!e.isFeedbackLoaded&&o.adFeedbackInfo.boolFeedback){e.isFeedbackLoaded=!0;var a=e.parentNode,r=o.placementId,n=o.adFeedbackInfo.slugText,i=o.adFeedbackInfo.endPoint,s=o.advertisementStyle,d=o.feedbackDivStyle,l=F.FEEDBACK_COUNTERS,c={adPlacementMetaData:o.adPlacementMetaData,adCreativeMetaData:o.adCreativeMetaData};t.slot=a,t.placementId=r,t.slugText=n,t.endPoint=i,t.advertisementStyle=s,t.feedbackDivStyle=d,t.adFeedbackParams=c;var u=function(e,t,a,n){var i=L.createElement(e);for(var o in t)i.setAttribute(o,t[o]);return function(e,t){if(e&&t)for(var a in t)e.style[a]=t[a]}(i,a),n&&n.insertBefore(i,null),i},p=a.getElementsByTagName("div")[0]||u("div",{id:a.id+"_Feedback"},d,a),f=function(){I[o.arid].logTrace("adFeedBack",{renderFallbackAdvertisement:!0}),W(o.slot,r,l.FALLBACK,1);var e=p.getElementsByTagName("div")[0]||u("div",0,s,p);e.innerHTML=n},m=i&&i.length?C.location.protocol+"//"+C.location.hostname+i+"?pl="+(g=c,encodeURIComponent(JSON.stringify(g))):i;t.requestUrl=m,I[o.arid].logTrace("adFeedBack",{adFeedbackRequest:t}),m?(W(o.slot,r,l.REQUEST,1),R.sendAjaxRequest(m,"GET",null,null,function(e){var t={feedbackResponseStarted:!0};if(4===e.readyState){if(200===e.status)try{var a=e.responseText,n=JSON.parse(a);if((t.response=n)&&"ok"===n.status){if("html"in n&&n.html&&(p.innerHTML=n.html),"script"in n&&n.script){var i=p.getElementsByTagName("script")[0]||u("script",0,null,p);i.innerHTML=n.script}W(o.slot,r,l.SUCCESS,1),t.feedBackResponseReturned=!0}else f()}catch(e){f()}else t.feedBackResponseReturned=!1,f();I[o.arid].logTrace("adFeedBack",{adFeedBackResponse:t})}},f)):f()}var g}(a,e.options)},updateNoInventoryImpressionFired:function(e,t){Y.updateNoInventoryImpressionFired(e.options.arid,t.isNoInventoryImpFired)},safeFrameReady:function(e){},requestVideoAutoplay:function(e,t){if(r===e.options.arid&&p.sendCustomMessageToAd(e.options.arid,"videoAutoplayResponse",!0),null===r&&null!==e.options.arid){var a=L.getElementsByTagName("video"),n=a&&0===a.length;r=n?e.options.arid:null,p.sendCustomMessageToAd(e.options.arid,"videoAutoplayResponse",n)}},releaseVideoAutoplay:function(e,t){r=null,p.sendCustomMessageToAd(e.options.arid,"videoAutoplayReleased")}},c.addWindowListener("message",p.receiveMessage),C.DAsf.registerCustomMessageListener=p.registerCustomMessageListener,C.DAsf.sendCustomMessage=p.sendCustomMessage,C.DAsf.loadAds=function(){var e,t,a=0,n=null,i=[];if("function"!=typeof L.getElementsByClassName){var o=L.getElementsByTagName("div"),r=L.getElementsByTagName("script"),s=0;for(s=0;s<o.length;s++)i[s]=o[s];for(s=0;s<r.length;s++)i[s+o.length]=r[s]}else i=L.getElementsByClassName(f);for(0===i.length&&(i=L.getElementsByTagName("script"));n=i[a++];)if(("DIV"===n.tagName&&V(n,f)||n.getAttribute("type")===f)&&!n.getAttribute(w)){var d=n.getAttribute("data-ad-details")||n.text||n.innerHTML||n.innerText;try{(d=JSON.parse(d)).arid=d.arid||Math.random().toString(16).slice(2),I[d.arid]=new k.Tracer(d.traceId,C[d.slotName]&&C[d.slotName].adStartTime||0),I[d.arid].logTrace("safeFrameInput",d);var l={};l.caches=C.caches?C.caches:null,l.plugins=L.plugins?L.plugins:null,l.cookies=L.cookie?L.cookie:null,l.userAgents=navigator.userAgent?navigator.userAgent:null,I[d.arid].logTrace("browserData",l),n.setAttribute(w,d.arid),d.hostDomain=location.protocol+"//"+location.host,d.allowedSizes="object"==typeof d.allowedSizes&&0<=d.allowedSizes.length?d.allowedSizes.concat(d.size):[d.size];var c="d3l3lkinz3f56t.cloudfront.net,g-ecx.images-amazon.com,z-ecx.images-amazon.com,images-na.ssl-images-amazon.com,g-ec4.images-amazon.com,images-cn.ssl-images-amazon.com".split(",");if(d.allowedDomains="object"==typeof d.allowedDomains&&0<=d.allowedDomains.length?d.allowedDomains.concat(c):c,d.productAdsUrl=C.paSearchTowerAdsURL||C.paCusRevAllURL,d.parentLocation=location.origin||location.protocol+location.hostname,d.queryParams=x(),d.aPageStart=C.aPageStart,d.adStartTime=C[d.slotName]&&C[d.slotName].adStartTime||0,T(d.arid,d.slot,"defaultResizeSafeFrameHandler",E(d)),e=d.arid,t=d.slot,A[e]={slotId:t,placementDivId:"ape_"+t+"_placement",iframeId:"ape_"+t+"_iframe"},d.forcePunt){O("forcePunt",d.slot,d.placementId),_(A[d.arid].placementDivId);continue}if(d.safeFrameSrc="true"===d.abpAcceptable?g:m,d.abpStatus)for(var u in O("ABPStatus"+h[d.abpStatus],d.slot),h)W(d.slot,d.placementId,b[u],d.abpStatus===u?1:0);B("af",d.slot,d.placementId),W(d.slot,d.placementId,S.START,1);var p={};if(p.hostDomain=d.hostDomain,p.allowedSizes=d.allowedSizes,p.allowedDomains=d.allowedDomains,p.productAdsUrl=d.productAdsUrl,p.parentLocation=d.parentLocation,p.queryParams=d.queryParams,p.aPageStart=d.aPageStart,p.adStartTime=d.adStartTime,p.safeFrameSrc=d.safeFrameSrc,p.abpStatus=d.abpStatus,"function"!=typeof C.postMessage){P(v,1),_(A[d.arid].placementDivId),p.postMessage="postMessageNotSupported";continue}P(y,1),U(d.loadAfter,M(d),0,n),p.postMessage="postMessageSupported",p.loadAfter=d.loadAfter,I[d.arid].logTrace("additionalInitilizationParams",p)}catch(e){d=null,N("Error parsing sf tag",e)}}},C.DAsf.loadAds()}function T(e,t,a,n){i[e]=i[e]||{},i[e][a]=c.safeFunctionWrapper(n,N,"Error within ad handler "+a+": "+t)}function d(t){return function(){var e={key:"readyToRender",data:t};p.sendMessageToAd(t,"customMessage",e),o[t].timeout=null,o[t].alreadyRendered=!0}}function x(){var e={};try{for(var t=C.location.search.substring(1).split("&"),a=0;a<t.length;a++){var n=t[a].split("="),i=n[0];1<n.length&&0===i.indexOf("sf-")&&(e[i]=n[1])}}catch(e){N("Error parsing query parameters",e)}return e}function E(e){return function(){H(e.arid,e.size.width,e.size.height,e.maxAdWidth,p,A)}}function M(t){return c.safeFunctionWrapper(function(){var e={callbackOccurred:!0};e.loadAfter=t.loadAfter,I[t.arid].logTrace("pageCallBack",e),W(t.slot,t.placementId,S.CALLBACK,1),function(e,t){if(!e)return!1;var a=L.getElementById(e);if(a&&!a.innerHTML){var n=a.getAttribute(w);if(n&&n===t.arid)return!0}return!1}(A[t.arid].placementDivId,t)&&function(t){try{var a,n=JSON.stringify(t),e=L.getElementById(A[t.arid].placementDivId),i={};if(/MSIE (6|7|8)/.test(navigator.userAgent))try{a=L.createElement("<iframe name='"+n+"'>")}catch(e){a=z(n)}else a=z(n);a.id=A[t.arid].iframeId,a.src=t.safeFrameSrc,a.scrolling="no",a.height=t.size.height||"250px",a.width=t.size.width||"300px",a.className=t.iframeClass||"",a.setAttribute("frameborder","0"),a.setAttribute("marginheight","0"),a.setAttribute("marginwidth","0"),a.setAttribute("scrolling","no"),a.setAttribute("allowtransparency","true"),a.setAttribute("allowfullscreen",""),a.setAttribute("mozallowfullscreen",""),a.setAttribute("webkitallowfullscreen",""),a.setAttribute(w,t.arid),a.style.cssText=t.iframeExtraStyle||"",t.iframeSandbox&&(a.sandbox=t.iframeSandbox,i.sandbox=a.sandbox),a.onload=function(){l.checkCache(t.DAsfUrl,t.safeFrameSrc,t.slot,t.placementId,W)},e.appendChild(a),B("cf",t.slot,t.placementId),W(t.slot,t.placementId,S.IFRAME_CREATED,1),p.adMap[t.arid]={slot:e,iframe:a,options:t},Y.adbMap[t.arid]={slot:t.slot,adBlockerIsDisabled:void 0,adImgLoaded:void 0,adImpressionsFired:void 0,adViewabilityFired:void 0,placementId:t.placementId},i.id=a.id,i.src=a.src,i.scrolling=a.scrolling,i.height=a.height,i.width=a.width,i.className=a.className,i.styleCssText=a.style.cssText,I[t.arid].logTrace("createSafeFrame",i)}catch(e){N("Error creating safeFrame",e),I[t.arid]&&I[t.arid].logTrace("createSafeFrame",{error:{message:"errorCreatingSafeFrame",ex:e}})}}(t)},N,"Error in callback to create Safeframe.")}}c.safeFunctionWrapper(function(){"undefined"==typeof JSON?a("https://images-na.ssl-images-amazon.com/images/G/01/da/js/json3.min._V308851628_.js",i):i()},N,"Error initializing safeFrame")()}(window,document)},{"./components/adBarTracer":2,"./components/adBlockerHandler":3,"./components/ajaxRequest":4,"./components/cacheChecker":5,"./components/counters":6,"./components/msgHandler":7}],2:[function(e,t,a){var n=e("./ajaxRequest");t.exports.Tracer=function(e,t){return this.traceId=e,this.adStartTime=t,this.storedTrace={},this.logTrace=function(e,t){if(void 0!==this.traceId){var a,n=(new Date).getTime();this.storedTrace.hasOwnProperty(e)||(this.storedTrace[e]=[]),(a=t===Object(t)?Object.assign({},t):(a='{ "'+e+'":"'+t+'"}',JSON.parse(a))).timeStamp=n,a.timeSinceAdStart=n-this.adStartTime,this.storedTrace[e].push(a)}},this.sendTrace=function(){var t=function(){console.log("failed to send request to /gp/adbarplus")};if(!function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0}(this.storedTrace)){var e="/gp/adbarplus?traceId="+this.traceId+"&systemName=browser";for(var a in n.sendAjaxRequest(e,"POST",JSON.stringify(this.storedTrace),{"Content-Type":"application/x-www-form-urlencoded"},function(e){4===e.readyState&&200!==e.status&&t()},t),this.storedTrace)this.storedTrace.hasOwnProperty(a)&&delete this.storedTrace[a]}},this.bindSendTraceToPageOnLoad=function(){var e=function(e,t){return function(){return e.apply(t)}},t=function(){this.sendTrace()},a=function(){this.sendTrace(),window.setInterval(e(t,this),3e3)};"loading"!==document.readyState?e(a,this)():window.addEventListener?window.addEventListener("load",e(a,this)):document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&e(a,this)()})},void 0!==e&&this.bindSendTraceToPageOnLoad(),{traceId:this.traceId,adStartTime:this.adStartTime,storedTrace:this.storedTrace,allData:this.allData,logTrace:this.logTrace,sendTrace:this.sendTrace}}},{"./ajaxRequest":4}],3:[function(e,t,a){t.exports.AdBlockerCSMMediator=function(i,e){var o=this;this.adbMap=e||{};var n=function(e,t,a){var n=o.adbMap;!0!==n[e].adBlockerIsDisabled&&void 0!==n[e].adBlockerIsDisabled&&!1===n[e].adBlockerIsDisabled&&(!1===t?i(n[e].slot,n[e].placementId,"adblocker:blocked:".concat(a),1):!0===t&&i(n[e].slot,n[e].placementId,"adblocker:notblocked:".concat(a),1))};this.updateAdBlockerIsDisabled=function(e,t){var a=o.adbMap;a[e]&&(a[e].adBlockerIsDisabled=t,a[e].adBlockerIsDisabled?i(a[e].slot,a[e].placementId,"adblockernotdetected",1):i(a[e].slot,a[e].placementId,"adblockerdetected",1),n(e,a[e].adImgLoaded,"adimg"),n(e,a[e].adImpressionsFired,"adimpressions"),n(e,a[e].adViewabilityFired,"adviewability"))},this.updateAdImgLoaded=function(e,t){var a=o.adbMap;a[e]&&void 0===a[e].adImgLoaded&&(a[e].adImgLoaded=t,n(e,a[e].adImgLoaded,"adimg"))},this.updateAdImpressionsFired=function(e,t){var a=o.adbMap;a[e]&&void 0===a[e].adImpressionsFired&&(a[e].adImpressionsFired=t,n(e,a[e].adImpressionsFired,"adimpressions"))},this.updateAdViewabilityFired=function(e,t){var a=o.adbMap;a[e]&&void 0===a[e].adViewabilityFired&&(a[e].adViewabilityFired=t,n(e,a[e].adViewabilityFired,"adviewability"))},this.updateNoInventoryViewabilityFired=function(e,t){var a=o.adbMap;a[e]&&void 0===a[e].noInventoryViewabilityFired&&(a[e].noInventoryViewabilityFired=t,n(e,a[e].noInventoryViewabilityFired,"noInventoryViewability"))},this.updateNoInventoryImpressionFired=function(e,t){var a=o.adbMap;a[e]&&void 0===a[e].noInventoryImpressionsFired&&(a[e].noInventoryImpressionsFired=t,n(e,a[e].noInventoryImpressionsFired,"noInventoryImpressions"))}}},{}],4:[function(e,t,a){t.exports.sendAjaxRequest=function(e,t,a,n,i,o){try{var r=null;if(window.XMLHttpRequest?r=new XMLHttpRequest:o(),r){if(r.onreadystatechange=function(){i(r)},r.open(t,e,!0),null!==n)for(var s in n)r.setRequestHeader(s,n[s]);r.send(a)}else o()}catch(e){o()}}},{}],5:[function(e,t,a){var c=e("./counters");t.exports.checkCache=function(e,t,a,n,i){var o=c.CACHE_COUNTERS;if("undefined"!=typeof performance&&void 0!==performance.getEntriesByType){var r=performance.getEntriesByType("resource");if(void 0!==r&&Array.isArray(r)&&!(r.length<1)&&void 0!==r[0].duration){var s=void 0!==r[0].transferSize?function(e,t){0===e.transferSize?d(t+"cached"):d(t+"uncached")}:function(e,t){e.duration<20?d(t+"fastload"):d(t+"slowload")};l(e,o.SF_LIBRARY),l(t,o.SF_HTML)}}function d(e){i(a,n,e,1)}function l(e,t){if(e)for(var a=0;a<r.length;a++){var n=r[a];if(n.name&&-1!==n.name.indexOf(e))return void s(n,t)}}}},{"./counters":6}],6:[function(e,t,a){t.exports.AD_LOAD_COUNTERS={START:"adload:start",CALLBACK:"adload:delayloadcallback",IFRAME_CREATED:"adload:iframecreated"},t.exports.CACHE_COUNTERS={SF_LIBRARY:"cache:sflibrary:",SF_HTML:"cache:sfhtml:"},t.exports.FEEDBACK_COUNTERS={REQUEST:"adfeedback:request",SUCCESS:"adfeedback:success",FALLBACK:"adfeedback:fallback"},t.exports.MESSENGER_COUNTERS={API:"messenger:"},t.exports.ABP_STATUS_COUNTERS={1:"abpstatus:enabled",0:"abpstatus:notenabled","-1":"abpstatus:unknown"},t.exports.SF_VERSION_COUNTERS={VERSION:"sfversion"}},{}],7:[function(e,t,a){var f=e("./viewability"),m=e("./util"),n={ERROR:"ERROR",WARN:"WARN",FATAL:"FATAL"},c=i();function g(e,t){var a=t||new Error(e);s("",null,"safeFrameError",1),window.sfLogErrors&&(window.ueLogError?window.ueLogError(a,{logLevel:n.ERROR,attribution:"APE-safeframe",message:e+" "}):"undefined"!=typeof console&&console.error&&console.error(e,a))}function i(){var e=window.location.host.match(/^.*\.([^.:/]*)/),t=null;if(e&&1<e.length&&(t=e[1]),!/s/.test(location.protocol))return"cn"===t?"http://g-ec4.images-amazon.com":"http://z-ecx.images-amazon.com";var a="na";return/^(com|ca|mx)$/.test(t)?a="na":/^(uk|de|fr|it|es|in)$/.test(t)?a="eu":/^(jp|au)$/.test(t)?a="fe":/^(cn)$/.test(t)&&(a="cn"),"https://images-"+a+".ssl-images-amazon.com"}function u(e){return e.replace(/^.{1,5}:\/\/|^\/\//,"")}var r={wb:"ues",bb:"uet",af:"uet",cf:"uet",be:"uet",ld:"uex"};function o(e,t,a,n){var i=r[e],o=n?n+":":"";"function"==typeof window[i]&&(window[i](e,"adplacements:"+o+t.replace(/_/g,":"),{wb:1}),a&&window[i](e,"adplacements:"+o+a,{wb:1}))}function s(e,t,a,n){if(window.ue&&"function"==typeof window.ue.count){var i="adplacements:"+a;if(e&&(i+=":"+e.replace(/_/g,":")),window.ue.count(i,n),t){var o="adplacements:"+(a&&t?a+":":a)+t;window.ue.count(o,n)}}}t.exports.util=m,t.exports.viewability=f,t.exports.messenger=new function(e,t,a){var l=this;this.adMap=e||{},this.supportedCommands=t||{},this.msgListeners=a||{};var r=function(e){var t=l.adMap,a=t[e].options;if(t==={}||a==={})return null;var n="ape_"+a.slot+"_iframe";return t[e].iframe&&(t[e].iframe=t[e].iframe&&t[e].iframe.innerHTML?t[e].iframe:document.getElementById(n)),t[e].iframe};this.sendMessageToAd=function(e,t,a){var n=r(e),i=n?n.contentWindow:null;if(i){var o={command:t,data:a};o=JSON.stringify(o),i.postMessage(o,"*")}},this.receiveMessage=function(t){var e=l.adMap,a=l.supportedCommands;if(e!=={}){var n,i,o,r,s;try{if(t.data&&t.data.message&&/.*Mash.*/i.test(t.data.message.id))throw"Received Mash message";i=e[(n=JSON.parse(t.data)).arid]}catch(e){return}try{if(s=t,!(r=i)||!r.options||!r.options.msfInlined&&u(s.origin)!==u(c)||"object"!=typeof n.data)throw"Invalid Message: "+JSON.stringify(t.data);var d=a[n.command];d&&(i.options.debug&&"undefined"!=typeof console&&console.log(t),d(i,n.data))}catch(e){o="Problem with message: "+t.data,void 0!==n&&(o+=l.appendErrorDetails(n.arid)),g(o,e)}}},this.appendErrorDetails=function(e){var t=l.adMap;if(t==={})return"";var a="";if(void 0!==t[e]){var n=t[e].options;void 0!==n.aanResponse&&(a=" Ad Details: "+JSON.stringify(n.aanResponse))}return a},this.customMessage=function(e,t){var a=l.msgListeners;if(a[e])try{a[e](t)}catch(e){g("Custom Message Error",e)}else g("Unrecognized custom message key: "+e)},this.registerCustomMessageListener=function(e,t,a){var n=!1,i=l.msgListeners;try{!i[e]||"function"!=typeof i[e]||a?(i[e]=t,n=!0):g("Duplicate Key",new Error("Custom message listener already exists for key: "+e))}catch(e){g("Error registering custom message listener",e)}return n},this.sendCustomMessage=function(e,t){var a=l.adMap,n={key:e,data:t};for(var i in a)l.sendMessageToAd(i,"customMessage",n)},this.sendCustomMessageToAd=function(e,t,a){var n={key:t,data:a};l.sendMessageToAd(e,"customMessage",n)},this.takeSnapshotOfSlotPosition=function(e){var t=l.adMap,a=t&&t[e]&&t[e].options;if(t&&t!=={}&&a&&a!=={}){var n=r(e);l.adMap[e].options.slotSnapshot=f.takeSnapshotOfSlotPosition(n)}},this.updateViewability=function(e){var t=l.adMap,a=t&&t[e]&&t[e].options;if(t&&t!=={}&&a&&a!=={}){var n=r(e),i=t[e].options.viewabilityStandards,o=f.getViewableInfo(n);null!==o&&(o.viewabilityStandards=i,l.sendMessageToAd(e,"updateViewability",o))}},this.updateNoInventoryViewability=function(e){var t=l.adMap,a=t&&t[e]&&t[e].options,n=a&&a.slotSnapshot;if(t&&t!=={}&&a&&a!=={}&&n){var i=a.viewabilityStandards,o=f.getNoInventoryViewabilityData(n);null!==o&&(o.viewabilityStandards=i,l.sendMessageToAd(e,"updateNoInventoryViewability",o))}}},t.exports.logError=g,t.exports.SF_DOMAIN=c,t.exports.loadScript=function(e,t){var a=document.createElement("script");a.src=e,a.setAttribute("crossorigin","anonymous"),a.onload=a.onreadystatechange=function(){a.readyState&&"loaded"!==a.readyState&&"complete"!==a.readyState||(a.onload=a.onreadystatechange=null,t&&"function"==typeof t&&t())},a.onerror=function(e){return g("Error loading script",e),!1},(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(a)},t.exports.sendCsmMetric=o,t.exports.sendCsmCounter=s,t.exports.addCsmTag=function(e,t,a,n){if(window.ue&&window.ue.tag){var i=e+":"+t.replace(/_/g,":")+(n?":"+n:"");if(window.ue.tag(i),a){var o=e+":"+a+(n?":"+n:"");window.ue.tag(o)}}},t.exports.fireViewableLatencyMetrics=function(e,t,a){window.apeViewableLatencyTrackers&&window.apeViewableLatencyTrackers[e]&&window.apeViewableLatencyTrackers[e].valid&&(window.apeViewableLatencyTrackers[e].loaded=!0,window.apeViewableLatencyTrackers[e].viewed&&(o("ld",t,a,"viewablelatency"),s(t,a,"htmlviewed:loaded",1)))},t.exports.hasClass=function(e,t){var a=new RegExp("(^|\\s)"+t+"(\\s|$)"),n=e.className;return n&&a.test(n)},t.exports.createIframeWithName=function(e){var t=document.createElement("iframe");return t.name=e,t},t.exports.logCounter=function(e,t){window.ue&&"function"==typeof window.ue.count&&window.ue.count(e,t)},t.exports.collapseSlot=function(e){var t=document.getElementById(e);void 0!==t&&t&&(t.style.display="none")},t.exports.resizeSafeFrameAd=function(t,a,n,e,i,o){try{var r=document.getElementById(o[t].placementDivId),s=document.getElementById(o[t].wrapperDivId)||r,d=document.getElementById(o[t].iframeId);if(null===s||null===r||null===d)return;var l=n,c=a,u=function(e){l=Math.round(e*n/a),c=Math.round(e)},p=0===s.offsetWidth?window.innerWidth:s.offsetWidth;e&&window.innerHeight<window.innerWidth?u(e):u(p),i&&i.adMap&&i.adMap[t]&&i.adMap[t].options&&i.adMap[t].options.slotSnapshot&&(i.adMap[t].options.slotSnapshot.adHeight=l,i.adMap[t].options.slotSnapshot.adWidth=c),l+="px",c+="px",d.style.height=l;var f={width:d.style.width=c,height:l};s!==r&&(r.style.height=l,i.sendMessageToAd(t,"resizeCreativeWrapper",f))}catch(e){g("Error resizing ad: "+o[t].slotId,e)}},t.exports.delayLoad=function(n,e,t,i){var a="undefined"!=typeof P,o="undefined"!=typeof amznJQ,r=0!==t?function(){setTimeout(e,t)}:e;if("windowOnLoad"===n)"complete"===document.readyState?r():m.addWindowListener("load",r);else if("spATFEvent"===n)a?P.when("search-page-utilities").execute(function(e){e.afterEvent("spATFEvent",r)}):o?amznJQ.available("search-js-general",function(){window.SPUtils.afterEvent("spATFEvent",r)}):r();else if("criticalFeature"===n)a?P.when("cf").execute(r):o?amznJQ.onCompletion("amznJQ.criticalFeature",r):r();else if("r2OnLoad"===n)a?P.when("r2Loaded").execute(r):o?amznJQ.onReady("r2Loaded",r):r();else if(n.match("[^:]+:.+")){var s=n.split(":");if(1<s.length){var d=s[0].split("."),l=s[1],c=2<s.length?s[2]:l;a?P.when(c,"A").execute(r):o&&1<d.length?amznJQ[d[1]](l,r):r()}else r()}else if(n.match(/^\d{1,4}px$/g)){var u=!1,p=m.safeFunctionWrapper(m.throttle(function(){var e,t,a;e=n,t=r,(a=i)&&f.findDistanceInView(a)<=parseInt(e,10)&&(t(),u=!0),u&&(m.removeWindowListener("scroll",p),m.removeWindowListener("resize",p))},20));m.addWindowListener("scroll",p),m.addWindowListener("resize",p)}else r()},t.exports.getMediaCentralOrigin=i,t.exports.appendJsScript=function(e,t,a){var n=document.createElement("script");n.charset=a||"utf-8",n.src=e,t.appendChild(n)},t.exports.scriptValidator=function(e,t){return e.match(/^((?:https?:)?\/\/)?([\w\-\.]+(?::[0-9]+)?)\/?(.*)$/)[2]===t},t.exports.sizeValidator=function(e,t){return e.height===t.height&&e.width===t.width},t.exports.checkAgainstWhitelist=function(e,t,a){if(!t||"object"!=typeof t)return!1;for(var n=0,i=t.length;n<i;n++)if(a(e,t[n]))return!0;return!1}},{"./util":8,"./viewability":9}],8:[function(e,a,t){
/*
    @license
    Underscore.js 1.8.3
    http://underscorejs.org
    (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
    Underscore may be freely distributed under the MIT license.
*/
a.exports.debounce=function(t,a,n){var i,o,r,s,d,l=function(){var e=u()-s;e<a&&0<=e?i=setTimeout(l,a-e):(i=null,n||(d=t.apply(r,o),i||(r=o=null)))};return function(){r=this,o=arguments,s=u();var e=n&&!i;return i||(i=setTimeout(l,a)),e&&(d=t.apply(r,o),r=o=null),d}},a.exports.throttle=function(a,n,i){var o,r,s,d=null,l=0;i||(i={});var c=function(){l=!1===i.leading?0:u(),d=null,s=a.apply(o,r),d||(o=r=null)};return function(){var e=u();l||!1!==i.leading||(l=e);var t=n-(e-l);return o=this,r=arguments,t<=0||n<t?(d&&(clearTimeout(d),d=null),l=e,s=a.apply(o,r),d||(o=r=null)):d||!1===i.trailing||(d=setTimeout(c,t)),s}};var u=function(){return Date.now?Date.now():(new Date).getTime()};function n(){return window.P&&window.P.AUI_BUILD_DATE}a.exports.addListener=function(e,t,a){e.addEventListener?e.addEventListener(t,a,!1):window.attachEvent&&e.attachEvent("on"+t,a)},a.exports.addWindowListener=function(e,t){a.exports.addListener(window,e,t)},a.exports.removeWindowListener=function(e,t){window.removeEventListener?window.removeEventListener(e,t,!1):window.detachEvent&&window.detachEvent("on"+e,t)},a.exports.getQueryString=function(e,t){var a=[];for(var n in e)a.push(n+"="+e[n]);var i=a.join("&");return t?encodeURIComponent(i):i},a.exports.ensureMessageListener=function(e){a.exports.removeWindowListener("message",e),a.exports.addWindowListener("message",e)},a.exports.extend=function(e){for(var t,a,n=1,i=arguments.length;n<i;n++)for(a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&null!==t[a]&&(e[a]=t[a]);return e},a.exports.decodeBase64=function(e){var t,a,n,i,o,r,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",d="",l=0;for(e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");l<e.length;)t=s.indexOf(e.charAt(l++))<<2|(i=s.indexOf(e.charAt(l++)))>>4,a=(15&i)<<4|(o=s.indexOf(e.charAt(l++)))>>2,n=(3&o)<<6|(r=s.indexOf(e.charAt(l++))),d+=String.fromCharCode(t),64!=o&&(d+=String.fromCharCode(a)),64!=r&&(d+=String.fromCharCode(n));return d=function(e){for(var t="",a=0,n=0,i=0,o=0;a<e.length;)(n=e.charCodeAt(a))<128?(t+=String.fromCharCode(n),a++):191<n&&n<224?(i=e.charCodeAt(a+1),t+=String.fromCharCode((31&n)<<6|63&i),a+=2):(i=e.charCodeAt(a+1),o=e.charCodeAt(a+2),t+=String.fromCharCode((15&n)<<12|(63&i)<<6|63&o),a+=3);return t}(d)},a.exports.createScript=function(e,t,a,n,i){if(!document.getElementById(a)){var o=document.createElement("script");return o.async=!0,o.setAttribute("crossorigin","anonymous"),o.src=e,o.type=t,o.id=a,o.onerror=n,o.onload=i,o}},a.exports.isAUIAvailable=n,a.exports.safeFunctionWrapper=function(e,t,a){return n()&&"function"==typeof window.P.guardError?P.guardError("APE-SafeFrame",e):function(){try{e.apply(this,arguments)}catch(e){"function"==typeof t&&a&&t(a,e)}}},a.exports.getCookie=function(e){var t=e+"=";try{for(var a=decodeURIComponent(document.cookie).split(";"),n=0;n<a.length;n++){for(var i=a[n];" "==i.charAt(0);)i=i.substring(1);if(0==i.indexOf(t))return i.substring(t.length,i.length)}}catch(e){}return""}},{}],9:[function(e,c,t){function u(e,t,a){var n=0;return document.hidden?n:(n=0<e?a-e:0<t?Math.min(t,a):0,Math.min(n,t-e))}function p(){try{var e={};return e.t=window.screenY?window.screenY:window.screenTop,e.l=window.screenX?window.screenX:window.screenLeft,e.w=c.exports.windowWidth(),e.h=c.exports.windowHeight(),e.b=e.t+e.h,e.r=e.l+e.w,e}catch(e){return null}}function f(e,t){try{var a={},n=t||e.getBoundingClientRect();a.t=n.top,a.l=n.left,a.r=n.right,a.b=n.bottom,a.w=n.width||a.r-a.l,a.h=n.height||a.b-a.t,e&&(a.z=Number(window.getComputedStyle(e,null).zIndex));var i=c.exports.windowWidth(),o=c.exports.windowHeight(),r=Math.max(0,u(a.t,a.b,o)),s=Math.max(0,u(a.l,a.r,i)),d=r*s,l=a.h*Math.min(a.w,c.exports.windowWidth());return a.xiv=Number(Math.min(1,s/a.w).toFixed(2)),a.yiv=Number(Math.min(1,r/a.h).toFixed(2)),a.iv=Number(Math.min(1,Math.max(0,d/l)).toFixed(2)),a}catch(e){return null}}function m(e,t){try{var a={},n=t||e.getBoundingClientRect();return a.t=n.top,a.l=n.left,a.r=c.exports.windowWidth()-n.right,a.b=c.exports.windowHeight()-n.bottom,a.xs=Math.max(document.body.scrollWidth,document.documentElement.scrollWidth)>c.exports.windowWidth()?1:0,a.yx=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight)>c.exports.windowHeight()?1:0,a}catch(e){return null}}c.exports.PERCENT_VIEWABLE=.5,c.exports.DURATION_VIEWABLE=500,c.exports.findPercentInView=function(e){try{var t=e.getBoundingClientRect(),a=u(t.top,t.bottom,c.exports.windowHeight())*u(t.left,t.right,c.exports.windowWidth()),n=(t.bottom-t.top)*Math.min(t.right-t.left,c.exports.windowWidth());return Math.min(1,Math.max(0,a/n))}catch(e){return null}},c.exports.findDistanceInView=function(e){try{return e.getBoundingClientRect().top-c.exports.windowHeight()}catch(e){return null}},c.exports.getViewableInfo=function(e){if(!e)return null;var t={},a=p(),n=f(e),i=m(e);return a&&n&&i?(t.geom={},t.geom.win=a,t.geom.self=n,t.geom.exp=i,t.payload={},t.payload.wh=a.h,t.payload.ww=a.w,t.payload.sx=window.scrollX,t.payload.sy=window.scrollY,t.payload.ah=n.h,t.payload.aw=n.w,t.payload.top=n.t,t.payload.left=n.l,t):null},c.exports.takeSnapshotOfSlotPosition=function(e){try{return{initialBoundingRect:e.getBoundingClientRect(),adHeight:e.offsetHeight,adWidth:e.offsetWidth,originalScrollX:window.scrollX,originalScrollY:window.scrollY}}catch(e){return null}},c.exports.getNoInventoryViewabilityData=function(e){var t,a,n,i,o,r,s={},d=(a=(t=e).initialBoundingRect,n=a.top-(window.scrollY-t.originalScrollY),i=n+t.adHeight,o=a.left-(window.scrollX-t.originalScrollX),r=o+t.adWidth,{top:n,bottom:i,left:o,right:r,width:t.adWidth,height:t.adHeight}),l=p(),c=f(null,d),u=m(null,d);return l&&c&&u?(s.geom={},s.geom.win=l,s.geom.self=c,s.geom.exp=u,s.payload={},s.payload.wh=l.h,s.payload.ww=l.w,s.payload.sx=window.scrollX,s.payload.sy=window.scrollY,s.payload.ah=c.h,s.payload.aw=c.w,s.payload.top=c.t,s.payload.left=c.l,s):null},c.exports.windowHeight=function(){return window.innerHeight||document.documentElement.clientHeight},c.exports.windowWidth=function(){return window.innerWidth||document.documentElement.clientWidth}},{}]},{},[1]);