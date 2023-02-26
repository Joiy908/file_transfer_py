(function(){"use strict";var e={3222:function(e,t,r){var s=r(6369),n=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("DownloadTable",{attrs:{pleaseRefresh:e.pleaseRefresh},on:{changeDir:e.onChangeDir}}),t("UploadFile",{attrs:{uploadDir:e.currDirPath},on:{doRefresh:e.onDoRefresh}}),t("MsgBox")],1)},o=[],a=function(){var e=this,t=e._self._c;return t("div",[t("h1",[e._v("File to download")]),e._v(" Current dir: "+e._s(e.pathTreeObj.currentDirName)+" "),t("button",{on:{click:function(t){return e.backToParentDir()}}},[e._v("back to parent dir")]),t("br"),t("table",[e._m(0),e.pathTreeObj.subFolderList?e._l(e.pathTreeObj.subFolderList,(function(r){return t("tr",{key:r},[t("td",[e._v("Dir")]),t("td",[e._v(e._s(r))]),t("td",{on:{click:function(t){return e.openDir(r)}}},[t("button",[e._v("open")])])])})):e._e(),e._l(e.pathTreeObj.subFileList,(function(r){return t("tr",{key:r},[t("td",[e._v("File")]),t("td",[e._v(e._s(r))]),t("td",[t("a",{attrs:{href:e.getDownloadUrl(r)}},[t("button",[e._v("download")])])])])}))],2)])},l=[function(){var e=this,t=e._self._c;return t("tr",[t("th",[e._v("Type")]),t("th",[e._v("Name")]),t("th",[e._v("Operation")])])}],u=r(6265),i=r.n(u),d={name:"DownloadTable",data(){return{pathTreeObj:{currentDirName:"./Test",subFileList:["demo.png"],subFolderList:["testDir"]},ROOT_PATH:"./files"}},props:["pleaseRefresh"],watch:{"pathTreeObj.currentDirName":{handler(e){this.$emit("changeDir",e)}},pleaseRefresh:{handler(){this.refresh()}}},methods:{getPathTreeObj(e){let t={dirPath:e};i().post("path",t).then((e=>{console.log("request successfully",e.data),this.pathTreeObj=e.data}),(e=>{console.log("err",e.message)}))},backToParentDir(){if(this.pathTreeObj.currentDirName===this.ROOT_PATH)return;const e=this.pathTreeObj.currentDirName.split("/");e.pop();let t=e.join("/");this.getPathTreeObj(t)},openDir(e){let t=this.pathTreeObj.currentDirName+"/"+e;this.getPathTreeObj(t)},getDownloadUrl(e){let t=this.pathTreeObj.currentDirName+"/"+e;return"download?filePath="+t},refresh(){this.getPathTreeObj(this.pathTreeObj.currentDirName)}},mounted(){this.getPathTreeObj(this.ROOT_PATH)}},p=d,h=r(3736),c=(0,h.Z)(p,a,l,!1,null,null,null),f=c.exports,g=function(){var e=this,t=e._self._c;return t("div",[t("h1",[e._v("Upload File")]),t("form",{ref:"myForm"},[t("input",{ref:"file",attrs:{type:"file"}}),t("br")]),t("button",{attrs:{type:"button"},on:{click:function(t){return e.upload()}}},[e._v("Upload")]),t("br"),e.uploadStatus.isUploading?t("div",[t("el-progress",{attrs:{percentage:e.uploadStatus.uploadProgress,status:e.uploadStatus.barStatus}}),e._v(" Progress:"+e._s(e.uploadStatus.uploadProgress)+"%"),t("br"),e._v(" Result: "+e._s(e.uploadStatus.result)+" ")],1):e._e()])},b=[],v={name:"UploadFile",props:["uploadDir"],data(){return{uploadStatus:{isUploading:!1,uploadProgress:0,result:"",barStatus:""}}},computed:{uploadUrl(){return"upload?dirPath="+this.uploadDir}},methods:{upload(){if(this.uploadStatus.isUploading)return void alert("some file is uploading, please try again later.");let e=this.$refs.file.files[0];if(void 0===e)return void alert("please select file to upload.");const t=new FormData;t.append("file",e);const r={onUploadProgress:e=>{let t=e.lengthComputable?e.total:e.target.getResponseHeader("content-length")||e.target.getResponseHeader("x-decompressed-content-length");null!==t&&this.updateProgress(Math.round(100*e.loaded/t))}};this.uploadStatus.isUploading=!0,i().post(this.uploadUrl,t,r).then((e=>{this.uploadStatus.result=e.data,console.log(e),this.$emit("doRefresh"),this.updateProgress.barStatus="success"}),(e=>{this.uploadStatus.result=e.data,console.log(e),this.updateProgress.barStatus="warning"}))},updateProgress(e){if(100==e)return this.uploadStatus.isUploading=!1,alert("uploaded √!"),void this.$refs.myForm.reset();this.uploadStatus.isUploading=!0,this.uploadStatus.uploadProgress=e}}},m=v,_=(0,h.Z)(m,g,b,!1,null,"114d944b",null),O=_.exports,T=function(){var e=this,t=e._self._c;return t("div",[t("h1",[e._v("Message Box")]),t("span",[e._v("message:")]),t("button",{on:{click:function(t){return e.getMsgs()}}},[e._v("refresh")]),t("ul",e._l(e.messages,(function(r){return t("li",{key:r},[e._v(e._s(r))])})),0),t("label",[e._v("new message:")]),t("br"),t("textarea",{ref:"msgInput",attrs:{id:"msgInput",rows:"4",cols:"50"}}),t("br"),t("button",{on:{click:e.putMsg}},[e._v("submit")])])},D=[],P={name:"MsgBox",data(){return{messages:[],textarea:""}},methods:{getMsgs(){i().get("messages").then((e=>{console.log("request successfully",e.data),this.messages=e.data.messages,console.log("@@@",this.messages)}),(e=>{console.log("err",e.message)}))},putMsg(){let e=this.$refs.msgInput.value;const t={msg:e};i().post("messages",t).then((e=>{console.log("request successfully",e.data),this.getMsgs()}),(e=>{console.log("err",e.message)}))}},mounted(){this.getMsgs()}},j=P,y=(0,h.Z)(j,T,D,!1,null,null,null),w=y.exports,S={name:"App",components:{DownloadTable:f,UploadFile:O,MsgBox:w},data(){return{currDirPath:"",pleaseRefresh:""}},methods:{onChangeDir(e){this.currDirPath=e},onDoRefresh(){this.pleaseRefresh=new Date}}},k=S,R=(0,h.Z)(k,n,o,!1,null,null,null),U=R.exports,x=r(8499),F=r.n(x);s["default"].config.productionTip=!1,s["default"].use(F()),new s["default"]({render:e=>e(U)}).$mount("#app")}},t={};function r(s){var n=t[s];if(void 0!==n)return n.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,r),o.exports}r.m=e,function(){var e=[];r.O=function(t,s,n,o){if(!s){var a=1/0;for(d=0;d<e.length;d++){s=e[d][0],n=e[d][1],o=e[d][2];for(var l=!0,u=0;u<s.length;u++)(!1&o||a>=o)&&Object.keys(r.O).every((function(e){return r.O[e](s[u])}))?s.splice(u--,1):(l=!1,o<a&&(a=o));if(l){e.splice(d--,1);var i=n();void 0!==i&&(t=i)}}return t}o=o||0;for(var d=e.length;d>0&&e[d-1][2]>o;d--)e[d]=e[d-1];e[d]=[s,n,o]}}(),function(){r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,{a:t}),t}}(),function(){r.d=function(e,t){for(var s in t)r.o(t,s)&&!r.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};r.O.j=function(t){return 0===e[t]};var t=function(t,s){var n,o,a=s[0],l=s[1],u=s[2],i=0;if(a.some((function(t){return 0!==e[t]}))){for(n in l)r.o(l,n)&&(r.m[n]=l[n]);if(u)var d=u(r)}for(t&&t(s);i<a.length;i++)o=a[i],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(d)},s=self["webpackChunkfile_transfer_view"]=self["webpackChunkfile_transfer_view"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=r.O(void 0,[998],(function(){return r(3222)}));s=r.O(s)})();
//# sourceMappingURL=app.8a85e6e1.js.map