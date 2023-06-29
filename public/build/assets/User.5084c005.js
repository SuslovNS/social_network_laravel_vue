import{_ as p,o as n,c as r,e as a,t as h,F as _,a as f,f as u,b as m,i as v,v as I,n as l,h as x,p as y,j as w}from"./app.a3a777a0.js";const k={name:"User.vue",data(){return{user:{},userGet:{},messages:[],image:null,messageInput:"",userId:this.$route.params.userId,userSentId:"",channelId:""}},methods:{sendMessage(){const s=this.image?this.image.id:null;axios.post(`/api/chat/${this.userId}/send`,{message:this.messageInput,sendUserId:this.user.id,image_id:s}).then(e=>{this.messageInput="",this.image=null,this.messages.push(e.data.data)})},selectFile(){this.fileInput=this.$refs.file,this.fileInput.click()},storeImage(s){let e=s.target.files[0];const d=new FormData;d.append("image",e),axios.post("/api/images_message",d,{headers:{"Content-Type":"multipart/form-data"}}).then(c=>{this.image=c.data.data})},getMessages(){axios.get(`/api/chat/${this.userId}`).then(s=>{this.messages=s.data.data,this.user=this.$route.meta.user})},getUserGet(){axios.get(`/api/users/get/${this.userId}`).then(s=>{this.userGet=s.data.data})},getChannelId(s,e){return s<e?`${s}-${e}`:`${e}-${s}`},async openChannel(){let e=(await axios.get("/api/user")).data.id;this.userSentId=e.toString(),this.channelId=this.getChannelId(this.userId,this.userSentId)},open(){if(!this.channelId)return setTimeout(this.open,100);window.Echo.channel(`chat.${this.channelId}`).listen(".store_message",s=>{this.messages.push(s.message)})}},mounted(){this.getUserGet(),this.getMessages(),this.openChannel(),this.open()}},g=s=>(y("data-v-33fe3597"),s=s(),w(),s),C={class:"chat"},S={class:"empty-chat"},M={class:"chat-body"},b={key:0},U={class:"chat-messages"},G={class:"chat-message"},D=["src"],F={key:1,class:"empty-chat"},B={class:"chat-footer"},N={key:0},T=["src"],V=g(()=>a("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"},null,-1)),j=[V],z=g(()=>a("button",{type:"submit"},"\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C",-1));function E(s,e,d,c,i,o){return n(),r("div",C,[a("div",S,[a("h3",null,"Chat with "+h(i.userGet.name),1)]),a("div",M,[i.messages.length>0?(n(),r("div",b,[a("div",U,[(n(!0),r(_,null,f(i.messages,t=>(n(),r("div",G,[a("div",{class:l(["chat-message-user",t.sent_id===i.user.id?"text-right":"text-left"])},h(t.sent_id===i.user.id?i.user.name:i.userGet.name),3),a("div",{class:l(["chat-message-text",t.sent_id===i.user.id?"text-right":"text-left"])},[x(h(t.body)+" ",1),t.image_url?(n(),r("div",{key:0,class:l([t.sent_id===i.user.id?"chat-message-image-left":"chat-message-image-right"])},[a("img",{class:"my-3 mx-auto",src:t.image_url,alt:"miss"},null,8,D)],2)):m("",!0)],2),a("div",{class:l(["chat-message-timestamp",t.sent_id===i.user.id?"text-right":"text-left"])},h(t.time),3)]))),256))])])):(n(),r("div",F," No messages "))]),a("div",B,[i.image?(n(),r("div",N,[a("a",{href:"#",onClick:e[0]||(e[0]=u(t=>i.image=null,["prevent"])),class:"ml-3"},"Delete photo")])):m("",!0),i.image?(n(),r("img",{key:1,type:"image",src:i.image.url,alt:"preview"},null,8,T)):m("",!0),a("form",{onSubmit:e[4]||(e[4]=u((...t)=>o.sendMessage&&o.sendMessage(...t),["prevent"]))},[v(a("input",{type:"text","onUpdate:modelValue":e[1]||(e[1]=t=>i.messageInput=t),placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435"},null,512),[[I,i.messageInput]]),a("input",{onChange:e[2]||(e[2]=(...t)=>o.storeImage&&o.storeImage(...t)),ref:"file",type:"file",class:"hidden"},null,544),(n(),r("svg",{onClick:e[3]||(e[3]=u(t=>o.selectFile(),["prevent"])),type:"add",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:l(["ml-2 mt-1 stroke-black-500 cursor-pointer hover:fill-red-500 w-6 h-6","fill-white"])},j)),z],32)])])}const L=p(k,[["render",E],["__scopeId","data-v-33fe3597"]]);export{L as default};
