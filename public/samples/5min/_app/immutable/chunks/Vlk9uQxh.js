var lo=Object.defineProperty;var co=(i,t,e)=>t in i?lo(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var nt=(i,t,e)=>co(i,typeof t!="symbol"?t+"":t,e);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ce="srgb",Wn="srgb-linear",tr="linear",jt="srgb";const _s="300 es";class Xn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(e);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}}const ve=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let vs=1234567;const oi=Math.PI/180,di=180/Math.PI;function yn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ve[i&255]+ve[i>>8&255]+ve[i>>16&255]+ve[i>>24&255]+"-"+ve[t&255]+ve[t>>8&255]+"-"+ve[t>>16&15|64]+ve[t>>24&255]+"-"+ve[e&63|128]+ve[e>>8&255]+"-"+ve[e>>16&255]+ve[e>>24&255]+ve[n&255]+ve[n>>8&255]+ve[n>>16&255]+ve[n>>24&255]).toLowerCase()}function me(i,t,e){return Math.max(t,Math.min(e,i))}function Zr(i,t){return(i%t+t)%t}function ho(i,t,e,n,r){return n+(i-t)*(r-n)/(e-t)}function uo(i,t,e){return i!==t?(e-i)/(t-i):0}function li(i,t,e){return(1-e)*i+e*t}function fo(i,t,e,n){return li(i,t,1-Math.exp(-e*n))}function po(i,t=1){return t-Math.abs(Zr(i,t*2)-t)}function mo(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function go(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function _o(i,t){return i+Math.floor(Math.random()*(t-i+1))}function vo(i,t){return i+Math.random()*(t-i)}function xo(i){return i*(.5-Math.random())}function Mo(i){i!==void 0&&(vs=i);let t=vs+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function So(i){return i*oi}function yo(i){return i*di}function Eo(i){return(i&i-1)===0&&i!==0}function To(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Ao(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function bo(i,t,e,n,r){const s=Math.cos,a=Math.sin,o=s(e/2),l=a(e/2),c=s((t+n)/2),u=a((t+n)/2),f=s((t-n)/2),d=a((t-n)/2),p=s((n-t)/2),_=a((n-t)/2);switch(r){case"XYX":i.set(o*u,l*f,l*d,o*c);break;case"YZY":i.set(l*d,o*u,l*f,o*c);break;case"ZXZ":i.set(l*f,l*d,o*u,o*c);break;case"XZX":i.set(o*u,l*_,l*p,o*c);break;case"YXY":i.set(l*p,o*u,l*_,o*c);break;case"ZYZ":i.set(l*_,l*p,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function zn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Me(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const pi={DEG2RAD:oi,RAD2DEG:di,generateUUID:yn,clamp:me,euclideanModulo:Zr,mapLinear:ho,inverseLerp:uo,lerp:li,damp:fo,pingpong:po,smoothstep:mo,smootherstep:go,randInt:_o,randFloat:vo,randFloatSpread:xo,seededRandom:Mo,degToRad:So,radToDeg:yo,isPowerOfTwo:Eo,ceilPowerOfTwo:To,floorPowerOfTwo:Ao,setQuaternionFromProperEuler:bo,normalize:Me,denormalize:zn};class it{constructor(t=0,e=0){it.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*n-a*r+t.x,this.y=s*r+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Dt{constructor(t,e,n,r,s,a,o,l,c){Dt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,l,c)}set(t,e,n,r,s,a,o,l,c){const u=this.elements;return u[0]=t,u[1]=r,u[2]=o,u[3]=e,u[4]=s,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],f=n[7],d=n[2],p=n[5],_=n[8],v=r[0],m=r[3],h=r[6],y=r[1],x=r[4],g=r[7],R=r[2],b=r[5],w=r[8];return s[0]=a*v+o*y+l*R,s[3]=a*m+o*x+l*b,s[6]=a*h+o*g+l*w,s[1]=c*v+u*y+f*R,s[4]=c*m+u*x+f*b,s[7]=c*h+u*g+f*w,s[2]=d*v+p*y+_*R,s[5]=d*m+p*x+_*b,s[8]=d*h+p*g+_*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-n*s*u+n*o*l+r*s*c-r*a*l}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],f=u*a-o*c,d=o*l-u*s,p=c*s-a*l,_=e*f+n*d+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return t[0]=f*v,t[1]=(r*c-u*n)*v,t[2]=(o*n-r*a)*v,t[3]=d*v,t[4]=(u*e-r*l)*v,t[5]=(r*s-o*e)*v,t[6]=p*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*s)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-r*c,r*l,-r*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(ar.makeScale(t,e)),this}rotate(t){return this.premultiply(ar.makeRotation(-t)),this}translate(t,e){return this.premultiply(ar.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ar=new Dt;function wa(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ki(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function wo(){const i=Ki("canvas");return i.style.display="block",i}const xs={};function si(i){i in xs||(xs[i]=!0,console.warn(i))}function Ro(i,t,e){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function Co(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Po(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const kt={enabled:!0,workingColorSpace:Wn,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===jt&&(i.r=Ke(i.r),i.g=Ke(i.g),i.b=Ke(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===jt&&(i.r=Hn(i.r),i.g=Hn(i.g),i.b=Hn(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===""?tr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Ke(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Hn(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Ms=[.64,.33,.3,.6,.15,.06],Ss=[.2126,.7152,.0722],ys=[.3127,.329],Es=new Dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ts=new Dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);kt.define({[Wn]:{primaries:Ms,whitePoint:ys,transfer:tr,toXYZ:Es,fromXYZ:Ts,luminanceCoefficients:Ss,workingColorSpaceConfig:{unpackColorSpace:Ce},outputColorSpaceConfig:{drawingBufferColorSpace:Ce}},[Ce]:{primaries:Ms,whitePoint:ys,transfer:jt,toXYZ:Es,fromXYZ:Ts,luminanceCoefficients:Ss,outputColorSpaceConfig:{drawingBufferColorSpace:Ce}}});let An;class Lo{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{An===void 0&&(An=Ki("canvas")),An.width=t.width,An.height=t.height;const n=An.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=An}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ki("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Ke(s[a]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ke(e[n]/255)*255):e[n]=Ke(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Do=0;class Ra{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Do++}),this.uuid=yn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(or(r[a].image)):s.push(or(r[a]))}else s=or(r);n.url=s}return e||(t.images[this.uuid]=n),n}}function or(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Lo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Uo=0;class Ee extends Xn{constructor(t=Ee.DEFAULT_IMAGE,e=Ee.DEFAULT_MAPPING,n=1001,r=1001,s=1006,a=1008,o=1023,l=1009,c=Ee.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Uo++}),this.uuid=yn(),this.name="",this.source=new Ra(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==300)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case 1e3:t.x=t.x-Math.floor(t.x);break;case 1001:t.x=t.x<0?0:1;break;case 1002:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case 1e3:t.y=t.y-Math.floor(t.y);break;case 1001:t.y=t.y<0?0:1;break;case 1002:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ee.DEFAULT_IMAGE=null;Ee.DEFAULT_MAPPING=300;Ee.DEFAULT_ANISOTROPY=1;class Xt{constructor(t=0,e=0,n=0,r=1){Xt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*e+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*e+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*e+a[7]*n+a[11]*r+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,s;const l=t.elements,c=l[0],u=l[4],f=l[8],d=l[1],p=l[5],_=l[9],v=l[2],m=l[6],h=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-v)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+v)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,g=(p+1)/2,R=(h+1)/2,b=(u+d)/4,w=(f+v)/4,L=(_+m)/4;return x>g&&x>R?x<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(x),r=b/n,s=w/n):g>R?g<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(g),n=b/r,s=L/r):R<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),n=w/s,r=L/s),this.set(n,r,s,e),this}let y=Math.sqrt((m-_)*(m-_)+(f-v)*(f-v)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(m-_)/y,this.y=(f-v)/y,this.z=(d-u)/y,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Io extends Xn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Xt(0,0,t,e),this.scissorTest=!1,this.viewport=new Xt(0,0,t,e);const r={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Ee(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,r=t.textures.length;n<r;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ra(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mn extends Io{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ca extends Ee{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Fo extends Ee{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qn{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,s,a,o){let l=n[r+0],c=n[r+1],u=n[r+2],f=n[r+3];const d=s[a+0],p=s[a+1],_=s[a+2],v=s[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f;return}if(o===1){t[e+0]=d,t[e+1]=p,t[e+2]=_,t[e+3]=v;return}if(f!==v||l!==d||c!==p||u!==_){let m=1-o;const h=l*d+c*p+u*_+f*v,y=h>=0?1:-1,x=1-h*h;if(x>Number.EPSILON){const R=Math.sqrt(x),b=Math.atan2(R,h*y);m=Math.sin(m*b)/R,o=Math.sin(o*b)/R}const g=o*y;if(l=l*m+d*g,c=c*m+p*g,u=u*m+_*g,f=f*m+v*g,m===1-o){const R=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=R,c*=R,u*=R,f*=R}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,r,s,a){const o=n[r],l=n[r+1],c=n[r+2],u=n[r+3],f=s[a],d=s[a+1],p=s[a+2],_=s[a+3];return t[e]=o*_+u*f+l*p-c*d,t[e+1]=l*_+u*d+c*f-o*p,t[e+2]=c*_+u*p+o*d-l*f,t[e+3]=u*_-o*f-l*d-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(r/2),f=o(s/2),d=l(n/2),p=l(r/2),_=l(s/2);switch(a){case"XYZ":this._x=d*u*f+c*p*_,this._y=c*p*f-d*u*_,this._z=c*u*_+d*p*f,this._w=c*u*f-d*p*_;break;case"YXZ":this._x=d*u*f+c*p*_,this._y=c*p*f-d*u*_,this._z=c*u*_-d*p*f,this._w=c*u*f+d*p*_;break;case"ZXY":this._x=d*u*f-c*p*_,this._y=c*p*f+d*u*_,this._z=c*u*_+d*p*f,this._w=c*u*f-d*p*_;break;case"ZYX":this._x=d*u*f-c*p*_,this._y=c*p*f+d*u*_,this._z=c*u*_-d*p*f,this._w=c*u*f+d*p*_;break;case"YZX":this._x=d*u*f+c*p*_,this._y=c*p*f+d*u*_,this._z=c*u*_-d*p*f,this._w=c*u*f-d*p*_;break;case"XZY":this._x=d*u*f-c*p*_,this._y=c*p*f-d*u*_,this._z=c*u*_+d*p*f,this._w=c*u*f+d*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],f=e[10],d=n+o+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(n>o&&n>f){const p=2*Math.sqrt(1+n-o-f);this._w=(u-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-n-f);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-n-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(me(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+a*o+r*c-s*l,this._y=r*u+a*l+s*o-n*c,this._z=s*u+a*c+n*l-r*o,this._w=a*u-n*o-r*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,s=this._z,a=this._w;let o=a*t._w+n*t._x+r*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*r+e*this._y,this._z=p*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),f=Math.sin((1-e)*u)/c,d=Math.sin(e*u)/c;return this._w=a*f+this._w*d,this._x=n*f+this._x*d,this._y=r*f+this._y*d,this._z=s*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(t=0,e=0,n=0){C.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(As.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(As.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*r,this.y=s[1]*e+s[4]*n+s[7]*r,this.z=s[2]*e+s[5]*n+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,s=t.elements,a=1/(s[3]*e+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*e+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*e+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*r-o*n),u=2*(o*e-s*r),f=2*(s*n-a*e);return this.x=e+l*c+a*f-o*u,this.y=n+l*u+o*c-s*f,this.z=r+l*f+s*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*r,this.y=s[1]*e+s[5]*n+s[9]*r,this.z=s[2]*e+s[6]*n+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=r*l-s*o,this.y=s*a-n*l,this.z=n*o-r*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return lr.copy(this).projectOnVector(t),this.sub(lr)}reflect(t){return this.sub(lr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const lr=new C,As=new qn;class En{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ne.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ne.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ne.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Ne):Ne.fromBufferAttribute(s,a),Ne.applyMatrix4(t.matrixWorld),this.expandByPoint(Ne);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),yi.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),yi.copy(n.boundingBox)),yi.applyMatrix4(t.matrixWorld),this.union(yi)}const r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ne),Ne.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(jn),Ei.subVectors(this.max,jn),bn.subVectors(t.a,jn),wn.subVectors(t.b,jn),Rn.subVectors(t.c,jn),tn.subVectors(wn,bn),en.subVectors(Rn,wn),hn.subVectors(bn,Rn);let e=[0,-tn.z,tn.y,0,-en.z,en.y,0,-hn.z,hn.y,tn.z,0,-tn.x,en.z,0,-en.x,hn.z,0,-hn.x,-tn.y,tn.x,0,-en.y,en.x,0,-hn.y,hn.x,0];return!cr(e,bn,wn,Rn,Ei)||(e=[1,0,0,0,1,0,0,0,1],!cr(e,bn,wn,Rn,Ei))?!1:(Ti.crossVectors(tn,en),e=[Ti.x,Ti.y,Ti.z],cr(e,bn,wn,Rn,Ei))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ne).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ne).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(qe[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),qe[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),qe[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),qe[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),qe[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),qe[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),qe[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),qe[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(qe),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const qe=[new C,new C,new C,new C,new C,new C,new C,new C],Ne=new C,yi=new En,bn=new C,wn=new C,Rn=new C,tn=new C,en=new C,hn=new C,jn=new C,Ei=new C,Ti=new C,un=new C;function cr(i,t,e,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){un.fromArray(i,s);const o=r.x*Math.abs(un.x)+r.y*Math.abs(un.y)+r.z*Math.abs(un.z),l=t.dot(un),c=e.dot(un),u=n.dot(un);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const No=new En,Qn=new C,hr=new C;class Yn{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):No.setFromPoints(t).getCenter(n);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Qn.subVectors(t,this.center);const e=Qn.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(Qn,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(hr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Qn.copy(t.center).add(hr)),this.expandByPoint(Qn.copy(t.center).sub(hr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ye=new C,ur=new C,Ai=new C,nn=new C,fr=new C,bi=new C,dr=new C;class Jr{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ye)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ye.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ye.copy(this.origin).addScaledVector(this.direction,e),Ye.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){ur.copy(t).add(e).multiplyScalar(.5),Ai.copy(e).sub(t).normalize(),nn.copy(this.origin).sub(ur);const s=t.distanceTo(e)*.5,a=-this.direction.dot(Ai),o=nn.dot(this.direction),l=-nn.dot(Ai),c=nn.lengthSq(),u=Math.abs(1-a*a);let f,d,p,_;if(u>0)if(f=a*l-o,d=a*o-l,_=s*u,f>=0)if(d>=-_)if(d<=_){const v=1/u;f*=v,d*=v,p=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;else d=-s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;else d<=-_?(f=Math.max(0,-(-a*s+o)),d=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+c):d<=_?(f=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(f=Math.max(0,-(a*s+o)),d=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+c);else d=a>0?-s:s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(ur).addScaledVector(Ai,d),p}intersectSphere(t,e){Ye.subVectors(t.center,this.origin);const n=Ye.dot(this.direction),r=Ye.dot(Ye)-n*n,s=t.radius*t.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,s,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,r=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,r=(t.min.x-d.x)*c),u>=0?(s=(t.min.y-d.y)*u,a=(t.max.y-d.y)*u):(s=(t.max.y-d.y)*u,a=(t.min.y-d.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(t.min.z-d.z)*f,l=(t.max.z-d.z)*f):(o=(t.max.z-d.z)*f,l=(t.min.z-d.z)*f),n>l||o>r)||((o>n||n!==n)&&(n=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,Ye)!==null}intersectTriangle(t,e,n,r,s){fr.subVectors(e,t),bi.subVectors(n,t),dr.crossVectors(fr,bi);let a=this.direction.dot(dr),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;nn.subVectors(this.origin,t);const l=o*this.direction.dot(bi.crossVectors(nn,bi));if(l<0)return null;const c=o*this.direction.dot(fr.cross(nn));if(c<0||l+c>a)return null;const u=-o*nn.dot(dr);return u<0?null:this.at(u/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Zt{constructor(t,e,n,r,s,a,o,l,c,u,f,d,p,_,v,m){Zt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,s,a,o,l,c,u,f,d,p,_,v,m)}set(t,e,n,r,s,a,o,l,c,u,f,d,p,_,v,m){const h=this.elements;return h[0]=t,h[4]=e,h[8]=n,h[12]=r,h[1]=s,h[5]=a,h[9]=o,h[13]=l,h[2]=c,h[6]=u,h[10]=f,h[14]=d,h[3]=p,h[7]=_,h[11]=v,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Zt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/Cn.setFromMatrixColumn(t,0).length(),s=1/Cn.setFromMatrixColumn(t,1).length(),a=1/Cn.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,s=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(t.order==="XYZ"){const d=a*u,p=a*f,_=o*u,v=o*f;e[0]=l*u,e[4]=-l*f,e[8]=c,e[1]=p+_*c,e[5]=d-v*c,e[9]=-o*l,e[2]=v-d*c,e[6]=_+p*c,e[10]=a*l}else if(t.order==="YXZ"){const d=l*u,p=l*f,_=c*u,v=c*f;e[0]=d+v*o,e[4]=_*o-p,e[8]=a*c,e[1]=a*f,e[5]=a*u,e[9]=-o,e[2]=p*o-_,e[6]=v+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*u,p=l*f,_=c*u,v=c*f;e[0]=d-v*o,e[4]=-a*f,e[8]=_+p*o,e[1]=p+_*o,e[5]=a*u,e[9]=v-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*u,p=a*f,_=o*u,v=o*f;e[0]=l*u,e[4]=_*c-p,e[8]=d*c+v,e[1]=l*f,e[5]=v*c+d,e[9]=p*c-_,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,p=a*c,_=o*l,v=o*c;e[0]=l*u,e[4]=v-d*f,e[8]=_*f+p,e[1]=f,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=p*f+_,e[10]=d-v*f}else if(t.order==="XZY"){const d=a*l,p=a*c,_=o*l,v=o*c;e[0]=l*u,e[4]=-f,e[8]=c*u,e[1]=d*f+v,e[5]=a*u,e[9]=p*f-_,e[2]=_*f-p,e[6]=o*u,e[10]=v*f+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Oo,t,Bo)}lookAt(t,e,n){const r=this.elements;return we.subVectors(t,e),we.lengthSq()===0&&(we.z=1),we.normalize(),rn.crossVectors(n,we),rn.lengthSq()===0&&(Math.abs(n.z)===1?we.x+=1e-4:we.z+=1e-4,we.normalize(),rn.crossVectors(n,we)),rn.normalize(),wi.crossVectors(we,rn),r[0]=rn.x,r[4]=wi.x,r[8]=we.x,r[1]=rn.y,r[5]=wi.y,r[9]=we.y,r[2]=rn.z,r[6]=wi.z,r[10]=we.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],f=n[5],d=n[9],p=n[13],_=n[2],v=n[6],m=n[10],h=n[14],y=n[3],x=n[7],g=n[11],R=n[15],b=r[0],w=r[4],L=r[8],T=r[12],S=r[1],P=r[5],O=r[9],N=r[13],V=r[2],Y=r[6],W=r[10],K=r[14],H=r[3],at=r[7],ft=r[11],yt=r[15];return s[0]=a*b+o*S+l*V+c*H,s[4]=a*w+o*P+l*Y+c*at,s[8]=a*L+o*O+l*W+c*ft,s[12]=a*T+o*N+l*K+c*yt,s[1]=u*b+f*S+d*V+p*H,s[5]=u*w+f*P+d*Y+p*at,s[9]=u*L+f*O+d*W+p*ft,s[13]=u*T+f*N+d*K+p*yt,s[2]=_*b+v*S+m*V+h*H,s[6]=_*w+v*P+m*Y+h*at,s[10]=_*L+v*O+m*W+h*ft,s[14]=_*T+v*N+m*K+h*yt,s[3]=y*b+x*S+g*V+R*H,s[7]=y*w+x*P+g*Y+R*at,s[11]=y*L+x*O+g*W+R*ft,s[15]=y*T+x*N+g*K+R*yt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],f=t[6],d=t[10],p=t[14],_=t[3],v=t[7],m=t[11],h=t[15];return _*(+s*l*f-r*c*f-s*o*d+n*c*d+r*o*p-n*l*p)+v*(+e*l*p-e*c*d+s*a*d-r*a*p+r*c*u-s*l*u)+m*(+e*c*f-e*o*p-s*a*f+n*a*p+s*o*u-n*c*u)+h*(-r*o*u-e*l*f+e*o*d+r*a*f-n*a*d+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],f=t[9],d=t[10],p=t[11],_=t[12],v=t[13],m=t[14],h=t[15],y=f*m*c-v*d*c+v*l*p-o*m*p-f*l*h+o*d*h,x=_*d*c-u*m*c-_*l*p+a*m*p+u*l*h-a*d*h,g=u*v*c-_*f*c+_*o*p-a*v*p-u*o*h+a*f*h,R=_*f*l-u*v*l-_*o*d+a*v*d+u*o*m-a*f*m,b=e*y+n*x+r*g+s*R;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/b;return t[0]=y*w,t[1]=(v*d*s-f*m*s-v*r*p+n*m*p+f*r*h-n*d*h)*w,t[2]=(o*m*s-v*l*s+v*r*c-n*m*c-o*r*h+n*l*h)*w,t[3]=(f*l*s-o*d*s-f*r*c+n*d*c+o*r*p-n*l*p)*w,t[4]=x*w,t[5]=(u*m*s-_*d*s+_*r*p-e*m*p-u*r*h+e*d*h)*w,t[6]=(_*l*s-a*m*s-_*r*c+e*m*c+a*r*h-e*l*h)*w,t[7]=(a*d*s-u*l*s+u*r*c-e*d*c-a*r*p+e*l*p)*w,t[8]=g*w,t[9]=(_*f*s-u*v*s-_*n*p+e*v*p+u*n*h-e*f*h)*w,t[10]=(a*v*s-_*o*s+_*n*c-e*v*c-a*n*h+e*o*h)*w,t[11]=(u*o*s-a*f*s-u*n*c+e*f*c+a*n*p-e*o*p)*w,t[12]=R*w,t[13]=(u*v*r-_*f*r+_*n*d-e*v*d-u*n*m+e*f*m)*w,t[14]=(_*o*r-a*v*r-_*n*l+e*v*l+a*n*m-e*o*m)*w,t[15]=(a*f*r-u*o*r+u*n*l-e*f*l-a*n*d+e*o*d)*w,this}scale(t){const e=this.elements,n=t.x,r=t.y,s=t.z;return e[0]*=n,e[4]*=r,e[8]*=s,e[1]*=n,e[5]*=r,e[9]*=s,e[2]*=n,e[6]*=r,e[10]*=s,e[3]*=n,e[7]*=r,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),s=1-n,a=t.x,o=t.y,l=t.z,c=s*a,u=s*o;return this.set(c*a+n,c*o-r*l,c*l+r*o,0,c*o+r*l,u*o+n,u*l-r*a,0,c*l-r*o,u*l+r*a,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,s,a){return this.set(1,n,s,0,t,1,a,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,u=a+a,f=o+o,d=s*c,p=s*u,_=s*f,v=a*u,m=a*f,h=o*f,y=l*c,x=l*u,g=l*f,R=n.x,b=n.y,w=n.z;return r[0]=(1-(v+h))*R,r[1]=(p+g)*R,r[2]=(_-x)*R,r[3]=0,r[4]=(p-g)*b,r[5]=(1-(d+h))*b,r[6]=(m+y)*b,r[7]=0,r[8]=(_+x)*w,r[9]=(m-y)*w,r[10]=(1-(d+v))*w,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let s=Cn.set(r[0],r[1],r[2]).length();const a=Cn.set(r[4],r[5],r[6]).length(),o=Cn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],Oe.copy(this);const c=1/s,u=1/a,f=1/o;return Oe.elements[0]*=c,Oe.elements[1]*=c,Oe.elements[2]*=c,Oe.elements[4]*=u,Oe.elements[5]*=u,Oe.elements[6]*=u,Oe.elements[8]*=f,Oe.elements[9]*=f,Oe.elements[10]*=f,e.setFromRotationMatrix(Oe),n.x=s,n.y=a,n.z=o,this}makePerspective(t,e,n,r,s,a,o=2e3){const l=this.elements,c=2*s/(e-t),u=2*s/(n-r),f=(e+t)/(e-t),d=(n+r)/(n-r);let p,_;if(o===2e3)p=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===2001)p=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,r,s,a,o=2e3){const l=this.elements,c=1/(e-t),u=1/(n-r),f=1/(a-s),d=(e+t)*c,p=(n+r)*u;let _,v;if(o===2e3)_=(a+s)*f,v=-2*f;else if(o===2001)_=s*f,v=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Cn=new C,Oe=new Zt,Oo=new C(0,0,0),Bo=new C(1,1,1),rn=new C,wi=new C,we=new C,bs=new Zt,ws=new qn;class He{constructor(t=0,e=0,n=0,r=He.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],u=r[9],f=r[2],d=r[6],p=r[10];switch(e){case"XYZ":this._y=Math.asin(me(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-me(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(me(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-me(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(me(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-me(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return bs.makeRotationFromQuaternion(t),this.setFromRotationMatrix(bs,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ws.setFromEuler(this),this.setFromQuaternion(ws,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}He.DEFAULT_ORDER="XYZ";class $r{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let zo=0;const Rs=new C,Pn=new qn,Ze=new Zt,Ri=new C,ti=new C,Go=new C,Vo=new qn,Cs=new C(1,0,0),Ps=new C(0,1,0),Ls=new C(0,0,1),Ds={type:"added"},Ho={type:"removed"},Ln={type:"childadded",child:null},pr={type:"childremoved",child:null};class ge extends Xn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zo++}),this.uuid=yn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ge.DEFAULT_UP.clone();const t=new C,e=new He,n=new qn,r=new C(1,1,1);function s(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Zt},normalMatrix:{value:new Dt}}),this.matrix=new Zt,this.matrixWorld=new Zt,this.matrixAutoUpdate=ge.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $r,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Pn.setFromAxisAngle(t,e),this.quaternion.multiply(Pn),this}rotateOnWorldAxis(t,e){return Pn.setFromAxisAngle(t,e),this.quaternion.premultiply(Pn),this}rotateX(t){return this.rotateOnAxis(Cs,t)}rotateY(t){return this.rotateOnAxis(Ps,t)}rotateZ(t){return this.rotateOnAxis(Ls,t)}translateOnAxis(t,e){return Rs.copy(t).applyQuaternion(this.quaternion),this.position.add(Rs.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Cs,t)}translateY(t){return this.translateOnAxis(Ps,t)}translateZ(t){return this.translateOnAxis(Ls,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ze.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ri.copy(t):Ri.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),ti.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ze.lookAt(ti,Ri,this.up):Ze.lookAt(Ri,ti,this.up),this.quaternion.setFromRotationMatrix(Ze),r&&(Ze.extractRotation(r.matrixWorld),Pn.setFromRotationMatrix(Ze),this.quaternion.premultiply(Pn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ds),Ln.child=t,this.dispatchEvent(Ln),Ln.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ho),pr.child=t,this.dispatchEvent(pr),pr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ze.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ze.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ze),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ds),Ln.child=t,this.dispatchEvent(Ln),Ln.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ti,t,Go),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ti,Vo,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(t.shapes,f)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),f=a(t.shapes),d=a(t.skeletons),p=a(t.animations),_=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=r,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}ge.DEFAULT_UP=new C(0,1,0);ge.DEFAULT_MATRIX_AUTO_UPDATE=!0;ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Be=new C,Je=new C,mr=new C,$e=new C,Dn=new C,Un=new C,Us=new C,gr=new C,_r=new C,vr=new C,xr=new Xt,Mr=new Xt,Sr=new Xt;class ze{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Be.subVectors(t,e),r.cross(Be);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,e,n,r,s){Be.subVectors(r,e),Je.subVectors(n,e),mr.subVectors(t,e);const a=Be.dot(Be),o=Be.dot(Je),l=Be.dot(mr),c=Je.dot(Je),u=Je.dot(mr),f=a*c-o*o;if(f===0)return s.set(0,0,0),null;const d=1/f,p=(c*l-o*u)*d,_=(a*u-o*l)*d;return s.set(1-p-_,_,p)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,$e)===null?!1:$e.x>=0&&$e.y>=0&&$e.x+$e.y<=1}static getInterpolation(t,e,n,r,s,a,o,l){return this.getBarycoord(t,e,n,r,$e)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,$e.x),l.addScaledVector(a,$e.y),l.addScaledVector(o,$e.z),l)}static getInterpolatedAttribute(t,e,n,r,s,a){return xr.setScalar(0),Mr.setScalar(0),Sr.setScalar(0),xr.fromBufferAttribute(t,e),Mr.fromBufferAttribute(t,n),Sr.fromBufferAttribute(t,r),a.setScalar(0),a.addScaledVector(xr,s.x),a.addScaledVector(Mr,s.y),a.addScaledVector(Sr,s.z),a}static isFrontFacing(t,e,n,r){return Be.subVectors(n,e),Je.subVectors(t,e),Be.cross(Je).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Be.subVectors(this.c,this.b),Je.subVectors(this.a,this.b),Be.cross(Je).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ze.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ze.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,s){return ze.getInterpolation(t,this.a,this.b,this.c,e,n,r,s)}containsPoint(t){return ze.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ze.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,s=this.c;let a,o;Dn.subVectors(r,n),Un.subVectors(s,n),gr.subVectors(t,n);const l=Dn.dot(gr),c=Un.dot(gr);if(l<=0&&c<=0)return e.copy(n);_r.subVectors(t,r);const u=Dn.dot(_r),f=Un.dot(_r);if(u>=0&&f<=u)return e.copy(r);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(n).addScaledVector(Dn,a);vr.subVectors(t,s);const p=Dn.dot(vr),_=Un.dot(vr);if(_>=0&&p<=_)return e.copy(s);const v=p*c-l*_;if(v<=0&&c>=0&&_<=0)return o=c/(c-_),e.copy(n).addScaledVector(Un,o);const m=u*_-p*f;if(m<=0&&f-u>=0&&p-_>=0)return Us.subVectors(s,r),o=(f-u)/(f-u+(p-_)),e.copy(r).addScaledVector(Us,o);const h=1/(m+v+d);return a=v*h,o=d*h,e.copy(n).addScaledVector(Dn,a).addScaledVector(Un,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Pa={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},sn={h:0,s:0,l:0},Ci={h:0,s:0,l:0};function yr(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class st{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ce){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,kt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,kt.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=kt.workingColorSpace){if(t=Zr(t,1),e=me(e,0,1),n=me(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,a=2*n-s;this.r=yr(a,s,t+1/3),this.g=yr(a,s,t),this.b=yr(a,s,t-1/3)}return kt.toWorkingColorSpace(this,r),this}setStyle(t,e=Ce){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ce){const n=Pa[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ke(t.r),this.g=Ke(t.g),this.b=Ke(t.b),this}copyLinearToSRGB(t){return this.r=Hn(t.r),this.g=Hn(t.g),this.b=Hn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ce){return kt.fromWorkingColorSpace(xe.copy(this),t),Math.round(me(xe.r*255,0,255))*65536+Math.round(me(xe.g*255,0,255))*256+Math.round(me(xe.b*255,0,255))}getHexString(t=Ce){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=kt.workingColorSpace){kt.fromWorkingColorSpace(xe.copy(this),e);const n=xe.r,r=xe.g,s=xe.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=u<=.5?f/(a+o):f/(2-a-o),a){case n:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-n)/f+2;break;case s:l=(n-r)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=kt.workingColorSpace){return kt.fromWorkingColorSpace(xe.copy(this),e),t.r=xe.r,t.g=xe.g,t.b=xe.b,t}getStyle(t=Ce){kt.fromWorkingColorSpace(xe.copy(this),t);const e=xe.r,n=xe.g,r=xe.b;return t!==Ce?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(sn),this.setHSL(sn.h+t,sn.s+e,sn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(sn),t.getHSL(Ci);const n=li(sn.h,Ci.h,e),r=li(sn.s,Ci.s,e),s=li(sn.l,Ci.l,e);return this.setHSL(n,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*r,this.g=s[1]*e+s[4]*n+s[7]*r,this.b=s[2]*e+s[5]*n+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const xe=new st;st.NAMES=Pa;let ko=0;class Zn extends Xn{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ko++}),this.uuid=yn(),this.name="",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new st(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(e){const s=r(t.textures),a=r(t.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class er extends Zn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new st(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new He,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const he=new C,Pi=new it;class $t{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Pi.fromBufferAttribute(this,e),Pi.applyMatrix3(t),this.setXY(e,Pi.x,Pi.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyMatrix3(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyMatrix4(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyNormalMatrix(t),this.setXYZ(e,he.x,he.y,he.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.transformDirection(t),this.setXYZ(e,he.x,he.y,he.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=zn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Me(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=zn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=zn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=zn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=zn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Me(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array),r=Me(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,s){return t*=this.itemSize,this.normalized&&(e=Me(e,this.array),n=Me(n,this.array),r=Me(r,this.array),s=Me(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==35044&&(t.usage=this.usage),t}}class La extends $t{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Da extends $t{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Kt extends $t{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Wo=0;const Ue=new Zt,Er=new ge,In=new C,Re=new En,ei=new En,pe=new C;class le extends Xn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wo++}),this.uuid=yn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(wa(t)?Da:La)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Dt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ue.makeRotationFromQuaternion(t),this.applyMatrix4(Ue),this}rotateX(t){return Ue.makeRotationX(t),this.applyMatrix4(Ue),this}rotateY(t){return Ue.makeRotationY(t),this.applyMatrix4(Ue),this}rotateZ(t){return Ue.makeRotationZ(t),this.applyMatrix4(Ue),this}translate(t,e,n){return Ue.makeTranslation(t,e,n),this.applyMatrix4(Ue),this}scale(t,e,n){return Ue.makeScale(t,e,n),this.applyMatrix4(Ue),this}lookAt(t){return Er.lookAt(t),Er.updateMatrix(),this.applyMatrix4(Er.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(In).negate(),this.translate(In.x,In.y,In.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let r=0,s=t.length;r<s;r++){const a=t[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Kt(n,3))}else{for(let n=0,r=e.count;n<r;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new En);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const s=e[n];Re.setFromBufferAttribute(s),this.morphTargetsRelative?(pe.addVectors(this.boundingBox.min,Re.min),this.boundingBox.expandByPoint(pe),pe.addVectors(this.boundingBox.max,Re.max),this.boundingBox.expandByPoint(pe)):(this.boundingBox.expandByPoint(Re.min),this.boundingBox.expandByPoint(Re.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const n=this.boundingSphere.center;if(Re.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];ei.setFromBufferAttribute(o),this.morphTargetsRelative?(pe.addVectors(Re.min,ei.min),Re.expandByPoint(pe),pe.addVectors(Re.max,ei.max),Re.expandByPoint(pe)):(Re.expandByPoint(ei.min),Re.expandByPoint(ei.max))}Re.getCenter(n);let r=0;for(let s=0,a=t.count;s<a;s++)pe.fromBufferAttribute(t,s),r=Math.max(r,n.distanceToSquared(pe));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)pe.fromBufferAttribute(o,c),l&&(In.fromBufferAttribute(t,c),pe.add(In)),r=Math.max(r,n.distanceToSquared(pe))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new $t(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let L=0;L<n.count;L++)o[L]=new C,l[L]=new C;const c=new C,u=new C,f=new C,d=new it,p=new it,_=new it,v=new C,m=new C;function h(L,T,S){c.fromBufferAttribute(n,L),u.fromBufferAttribute(n,T),f.fromBufferAttribute(n,S),d.fromBufferAttribute(s,L),p.fromBufferAttribute(s,T),_.fromBufferAttribute(s,S),u.sub(c),f.sub(c),p.sub(d),_.sub(d);const P=1/(p.x*_.y-_.x*p.y);isFinite(P)&&(v.copy(u).multiplyScalar(_.y).addScaledVector(f,-p.y).multiplyScalar(P),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(P),o[L].add(v),o[T].add(v),o[S].add(v),l[L].add(m),l[T].add(m),l[S].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let L=0,T=y.length;L<T;++L){const S=y[L],P=S.start,O=S.count;for(let N=P,V=P+O;N<V;N+=3)h(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const x=new C,g=new C,R=new C,b=new C;function w(L){R.fromBufferAttribute(r,L),b.copy(R);const T=o[L];x.copy(T),x.sub(R.multiplyScalar(R.dot(T))).normalize(),g.crossVectors(b,T);const P=g.dot(l[L])<0?-1:1;a.setXYZW(L,x.x,x.y,x.z,P)}for(let L=0,T=y.length;L<T;++L){const S=y[L],P=S.start,O=S.count;for(let N=P,V=P+O;N<V;N+=3)w(t.getX(N+0)),w(t.getX(N+1)),w(t.getX(N+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new $t(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const r=new C,s=new C,a=new C,o=new C,l=new C,c=new C,u=new C,f=new C;if(t)for(let d=0,p=t.count;d<p;d+=3){const _=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);r.fromBufferAttribute(e,_),s.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=e.count;d<p;d+=3)r.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)pe.fromBufferAttribute(t,e),pe.normalize(),t.setXYZ(e,pe.x,pe.y,pe.z)}toNonIndexed(){function t(o,l){const c=o.array,u=o.itemSize,f=o.normalized,d=new c.constructor(l.length*u);let p=0,_=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*u;for(let h=0;h<u;h++)d[_++]=c[p++]}return new $t(d,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new le,n=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=t(l,n);e.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,f=c.length;u<f;u++){const d=c[u],p=t(d,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const p=c[f];u.push(p.toJSON(t.data))}u.length>0&&(r[l]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const r=t.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(e))}const s=t.morphAttributes;for(const c in s){const u=[],f=s[c];for(let d=0,p=f.length;d<p;d++)u.push(f[d].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,u=a.length;c<u;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Is=new Zt,fn=new Jr,Li=new Yn,Fs=new C,Di=new C,Ui=new C,Ii=new C,Tr=new C,Fi=new C,Ns=new C,Ni=new C;class Ot extends ge{constructor(t=new le,e=new er){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(s&&o){Fi.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],f=s[l];u!==0&&(Tr.fromBufferAttribute(f,t),a?Fi.addScaledVector(Tr,u):Fi.addScaledVector(Tr.sub(e),u))}e.add(Fi)}return e}raycast(t,e){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Li.copy(n.boundingSphere),Li.applyMatrix4(s),fn.copy(t.ray).recast(t.near),!(Li.containsPoint(fn.origin)===!1&&(fn.intersectSphere(Li,Fs)===null||fn.origin.distanceToSquared(Fs)>(t.far-t.near)**2))&&(Is.copy(s).invert(),fn.copy(t.ray).applyMatrix4(Is),!(n.boundingBox!==null&&fn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,fn)))}_computeIntersections(t,e,n){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,v=d.length;_<v;_++){const m=d[_],h=a[m.materialIndex],y=Math.max(m.start,p.start),x=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let g=y,R=x;g<R;g+=3){const b=o.getX(g),w=o.getX(g+1),L=o.getX(g+2);r=Oi(this,h,t,n,c,u,f,b,w,L),r&&(r.faceIndex=Math.floor(g/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const _=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=_,h=v;m<h;m+=3){const y=o.getX(m),x=o.getX(m+1),g=o.getX(m+2);r=Oi(this,a,t,n,c,u,f,y,x,g),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,v=d.length;_<v;_++){const m=d[_],h=a[m.materialIndex],y=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let g=y,R=x;g<R;g+=3){const b=g,w=g+1,L=g+2;r=Oi(this,h,t,n,c,u,f,b,w,L),r&&(r.faceIndex=Math.floor(g/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const _=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=_,h=v;m<h;m+=3){const y=m,x=m+1,g=m+2;r=Oi(this,a,t,n,c,u,f,y,x,g),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function Xo(i,t,e,n,r,s,a,o){let l;if(t.side===1?l=n.intersectTriangle(a,s,r,!0,o):l=n.intersectTriangle(r,s,a,t.side===0,o),l===null)return null;Ni.copy(o),Ni.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ni);return c<e.near||c>e.far?null:{distance:c,point:Ni.clone(),object:i}}function Oi(i,t,e,n,r,s,a,o,l,c){i.getVertexPosition(o,Di),i.getVertexPosition(l,Ui),i.getVertexPosition(c,Ii);const u=Xo(i,t,e,n,Di,Ui,Ii,Ns);if(u){const f=new C;ze.getBarycoord(Ns,Di,Ui,Ii,f),r&&(u.uv=ze.getInterpolatedAttribute(r,o,l,c,f,new it)),s&&(u.uv1=ze.getInterpolatedAttribute(s,o,l,c,f,new it)),a&&(u.normal=ze.getInterpolatedAttribute(a,o,l,c,f,new C),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new C,materialIndex:0};ze.getNormal(Di,Ui,Ii,d.normal),u.face=d,u.barycoord=f}return u}class vi extends le{constructor(t=1,e=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],u=[],f=[];let d=0,p=0;_("z","y","x",-1,-1,n,e,t,a,s,0),_("z","y","x",1,-1,n,e,-t,a,s,1),_("x","z","y",1,1,t,n,e,r,a,2),_("x","z","y",1,-1,t,n,-e,r,a,3),_("x","y","z",1,-1,t,e,n,r,s,4),_("x","y","z",-1,-1,t,e,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Kt(c,3)),this.setAttribute("normal",new Kt(u,3)),this.setAttribute("uv",new Kt(f,2));function _(v,m,h,y,x,g,R,b,w,L,T){const S=g/w,P=R/L,O=g/2,N=R/2,V=b/2,Y=w+1,W=L+1;let K=0,H=0;const at=new C;for(let ft=0;ft<W;ft++){const yt=ft*P-N;for(let Ft=0;Ft<Y;Ft++){const Qt=Ft*S-O;at[v]=Qt*y,at[m]=yt*x,at[h]=V,c.push(at.x,at.y,at.z),at[v]=0,at[m]=0,at[h]=b>0?1:-1,u.push(at.x,at.y,at.z),f.push(Ft/w),f.push(1-ft/L),K+=1}}for(let ft=0;ft<L;ft++)for(let yt=0;yt<w;yt++){const Ft=d+yt+Y*ft,Qt=d+yt+Y*(ft+1),q=d+(yt+1)+Y*(ft+1),tt=d+(yt+1)+Y*ft;l.push(Ft,Qt,tt),l.push(Qt,q,tt),H+=6}o.addGroup(p,H,T),p+=H,d+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function kn(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const r=i[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function Se(i){const t={};for(let e=0;e<i.length;e++){const n=kn(i[e]);for(const r in n)t[r]=n[r]}return t}function qo(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Ua(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:kt.workingColorSpace}const ci={clone:kn,merge:Se};var Yo=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zo=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ue extends Zn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Yo,this.fragmentShader=Zo,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=kn(t.uniforms),this.uniformsGroups=qo(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?e.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[r]={type:"m4",value:a.toArray()}:e.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Ia extends ge{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Zt,this.projectionMatrix=new Zt,this.projectionMatrixInverse=new Zt,this.coordinateSystem=2e3}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const an=new C,Os=new it,Bs=new it;class Ae extends Ia{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=di*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(oi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return di*2*Math.atan(Math.tan(oi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){an.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(an.x,an.y).multiplyScalar(-t/an.z),an.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(an.x,an.y).multiplyScalar(-t/an.z)}getViewSize(t,e){return this.getViewBounds(t,Os,Bs),e.subVectors(Bs,Os)}setViewOffset(t,e,n,r,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(oi*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,e-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Fn=-90,Nn=1;class Jo extends ge{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ae(Fn,Nn,t,e);r.layers=this.layers,this.add(r);const s=new Ae(Fn,Nn,t,e);s.layers=this.layers,this.add(s);const a=new Ae(Fn,Nn,t,e);a.layers=this.layers,this.add(a);const o=new Ae(Fn,Nn,t,e);o.layers=this.layers,this.add(o);const l=new Ae(Fn,Nn,t,e);l.layers=this.layers,this.add(l);const c=new Ae(Fn,Nn,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,s,a,o,l]=e;for(const c of e)this.remove(c);if(t===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,u]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,s),t.setRenderTarget(n,1,r),t.render(e,a),t.setRenderTarget(n,2,r),t.render(e,o),t.setRenderTarget(n,3,r),t.render(e,l),t.setRenderTarget(n,4,r),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,r),t.render(e,u),t.setRenderTarget(f,d,p),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Fa extends Ee{constructor(t,e,n,r,s,a,o,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:301,super(t,e,n,r,s,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class $o extends Mn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new Fa(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:1006}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new vi(5,5,5),s=new ue({name:"CubemapFromEquirect",uniforms:kn(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=e;const a=new Ot(r,s),o=e.minFilter;return e.minFilter===1008&&(e.minFilter=1006),new Jo(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,r){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,r);t.setRenderTarget(s)}}const Ar=new C,Ko=new C,jo=new Dt;class gn{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=Ar.subVectors(n,e).cross(Ko.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ar),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||jo.getNormalMatrix(t),r=this.coplanarPoint(Ar).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const dn=new Yn,Bi=new C;class Kr{constructor(t=new gn,e=new gn,n=new gn,r=new gn,s=new gn,a=new gn){this.planes=[t,e,n,r,s,a]}set(t,e,n,r,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=2e3){const n=this.planes,r=t.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],u=r[5],f=r[6],d=r[7],p=r[8],_=r[9],v=r[10],m=r[11],h=r[12],y=r[13],x=r[14],g=r[15];if(n[0].setComponents(l-s,d-c,m-p,g-h).normalize(),n[1].setComponents(l+s,d+c,m+p,g+h).normalize(),n[2].setComponents(l+a,d+u,m+_,g+y).normalize(),n[3].setComponents(l-a,d-u,m-_,g-y).normalize(),n[4].setComponents(l-o,d-f,m-v,g-x).normalize(),e===2e3)n[5].setComponents(l+o,d+f,m+v,g+x).normalize();else if(e===2001)n[5].setComponents(o,f,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),dn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),dn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(dn)}intersectsSprite(t){return dn.center.set(0,0,0),dn.radius=.7071067811865476,dn.applyMatrix4(t.matrixWorld),this.intersectsSphere(dn)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(Bi.x=r.normal.x>0?t.max.x:t.min.x,Bi.y=r.normal.y>0?t.max.y:t.min.y,Bi.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(Bi)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Na(){let i=null,t=!1,e=null,n=null;function r(s,a){e(s,a),n=i.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(r),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){i=s}}}function Qo(i){const t=new WeakMap;function e(o,l){const c=o.array,u=o.usage,f=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){const u=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,u);else{f.sort((p,_)=>p.start-_.start);let d=0;for(let p=1;p<f.length;p++){const _=f[d],v=f[p];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++d,f[d]=v)}f.length=d+1;for(let p=0,_=f.length;p<_;p++){const v=f[p];i.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}class on extends le{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const s=t/2,a=e/2,o=Math.floor(n),l=Math.floor(r),c=o+1,u=l+1,f=t/o,d=e/l,p=[],_=[],v=[],m=[];for(let h=0;h<u;h++){const y=h*d-a;for(let x=0;x<c;x++){const g=x*f-s;_.push(g,-y,0),v.push(0,0,1),m.push(x/o),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let y=0;y<o;y++){const x=y+c*h,g=y+c*(h+1),R=y+1+c*(h+1),b=y+1+c*h;p.push(x,g,b),p.push(g,R,b)}this.setIndex(p),this.setAttribute("position",new Kt(_,3)),this.setAttribute("normal",new Kt(v,3)),this.setAttribute("uv",new Kt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new on(t.width,t.height,t.widthSegments,t.heightSegments)}}var tl=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,el=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,nl=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,il=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rl=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,sl=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,al=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ol=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ll=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,cl=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hl=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ul=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fl=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,dl=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,pl=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ml=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,gl=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_l=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vl=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xl=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ml=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Sl=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,yl=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,El=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Tl=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Al=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,bl=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wl=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rl=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Cl=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Pl="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ll=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Dl=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ul=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Il=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Fl=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Nl=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ol=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bl=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zl=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gl=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vl=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Hl=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kl=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Wl=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Xl=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,ql=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Yl=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zl=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Jl=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$l=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Kl=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,jl=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ql=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,tc=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ec=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,nc=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ic=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rc=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sc=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ac=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,oc=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lc=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,cc=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hc=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,uc=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fc=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,dc=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pc=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mc=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,gc=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_c=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,vc=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,xc=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mc=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sc=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,yc=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ec=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tc=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ac=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bc=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wc=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rc=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Cc=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pc=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Lc=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dc=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Uc=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ic=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fc=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Nc=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Oc=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Bc=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,zc=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gc=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Vc=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Hc=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,kc=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wc=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xc=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qc=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Yc=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Zc=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Jc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$c=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Kc=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,jc=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qc=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,th=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nh=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ih=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rh=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sh=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ah=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,oh=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,lh=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ch=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hh=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uh=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fh=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dh=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ph=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mh=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gh=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_h=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,vh=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xh=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Mh=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Sh=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yh=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Eh=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Th=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ah=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bh=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wh=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Rh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ch=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ph=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Lh=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Dh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,It={alphahash_fragment:tl,alphahash_pars_fragment:el,alphamap_fragment:nl,alphamap_pars_fragment:il,alphatest_fragment:rl,alphatest_pars_fragment:sl,aomap_fragment:al,aomap_pars_fragment:ol,batching_pars_vertex:ll,batching_vertex:cl,begin_vertex:hl,beginnormal_vertex:ul,bsdfs:fl,iridescence_fragment:dl,bumpmap_pars_fragment:pl,clipping_planes_fragment:ml,clipping_planes_pars_fragment:gl,clipping_planes_pars_vertex:_l,clipping_planes_vertex:vl,color_fragment:xl,color_pars_fragment:Ml,color_pars_vertex:Sl,color_vertex:yl,common:El,cube_uv_reflection_fragment:Tl,defaultnormal_vertex:Al,displacementmap_pars_vertex:bl,displacementmap_vertex:wl,emissivemap_fragment:Rl,emissivemap_pars_fragment:Cl,colorspace_fragment:Pl,colorspace_pars_fragment:Ll,envmap_fragment:Dl,envmap_common_pars_fragment:Ul,envmap_pars_fragment:Il,envmap_pars_vertex:Fl,envmap_physical_pars_fragment:ql,envmap_vertex:Nl,fog_vertex:Ol,fog_pars_vertex:Bl,fog_fragment:zl,fog_pars_fragment:Gl,gradientmap_pars_fragment:Vl,lightmap_pars_fragment:Hl,lights_lambert_fragment:kl,lights_lambert_pars_fragment:Wl,lights_pars_begin:Xl,lights_toon_fragment:Yl,lights_toon_pars_fragment:Zl,lights_phong_fragment:Jl,lights_phong_pars_fragment:$l,lights_physical_fragment:Kl,lights_physical_pars_fragment:jl,lights_fragment_begin:Ql,lights_fragment_maps:tc,lights_fragment_end:ec,logdepthbuf_fragment:nc,logdepthbuf_pars_fragment:ic,logdepthbuf_pars_vertex:rc,logdepthbuf_vertex:sc,map_fragment:ac,map_pars_fragment:oc,map_particle_fragment:lc,map_particle_pars_fragment:cc,metalnessmap_fragment:hc,metalnessmap_pars_fragment:uc,morphinstance_vertex:fc,morphcolor_vertex:dc,morphnormal_vertex:pc,morphtarget_pars_vertex:mc,morphtarget_vertex:gc,normal_fragment_begin:_c,normal_fragment_maps:vc,normal_pars_fragment:xc,normal_pars_vertex:Mc,normal_vertex:Sc,normalmap_pars_fragment:yc,clearcoat_normal_fragment_begin:Ec,clearcoat_normal_fragment_maps:Tc,clearcoat_pars_fragment:Ac,iridescence_pars_fragment:bc,opaque_fragment:wc,packing:Rc,premultiplied_alpha_fragment:Cc,project_vertex:Pc,dithering_fragment:Lc,dithering_pars_fragment:Dc,roughnessmap_fragment:Uc,roughnessmap_pars_fragment:Ic,shadowmap_pars_fragment:Fc,shadowmap_pars_vertex:Nc,shadowmap_vertex:Oc,shadowmask_pars_fragment:Bc,skinbase_vertex:zc,skinning_pars_vertex:Gc,skinning_vertex:Vc,skinnormal_vertex:Hc,specularmap_fragment:kc,specularmap_pars_fragment:Wc,tonemapping_fragment:Xc,tonemapping_pars_fragment:qc,transmission_fragment:Yc,transmission_pars_fragment:Zc,uv_pars_fragment:Jc,uv_pars_vertex:$c,uv_vertex:Kc,worldpos_vertex:jc,background_vert:Qc,background_frag:th,backgroundCube_vert:eh,backgroundCube_frag:nh,cube_vert:ih,cube_frag:rh,depth_vert:sh,depth_frag:ah,distanceRGBA_vert:oh,distanceRGBA_frag:lh,equirect_vert:ch,equirect_frag:hh,linedashed_vert:uh,linedashed_frag:fh,meshbasic_vert:dh,meshbasic_frag:ph,meshlambert_vert:mh,meshlambert_frag:gh,meshmatcap_vert:_h,meshmatcap_frag:vh,meshnormal_vert:xh,meshnormal_frag:Mh,meshphong_vert:Sh,meshphong_frag:yh,meshphysical_vert:Eh,meshphysical_frag:Th,meshtoon_vert:Ah,meshtoon_frag:bh,points_vert:wh,points_frag:Rh,shadow_vert:Ch,shadow_frag:Ph,sprite_vert:Lh,sprite_frag:Dh},et={common:{diffuse:{value:new st(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Dt},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Dt}},envmap:{envMap:{value:null},envMapRotation:{value:new Dt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Dt},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new st(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new st(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0},uvTransform:{value:new Dt}},sprite:{diffuse:{value:new st(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Dt},alphaMap:{value:null},alphaMapTransform:{value:new Dt},alphaTest:{value:0}}},Ve={basic:{uniforms:Se([et.common,et.specularmap,et.envmap,et.aomap,et.lightmap,et.fog]),vertexShader:It.meshbasic_vert,fragmentShader:It.meshbasic_frag},lambert:{uniforms:Se([et.common,et.specularmap,et.envmap,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.fog,et.lights,{emissive:{value:new st(0)}}]),vertexShader:It.meshlambert_vert,fragmentShader:It.meshlambert_frag},phong:{uniforms:Se([et.common,et.specularmap,et.envmap,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.fog,et.lights,{emissive:{value:new st(0)},specular:{value:new st(1118481)},shininess:{value:30}}]),vertexShader:It.meshphong_vert,fragmentShader:It.meshphong_frag},standard:{uniforms:Se([et.common,et.envmap,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.roughnessmap,et.metalnessmap,et.fog,et.lights,{emissive:{value:new st(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:It.meshphysical_vert,fragmentShader:It.meshphysical_frag},toon:{uniforms:Se([et.common,et.aomap,et.lightmap,et.emissivemap,et.bumpmap,et.normalmap,et.displacementmap,et.gradientmap,et.fog,et.lights,{emissive:{value:new st(0)}}]),vertexShader:It.meshtoon_vert,fragmentShader:It.meshtoon_frag},matcap:{uniforms:Se([et.common,et.bumpmap,et.normalmap,et.displacementmap,et.fog,{matcap:{value:null}}]),vertexShader:It.meshmatcap_vert,fragmentShader:It.meshmatcap_frag},points:{uniforms:Se([et.points,et.fog]),vertexShader:It.points_vert,fragmentShader:It.points_frag},dashed:{uniforms:Se([et.common,et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:It.linedashed_vert,fragmentShader:It.linedashed_frag},depth:{uniforms:Se([et.common,et.displacementmap]),vertexShader:It.depth_vert,fragmentShader:It.depth_frag},normal:{uniforms:Se([et.common,et.bumpmap,et.normalmap,et.displacementmap,{opacity:{value:1}}]),vertexShader:It.meshnormal_vert,fragmentShader:It.meshnormal_frag},sprite:{uniforms:Se([et.sprite,et.fog]),vertexShader:It.sprite_vert,fragmentShader:It.sprite_frag},background:{uniforms:{uvTransform:{value:new Dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:It.background_vert,fragmentShader:It.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Dt}},vertexShader:It.backgroundCube_vert,fragmentShader:It.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:It.cube_vert,fragmentShader:It.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:It.equirect_vert,fragmentShader:It.equirect_frag},distanceRGBA:{uniforms:Se([et.common,et.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:It.distanceRGBA_vert,fragmentShader:It.distanceRGBA_frag},shadow:{uniforms:Se([et.lights,et.fog,{color:{value:new st(0)},opacity:{value:1}}]),vertexShader:It.shadow_vert,fragmentShader:It.shadow_frag}};Ve.physical={uniforms:Se([Ve.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Dt},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Dt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Dt},sheen:{value:0},sheenColor:{value:new st(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Dt},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Dt},attenuationDistance:{value:0},attenuationColor:{value:new st(0)},specularColor:{value:new st(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Dt},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Dt}}]),vertexShader:It.meshphysical_vert,fragmentShader:It.meshphysical_frag};const zi={r:0,b:0,g:0},pn=new He,Uh=new Zt;function Ih(i,t,e,n,r,s,a){const o=new st(0);let l=s===!0?0:1,c,u,f=null,d=0,p=null;function _(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?e:t).get(x)),x}function v(y){let x=!1;const g=_(y);g===null?h(o,l):g&&g.isColor&&(h(g,1),x=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(y,x){const g=_(x);g&&(g.isCubeTexture||g.mapping===306)?(u===void 0&&(u=new Ot(new vi(1,1,1),new ue({name:"BackgroundCubeMaterial",uniforms:kn(Ve.backgroundCube.uniforms),vertexShader:Ve.backgroundCube.vertexShader,fragmentShader:Ve.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,b,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),pn.copy(x.backgroundRotation),pn.x*=-1,pn.y*=-1,pn.z*=-1,g.isCubeTexture&&g.isRenderTargetTexture===!1&&(pn.y*=-1,pn.z*=-1),u.material.uniforms.envMap.value=g,u.material.uniforms.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Uh.makeRotationFromEuler(pn)),u.material.toneMapped=kt.getTransfer(g.colorSpace)!==jt,(f!==g||d!==g.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,f=g,d=g.version,p=i.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):g&&g.isTexture&&(c===void 0&&(c=new Ot(new on(2,2),new ue({name:"BackgroundMaterial",uniforms:kn(Ve.background.uniforms),vertexShader:Ve.background.vertexShader,fragmentShader:Ve.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=g,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=kt.getTransfer(g.colorSpace)!==jt,g.matrixAutoUpdate===!0&&g.updateMatrix(),c.material.uniforms.uvTransform.value.copy(g.matrix),(f!==g||d!==g.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,f=g,d=g.version,p=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function h(y,x){y.getRGB(zi,Ua(i)),n.buffers.color.setClear(zi.r,zi.g,zi.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(y,x=1){o.set(y),l=x,h(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,h(o,l)},render:v,addToRenderList:m}}function Fh(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=d(null);let s=r,a=!1;function o(S,P,O,N,V){let Y=!1;const W=f(N,O,P);s!==W&&(s=W,c(s.object)),Y=p(S,N,O,V),Y&&_(S,N,O,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,g(S,P,O,N),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return i.createVertexArray()}function c(S){return i.bindVertexArray(S)}function u(S){return i.deleteVertexArray(S)}function f(S,P,O){const N=O.wireframe===!0;let V=n[S.id];V===void 0&&(V={},n[S.id]=V);let Y=V[P.id];Y===void 0&&(Y={},V[P.id]=Y);let W=Y[N];return W===void 0&&(W=d(l()),Y[N]=W),W}function d(S){const P=[],O=[],N=[];for(let V=0;V<e;V++)P[V]=0,O[V]=0,N[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:O,attributeDivisors:N,object:S,attributes:{},index:null}}function p(S,P,O,N){const V=s.attributes,Y=P.attributes;let W=0;const K=O.getAttributes();for(const H in K)if(K[H].location>=0){const ft=V[H];let yt=Y[H];if(yt===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(yt=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(yt=S.instanceColor)),ft===void 0||ft.attribute!==yt||yt&&ft.data!==yt.data)return!0;W++}return s.attributesNum!==W||s.index!==N}function _(S,P,O,N){const V={},Y=P.attributes;let W=0;const K=O.getAttributes();for(const H in K)if(K[H].location>=0){let ft=Y[H];ft===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(ft=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(ft=S.instanceColor));const yt={};yt.attribute=ft,ft&&ft.data&&(yt.data=ft.data),V[H]=yt,W++}s.attributes=V,s.attributesNum=W,s.index=N}function v(){const S=s.newAttributes;for(let P=0,O=S.length;P<O;P++)S[P]=0}function m(S){h(S,0)}function h(S,P){const O=s.newAttributes,N=s.enabledAttributes,V=s.attributeDivisors;O[S]=1,N[S]===0&&(i.enableVertexAttribArray(S),N[S]=1),V[S]!==P&&(i.vertexAttribDivisor(S,P),V[S]=P)}function y(){const S=s.newAttributes,P=s.enabledAttributes;for(let O=0,N=P.length;O<N;O++)P[O]!==S[O]&&(i.disableVertexAttribArray(O),P[O]=0)}function x(S,P,O,N,V,Y,W){W===!0?i.vertexAttribIPointer(S,P,O,V,Y):i.vertexAttribPointer(S,P,O,N,V,Y)}function g(S,P,O,N){v();const V=N.attributes,Y=O.getAttributes(),W=P.defaultAttributeValues;for(const K in Y){const H=Y[K];if(H.location>=0){let at=V[K];if(at===void 0&&(K==="instanceMatrix"&&S.instanceMatrix&&(at=S.instanceMatrix),K==="instanceColor"&&S.instanceColor&&(at=S.instanceColor)),at!==void 0){const ft=at.normalized,yt=at.itemSize,Ft=t.get(at);if(Ft===void 0)continue;const Qt=Ft.buffer,q=Ft.type,tt=Ft.bytesPerElement,xt=q===i.INT||q===i.UNSIGNED_INT||at.gpuType===1013;if(at.isInterleavedBufferAttribute){const ot=at.data,bt=ot.stride,Ct=at.offset;if(ot.isInstancedInterleavedBuffer){for(let Nt=0;Nt<H.locationSize;Nt++)h(H.location+Nt,ot.meshPerAttribute);S.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Nt=0;Nt<H.locationSize;Nt++)m(H.location+Nt);i.bindBuffer(i.ARRAY_BUFFER,Qt);for(let Nt=0;Nt<H.locationSize;Nt++)x(H.location+Nt,yt/H.locationSize,q,ft,bt*tt,(Ct+yt/H.locationSize*Nt)*tt,xt)}else{if(at.isInstancedBufferAttribute){for(let ot=0;ot<H.locationSize;ot++)h(H.location+ot,at.meshPerAttribute);S.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let ot=0;ot<H.locationSize;ot++)m(H.location+ot);i.bindBuffer(i.ARRAY_BUFFER,Qt);for(let ot=0;ot<H.locationSize;ot++)x(H.location+ot,yt/H.locationSize,q,ft,yt*tt,yt/H.locationSize*ot*tt,xt)}}else if(W!==void 0){const ft=W[K];if(ft!==void 0)switch(ft.length){case 2:i.vertexAttrib2fv(H.location,ft);break;case 3:i.vertexAttrib3fv(H.location,ft);break;case 4:i.vertexAttrib4fv(H.location,ft);break;default:i.vertexAttrib1fv(H.location,ft)}}}}y()}function R(){L();for(const S in n){const P=n[S];for(const O in P){const N=P[O];for(const V in N)u(N[V].object),delete N[V];delete P[O]}delete n[S]}}function b(S){if(n[S.id]===void 0)return;const P=n[S.id];for(const O in P){const N=P[O];for(const V in N)u(N[V].object),delete N[V];delete P[O]}delete n[S.id]}function w(S){for(const P in n){const O=n[P];if(O[S.id]===void 0)continue;const N=O[S.id];for(const V in N)u(N[V].object),delete N[V];delete O[S.id]}}function L(){T(),a=!0,s!==r&&(s=r,c(s.object))}function T(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:L,resetDefaultState:T,dispose:R,releaseStatesOfGeometry:b,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:m,disableUnusedAttributes:y}}function Nh(i,t,e){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),e.update(u,n,1)}function a(c,u,f){f!==0&&(i.drawArraysInstanced(n,c,u,f),e.update(u,n,f))}function o(c,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,f);let p=0;for(let _=0;_<f;_++)p+=u[_];e.update(p,n,1)}function l(c,u,f,d){if(f===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<c.length;_++)a(c[_],u[_],d[_]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,f);let _=0;for(let v=0;v<f;v++)_+=u[v]*d[v];e.update(_,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Oh(i,t,e,n){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");r=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(w){return!(w!==1023&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const L=w===1016&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==1009&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==1015&&!L)}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),g=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=_>0,b=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:y,maxVaryings:x,maxFragmentUniforms:g,vertexTextures:R,maxSamples:b}}function Bh(i){const t=this;let e=null,n=0,r=!1,s=!1;const a=new gn,o=new Dt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||n!==0||r;return r=d,n=f.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){e=u(f,d,0)},this.setState=function(f,d,p){const _=f.clippingPlanes,v=f.clipIntersection,m=f.clipShadows,h=i.get(f);if(!r||_===null||_.length===0||s&&!m)s?u(null):c();else{const y=s?0:n,x=y*4;let g=h.clippingState||null;l.value=g,g=u(_,d,x,p);for(let R=0;R!==x;++R)g[R]=e[R];h.clippingState=g,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(f,d,p,_){const v=f!==null?f.length:0;let m=null;if(v!==0){if(m=l.value,_!==!0||m===null){const h=p+v*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<h)&&(m=new Float32Array(h));for(let x=0,g=p;x!==v;++x,g+=4)a.copy(f[x]).applyMatrix4(y,o),a.normal.toArray(m,g),m[g+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function zh(i){let t=new WeakMap;function e(a,o){return o===303?a.mapping=301:o===304&&(a.mapping=302),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===303||o===304)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new $o(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",r),e(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Oa extends Ia{constructor(t=-1,e=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-t,a=n+t,o=r+e,l=r-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Gn=4,zs=[.125,.215,.35,.446,.526,.582],vn=20,br=new Oa,Gs=new st;let wr=null,Rr=0,Cr=0,Pr=!1;const _n=(1+Math.sqrt(5))/2,On=1/_n,Vs=[new C(-_n,On,0),new C(_n,On,0),new C(-On,0,_n),new C(On,0,_n),new C(0,_n,-On),new C(0,_n,On),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class Hs{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){wr=this._renderer.getRenderTarget(),Rr=this._renderer.getActiveCubeFace(),Cr=this._renderer.getActiveMipmapLevel(),Pr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,r,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xs(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ws(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(wr,Rr,Cr),this._renderer.xr.enabled=Pr,t.scissorTest=!1,Gi(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===301||t.mapping===302?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),wr=this._renderer.getRenderTarget(),Rr=this._renderer.getActiveCubeFace(),Cr=this._renderer.getActiveMipmapLevel(),Pr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:Wn,depthBuffer:!1},r=ks(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ks(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Gh(s)),this._blurMaterial=Vh(s,t,e)}return r}_compileMaterial(t){const e=new Ot(this._lodPlanes[0],t);this._renderer.compile(e,br)}_sceneToCubeUV(t,e,n,r){const o=new Ae(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Gs),u.toneMapping=0,u.autoClear=!1;const p=new er({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),_=new Ot(new vi,p);let v=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,v=!0):(p.color.copy(Gs),v=!0);for(let h=0;h<6;h++){const y=h%3;y===0?(o.up.set(0,l[h],0),o.lookAt(c[h],0,0)):y===1?(o.up.set(0,0,l[h]),o.lookAt(0,c[h],0)):(o.up.set(0,l[h],0),o.lookAt(0,0,c[h]));const x=this._cubeSize;Gi(r,y*x,h>2?x:0,x,x),u.setRenderTarget(r),v&&u.render(_,o),u.render(t,o)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===301||t.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xs()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ws());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Ot(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;Gi(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,br)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Vs[(r-s-1)%Vs.length];this._blur(t,s-1,s,a,o)}e.autoClear=n}_blur(t,e,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,r,"latitudinal",s),this._halfBlur(a,t,n,n,r,"longitudinal",s)}_halfBlur(t,e,n,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Ot(this._lodPlanes[r],c),d=c.uniforms,p=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*vn-1),v=s/_,m=isFinite(s)?1+Math.floor(u*v):vn;m>vn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${vn}`);const h=[];let y=0;for(let w=0;w<vn;++w){const L=w/v,T=Math.exp(-L*L/2);h.push(T),w===0?y+=T:w<m&&(y+=2*T)}for(let w=0;w<h.length;w++)h[w]=h[w]/y;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=h,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:x}=this;d.dTheta.value=_,d.mipInt.value=x-n;const g=this._sizeLods[r],R=3*g*(r>x-Gn?r-x+Gn:0),b=4*(this._cubeSize-g);Gi(e,R,b,3*g,2*g),l.setRenderTarget(e),l.render(f,br)}}function Gh(i){const t=[],e=[],n=[];let r=i;const s=i-Gn+1+zs.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>i-Gn?l=zs[a-i+Gn-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),u=-c,f=1+c,d=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,_=6,v=3,m=2,h=1,y=new Float32Array(v*_*p),x=new Float32Array(m*_*p),g=new Float32Array(h*_*p);for(let b=0;b<p;b++){const w=b%3*2/3-1,L=b>2?0:-1,T=[w,L,0,w+2/3,L,0,w+2/3,L+1,0,w,L,0,w+2/3,L+1,0,w,L+1,0];y.set(T,v*_*b),x.set(d,m*_*b);const S=[b,b,b,b,b,b];g.set(S,h*_*b)}const R=new le;R.setAttribute("position",new $t(y,v)),R.setAttribute("uv",new $t(x,m)),R.setAttribute("faceIndex",new $t(g,h)),t.push(R),r>Gn&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function ks(i,t,e){const n=new Mn(i,t,e);return n.texture.mapping=306,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Gi(i,t,e,n,r){i.viewport.set(t,e,n,r),i.scissor.set(t,e,n,r)}function Vh(i,t,e){const n=new Float32Array(vn),r=new C(0,1,0);return new ue({name:"SphericalGaussianBlur",defines:{n:vn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:jr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ws(){return new ue({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Xs(){return new ue({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function jr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Hh(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===303||l===304,u=l===301||l===302;if(c||u){let f=t.get(o);const d=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new Hs(i)),f=c?e.fromEquirectangular(o,f):e.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),f.texture;if(f!==void 0)return f.texture;{const p=o.image;return c&&p&&p.height>0||u&&p&&r(p)?(e===null&&(e=new Hs(i)),f=c?e.fromEquirectangular(o):e.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,t.set(o,f),o.addEventListener("dispose",s),f.texture):null}}}return o}function r(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function kh(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&si("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Wh(i,t,e,n){const r={},s=new WeakMap;function a(f){const d=f.target;d.index!==null&&t.remove(d.index);for(const _ in d.attributes)t.remove(d.attributes[_]);for(const _ in d.morphAttributes){const v=d.morphAttributes[_];for(let m=0,h=v.length;m<h;m++)t.remove(v[m])}d.removeEventListener("dispose",a),delete r[d.id];const p=s.get(d);p&&(t.remove(p),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,e.memory.geometries++),d}function l(f){const d=f.attributes;for(const _ in d)t.update(d[_],i.ARRAY_BUFFER);const p=f.morphAttributes;for(const _ in p){const v=p[_];for(let m=0,h=v.length;m<h;m++)t.update(v[m],i.ARRAY_BUFFER)}}function c(f){const d=[],p=f.index,_=f.attributes.position;let v=0;if(p!==null){const y=p.array;v=p.version;for(let x=0,g=y.length;x<g;x+=3){const R=y[x+0],b=y[x+1],w=y[x+2];d.push(R,b,b,w,w,R)}}else if(_!==void 0){const y=_.array;v=_.version;for(let x=0,g=y.length/3-1;x<g;x+=3){const R=x+0,b=x+1,w=x+2;d.push(R,b,b,w,w,R)}}else return;const m=new(wa(d)?Da:La)(d,1);m.version=v;const h=s.get(f);h&&t.remove(h),s.set(f,m)}function u(f){const d=s.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:u}}function Xh(i,t,e){let n;function r(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,p){i.drawElements(n,p,s,d*a),e.update(p,n,1)}function c(d,p,_){_!==0&&(i.drawElementsInstanced(n,p,s,d*a,_),e.update(p,n,_))}function u(d,p,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,s,d,0,_);let m=0;for(let h=0;h<_;h++)m+=p[h];e.update(m,n,1)}function f(d,p,_,v){if(_===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<d.length;h++)c(d[h]/a,p[h],v[h]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,s,d,0,v,0,_);let h=0;for(let y=0;y<_;y++)h+=p[y]*v[y];e.update(h,n,1)}}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function qh(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(s/3);break;case i.LINES:e.lines+=o*(s/2);break;case i.LINE_STRIP:e.lines+=o*(s-1);break;case i.LINE_LOOP:e.lines+=o*s;break;case i.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function Yh(i,t,e){const n=new WeakMap,r=new Xt;function s(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==f){let T=function(){w.dispose(),n.delete(o),o.removeEventListener("dispose",T)};d!==void 0&&d.texture.dispose();const p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let x=0;p===!0&&(x=1),_===!0&&(x=2),v===!0&&(x=3);let g=o.attributes.position.count*x,R=1;g>t.maxTextureSize&&(R=Math.ceil(g/t.maxTextureSize),g=t.maxTextureSize);const b=new Float32Array(g*R*4*f),w=new Ca(b,g,R,f);w.type=1015,w.needsUpdate=!0;const L=x*4;for(let S=0;S<f;S++){const P=m[S],O=h[S],N=y[S],V=g*R*4*S;for(let Y=0;Y<P.count;Y++){const W=Y*L;p===!0&&(r.fromBufferAttribute(P,Y),b[V+W+0]=r.x,b[V+W+1]=r.y,b[V+W+2]=r.z,b[V+W+3]=0),_===!0&&(r.fromBufferAttribute(O,Y),b[V+W+4]=r.x,b[V+W+5]=r.y,b[V+W+6]=r.z,b[V+W+7]=0),v===!0&&(r.fromBufferAttribute(N,Y),b[V+W+8]=r.x,b[V+W+9]=r.y,b[V+W+10]=r.z,b[V+W+11]=N.itemSize===4?r.w:1)}}d={count:f,texture:w,size:new it(g,R)},n.set(o,d),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let p=0;for(let v=0;v<c.length;v++)p+=c[v];const _=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:s}}function Zh(i,t,e,n){let r=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,f=t.get(l,u);if(r.get(f)!==c&&(t.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return f}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:a}}class Ba extends Ee{constructor(t,e,n,r,s,a,o,l,c,u=1026){if(u!==1026&&u!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===1026&&(n=1014),n===void 0&&u===1027&&(n=1020),super(null,r,s,a,o,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:1003,this.minFilter=l!==void 0?l:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const za=new Ee,qs=new Ba(1,1),Ga=new Ca,Va=new Fo,Ha=new Fa,Ys=[],Zs=[],Js=new Float32Array(16),$s=new Float32Array(9),Ks=new Float32Array(4);function Jn(i,t,e){const n=i[0];if(n<=0||n>0)return i;const r=t*e;let s=Ys[r];if(s===void 0&&(s=new Float32Array(r),Ys[r]=s),t!==0){n.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(s,o)}return s}function fe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function de(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function nr(i,t){let e=Zs[t];e===void 0&&(e=new Int32Array(t),Zs[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Jh(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function $h(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;i.uniform2fv(this.addr,t),de(e,t)}}function Kh(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(fe(e,t))return;i.uniform3fv(this.addr,t),de(e,t)}}function jh(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;i.uniform4fv(this.addr,t),de(e,t)}}function Qh(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),de(e,t)}else{if(fe(e,n))return;Ks.set(n),i.uniformMatrix2fv(this.addr,!1,Ks),de(e,n)}}function tu(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),de(e,t)}else{if(fe(e,n))return;$s.set(n),i.uniformMatrix3fv(this.addr,!1,$s),de(e,n)}}function eu(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(fe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),de(e,t)}else{if(fe(e,n))return;Js.set(n),i.uniformMatrix4fv(this.addr,!1,Js),de(e,n)}}function nu(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function iu(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;i.uniform2iv(this.addr,t),de(e,t)}}function ru(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fe(e,t))return;i.uniform3iv(this.addr,t),de(e,t)}}function su(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;i.uniform4iv(this.addr,t),de(e,t)}}function au(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function ou(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(fe(e,t))return;i.uniform2uiv(this.addr,t),de(e,t)}}function lu(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(fe(e,t))return;i.uniform3uiv(this.addr,t),de(e,t)}}function cu(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(fe(e,t))return;i.uniform4uiv(this.addr,t),de(e,t)}}function hu(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(qs.compareFunction=515,s=qs):s=za,e.setTexture2D(t||s,r)}function uu(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||Va,r)}function fu(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||Ha,r)}function du(i,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||Ga,r)}function pu(i){switch(i){case 5126:return Jh;case 35664:return $h;case 35665:return Kh;case 35666:return jh;case 35674:return Qh;case 35675:return tu;case 35676:return eu;case 5124:case 35670:return nu;case 35667:case 35671:return iu;case 35668:case 35672:return ru;case 35669:case 35673:return su;case 5125:return au;case 36294:return ou;case 36295:return lu;case 36296:return cu;case 35678:case 36198:case 36298:case 36306:case 35682:return hu;case 35679:case 36299:case 36307:return uu;case 35680:case 36300:case 36308:case 36293:return fu;case 36289:case 36303:case 36311:case 36292:return du}}function mu(i,t){i.uniform1fv(this.addr,t)}function gu(i,t){const e=Jn(t,this.size,2);i.uniform2fv(this.addr,e)}function _u(i,t){const e=Jn(t,this.size,3);i.uniform3fv(this.addr,e)}function vu(i,t){const e=Jn(t,this.size,4);i.uniform4fv(this.addr,e)}function xu(i,t){const e=Jn(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Mu(i,t){const e=Jn(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Su(i,t){const e=Jn(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function yu(i,t){i.uniform1iv(this.addr,t)}function Eu(i,t){i.uniform2iv(this.addr,t)}function Tu(i,t){i.uniform3iv(this.addr,t)}function Au(i,t){i.uniform4iv(this.addr,t)}function bu(i,t){i.uniform1uiv(this.addr,t)}function wu(i,t){i.uniform2uiv(this.addr,t)}function Ru(i,t){i.uniform3uiv(this.addr,t)}function Cu(i,t){i.uniform4uiv(this.addr,t)}function Pu(i,t,e){const n=this.cache,r=t.length,s=nr(e,r);fe(n,s)||(i.uniform1iv(this.addr,s),de(n,s));for(let a=0;a!==r;++a)e.setTexture2D(t[a]||za,s[a])}function Lu(i,t,e){const n=this.cache,r=t.length,s=nr(e,r);fe(n,s)||(i.uniform1iv(this.addr,s),de(n,s));for(let a=0;a!==r;++a)e.setTexture3D(t[a]||Va,s[a])}function Du(i,t,e){const n=this.cache,r=t.length,s=nr(e,r);fe(n,s)||(i.uniform1iv(this.addr,s),de(n,s));for(let a=0;a!==r;++a)e.setTextureCube(t[a]||Ha,s[a])}function Uu(i,t,e){const n=this.cache,r=t.length,s=nr(e,r);fe(n,s)||(i.uniform1iv(this.addr,s),de(n,s));for(let a=0;a!==r;++a)e.setTexture2DArray(t[a]||Ga,s[a])}function Iu(i){switch(i){case 5126:return mu;case 35664:return gu;case 35665:return _u;case 35666:return vu;case 35674:return xu;case 35675:return Mu;case 35676:return Su;case 5124:case 35670:return yu;case 35667:case 35671:return Eu;case 35668:case 35672:return Tu;case 35669:case 35673:return Au;case 5125:return bu;case 36294:return wu;case 36295:return Ru;case 36296:return Cu;case 35678:case 36198:case 36298:case 36306:case 35682:return Pu;case 35679:case 36299:case 36307:return Lu;case 35680:case 36300:case 36308:case 36293:return Du;case 36289:case 36303:case 36311:case 36292:return Uu}}class Fu{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=pu(e.type)}}class Nu{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Iu(e.type)}}class Ou{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(t,e[o.id],n)}}}const Lr=/(\w+)(\])?(\[|\.)?/g;function js(i,t){i.seq.push(t),i.map[t.id]=t}function Bu(i,t,e){const n=i.name,r=n.length;for(Lr.lastIndex=0;;){const s=Lr.exec(n),a=Lr.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){js(e,c===void 0?new Fu(o,i,t):new Nu(o,i,t));break}else{let f=e.map[o];f===void 0&&(f=new Ou(o),js(e,f)),e=f}}}class Ji{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=t.getActiveUniform(e,r),a=t.getUniformLocation(e,s.name);Bu(s,a,this)}}setValue(t,e,n,r){const s=this.map[e];s!==void 0&&s.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let s=0,a=e.length;s!==a;++s){const o=e[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,s=t.length;r!==s;++r){const a=t[r];a.id in e&&n.push(a)}return n}}function Qs(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const zu=37297;let Gu=0;function Vu(i,t){const e=i.split(`
`),n=[],r=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const ta=new Dt;function Hu(i){kt._getMatrix(ta,kt.workingColorSpace,i);const t=`mat3( ${ta.elements.map(e=>e.toFixed(4))} )`;switch(kt.getTransfer(i)){case tr:return[t,"LinearTransferOETF"];case jt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function ea(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=i.getShaderInfoLog(t).trim();if(n&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return e.toUpperCase()+`

`+r+`

`+Vu(i.getShaderSource(t),a)}else return r}function ku(i,t){const e=Hu(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Wu(i,t){let e;switch(t){case 1:e="Linear";break;case 2:e="Reinhard";break;case 3:e="Cineon";break;case 4:e="ACESFilmic";break;case 6:e="AgX";break;case 7:e="Neutral";break;case 5:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Vi=new C;function Xu(){kt.getLuminanceCoefficients(Vi);const i=Vi.x.toFixed(4),t=Vi.y.toFixed(4),e=Vi.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qu(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ai).join(`
`)}function Yu(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Zu(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(t,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function ai(i){return i!==""}function na(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ia(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Ju=/^[ \t]*#include +<([\w\d./]+)>/gm;function Gr(i){return i.replace(Ju,Ku)}const $u=new Map;function Ku(i,t){let e=It[t];if(e===void 0){const n=$u.get(t);if(n!==void 0)e=It[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Gr(e)}const ju=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ra(i){return i.replace(ju,Qu)}function Qu(i,t,e,n){let r="";for(let s=parseInt(t);s<parseInt(e);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function sa(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function tf(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===1?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===2?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===3&&(t="SHADOWMAP_TYPE_VSM"),t}function ef(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case 301:case 302:t="ENVMAP_TYPE_CUBE";break;case 306:t="ENVMAP_TYPE_CUBE_UV";break}return t}function nf(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case 302:t="ENVMAP_MODE_REFRACTION";break}return t}function rf(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case 0:t="ENVMAP_BLENDING_MULTIPLY";break;case 1:t="ENVMAP_BLENDING_MIX";break;case 2:t="ENVMAP_BLENDING_ADD";break}return t}function sf(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function af(i,t,e,n){const r=i.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=tf(e),c=ef(e),u=nf(e),f=rf(e),d=sf(e),p=qu(e),_=Yu(s),v=r.createProgram();let m,h,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ai).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ai).join(`
`),h.length>0&&(h+=`
`)):(m=[sa(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ai).join(`
`),h=[sa(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==0?"#define TONE_MAPPING":"",e.toneMapping!==0?It.tonemapping_pars_fragment:"",e.toneMapping!==0?Wu("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",It.colorspace_pars_fragment,ku("linearToOutputTexel",e.outputColorSpace),Xu(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ai).join(`
`)),a=Gr(a),a=na(a,e),a=ia(a,e),o=Gr(o),o=na(o,e),o=ia(o,e),a=ra(a),o=ra(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",e.glslVersion===_s?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===_s?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const x=y+m+a,g=y+h+o,R=Qs(r,r.VERTEX_SHADER,x),b=Qs(r,r.FRAGMENT_SHADER,g);r.attachShader(v,R),r.attachShader(v,b),e.index0AttributeName!==void 0?r.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function w(P){if(i.debug.checkShaderErrors){const O=r.getProgramInfoLog(v).trim(),N=r.getShaderInfoLog(R).trim(),V=r.getShaderInfoLog(b).trim();let Y=!0,W=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(Y=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,R,b);else{const K=ea(r,R,"vertex"),H=ea(r,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+K+`
`+H)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(N===""||V==="")&&(W=!1);W&&(P.diagnostics={runnable:Y,programLog:O,vertexShader:{log:N,prefix:m},fragmentShader:{log:V,prefix:h}})}r.deleteShader(R),r.deleteShader(b),L=new Ji(r,v),T=Zu(r,v)}let L;this.getUniforms=function(){return L===void 0&&w(this),L};let T;this.getAttributes=function(){return T===void 0&&w(this),T};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=r.getProgramParameter(v,zu)),S},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Gu++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=R,this.fragmentShader=b,this}let of=0;class lf{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new cf(t),e.set(t,n)),n}}class cf{constructor(t){this.id=of++,this.code=t,this.usedTimes=0}}function hf(i,t,e,n,r,s,a){const o=new $r,l=new lf,c=new Set,u=[],f=r.logarithmicDepthBuffer,d=r.vertexTextures;let p=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(T){return c.add(T),T===0?"uv":`uv${T}`}function m(T,S,P,O,N){const V=O.fog,Y=N.geometry,W=T.isMeshStandardMaterial?O.environment:null,K=(T.isMeshStandardMaterial?e:t).get(T.envMap||W),H=K&&K.mapping===306?K.image.height:null,at=_[T.type];T.precision!==null&&(p=r.getMaxPrecision(T.precision),p!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",p,"instead."));const ft=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,yt=ft!==void 0?ft.length:0;let Ft=0;Y.morphAttributes.position!==void 0&&(Ft=1),Y.morphAttributes.normal!==void 0&&(Ft=2),Y.morphAttributes.color!==void 0&&(Ft=3);let Qt,q,tt,xt;if(at){const Jt=Ve[at];Qt=Jt.vertexShader,q=Jt.fragmentShader}else Qt=T.vertexShader,q=T.fragmentShader,l.update(T),tt=l.getVertexShaderID(T),xt=l.getFragmentShaderID(T);const ot=i.getRenderTarget(),bt=i.state.buffers.depth.getReversed(),Ct=N.isInstancedMesh===!0,Nt=N.isBatchedMesh===!0,se=!!T.map,Vt=!!T.matcap,ce=!!K,F=!!T.aoMap,Le=!!T.lightMap,Bt=!!T.bumpMap,zt=!!T.normalMap,Tt=!!T.displacementMap,ne=!!T.emissiveMap,Et=!!T.metalnessMap,A=!!T.roughnessMap,M=T.anisotropy>0,B=T.clearcoat>0,Z=T.dispersion>0,$=T.iridescence>0,X=T.sheen>0,Mt=T.transmission>0,lt=M&&!!T.anisotropyMap,dt=B&&!!T.clearcoatMap,Ht=B&&!!T.clearcoatNormalMap,j=B&&!!T.clearcoatRoughnessMap,pt=$&&!!T.iridescenceMap,At=$&&!!T.iridescenceThicknessMap,wt=X&&!!T.sheenColorMap,mt=X&&!!T.sheenRoughnessMap,Gt=!!T.specularMap,Ut=!!T.specularColorMap,te=!!T.specularIntensityMap,D=Mt&&!!T.transmissionMap,rt=Mt&&!!T.thicknessMap,k=!!T.gradientMap,J=!!T.alphaMap,ut=T.alphaTest>0,ct=!!T.alphaHash,Pt=!!T.extensions;let oe=0;T.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(oe=i.toneMapping);const _e={shaderID:at,shaderType:T.type,shaderName:T.name,vertexShader:Qt,fragmentShader:q,defines:T.defines,customVertexShaderID:tt,customFragmentShaderID:xt,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:p,batching:Nt,batchingColor:Nt&&N._colorsTexture!==null,instancing:Ct,instancingColor:Ct&&N.instanceColor!==null,instancingMorph:Ct&&N.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ot===null?i.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:Wn,alphaToCoverage:!!T.alphaToCoverage,map:se,matcap:Vt,envMap:ce,envMapMode:ce&&K.mapping,envMapCubeUVHeight:H,aoMap:F,lightMap:Le,bumpMap:Bt,normalMap:zt,displacementMap:d&&Tt,emissiveMap:ne,normalMapObjectSpace:zt&&T.normalMapType===1,normalMapTangentSpace:zt&&T.normalMapType===0,metalnessMap:Et,roughnessMap:A,anisotropy:M,anisotropyMap:lt,clearcoat:B,clearcoatMap:dt,clearcoatNormalMap:Ht,clearcoatRoughnessMap:j,dispersion:Z,iridescence:$,iridescenceMap:pt,iridescenceThicknessMap:At,sheen:X,sheenColorMap:wt,sheenRoughnessMap:mt,specularMap:Gt,specularColorMap:Ut,specularIntensityMap:te,transmission:Mt,transmissionMap:D,thicknessMap:rt,gradientMap:k,opaque:T.transparent===!1&&T.blending===1&&T.alphaToCoverage===!1,alphaMap:J,alphaTest:ut,alphaHash:ct,combine:T.combine,mapUv:se&&v(T.map.channel),aoMapUv:F&&v(T.aoMap.channel),lightMapUv:Le&&v(T.lightMap.channel),bumpMapUv:Bt&&v(T.bumpMap.channel),normalMapUv:zt&&v(T.normalMap.channel),displacementMapUv:Tt&&v(T.displacementMap.channel),emissiveMapUv:ne&&v(T.emissiveMap.channel),metalnessMapUv:Et&&v(T.metalnessMap.channel),roughnessMapUv:A&&v(T.roughnessMap.channel),anisotropyMapUv:lt&&v(T.anisotropyMap.channel),clearcoatMapUv:dt&&v(T.clearcoatMap.channel),clearcoatNormalMapUv:Ht&&v(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&v(T.clearcoatRoughnessMap.channel),iridescenceMapUv:pt&&v(T.iridescenceMap.channel),iridescenceThicknessMapUv:At&&v(T.iridescenceThicknessMap.channel),sheenColorMapUv:wt&&v(T.sheenColorMap.channel),sheenRoughnessMapUv:mt&&v(T.sheenRoughnessMap.channel),specularMapUv:Gt&&v(T.specularMap.channel),specularColorMapUv:Ut&&v(T.specularColorMap.channel),specularIntensityMapUv:te&&v(T.specularIntensityMap.channel),transmissionMapUv:D&&v(T.transmissionMap.channel),thicknessMapUv:rt&&v(T.thicknessMap.channel),alphaMapUv:J&&v(T.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(zt||M),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!Y.attributes.uv&&(se||J),fog:!!V,useFog:T.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:bt,skinning:N.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:yt,morphTextureStride:Ft,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:T.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:oe,decodeVideoTexture:se&&T.map.isVideoTexture===!0&&kt.getTransfer(T.map.colorSpace)===jt,decodeVideoTextureEmissive:ne&&T.emissiveMap.isVideoTexture===!0&&kt.getTransfer(T.emissiveMap.colorSpace)===jt,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===2,flipSided:T.side===1,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Pt&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pt&&T.extensions.multiDraw===!0||Nt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return _e.vertexUv1s=c.has(1),_e.vertexUv2s=c.has(2),_e.vertexUv3s=c.has(3),c.clear(),_e}function h(T){const S=[];if(T.shaderID?S.push(T.shaderID):(S.push(T.customVertexShaderID),S.push(T.customFragmentShaderID)),T.defines!==void 0)for(const P in T.defines)S.push(P),S.push(T.defines[P]);return T.isRawShaderMaterial===!1&&(y(S,T),x(S,T),S.push(i.outputColorSpace)),S.push(T.customProgramCacheKey),S.join()}function y(T,S){T.push(S.precision),T.push(S.outputColorSpace),T.push(S.envMapMode),T.push(S.envMapCubeUVHeight),T.push(S.mapUv),T.push(S.alphaMapUv),T.push(S.lightMapUv),T.push(S.aoMapUv),T.push(S.bumpMapUv),T.push(S.normalMapUv),T.push(S.displacementMapUv),T.push(S.emissiveMapUv),T.push(S.metalnessMapUv),T.push(S.roughnessMapUv),T.push(S.anisotropyMapUv),T.push(S.clearcoatMapUv),T.push(S.clearcoatNormalMapUv),T.push(S.clearcoatRoughnessMapUv),T.push(S.iridescenceMapUv),T.push(S.iridescenceThicknessMapUv),T.push(S.sheenColorMapUv),T.push(S.sheenRoughnessMapUv),T.push(S.specularMapUv),T.push(S.specularColorMapUv),T.push(S.specularIntensityMapUv),T.push(S.transmissionMapUv),T.push(S.thicknessMapUv),T.push(S.combine),T.push(S.fogExp2),T.push(S.sizeAttenuation),T.push(S.morphTargetsCount),T.push(S.morphAttributeCount),T.push(S.numDirLights),T.push(S.numPointLights),T.push(S.numSpotLights),T.push(S.numSpotLightMaps),T.push(S.numHemiLights),T.push(S.numRectAreaLights),T.push(S.numDirLightShadows),T.push(S.numPointLightShadows),T.push(S.numSpotLightShadows),T.push(S.numSpotLightShadowsWithMaps),T.push(S.numLightProbes),T.push(S.shadowMapType),T.push(S.toneMapping),T.push(S.numClippingPlanes),T.push(S.numClipIntersection),T.push(S.depthPacking)}function x(T,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),T.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),T.push(o.mask)}function g(T){const S=_[T.type];let P;if(S){const O=Ve[S];P=ci.clone(O.uniforms)}else P=T.uniforms;return P}function R(T,S){let P;for(let O=0,N=u.length;O<N;O++){const V=u[O];if(V.cacheKey===S){P=V,++P.usedTimes;break}}return P===void 0&&(P=new af(i,S,T,s),u.push(P)),P}function b(T){if(--T.usedTimes===0){const S=u.indexOf(T);u[S]=u[u.length-1],u.pop(),T.destroy()}}function w(T){l.remove(T)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:g,acquireProgram:R,releaseProgram:b,releaseShaderCache:w,programs:u,dispose:L}}function uf(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,l){i.get(a)[o]=l}function s(){i=new WeakMap}return{has:t,get:e,remove:n,update:r,dispose:s}}function ff(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function aa(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function oa(){const i=[];let t=0;const e=[],n=[],r=[];function s(){t=0,e.length=0,n.length=0,r.length=0}function a(f,d,p,_,v,m){let h=i[t];return h===void 0?(h={id:f.id,object:f,geometry:d,material:p,groupOrder:_,renderOrder:f.renderOrder,z:v,group:m},i[t]=h):(h.id=f.id,h.object=f,h.geometry=d,h.material=p,h.groupOrder=_,h.renderOrder=f.renderOrder,h.z=v,h.group=m),t++,h}function o(f,d,p,_,v,m){const h=a(f,d,p,_,v,m);p.transmission>0?n.push(h):p.transparent===!0?r.push(h):e.push(h)}function l(f,d,p,_,v,m){const h=a(f,d,p,_,v,m);p.transmission>0?n.unshift(h):p.transparent===!0?r.unshift(h):e.unshift(h)}function c(f,d){e.length>1&&e.sort(f||ff),n.length>1&&n.sort(d||aa),r.length>1&&r.sort(d||aa)}function u(){for(let f=t,d=i.length;f<d;f++){const p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:r,init:s,push:o,unshift:l,finish:u,sort:c}}function df(){let i=new WeakMap;function t(n,r){const s=i.get(n);let a;return s===void 0?(a=new oa,i.set(n,[a])):r>=s.length?(a=new oa,s.push(a)):a=s[r],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function pf(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new C,color:new st};break;case"SpotLight":e={position:new C,direction:new C,color:new st,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new st,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new st,groundColor:new st};break;case"RectAreaLight":e={color:new st,position:new C,halfWidth:new C,halfHeight:new C};break}return i[t.id]=e,e}}}function mf(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let gf=0;function _f(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function vf(i){const t=new pf,e=mf(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);const r=new C,s=new Zt,a=new Zt;function o(c){let u=0,f=0,d=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let p=0,_=0,v=0,m=0,h=0,y=0,x=0,g=0,R=0,b=0,w=0;c.sort(_f);for(let T=0,S=c.length;T<S;T++){const P=c[T],O=P.color,N=P.intensity,V=P.distance,Y=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=O.r*N,f+=O.g*N,d+=O.b*N;else if(P.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(P.sh.coefficients[W],N);w++}else if(P.isDirectionalLight){const W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const K=P.shadow,H=e.get(P);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,n.directionalShadow[p]=H,n.directionalShadowMap[p]=Y,n.directionalShadowMatrix[p]=P.shadow.matrix,y++}n.directional[p]=W,p++}else if(P.isSpotLight){const W=t.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(O).multiplyScalar(N),W.distance=V,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,n.spot[v]=W;const K=P.shadow;if(P.map&&(n.spotLightMap[R]=P.map,R++,K.updateMatrices(P),P.castShadow&&b++),n.spotLightMatrix[v]=K.matrix,P.castShadow){const H=e.get(P);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,n.spotShadow[v]=H,n.spotShadowMap[v]=Y,g++}v++}else if(P.isRectAreaLight){const W=t.get(P);W.color.copy(O).multiplyScalar(N),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=W,m++}else if(P.isPointLight){const W=t.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){const K=P.shadow,H=e.get(P);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,H.shadowCameraNear=K.camera.near,H.shadowCameraFar=K.camera.far,n.pointShadow[_]=H,n.pointShadowMap[_]=Y,n.pointShadowMatrix[_]=P.shadow.matrix,x++}n.point[_]=W,_++}else if(P.isHemisphereLight){const W=t.get(P);W.skyColor.copy(P.color).multiplyScalar(N),W.groundColor.copy(P.groundColor).multiplyScalar(N),n.hemi[h]=W,h++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=et.LTC_FLOAT_1,n.rectAreaLTC2=et.LTC_FLOAT_2):(n.rectAreaLTC1=et.LTC_HALF_1,n.rectAreaLTC2=et.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=f,n.ambient[2]=d;const L=n.hash;(L.directionalLength!==p||L.pointLength!==_||L.spotLength!==v||L.rectAreaLength!==m||L.hemiLength!==h||L.numDirectionalShadows!==y||L.numPointShadows!==x||L.numSpotShadows!==g||L.numSpotMaps!==R||L.numLightProbes!==w)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=_,n.hemi.length=h,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=g,n.spotShadowMap.length=g,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=g+R-b,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=w,L.directionalLength=p,L.pointLength=_,L.spotLength=v,L.rectAreaLength=m,L.hemiLength=h,L.numDirectionalShadows=y,L.numPointShadows=x,L.numSpotShadows=g,L.numSpotMaps=R,L.numLightProbes=w,n.version=gf++)}function l(c,u){let f=0,d=0,p=0,_=0,v=0;const m=u.matrixWorldInverse;for(let h=0,y=c.length;h<y;h++){const x=c[h];if(x.isDirectionalLight){const g=n.directional[f];g.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),g.direction.sub(r),g.direction.transformDirection(m),f++}else if(x.isSpotLight){const g=n.spot[p];g.position.setFromMatrixPosition(x.matrixWorld),g.position.applyMatrix4(m),g.direction.setFromMatrixPosition(x.matrixWorld),r.setFromMatrixPosition(x.target.matrixWorld),g.direction.sub(r),g.direction.transformDirection(m),p++}else if(x.isRectAreaLight){const g=n.rectArea[_];g.position.setFromMatrixPosition(x.matrixWorld),g.position.applyMatrix4(m),a.identity(),s.copy(x.matrixWorld),s.premultiply(m),a.extractRotation(s),g.halfWidth.set(x.width*.5,0,0),g.halfHeight.set(0,x.height*.5,0),g.halfWidth.applyMatrix4(a),g.halfHeight.applyMatrix4(a),_++}else if(x.isPointLight){const g=n.point[d];g.position.setFromMatrixPosition(x.matrixWorld),g.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){const g=n.hemi[v];g.direction.setFromMatrixPosition(x.matrixWorld),g.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function la(i){const t=new vf(i),e=[],n=[];function r(u){c.camera=u,e.length=0,n.length=0}function s(u){e.push(u)}function a(u){n.push(u)}function o(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function xf(i){let t=new WeakMap;function e(r,s=0){const a=t.get(r);let o;return a===void 0?(o=new la(i),t.set(r,[o])):s>=a.length?(o=new la(i),a.push(o)):o=a[s],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Mf extends Zn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Sf extends Zn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const yf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ef=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Tf(i,t,e){let n=new Kr;const r=new it,s=new it,a=new Xt,o=new Mf({depthPacking:3201}),l=new Sf,c={},u=e.maxTextureSize,f={0:1,1:0,2:2},d=new ue({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:yf,fragmentShader:Ef}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const _=new le;_.setAttribute("position",new $t(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ot(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let h=this.type;this.render=function(b,w,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const T=i.getRenderTarget(),S=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),O=i.state;O.setBlending(0),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const N=h!==3&&this.type===3,V=h===3&&this.type!==3;for(let Y=0,W=b.length;Y<W;Y++){const K=b[Y],H=K.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const at=H.getFrameExtents();if(r.multiply(at),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/at.x),r.x=s.x*at.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/at.y),r.y=s.y*at.y,H.mapSize.y=s.y)),H.map===null||N===!0||V===!0){const yt=this.type!==3?{minFilter:1003,magFilter:1003}:{};H.map!==null&&H.map.dispose(),H.map=new Mn(r.x,r.y,yt),H.map.texture.name=K.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();const ft=H.getViewportCount();for(let yt=0;yt<ft;yt++){const Ft=H.getViewport(yt);a.set(s.x*Ft.x,s.y*Ft.y,s.x*Ft.z,s.y*Ft.w),O.viewport(a),H.updateMatrices(K,yt),n=H.getFrustum(),g(w,L,H.camera,K,this.type)}H.isPointLightShadow!==!0&&this.type===3&&y(H,L),H.needsUpdate=!1}h=this.type,m.needsUpdate=!1,i.setRenderTarget(T,S,P)};function y(b,w){const L=t.update(v);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Mn(r.x,r.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(w,null,L,d,v,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(w,null,L,p,v,null)}function x(b,w,L,T){let S=null;const P=L.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)S=P;else if(S=L.isPointLight===!0?l:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const O=S.uuid,N=w.uuid;let V=c[O];V===void 0&&(V={},c[O]=V);let Y=V[N];Y===void 0&&(Y=S.clone(),V[N]=Y,w.addEventListener("dispose",R)),S=Y}if(S.visible=w.visible,S.wireframe=w.wireframe,T===3?S.side=w.shadowSide!==null?w.shadowSide:w.side:S.side=w.shadowSide!==null?w.shadowSide:f[w.side],S.alphaMap=w.alphaMap,S.alphaTest=w.alphaTest,S.map=w.map,S.clipShadows=w.clipShadows,S.clippingPlanes=w.clippingPlanes,S.clipIntersection=w.clipIntersection,S.displacementMap=w.displacementMap,S.displacementScale=w.displacementScale,S.displacementBias=w.displacementBias,S.wireframeLinewidth=w.wireframeLinewidth,S.linewidth=w.linewidth,L.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const O=i.properties.get(S);O.light=L}return S}function g(b,w,L,T,S){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&S===3)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,b.matrixWorld);const N=t.update(b),V=b.material;if(Array.isArray(V)){const Y=N.groups;for(let W=0,K=Y.length;W<K;W++){const H=Y[W],at=V[H.materialIndex];if(at&&at.visible){const ft=x(b,at,T,S);b.onBeforeShadow(i,b,w,L,N,ft,H),i.renderBufferDirect(L,null,N,ft,b,H),b.onAfterShadow(i,b,w,L,N,ft,H)}}}else if(V.visible){const Y=x(b,V,T,S);b.onBeforeShadow(i,b,w,L,N,Y,null),i.renderBufferDirect(L,null,N,Y,b,null),b.onAfterShadow(i,b,w,L,N,Y,null)}}const O=b.children;for(let N=0,V=O.length;N<V;N++)g(O[N],w,L,T,S)}function R(b){b.target.removeEventListener("dispose",R);for(const L in c){const T=c[L],S=b.target.uuid;S in T&&(T[S].dispose(),delete T[S])}}}const Af={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function bf(i,t){function e(){let D=!1;const rt=new Xt;let k=null;const J=new Xt(0,0,0,0);return{setMask:function(ut){k!==ut&&!D&&(i.colorMask(ut,ut,ut,ut),k=ut)},setLocked:function(ut){D=ut},setClear:function(ut,ct,Pt,oe,_e){_e===!0&&(ut*=oe,ct*=oe,Pt*=oe),rt.set(ut,ct,Pt,oe),J.equals(rt)===!1&&(i.clearColor(ut,ct,Pt,oe),J.copy(rt))},reset:function(){D=!1,k=null,J.set(-1,0,0,0)}}}function n(){let D=!1,rt=!1,k=null,J=null,ut=null;return{setReversed:function(ct){if(rt!==ct){const Pt=t.get("EXT_clip_control");rt?Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.ZERO_TO_ONE_EXT):Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.NEGATIVE_ONE_TO_ONE_EXT);const oe=ut;ut=null,this.setClear(oe)}rt=ct},getReversed:function(){return rt},setTest:function(ct){ct?ot(i.DEPTH_TEST):bt(i.DEPTH_TEST)},setMask:function(ct){k!==ct&&!D&&(i.depthMask(ct),k=ct)},setFunc:function(ct){if(rt&&(ct=Af[ct]),J!==ct){switch(ct){case 0:i.depthFunc(i.NEVER);break;case 1:i.depthFunc(i.ALWAYS);break;case 2:i.depthFunc(i.LESS);break;case 3:i.depthFunc(i.LEQUAL);break;case 4:i.depthFunc(i.EQUAL);break;case 5:i.depthFunc(i.GEQUAL);break;case 6:i.depthFunc(i.GREATER);break;case 7:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}J=ct}},setLocked:function(ct){D=ct},setClear:function(ct){ut!==ct&&(rt&&(ct=1-ct),i.clearDepth(ct),ut=ct)},reset:function(){D=!1,k=null,J=null,ut=null,rt=!1}}}function r(){let D=!1,rt=null,k=null,J=null,ut=null,ct=null,Pt=null,oe=null,_e=null;return{setTest:function(Jt){D||(Jt?ot(i.STENCIL_TEST):bt(i.STENCIL_TEST))},setMask:function(Jt){rt!==Jt&&!D&&(i.stencilMask(Jt),rt=Jt)},setFunc:function(Jt,Ie,We){(k!==Jt||J!==Ie||ut!==We)&&(i.stencilFunc(Jt,Ie,We),k=Jt,J=Ie,ut=We)},setOp:function(Jt,Ie,We){(ct!==Jt||Pt!==Ie||oe!==We)&&(i.stencilOp(Jt,Ie,We),ct=Jt,Pt=Ie,oe=We)},setLocked:function(Jt){D=Jt},setClear:function(Jt){_e!==Jt&&(i.clearStencil(Jt),_e=Jt)},reset:function(){D=!1,rt=null,k=null,J=null,ut=null,ct=null,Pt=null,oe=null,_e=null}}}const s=new e,a=new n,o=new r,l=new WeakMap,c=new WeakMap;let u={},f={},d=new WeakMap,p=[],_=null,v=!1,m=null,h=null,y=null,x=null,g=null,R=null,b=null,w=new st(0,0,0),L=0,T=!1,S=null,P=null,O=null,N=null,V=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,K=0;const H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(H)[1]),W=K>=1):H.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),W=K>=2);let at=null,ft={};const yt=i.getParameter(i.SCISSOR_BOX),Ft=i.getParameter(i.VIEWPORT),Qt=new Xt().fromArray(yt),q=new Xt().fromArray(Ft);function tt(D,rt,k,J){const ut=new Uint8Array(4),ct=i.createTexture();i.bindTexture(D,ct),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Pt=0;Pt<k;Pt++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(rt,0,i.RGBA,1,1,J,0,i.RGBA,i.UNSIGNED_BYTE,ut):i.texImage2D(rt+Pt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ut);return ct}const xt={};xt[i.TEXTURE_2D]=tt(i.TEXTURE_2D,i.TEXTURE_2D,1),xt[i.TEXTURE_CUBE_MAP]=tt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),xt[i.TEXTURE_2D_ARRAY]=tt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),xt[i.TEXTURE_3D]=tt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ot(i.DEPTH_TEST),a.setFunc(3),Bt(!1),zt(1),ot(i.CULL_FACE),F(0);function ot(D){u[D]!==!0&&(i.enable(D),u[D]=!0)}function bt(D){u[D]!==!1&&(i.disable(D),u[D]=!1)}function Ct(D,rt){return f[D]!==rt?(i.bindFramebuffer(D,rt),f[D]=rt,D===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=rt),D===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=rt),!0):!1}function Nt(D,rt){let k=p,J=!1;if(D){k=d.get(rt),k===void 0&&(k=[],d.set(rt,k));const ut=D.textures;if(k.length!==ut.length||k[0]!==i.COLOR_ATTACHMENT0){for(let ct=0,Pt=ut.length;ct<Pt;ct++)k[ct]=i.COLOR_ATTACHMENT0+ct;k.length=ut.length,J=!0}}else k[0]!==i.BACK&&(k[0]=i.BACK,J=!0);J&&i.drawBuffers(k)}function se(D){return _!==D?(i.useProgram(D),_=D,!0):!1}const Vt={100:i.FUNC_ADD,101:i.FUNC_SUBTRACT,102:i.FUNC_REVERSE_SUBTRACT};Vt[103]=i.MIN,Vt[104]=i.MAX;const ce={200:i.ZERO,201:i.ONE,202:i.SRC_COLOR,204:i.SRC_ALPHA,210:i.SRC_ALPHA_SATURATE,208:i.DST_COLOR,206:i.DST_ALPHA,203:i.ONE_MINUS_SRC_COLOR,205:i.ONE_MINUS_SRC_ALPHA,209:i.ONE_MINUS_DST_COLOR,207:i.ONE_MINUS_DST_ALPHA,211:i.CONSTANT_COLOR,212:i.ONE_MINUS_CONSTANT_COLOR,213:i.CONSTANT_ALPHA,214:i.ONE_MINUS_CONSTANT_ALPHA};function F(D,rt,k,J,ut,ct,Pt,oe,_e,Jt){if(D===0){v===!0&&(bt(i.BLEND),v=!1);return}if(v===!1&&(ot(i.BLEND),v=!0),D!==5){if(D!==m||Jt!==T){if((h!==100||g!==100)&&(i.blendEquation(i.FUNC_ADD),h=100,g=100),Jt)switch(D){case 1:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.ONE,i.ONE);break;case 3:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case 4:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case 1:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case 3:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case 4:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}y=null,x=null,R=null,b=null,w.set(0,0,0),L=0,m=D,T=Jt}return}ut=ut||rt,ct=ct||k,Pt=Pt||J,(rt!==h||ut!==g)&&(i.blendEquationSeparate(Vt[rt],Vt[ut]),h=rt,g=ut),(k!==y||J!==x||ct!==R||Pt!==b)&&(i.blendFuncSeparate(ce[k],ce[J],ce[ct],ce[Pt]),y=k,x=J,R=ct,b=Pt),(oe.equals(w)===!1||_e!==L)&&(i.blendColor(oe.r,oe.g,oe.b,_e),w.copy(oe),L=_e),m=D,T=!1}function Le(D,rt){D.side===2?bt(i.CULL_FACE):ot(i.CULL_FACE);let k=D.side===1;rt&&(k=!k),Bt(k),D.blending===1&&D.transparent===!1?F(0):F(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),s.setMask(D.colorWrite);const J=D.stencilWrite;o.setTest(J),J&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),ne(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ot(i.SAMPLE_ALPHA_TO_COVERAGE):bt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Bt(D){S!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),S=D)}function zt(D){D!==0?(ot(i.CULL_FACE),D!==P&&(D===1?i.cullFace(i.BACK):D===2?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):bt(i.CULL_FACE),P=D}function Tt(D){D!==O&&(W&&i.lineWidth(D),O=D)}function ne(D,rt,k){D?(ot(i.POLYGON_OFFSET_FILL),(N!==rt||V!==k)&&(i.polygonOffset(rt,k),N=rt,V=k)):bt(i.POLYGON_OFFSET_FILL)}function Et(D){D?ot(i.SCISSOR_TEST):bt(i.SCISSOR_TEST)}function A(D){D===void 0&&(D=i.TEXTURE0+Y-1),at!==D&&(i.activeTexture(D),at=D)}function M(D,rt,k){k===void 0&&(at===null?k=i.TEXTURE0+Y-1:k=at);let J=ft[k];J===void 0&&(J={type:void 0,texture:void 0},ft[k]=J),(J.type!==D||J.texture!==rt)&&(at!==k&&(i.activeTexture(k),at=k),i.bindTexture(D,rt||xt[D]),J.type=D,J.texture=rt)}function B(){const D=ft[at];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Z(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function $(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function X(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Mt(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function lt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function dt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ht(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function j(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function pt(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function At(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function wt(D){Qt.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Qt.copy(D))}function mt(D){q.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),q.copy(D))}function Gt(D,rt){let k=c.get(rt);k===void 0&&(k=new WeakMap,c.set(rt,k));let J=k.get(D);J===void 0&&(J=i.getUniformBlockIndex(rt,D.name),k.set(D,J))}function Ut(D,rt){const J=c.get(rt).get(D);l.get(rt)!==J&&(i.uniformBlockBinding(rt,J,D.__bindingPointIndex),l.set(rt,J))}function te(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},at=null,ft={},f={},d=new WeakMap,p=[],_=null,v=!1,m=null,h=null,y=null,x=null,g=null,R=null,b=null,w=new st(0,0,0),L=0,T=!1,S=null,P=null,O=null,N=null,V=null,Qt.set(0,0,i.canvas.width,i.canvas.height),q.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ot,disable:bt,bindFramebuffer:Ct,drawBuffers:Nt,useProgram:se,setBlending:F,setMaterial:Le,setFlipSided:Bt,setCullFace:zt,setLineWidth:Tt,setPolygonOffset:ne,setScissorTest:Et,activeTexture:A,bindTexture:M,unbindTexture:B,compressedTexImage2D:Z,compressedTexImage3D:$,texImage2D:pt,texImage3D:At,updateUBOMapping:Gt,uniformBlockBinding:Ut,texStorage2D:Ht,texStorage3D:j,texSubImage2D:X,texSubImage3D:Mt,compressedTexSubImage2D:lt,compressedTexSubImage3D:dt,scissor:wt,viewport:mt,reset:te}}function ca(i,t,e,n){const r=wf(n);switch(e){case 1021:return i*t;case 1024:return i*t;case 1025:return i*t*2;case 1028:return i*t/r.components*r.byteLength;case 1029:return i*t/r.components*r.byteLength;case 1030:return i*t*2/r.components*r.byteLength;case 1031:return i*t*2/r.components*r.byteLength;case 1022:return i*t*3/r.components*r.byteLength;case 1023:return i*t*4/r.components*r.byteLength;case 1033:return i*t*4/r.components*r.byteLength;case 33776:case 33777:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case 33778:case 33779:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case 35841:case 35843:return Math.max(i,16)*Math.max(t,8)/4;case 35840:case 35842:return Math.max(i,8)*Math.max(t,8)/2;case 36196:case 37492:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case 37496:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case 37808:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case 37809:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case 37810:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case 37811:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case 37812:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case 37813:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case 37814:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case 37815:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case 37816:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case 37817:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case 37818:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case 37819:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case 37820:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case 37821:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(i/4)*Math.ceil(t/4)*16;case 36283:case 36284:return Math.ceil(i/4)*Math.ceil(t/4)*8;case 36285:case 36286:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function wf(i){switch(i){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Rf(i,t,e,n,r,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new it,u=new WeakMap;let f;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,M){return p?new OffscreenCanvas(A,M):Ki("canvas")}function v(A,M,B){let Z=1;const $=Et(A);if(($.width>B||$.height>B)&&(Z=B/Math.max($.width,$.height)),Z<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const X=Math.floor(Z*$.width),Mt=Math.floor(Z*$.height);f===void 0&&(f=_(X,Mt));const lt=M?_(X,Mt):f;return lt.width=X,lt.height=Mt,lt.getContext("2d").drawImage(A,0,0,X,Mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+X+"x"+Mt+")."),lt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),A;return A}function m(A){return A.generateMipmaps}function h(A){i.generateMipmap(A)}function y(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(A,M,B,Z,$=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let X=M;if(M===i.RED&&(B===i.FLOAT&&(X=i.R32F),B===i.HALF_FLOAT&&(X=i.R16F),B===i.UNSIGNED_BYTE&&(X=i.R8)),M===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(X=i.R8UI),B===i.UNSIGNED_SHORT&&(X=i.R16UI),B===i.UNSIGNED_INT&&(X=i.R32UI),B===i.BYTE&&(X=i.R8I),B===i.SHORT&&(X=i.R16I),B===i.INT&&(X=i.R32I)),M===i.RG&&(B===i.FLOAT&&(X=i.RG32F),B===i.HALF_FLOAT&&(X=i.RG16F),B===i.UNSIGNED_BYTE&&(X=i.RG8)),M===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(X=i.RG8UI),B===i.UNSIGNED_SHORT&&(X=i.RG16UI),B===i.UNSIGNED_INT&&(X=i.RG32UI),B===i.BYTE&&(X=i.RG8I),B===i.SHORT&&(X=i.RG16I),B===i.INT&&(X=i.RG32I)),M===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(X=i.RGB8UI),B===i.UNSIGNED_SHORT&&(X=i.RGB16UI),B===i.UNSIGNED_INT&&(X=i.RGB32UI),B===i.BYTE&&(X=i.RGB8I),B===i.SHORT&&(X=i.RGB16I),B===i.INT&&(X=i.RGB32I)),M===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(X=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(X=i.RGBA16UI),B===i.UNSIGNED_INT&&(X=i.RGBA32UI),B===i.BYTE&&(X=i.RGBA8I),B===i.SHORT&&(X=i.RGBA16I),B===i.INT&&(X=i.RGBA32I)),M===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),M===i.RGBA){const Mt=$?tr:kt.getTransfer(Z);B===i.FLOAT&&(X=i.RGBA32F),B===i.HALF_FLOAT&&(X=i.RGBA16F),B===i.UNSIGNED_BYTE&&(X=Mt===jt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function g(A,M){let B;return A?M===null||M===1014||M===1020?B=i.DEPTH24_STENCIL8:M===1015?B=i.DEPTH32F_STENCIL8:M===1012&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===1014||M===1020?B=i.DEPTH_COMPONENT24:M===1015?B=i.DEPTH_COMPONENT32F:M===1012&&(B=i.DEPTH_COMPONENT16),B}function R(A,M){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==1003&&A.minFilter!==1006?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function b(A){const M=A.target;M.removeEventListener("dispose",b),L(M),M.isVideoTexture&&u.delete(M)}function w(A){const M=A.target;M.removeEventListener("dispose",w),S(M)}function L(A){const M=n.get(A);if(M.__webglInit===void 0)return;const B=A.source,Z=d.get(B);if(Z){const $=Z[M.__cacheKey];$.usedTimes--,$.usedTimes===0&&T(A),Object.keys(Z).length===0&&d.delete(B)}n.remove(A)}function T(A){const M=n.get(A);i.deleteTexture(M.__webglTexture);const B=A.source,Z=d.get(B);delete Z[M.__cacheKey],a.memory.textures--}function S(A){const M=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(M.__webglFramebuffer[Z]))for(let $=0;$<M.__webglFramebuffer[Z].length;$++)i.deleteFramebuffer(M.__webglFramebuffer[Z][$]);else i.deleteFramebuffer(M.__webglFramebuffer[Z]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[Z])}else{if(Array.isArray(M.__webglFramebuffer))for(let Z=0;Z<M.__webglFramebuffer.length;Z++)i.deleteFramebuffer(M.__webglFramebuffer[Z]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Z=0;Z<M.__webglColorRenderbuffer.length;Z++)M.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[Z]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const B=A.textures;for(let Z=0,$=B.length;Z<$;Z++){const X=n.get(B[Z]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),a.memory.textures--),n.remove(B[Z])}n.remove(A)}let P=0;function O(){P=0}function N(){const A=P;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),P+=1,A}function V(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function Y(A,M){const B=n.get(A);if(A.isVideoTexture&&Tt(A),A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){const Z=A.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(B,A,M);return}}e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+M)}function W(A,M){const B=n.get(A);if(A.version>0&&B.__version!==A.version){q(B,A,M);return}e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+M)}function K(A,M){const B=n.get(A);if(A.version>0&&B.__version!==A.version){q(B,A,M);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+M)}function H(A,M){const B=n.get(A);if(A.version>0&&B.__version!==A.version){tt(B,A,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+M)}const at={1e3:i.REPEAT,1001:i.CLAMP_TO_EDGE,1002:i.MIRRORED_REPEAT},ft={1003:i.NEAREST,1004:i.NEAREST_MIPMAP_NEAREST,1005:i.NEAREST_MIPMAP_LINEAR,1006:i.LINEAR,1007:i.LINEAR_MIPMAP_NEAREST,1008:i.LINEAR_MIPMAP_LINEAR},yt={512:i.NEVER,519:i.ALWAYS,513:i.LESS,515:i.LEQUAL,514:i.EQUAL,518:i.GEQUAL,516:i.GREATER,517:i.NOTEQUAL};function Ft(A,M){if(M.type===1015&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===1006||M.magFilter===1007||M.magFilter===1005||M.magFilter===1008||M.minFilter===1006||M.minFilter===1007||M.minFilter===1005||M.minFilter===1008)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,at[M.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,at[M.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,at[M.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,ft[M.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,ft[M.minFilter]),M.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,yt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===1003||M.minFilter!==1005&&M.minFilter!==1008||M.type===1015&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Qt(A,M){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",b));const Z=M.source;let $=d.get(Z);$===void 0&&($={},d.set(Z,$));const X=V(M);if(X!==A.__cacheKey){$[X]===void 0&&($[X]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),$[X].usedTimes++;const Mt=$[A.__cacheKey];Mt!==void 0&&($[A.__cacheKey].usedTimes--,Mt.usedTimes===0&&T(M)),A.__cacheKey=X,A.__webglTexture=$[X].texture}return B}function q(A,M,B){let Z=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(Z=i.TEXTURE_3D);const $=Qt(A,M),X=M.source;e.bindTexture(Z,A.__webglTexture,i.TEXTURE0+B);const Mt=n.get(X);if(X.version!==Mt.__version||$===!0){e.activeTexture(i.TEXTURE0+B);const lt=kt.getPrimaries(kt.workingColorSpace),dt=M.colorSpace===""?null:kt.getPrimaries(M.colorSpace),Ht=M.colorSpace===""||lt===dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ht);let j=v(M.image,!1,r.maxTextureSize);j=ne(M,j);const pt=s.convert(M.format,M.colorSpace),At=s.convert(M.type);let wt=x(M.internalFormat,pt,At,M.colorSpace,M.isVideoTexture);Ft(Z,M);let mt;const Gt=M.mipmaps,Ut=M.isVideoTexture!==!0,te=Mt.__version===void 0||$===!0,D=X.dataReady,rt=R(M,j);if(M.isDepthTexture)wt=g(M.format===1027,M.type),te&&(Ut?e.texStorage2D(i.TEXTURE_2D,1,wt,j.width,j.height):e.texImage2D(i.TEXTURE_2D,0,wt,j.width,j.height,0,pt,At,null));else if(M.isDataTexture)if(Gt.length>0){Ut&&te&&e.texStorage2D(i.TEXTURE_2D,rt,wt,Gt[0].width,Gt[0].height);for(let k=0,J=Gt.length;k<J;k++)mt=Gt[k],Ut?D&&e.texSubImage2D(i.TEXTURE_2D,k,0,0,mt.width,mt.height,pt,At,mt.data):e.texImage2D(i.TEXTURE_2D,k,wt,mt.width,mt.height,0,pt,At,mt.data);M.generateMipmaps=!1}else Ut?(te&&e.texStorage2D(i.TEXTURE_2D,rt,wt,j.width,j.height),D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,j.width,j.height,pt,At,j.data)):e.texImage2D(i.TEXTURE_2D,0,wt,j.width,j.height,0,pt,At,j.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ut&&te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,rt,wt,Gt[0].width,Gt[0].height,j.depth);for(let k=0,J=Gt.length;k<J;k++)if(mt=Gt[k],M.format!==1023)if(pt!==null)if(Ut){if(D)if(M.layerUpdates.size>0){const ut=ca(mt.width,mt.height,M.format,M.type);for(const ct of M.layerUpdates){const Pt=mt.data.subarray(ct*ut/mt.data.BYTES_PER_ELEMENT,(ct+1)*ut/mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,k,0,0,ct,mt.width,mt.height,1,pt,Pt)}M.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,k,0,0,0,mt.width,mt.height,j.depth,pt,mt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,k,wt,mt.width,mt.height,j.depth,0,mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ut?D&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,k,0,0,0,mt.width,mt.height,j.depth,pt,At,mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,k,wt,mt.width,mt.height,j.depth,0,pt,At,mt.data)}else{Ut&&te&&e.texStorage2D(i.TEXTURE_2D,rt,wt,Gt[0].width,Gt[0].height);for(let k=0,J=Gt.length;k<J;k++)mt=Gt[k],M.format!==1023?pt!==null?Ut?D&&e.compressedTexSubImage2D(i.TEXTURE_2D,k,0,0,mt.width,mt.height,pt,mt.data):e.compressedTexImage2D(i.TEXTURE_2D,k,wt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ut?D&&e.texSubImage2D(i.TEXTURE_2D,k,0,0,mt.width,mt.height,pt,At,mt.data):e.texImage2D(i.TEXTURE_2D,k,wt,mt.width,mt.height,0,pt,At,mt.data)}else if(M.isDataArrayTexture)if(Ut){if(te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,rt,wt,j.width,j.height,j.depth),D)if(M.layerUpdates.size>0){const k=ca(j.width,j.height,M.format,M.type);for(const J of M.layerUpdates){const ut=j.data.subarray(J*k/j.data.BYTES_PER_ELEMENT,(J+1)*k/j.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,J,j.width,j.height,1,pt,At,ut)}M.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,pt,At,j.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,wt,j.width,j.height,j.depth,0,pt,At,j.data);else if(M.isData3DTexture)Ut?(te&&e.texStorage3D(i.TEXTURE_3D,rt,wt,j.width,j.height,j.depth),D&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,pt,At,j.data)):e.texImage3D(i.TEXTURE_3D,0,wt,j.width,j.height,j.depth,0,pt,At,j.data);else if(M.isFramebufferTexture){if(te)if(Ut)e.texStorage2D(i.TEXTURE_2D,rt,wt,j.width,j.height);else{let k=j.width,J=j.height;for(let ut=0;ut<rt;ut++)e.texImage2D(i.TEXTURE_2D,ut,wt,k,J,0,pt,At,null),k>>=1,J>>=1}}else if(Gt.length>0){if(Ut&&te){const k=Et(Gt[0]);e.texStorage2D(i.TEXTURE_2D,rt,wt,k.width,k.height)}for(let k=0,J=Gt.length;k<J;k++)mt=Gt[k],Ut?D&&e.texSubImage2D(i.TEXTURE_2D,k,0,0,pt,At,mt):e.texImage2D(i.TEXTURE_2D,k,wt,pt,At,mt);M.generateMipmaps=!1}else if(Ut){if(te){const k=Et(j);e.texStorage2D(i.TEXTURE_2D,rt,wt,k.width,k.height)}D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,pt,At,j)}else e.texImage2D(i.TEXTURE_2D,0,wt,pt,At,j);m(M)&&h(Z),Mt.__version=X.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function tt(A,M,B){if(M.image.length!==6)return;const Z=Qt(A,M),$=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+B);const X=n.get($);if($.version!==X.__version||Z===!0){e.activeTexture(i.TEXTURE0+B);const Mt=kt.getPrimaries(kt.workingColorSpace),lt=M.colorSpace===""?null:kt.getPrimaries(M.colorSpace),dt=M.colorSpace===""||Mt===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);const Ht=M.isCompressedTexture||M.image[0].isCompressedTexture,j=M.image[0]&&M.image[0].isDataTexture,pt=[];for(let J=0;J<6;J++)!Ht&&!j?pt[J]=v(M.image[J],!0,r.maxCubemapSize):pt[J]=j?M.image[J].image:M.image[J],pt[J]=ne(M,pt[J]);const At=pt[0],wt=s.convert(M.format,M.colorSpace),mt=s.convert(M.type),Gt=x(M.internalFormat,wt,mt,M.colorSpace),Ut=M.isVideoTexture!==!0,te=X.__version===void 0||Z===!0,D=$.dataReady;let rt=R(M,At);Ft(i.TEXTURE_CUBE_MAP,M);let k;if(Ht){Ut&&te&&e.texStorage2D(i.TEXTURE_CUBE_MAP,rt,Gt,At.width,At.height);for(let J=0;J<6;J++){k=pt[J].mipmaps;for(let ut=0;ut<k.length;ut++){const ct=k[ut];M.format!==1023?wt!==null?Ut?D&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut,0,0,ct.width,ct.height,wt,ct.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut,Gt,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ut?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut,0,0,ct.width,ct.height,wt,mt,ct.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut,Gt,ct.width,ct.height,0,wt,mt,ct.data)}}}else{if(k=M.mipmaps,Ut&&te){k.length>0&&rt++;const J=Et(pt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,rt,Gt,J.width,J.height)}for(let J=0;J<6;J++)if(j){Ut?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,pt[J].width,pt[J].height,wt,mt,pt[J].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Gt,pt[J].width,pt[J].height,0,wt,mt,pt[J].data);for(let ut=0;ut<k.length;ut++){const Pt=k[ut].image[J].image;Ut?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut+1,0,0,Pt.width,Pt.height,wt,mt,Pt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut+1,Gt,Pt.width,Pt.height,0,wt,mt,Pt.data)}}else{Ut?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,wt,mt,pt[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Gt,wt,mt,pt[J]);for(let ut=0;ut<k.length;ut++){const ct=k[ut];Ut?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut+1,0,0,wt,mt,ct.image[J]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ut+1,Gt,wt,mt,ct.image[J])}}}m(M)&&h(i.TEXTURE_CUBE_MAP),X.__version=$.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function xt(A,M,B,Z,$,X){const Mt=s.convert(B.format,B.colorSpace),lt=s.convert(B.type),dt=x(B.internalFormat,Mt,lt,B.colorSpace),Ht=n.get(M),j=n.get(B);if(j.__renderTarget=M,!Ht.__hasExternalTextures){const pt=Math.max(1,M.width>>X),At=Math.max(1,M.height>>X);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?e.texImage3D($,X,dt,pt,At,M.depth,0,Mt,lt,null):e.texImage2D($,X,dt,pt,At,0,Mt,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),zt(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,$,j.__webglTexture,0,Bt(M)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,$,j.__webglTexture,X),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ot(A,M,B){if(i.bindRenderbuffer(i.RENDERBUFFER,A),M.depthBuffer){const Z=M.depthTexture,$=Z&&Z.isDepthTexture?Z.type:null,X=g(M.stencilBuffer,$),Mt=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=Bt(M);zt(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt,X,M.width,M.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt,X,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,X,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Mt,i.RENDERBUFFER,A)}else{const Z=M.textures;for(let $=0;$<Z.length;$++){const X=Z[$],Mt=s.convert(X.format,X.colorSpace),lt=s.convert(X.type),dt=x(X.internalFormat,Mt,lt,X.colorSpace),Ht=Bt(M);B&&zt(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ht,dt,M.width,M.height):zt(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ht,dt,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,dt,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function bt(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(M.depthTexture);Z.__renderTarget=M,(!Z.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Y(M.depthTexture,0);const $=Z.__webglTexture,X=Bt(M);if(M.depthTexture.format===1026)zt(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0);else if(M.depthTexture.format===1027)zt(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0,X):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function Ct(A){const M=n.get(A),B=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){const Z=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),Z){const $=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,Z.removeEventListener("dispose",$)};Z.addEventListener("dispose",$),M.__depthDisposeCallback=$}M.__boundDepthTexture=Z}if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");bt(M.__webglFramebuffer,A)}else if(B){M.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[Z]),M.__webglDepthbuffer[Z]===void 0)M.__webglDepthbuffer[Z]=i.createRenderbuffer(),ot(M.__webglDepthbuffer[Z],A,!1);else{const $=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,X=M.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,X),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,X)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),ot(M.__webglDepthbuffer,A,!1);else{const Z=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,$)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Nt(A,M,B){const Z=n.get(A);M!==void 0&&xt(Z.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Ct(A)}function se(A){const M=A.texture,B=n.get(A),Z=n.get(M);A.addEventListener("dispose",w);const $=A.textures,X=A.isWebGLCubeRenderTarget===!0,Mt=$.length>1;if(Mt||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=M.version,a.memory.textures++),X){B.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer[lt]=[];for(let dt=0;dt<M.mipmaps.length;dt++)B.__webglFramebuffer[lt][dt]=i.createFramebuffer()}else B.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer=[];for(let lt=0;lt<M.mipmaps.length;lt++)B.__webglFramebuffer[lt]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Mt)for(let lt=0,dt=$.length;lt<dt;lt++){const Ht=n.get($[lt]);Ht.__webglTexture===void 0&&(Ht.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&zt(A)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let lt=0;lt<$.length;lt++){const dt=$[lt];B.__webglColorRenderbuffer[lt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[lt]);const Ht=s.convert(dt.format,dt.colorSpace),j=s.convert(dt.type),pt=x(dt.internalFormat,Ht,j,dt.colorSpace,A.isXRRenderTarget===!0),At=Bt(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,At,pt,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,B.__webglColorRenderbuffer[lt])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),ot(B.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),Ft(i.TEXTURE_CUBE_MAP,M);for(let lt=0;lt<6;lt++)if(M.mipmaps&&M.mipmaps.length>0)for(let dt=0;dt<M.mipmaps.length;dt++)xt(B.__webglFramebuffer[lt][dt],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,dt);else xt(B.__webglFramebuffer[lt],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);m(M)&&h(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Mt){for(let lt=0,dt=$.length;lt<dt;lt++){const Ht=$[lt],j=n.get(Ht);e.bindTexture(i.TEXTURE_2D,j.__webglTexture),Ft(i.TEXTURE_2D,Ht),xt(B.__webglFramebuffer,A,Ht,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,0),m(Ht)&&h(i.TEXTURE_2D)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(lt=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,Z.__webglTexture),Ft(lt,M),M.mipmaps&&M.mipmaps.length>0)for(let dt=0;dt<M.mipmaps.length;dt++)xt(B.__webglFramebuffer[dt],A,M,i.COLOR_ATTACHMENT0,lt,dt);else xt(B.__webglFramebuffer,A,M,i.COLOR_ATTACHMENT0,lt,0);m(M)&&h(lt),e.unbindTexture()}A.depthBuffer&&Ct(A)}function Vt(A){const M=A.textures;for(let B=0,Z=M.length;B<Z;B++){const $=M[B];if(m($)){const X=y(A),Mt=n.get($).__webglTexture;e.bindTexture(X,Mt),h(X),e.unbindTexture()}}}const ce=[],F=[];function Le(A){if(A.samples>0){if(zt(A)===!1){const M=A.textures,B=A.width,Z=A.height;let $=i.COLOR_BUFFER_BIT;const X=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Mt=n.get(A),lt=M.length>1;if(lt)for(let dt=0;dt<M.length;dt++)e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let dt=0;dt<M.length;dt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),lt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Mt.__webglColorRenderbuffer[dt]);const Ht=n.get(M[dt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ht,0)}i.blitFramebuffer(0,0,B,Z,0,0,B,Z,$,i.NEAREST),l===!0&&(ce.length=0,F.length=0,ce.push(i.COLOR_ATTACHMENT0+dt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ce.push(X),F.push(X),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,F)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ce))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),lt)for(let dt=0;dt<M.length;dt++){e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,Mt.__webglColorRenderbuffer[dt]);const Ht=n.get(M[dt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,Ht,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const M=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function Bt(A){return Math.min(r.maxSamples,A.samples)}function zt(A){const M=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Tt(A){const M=a.render.frame;u.get(A)!==M&&(u.set(A,M),A.update())}function ne(A,M){const B=A.colorSpace,Z=A.format,$=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==Wn&&B!==""&&(kt.getTransfer(B)===jt?(Z!==1023||$!==1009)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),M}function Et(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=N,this.resetTextureUnits=O,this.setTexture2D=Y,this.setTexture2DArray=W,this.setTexture3D=K,this.setTextureCube=H,this.rebindTextures=Nt,this.setupRenderTarget=se,this.updateRenderTargetMipmap=Vt,this.updateMultisampleRenderTarget=Le,this.setupDepthRenderbuffer=Ct,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=zt}function Cf(i,t){function e(n,r=""){let s;const a=kt.getTransfer(r);if(n===1009)return i.UNSIGNED_BYTE;if(n===1017)return i.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return i.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===1010)return i.BYTE;if(n===1011)return i.SHORT;if(n===1012)return i.UNSIGNED_SHORT;if(n===1013)return i.INT;if(n===1014)return i.UNSIGNED_INT;if(n===1015)return i.FLOAT;if(n===1016)return i.HALF_FLOAT;if(n===1021)return i.ALPHA;if(n===1022)return i.RGB;if(n===1023)return i.RGBA;if(n===1024)return i.LUMINANCE;if(n===1025)return i.LUMINANCE_ALPHA;if(n===1026)return i.DEPTH_COMPONENT;if(n===1027)return i.DEPTH_STENCIL;if(n===1028)return i.RED;if(n===1029)return i.RED_INTEGER;if(n===1030)return i.RG;if(n===1031)return i.RG_INTEGER;if(n===1033)return i.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===jt)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===33776)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===33776)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===35840)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===36196||n===37492)return a===jt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===37496)return a===jt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===37808)return a===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===36492)return a===jt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===36492)return s.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Pf extends Ae{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ye extends ge{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Lf={type:"move"};class Dr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ye,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ye,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ye,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),h=this._getHandJoint(c,v);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),p=.02,_=.005;c.inputState.pinching&&d>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Lf)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ye;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Df=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Uf=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class If{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const r=new Ee,s=t.properties.get(r);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new ue({vertexShader:Df,fragmentShader:Uf,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ot(new on(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ff extends Xn{constructor(t,e){super();const n=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,u=null,f=null,d=null,p=null,_=null;const v=new If,m=e.getContextAttributes();let h=null,y=null;const x=[],g=[],R=new it;let b=null;const w=new Ae;w.viewport=new Xt;const L=new Ae;L.viewport=new Xt;const T=[w,L],S=new Pf;let P=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let tt=x[q];return tt===void 0&&(tt=new Dr,x[q]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(q){let tt=x[q];return tt===void 0&&(tt=new Dr,x[q]=tt),tt.getGripSpace()},this.getHand=function(q){let tt=x[q];return tt===void 0&&(tt=new Dr,x[q]=tt),tt.getHandSpace()};function N(q){const tt=g.indexOf(q.inputSource);if(tt===-1)return;const xt=x[tt];xt!==void 0&&(xt.update(q.inputSource,q.frame,c||a),xt.dispatchEvent({type:q.type,data:q.inputSource}))}function V(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",Y);for(let q=0;q<x.length;q++){const tt=g[q];tt!==null&&(g[q]=null,x[q].disconnect(tt))}P=null,O=null,v.reset(),t.setRenderTarget(h),p=null,d=null,f=null,r=null,y=null,Qt.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(h=t.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",V),r.addEventListener("inputsourceschange",Y),m.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(R),r.renderState.layers===void 0){const tt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,e,tt),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Mn(p.framebufferWidth,p.framebufferHeight,{format:1023,type:1009,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let tt=null,xt=null,ot=null;m.depth&&(ot=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=m.stencil?1027:1026,xt=m.stencil?1020:1014);const bt={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:s};f=new XRWebGLBinding(r,e),d=f.createProjectionLayer(bt),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new Mn(d.textureWidth,d.textureHeight,{format:1023,type:1009,depthTexture:new Ba(d.textureWidth,d.textureHeight,xt,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),Qt.setContext(r),Qt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function Y(q){for(let tt=0;tt<q.removed.length;tt++){const xt=q.removed[tt],ot=g.indexOf(xt);ot>=0&&(g[ot]=null,x[ot].disconnect(xt))}for(let tt=0;tt<q.added.length;tt++){const xt=q.added[tt];let ot=g.indexOf(xt);if(ot===-1){for(let Ct=0;Ct<x.length;Ct++)if(Ct>=g.length){g.push(xt),ot=Ct;break}else if(g[Ct]===null){g[Ct]=xt,ot=Ct;break}if(ot===-1)break}const bt=x[ot];bt&&bt.connect(xt)}}const W=new C,K=new C;function H(q,tt,xt){W.setFromMatrixPosition(tt.matrixWorld),K.setFromMatrixPosition(xt.matrixWorld);const ot=W.distanceTo(K),bt=tt.projectionMatrix.elements,Ct=xt.projectionMatrix.elements,Nt=bt[14]/(bt[10]-1),se=bt[14]/(bt[10]+1),Vt=(bt[9]+1)/bt[5],ce=(bt[9]-1)/bt[5],F=(bt[8]-1)/bt[0],Le=(Ct[8]+1)/Ct[0],Bt=Nt*F,zt=Nt*Le,Tt=ot/(-F+Le),ne=Tt*-F;if(tt.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(ne),q.translateZ(Tt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),bt[10]===-1)q.projectionMatrix.copy(tt.projectionMatrix),q.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const Et=Nt+Tt,A=se+Tt,M=Bt-ne,B=zt+(ot-ne),Z=Vt*se/A*Et,$=ce*se/A*Et;q.projectionMatrix.makePerspective(M,B,Z,$,Et,A),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function at(q,tt){tt===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(tt.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let tt=q.near,xt=q.far;v.texture!==null&&(v.depthNear>0&&(tt=v.depthNear),v.depthFar>0&&(xt=v.depthFar)),S.near=L.near=w.near=tt,S.far=L.far=w.far=xt,(P!==S.near||O!==S.far)&&(r.updateRenderState({depthNear:S.near,depthFar:S.far}),P=S.near,O=S.far),w.layers.mask=q.layers.mask|2,L.layers.mask=q.layers.mask|4,S.layers.mask=w.layers.mask|L.layers.mask;const ot=q.parent,bt=S.cameras;at(S,ot);for(let Ct=0;Ct<bt.length;Ct++)at(bt[Ct],ot);bt.length===2?H(S,w,L):S.projectionMatrix.copy(w.projectionMatrix),ft(q,S,ot)};function ft(q,tt,xt){xt===null?q.matrix.copy(tt.matrixWorld):(q.matrix.copy(xt.matrixWorld),q.matrix.invert(),q.matrix.multiply(tt.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(tt.projectionMatrix),q.projectionMatrixInverse.copy(tt.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=di*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(S)};let yt=null;function Ft(q,tt){if(u=tt.getViewerPose(c||a),_=tt,u!==null){const xt=u.views;p!==null&&(t.setRenderTargetFramebuffer(y,p.framebuffer),t.setRenderTarget(y));let ot=!1;xt.length!==S.cameras.length&&(S.cameras.length=0,ot=!0);for(let Ct=0;Ct<xt.length;Ct++){const Nt=xt[Ct];let se=null;if(p!==null)se=p.getViewport(Nt);else{const ce=f.getViewSubImage(d,Nt);se=ce.viewport,Ct===0&&(t.setRenderTargetTextures(y,ce.colorTexture,d.ignoreDepthValues?void 0:ce.depthStencilTexture),t.setRenderTarget(y))}let Vt=T[Ct];Vt===void 0&&(Vt=new Ae,Vt.layers.enable(Ct),Vt.viewport=new Xt,T[Ct]=Vt),Vt.matrix.fromArray(Nt.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray(Nt.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set(se.x,se.y,se.width,se.height),Ct===0&&(S.matrix.copy(Vt.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ot===!0&&S.cameras.push(Vt)}const bt=r.enabledFeatures;if(bt&&bt.includes("depth-sensing")){const Ct=f.getDepthInformation(xt[0]);Ct&&Ct.isValid&&Ct.texture&&v.init(t,Ct,r.renderState)}}for(let xt=0;xt<x.length;xt++){const ot=g[xt],bt=x[xt];ot!==null&&bt!==void 0&&bt.update(ot,tt,c||a)}yt&&yt(q,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),_=null}const Qt=new Na;Qt.setAnimationLoop(Ft),this.setAnimationLoop=function(q){yt=q},this.dispose=function(){}}}const mn=new He,Nf=new Zt;function Of(i,t){function e(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function n(m,h){h.color.getRGB(m.fogColor.value,Ua(i)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function r(m,h,y,x,g){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(m,h):h.isMeshToonMaterial?(s(m,h),f(m,h)):h.isMeshPhongMaterial?(s(m,h),u(m,h)):h.isMeshStandardMaterial?(s(m,h),d(m,h),h.isMeshPhysicalMaterial&&p(m,h,g)):h.isMeshMatcapMaterial?(s(m,h),_(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),v(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(a(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?l(m,h,y,x):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,e(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,e(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===1&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,e(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===1&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,e(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,e(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const y=t.get(h),x=y.envMap,g=y.envMapRotation;x&&(m.envMap.value=x,mn.copy(g),mn.x*=-1,mn.y*=-1,mn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(mn.y*=-1,mn.z*=-1),m.envMapRotation.value.setFromMatrix4(Nf.makeRotationFromEuler(mn)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,m.aoMapTransform))}function a(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,e(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,y,x){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*y,m.scale.value=x*.5,h.map&&(m.map.value=h.map,e(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,e(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function f(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function d(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,y){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===1&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,h){h.matcap&&(m.matcap.value=h.matcap)}function v(m,h){const y=t.get(h).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Bf(i,t,e,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,x){const g=x.program;n.uniformBlockBinding(y,g)}function c(y,x){let g=r[y.id];g===void 0&&(_(y),g=u(y),r[y.id]=g,y.addEventListener("dispose",m));const R=x.program;n.updateUBOMapping(y,R);const b=t.render.frame;s[y.id]!==b&&(d(y),s[y.id]=b)}function u(y){const x=f();y.__bindingPointIndex=x;const g=i.createBuffer(),R=y.__size,b=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,g),i.bufferData(i.UNIFORM_BUFFER,R,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,g),g}function f(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const x=r[y.id],g=y.uniforms,R=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let b=0,w=g.length;b<w;b++){const L=Array.isArray(g[b])?g[b]:[g[b]];for(let T=0,S=L.length;T<S;T++){const P=L[T];if(p(P,b,T,R)===!0){const O=P.__offset,N=Array.isArray(P.value)?P.value:[P.value];let V=0;for(let Y=0;Y<N.length;Y++){const W=N[Y],K=v(W);typeof W=="number"||typeof W=="boolean"?(P.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,O+V,P.__data)):W.isMatrix3?(P.__data[0]=W.elements[0],P.__data[1]=W.elements[1],P.__data[2]=W.elements[2],P.__data[3]=0,P.__data[4]=W.elements[3],P.__data[5]=W.elements[4],P.__data[6]=W.elements[5],P.__data[7]=0,P.__data[8]=W.elements[6],P.__data[9]=W.elements[7],P.__data[10]=W.elements[8],P.__data[11]=0):(W.toArray(P.__data,V),V+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(y,x,g,R){const b=y.value,w=x+"_"+g;if(R[w]===void 0)return typeof b=="number"||typeof b=="boolean"?R[w]=b:R[w]=b.clone(),!0;{const L=R[w];if(typeof b=="number"||typeof b=="boolean"){if(L!==b)return R[w]=b,!0}else if(L.equals(b)===!1)return L.copy(b),!0}return!1}function _(y){const x=y.uniforms;let g=0;const R=16;for(let w=0,L=x.length;w<L;w++){const T=Array.isArray(x[w])?x[w]:[x[w]];for(let S=0,P=T.length;S<P;S++){const O=T[S],N=Array.isArray(O.value)?O.value:[O.value];for(let V=0,Y=N.length;V<Y;V++){const W=N[V],K=v(W),H=g%R,at=H%K.boundary,ft=H+at;g+=at,ft!==0&&R-ft<K.storage&&(g+=R-ft),O.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=g,g+=K.storage}}}const b=g%R;return b>0&&(g+=R-b),y.__size=g,y.__cache={},this}function v(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function m(y){const x=y.target;x.removeEventListener("dispose",m);const g=a.indexOf(x.__bindingPointIndex);a.splice(g,1),i.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function h(){for(const y in r)i.deleteBuffer(r[y]);a=[],r={},s={}}return{bind:l,update:c,dispose:h}}class zf{constructor(t={}){const{canvas:e=wo(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const _=new Uint32Array(4),v=new Int32Array(4);let m=null,h=null;const y=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ce,this.toneMapping=0,this.toneMappingExposure=1;const g=this;let R=!1,b=0,w=0,L=null,T=-1,S=null;const P=new Xt,O=new Xt;let N=null;const V=new st(0);let Y=0,W=e.width,K=e.height,H=1,at=null,ft=null;const yt=new Xt(0,0,W,K),Ft=new Xt(0,0,W,K);let Qt=!1;const q=new Kr;let tt=!1,xt=!1;const ot=new Zt,bt=new Zt,Ct=new C,Nt=new Xt,se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Vt=!1;function ce(){return L===null?H:1}let F=n;function Le(E,U){return e.getContext(E,U)}try{const E={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r170"),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",ut,!1),e.addEventListener("webglcontextcreationerror",ct,!1),F===null){const U="webgl2";if(F=Le(U,E),F===null)throw Le(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Bt,zt,Tt,ne,Et,A,M,B,Z,$,X,Mt,lt,dt,Ht,j,pt,At,wt,mt,Gt,Ut,te,D;function rt(){Bt=new kh(F),Bt.init(),Ut=new Cf(F,Bt),zt=new Oh(F,Bt,t,Ut),Tt=new bf(F,Bt),zt.reverseDepthBuffer&&d&&Tt.buffers.depth.setReversed(!0),ne=new qh(F),Et=new uf,A=new Rf(F,Bt,Tt,Et,zt,Ut,ne),M=new zh(g),B=new Hh(g),Z=new Qo(F),te=new Fh(F,Z),$=new Wh(F,Z,ne,te),X=new Zh(F,$,Z,ne),wt=new Yh(F,zt,A),j=new Bh(Et),Mt=new hf(g,M,B,Bt,zt,te,j),lt=new Of(g,Et),dt=new df,Ht=new xf(Bt),At=new Ih(g,M,B,Tt,X,p,l),pt=new Tf(g,X,zt),D=new Bf(F,ne,zt,Tt),mt=new Nh(F,Bt,ne),Gt=new Xh(F,Bt,ne),ne.programs=Mt.programs,g.capabilities=zt,g.extensions=Bt,g.properties=Et,g.renderLists=dt,g.shadowMap=pt,g.state=Tt,g.info=ne}rt();const k=new Ff(g,F);this.xr=k,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const E=Bt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Bt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(E){E!==void 0&&(H=E,this.setSize(W,K,!1))},this.getSize=function(E){return E.set(W,K)},this.setSize=function(E,U,z=!0){if(k.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=E,K=U,e.width=Math.floor(E*H),e.height=Math.floor(U*H),z===!0&&(e.style.width=E+"px",e.style.height=U+"px"),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(W*H,K*H).floor()},this.setDrawingBufferSize=function(E,U,z){W=E,K=U,H=z,e.width=Math.floor(E*z),e.height=Math.floor(U*z),this.setViewport(0,0,E,U)},this.getCurrentViewport=function(E){return E.copy(P)},this.getViewport=function(E){return E.copy(yt)},this.setViewport=function(E,U,z,G){E.isVector4?yt.set(E.x,E.y,E.z,E.w):yt.set(E,U,z,G),Tt.viewport(P.copy(yt).multiplyScalar(H).round())},this.getScissor=function(E){return E.copy(Ft)},this.setScissor=function(E,U,z,G){E.isVector4?Ft.set(E.x,E.y,E.z,E.w):Ft.set(E,U,z,G),Tt.scissor(O.copy(Ft).multiplyScalar(H).round())},this.getScissorTest=function(){return Qt},this.setScissorTest=function(E){Tt.setScissorTest(Qt=E)},this.setOpaqueSort=function(E){at=E},this.setTransparentSort=function(E){ft=E},this.getClearColor=function(E){return E.copy(At.getClearColor())},this.setClearColor=function(){At.setClearColor.apply(At,arguments)},this.getClearAlpha=function(){return At.getClearAlpha()},this.setClearAlpha=function(){At.setClearAlpha.apply(At,arguments)},this.clear=function(E=!0,U=!0,z=!0){let G=0;if(E){let I=!1;if(L!==null){const Q=L.texture.format;I=Q===1033||Q===1031||Q===1029}if(I){const Q=L.texture.type,ht=Q===1009||Q===1014||Q===1012||Q===1020||Q===1017||Q===1018,gt=At.getClearColor(),_t=At.getClearAlpha(),Rt=gt.r,Lt=gt.g,vt=gt.b;ht?(_[0]=Rt,_[1]=Lt,_[2]=vt,_[3]=_t,F.clearBufferuiv(F.COLOR,0,_)):(v[0]=Rt,v[1]=Lt,v[2]=vt,v[3]=_t,F.clearBufferiv(F.COLOR,0,v))}else G|=F.COLOR_BUFFER_BIT}U&&(G|=F.DEPTH_BUFFER_BIT),z&&(G|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",ut,!1),e.removeEventListener("webglcontextcreationerror",ct,!1),dt.dispose(),Ht.dispose(),Et.dispose(),M.dispose(),B.dispose(),X.dispose(),te.dispose(),D.dispose(),Mt.dispose(),k.dispose(),k.removeEventListener("sessionstart",cs),k.removeEventListener("sessionend",hs),cn.stop()};function J(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ut(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const E=ne.autoReset,U=pt.enabled,z=pt.autoUpdate,G=pt.needsUpdate,I=pt.type;rt(),ne.autoReset=E,pt.enabled=U,pt.autoUpdate=z,pt.needsUpdate=G,pt.type=I}function ct(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Pt(E){const U=E.target;U.removeEventListener("dispose",Pt),oe(U)}function oe(E){_e(E),Et.remove(E)}function _e(E){const U=Et.get(E).programs;U!==void 0&&(U.forEach(function(z){Mt.releaseProgram(z)}),E.isShaderMaterial&&Mt.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,z,G,I,Q){U===null&&(U=se);const ht=I.isMesh&&I.matrixWorld.determinant()<0,gt=so(E,U,z,G,I);Tt.setMaterial(G,ht);let _t=z.index,Rt=1;if(G.wireframe===!0){if(_t=$.getWireframeAttribute(z),_t===void 0)return;Rt=2}const Lt=z.drawRange,vt=z.attributes.position;let Wt=Lt.start*Rt,ee=(Lt.start+Lt.count)*Rt;Q!==null&&(Wt=Math.max(Wt,Q.start*Rt),ee=Math.min(ee,(Q.start+Q.count)*Rt)),_t!==null?(Wt=Math.max(Wt,0),ee=Math.min(ee,_t.count)):vt!=null&&(Wt=Math.max(Wt,0),ee=Math.min(ee,vt.count));const ie=ee-Wt;if(ie<0||ie===1/0)return;te.setup(I,G,gt,z,_t);let Te,qt=mt;if(_t!==null&&(Te=Z.get(_t),qt=Gt,qt.setIndex(Te)),I.isMesh)G.wireframe===!0?(Tt.setLineWidth(G.wireframeLinewidth*ce()),qt.setMode(F.LINES)):qt.setMode(F.TRIANGLES);else if(I.isLine){let St=G.linewidth;St===void 0&&(St=1),Tt.setLineWidth(St*ce()),I.isLineSegments?qt.setMode(F.LINES):I.isLineLoop?qt.setMode(F.LINE_LOOP):qt.setMode(F.LINE_STRIP)}else I.isPoints?qt.setMode(F.POINTS):I.isSprite&&qt.setMode(F.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)qt.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Bt.get("WEBGL_multi_draw"))qt.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const St=I._multiDrawStarts,Xe=I._multiDrawCounts,Yt=I._multiDrawCount,Fe=_t?Z.get(_t).bytesPerElement:1,Tn=Et.get(G).currentProgram.getUniforms();for(let be=0;be<Yt;be++)Tn.setValue(F,"_gl_DrawID",be),qt.render(St[be]/Fe,Xe[be])}else if(I.isInstancedMesh)qt.renderInstances(Wt,ie,I.count);else if(z.isInstancedBufferGeometry){const St=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Xe=Math.min(z.instanceCount,St);qt.renderInstances(Wt,ie,Xe)}else qt.render(Wt,ie)};function Jt(E,U,z){E.transparent===!0&&E.side===2&&E.forceSinglePass===!1?(E.side=1,E.needsUpdate=!0,Si(E,U,z),E.side=0,E.needsUpdate=!0,Si(E,U,z),E.side=2):Si(E,U,z)}this.compile=function(E,U,z=null){z===null&&(z=E),h=Ht.get(z),h.init(U),x.push(h),z.traverseVisible(function(I){I.isLight&&I.layers.test(U.layers)&&(h.pushLight(I),I.castShadow&&h.pushShadow(I))}),E!==z&&E.traverseVisible(function(I){I.isLight&&I.layers.test(U.layers)&&(h.pushLight(I),I.castShadow&&h.pushShadow(I))}),h.setupLights();const G=new Set;return E.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const Q=I.material;if(Q)if(Array.isArray(Q))for(let ht=0;ht<Q.length;ht++){const gt=Q[ht];Jt(gt,z,I),G.add(gt)}else Jt(Q,z,I),G.add(Q)}),x.pop(),h=null,G},this.compileAsync=function(E,U,z=null){const G=this.compile(E,U,z);return new Promise(I=>{function Q(){if(G.forEach(function(ht){Et.get(ht).currentProgram.isReady()&&G.delete(ht)}),G.size===0){I(E);return}setTimeout(Q,10)}Bt.get("KHR_parallel_shader_compile")!==null?Q():setTimeout(Q,10)})};let Ie=null;function We(E){Ie&&Ie(E)}function cs(){cn.stop()}function hs(){cn.start()}const cn=new Na;cn.setAnimationLoop(We),typeof self<"u"&&cn.setContext(self),this.setAnimationLoop=function(E){Ie=E,k.setAnimationLoop(E),E===null?cn.stop():cn.start()},k.addEventListener("sessionstart",cs),k.addEventListener("sessionend",hs),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),k.enabled===!0&&k.isPresenting===!0&&(k.cameraAutoUpdate===!0&&k.updateCamera(U),U=k.getCamera()),E.isScene===!0&&E.onBeforeRender(g,E,U,L),h=Ht.get(E,x.length),h.init(U),x.push(h),bt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),q.setFromProjectionMatrix(bt),xt=this.localClippingEnabled,tt=j.init(this.clippingPlanes,xt),m=dt.get(E,y.length),m.init(),y.push(m),k.enabled===!0&&k.isPresenting===!0){const Q=g.xr.getDepthSensingMesh();Q!==null&&sr(Q,U,-1/0,g.sortObjects)}sr(E,U,0,g.sortObjects),m.finish(),g.sortObjects===!0&&m.sort(at,ft),Vt=k.enabled===!1||k.isPresenting===!1||k.hasDepthSensing()===!1,Vt&&At.addToRenderList(m,E),this.info.render.frame++,tt===!0&&j.beginShadows();const z=h.state.shadowsArray;pt.render(z,E,U),tt===!0&&j.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=m.opaque,I=m.transmissive;if(h.setupLights(),U.isArrayCamera){const Q=U.cameras;if(I.length>0)for(let ht=0,gt=Q.length;ht<gt;ht++){const _t=Q[ht];fs(G,I,E,_t)}Vt&&At.render(E);for(let ht=0,gt=Q.length;ht<gt;ht++){const _t=Q[ht];us(m,E,_t,_t.viewport)}}else I.length>0&&fs(G,I,E,U),Vt&&At.render(E),us(m,E,U);L!==null&&(A.updateMultisampleRenderTarget(L),A.updateRenderTargetMipmap(L)),E.isScene===!0&&E.onAfterRender(g,E,U),te.resetDefaultState(),T=-1,S=null,x.pop(),x.length>0?(h=x[x.length-1],tt===!0&&j.setGlobalState(g.clippingPlanes,h.state.camera)):h=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function sr(E,U,z,G){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)z=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)h.pushLight(E),E.castShadow&&h.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||q.intersectsSprite(E)){G&&Nt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(bt);const ht=X.update(E),gt=E.material;gt.visible&&m.push(E,ht,gt,z,Nt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||q.intersectsObject(E))){const ht=X.update(E),gt=E.material;if(G&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Nt.copy(E.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Nt.copy(ht.boundingSphere.center)),Nt.applyMatrix4(E.matrixWorld).applyMatrix4(bt)),Array.isArray(gt)){const _t=ht.groups;for(let Rt=0,Lt=_t.length;Rt<Lt;Rt++){const vt=_t[Rt],Wt=gt[vt.materialIndex];Wt&&Wt.visible&&m.push(E,ht,Wt,z,Nt.z,vt)}}else gt.visible&&m.push(E,ht,gt,z,Nt.z,null)}}const Q=E.children;for(let ht=0,gt=Q.length;ht<gt;ht++)sr(Q[ht],U,z,G)}function us(E,U,z,G){const I=E.opaque,Q=E.transmissive,ht=E.transparent;h.setupLightsView(z),tt===!0&&j.setGlobalState(g.clippingPlanes,z),G&&Tt.viewport(P.copy(G)),I.length>0&&Mi(I,U,z),Q.length>0&&Mi(Q,U,z),ht.length>0&&Mi(ht,U,z),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function fs(E,U,z,G){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[G.id]===void 0&&(h.state.transmissionRenderTarget[G.id]=new Mn(1,1,{generateMipmaps:!0,type:Bt.has("EXT_color_buffer_half_float")||Bt.has("EXT_color_buffer_float")?1016:1009,minFilter:1008,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:kt.workingColorSpace}));const Q=h.state.transmissionRenderTarget[G.id],ht=G.viewport||P;Q.setSize(ht.z,ht.w);const gt=g.getRenderTarget();g.setRenderTarget(Q),g.getClearColor(V),Y=g.getClearAlpha(),Y<1&&g.setClearColor(16777215,.5),g.clear(),Vt&&At.render(z);const _t=g.toneMapping;g.toneMapping=0;const Rt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),h.setupLightsView(G),tt===!0&&j.setGlobalState(g.clippingPlanes,G),Mi(E,z,G),A.updateMultisampleRenderTarget(Q),A.updateRenderTargetMipmap(Q),Bt.has("WEBGL_multisampled_render_to_texture")===!1){let Lt=!1;for(let vt=0,Wt=U.length;vt<Wt;vt++){const ee=U[vt],ie=ee.object,Te=ee.geometry,qt=ee.material,St=ee.group;if(qt.side===2&&ie.layers.test(G.layers)){const Xe=qt.side;qt.side=1,qt.needsUpdate=!0,ds(ie,z,G,Te,qt,St),qt.side=Xe,qt.needsUpdate=!0,Lt=!0}}Lt===!0&&(A.updateMultisampleRenderTarget(Q),A.updateRenderTargetMipmap(Q))}g.setRenderTarget(gt),g.setClearColor(V,Y),Rt!==void 0&&(G.viewport=Rt),g.toneMapping=_t}function Mi(E,U,z){const G=U.isScene===!0?U.overrideMaterial:null;for(let I=0,Q=E.length;I<Q;I++){const ht=E[I],gt=ht.object,_t=ht.geometry,Rt=G===null?ht.material:G,Lt=ht.group;gt.layers.test(z.layers)&&ds(gt,U,z,_t,Rt,Lt)}}function ds(E,U,z,G,I,Q){E.onBeforeRender(g,U,z,G,I,Q),E.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),I.onBeforeRender(g,U,z,G,E,Q),I.transparent===!0&&I.side===2&&I.forceSinglePass===!1?(I.side=1,I.needsUpdate=!0,g.renderBufferDirect(z,U,G,I,E,Q),I.side=0,I.needsUpdate=!0,g.renderBufferDirect(z,U,G,I,E,Q),I.side=2):g.renderBufferDirect(z,U,G,I,E,Q),E.onAfterRender(g,U,z,G,I,Q)}function Si(E,U,z){U.isScene!==!0&&(U=se);const G=Et.get(E),I=h.state.lights,Q=h.state.shadowsArray,ht=I.state.version,gt=Mt.getParameters(E,I.state,Q,U,z),_t=Mt.getProgramCacheKey(gt);let Rt=G.programs;G.environment=E.isMeshStandardMaterial?U.environment:null,G.fog=U.fog,G.envMap=(E.isMeshStandardMaterial?B:M).get(E.envMap||G.environment),G.envMapRotation=G.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,Rt===void 0&&(E.addEventListener("dispose",Pt),Rt=new Map,G.programs=Rt);let Lt=Rt.get(_t);if(Lt!==void 0){if(G.currentProgram===Lt&&G.lightsStateVersion===ht)return ms(E,gt),Lt}else gt.uniforms=Mt.getUniforms(E),E.onBeforeCompile(gt,g),Lt=Mt.acquireProgram(gt,_t),Rt.set(_t,Lt),G.uniforms=gt.uniforms;const vt=G.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(vt.clippingPlanes=j.uniform),ms(E,gt),G.needsLights=oo(E),G.lightsStateVersion=ht,G.needsLights&&(vt.ambientLightColor.value=I.state.ambient,vt.lightProbe.value=I.state.probe,vt.directionalLights.value=I.state.directional,vt.directionalLightShadows.value=I.state.directionalShadow,vt.spotLights.value=I.state.spot,vt.spotLightShadows.value=I.state.spotShadow,vt.rectAreaLights.value=I.state.rectArea,vt.ltc_1.value=I.state.rectAreaLTC1,vt.ltc_2.value=I.state.rectAreaLTC2,vt.pointLights.value=I.state.point,vt.pointLightShadows.value=I.state.pointShadow,vt.hemisphereLights.value=I.state.hemi,vt.directionalShadowMap.value=I.state.directionalShadowMap,vt.directionalShadowMatrix.value=I.state.directionalShadowMatrix,vt.spotShadowMap.value=I.state.spotShadowMap,vt.spotLightMatrix.value=I.state.spotLightMatrix,vt.spotLightMap.value=I.state.spotLightMap,vt.pointShadowMap.value=I.state.pointShadowMap,vt.pointShadowMatrix.value=I.state.pointShadowMatrix),G.currentProgram=Lt,G.uniformsList=null,Lt}function ps(E){if(E.uniformsList===null){const U=E.currentProgram.getUniforms();E.uniformsList=Ji.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function ms(E,U){const z=Et.get(E);z.outputColorSpace=U.outputColorSpace,z.batching=U.batching,z.batchingColor=U.batchingColor,z.instancing=U.instancing,z.instancingColor=U.instancingColor,z.instancingMorph=U.instancingMorph,z.skinning=U.skinning,z.morphTargets=U.morphTargets,z.morphNormals=U.morphNormals,z.morphColors=U.morphColors,z.morphTargetsCount=U.morphTargetsCount,z.numClippingPlanes=U.numClippingPlanes,z.numIntersection=U.numClipIntersection,z.vertexAlphas=U.vertexAlphas,z.vertexTangents=U.vertexTangents,z.toneMapping=U.toneMapping}function so(E,U,z,G,I){U.isScene!==!0&&(U=se),A.resetTextureUnits();const Q=U.fog,ht=G.isMeshStandardMaterial?U.environment:null,gt=L===null?g.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Wn,_t=(G.isMeshStandardMaterial?B:M).get(G.envMap||ht),Rt=G.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Lt=!!z.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),vt=!!z.morphAttributes.position,Wt=!!z.morphAttributes.normal,ee=!!z.morphAttributes.color;let ie=0;G.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(ie=g.toneMapping);const Te=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,qt=Te!==void 0?Te.length:0,St=Et.get(G),Xe=h.state.lights;if(tt===!0&&(xt===!0||E!==S)){const De=E===S&&G.id===T;j.setState(G,E,De)}let Yt=!1;G.version===St.__version?(St.needsLights&&St.lightsStateVersion!==Xe.state.version||St.outputColorSpace!==gt||I.isBatchedMesh&&St.batching===!1||!I.isBatchedMesh&&St.batching===!0||I.isBatchedMesh&&St.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&St.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&St.instancing===!1||!I.isInstancedMesh&&St.instancing===!0||I.isSkinnedMesh&&St.skinning===!1||!I.isSkinnedMesh&&St.skinning===!0||I.isInstancedMesh&&St.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&St.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&St.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&St.instancingMorph===!1&&I.morphTexture!==null||St.envMap!==_t||G.fog===!0&&St.fog!==Q||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==j.numPlanes||St.numIntersection!==j.numIntersection)||St.vertexAlphas!==Rt||St.vertexTangents!==Lt||St.morphTargets!==vt||St.morphNormals!==Wt||St.morphColors!==ee||St.toneMapping!==ie||St.morphTargetsCount!==qt)&&(Yt=!0):(Yt=!0,St.__version=G.version);let Fe=St.currentProgram;Yt===!0&&(Fe=Si(G,U,I));let Tn=!1,be=!1,$n=!1;const re=Fe.getUniforms(),Ge=St.uniforms;if(Tt.useProgram(Fe.program)&&(Tn=!0,be=!0,$n=!0),G.id!==T&&(T=G.id,be=!0),Tn||S!==E){Tt.buffers.depth.getReversed()?(ot.copy(E.projectionMatrix),Co(ot),Po(ot),re.setValue(F,"projectionMatrix",ot)):re.setValue(F,"projectionMatrix",E.projectionMatrix),re.setValue(F,"viewMatrix",E.matrixWorldInverse);const je=re.map.cameraPosition;je!==void 0&&je.setValue(F,Ct.setFromMatrixPosition(E.matrixWorld)),zt.logarithmicDepthBuffer&&re.setValue(F,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&re.setValue(F,"isOrthographic",E.isOrthographicCamera===!0),S!==E&&(S=E,be=!0,$n=!0)}if(I.isSkinnedMesh){re.setOptional(F,I,"bindMatrix"),re.setOptional(F,I,"bindMatrixInverse");const De=I.skeleton;De&&(De.boneTexture===null&&De.computeBoneTexture(),re.setValue(F,"boneTexture",De.boneTexture,A))}I.isBatchedMesh&&(re.setOptional(F,I,"batchingTexture"),re.setValue(F,"batchingTexture",I._matricesTexture,A),re.setOptional(F,I,"batchingIdTexture"),re.setValue(F,"batchingIdTexture",I._indirectTexture,A),re.setOptional(F,I,"batchingColorTexture"),I._colorsTexture!==null&&re.setValue(F,"batchingColorTexture",I._colorsTexture,A));const Kn=z.morphAttributes;if((Kn.position!==void 0||Kn.normal!==void 0||Kn.color!==void 0)&&wt.update(I,z,Fe),(be||St.receiveShadow!==I.receiveShadow)&&(St.receiveShadow=I.receiveShadow,re.setValue(F,"receiveShadow",I.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Ge.envMap.value=_t,Ge.flipEnvMap.value=_t.isCubeTexture&&_t.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&U.environment!==null&&(Ge.envMapIntensity.value=U.environmentIntensity),be&&(re.setValue(F,"toneMappingExposure",g.toneMappingExposure),St.needsLights&&ao(Ge,$n),Q&&G.fog===!0&&lt.refreshFogUniforms(Ge,Q),lt.refreshMaterialUniforms(Ge,G,H,K,h.state.transmissionRenderTarget[E.id]),Ji.upload(F,ps(St),Ge,A)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Ji.upload(F,ps(St),Ge,A),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&re.setValue(F,"center",I.center),re.setValue(F,"modelViewMatrix",I.modelViewMatrix),re.setValue(F,"normalMatrix",I.normalMatrix),re.setValue(F,"modelMatrix",I.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const De=G.uniformsGroups;for(let je=0,Qe=De.length;je<Qe;je++){const gs=De[je];D.update(gs,Fe),D.bind(gs,Fe)}}return Fe}function ao(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function oo(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(E,U,z){Et.get(E.texture).__webglTexture=U,Et.get(E.depthTexture).__webglTexture=z;const G=Et.get(E);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=z===void 0,G.__autoAllocateDepthBuffer||Bt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,U){const z=Et.get(E);z.__webglFramebuffer=U,z.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(E,U=0,z=0){L=E,b=U,w=z;let G=!0,I=null,Q=!1,ht=!1;if(E){const _t=Et.get(E);if(_t.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(F.FRAMEBUFFER,null),G=!1;else if(_t.__webglFramebuffer===void 0)A.setupRenderTarget(E);else if(_t.__hasExternalTextures)A.rebindTextures(E,Et.get(E.texture).__webglTexture,Et.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const vt=E.depthTexture;if(_t.__boundDepthTexture!==vt){if(vt!==null&&Et.has(vt)&&(E.width!==vt.image.width||E.height!==vt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(E)}}const Rt=E.texture;(Rt.isData3DTexture||Rt.isDataArrayTexture||Rt.isCompressedArrayTexture)&&(ht=!0);const Lt=Et.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Lt[U])?I=Lt[U][z]:I=Lt[U],Q=!0):E.samples>0&&A.useMultisampledRTT(E)===!1?I=Et.get(E).__webglMultisampledFramebuffer:Array.isArray(Lt)?I=Lt[z]:I=Lt,P.copy(E.viewport),O.copy(E.scissor),N=E.scissorTest}else P.copy(yt).multiplyScalar(H).floor(),O.copy(Ft).multiplyScalar(H).floor(),N=Qt;if(Tt.bindFramebuffer(F.FRAMEBUFFER,I)&&G&&Tt.drawBuffers(E,I),Tt.viewport(P),Tt.scissor(O),Tt.setScissorTest(N),Q){const _t=Et.get(E.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+U,_t.__webglTexture,z)}else if(ht){const _t=Et.get(E.texture),Rt=U||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,_t.__webglTexture,z||0,Rt)}T=-1},this.readRenderTargetPixels=function(E,U,z,G,I,Q,ht){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let gt=Et.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ht!==void 0&&(gt=gt[ht]),gt){Tt.bindFramebuffer(F.FRAMEBUFFER,gt);try{const _t=E.texture,Rt=_t.format,Lt=_t.type;if(!zt.textureFormatReadable(Rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!zt.textureTypeReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-G&&z>=0&&z<=E.height-I&&F.readPixels(U,z,G,I,Ut.convert(Rt),Ut.convert(Lt),Q)}finally{const _t=L!==null?Et.get(L).__webglFramebuffer:null;Tt.bindFramebuffer(F.FRAMEBUFFER,_t)}}},this.readRenderTargetPixelsAsync=async function(E,U,z,G,I,Q,ht){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let gt=Et.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ht!==void 0&&(gt=gt[ht]),gt){const _t=E.texture,Rt=_t.format,Lt=_t.type;if(!zt.textureFormatReadable(Rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!zt.textureTypeReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=E.width-G&&z>=0&&z<=E.height-I){Tt.bindFramebuffer(F.FRAMEBUFFER,gt);const vt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,vt),F.bufferData(F.PIXEL_PACK_BUFFER,Q.byteLength,F.STREAM_READ),F.readPixels(U,z,G,I,Ut.convert(Rt),Ut.convert(Lt),0);const Wt=L!==null?Et.get(L).__webglFramebuffer:null;Tt.bindFramebuffer(F.FRAMEBUFFER,Wt);const ee=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Ro(F,ee,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,vt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Q),F.deleteBuffer(vt),F.deleteSync(ee),Q}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,U=null,z=0){E.isTexture!==!0&&(si("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,E=arguments[1]);const G=Math.pow(2,-z),I=Math.floor(E.image.width*G),Q=Math.floor(E.image.height*G),ht=U!==null?U.x:0,gt=U!==null?U.y:0;A.setTexture2D(E,0),F.copyTexSubImage2D(F.TEXTURE_2D,z,0,0,ht,gt,I,Q),Tt.unbindTexture()},this.copyTextureToTexture=function(E,U,z=null,G=null,I=0){E.isTexture!==!0&&(si("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,E=arguments[1],U=arguments[2],I=arguments[3]||0,z=null);let Q,ht,gt,_t,Rt,Lt,vt,Wt,ee;const ie=E.isCompressedTexture?E.mipmaps[I]:E.image;z!==null?(Q=z.max.x-z.min.x,ht=z.max.y-z.min.y,gt=z.isBox3?z.max.z-z.min.z:1,_t=z.min.x,Rt=z.min.y,Lt=z.isBox3?z.min.z:0):(Q=ie.width,ht=ie.height,gt=ie.depth||1,_t=0,Rt=0,Lt=0),G!==null?(vt=G.x,Wt=G.y,ee=G.z):(vt=0,Wt=0,ee=0);const Te=Ut.convert(U.format),qt=Ut.convert(U.type);let St;U.isData3DTexture?(A.setTexture3D(U,0),St=F.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(A.setTexture2DArray(U,0),St=F.TEXTURE_2D_ARRAY):(A.setTexture2D(U,0),St=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,U.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,U.unpackAlignment);const Xe=F.getParameter(F.UNPACK_ROW_LENGTH),Yt=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Fe=F.getParameter(F.UNPACK_SKIP_PIXELS),Tn=F.getParameter(F.UNPACK_SKIP_ROWS),be=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,ie.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ie.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,_t),F.pixelStorei(F.UNPACK_SKIP_ROWS,Rt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Lt);const $n=E.isDataArrayTexture||E.isData3DTexture,re=U.isDataArrayTexture||U.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const Ge=Et.get(E),Kn=Et.get(U),De=Et.get(Ge.__renderTarget),je=Et.get(Kn.__renderTarget);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,De.__webglFramebuffer),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,je.__webglFramebuffer);for(let Qe=0;Qe<gt;Qe++)$n&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Et.get(E).__webglTexture,I,Lt+Qe),E.isDepthTexture?(re&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Et.get(U).__webglTexture,I,ee+Qe),F.blitFramebuffer(_t,Rt,Q,ht,vt,Wt,Q,ht,F.DEPTH_BUFFER_BIT,F.NEAREST)):re?F.copyTexSubImage3D(St,I,vt,Wt,ee+Qe,_t,Rt,Q,ht):F.copyTexSubImage2D(St,I,vt,Wt,ee+Qe,_t,Rt,Q,ht);Tt.bindFramebuffer(F.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else re?E.isDataTexture||E.isData3DTexture?F.texSubImage3D(St,I,vt,Wt,ee,Q,ht,gt,Te,qt,ie.data):U.isCompressedArrayTexture?F.compressedTexSubImage3D(St,I,vt,Wt,ee,Q,ht,gt,Te,ie.data):F.texSubImage3D(St,I,vt,Wt,ee,Q,ht,gt,Te,qt,ie):E.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,I,vt,Wt,Q,ht,Te,qt,ie.data):E.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,I,vt,Wt,ie.width,ie.height,Te,ie.data):F.texSubImage2D(F.TEXTURE_2D,I,vt,Wt,Q,ht,Te,qt,ie);F.pixelStorei(F.UNPACK_ROW_LENGTH,Xe),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Yt),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Fe),F.pixelStorei(F.UNPACK_SKIP_ROWS,Tn),F.pixelStorei(F.UNPACK_SKIP_IMAGES,be),I===0&&U.generateMipmaps&&F.generateMipmap(St),Tt.unbindTexture()},this.copyTextureToTexture3D=function(E,U,z=null,G=null,I=0){return E.isTexture!==!0&&(si("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,G=arguments[1]||null,E=arguments[2],U=arguments[3],I=arguments[4]||0),si('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,U,z,G,I)},this.initRenderTarget=function(E){Et.get(E).__webglFramebuffer===void 0&&A.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?A.setTextureCube(E,0):E.isData3DTexture?A.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?A.setTexture2DArray(E,0):A.setTexture2D(E,0),Tt.unbindTexture()},this.resetState=function(){b=0,w=0,L=null,Tt.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=kt._getUnpackColorSpace()}}class Qr{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new st(t),this.near=e,this.far=n}clone(){return new Qr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ka extends ge{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new He,this.environmentIntensity=1,this.environmentRotation=new He,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Gf extends Ee{constructor(t=null,e=1,n=1,r,s,a,o,l,c=1003,u=1003,f,d){super(null,a,o,l,c,u,r,s,f,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ji extends $t{constructor(t,e,n,r=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Bn=new Zt,ha=new Zt,Hi=[],ua=new En,Vf=new Zt,ni=new Ot,ii=new Yn;class Hf extends Ot{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new ji(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Vf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new En),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Bn),ua.copy(t.boundingBox).applyMatrix4(Bn),this.boundingBox.union(ua)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Yn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Bn),ii.copy(t.boundingSphere).applyMatrix4(Bn),this.boundingSphere.union(ii)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,r=this.morphTexture.source.data.data,s=n.length+1,a=t*s+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(t,e){const n=this.matrixWorld,r=this.count;if(ni.geometry=this.geometry,ni.material=this.material,ni.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ii.copy(this.boundingSphere),ii.applyMatrix4(n),t.ray.intersectsSphere(ii)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Bn),ha.multiplyMatrices(n,Bn),ni.matrixWorld=ha,ni.raycast(t,Hi);for(let a=0,o=Hi.length;a<o;a++){const l=Hi[a];l.instanceId=s,l.object=this,e.push(l)}Hi.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new ji(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Gf(new Float32Array(r*this.count),r,this.count,1028,1015));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=r*t;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class kf extends Zn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new st(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const fa=new Zt,Vr=new Jr,ki=new Yn,Wi=new C;class $i extends ge{constructor(t=new le,e=new kf){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ki.copy(n.boundingSphere),ki.applyMatrix4(r),ki.radius+=s,t.ray.intersectsSphere(ki)===!1)return;fa.copy(r).invert(),Vr.copy(t.ray).applyMatrix4(fa);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,f=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let _=d,v=p;_<v;_++){const m=c.getX(_);Wi.fromBufferAttribute(f,m),da(Wi,m,l,r,t,e,this)}}else{const d=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let _=d,v=p;_<v;_++)Wi.fromBufferAttribute(f,_),da(Wi,_,l,r,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function da(i,t,e,n,r,s,a){const o=Vr.distanceSqToPoint(i);if(o<e){const l=new C;Vr.closestPointToPoint(i,l),l.applyMatrix4(n);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class ke{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,r=this.getPoint(0),s=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),s+=n.distanceTo(r),e.push(s),r=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let r=0;const s=n.length;let a;e?a=e:a=t*n[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,n[r]===a)return r/(s-1);const u=n[r],d=n[r+1]-u,p=(a-u)/d;return(r+p)/(s-1)}getTangent(t,e){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=e||(a.isVector2?new it:new C);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new C,r=[],s=[],a=[],o=new C,l=new Zt;for(let p=0;p<=t;p++){const _=p/t;r[p]=this.getTangentAt(_,new C)}s[0]=new C,a[0]=new C;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),f=Math.abs(r[0].y),d=Math.abs(r[0].z);u<=c&&(c=u,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let p=1;p<=t;p++){if(s[p]=s[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(r[p-1],r[p]),o.length()>Number.EPSILON){o.normalize();const _=Math.acos(me(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(o,_))}a[p].crossVectors(r[p],s[p])}if(e===!0){let p=Math.acos(me(s[0].dot(s[t]),-1,1));p/=t,r[0].dot(o.crossVectors(s[0],s[t]))>0&&(p=-p);for(let _=1;_<=t;_++)s[_].applyMatrix4(l.makeRotationAxis(r[_],p*_)),a[_].crossVectors(r[_],s[_])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ts extends ke{constructor(t=0,e=0,n=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new it){const n=e,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*u-p*f+this.aX,c=d*f+p*u+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Wf extends ts{constructor(t,e,n,r,s,a){super(t,e,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function es(){let i=0,t=0,e=0,n=0;function r(s,a,o,l){i=s,t=o,e=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,u,f){let d=(a-s)/c-(o-s)/(c+u)+(o-a)/u,p=(o-a)/u-(l-a)/(u+f)+(l-o)/f;d*=u,p*=u,r(a,o,d,p)},calc:function(s){const a=s*s,o=a*s;return i+t*s+e*a+n*o}}}const Xi=new C,Ur=new es,Ir=new es,Fr=new es;class Wa extends ke{constructor(t=[],e=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=r}getPoint(t,e=new C){const n=e,r=this.points,s=r.length,a=(s-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=r[(o-1)%s]:(Xi.subVectors(r[0],r[1]).add(r[0]),c=Xi);const f=r[o%s],d=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(Xi.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Xi),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(f),p),v=Math.pow(f.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(u),p);v<1e-4&&(v=1),_<1e-4&&(_=v),m<1e-4&&(m=v),Ur.initNonuniformCatmullRom(c.x,f.x,d.x,u.x,_,v,m),Ir.initNonuniformCatmullRom(c.y,f.y,d.y,u.y,_,v,m),Fr.initNonuniformCatmullRom(c.z,f.z,d.z,u.z,_,v,m)}else this.curveType==="catmullrom"&&(Ur.initCatmullRom(c.x,f.x,d.x,u.x,this.tension),Ir.initCatmullRom(c.y,f.y,d.y,u.y,this.tension),Fr.initCatmullRom(c.z,f.z,d.z,u.z,this.tension));return n.set(Ur.calc(l),Ir.calc(l),Fr.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new C().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function pa(i,t,e,n,r){const s=(n-t)*.5,a=(r-e)*.5,o=i*i,l=i*o;return(2*e-2*n+s+a)*l+(-3*e+3*n-2*s-a)*o+s*i+e}function Xf(i,t){const e=1-i;return e*e*t}function qf(i,t){return 2*(1-i)*i*t}function Yf(i,t){return i*i*t}function hi(i,t,e,n){return Xf(i,t)+qf(i,e)+Yf(i,n)}function Zf(i,t){const e=1-i;return e*e*e*t}function Jf(i,t){const e=1-i;return 3*e*e*i*t}function $f(i,t){return 3*(1-i)*i*i*t}function Kf(i,t){return i*i*i*t}function ui(i,t,e,n,r){return Zf(i,t)+Jf(i,e)+$f(i,n)+Kf(i,r)}class Xa extends ke{constructor(t=new it,e=new it,n=new it,r=new it){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new it){const n=e,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ui(t,r.x,s.x,a.x,o.x),ui(t,r.y,s.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class jf extends ke{constructor(t=new C,e=new C,n=new C,r=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new C){const n=e,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(ui(t,r.x,s.x,a.x,o.x),ui(t,r.y,s.y,a.y,o.y),ui(t,r.z,s.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class qa extends ke{constructor(t=new it,e=new it){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new it){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new it){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Qf extends ke{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ya extends ke{constructor(t=new it,e=new it,n=new it){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new it){const n=e,r=this.v0,s=this.v1,a=this.v2;return n.set(hi(t,r.x,s.x,a.x),hi(t,r.y,s.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Za extends ke{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){const n=e,r=this.v0,s=this.v1,a=this.v2;return n.set(hi(t,r.x,s.x,a.x),hi(t,r.y,s.y,a.y),hi(t,r.z,s.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ns extends ke{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new it){const n=e,r=this.points,s=(r.length-1)*t,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],u=r[a>r.length-2?r.length-1:a+1],f=r[a>r.length-3?r.length-1:a+2];return n.set(pa(o,l.x,c.x,u.x,f.x),pa(o,l.y,c.y,u.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new it().fromArray(r))}return this}}var Hr=Object.freeze({__proto__:null,ArcCurve:Wf,CatmullRomCurve3:Wa,CubicBezierCurve:Xa,CubicBezierCurve3:jf,EllipseCurve:ts,LineCurve:qa,LineCurve3:Qf,QuadraticBezierCurve:Ya,QuadraticBezierCurve3:Za,SplineCurve:ns});class td extends ke{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Hr[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=n){const a=r[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,r=this.curves.length;n<r;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(new Hr[r.type]().fromJSON(r))}return this}}class kr extends td{constructor(t){super(),this.type="Path",this.currentPoint=new it,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new qa(this.currentPoint.clone(),new it(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,r){const s=new Ya(this.currentPoint.clone(),new it(t,e),new it(n,r));return this.curves.push(s),this.currentPoint.set(n,r),this}bezierCurveTo(t,e,n,r,s,a){const o=new Xa(this.currentPoint.clone(),new it(t,e),new it(n,r),new it(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new ns(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,r,s,a),this}absarc(t,e,n,r,s,a){return this.absellipse(t,e,n,n,r,s,a),this}ellipse(t,e,n,r,s,a,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,n,r,s,a,o,l),this}absellipse(t,e,n,r,s,a,o,l){const c=new ts(t,e,n,r,s,a,o,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class xi extends le{constructor(t=[new it(0,-.5),new it(.5,0),new it(0,.5)],e=12,n=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:r},e=Math.floor(e),r=me(r,0,Math.PI*2);const s=[],a=[],o=[],l=[],c=[],u=1/e,f=new C,d=new it,p=new C,_=new C,v=new C;let m=0,h=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:m=t[y+1].x-t[y].x,h=t[y+1].y-t[y].y,p.x=h*1,p.y=-m,p.z=h*0,v.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[y+1].x-t[y].x,h=t[y+1].y-t[y].y,p.x=h*1,p.y=-m,p.z=h*0,_.copy(p),p.x+=v.x,p.y+=v.y,p.z+=v.z,p.normalize(),l.push(p.x,p.y,p.z),v.copy(_)}for(let y=0;y<=e;y++){const x=n+y*u*r,g=Math.sin(x),R=Math.cos(x);for(let b=0;b<=t.length-1;b++){f.x=t[b].x*g,f.y=t[b].y,f.z=t[b].x*R,a.push(f.x,f.y,f.z),d.x=y/e,d.y=b/(t.length-1),o.push(d.x,d.y);const w=l[3*b+0]*g,L=l[3*b+1],T=l[3*b+0]*R;c.push(w,L,T)}}for(let y=0;y<e;y++)for(let x=0;x<t.length-1;x++){const g=x+y*t.length,R=g,b=g+t.length,w=g+t.length+1,L=g+1;s.push(R,b,L),s.push(w,L,b)}this.setIndex(s),this.setAttribute("position",new Kt(a,3)),this.setAttribute("uv",new Kt(o,2)),this.setAttribute("normal",new Kt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xi(t.points,t.segments,t.phiStart,t.phiLength)}}class is extends xi{constructor(t=1,e=1,n=4,r=8){const s=new kr;s.absarc(0,-e/2,t,Math.PI*1.5,0),s.absarc(0,e/2,t,0,Math.PI*.5),super(s.getPoints(n),r),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:r}}static fromJSON(t){return new is(t.radius,t.length,t.capSegments,t.radialSegments)}}class ir extends le{constructor(t=1,e=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:r},e=Math.max(3,e);const s=[],a=[],o=[],l=[],c=new C,u=new it;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,d=3;f<=e;f++,d+=3){const p=n+f/e*r;c.x=t*Math.cos(p),c.y=t*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[d]/t+1)/2,u.y=(a[d+1]/t+1)/2,l.push(u.x,u.y)}for(let f=1;f<=e;f++)s.push(f,f+1,0);this.setIndex(s),this.setAttribute("position",new Kt(a,3)),this.setAttribute("normal",new Kt(o,3)),this.setAttribute("uv",new Kt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ir(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class rs extends le{constructor(t=[],e=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:r};const s=[],a=[];o(r),c(n),u(),this.setAttribute("position",new Kt(s,3)),this.setAttribute("normal",new Kt(s.slice(),3)),this.setAttribute("uv",new Kt(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const x=new C,g=new C,R=new C;for(let b=0;b<e.length;b+=3)p(e[b+0],x),p(e[b+1],g),p(e[b+2],R),l(x,g,R,y)}function l(y,x,g,R){const b=R+1,w=[];for(let L=0;L<=b;L++){w[L]=[];const T=y.clone().lerp(g,L/b),S=x.clone().lerp(g,L/b),P=b-L;for(let O=0;O<=P;O++)O===0&&L===b?w[L][O]=T:w[L][O]=T.clone().lerp(S,O/P)}for(let L=0;L<b;L++)for(let T=0;T<2*(b-L)-1;T++){const S=Math.floor(T/2);T%2===0?(d(w[L][S+1]),d(w[L+1][S]),d(w[L][S])):(d(w[L][S+1]),d(w[L+1][S+1]),d(w[L+1][S]))}}function c(y){const x=new C;for(let g=0;g<s.length;g+=3)x.x=s[g+0],x.y=s[g+1],x.z=s[g+2],x.normalize().multiplyScalar(y),s[g+0]=x.x,s[g+1]=x.y,s[g+2]=x.z}function u(){const y=new C;for(let x=0;x<s.length;x+=3){y.x=s[x+0],y.y=s[x+1],y.z=s[x+2];const g=m(y)/2/Math.PI+.5,R=h(y)/Math.PI+.5;a.push(g,1-R)}_(),f()}function f(){for(let y=0;y<a.length;y+=6){const x=a[y+0],g=a[y+2],R=a[y+4],b=Math.max(x,g,R),w=Math.min(x,g,R);b>.9&&w<.1&&(x<.2&&(a[y+0]+=1),g<.2&&(a[y+2]+=1),R<.2&&(a[y+4]+=1))}}function d(y){s.push(y.x,y.y,y.z)}function p(y,x){const g=y*3;x.x=t[g+0],x.y=t[g+1],x.z=t[g+2]}function _(){const y=new C,x=new C,g=new C,R=new C,b=new it,w=new it,L=new it;for(let T=0,S=0;T<s.length;T+=9,S+=6){y.set(s[T+0],s[T+1],s[T+2]),x.set(s[T+3],s[T+4],s[T+5]),g.set(s[T+6],s[T+7],s[T+8]),b.set(a[S+0],a[S+1]),w.set(a[S+2],a[S+3]),L.set(a[S+4],a[S+5]),R.copy(y).add(x).add(g).divideScalar(3);const P=m(R);v(b,S+0,y,P),v(w,S+2,x,P),v(L,S+4,g,P)}}function v(y,x,g,R){R<0&&y.x===1&&(a[x]=y.x-1),g.x===0&&g.z===0&&(a[x]=R/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function h(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rs(t.vertices,t.indices,t.radius,t.details)}}class Ja extends kr{constructor(t){super(t),this.uuid=yn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,r=this.holes.length;n<r;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(new kr().fromJSON(r))}return this}}const ed={triangulate:function(i,t,e=2){const n=t&&t.length,r=n?t[0]*e:i.length;let s=$a(i,0,r,e,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c,u,f,d,p;if(n&&(s=ad(i,t,s,e)),i.length>80*e){o=c=i[0],l=u=i[1];for(let _=e;_<r;_+=e)f=i[_],d=i[_+1],f<o&&(o=f),d<l&&(l=d),f>c&&(c=f),d>u&&(u=d);p=Math.max(c-o,u-l),p=p!==0?32767/p:0}return mi(s,a,e,o,l,p,0),a}};function $a(i,t,e,n,r){let s,a;if(r===_d(i,t,e,n)>0)for(s=t;s<e;s+=n)a=ma(s,i[s],i[s+1],a);else for(s=e-n;s>=t;s-=n)a=ma(s,i[s],i[s+1],a);return a&&rr(a,a.next)&&(_i(a),a=a.next),a}function Sn(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(rr(e,e.next)||ae(e.prev,e,e.next)===0)){if(_i(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function mi(i,t,e,n,r,s,a){if(!i)return;!a&&s&&ud(i,n,r,s);let o=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,s?id(i,n,r,s):nd(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),_i(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=rd(Sn(i),t,e),mi(i,t,e,n,r,s,2)):a===2&&sd(i,t,e,n,r,s):mi(Sn(i),t,e,n,r,s,1);break}}}function nd(i){const t=i.prev,e=i,n=i.next;if(ae(t,e,n)>=0)return!1;const r=t.x,s=e.x,a=n.x,o=t.y,l=e.y,c=n.y,u=r<s?r<a?r:a:s<a?s:a,f=o<l?o<c?o:c:l<c?l:c,d=r>s?r>a?r:a:s>a?s:a,p=o>l?o>c?o:c:l>c?l:c;let _=n.next;for(;_!==t;){if(_.x>=u&&_.x<=d&&_.y>=f&&_.y<=p&&Vn(r,o,s,l,a,c,_.x,_.y)&&ae(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function id(i,t,e,n){const r=i.prev,s=i,a=i.next;if(ae(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,u=r.y,f=s.y,d=a.y,p=o<l?o<c?o:c:l<c?l:c,_=u<f?u<d?u:d:f<d?f:d,v=o>l?o>c?o:c:l>c?l:c,m=u>f?u>d?u:d:f>d?f:d,h=Wr(p,_,t,e,n),y=Wr(v,m,t,e,n);let x=i.prevZ,g=i.nextZ;for(;x&&x.z>=h&&g&&g.z<=y;){if(x.x>=p&&x.x<=v&&x.y>=_&&x.y<=m&&x!==r&&x!==a&&Vn(o,u,l,f,c,d,x.x,x.y)&&ae(x.prev,x,x.next)>=0||(x=x.prevZ,g.x>=p&&g.x<=v&&g.y>=_&&g.y<=m&&g!==r&&g!==a&&Vn(o,u,l,f,c,d,g.x,g.y)&&ae(g.prev,g,g.next)>=0))return!1;g=g.nextZ}for(;x&&x.z>=h;){if(x.x>=p&&x.x<=v&&x.y>=_&&x.y<=m&&x!==r&&x!==a&&Vn(o,u,l,f,c,d,x.x,x.y)&&ae(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;g&&g.z<=y;){if(g.x>=p&&g.x<=v&&g.y>=_&&g.y<=m&&g!==r&&g!==a&&Vn(o,u,l,f,c,d,g.x,g.y)&&ae(g.prev,g,g.next)>=0)return!1;g=g.nextZ}return!0}function rd(i,t,e){let n=i;do{const r=n.prev,s=n.next.next;!rr(r,s)&&Ka(r,n,n.next,s)&&gi(r,s)&&gi(s,r)&&(t.push(r.i/e|0),t.push(n.i/e|0),t.push(s.i/e|0),_i(n),_i(n.next),n=i=s),n=n.next}while(n!==i);return Sn(n)}function sd(i,t,e,n,r,s){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&pd(a,o)){let l=ja(a,o);a=Sn(a,a.next),l=Sn(l,l.next),mi(a,t,e,n,r,s,0),mi(l,t,e,n,r,s,0);return}o=o.next}a=a.next}while(a!==i)}function ad(i,t,e,n){const r=[];let s,a,o,l,c;for(s=0,a=t.length;s<a;s++)o=t[s]*n,l=s<a-1?t[s+1]*n:i.length,c=$a(i,o,l,n,!1),c===c.next&&(c.steiner=!0),r.push(dd(c));for(r.sort(od),s=0;s<r.length;s++)e=ld(r[s],e);return e}function od(i,t){return i.x-t.x}function ld(i,t){const e=cd(i,t);if(!e)return t;const n=ja(e,i);return Sn(n,n.next),Sn(e,e.next)}function cd(i,t){let e=t,n=-1/0,r;const s=i.x,a=i.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const d=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=s&&d>n&&(n=d,r=e.x<e.next.x?e:e.next,d===s))return r}e=e.next}while(e!==t);if(!r)return null;const o=r,l=r.x,c=r.y;let u=1/0,f;e=r;do s>=e.x&&e.x>=l&&s!==e.x&&Vn(a<c?s:n,a,l,c,a<c?n:s,a,e.x,e.y)&&(f=Math.abs(a-e.y)/(s-e.x),gi(e,i)&&(f<u||f===u&&(e.x>r.x||e.x===r.x&&hd(r,e)))&&(r=e,u=f)),e=e.next;while(e!==o);return r}function hd(i,t){return ae(i.prev,i,t.prev)<0&&ae(t.next,i,i.next)<0}function ud(i,t,e,n){let r=i;do r.z===0&&(r.z=Wr(r.x,r.y,t,e,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==i);r.prevZ.nextZ=null,r.prevZ=null,fd(r)}function fd(i){let t,e,n,r,s,a,o,l,c=1;do{for(e=i,i=null,s=null,a=0;e;){for(a++,n=e,o=0,t=0;t<c&&(o++,n=n.nextZ,!!n);t++);for(l=c;o>0||l>0&&n;)o!==0&&(l===0||!n||e.z<=n.z)?(r=e,e=e.nextZ,o--):(r=n,n=n.nextZ,l--),s?s.nextZ=r:i=r,r.prevZ=s,s=r;e=n}s.nextZ=null,c*=2}while(a>1);return i}function Wr(i,t,e,n,r){return i=(i-e)*r|0,t=(t-n)*r|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function dd(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Vn(i,t,e,n,r,s,a,o){return(r-a)*(t-o)>=(i-a)*(s-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(s-o)>=(r-a)*(n-o)}function pd(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!md(i,t)&&(gi(i,t)&&gi(t,i)&&gd(i,t)&&(ae(i.prev,i,t.prev)||ae(i,t.prev,t))||rr(i,t)&&ae(i.prev,i,i.next)>0&&ae(t.prev,t,t.next)>0)}function ae(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function rr(i,t){return i.x===t.x&&i.y===t.y}function Ka(i,t,e,n){const r=Yi(ae(i,t,e)),s=Yi(ae(i,t,n)),a=Yi(ae(e,n,i)),o=Yi(ae(e,n,t));return!!(r!==s&&a!==o||r===0&&qi(i,e,t)||s===0&&qi(i,n,t)||a===0&&qi(e,i,n)||o===0&&qi(e,t,n))}function qi(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Yi(i){return i>0?1:i<0?-1:0}function md(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Ka(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function gi(i,t){return ae(i.prev,i,i.next)<0?ae(i,t,i.next)>=0&&ae(i,i.prev,t)>=0:ae(i,t,i.prev)<0||ae(i,i.next,t)<0}function gd(i,t){let e=i,n=!1;const r=(i.x+t.x)/2,s=(i.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&r<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function ja(i,t){const e=new Xr(i.i,i.x,i.y),n=new Xr(t.i,t.x,t.y),r=i.next,s=t.prev;return i.next=t,t.prev=i,e.next=r,r.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function ma(i,t,e,n){const r=new Xr(i,t,e);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function _i(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Xr(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function _d(i,t,e,n){let r=0;for(let s=t,a=e-n;s<e;s+=n)r+=(i[a]-i[s])*(i[s+1]+i[a+1]),a=s;return r}class fi{static area(t){const e=t.length;let n=0;for(let r=e-1,s=0;s<e;r=s++)n+=t[r].x*t[s].y-t[s].x*t[r].y;return n*.5}static isClockWise(t){return fi.area(t)<0}static triangulateShape(t,e){const n=[],r=[],s=[];ga(t),_a(n,t);let a=t.length;e.forEach(ga);for(let l=0;l<e.length;l++)r.push(a),a+=e[l].length,_a(n,e[l]);const o=ed.triangulate(n,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function ga(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function _a(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class ss extends rs{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ss(t.radius,t.detail)}}class as extends le{constructor(t=new Ja([new it(0,.5),new it(-.5,-.5),new it(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],r=[],s=[],a=[];let o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let u=0;u<t.length;u++)c(t[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new Kt(r,3)),this.setAttribute("normal",new Kt(s,3)),this.setAttribute("uv",new Kt(a,2));function c(u){const f=r.length/3,d=u.extractPoints(e);let p=d.shape;const _=d.holes;fi.isClockWise(p)===!1&&(p=p.reverse());for(let m=0,h=_.length;m<h;m++){const y=_[m];fi.isClockWise(y)===!0&&(_[m]=y.reverse())}const v=fi.triangulateShape(p,_);for(let m=0,h=_.length;m<h;m++){const y=_[m];p=p.concat(y)}for(let m=0,h=p.length;m<h;m++){const y=p[m];r.push(y.x,y.y,0),s.push(0,0,1),a.push(y.x,y.y)}for(let m=0,h=v.length;m<h;m++){const y=v[m],x=y[0]+f,g=y[1]+f,R=y[2]+f;n.push(x,g,R),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return vd(e,t)}static fromJSON(t,e){const n=[];for(let r=0,s=t.shapes.length;r<s;r++){const a=e[t.shapes[r]];n.push(a)}return new as(n,t.curveSegments)}}function vd(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const r=i[e];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t}class ln extends le{constructor(t=1,e=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],f=new C,d=new C,p=[],_=[],v=[],m=[];for(let h=0;h<=n;h++){const y=[],x=h/n;let g=0;h===0&&a===0?g=.5/e:h===n&&l===Math.PI&&(g=-.5/e);for(let R=0;R<=e;R++){const b=R/e;f.x=-t*Math.cos(r+b*s)*Math.sin(a+x*o),f.y=t*Math.cos(a+x*o),f.z=t*Math.sin(r+b*s)*Math.sin(a+x*o),_.push(f.x,f.y,f.z),d.copy(f).normalize(),v.push(d.x,d.y,d.z),m.push(b+g,1-x),y.push(c++)}u.push(y)}for(let h=0;h<n;h++)for(let y=0;y<e;y++){const x=u[h][y+1],g=u[h][y],R=u[h+1][y],b=u[h+1][y+1];(h!==0||a>0)&&p.push(x,g,b),(h!==n-1||l<Math.PI)&&p.push(g,R,b)}this.setIndex(p),this.setAttribute("position",new Kt(_,3)),this.setAttribute("normal",new Kt(v,3)),this.setAttribute("uv",new Kt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ln(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class os extends le{constructor(t=new Za(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),e=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:r,closed:s};const a=t.computeFrenetFrames(e,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new C,l=new C,c=new it;let u=new C;const f=[],d=[],p=[],_=[];v(),this.setIndex(_),this.setAttribute("position",new Kt(f,3)),this.setAttribute("normal",new Kt(d,3)),this.setAttribute("uv",new Kt(p,2));function v(){for(let x=0;x<e;x++)m(x);m(s===!1?e:0),y(),h()}function m(x){u=t.getPointAt(x/e,u);const g=a.normals[x],R=a.binormals[x];for(let b=0;b<=r;b++){const w=b/r*Math.PI*2,L=Math.sin(w),T=-Math.cos(w);l.x=T*g.x+L*R.x,l.y=T*g.y+L*R.y,l.z=T*g.z+L*R.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,f.push(o.x,o.y,o.z)}}function h(){for(let x=1;x<=e;x++)for(let g=1;g<=r;g++){const R=(r+1)*(x-1)+(g-1),b=(r+1)*x+(g-1),w=(r+1)*x+g,L=(r+1)*(x-1)+g;_.push(R,b,L),_.push(b,w,L)}}function y(){for(let x=0;x<=e;x++)for(let g=0;g<=r;g++)c.x=x/e,c.y=g/r,p.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new os(new Hr[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Pe extends Zn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new st(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new st(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new He,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ls extends ge{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new st(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class xd extends ls{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.groundColor=new st(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Nr=new Zt,va=new C,xa=new C;class Qa{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new it(512,512),this.map=null,this.mapPass=null,this.matrix=new Zt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Kr,this._frameExtents=new it(1,1),this._viewportCount=1,this._viewports=[new Xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;va.setFromMatrixPosition(t.matrixWorld),e.position.copy(va),xa.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(xa),e.updateMatrixWorld(),Nr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Nr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Nr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Ma=new Zt,ri=new C,Or=new C;class Md extends Qa{constructor(){super(new Ae(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new it(4,2),this._viewportCount=6,this._viewports=[new Xt(2,1,1,1),new Xt(0,1,1,1),new Xt(3,1,1,1),new Xt(1,1,1,1),new Xt(3,0,1,1),new Xt(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,r=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ri.setFromMatrixPosition(t.matrixWorld),n.position.copy(ri),Or.copy(n.position),Or.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Or),n.updateMatrixWorld(),r.makeTranslation(-ri.x,-ri.y,-ri.z),Ma.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ma)}}class Sd extends ls{constructor(t,e,n=0,r=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new Md}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class yd extends Qa{constructor(){super(new Oa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ed extends ls{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.target=new ge,this.shadow=new yd}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Td{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Sa(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Sa();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Sa(){return performance.now()}const ya=new Zt;class Ad{constructor(t,e,n=0,r=1/0){this.ray=new Jr(t,e),this.near=n,this.far=r,this.camera=null,this.layers=new $r,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ya.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ya),this}intersectObject(t,e=!0,n=[]){return qr(t,this,n,e),n.sort(Ea),n}intersectObjects(t,e=!0,n=[]){for(let r=0,s=t.length;r<s;r++)qr(t[r],this,n,e);return n.sort(Ea),n}}function Ea(i,t){return i.distance-t.distance}function qr(i,t,e,n){let r=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)qr(s[a],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"170"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="170");const bd=[{top:"#ffa98f",belly:"#fff0e4",fin:"#ff9f8a",stripes:!1,line:!1,eye:1.45,opacity:.94},{top:"#5aa9d6",belly:"#eef8fc",fin:"#9fd4ef",stripes:!1,line:!0,eye:1.25,opacity:1},{top:"#ff7a55",belly:"#ffd0bf",fin:"#ff9a7c",stripes:!0,line:!1,eye:1.1,opacity:1},{top:"#4a63d4",belly:"#e9e1ff",fin:"#ff8a76",stripes:!1,line:!0,eye:1,opacity:1}],wd=new st("#0b1a2b");function xn(i){const t=new Ja;t.moveTo(i[0][0],i[0][1]);for(let e=1;e+1<i.length;e+=2)t.quadraticCurveTo(i[e][0],i[e][1],i[e+1][0],i[e+1][1]);return new as(t,16)}function to(i,t){const e=new ye,[n,r]=t,s=new Ot(new ln(.13*i,20,14),n),a=new Ot(new ln(.078*i,16,12),r);a.position.set(.035*i,.01,.075*i);const o=new Ot(new ln(.026*i,10,8),n);return o.position.set(.07*i,.045*i,.135*i),e.add(s,a,o),e}function eo(i,t,e){const n=new Wa(i);return new Ot(new os(n,20,t,6,!1),e)}function Rd(i){const t=new ye,e=new ln(1,44,30),n=e.attributes.position,r=new Float32Array(n.count*3),s=new st(i.top),a=new st(i.belly),o=new st("#ffffff"),l=new st;for(let g=0;g<n.count;g++){const R=n.getX(g),b=n.getY(g),w=n.getZ(g),L=Math.max(0,-R),T=1-.58*Math.pow(L,1.55),S=1+.12*Math.max(0,b)*(1-R*R);n.setXYZ(g,R*1.25,b*.8*T*S,w*.44*T);const P=pi.smoothstep(b,-.55,.35);if(l.copy(a).lerp(s,P),i.line&&Math.abs(b+.02)<.05&&R<.55&&l.lerp(o,.55),i.stripes){const O=[.38,-.28];for(const N of O){const V=Math.abs(R-N+b*.12);V<.085?l.copy(o):V<.115&&l.copy(wd).lerp(s,.25)}}r.set([l.r,l.g,l.b],g*3)}e.setAttribute("color",new $t(r,3)),e.computeVertexNormals();const c=new Pe({vertexColors:!0,roughness:.42,metalness:.06,transparent:i.opacity<1,opacity:i.opacity}),u=new Ot(e,c);t.add(u);const f=new Pe({color:i.fin,roughness:.5,side:2,transparent:!0,opacity:.88}),d=new ye;d.position.set(-1.12,0,0);const p=new Ot(xn([[.12,0],[-.3,.18],[-.78,.62],[-.5,0],[-.78,-.62],[-.3,-.18],[.12,0]]),f);d.add(p),t.add(d);const _=new Ot(xn([[-.55,0],[-.25,.62],[.3,0],[0,.05],[-.55,0]]),f);_.position.set(0,.62,0),t.add(_);const v=new Ot(xn([[-.4,0],[-.25,-.38],[.05,0],[-.1,0],[-.4,0]]),f);v.position.set(-.25,-.5,0),t.add(v);const m=[];for(const g of[1,-1]){const R=new ye;R.position.set(.35,-.2,.36*g);const b=new Ot(xn([[0,0],[-.2,.2],[-.45,.05],[-.25,-.12],[0,0]]),f);b.rotation.x=Math.PI/2.4*g,R.add(b),R.userData.side=g,m.push(R),t.add(R)}const h=[new Pe({color:"#ffffff",roughness:.2}),new Pe({color:"#0b1a2b",roughness:.15})],y=new Pe({color:"#3a1a1a",roughness:.6});for(const g of[1,-1]){const R=to(i.eye,h);R.position.set(.8,.17,.27*g),g<0&&(R.scale.z=-1),t.add(R),t.add(eo([new C(1.11,-.08,.2*g),new C(1.03,-.19,.255*g),new C(.91,-.14,.31*g)],.022,y))}const x=new er({color:"#ff8f9a",transparent:!0,opacity:.45,depthWrite:!1});for(const g of[1,-1]){const R=new Ot(new ir(.085,16),x);R.position.set(.86,-.08,.335*g),R.rotation.y=g>0?.55:Math.PI-.55,t.add(R)}return{group:t,animate(g,R){const b=7+R*5;d.rotation.y=Math.sin(g*b)*(.35+R*.25),u.rotation.y=Math.sin(g*b+1.4)*.05,_.rotation.x=Math.sin(g*b*.5)*.08;for(const w of m)w.rotation.y=(Math.sin(g*5+(w.userData.side>0?0:1.2))*.35+.35)*w.userData.side},dispose(){t.traverse(g=>{g.isMesh&&g.geometry.dispose()}),[c,f,y,x,...h].forEach(g=>g.dispose())}}}function Cd(i,t){const e=new ye,n=[[0,-2.12],[.1,-2.02],[.2,-1.72],[.44,-1.1],[.74,-.4],[.95,.3],[1.02,.85],[.98,1.27],[.82,1.62],[.5,1.88],[0,1.98]],s=new ns(n.map(([O,N])=>new it(O,N))).getPoints(60).map(O=>new it(Math.max(0,O.x),O.y));s[0].x=0,s[s.length-1].x=0;const a=new xi(s,48);a.rotateZ(-Math.PI/2);const o=a.attributes.position,l=new st(i),c=new st(t),u=c.clone().lerp(l,.25),f=new st(i).lerp(new st("#ffffff"),.35),d=new Float32Array(o.count*3),p=new st,_=.84;for(let O=0;O<o.count;O++){let N=o.getX(O),V=o.getY(O),Y=o.getZ(O);V*=_,V<0&&(V*=.92+.08*pi.smoothstep(N,-1,1.5)),o.setXYZ(O,N,V,Y);const W=pi.smoothstep(V,-.42,.08);p.copy(c).lerp(l,W),V<-.3&&N>-.2&&N<1.75&&Math.sin(Y*34)>.55&&p.lerp(u,.7),V>.25&&Math.sin(N*9.1)*Math.sin(Y*11.3)>.82&&p.lerp(f,.5),d.set([p.r,p.g,p.b],O*3)}a.setAttribute("color",new $t(d,3)),a.computeVertexNormals();const v=new Pe({vertexColors:!0,roughness:.48,metalness:.04}),m=new Ot(a,v);e.add(m);const h=O=>{for(let N=1;N<s.length;N++)if(s[N].y>=O){const V=s[N-1],Y=s[N],W=(O-V.y)/(Y.y-V.y||1);return V.x+(Y.x-V.x)*W}return 0},y=(O,N)=>Math.sqrt(Math.max(0,h(O)**2-(N/_)**2)),x=new Pe({color:i,roughness:.5,side:2}),g=new ye;g.position.set(-1.95,0,0),g.scale.setScalar(1.3);const R=xn([[.12,0],[-.2,.55],[-.85,1.05],[-.55,.5],[-.45,0],[-.55,-.5],[-.85,-1.05],[-.2,-.55],[.12,0]]);R.rotateX(Math.PI/2);const b=new Ot(R,x);g.add(b),e.add(g);const w=[];for(const O of[1,-1]){const N=new ye;N.position.set(.75,-.42,y(.75,-.42)*O*.92);const V=xn([[.05,0],[-.25,.22],[-1.05,.1],[-.35,-.16],[.05,0]]);V.rotateX(Math.PI/2);const Y=new Ot(V,x);Y.scale.z=O,N.add(Y),N.rotation.x=-.55*O,N.rotation.y=.35*O,N.userData.side=O,w.push(N),e.add(N)}const L=new Ot(xn([[-.32,0],[-.15,.24],[.12,0],[-.05,.02],[-.32,0]]),x);L.position.set(-.95,h(-.95)*_-.05,0),e.add(L);const T=[new Pe({color:"#ffffff",roughness:.2}),new Pe({color:"#0b1a2b",roughness:.15})],S=new Pe({color:"#16233a",roughness:.6});for(const O of[1,-1]){const N=to(.85,T),V=1.2,Y=-.08;N.position.set(V,Y,(y(V,Y)-.04)*O),N.rotation.y=O>0?-.35:.35,O<0&&(N.scale.z=-1),e.add(N);const W=[[1.86,-.12],[1.62,-.3],[1.28,-.36],[1.02,-.27]].map(([K,H])=>new C(K,H,(y(K,H)+.008)*O));e.add(eo(W,.028,S))}const P=new er({color:"#ff9fb0",transparent:!0,opacity:.4,depthWrite:!1});for(const O of[1,-1]){const N=new Ot(new ir(.13,18),P);N.position.set(1.15,-.32,(y(1.15,-.32)+.012)*O),N.rotation.y=O>0?.25:Math.PI-.25,e.add(N)}return{group:e,animate(O,N){const V=1.6+N*1.2;g.rotation.z=Math.sin(O*V)*.38,m.rotation.z=Math.sin(O*V-.9)*.025;for(const Y of w)Y.rotation.x=(-.55+Math.sin(O*1.3)*.12)*Y.userData.side},dispose(){e.traverse(O=>{O.isMesh&&O.geometry.dispose()}),[v,x,S,P,...T].forEach(O=>O.dispose())}}}const Pd=[{dir:[1,.25],steep:.22,length:9.5},{dir:[.7,.75],steep:.18,length:6.2},{dir:[.95,-.45],steep:.15,length:4.1},{dir:[.2,1],steep:.12,length:2.9},{dir:[-.6,.8],steep:.1,length:2.1},{dir:[1,-.1],steep:.08,length:1.45}],Qi=6,no=9.8,io=.62;function Ld(i){return Pd.slice(0,Math.max(1,Math.min(Qi,i)))}function Yr(i){const t=[];for(let e=0;e<Qi;e++){const n=i[e];if(!n){t.push(new Xt(1,0,0,1));continue}const r=Math.hypot(n.dir[0],n.dir[1]);t.push(new Xt(n.dir[0]/r,n.dir[1]/r,n.steep,n.length))}return t}function Br(i,t,e,n,r=1){let s=0;for(const a of i){const o=Math.hypot(a.dir[0],a.dir[1]),l=Math.PI*2/a.length,c=Math.sqrt(no/l)*io,u=l*(a.dir[0]/o*t+a.dir[1]/o*e-c*n);s+=a.steep/l*Math.sin(u)}return s*r}const ro=`
  uniform vec4 uWaves[${Qi}];
  uniform float uTime;
  uniform float uAmp;
  vec3 gerstner(vec3 p, out vec3 nrm, out float crest) {
    vec3 tang = vec3(1.0, 0.0, 0.0);
    vec3 bin = vec3(0.0, 0.0, 1.0);
    vec3 d = vec3(0.0);
    crest = 0.0;
    float total = 0.0;
    for (int i = 0; i < ${Qi}; i++) {
      vec4 w = uWaves[i];
      float st = w.z * uAmp;
      if (st <= 0.0) continue;
      float k = 6.2831853 / w.w;
      float c = sqrt(${no.toFixed(1)} / k) * ${io.toFixed(2)};
      vec2 dir = w.xy;
      float f = k * (dot(dir, p.xz) - c * uTime);
      float a = st / k;
      float s = sin(f), co = cos(f);
      d.x += dir.x * a * co;
      d.y += a * s;
      d.z += dir.y * a * co;
      tang += vec3(-dir.x * dir.x * st * s, dir.x * st * co, -dir.x * dir.y * st * s);
      bin += vec3(-dir.x * dir.y * st * s, dir.y * st * co, -dir.y * dir.y * st * s);
      crest += st * s;
      total += st;
    }
    nrm = normalize(cross(bin, tang));
    crest = total > 0.0 ? crest / total : 0.0;
    return p + d;
  }`,Ta=`
  float hash12(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
  float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash12(i), hash12(i + vec2(1, 0)), u.x), mix(hash12(i + vec2(0, 1)), hash12(i + vec2(1, 1)), u.x), u.y);
  }
  float fbm(vec2 p) { float a = 0.5, s = 0.0; for (int i = 0; i < 4; i++) { s += a * vnoise(p); p = p * 2.03 + 17.1; a *= 0.5; } return s; }`;function Dd(i,t,e){return Math.sin(i*3.1+t*.7)*.007+Math.sin(i*7.3+t*1.25)*.0055+Math.sin(i*15-t*1.9)*.0022+e*Math.sin(i*9-t*5.2)*.022}const zr=`
  uniform vec2 uRes;
  uniform float uLine;
  uniform float uLineTime;
  uniform float uSlosh;
  /* returns the waterline height in pixels from the bottom of the canvas */
  float waterlineY(float xPx) {
    float xh = xPx / uRes.y;
    float t = uLineTime;
    float o = sin(xh * 3.1 + t * 0.7) * 0.007 + sin(xh * 7.3 + t * 1.25) * 0.0055 + sin(xh * 15.0 - t * 1.9) * 0.0022
            + uSlosh * sin(xh * 9.0 - t * 5.2) * 0.022;
    return uRes.y * (1.0 - (uLine + o));
  }`;function Ud(){return{uRes:{value:new it(1,1)},uLine:{value:.24},uLineTime:{value:0},uSlosh:{value:0}}}const Aa="if (gl_FragCoord.y < waterlineY(gl_FragCoord.x) - 0.5) discard;";class Id{constructor(t,e,n){nt(this,"scene",new ka);nt(this,"camera",new Ae(40,1,.05,400));nt(this,"line",Ud());nt(this,"sky");nt(this,"sea");nt(this,"overlay");nt(this,"drops");nt(this,"dropVel");nt(this,"dropLife");nt(this,"dropNext",0);nt(this,"ring",new Xt(0,-8,-1,0));nt(this,"height",.62);const r=this.line,s=h=>({uTop:{value:new st(h.skyTop)},uLow:{value:new st(h.skyLow)},uLight:{value:new st(h.light)},uNight:{value:h.night?1:0}});this.sky=new Ot(new ln(300,32,16),new ue({side:1,depthWrite:!1,uniforms:{...r,...s(e),uSun:{value:new C(.62,.075,-1).normalize()},uTime:{value:0}},vertexShader:"varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 uTop; uniform vec3 uLow; uniform vec3 uLight; uniform float uNight; uniform vec3 uSun; uniform float uTime; varying vec3 vD;
          ${zr}
          ${Ta}
          void main(){
            ${Aa}
            vec3 d = normalize(vD);
            float h = clamp(d.y, 0.0, 1.0);
            vec3 c = mix(uLow, uTop, pow(smoothstep(0.0, 0.05, h), 0.7));
            float sd = max(0.0, dot(d, uSun));
            // sun by day, a softer moon at night
            float disc = smoothstep(mix(0.9994, 0.9991, uNight), mix(0.9997, 0.9995, uNight), sd);
            c += uLight * (pow(sd, 40.0) * 0.3 + pow(sd, 400.0) * 0.5 + disc * 1.1);
            // soft drifting clouds
            vec2 cuv = d.xz / (d.y + 0.06) * 0.9 + vec2(uTime * 0.004, 0.0);
            float cl = smoothstep(0.5, 0.82, fbm(cuv * vec2(1.0, 2.6))) * smoothstep(0.004, 0.04, h);
            c = mix(c, mix(vec3(1.0), uLow, 0.35 + uNight * 0.4), cl * mix(0.75, 0.25, uNight));
            // night: a few twinkling stars
            if (uNight > 0.5) {
              vec2 g = d.xz / max(0.08, d.y + 0.25) * 60.0;
              float s = hash12(floor(g));
              float tw = 0.6 + 0.4 * sin(uTime * 2.0 + s * 40.0);
              c += vec3(0.9, 0.95, 1.0) * step(0.985, s) * smoothstep(0.35, 0.05, length(fract(g) - 0.5)) * tw * smoothstep(0.02, 0.12, d.y) * 0.8;
            }
            // thin warm haze right on the horizon
            c = mix(c, uLight, smoothstep(0.012, 0.0, h) * 0.3 * (1.0 - uNight * 0.6));
            gl_FragColor = vec4(c, 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }`})),this.sky.renderOrder=-1,this.scene.add(this.sky);const[a,o]=n,l=new le,c=[],u=[],f=.6,d=260;for(let h=0;h<=o;h++){const y=h/o,x=f*Math.pow(d/f,Math.pow(y,1.15)),g=2.2+x*1.6;for(let R=0;R<=a;R++)c.push((R/a-.5)*2*g,0,-x)}for(let h=0;h<o;h++)for(let y=0;y<a;y++){const x=h*(a+1)+y,g=x+1,R=x+a+1,b=R+1;u.push(x,g,R,g,b,R)}l.setAttribute("position",new Kt(c,3)),l.setIndex(u),this.sea=new Ot(l,new ue({uniforms:{...r,...s(e),uWaves:{value:Yr(t)},uTime:{value:0},uAmp:{value:1},uDeep:{value:new st(e.seaBottom)},uShallow:{value:new st(e.seaTop)},uSun:{value:new C(.62,.075,-1).normalize()},uRing:{value:this.ring}},vertexShader:`
          ${ro}
          uniform vec4 uRing;
          varying vec3 vW; varying vec3 vN; varying float vCrest; varying float vRing;
          void main(){
            vec3 n; float crest;
            vec3 p = position;
            float dist = length(p.xz);
            float fade = 1.0 - smoothstep(18.0, 90.0, dist); // far swell flattens toward the horizon
            vec3 q = gerstner(p, n, crest);
            q = mix(p, q, fade);
            n = normalize(mix(vec3(0.0, 1.0, 0.0), n, fade));
            // splash ring
            float r = length(p.xz - uRing.xy);
            float band = r - uRing.z * 3.2;
            float ring = uRing.w * exp(-band * band * 1.6) * sin(band * 5.0) * exp(-uRing.z * 0.9);
            q.y += ring * 0.17;
            vRing = abs(ring);
            vCrest = crest * fade;
            vec4 w = modelMatrix * vec4(q, 1.0);
            vW = w.xyz; vN = n;
            gl_Position = projectionMatrix * viewMatrix * w;
          }`,fragmentShader:`uniform vec3 uTop; uniform vec3 uLow; uniform vec3 uLight; uniform float uNight; uniform vec3 uDeep; uniform vec3 uShallow; uniform vec3 uSun; uniform float uTime;
          varying vec3 vW; varying vec3 vN; varying float vCrest; varying float vRing;
          ${zr}
          ${Ta}
          void main(){
            ${Aa}
            vec3 V = normalize(cameraPosition - vW);
            // fine ripples on top of the swell
            vec2 rp = vW.xz * 1.7 + vec2(uTime * 0.35, uTime * 0.21);
            vec3 N = normalize(vN + vec3(vnoise(rp) - 0.5, 0.0, vnoise(rp + 9.3) - 0.5) * 0.22);
            float fres = 0.02 + 0.98 * pow(1.0 - max(0.0, dot(N, V)), 5.0);
            vec3 R = reflect(-V, N);
            vec3 skyR = mix(uLow, uTop, smoothstep(0.0, 0.12, R.y));
            // water body: deep in the troughs, light shining through the crests
            vec3 body = mix(uDeep, uShallow, 0.35 + 0.45 * smoothstep(-0.4, 0.9, vCrest));
            vec3 c = mix(body, skyR, clamp(fres * 0.85, 0.0, 0.85));
            // sun glitter
            float spec = pow(max(0.0, dot(R, uSun)), mix(220.0, 90.0, uNight));
            c += uLight * spec * mix(2.6, 1.2, uNight);
            float glit = step(0.86, vnoise(vW.xz * 6.0 + uTime * 1.5)) * pow(max(0.0, dot(R, uSun)), 12.0);
            c += uLight * glit * 0.9;
            // foam on the crests and in the splash ring
            float dist = length(vW.xz - cameraPosition.xz);
            float fn = fbm(vW.xz * 1.6 + vec2(uTime * 0.25, -uTime * 0.18));
            float foam = smoothstep(0.52, 0.86, vCrest + fn * 0.38) * (1.0 - smoothstep(10.0, 45.0, dist));
            foam = max(foam, smoothstep(0.03, 0.14, vRing) * fn * 0.6);
            c = mix(c, mix(vec3(1.0), uLight, 0.25) * mix(1.0, 0.5, uNight), clamp(foam, 0.0, 0.9) * mix(1.0, 0.55, uNight));
            // aerial haze to the horizon
            float haze = smoothstep(30.0, 250.0, dist);
            c = mix(c, uLow, pow(haze, 1.2) * 0.7);
            gl_FragColor = vec4(c, 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }`})),this.sea.frustumCulled=!1,this.scene.add(this.sea);const p=new le;p.setAttribute("position",new Kt([-1,-1,0,3,-1,0,-1,3,0],3)),this.overlay=new Ot(p,new ue({transparent:!0,depthTest:!1,depthWrite:!1,uniforms:{...r,uLight:{value:new st(e.light)},uShallow:{value:new st(e.seaTop)},uNight:{value:e.night?1:0}},vertexShader:"void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:`uniform vec3 uLight; uniform vec3 uShallow; uniform float uNight;
          ${zr}
          void main(){
            float pr = uRes.y / 600.0;
            float y = waterlineY(gl_FragCoord.x);
            float d = (y - gl_FragCoord.y) / max(1.0, pr); // > 0 under the line, in css-ish px
            float line = smoothstep(2.6, 0.0, abs(d - 0.6));
            float under = d > 0.0 ? exp(-d / 26.0) : 0.0;
            float over = d < 0.0 ? exp(d / 3.0) : 0.0;
            vec3 c = mix(uShallow, uLight, 0.6);
            float a = line * mix(0.75, 0.45, uNight) + under * 0.28 + over * 0.12;
            gl_FragColor = vec4(mix(c, vec3(1.0), line * 0.6), a);
            #include <colorspace_fragment>
          }`})),this.overlay.frustumCulled=!1,this.overlay.renderOrder=10,this.scene.add(this.overlay);const _=70,v=new le;v.setAttribute("position",new $t(new Float32Array(_*3).fill(-9),3));const m=new Float32Array(_);for(let h=0;h<_;h++)m[h]=3+Math.random()*6;v.setAttribute("aSize",new $t(m,1)),this.drops=new $i(v,new ue({transparent:!0,depthTest:!1,depthWrite:!1,uniforms:{uPr:{value:1},uLight:{value:new st(e.light)}},vertexShader:"uniform float uPr; attribute float aSize; void main(){ gl_PointSize = aSize * uPr; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:`uniform vec3 uLight; void main(){ vec2 q = gl_PointCoord - 0.5; float d = length(q); if (d > 0.5) discard;
          float body = smoothstep(0.5, 0.3, d); float hi = smoothstep(0.18, 0.0, length(q - vec2(-0.14, -0.14)));
          gl_FragColor = vec4(mix(mix(uLight, vec3(1.0), 0.5), vec3(1.0), hi), body * 0.85);
          #include <colorspace_fragment>
        }`})),this.drops.frustumCulled=!1,this.drops.renderOrder=11,this.scene.add(this.drops),this.dropVel=new Float32Array(_*2),this.dropLife=new Float32Array(_)}setColors(t){for(const n of[this.sky.material,this.sea.material])n.uniforms.uTop.value.set(t.skyTop),n.uniforms.uLow.value.set(t.skyLow),n.uniforms.uLight.value.set(t.light),n.uniforms.uNight.value=t.night?1:0;this.sea.material.uniforms.uDeep.value.set(t.seaBottom),this.sea.material.uniforms.uShallow.value.set(t.seaTop);const e=this.overlay.material.uniforms;e.uLight.value.set(t.light),e.uShallow.value.set(t.seaTop),e.uNight.value=t.night?1:0,this.drops.material.uniforms.uLight.value.set(t.light)}setWaves(t){this.sea.material.uniforms.uWaves.value=Yr(t)}resize(t,e,n,r){this.line.uRes.value.set(t*n,e*n),this.line.uLine.value=r,this.drops.material.uniforms.uPr.value=n;const s=t/Math.max(1,e);this.camera.aspect=s,this.camera.fov=s<.9?52:42,this.camera.updateProjectionMatrix();const a=1-2*r*.42,o=Math.atan(a*Math.tan(pi.degToRad(this.camera.fov/2)));this.camera.position.set(0,this.height,0),this.camera.rotation.set(-o,0,0)}splash(t,e=1){const n=this.drops.geometry.attributes.position,r=this.dropLife.length,s=this.line.uLineTime.value,a=this.line.uRes.value.x/Math.max(1,this.line.uRes.value.y),o=t*a,l=1-2*(this.line.uLine.value+Dd(o,s,0)),c=Math.round(34*e);for(let u=0;u<c;u++){const f=this.dropNext;this.dropNext=(f+1)%r;const d=t*2-1+(Math.random()-.5)*.12;n.setXYZ(f,d,l,0);const p=Math.PI/2+(Math.random()-.5)*1.5,_=(.55+Math.random()*.9)*e;this.dropVel[f*2]=Math.cos(p)*_*.55/Math.max(.6,a),this.dropVel[f*2+1]=Math.sin(p)*_*1.1,this.dropLife[f]=2.5}n.needsUpdate=!0,this.ring.set((t-.5)*6,-6.5,0,e),this.line.uSlosh.value=Math.min(1.2,this.line.uSlosh.value+.9*e)}step(t,e){this.sky.material.uniforms.uTime.value=e,this.sea.material.uniforms.uTime.value=e,this.line.uLineTime.value=e,this.line.uSlosh.value=Math.max(0,this.line.uSlosh.value-t*.45),this.ring.w>0&&(this.ring.z+=t,this.ring.z>5&&(this.ring.w=0));const n=this.drops.geometry.attributes.position;let r=!1;for(let s=0;s<this.dropLife.length;s++){if(this.dropLife[s]<=0)continue;r=!0,this.dropLife[s]-=t,this.dropVel[s*2+1]-=t*2.6;const a=n.getX(s)+this.dropVel[s*2]*t,o=n.getY(s)+this.dropVel[s*2+1]*t,l=1-2*this.line.uLine.value;this.dropLife[s]<=0||this.dropVel[s*2+1]<0&&o<l-.03?(this.dropLife[s]=0,n.setXYZ(s,-9,-9,0)):n.setXYZ(s,a,o,0)}r&&(n.needsUpdate=!0)}dispose(){this.scene.traverse(t=>{var n,r,s;const e=t;(n=e.geometry)==null||n.dispose(),(s=(r=e.material)==null?void 0:r.dispose)==null||s.call(r)})}}function Fd(){const i=[[0,-.5],[.06,-.42],[.11,-.2],[.13,.05],[.11,.25],[.06,.4],[0,.46]].map(([o,l])=>new it(o,l)),t=new xi(i,8);t.rotateZ(-Math.PI/2),t.scale(1,1,.55);const e=new le;e.setAttribute("position",new Kt([-.44,0,0,-.72,.17,0,-.64,0,0,-.44,0,0,-.64,0,0,-.72,-.17,0],3)),e.setAttribute("normal",new Kt([0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1],3));const n=t.toNonIndexed();n.deleteAttribute("uv");const r=new Float32Array(n.attributes.position.array.length+e.attributes.position.array.length);r.set(n.attributes.position.array,0),r.set(e.attributes.position.array,n.attributes.position.array.length);const s=new Float32Array(r.length);s.set(n.attributes.normal.array,0),s.set(e.attributes.normal.array,n.attributes.normal.array.length);const a=new le;return a.setAttribute("position",new $t(r,3)),a.setAttribute("normal",new $t(s,3)),t.dispose(),e.dispose(),n.dispose(),a}class Nd{constructor(t,e,n){nt(this,"mesh");nt(this,"pos",[]);nt(this,"vel",[]);nt(this,"schools",[]);nt(this,"m",new Zt);nt(this,"q",new qn);nt(this,"s",new C);nt(this,"up",new C(0,1,0));nt(this,"tmp",new C);nt(this,"tmp2",new C);nt(this,"fwd",new C(1,0,0));nt(this,"scales",[]);const r=t.reduce((u,f)=>u+f,0),s=new Float32Array(r),a=new Float32Array(r*3),o=new ue({fog:!0,uniforms:ci.merge([et.fog,{uTime:{value:0},uLight:{value:new st(n)}}]),vertexShader:`uniform float uTime; attribute float aPhase; attribute vec3 aTint; varying vec3 vN; varying vec3 vT; varying float vBelly;
        #include <fog_pars_vertex>
        void main(){
          vec3 p = position;
          float behind = clamp(-p.x - 0.05, 0.0, 1.0);
          p.z += sin(uTime * 13.0 + aPhase) * behind * behind * 0.35;
          vBelly = smoothstep(0.06, -0.08, p.y);
          vN = normalize(mat3(modelViewMatrix * instanceMatrix) * normal);
          vT = aTint;
          vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          #include <fog_vertex>
        }`,fragmentShader:`uniform vec3 uLight; varying vec3 vN; varying vec3 vT; varying float vBelly;
        #include <fog_pars_fragment>
        void main(){
          vec3 n = normalize(vN);
          float l = 0.55 + 0.45 * max(0.0, dot(n, normalize(vec3(-0.2, 0.9, 0.4))));
          float rim = pow(1.0 - abs(n.z), 2.0) * 0.35;
          vec3 c = mix(vT, mix(vT, vec3(1.0), 0.7), vBelly) * l + uLight * rim;
          gl_FragColor = vec4(c, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
          #include <fog_fragment>
        }`}),l=Fd();this.mesh=new Hf(l,o,r),this.mesh.frustumCulled=!1;let c=0;t.forEach((u,f)=>{const d=new st(e[f%e.length]),p={start:c,count:u,goal:new C,seed:f*2.3+.7,tint:d};this.schools.push(p);const _=new C((f-(t.length-1)/2)*5,-.6+f*.5,-4-f*2);for(let v=0;v<u;v++){const m=c+v;this.pos.push(_.clone().add(new C((Math.random()-.5)*2,(Math.random()-.5)*.8,(Math.random()-.5)*1.6))),this.vel.push(new C(.8+Math.random()*.2,0,(Math.random()-.5)*.2)),s[m]=Math.random()*6.28;const h=.85+Math.random()*.3;a.set([d.r*h,d.g*h,d.b*h],m*3),this.scales.push(.3+Math.random()*.12)}c+=u}),l.setAttribute("aPhase",new ji(s,1)),l.setAttribute("aTint",new ji(a,3)),this.step(0,0,new C(0,0,0),1,1)}setColors(t,e){const n=this.mesh.geometry.getAttribute("aTint");for(const[r,s]of this.schools.entries()){s.tint.set(t[r%t.length]);for(let a=0;a<s.count;a++){const o=.85+a*37%10/33;n.setXYZ(s.start+a,s.tint.r*o,s.tint.g*o,s.tint.b*o)}}n.needsUpdate=!0,this.mesh.material.uniforms.uLight.value.set(e)}step(t,e,n,r,s){this.mesh.material.uniforms.uTime.value=e;const{pos:a,vel:o,tmp:l,tmp2:c}=this,u=1.5,f=.7;for(const d of this.schools){const p=d.seed;d.goal.set(Math.sin(e*.09+p)*7*s,-.9+Math.sin(e*.13+p*2)*1.1+p%1.2*.5,-7.2+Math.sin(e*.07+p*3)*2.4);const _=d.start+d.count;for(let v=d.start;v<_;v++){const m=a[v],h=o[v],y=l.set(0,0,0),x=c.set(0,0,0),g=this.s.set(0,0,0);let R=0;for(let w=d.start;w<_;w++){if(w===v)continue;const L=a[w],T=m.x-L.x,S=m.y-L.y,P=m.z-L.z,O=T*T+S*S+P*P;if(!(O>2.4)&&(R++,x.add(o[w]),g.add(L),O<.3)){const N=1/Math.max(.02,O);y.x+=T*N,y.y+=S*N,y.z+=P*N}}if(t>0){R&&(x.multiplyScalar(1/R).sub(h).multiplyScalar(.9),g.multiplyScalar(1/R).sub(m).multiplyScalar(.55),h.addScaledVector(x,t).addScaledVector(g,t)),h.addScaledVector(y,t*.05),h.x+=(d.goal.x-m.x)*t*.12,h.y+=(d.goal.y-m.y)*t*.16,h.z+=(d.goal.z-m.z)*t*.12;const w=m.x-n.x,L=m.y-n.y,T=m.z-n.z,S=Math.hypot(w,L,T);if(S<r){const O=(r-S)/r*9*t/Math.max(.1,S);h.x+=w*O,h.y+=L*O,h.z+=T*O}m.y<-2.4&&(h.y+=t*1.5),m.y>1.4&&(h.y-=t*1.5),h.y*=1-t*.8;const P=h.length();P>u?h.multiplyScalar(u/P):P<f&&h.multiplyScalar(f/Math.max(.001,P)),m.addScaledVector(h,t)}l.copy(h).normalize(),this.q.setFromUnitVectors(this.fwd,l);const b=this.scales[v];this.m.compose(m,this.q,c.set(b,b,b)),this.mesh.setMatrixAt(v,this.m)}}this.mesh.instanceMatrix.needsUpdate=!0}dispose(){this.mesh.geometry.dispose(),this.mesh.material.dispose(),this.mesh.dispose()}}const Zi=2.35,ba=`
  float caustic(vec2 uv, float t) {
    vec2 p = mod(uv * 6.28318, 6.28318) - 250.0;
    vec2 i = p; float c = 1.0; float inten = 0.005;
    for (int n = 0; n < 4; n++) {
      float tt = t * (1.0 - (3.5 / float(n + 1)));
      i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
      c += 1.0 / length(vec2(p.x / (sin(i.x + tt) / inten), p.y / (cos(i.y + tt) / inten)));
    }
    c /= 4.0; c = 1.17 - pow(c, 1.4);
    return clamp(pow(abs(c), 8.0), 0.0, 1.5);
  }`,Od=[.36,.52,.7,.86,.6];function zd(){try{const i=document.createElement("canvas");return!!(i.getContext("webgl2")||i.getContext("webgl"))}catch{return!1}}class Gd{constructor(t,e,n={mobile:!1}){nt(this,"renderer");nt(this,"scene",new ka);nt(this,"camera",new Ae(42,1,.1,120));nt(this,"clock",new Td);nt(this,"surface");nt(this,"waves");nt(this,"schools");nt(this,"raf",0);nt(this,"running",!1);nt(this,"wanted",!1);nt(this,"t",0);nt(this,"creature",null);nt(this,"creatureStage",-1);nt(this,"holder",new ye);nt(this,"spin",new ye);nt(this,"morph",1);nt(this,"hop",0);nt(this,"bg");nt(this,"floor");nt(this,"ceiling");nt(this,"rays",[]);nt(this,"kelp",[]);nt(this,"bubbles");nt(this,"motes");nt(this,"burst");nt(this,"decor",[]);nt(this,"decorMats",{});nt(this,"hemi");nt(this,"sun");nt(this,"rim");nt(this,"colors");nt(this,"pointer",new it(0,0));nt(this,"raycaster",new Ad);nt(this,"heading",0);nt(this,"pitch",0);nt(this,"aspect",1);nt(this,"spoutAt",4);nt(this,"size",{w:1,h:1});nt(this,"lineFrac",.24);nt(this,"mobile");nt(this,"stage",0);nt(this,"progress",0);nt(this,"_reduce",!1);nt(this,"onReady");nt(this,"readyFired",!1);nt(this,"tmpA",new C);nt(this,"tmpB",new C);nt(this,"frame",()=>{if(!this.running)return;this.raf=requestAnimationFrame(this.frame);const t=Math.min(.05,this.clock.getDelta());this.step(t),this.render()});this.canvas=t,this.colors=e,this.mobile=n.mobile,this.renderer=new zf({canvas:t,antialias:!n.mobile,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,n.mobile?1.75:2)),this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1.12,this.renderer.outputColorSpace=Ce,this.renderer.autoClear=!1,this.waves=Ld(n.mobile?4:6);const r=this.scene;r.fog=new Qr(e.seaFog,9,34),this.bg=new Ot(new ln(70,32,16),new ue({side:1,depthWrite:!1,fog:!1,uniforms:{top:{value:new st(e.seaTop)},bottom:{value:new st(e.seaBottom)},fogc:{value:new st(e.seaFog)},light:{value:new st(e.light)},time:{value:0}},vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`uniform vec3 top; uniform vec3 bottom; uniform vec3 fogc; uniform vec3 light; uniform float time; varying vec3 vP;
          void main(){
            float h = smoothstep(-0.45, 0.35, vP.y);
            vec3 c = mix(bottom, fogc, h);
            float shimmer = 0.5 + 0.5 * sin(vP.x * 40.0 + time * 1.3) * sin(vP.z * 37.0 - time);
            c += light * smoothstep(0.0, 0.4, vP.y) * (0.06 + 0.04 * shimmer);
            gl_FragColor = vec4(c, 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }`})),r.add(this.bg);const s=new on(90,70,n.mobile?70:130,n.mobile?50:96);s.rotateX(-Math.PI/2),this.ceiling=new Ot(s,new ue({fog:!0,side:2,uniforms:ci.merge([et.fog,{uWaves:{value:Yr(this.waves)},uTime:{value:0},uAmp:{value:1.25},uTop:{value:new st(e.seaTop)},uFogC:{value:new st(e.seaFog)},uLight:{value:new st(e.light)}}]),vertexShader:`
          ${ro}
          varying vec3 vW; varying vec3 vN; varying float vCrest;
          #include <fog_pars_vertex>
          void main(){
            vec3 n; float crest;
            vec3 p = gerstner(position, n, crest);
            vCrest = crest; vN = n;
            vec4 w = modelMatrix * vec4(p, 1.0);
            vW = w.xyz;
            vec4 mvPosition = viewMatrix * w;
            gl_Position = projectionMatrix * mvPosition;
            #include <fog_vertex>
          }`,fragmentShader:`uniform vec3 uTop; uniform vec3 uFogC; uniform vec3 uLight; uniform float uTime;
          varying vec3 vW; varying vec3 vN; varying float vCrest;
          #include <fog_pars_fragment>
          ${ba}
          void main(){
            vec3 V = normalize(cameraPosition - vW);
            vec3 N = -normalize(vN);
            float facing = max(0.0, dot(N, V));
            // total internal reflection at grazing angles, light pouring through where the wave faces us
            vec3 c = mix(uFogC, uTop, 0.12 + 0.6 * smoothstep(0.08, 0.7, facing));
            float ca = caustic(vW.xz * 0.16, uTime * 0.5);
            c += uLight * (ca * 0.42 + smoothstep(0.4, 0.95, vCrest) * 0.3);
            gl_FragColor = vec4(c, 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
            #include <fog_fragment>
          }`})),this.ceiling.position.set(0,Zi,-18),r.add(this.ceiling);const a=new on(90,90,n.mobile?70:110,n.mobile?70:110);a.rotateX(-Math.PI/2);const o=a.attributes.position;for(let p=0;p<o.count;p++){const _=o.getX(p),v=o.getZ(p);o.setY(p,Math.sin(_*.35)*.18+Math.sin(v*.5+_*.2)*.22+Math.sin(_*1.3+v*.9)*.05)}a.computeVertexNormals(),this.floor=new Ot(a,new ue({fog:!0,uniforms:ci.merge([et.fog,{sand:{value:new st(e.sand)},light:{value:new st(e.light)},time:{value:0}}]),vertexShader:`varying vec3 vW; varying vec3 vN;
          #include <fog_pars_vertex>
          void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; vN = normal; vec4 mvPosition = viewMatrix * w; gl_Position = projectionMatrix * mvPosition;
          #include <fog_vertex>
          }`,fragmentShader:`uniform vec3 sand; uniform vec3 light; uniform float time; varying vec3 vW; varying vec3 vN;
          #include <fog_pars_fragment>
          ${ba}
          void main(){
            float c = caustic(vW.xz * 0.11, time * 0.45) + caustic(vW.xz * 0.07 + 3.1, time * 0.33) * 0.6;
            float shade = 0.62 + 0.38 * clamp(dot(normalize(vN), normalize(vec3(-0.3, 1.0, 0.2))), 0.0, 1.0);
            vec3 col = sand * shade + light * c * 0.42;
            gl_FragColor = vec4(col, 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
            #include <fog_fragment>
          }`})),this.floor.position.y=-3.1,r.add(this.floor);const l=n.mobile?5:8;for(let p=0;p<l;p++){const v=new on(1.4+Math.random()*2.2,13);v.translate(0,-13/2,0);const m=new Ot(v,new ue({transparent:!0,depthWrite:!1,blending:2,side:2,uniforms:{light:{value:new st(e.light)},time:{value:0},seed:{value:Math.random()*10},strength:{value:.16}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`uniform vec3 light; uniform float time; uniform float seed; uniform float strength; varying vec2 vUv;
            void main(){
              float edge = sin(vUv.x * 3.14159); edge *= edge;
              float fall = smoothstep(0.0, 0.8, vUv.y) * smoothstep(1.0, 0.94, vUv.y);
              float streak = 0.75 + 0.25 * sin(vUv.x * 9.0 + time * 0.8 + seed * 5.0);
              gl_FragColor = vec4(light * edge * fall * streak * strength, 1.0);
            }`}));m.position.set((p/(l-1)-.5)*20+Math.random()*1.5,Zi+.2,-5-Math.random()*7),m.rotation.z=-.3+Math.random()*.08,m.userData.seed=Math.random()*6,this.rays.push(m),r.add(m)}const c=()=>new ue({fog:!0,side:2,uniforms:ci.merge([et.fog,{kelp:{value:new st(e.kelp)},time:{value:0},phase:{value:Math.random()*6}}]),vertexShader:`uniform float time; uniform float phase; varying vec2 vUv;
          #include <fog_pars_vertex>
          void main(){ vUv = uv; vec3 p = position; float k = uv.y * uv.y;
            p.x += sin(time * 0.9 + phase + uv.y * 3.0) * 0.55 * k; p.z += cos(time * 0.7 + phase + uv.y * 2.0) * 0.25 * k;
            p.x *= 1.0 - uv.y * 0.55;
            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mvPosition;
            #include <fog_vertex>
          }`,fragmentShader:`uniform vec3 kelp; varying vec2 vUv;
          #include <fog_pars_fragment>
          void main(){ vec3 c = kelp * (0.55 + 0.75 * vUv.y);
            float edge = smoothstep(0.0, 0.18, vUv.x) * smoothstep(1.0, 0.82, vUv.x); c *= 0.75 + 0.25 * edge;
            gl_FragColor = vec4(c, 1.0);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
            #include <fog_fragment>
          }`}),u=[[-7.5,-4,4.6],[-6.4,-6,5.2],[-5.6,-2.5,3.4],[6.8,-5,5],[7.6,-3,4],[5.3,-7,4.8],[-2.5,-9,5],[3,-10,5]];for(const[p,_,v]of u){const m=new on(.55,v,1,18);m.translate(0,v/2,0);const h=new Ot(m,c());h.position.set(p,-3.1,_),h.rotation.y=Math.random()*Math.PI,this.kelp.push(h),r.add(h)}this.decorMats.rock=new Pe({color:e.rock,roughness:.9,flatShading:!0}),this.decorMats.coral=new Pe({color:e.coral,roughness:.55}),this.decorMats.lav=new Pe({color:e.lavender,roughness:.55});const f=[[-6,-3.6,1.6,1.2],[5.6,-2.4,1.3,1],[-3.8,-6.5,1.9,1.1],[8.5,-6.5,2.2,1.4],[1.8,-8,1.4,.9]];for(const[p,_,v,m]of f){const h=new Ot(new ss(1,1),this.decorMats.rock);h.position.set(p,-3.1,_),h.scale.set(v,m,v*.85),h.rotation.set(Math.random(),Math.random()*3,Math.random()*.3),this.decor.push(h),r.add(h)}const d=(p,_,v,m,h)=>{const y=new ye;for(let x=0;x<m;x++){const g=h*(.55+Math.random()*.6),R=new Ot(new is(.13,g,4,10),v);R.position.set((Math.random()-.5)*.6,g/2,(Math.random()-.5)*.6),R.rotation.set((Math.random()-.5)*.9,0,(Math.random()-.5)*.9),y.add(R),this.decor.push(R)}y.position.set(p,-3.1,_),r.add(y)};d(-4.6,-2.2,this.decorMats.coral,6,1.3),d(4.4,-3.4,this.decorMats.lav,5,1.2),d(6.4,-1.4,this.decorMats.coral,4,.9),d(-7.4,-1,this.decorMats.lav,5,1),this.schools=new Nd(n.mobile?[14,12]:[26,22,18],this.schoolTints(e),e.light),r.add(this.schools.mesh),this.bubbles=this.makeBubbles(n.mobile?34:56),r.add(this.bubbles),this.motes=this.makeMotes(n.mobile?140:280),r.add(this.motes),this.burst=this.makeBurst(110),r.add(this.burst.pts),this.hemi=new xd(e.light,e.seaBottom,1.35),this.sun=new Ed(e.light,2),this.sun.position.set(-3,10,6),this.rim=new Sd(e.coral,14,14,1.6),this.rim.position.set(3,1.5,-3),r.add(this.hemi,this.sun,this.rim),this.spin.add(new ye),this.holder.add(this.spin),r.add(this.holder),this.camera.position.set(0,.3,9),this.surface=new Id(this.waves,this.skyColors(e),n.mobile?[70,60]:[140,110]);for(let p=0;p<90;p++)this.schools.step(1/30,p/30,this.holder.position,1.6,1)}skyColors(t){return{skyTop:t.skyTop,skyLow:t.skyLow,seaTop:t.seaTop,seaBottom:t.seaBottom,light:t.light,night:t.night}}schoolTints(t){return[new st(t.light).lerp(new st(t.seaTop),.35).getStyle(),new st(t.coral).lerp(new st("#ffd27a"),.35).getStyle(),new st(t.lavender).lerp(new st(t.accent),.3).getStyle()]}get reduce(){return this._reduce}set reduce(t){t!==this._reduce&&(this._reduce=t,t?(this.halt(),this.staticFrame()):this.wanted&&this.loop())}bubbleMat(t){return new ue({transparent:!0,depthWrite:!1,uniforms:{time:{value:0},pr:{value:this.renderer.getPixelRatio()},opacity:{value:t},rise:{value:1},tint:{value:new st("#ffffff")},top:{value:Zi},drift:{value:0}},vertexShader:`uniform float time; uniform float pr; uniform float rise; uniform float top; uniform float drift; attribute float aSize; attribute float aSpeed; attribute float aPhase; varying float vA;
        void main(){
          vec3 p = position;
          float span = top + 3.4;
          p.y = mod(p.y + 3.2 + time * aSpeed * rise, span) - 3.2;
          p.x += sin(time * 1.7 * aSpeed + aPhase) * 0.18;
          p.x = mod(p.x + drift * aSpeed * 4.0 + 13.0, 26.0) - 13.0;
          vA = smoothstep(-3.2, -2.4, p.y) * (1.0 - smoothstep(top - 0.9, top - 0.1, p.y));
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = aSize * pr * (260.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`uniform float opacity; uniform vec3 tint; varying float vA;
        void main(){
          vec2 q = gl_PointCoord - 0.5; float d = length(q);
          if (d > 0.5) discard;
          float ring = smoothstep(0.5, 0.42, d) * (0.18 + 0.82 * smoothstep(0.28, 0.47, d));
          float hi = smoothstep(0.13, 0.0, length(q - vec2(-0.16, -0.17)));
          gl_FragColor = vec4(tint, (ring * 0.75 + hi) * opacity * vA);
        }`})}makeBubbles(t){const e=new le,n=new Float32Array(t*3),r=new Float32Array(t),s=new Float32Array(t),a=new Float32Array(t);for(let l=0;l<t;l++){const c=l%3===0,u=c?[-5.2,4.8,-1.5][l%9===0?0:l%9===3?1:2]:(Math.random()-.5)*22;n.set([u+(c?(Math.random()-.5)*.4:0),Math.random()*5.6-3.2,c?-3-l%2:-9+Math.random()*12],l*3),r[l]=c?.5+Math.random()*.8:.3+Math.random()*.9,s[l]=.5+Math.random()*.9,a[l]=Math.random()*6.28}e.setAttribute("position",new $t(n,3)),e.setAttribute("aSize",new $t(r,1)),e.setAttribute("aSpeed",new $t(s,1)),e.setAttribute("aPhase",new $t(a,1));const o=new $i(e,this.bubbleMat(.75));return o.frustumCulled=!1,o}makeMotes(t){const e=new le,n=new Float32Array(t*3),r=new Float32Array(t),s=new Float32Array(t),a=new Float32Array(t);for(let c=0;c<t;c++)n.set([(Math.random()-.5)*26,Math.random()*5.6-3.2,-12+Math.random()*18],c*3),r[c]=.08+Math.random()*.16,s[c]=.03+Math.random()*.06,a[c]=Math.random()*6.28;e.setAttribute("position",new $t(n,3)),e.setAttribute("aSize",new $t(r,1)),e.setAttribute("aSpeed",new $t(s,1)),e.setAttribute("aPhase",new $t(a,1));const o=this.bubbleMat(.55);o.fragmentShader="uniform float opacity; uniform vec3 tint; varying float vA; void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; gl_FragColor = vec4(tint, smoothstep(0.5, 0.0, d) * opacity * vA); }";const l=new $i(e,o);return l.frustumCulled=!1,l}makeBurst(t){const e=new le,n=new Float32Array(t*3).fill(-999),r=new Float32Array(t),s=new Float32Array(t),a=new Float32Array(t);for(let c=0;c<t;c++)r[c]=.35+Math.random()*.75,s[c]=0,a[c]=Math.random()*6;e.setAttribute("position",new $t(n,3)),e.setAttribute("aSize",new $t(r,1)),e.setAttribute("aSpeed",new $t(s,1)),e.setAttribute("aPhase",new $t(a,1));const o=this.bubbleMat(.95);o.vertexShader="uniform float pr; uniform float top; attribute float aSize; varying float vA; void main(){ vA = 1.0 - smoothstep(top - 0.6, top - 0.1, position.y); vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_PointSize = aSize * pr * (260.0 / -mv.z); gl_Position = projectionMatrix * mv; }";const l=new $i(e,o);return l.frustumCulled=!1,{pts:l,vel:new Float32Array(t*3),life:new Float32Array(t),next:0}}pop(t,e=18,n=1){const r=this.burst.pts.geometry.attributes.position,s=this.burst.life.length;for(let a=0;a<e;a++){const o=this.burst.next;this.burst.next=(o+1)%s,r.setXYZ(o,t.x+(Math.random()-.5)*.4*n,t.y+(Math.random()-.5)*.3*n,t.z+(Math.random()-.5)*.4*n),this.burst.vel.set([(Math.random()-.5)*1.6*n,1.2+Math.random()*2.2,(Math.random()-.5)*1.2*n],o*3),this.burst.life[o]=1.6+Math.random()*1.2}r.needsUpdate=!0}setColors(t){this.colors=t;const e=this.bg.material.uniforms;e.top.value.set(t.seaTop),e.bottom.value.set(t.seaBottom),e.fogc.value.set(t.seaFog),e.light.value.set(t.light),this.scene.fog.color.set(t.seaFog);const n=this.ceiling.material.uniforms;n.uTop.value.set(t.seaTop),n.uFogC.value.set(t.seaFog),n.uLight.value.set(t.light),this.floor.material.uniforms.sand.value.set(t.sand),this.floor.material.uniforms.light.value.set(t.light);for(const r of this.rays)r.material.uniforms.light.value.set(t.light);for(const r of this.kelp)r.material.uniforms.kelp.value.set(t.kelp);this.decorMats.rock.color.set(t.rock),this.decorMats.coral.color.set(t.coral),this.decorMats.lav.color.set(t.lavender),this.hemi.color.set(t.light),this.hemi.groundColor.set(t.seaBottom),this.sun.color.set(t.light),this.rim.color.set(t.coral),this.schools.setColors(this.schoolTints(t),t.light),this.surface.setColors(this.skyColors(t)),this.creatureStage===4&&this.swapCreature(4,!0),this.reduce&&this.staticFrame()}swapCreature(t,e=!1){this.creature&&(this.spin.remove(this.creature.group),this.creature.dispose()),this.creature=t>=4?Cd(this.colors.whale,this.colors.whaleBelly):Rd(bd[t]),this.spin.add(this.creature.group),this.creatureStage=t,!e&&!this.reduce&&(this.morph=0)}setStage(t,e){const n=t!==this.stage||!this.creature;this.stage=t,this.progress=e,n&&(this.creature?(this.pop(this.holder.position.clone(),26,1.4),this.swapCreature(t)):this.swapCreature(t,!0)),this.reduce&&this.staticFrame()}heroX01(){const t=this.holder.position.clone().project(this.camera);return pi.clamp((t.x+1)/2,.08,.92)}celebrate(){this.hop=1,this.pop(this.holder.position.clone(),46,2),this.surface.splash(this.heroX01(),1),this.reduce&&this.staticFrame()}splash(t=.7){this.pop(this.holder.position.clone(),24,1.4),this.surface.splash(this.heroX01(),t),this.reduce&&this.staticFrame()}setPointer(t,e){this.pointer.set(t,e)}click(t,e){if(!this.creature)return!1;this.raycaster.setFromCamera(new it(t,e),this.camera);const n=this.raycaster.intersectObject(this.creature.group,!0).length>0;return n&&(this.hop=1,this.pop(this.holder.position.clone().add(new C(0,.3,0)),14)),n}resize(t,e){this.size={w:t,h:e},this.aspect=t/Math.max(1,e),this.renderer.setSize(t,e,!1),this.camera.aspect=this.aspect,this.camera.fov=this.aspect<.9?52:42,this.camera.updateProjectionMatrix(),this.lineFrac=this.aspect<.9?.21:this.aspect<1.25?.23:.25,this.surface.resize(t,e,this.renderer.getPixelRatio(),this.lineFrac);const n=this.renderer.getPixelRatio();for(const r of[this.bubbles,this.motes,this.burst.pts])r.material.uniforms.pr.value=n;this.reduce?this.staticFrame():this.render()}pathAt(t,e){const n=Math.min(1,this.aspect/1.5),r=this.stage>=4?.75:1;return e.set(Math.sin(t*.21)*2.9*n*r,Math.sin(t*.37)*.4+.05+Math.sin(t*.11)*.18,Math.sin(t*.16+1)*1.4-.4)}step(t){var x;this.t+=t;const e=this.t;this.bg.material.uniforms.time.value=e,this.floor.material.uniforms.time.value=e,this.ceiling.material.uniforms.uTime.value=e;for(const g of this.rays){g.material.uniforms.time.value=e;const R=Br(this.waves,g.position.x,-2,e);g.material.uniforms.strength.value=.12+Math.max(0,R)*.12+Math.sin(e*.5+g.userData.seed)*.02,g.rotation.z=-.3+Math.sin(e*.2+g.userData.seed)*.05+R*.04}for(const g of this.kelp)g.material.uniforms.time.value=e;this.bubbles.material.uniforms.time.value=e,this.motes.material.uniforms.time.value=e,this.motes.material.uniforms.drift.value=e*.08+Math.sin(e*.3)*.2,this.sun.intensity=1.9+Math.sin(e*1.7)*.12+Math.sin(e*2.9)*.08,this.surface.step(t,e);const n=this.pathAt(e,this.tmpA),r=this.pathAt(e+.4,this.tmpB).sub(n);this.holder.position.copy(n);const s=Br(this.waves,n.x*.8,n.z-4,e);this.holder.position.y+=s*(this.stage>=4?.32:.26);let o=Math.atan2(-r.z,r.x)-this.heading;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;this.heading+=o*Math.min(1,t*2.2);const l=Br(this.waves,n.x*.8+.4,n.z-4,e)-s,c=Math.atan2(r.y,Math.hypot(r.x,r.z))*.7+l*.35;this.pitch+=(c-this.pitch)*Math.min(1,t*2),this.holder.rotation.set(0,this.heading,this.pitch,"YZX");const u=Od[Math.min(this.stage,4)]*(1+.22*this.progress);this.morph=Math.min(1,this.morph+t*1.3);const f=this.morph,d=f<1?1+Math.sin(f*Math.PI)*.25:1,p=1-Math.pow(1-f,3);if(this.holder.scale.setScalar(u*Math.max(.02,p)*d),this.hop>0){this.hop=Math.max(0,this.hop-t*1.4);const g=1-this.hop;this.spin.rotation.x=this.reduce?0:g*Math.PI*2*(this.hop>0?1:0),this.spin.position.y=Math.sin(g*Math.PI)*.5}else this.spin.rotation.x=0,this.spin.position.y=0;const _=.4+.6*Math.abs(Math.sin(e*.37));if((x=this.creature)==null||x.animate(this.t,_),this.creature&&(this.creature.group.rotation.x=(this.stage>=4?.38:.12)*Math.cos(this.heading)),this.stage>=4&&!this.reduce&&(this.spoutAt-=t,this.spoutAt<=0)){this.spoutAt=5+Math.random()*3;const g=new C(1,.75,0).applyMatrix4(this.holder.matrixWorld);this.pop(g,9,.8),this.surface.splash(this.heroX01(),.32)}const v=1.4+u*(this.stage>=4?3.2:2.2);this.schools.step(t,e,this.holder.position,v,Math.min(1,this.aspect/1.4));const m=this.burst.pts.geometry.attributes.position;let h=!1;for(let g=0;g<this.burst.life.length;g++){if(this.burst.life[g]<=0)continue;h=!0,this.burst.life[g]-=t;const R=this.burst.vel;R[g*3+1]=Math.min(3.2,R[g*3+1]+t*.8),R[g*3]*=1-t*1.5,R[g*3+2]*=1-t*1.5,m.setXYZ(g,m.getX(g)+R[g*3]*t,m.getY(g)+R[g*3+1]*t,m.getZ(g)+R[g*3+2]*t),(this.burst.life[g]<=0||m.getY(g)>Zi)&&(this.burst.life[g]=0,m.setXYZ(g,-999,-999,-999))}h&&(m.needsUpdate=!0);const y=this.tmpA.set(this.pointer.x*.7,.3+this.pointer.y*.3,this.aspect<.9?12.5:this.aspect<1.25?10.5:9);this.camera.position.lerp(y,t>0?Math.min(1,t*2):1),this.camera.lookAt(this.holder.position.x*.25,.75+this.holder.position.y*.2,0),this.surface.camera.position.x=this.camera.position.x*.4}staticFrame(){const t=this.t;this.t=14,this.hop=0,this.morph=1,this.step(0),this.t=t,this.render()}render(){const t=this.renderer;t.clear(),t.render(this.scene,this.camera),t.clearDepth(),t.render(this.surface.scene,this.surface.camera),!this.readyFired&&this.onReady&&(this.readyFired=!0,this.onReady())}loop(){this.running||(this.running=!0,this.clock.getDelta(),this.raf=requestAnimationFrame(this.frame))}halt(){this.running=!1,cancelAnimationFrame(this.raf)}start(){this.wanted=!0,this.reduce?this.staticFrame():this.loop()}stop(){this.wanted=!1,this.halt()}dispose(){var t;this.stop(),(t=this.creature)==null||t.dispose(),this.schools.dispose(),this.surface.dispose(),this.scene.traverse(e=>{const n=e;n.geometry&&n.geometry.dispose();const r=n.material;Array.isArray(r)?r.forEach(s=>s.dispose()):r==null||r.dispose()}),this.renderer.dispose()}}export{Gd as Ocean,zd as hasWebGL};
