(function(e){function t(t){for(var o,i,s=t[0],l=t[1],c=t[2],d=0,p=[];d<s.length;d++)i=s[d],n[i]&&p.push(n[i][0]),n[i]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);u&&u(t);while(p.length)p.shift()();return a.push.apply(a,c||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],o=!0,s=1;s<r.length;s++){var l=r[s];0!==n[l]&&(o=!1)}o&&(a.splice(t--,1),e=i(i.s=r[0]))}return e}var o={},n={app:0},a=[];function i(t){if(o[t])return o[t].exports;var r=o[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=o,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(r,o,function(t){return e[t]}.bind(null,o));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=l;a.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";var o=r("c21b"),n=r.n(o);n.a},"0960":function(e,t,r){"use strict";var o=r("a2bd"),n=r.n(o);n.a},"0c7a":function(e,t,r){"use strict";var o=r("fa96"),n=r.n(o);n.a},2:function(e,t){},"56d7":function(e,t,r){"use strict";r.r(t);r("cadf"),r("551c"),r("097d");var o=r("a026"),n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("router-view")],1)},a=[],i={name:"app"},s=i,l=(r("034f"),r("2877")),c=Object(l["a"])(s,n,a,!1,null,null,null);c.options.__file="App.vue";var u=c.exports,d=r("8c4f"),p=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h1",[e._v("Officient | Overzicht medewerkers")]),r("div",{staticClass:"col-sm-12"},[r("div",{staticClass:"search"},[r("i",{staticClass:"fa fa-search"}),r("input",{directives:[{name:"model",rawName:"v-model",value:e.search,expression:"search"}],attrs:{placeholder:"Zoek medewerker"},domProps:{value:e.search},on:{input:function(t){t.target.composing||(e.search=t.target.value)}}})])]),e._l(e.filteredList,function(t){return e.employees&&!e.error?r("div",{key:t.id,staticClass:"col-xs-12 col-sm-4 col-md-3",staticStyle:{"margin-top":"2%"},on:{click:function(r){e.openDetail(t.id)}}},[r("div",{staticClass:"employee-cell"},[r("p",{staticStyle:{"margin-top":"10px"}},[e._v("\n        Naam: "+e._s(t.name)+"\n      ")]),r("p",[e._v("\n        E-mail: "+e._s(t.email)+"\n      ")]),r("p",[e._v("\n        Functie: "+e._s(t.role_name)+"\n      ")])])]):e._e()}),e.error?r("p",{staticClass:"error"},[e._v("Er ging iets fout, probeer later opnieuw.")]):e._e()],2)},m=[],f=(r("386d"),r("7f7f"),r("6762"),r("2fdb"),r("a3c3"));o["a"].use(f["a"]);var v="https://officient-test.herokuapp.com/api/",_={getEmployees:function(e,t){o["a"].http.get(v+"employees").then(function(t){e(t.body)},function(e){t(e)})},getEmployeeById:function(e,t,r){o["a"].http.get(v+"employee?id="+e).then(function(e){t(e.body)},function(e){r(e)})},getDirections:function(e,t,r,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,i="?id="+e+"&address="+t;a&&(i+="&toWork=true"),o["a"].http.get(v+"directions"+i).then(function(e){r(e.body)},function(e){n(e)})}},g={name:"employeelist",data:function(){return{employees:[],error:null,search:""}},methods:{openDetail:function(e){P.push({name:"EmployeeDetail",params:{employeeId:e}})}},computed:{filteredList:function(){var e=this;return this.employees.filter(function(t){return t.name.toLowerCase().includes(e.search.toLowerCase())||t.email.toLowerCase().includes(e.search.toLowerCase())||t.role_name.toLowerCase().includes(e.search.toLowerCase())})}},mounted:function(){var e=this;_.getEmployees(function(t){e.employees=t.data},function(t){e.error=t})}},h=g,y=(r("0960"),Object(l["a"])(h,p,m,!1,null,"afdcc1de",null));y.options.__file="EmployeeList.vue";var k=y.exports,b=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[e.employee&&!e.error?r("div",{staticClass:"col-sm-12",staticStyle:{"margin-bottom":"5%"}},[e._m(0),e.employee?r("div",[r("div",{staticClass:"col-sm-6"},[r("div",{staticClass:"personal-details"},[r("div",{staticClass:"row",staticStyle:{"margin-bottom":"3%"}},[r("img",{staticClass:"avatar",attrs:{src:e.employee.avatar}})]),r("p",{staticStyle:{"font-size":"130%"}},[e._v(e._s(e.employee.name))]),r("p",[r("a",{attrs:{href:"mailto:"+e.employee.email}},[e._v(e._s(e.employee.email))])]),e.employee.current_role?r("p",[e._v("Als "+e._s(e.employee.current_role.name)+" gestart op "+e._s(e.employee.current_role.start_date))]):e._e(),r("p",[e._v(e._s(e.addressFull))])])]),r("div",{staticClass:"col-sm-6 map-wrapper"},[r("google-map",{attrs:{coordinates:e.employee.address.coordinates}})],1)]):e._e(),r("div",{staticClass:"col-sm-12",staticStyle:{"margin-top":"5%"}},[r("div",[r("h1",{staticStyle:{"margin-bottom":"10px"}},[e._v("Woon-werkverkeer")]),e.durationWeek?r("p",[e._v("\n            Totale tijd onderweg per week: "),r("b",[e._v(e._s(e.getTimeFromMins(e.durationWeek)))])]):e._e()]),e.directionsToWork&&e.directionsToWork.length>0?r("div",{staticClass:"col-sm-12"},[r("directions",{attrs:{directionsToWork:e.directionsToWork,directionsFromWork:e.directionsFromWork}})],1):e._e()])]):e._e(),e.error?r("p",{staticClass:"error"},[e._v("Er ging iets fout, probeer later opnieuw.")]):e._e()])},w=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h1",[e._v("Persoonlijke gegevens")])])}],W=(r("28a5"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"map-wrapper"},[r("div",{staticClass:"google-map",attrs:{id:e.mapName}})])}),C=[],E=(r("c5f6"),{name:"google-map",props:["coordinates"],data:function(){return{mapName:"map"}},mounted:function(){var e=document.getElementById(this.mapName),t={zoom:15,center:new google.maps.LatLng(Number(this.coordinates.split(",")[0]),Number(this.coordinates.split(",")[1]))},r=new google.maps.Map(e,t),o=new google.maps.LatLng(Number(this.coordinates.split(",")[0]),Number(this.coordinates.split(",")[1]));new google.maps.Marker({position:o,map:r})}}),T=E,x=(r("d9df"),Object(l["a"])(T,W,C,!1,null,"32fbaf61",null));x.options.__file="Map.vue";var j=x.exports,S=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",e._l(e.week,function(t,o){return r("div",{key:t},[r("div",{staticStyle:{cursor:"pointer","text-align":"left"},on:{click:function(t){e.changeDay(o)}}},[r("span",{staticClass:"day-title"},[e._v(e._s(t))]),r("i",{staticClass:"fas fa-chevron-right",class:{rotate:e.isActive[o],"rotate-back":!e.isActive[o]},staticStyle:{"margin-left":"2%"}})]),r("div",{staticStyle:{"text-align":"left"}},[e.isActive[o]&&e.directionsToWork&&e.directionsFromWork?r("div",[e._m(0,!0),r("ol",[r("li",[e._v("Vertrek van "+e._s(e.directionsToWork[o].start_address))]),e._l(e.directionsToWork[o].steps,function(t,o){return r("li",{key:o},[e._v("\n          "+e._s(t.html_instructions)+"\n        ")])}),r("li",[e._v("Aankomst op "+e._s(e.directionsToWork[o].end_address))])],2),r("span",[e._v("Tijd onderweg: "),r("b",[e._v(e._s(e.directionsToWork[o].duration.text))])]),e._m(1,!0),r("ol",[r("li",[e._v("Vertrek van "+e._s(e.directionsFromWork[o].start_address))]),e._l(e.directionsFromWork[o].steps,function(t,o){return r("li",{key:o},[e._v("\n          "+e._s(t.html_instructions)+"\n        ")])}),r("li",[e._v("Aankomst op "+e._s(e.directionsFromWork[o].end_address))])],2),r("span",[e._v("Tijd onderweg: "),r("b",[e._v(e._s(e.directionsFromWork[o].duration.text))])])]):e._e()])])}))},F=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("h4",{staticStyle:{"text-align":"left"}},[e._v("Thuis "),r("i",{staticClass:"fas fa-arrow-right",staticStyle:{"font-size":"80%"}}),e._v(" Werk")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("h4",{staticStyle:{"text-align":"left"}},[e._v("Werk "),r("i",{staticClass:"fas fa-arrow-right",staticStyle:{"font-size":"80%"}}),e._v(" Thuis")])}],D={name:"directions",props:["directionsToWork","directionsFromWork"],data:function(){return{week:["Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag"],isActive:[!0,!1,!1,!1,!1]}},methods:{changeDay:function(e){this.$set(this.isActive,e,!this.isActive[e])}}},O=D,L=(r("0c7a"),Object(l["a"])(O,S,F,!1,null,"bcef09d4",null));L.options.__file="Directions.vue";var M=L.exports,A={name:"EmployeeDetail",components:{"google-map":j,directions:M},data:function(){return{employee:null,error:null,directionsToWork:null,directionsFromWork:null,addressFull:"",durationWeek:0,week:["Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag"]}},methods:{getTimeFromMins:function(e){return e>=60?Math.floor(e/60)+"u"+e%60+"min":e+"min"}},mounted:function(){var e=this;_.getEmployeeById(this.$route.params.employeeId,function(t){e.employee=t.data,e.addressFull=t.data.address.line_1+","+t.data.address.line_2+" "+t.data.address.zipcode+" "+t.data.address.city,e.employee.avatar="https://www.gravatar.com"===e.employee.avatar.split("/avatar")[0]?"https://collaborativecbt.com/wp-content/uploads/2016/12/default-avatar.png":e.employee.avatar,_.getDirections(e.$route.params.employeeId,e.addressFull,function(t){e.directionsToWork=t,e.durationWeek+=Math.ceil(t.reduce(function(e,t){return e+t.duration.value},0)/60)},function(t){e.error=t},!0),_.getDirections(e.$route.params.employeeId,e.addressFull,function(t){e.directionsFromWork=t,e.durationWeek+=Math.ceil(t.reduce(function(e,t){return e+t.duration.value},0)/60)},function(t){e.error=t})},function(t){e.error=t})}},$=A,N=(r("c964"),Object(l["a"])($,b,w,!1,null,"6b1ccb06",null));N.options.__file="EmployeeDetail.vue";var I=N.exports;o["a"].use(d["a"]);var P=new d["a"]({mode:"history",routes:[{path:"/",name:"EmployeeList",component:k},{path:"/employee-detail/:employeeId",name:"EmployeeDetail",component:I}]});o["a"].config.productionTip=!1,o["a"].use(r("2ead")),new o["a"]({el:"#app",router:P,template:"<App/>",components:{App:u}})},a2bd:function(e,t,r){},c21b:function(e,t,r){},c964:function(e,t,r){"use strict";var o=r("e477"),n=r.n(o);n.a},d378:function(e,t,r){},d9df:function(e,t,r){"use strict";var o=r("d378"),n=r.n(o);n.a},e477:function(e,t,r){},fa96:function(e,t,r){}});
//# sourceMappingURL=app.7d7de961.js.map