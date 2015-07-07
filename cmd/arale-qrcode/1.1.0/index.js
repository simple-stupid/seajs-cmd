define("arale-qrcode/1.1.0/index",["jquery"],function(t,e,o){o.exports=t("arale-qrcode/1.1.0/src/qrcode")}),define("arale-qrcode/1.1.0/src/qrcode",["jquery"],function(t,e,o){var r=t("jquery"),n=t("arale-qrcode/1.1.0/src/qrcodealg"),s=[],i=function(t){"string"==typeof t&&(t={text:t}),this.options=r.extend({},{text:"",render:"",width:256,height:256,correctLevel:3,background:"#ffffff",foreground:"#000000"},t);for(var e=null,o=0,i=s.length;i>o;o++)if(s[o].text==this.options.text&&s[o].text.correctLevel==this.options.correctLevel){e=s[o].obj;break}if(o==i&&(e=new n(this.options.text,this.options.correctLevel),s.push({text:this.options.text,correctLevel:this.options.correctLevel,obj:e})),this.options.render)switch(this.options.render){case"canvas":return this.createCanvas(e);case"table":return this.createTable(e);case"svg":return this.createSVG(e);default:return this.createDefault(e)}return this.createDefault(e)};i.prototype.createDefault=function(t){var e=document.createElement("canvas");return e.getContext?this.createCanvas(t):(SVG_NS="http://www.w3.org/2000/svg",document.createElementNS&&document.createElementNS(SVG_NS,"svg").createSVGRect?this.createSVG(t):this.createTable(t))},i.prototype.createCanvas=function(t){var e=document.createElement("canvas");e.width=this.options.width,e.height=this.options.height;for(var o=e.getContext("2d"),r=(this.options.width/t.getModuleCount()).toPrecision(4),n=this.options.height/t.getModuleCount().toPrecision(4),s=0;s<t.getModuleCount();s++)for(var i=0;i<t.getModuleCount();i++){o.fillStyle=t.modules[s][i]?this.options.foreground:this.options.background;var u=Math.ceil((i+1)*r)-Math.floor(i*r),a=Math.ceil((s+1)*r)-Math.floor(s*r);o.fillRect(Math.round(i*r),Math.round(s*n),u,a)}return e},i.prototype.createTable=function(t){var e=[];e.push('<table style="border:0px; margin:0px; padding:0px; border-collapse:collapse; background-color: '+this.options.background+';">');var o=-1,r=-1,n=-1,s=-1;o=n=Math.floor(this.options.width/t.getModuleCount()),r=s=Math.floor(this.options.height/t.getModuleCount()),0>=n&&(o=t.getModuleCount()<80?2:1),0>=s&&(r=t.getModuleCount()<80?2:1),foreTd='<td style="border:0px; margin:0px; padding:0px; width:'+o+"px; background-color: "+this.options.foreground+'"></td>',backTd='<td style="border:0px; margin:0px; padding:0px; width:'+o+"px; background-color: "+this.options.background+'"></td>',l=t.getModuleCount();for(var i=0;l>i;i++){e.push('<tr style="border:0px; margin:0px; padding:0px; height: '+r+'px">');for(var u=0;l>u;u++)e.push(t.modules[i][u]?foreTd:backTd);e.push("</tr>")}e.push("</table>");var a=document.createElement("span");return a.innerHTML=e.join(""),a.firstChild},i.prototype.createSVG=function(t){for(var e,o,n,s,i=t.getModuleCount(),u=this.options.height/this.options.width,a='<svg xmlns="http://www.w3.org/2000/svg" width="'+this.options.width+'px" height="'+this.options.height+'px" viewbox="0 0 '+10*i+" "+10*i*u+'">',h="<path ",l=' style="stroke-width:0.5;stroke:'+this.options.foreground+";fill:"+this.options.foreground+';"></path>',d=' style="stroke-width:0.5;stroke:'+this.options.background+";fill:"+this.options.background+';"></path>',g=0;i>g;g++)for(var f=0;i>f;f++)e=10*f,n=10*g*u,o=10*(f+1),s=10*(g+1)*u,a+=h+'d="M '+e+","+n+" L "+o+","+n+" L "+o+","+s+" L "+e+","+s+' Z"',a+=t.modules[g][f]?l:d;return a+="</svg>",r(a)[0]},o.exports=i}),define("arale-qrcode/1.1.0/src/qrcodealg",[],function(t,e,o){function r(t){return 128>t?[t]:2048>t?(c0=192+(t>>6),c1=128+(63&t),[c0,c1]):(c0=224+(t>>12),c1=128+(t>>6&63),c2=128+(63&t),[c0,c1,c2])}function n(t){for(var e=[],o=0;o<t.length;o++)for(var n=t.charCodeAt(o),s=r(n),i=0;i<s.length;i++)e.push(s[i]);return e}function s(t,e){this.typeNumber=-1,this.errorCorrectLevel=e,this.modules=null,this.moduleCount=0,this.dataCache=null,this.rsBlocks=null,this.totalDataCount=-1,this.data=t,this.utf8bytes=n(t),this.make()}function i(t,e){if(void 0==t.length)throw new Error(t.length+"/"+e);for(var o=0;o<t.length&&0==t[o];)o++;this.num=new Array(t.length-o+e);for(var r=0;r<t.length-o;r++)this.num[r]=t[r+o]}function u(){this.buffer=new Array,this.length=0}s.prototype={constructor:s,getModuleCount:function(){return this.moduleCount},make:function(){this.getRightType(),this.dataCache=this.createData(),this.createQrcode()},makeImpl:function(t){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++)this.modules[e]=new Array(this.moduleCount);this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(!0,t),this.typeNumber>=7&&this.setupTypeNumber(!0),this.mapData(this.dataCache,t)},setupPositionProbePattern:function(t,e){for(var o=-1;7>=o;o++)if(!(-1>=t+o||this.moduleCount<=t+o))for(var r=-1;7>=r;r++)-1>=e+r||this.moduleCount<=e+r||(this.modules[t+o][e+r]=o>=0&&6>=o&&(0==r||6==r)||r>=0&&6>=r&&(0==o||6==o)||o>=2&&4>=o&&r>=2&&4>=r?!0:!1)},createQrcode:function(){for(var t=0,e=0,o=null,r=0;8>r;r++){this.makeImpl(r);var n=l.getLostPoint(this);(0==r||t>n)&&(t=n,e=r,o=this.modules)}this.modules=o,this.setupTypeInfo(!1,e),this.typeNumber>=7&&this.setupTypeNumber(!1)},setupTimingPattern:function(){for(var t=8;t<this.moduleCount-8;t++)null==this.modules[t][6]&&(this.modules[t][6]=t%2==0,null==this.modules[6][t]&&(this.modules[6][t]=t%2==0))},setupPositionAdjustPattern:function(){for(var t=l.getPatternPosition(this.typeNumber),e=0;e<t.length;e++)for(var o=0;o<t.length;o++){var r=t[e],n=t[o];if(null==this.modules[r][n])for(var s=-2;2>=s;s++)for(var i=-2;2>=i;i++)this.modules[r+s][n+i]=-2==s||2==s||-2==i||2==i||0==s&&0==i?!0:!1}},setupTypeNumber:function(t){for(var e=l.getBCHTypeNumber(this.typeNumber),o=0;18>o;o++){var r=!t&&1==(e>>o&1);this.modules[Math.floor(o/3)][o%3+this.moduleCount-8-3]=r,this.modules[o%3+this.moduleCount-8-3][Math.floor(o/3)]=r}},setupTypeInfo:function(t,e){for(var o=a[this.errorCorrectLevel]<<3|e,r=l.getBCHTypeInfo(o),n=0;15>n;n++){var s=!t&&1==(r>>n&1);6>n?this.modules[n][8]=s:8>n?this.modules[n+1][8]=s:this.modules[this.moduleCount-15+n][8]=s;var s=!t&&1==(r>>n&1);8>n?this.modules[8][this.moduleCount-n-1]=s:9>n?this.modules[8][15-n-1+1]=s:this.modules[8][15-n-1]=s}this.modules[this.moduleCount-8][8]=!t},createData:function(){var t=new u,e=this.typeNumber>9?16:8;t.put(4,4),t.put(this.utf8bytes.length,e);for(var o=0,r=this.utf8bytes.length;r>o;o++)t.put(this.utf8bytes[o],8);for(t.length+4<=8*this.totalDataCount&&t.put(0,4);t.length%8!=0;)t.putBit(!1);for(;;){if(t.length>=8*this.totalDataCount)break;if(t.put(s.PAD0,8),t.length>=8*this.totalDataCount)break;t.put(s.PAD1,8)}return this.createBytes(t)},createBytes:function(t){for(var e=0,o=0,r=0,n=this.rsBlock.length/3,s=new Array,u=0;n>u;u++)for(var a=this.rsBlock[3*u+0],h=this.rsBlock[3*u+1],d=this.rsBlock[3*u+2],g=0;a>g;g++)s.push([d,h]);for(var f=new Array(s.length),c=new Array(s.length),p=0;p<s.length;p++){var m=s[p][0],v=s[p][1]-m;o=Math.max(o,m),r=Math.max(r,v),f[p]=new Array(m);for(var u=0;u<f[p].length;u++)f[p][u]=255&t.buffer[u+e];e+=m;var T=l.getErrorCorrectPolynomial(v),C=new i(f[p],T.getLength()-1),y=C.mod(T);c[p]=new Array(T.getLength()-1);for(var u=0;u<c[p].length;u++){var b=u+y.getLength()-c[p].length;c[p][u]=b>=0?y.get(b):0}}for(var P=new Array(this.totalDataCount),A=0,u=0;o>u;u++)for(var p=0;p<s.length;p++)u<f[p].length&&(P[A++]=f[p][u]);for(var u=0;r>u;u++)for(var p=0;p<s.length;p++)u<c[p].length&&(P[A++]=c[p][u]);return P},mapData:function(t,e){for(var o=-1,r=this.moduleCount-1,n=7,s=0,i=this.moduleCount-1;i>0;i-=2)for(6==i&&i--;;){for(var u=0;2>u;u++)if(null==this.modules[r][i-u]){var a=!1;s<t.length&&(a=1==(t[s]>>>n&1));var h=l.getMask(e,r,i-u);h&&(a=!a),this.modules[r][i-u]=a,n--,-1==n&&(s++,n=7)}if(r+=o,0>r||this.moduleCount<=r){r-=o,o=-o;break}}}},s.PAD0=236,s.PAD1=17;for(var a=[1,0,3,2],h={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},l={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(t){for(var e=t<<10;l.getBCHDigit(e)-l.getBCHDigit(l.G15)>=0;)e^=l.G15<<l.getBCHDigit(e)-l.getBCHDigit(l.G15);return(t<<10|e)^l.G15_MASK},getBCHTypeNumber:function(t){for(var e=t<<12;l.getBCHDigit(e)-l.getBCHDigit(l.G18)>=0;)e^=l.G18<<l.getBCHDigit(e)-l.getBCHDigit(l.G18);return t<<12|e},getBCHDigit:function(t){for(var e=0;0!=t;)e++,t>>>=1;return e},getPatternPosition:function(t){return l.PATTERN_POSITION_TABLE[t-1]},getMask:function(t,e,o){switch(t){case h.PATTERN000:return(e+o)%2==0;case h.PATTERN001:return e%2==0;case h.PATTERN010:return o%3==0;case h.PATTERN011:return(e+o)%3==0;case h.PATTERN100:return(Math.floor(e/2)+Math.floor(o/3))%2==0;case h.PATTERN101:return e*o%2+e*o%3==0;case h.PATTERN110:return(e*o%2+e*o%3)%2==0;case h.PATTERN111:return(e*o%3+(e+o)%2)%2==0;default:throw new Error("bad maskPattern:"+t)}},getErrorCorrectPolynomial:function(t){for(var e=new i([1],0),o=0;t>o;o++)e=e.multiply(new i([1,d.gexp(o)],0));return e},getLostPoint:function(t){for(var e=t.getModuleCount(),o=0,r=0,n=0;e>n;n++)for(var s=0,i=t.modules[n][0],u=0;e>u;u++){var a=t.modules[n][u];if(e-6>u&&a&&!t.modules[n][u+1]&&t.modules[n][u+2]&&t.modules[n][u+3]&&t.modules[n][u+4]&&!t.modules[n][u+5]&&t.modules[n][u+6]&&(e-10>u?t.modules[n][u+7]&&t.modules[n][u+8]&&t.modules[n][u+9]&&t.modules[n][u+10]&&(o+=40):u>3&&t.modules[n][u-1]&&t.modules[n][u-2]&&t.modules[n][u-3]&&t.modules[n][u-4]&&(o+=40)),e-1>n&&e-1>u){var h=0;a&&h++,t.modules[n+1][u]&&h++,t.modules[n][u+1]&&h++,t.modules[n+1][u+1]&&h++,(0==h||4==h)&&(o+=3)}i^a?s++:(i=a,s>=5&&(o+=3+s-5),s=1),a&&r++}for(var u=0;e>u;u++)for(var s=0,i=t.modules[0][u],n=0;e>n;n++){var a=t.modules[n][u];e-6>n&&a&&!t.modules[n+1][u]&&t.modules[n+2][u]&&t.modules[n+3][u]&&t.modules[n+4][u]&&!t.modules[n+5][u]&&t.modules[n+6][u]&&(e-10>n?t.modules[n+7][u]&&t.modules[n+8][u]&&t.modules[n+9][u]&&t.modules[n+10][u]&&(o+=40):n>3&&t.modules[n-1][u]&&t.modules[n-2][u]&&t.modules[n-3][u]&&t.modules[n-4][u]&&(o+=40)),i^a?s++:(i=a,s>=5&&(o+=3+s-5),s=1)}var l=Math.abs(100*r/e/e-50)/5;return o+=10*l}},d={glog:function(t){if(1>t)throw new Error("glog("+t+")");return d.LOG_TABLE[t]},gexp:function(t){for(;0>t;)t+=255;for(;t>=256;)t-=255;return d.EXP_TABLE[t]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},g=0;8>g;g++)d.EXP_TABLE[g]=1<<g;for(var g=8;256>g;g++)d.EXP_TABLE[g]=d.EXP_TABLE[g-4]^d.EXP_TABLE[g-5]^d.EXP_TABLE[g-6]^d.EXP_TABLE[g-8];for(var g=0;255>g;g++)d.LOG_TABLE[d.EXP_TABLE[g]]=g;i.prototype={get:function(t){return this.num[t]},getLength:function(){return this.num.length},multiply:function(t){for(var e=new Array(this.getLength()+t.getLength()-1),o=0;o<this.getLength();o++)for(var r=0;r<t.getLength();r++)e[o+r]^=d.gexp(d.glog(this.get(o))+d.glog(t.get(r)));return new i(e,0)},mod:function(t){var e=this.getLength(),o=t.getLength();if(0>e-o)return this;for(var r=new Array(e),n=0;e>n;n++)r[n]=this.get(n);for(;r.length>=o;){for(var s=d.glog(r[0])-d.glog(t.get(0)),n=0;n<t.getLength();n++)r[n]^=d.gexp(d.glog(t.get(n))+s);for(;0==r[0];)r.shift()}return new i(r,0)}},RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],s.prototype.getRightType=function(){for(var t=1;41>t;t++){var e=RS_BLOCK_TABLE[4*(t-1)+this.errorCorrectLevel];if(void 0==e)throw new Error("bad rs block @ typeNumber:"+t+"/errorCorrectLevel:"+this.errorCorrectLevel);for(var o=e.length/3,r=0,n=0;o>n;n++){var s=e[3*n+0],i=e[3*n+2];r+=i*s}var u=t>9?2:1;if(this.utf8bytes.length+u<r||40==t){this.typeNumber=t,this.rsBlock=e,this.totalDataCount=r;break}}},u.prototype={get:function(t){var e=Math.floor(t/8);return this.buffer[e]>>>7-t%8&1},put:function(t,e){for(var o=0;e>o;o++)this.putBit(t>>>e-o-1&1)},putBit:function(t){var e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},o.exports=s});