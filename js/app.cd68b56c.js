(function(e){function t(t){for(var a,s,o=t[0],l=t[1],c=t[2],u=0,m=[];u<o.length;u++)s=o[u],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&m.push(i[s][0]),i[s]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);d&&d(t);while(m.length)m.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,o=1;o<n.length;o++){var l=n[o];0!==i[l]&&(a=!1)}a&&(r.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},i={app:0},r=[];function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/tcp/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var d=l;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0266":function(e,t,n){"use strict";var a=n("05a5"),i=n.n(a);i.a},"034f":function(e,t,n){"use strict";var a=n("85ec"),i=n.n(a);i.a},"05a5":function(e,t,n){},"276c":function(e,t,n){},"3e94":function(e,t,n){},"475f":function(e,t,n){"use strict";var a=n("276c"),i=n.n(a);i.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-main",[n("three-viewer",{ref:"viewer",attrs:{"camera-up":[0,0,-1],"camera-position":[.2,.2,.2]}},[n("three-viewer-frame-display"),n("three-viewer-css-2d-renderer"),n("v-btn",{staticClass:"mb-15 mr-3",attrs:{color:"green",dark:"","x-large":"",fab:"",absolute:"",bottom:"",right:""},on:{click:function(t){e.showTF=!0}}},[n("v-icon",{attrs:{dark:"",large:""}},[e._v("mdi-matrix")])],1)],1)],1),n("v-navigation-drawer",{attrs:{app:!0,absolute:"",permanent:"",right:"",width:"330px"},scopedSlots:e._u([{key:"prepend",fn:function(){return[n("v-list-item",{attrs:{"two-line":""}},[n("v-list-item-avatar",[n("v-icon",{attrs:{large:""}},[e._v("mdi-axis")])],1),n("v-list-item-content",[e._v("Tool Transform")])],1)]},proxy:!0}])},[n("v-divider"),n("v-list-item",[n("v-list-item-icon",[n("v-icon",[e._v("mdi-axis-arrow")])],1),n("v-list-item-content",[n("v-list-item-title",[e._v("Translation")]),n("v-list-item-subtitle",[e._v(e._s(e.translationInTool?"in Tool":"in Flange"))])],1),n("v-list-item-action",[n("v-switch",{model:{value:e.translationInTool,callback:function(t){e.translationInTool=t},expression:"translationInTool"}})],1)],1),n("v-list",{staticClass:"ml-4",attrs:{dense:""}},e._l(["x","y","z"],(function(t){return n("v-list-item",{key:t},[n("v-list-item-icon",[n("v-icon",[e._v(e._s("mdi-axis-"+t+"-arrow"))])],1),n("v-list-item-content",[n("v-text-field",{attrs:{type:"number","hide-details":!0,label:t.toUpperCase(),dense:""},model:{value:e.translation[t],callback:function(n){e.$set(e.translation,t,n)},expression:"translation[ax]"}},[n("template",{slot:"append"},[e._v("m")])],2)],1)],1)})),1),n("v-divider"),n("v-list-item",[n("v-list-item-icon",[n("v-icon",[e._v("mdi-backup-restore")])],1),n("v-list-item-content",[e._v("Rotation")]),n("v-list-item-action",[n("v-btn",{attrs:{color:"green",dark:"","x-small":"",fab:""}},[n("v-icon",{attrs:{dark:""},on:{click:e.addRotation}},[e._v("mdi-plus")])],1)],1)],1),n("v-list",{staticClass:"ml-4 mr-1 mb-2 rotcontainer",attrs:{dense:""}},[n("draggable",{attrs:{group:{name:"rotations"},handle:".draggable-handle"},model:{value:e.rotations,callback:function(t){e.rotations=t},expression:"rotations"}},e._l(e.rotations,(function(t){return n("v-list-item",{key:t.id},[n("v-list-item-icon",{staticClass:"mt-6 draggable-handle"},[n("v-icon",[e._v(e._s("mdi-axis-"+t.axis.axis+"-rotate-"+(t.value>=0?"counter":"")+"clockwise"))]),e._v(" "+e._s(t.newFrame?"'":"")+" ")],1),n("v-list-item-content",[n("v-list-item-title",{staticClass:"ml-0 pl-0"},[n("v-btn-toggle",{attrs:{group:"",dense:"",mandatory:""},model:{value:t["axis"],callback:function(n){e.$set(t,"axis",n)},expression:"rotation['axis']"}},e._l(e.axisToggle,(function(t){return n("v-btn",{key:t.name,staticClass:"ma-1 pa-1",attrs:{"x-small":"",value:t.model}},[e._v(e._s(t.name))])})),1)],1),n("v-text-field",{attrs:{type:"number","hide-details":!0,dense:""},model:{value:t.value,callback:function(n){e.$set(t,"value",n)},expression:"rotation.value"}},[n("template",{slot:"append"},[e._v("°")])],2)],1),n("v-list-item-action",[n("v-btn",{attrs:{icon:""}},[n("v-icon",{attrs:{small:"",color:"red"},on:{click:function(n){return e.removeRotation(t)}}},[e._v(e._s(e.mdi.mdiDeleteForever))])],1)],1)],1)})),1)],1)],1),n("v-dialog",{attrs:{"max-width":"450"},model:{value:e.showTF,callback:function(t){e.showTF=t},expression:"showTF"}},[n("v-card",[n("v-btn",{staticClass:"mt-7 mr-0",attrs:{color:"red",dark:"",fab:"","x-small":"",absolute:"",top:"",right:""},on:{click:function(t){e.showTF=!1}}},[n("v-icon",[e._v("mdi-close")])],1),n("v-card-title",{staticClass:"headline"},[e._v("Transformation")]),n("v-card-text",[n("v-divider",{staticClass:"mb-3"}),n("h3",[e._v("Forward")]),n("span",[e._v("Transformation Matrix")]),n("v-container",e._l([0,1,2,3],(function(t){return n("v-row",{key:""+t,attrs:{"no-gutters":""}},e._l([0,1,2,3],(function(a){return n("v-col",{key:t+"_"+a,staticClass:"mx-auto px-0",attrs:{cols:"2"}},[e._v(e._s(Math.round(1e5*e.TF.elements[4*a+t])/1e5))])})),1)})),1),n("span",[e._v("Quaternion:")]),n("v-container",[n("v-row",{attrs:{"no-gutters":""}},e._l(["x","y","z","w"],(function(t){return n("v-col",{key:""+t,staticClass:"mx-auto px-0",attrs:{cols:"2"}},[e._v(e._s(Math.round(1e5*e.quaternion[t])/1e5))])})),1)],1),n("v-divider",{staticClass:"mb-3"}),n("h3",[e._v("Backwards")]),n("span",[e._v("Transformation Matrix")]),n("v-container",e._l([0,1,2,3],(function(t){return n("v-row",{key:""+t,attrs:{"no-gutters":""}},e._l([0,1,2,3],(function(a){return n("v-col",{key:t+"_"+a,staticClass:"mx-auto px-0",attrs:{cols:"2"}},[e._v(e._s(Math.round(1e5*e.inverseTF.elements[4*a+t])/1e5))])})),1)})),1),n("span",[e._v("Quaternion:")]),n("v-container",[n("v-row",{attrs:{"no-gutters":""}},e._l(["x","y","z","w"],(function(t){return n("v-col",{key:""+t,staticClass:"mx-auto px-0",attrs:{cols:"2"}},[e._v(e._s(Math.round(1e5*e.inverseQuaternion[t])/1e5))])})),1)],1)],1)],1)],1)],1)},r=[],s=(n("4de4"),n("13d5"),n("5a89")),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"THREEcontainer",attrs:{id:"THREEcontainer"}},[e._t("default")],2)},l=[],c=(n("caad"),n("d81d"),n("2532"),n("b85c")),d=n("2909"),u=n("4721"),m={name:"three-viewer",components:{},data:function(){return{renderer:null,scene:null,protoscene:null,camera:null,controls:null}},props:{cameraUp:{type:Array,validator:function(e){return 3==e.length&&!e.map((function(e){return isFinite(e)})).includes(!1)},default:function(){return[0,0,1]}},cameraPosition:{type:Array,validator:function(e){return 3==e.length&&!e.map((function(e){return isFinite(e)})).includes(!1)},default:function(){return[3,3,3]}}},provide:function(){var e=this;return{camera:function(){return e.camera},renderer:function(){return e.renderer},controls:function(){return e.controls},scene:function(){return e.scene},protoscene:function(){return e.protoscene}}},methods:{initTHREE:function(){var e,t,n=new s["d"](15790320);this.protoscene=new s["p"],this.protoscene.background=n,this.camera=new s["n"](75,window.innerWidth/window.innerHeight,.1,1e3),(e=this.camera.up).set.apply(e,Object(d["a"])(this.cameraUp)),(t=this.camera.position).set.apply(t,Object(d["a"])(this.cameraPosition)),this.camera.lookAt(0,0,0),this.renderer=new s["v"]({antialias:!0}),this.renderer.shadowMap.enabled=!0,this.scene=new s["p"],this.scene.add(new s["a"](15790320));var a=new s["r"](16777215,1.5);a.position.set(0,1500,200),a.angle=.2*Math.PI,a.castShadow=!0,a.shadow.camera.near=200,a.shadow.camera.far=2e3,a.shadow.bias=-222e-6,a.shadow.mapSize.width=1024,a.shadow.mapSize.height=1024,this.scene.add(a)},mountTHREE:function(){var e=document.getElementById("THREEcontainer");this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderer.domElement.classList.add("THREEcanvas"),e.appendChild(this.renderer.domElement);var t=new u["a"](this.camera,this.renderer.domElement);t.enableDamping=!0,t.rotateSpeed=.35,t.dampingFactor=.5,t.enableZoom=!0,this.controls=t,this.resizeRenderer(),window.addEventListener("resize",this.resizeRenderer)},animate:function(){requestAnimationFrame(this.animate);var e,t=Object(c["a"])(Array.isArray(this.$children)?this.$children:null!=this.$children?[this.$children]:[]);try{for(t.s();!(e=t.n()).done;){var n=e.value;n.parentAnimate&&n.parentAnimate()}}catch(a){t.e(a)}finally{t.f()}this.controls.update(),this.renderer.autoClear=!0,this.renderer.render(this.protoscene,this.camera),this.renderer.autoClear=!1,this.renderer.render(this.scene,this.camera)},resizeRenderer:function(){var e=this,t=document.getElementById("THREEcontainer");this.$nextTick((function(){e.renderer.setSize(t.clientWidth,window.innerHeight-t.getBoundingClientRect().top-1),e.camera.aspect=t.clientWidth/t.clientHeight,e.camera.updateProjectionMatrix()})),this.$nextTick(this.$nextTick((function(){var t,n=Object(c["a"])(Array.isArray(e.$children)?e.$children:null!=e.$children?[e.$children]:[]);try{for(n.s();!(t=n.n()).done;){var a=t.value;a.parentResizeRenderer&&a.parentResizeRenderer()}}catch(i){n.e(i)}finally{n.f()}})))}},created:function(){this.initTHREE()},mounted:function(){this.mountTHREE(),this.animate()},watch:{},beforeDestroy:function(){window.removeEventListener("resize",this.resizeRenderer)}},h=m,f=(n("475f"),n("2877")),v=Object(f["a"])(h,o,l,!1,null,null,null),p=v.exports,w=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},x=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"THREEframecontainerWrapper",attrs:{id:"THREEframecontainerWrapper"}},[n("div",{staticClass:"THREEframecontainer",attrs:{id:"THREEframecontainer"}},[n("div",{staticClass:"axeslabel",attrs:{id:"frameXcontainer"}},[e._v("X")]),n("div",{staticClass:"axeslabel",attrs:{id:"frameYcontainer"}},[e._v("Y")]),n("div",{staticClass:"axeslabel",attrs:{id:"frameZcontainer"}},[e._v("Z")])])])}],y=(n("4c53"),{name:"three-viewer-frame-display",components:{},inject:["camera","controls"],data:function(){return{framerenderer:null,framescene:null,framecamera:null,framecontainer:null}},methods:{init:function(){this.framerenderer=new s["v"]({antialias:!0,alpha:!0}),this.framecontainer=document.getElementById("THREEframecontainer"),this.framerenderer.setSize(this.framecontainer.clientWidth,this.framecontainer.clientHeight),this.framecontainer.appendChild(this.framerenderer.domElement),this.framescene=new s["p"],this.framerenderer.setClearColor(0,0),this.framescene.add(new s["a"](15790320)),this.framecamera=new s["n"](75,1,.1,1e3),this.framecamera.up=this.camera().up,this.framecamera.position.z=5,this.framescene.add(new s["b"](5))},syncAxesLabels:function(e){this.syncAxesLabel(new s["u"](e,0,0),"frameXcontainer"),this.syncAxesLabel(new s["u"](0,e,0),"frameYcontainer"),this.syncAxesLabel(new s["u"](0,0,e),"frameZcontainer");var t=[document.getElementById("frameXcontainer"),document.getElementById("frameYcontainer"),document.getElementById("frameZcontainer")];for(var n in t.sort((function(e,t){return e.style.opacity-t.style.opacity})),[0,1,2])t[n].style.zIndex=n},syncAxesLabel:function(e,t){var n=e.clone(),a=this.framerenderer.domElement,i=new s["u"](0,0,0),r=this.framecamera.position.distanceTo(i),o=this.framecamera.position.distanceTo(e.projectOnVector(this.framecamera.position));n.project(this.framecamera),n.x=Math.round((.5+.7*n.x)*(a.width/window.devicePixelRatio)),n.y=Math.round((.5-.7*n.y)*(a.height/window.devicePixelRatio));var l=document.getElementById(t);l.style.top="".concat(100*n.y/this.framecontainer.clientHeight,"%"),l.style.left="".concat(100*n.x/this.framecontainer.clientWidth,"%"),l.style.opacity=o>r?Math.min(.25+1/(o-r),1):1},syncCoordinateFrames:function(){this.framecamera.position.copy(this.camera().position),this.framecamera.position.sub(this.controls().target),this.framecamera.position.setLength(15),this.framecamera.lookAt(this.framescene.position)},animate:function(){requestAnimationFrame(this.animate),null!=this.controls()&&(this.syncCoordinateFrames(),this.framerenderer.render(this.framescene,this.framecamera),this.syncAxesLabels(5))}},mounted:function(){this.init(),this.animate()}}),b=y,g=(n("0266"),Object(f["a"])(b,w,x,!1,null,null,null)),_=g.exports,E=n("aea1"),T=n("94ed"),k=n("ec26"),F=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"THREEcss2Drenderer",attrs:{id:"THREEcss2Drenderer"}})},R=[],C={name:"three-viewer-css-2d-renderer",components:{},inject:["renderer","scene","camera"],data:function(){return{cssrenderer:null}},methods:{init:function(){this.cssrenderer=new E["b"],this.cssrenderer.setSize(window.innerWidth,window.innerHeight),this.cssrenderer.domElement.style.position="absolute",this.cssrenderer.domElement.style.top="0px",this.cssrenderer.domElement.style.pointerEvents="none";var e=document.getElementById("THREEcss2Drenderer");e.appendChild(this.cssrenderer.domElement)},parentResizeRenderer:function(){var e=this,t=new s["t"];this.renderer().getSize(t),this.$nextTick((function(){e.cssrenderer.setSize(t.width,t.height)}))},parentAnimate:function(){this.cssrenderer.render(this.scene(),this.camera())}},mounted:function(){this.init()}},z=C,M=(n("60fe"),Object(f["a"])(z,F,R,!1,null,null,null)),j=M.exports,H=n("310e"),O=n.n(H),P={id:null,value:0,axis:{axis:"null",newFrame:!1}},I={name:"App",components:{"three-viewer":p,"three-viewer-frame-display":_,"three-viewer-css-2d-renderer":j,draggable:O.a},data:function(){return{scene:null,flange:null,flangeLabel:null,tool:null,toolLabel:null,offset:null,translation:{x:0,y:0,z:0},translationInTool:!1,rotations:[],axisToggle:[{name:"X",model:{axis:"x",newFrame:!1}},{name:"Y",model:{axis:"y",newFrame:!1}},{name:"Z",model:{axis:"z",newFrame:!1}},{name:"X'",model:{axis:"x",newFrame:!0}},{name:"Y'",model:{axis:"y",newFrame:!0}},{name:"Z'",model:{axis:"z",newFrame:!0}}],showTF:!1,mdi:{mdiDeleteForever:T["a"]}}},methods:{addRotation:function(){var e=Object.assign(Object.assign({},P),{id:Object(k["a"])(),axis:{axis:"x",newFrame:!1}});this.rotations.push(e)},removeRotation:function(e){this.rotations=this.rotations.filter((function(t){return t.id!=e.id}))},updatePosition:function(){this.tool.position.setFromMatrixPosition(this.TF),this.tool.quaternion.setFromRotationMatrix(this.TF),this.toolLabel.position.setFromMatrixPosition(this.TF);var e=this.translationInTool?this.TF:new s["j"],t=new s["u"](this.translation.x,this.translation.y,this.translation.z),n=[];n.push(new s["u"](0,0,0).applyMatrix4(e)),n.push(new s["u"](0,0,t.z).applyMatrix4(e)),n.push(new s["u"](0,t.y,t.z).applyMatrix4(e)),n.push(t.applyMatrix4(e));var a=(new s["c"]).setFromPoints(n),i=new s["h"]({color:12303291,linewidth:.1,scale:1,dashSize:.005,gapSize:.0025});this.offset&&this.scene.remove(this.offset),this.offset=new s["g"](a,i),this.offset.computeLineDistances(),this.scene.add(this.offset)}},mounted:function(){this.scene=this.$refs.viewer.scene,this.flange=new s["b"](.05),this.tool=new s["b"](.05),this.scene.add(this.flange),this.scene.add(this.tool);var e=document.createElement("div");e.className="THREEcss2Dlabel",e.textContent="flange",e.style="transform: ",this.flangeLabel=new E["a"](e),this.flangeLabel.position=new s["u"](0,0,-.02).add(this.flange.position),this.scene.add(this.flangeLabel);var t=document.createElement("div");t.className="THREEcss2Dlabel",t.textContent="tool",this.toolLabel=new E["a"](t),this.toolLabel.position=new s["u"](-.01,-.01,-.01).add(this.tool.position),this.scene.add(this.toolLabel);var n=new s["e"](.1,.1,.025,64),a=new s["l"]({color:3368635,opacity:.6,transparent:!0}),i=new s["k"](n,a);i.rotation.x=.5*Math.PI,i.position.z=-.0125,this.scene.add(i)},computed:{TF:function(){var e=this.rotations.reduce((function(e,t){var n=new s["j"];switch(t.axis.axis){case"x":n.makeRotationX(t.value/180*Math.PI);break;case"y":n.makeRotationY(t.value/180*Math.PI);break;case"z":n.makeRotationZ(t.value/180*Math.PI);break}return t.axis.newFrame?e.multiply(n):n.multiply(e)}),new s["j"]),t=this.translation,n=new s["u"](t.x,t.y,t.z);return this.translationInTool&&n.multiplyScalar(-1).applyMatrix4(e),e.setPosition(n),e},inverseTF:function(){return(new s["j"]).getInverse(this.TF)},quaternion:function(){return(new s["o"]).setFromRotationMatrix(this.TF)},inverseQuaternion:function(){return(new s["o"]).setFromRotationMatrix(this.inverseTF)}},watch:{TF:function(){this.updatePosition()}}},$=I,A=(n("034f"),Object(f["a"])($,i,r,!1,null,null,null)),L=A.exports,S=n("ce5b"),B=n.n(S);n("bf40");a["default"].use(B.a);var D=new B.a({icons:{iconfont:"mdi"}});n("d5e8"),n("5363");a["default"].config.productionTip=!1,new a["default"]({vuetify:D,render:function(e){return e(L)}}).$mount("#app")},"60fe":function(e,t,n){"use strict";var a=n("3e94"),i=n.n(a);i.a},"85ec":function(e,t,n){}});
//# sourceMappingURL=app.cd68b56c.js.map