(function(){"use strict";var e={7529:function(e,t,n){var r=n(6369),s=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("DownloadTable"),t("UploadFile"),t("MsgBox")],1)},o=[],a=function(){var e=this,t=e._self._c;return t("div",[t("h1",[e._v("File to download")]),e._v(" Current dir: "+e._s(e.pathTreeObj.currentDirName)+" "),t("button",{on:{click:function(t){return e.backToParentDir()}}},[e._v("back to parent dir")]),t("br"),t("table",[e._m(0),e.pathTreeObj.subFolderList?e._l(e.pathTreeObj.subFolderList,(function(n){return t("tr",{key:n},[t("td",[e._v("Dir")]),t("td",[e._v(e._s(n))]),t("td",{on:{click:function(t){return e.openDir(n)}}},[t("button",[e._v("open")])])])})):e._e(),e._l(e.pathTreeObj.subFileList,(function(n){return t("tr",{key:n},[t("td",[e._v("File")]),t("td",[e._v(e._s(n))]),t("td",[t("a",{attrs:{href:e.getDownloadUrl(n)}},[t("button",[e._v("download")])])]),t("button",{on:{click:function(t){return e.deleteFile(n)}}},[e._v("delete")])])}))],2)])},l=[function(){var e=this,t=e._self._c;return t("tr",[t("th",[e._v("Type")]),t("th",[e._v("Name")]),t("th",[e._v("Operation")])])}],i=n(3822),u={name:"DownloadTable",computed:{...(0,i.rn)(["pathTreeObj","ROOT_PATH"])},methods:{...(0,i.nv)(["updatePathTreeObj","refresh","deleteFile"]),backToParentDir(){if(this.pathTreeObj.currentDirName===this.ROOT_PATH)return;const e=this.pathTreeObj.currentDirName.split("/");e.pop();let t=e.join("/");this.updatePathTreeObj(t)},openDir(e){let t=this.pathTreeObj.currentDirName+"/"+e;this.updatePathTreeObj(t)},getDownloadUrl(e){let t=this.pathTreeObj.currentDirName+"/"+e;return"download?filePath="+t}},mounted(){this.updatePathTreeObj(this.ROOT_PATH)}},c=u,p=n(3736),d=(0,p.Z)(c,a,l,!1,null,null,null),h=d.exports,f=function(){var e=this,t=e._self._c;return t("div",[t("h1",[e._v("Upload File")]),t("form",{ref:"myForm"},[t("input",{ref:"file",attrs:{type:"file",multiple:"multiple"},on:{change:e.onChange}}),t("button",{staticStyle:{display:"inline-block"},attrs:{type:"button"},on:{click:function(t){return e.uploadAll()}}},[e._v("Upload")])]),e._l(e.uploadList,(function(n){return t("div",{key:n.uid},[e._v(" file name: "+e._s(n.name)+", status: "+e._s(n.status)+", progress: "+e._s(n.percentage)+", res: "+e._s(n.res)+" "),t("button",{on:{click:function(t){return e.remove(n)}}},[e._v("delete")])])}))],2)},g=[],m={name:"UploadFile",data(){return{uploadList:[],tempIndex:1}},computed:{uploadDir(){return this.$store.state.pathTreeObj.currentDirName},uploadUrl(){return"upload?dirPath="+this.uploadDir}},methods:{onChange(){let e=this.$refs.file.files;for(let t=0;t<e.length;t++)this.init_and_push(e[t]);this.$refs.myForm.reset()},init_and_push(e){e.uid=Date.now()+this.tempIndex++;let t={status:"ready",name:e.name,size:e.size,percentage:0,uid:e.uid,raw:e};this.uploadList.push(t)},uploadAll(){let e=this.uploadList;for(let t=0;t<e.length;t++)"ready"==e[t].status&&this.post(e[t])},post(e){this.$store.dispatch("uploadFile",{uploadUrl:this.uploadUrl,file:e})},remove(e){"uploading"===e.status&&e.signal.cancel("Request canceled by user.");let t=this.uploadList;t.splice(t.indexOf(e),1)}}},b=m,_=(0,p.Z)(b,f,g,!1,null,"0b62e202",null),v=_.exports,T=function(){var e=this,t=e._self._c;return t("div",[t("h1",[e._v("Message Box")]),t("span",[e._v("messages:")]),t("ul",{attrs:{id:"messages"}},e._l(e.msgs,(function(n){return t("li",{key:n},[t("div",{domProps:{innerHTML:e._s(n)}})])})),0),t("label",[e._v("new message: ")]),t("br"),t("textarea",{ref:"msgInput",attrs:{id:"msgInput",rows:"4",cols:"50"}}),t("br"),t("button",{on:{click:e.putMsg}},[e._v("submit")])])},O=[],y={name:"MsgBox",computed:{...(0,i.rn)(["msgs"])},data(){return{textarea:""}},methods:{...(0,i.nv)(["getMsgs"]),async putMsg(){await this.$store.dispatch("putMsg",this.$refs.msgInput.value)&&(this.$refs.msgInput.value="",this.$refs.msgInput.focus(),window.scrollTo(0,document.body.scrollHeight))}},mounted(){this.getMsgs()}},w=y,P=(0,p.Z)(w,T,O,!1,null,null,null),j=P.exports,k={name:"App",components:{DownloadTable:h,UploadFile:v,MsgBox:j}},D=k,F=(0,p.Z)(D,s,o,!1,null,null,null),M=F.exports,x=n(6265),S=n.n(x);r.ZP.use(i.ZP);const U={SET_PATHOBJ(e,t){e.pathTreeObj=t},SET_MSGS(e,t){e.msgs=t}},L={pathTreeObj:{currentDirName:"./Test",subFileList:["demo.png"],subFolderList:["testDir"]},ROOT_PATH:"./files",msgs:["test message"]},H={updatePathTreeObj(e,t){S().get("path",{params:{dirPath:t}}).then((t=>{console.log("get path ok!:",t.data),e.commit("SET_PATHOBJ",t.data)}),(e=>{console.log("get path err:@@@",e.response.data)}))},refresh(e){e.dispatch("updatePathTreeObj",e.state.pathTreeObj.currentDirName)},deleteFile(e,t){let n=e.state.pathTreeObj.currentDirName+"/"+t;S().post("delete",null,{params:{filePath:n}}).then((t=>{console.log("delete file ok! ",t.data),e.dispatch("refresh")}),(e=>{console.log("delete file err:@@@",e.response.data),console.log(e.response),403===e.response.status&&alert("Permission denied.")}))},uploadFile(e,{uploadUrl:t,file:n}){if(n.signal=S().CancelToken.source(),!n)return;const r=new FormData;r.append("file",n.raw);const s={cancelToken:n.signal.token,onUploadProgress:e=>{let t=e.lengthComputable?e.total:e.target.getResponseHeader("content-length")||e.target.getResponseHeader("x-decompressed-content-length");null!==t&&(n.percentage=Math.round(100*e.loaded/t),n.status="uploading")}};S().post(t,r,s).then((e=>{console.log("upload file ok! ",e.data),n.status="success"}),(e=>{S().isCancel(e)?console.log("upload "+n.name+" canceled."):(console.log("upload file err! @@@",e.response.data),n.status="fail",n.res=e)}))},async getMsgs(e){try{const t=await S().get("/messages");console.log("get massages ok!",t.data);let n=t.data.messages;null!==n&&(n=n.map((e=>e.replace(/\n/g,"<br>"))),e.commit("SET_MSGS",n))}catch(t){console.log("get massages err",t.message)}},async putMsg(e,t){const n={msg:t};try{let e=await S().post("/messages",n);return console.log("post message ok! @@@",e.data),!0}catch(r){return console.log("post message err @@@",r.response.data),!1}}};var N=new i.ZP.Store({actions:H,mutations:U,state:L}),Z=n(7851);const $=(0,Z.io)();$.on("refresh_path",(()=>{N.dispatch("refresh")})),$.on("refresh_msgs",(()=>{N.dispatch("getMsgs")}));var A=$;r.ZP.config.productionTip=!1,r.ZP.prototype.$socket=A,new r.ZP({render:e=>e(M),store:N}).$mount("#app")}},t={};function n(r){var s=t[r];if(void 0!==s)return s.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.m=e,function(){var e=[];n.O=function(t,r,s,o){if(!r){var a=1/0;for(c=0;c<e.length;c++){r=e[c][0],s=e[c][1],o=e[c][2];for(var l=!0,i=0;i<r.length;i++)(!1&o||a>=o)&&Object.keys(n.O).every((function(e){return n.O[e](r[i])}))?r.splice(i--,1):(l=!1,o<a&&(a=o));if(l){e.splice(c--,1);var u=s();void 0!==u&&(t=u)}}return t}o=o||0;for(var c=e.length;c>0&&e[c-1][2]>o;c--)e[c]=e[c-1];e[c]=[r,s,o]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var s,o,a=r[0],l=r[1],i=r[2],u=0;if(a.some((function(t){return 0!==e[t]}))){for(s in l)n.o(l,s)&&(n.m[s]=l[s]);if(i)var c=i(n)}for(t&&t(r);u<a.length;u++)o=a[u],n.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return n.O(c)},r=self["webpackChunkfile_transfer_view"]=self["webpackChunkfile_transfer_view"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(7529)}));r=n.O(r)})();
//# sourceMappingURL=app.98dba9b3.js.map