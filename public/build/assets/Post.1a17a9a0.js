import{_ as g,r as f,o as n,c as l,e,t as i,f as m,b as c,h,d as w,w as b,n as a,i as _,v as p,F as x,a as k}from"./app.4e399b50.js";const y={name:"Post",props:["post"],data(){return{title:"",content:"",body:"",isRepost:!1,repostedId:null,errors:[],comments:[],isShowed:!1,comment:null,isDelete:!1,err:"",succsesRepost:""}},methods:{toggleLike(d){axios.post(`/api/posts/${d.id}/toggle_like`).then(t=>{d.is_liked=t.data.is_liked,d.likes_count=t.data.likes_count}).catch(t=>{this.err="\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u043A \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0443."})},setParentId(d){this.comment=d},storeComment(d){const t=this.comment?this.comment.id:null;axios.post(`/api/posts/${d.id}/comment`,{body:this.body,parent_id:t}).then(s=>{this.body="",this.comments.unshift(s.data.data),this.comment=null,d.comments_count++,this.isShowed=!0}).catch(s=>{this.err="\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u043A \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0443."})},getComments(d){axios.get(`/api/posts/${d.id}/comment`).then(t=>{this.comments=t.data.data,this.isShowed=!0}).catch(t=>{this.err="\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u043A \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0443."})},openRepost(){this.$route.name!=="user.personal"&&(this.isRepost=!this.isRepost)},repost(d){this.$route.name!=="user.personal"&&axios.post(`/api/posts/${d.id}/repost`,{title:this.title,content:this.content}).then(t=>{this.title="",this.content="",d.reposted_by_posts_count++,this.succsesRepost="\u0420\u0435\u043F\u043E\u0441\u0442 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u0434\u0435\u043B\u0430\u043D"}).catch(t=>{this.errors=t.response.data.errors})},deletePost(d){axios.delete(`/api/posts/${d.id}/delete`).then(t=>{this.isDelete=!0}).catch(t=>{this.err="\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430. \u041E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u043A \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0443."})}}},C={key:0},R={class:"mb-8 pb-8 border-b border-gray-400"},V={class:"flex justify-between items-center"},B={class:"text-xl"},M=e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M6 18L18 6M6 6l12 12"},null,-1),P=[M],S=["src","alt"],j={key:1,class:"bg-gray-100 p-4 my-4 border border-gray-200"},z={class:"text"},D={class:"text-xl"},L=["src","alt"],I={class:"text-right"},N={class:"flex justify-between items-center mt-2"},A={class:"text-slate-500 text-sm"},U={class:"flex"},F={class:"flex mr-2"},T=e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"},null,-1),E=[T],H={class:"flex mr-2"},q=e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"},null,-1),G=[q],J={class:"flex"},K=e("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"},null,-1),O=[K],Q={key:2},W={class:"text-sm mt-2 text-red-500"},X={key:3,class:"mt-4"},Y={key:0},Z={class:"text-sm mt-2 text-red-500"},$={key:1},ee={class:"text-sm mt-2 text-red-500"},te={key:2},se={class:"text-sm mt-2 text-green-500"},oe={key:4,class:"mt-4"},re={key:1},ne={class:"mt-4 pt-4 border-t border-gray-300"},le={class:"flex mb-2"},ie={class:"text-sm mr-2"},de=["onClick"],ce={key:0,class:"text-sky-400"},ue={class:"text-right text-sm"},me={class:"mt-4"},he={class:"mb-3"},ae={class:"flex items-center"},_e={key:0,class:"mr-2"};function pe(d,t,s,xe,o,u){const v=f("router-link");return o.isDelete?c("",!0):(n(),l("div",C,[e("div",R,[e("div",V,[e("h1",B,i(s.post.title),1),this.$route.name==="user.personal"?(n(),l("svg",{key:0,onClick:t[0]||(t[0]=m(r=>u.deletePost(s.post),["prevent"])),xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"stroke-black-500 cursor-pointer w-6 h-6"},P)):c("",!0)]),s.post.image_url?(n(),l("img",{key:0,class:"my-3 mx-auto",src:s.post.image_url,alt:s.post.title},null,8,S)):c("",!0),e("p",null,i(s.post.content),1),s.post.reposted_post?(n(),l("div",j,[e("h2",z,[h("Reposted from "),w(v,{to:{name:"user.show",params:{id:s.post.reposted_post.user.id}}},{default:b(()=>[h(i(s.post.reposted_post.user.name),1)]),_:1},8,["to"])]),e("h1",D,i(s.post.reposted_post.title),1),s.post.reposted_post.image_url?(n(),l("img",{key:0,class:"my-3 mx-auto",src:s.post.reposted_post.image_url,alt:s.post.reposted_post.title},null,8,L)):c("",!0),e("p",null,i(s.post.reposted_post.content),1),e("p",I,i(s.post.reposted_post.date),1)])):c("",!0),e("div",N,[w(v,{class:"text-slate-500 text-sm",to:{name:"user.show",params:{id:s.post.user.id}}},{default:b(()=>[h(i(s.post.user.name),1)]),_:1},8,["to"]),e("p",A,i(s.post.date),1),e("div",U,[e("div",F,[(n(),l("svg",{onClick:t[1]||(t[1]=r=>u.getComments(s.post)),xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:a(["mr-2 stroke-black-500 cursor-pointer hover:fill-red-500 w-6 h-6 fill-white"])},E)),e("p",null,i(s.post.comments_count),1)]),e("div",H,[(n(),l("svg",{onClick:t[2]||(t[2]=m(r=>u.openRepost(s.post),["prevent"])),xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:a(["mr-2 stroke-black-500 cursor-pointer hover:fill-red-500 w-6 h-6","fill-white"])},G)),e("p",null,i(s.post.reposted_by_posts_count),1)]),e("div",J,[(n(),l("svg",{onClick:t[3]||(t[3]=m(r=>u.toggleLike(s.post),["prevent"])),xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:a(["mr-2 stroke-black-500 cursor-pointer hover:fill-red-500 w-6 h-6",s.post.is_liked?"fill-red-500":"fill-white"])},O,2)),e("p",null,i(s.post.likes_count),1)])])]),o.err?(n(),l("div",Q,[e("p",W,i(o.err),1)])):c("",!0),o.isRepost?(n(),l("div",X,[e("div",null,[_(e("input",{"onUpdate:modelValue":t[4]||(t[4]=r=>o.title=r),class:"w-96 mb-3 rounded-3xl border p-2 border-slate-400",type:"text",placeholder:"title"},null,512),[[p,o.title]])]),o.errors.title?(n(),l("div",Y,[(n(!0),l(x,null,k(o.errors.title,r=>(n(),l("p",Z,i(r),1))),256))])):c("",!0),e("div",null,[_(e("textarea",{"onUpdate:modelValue":t[5]||(t[5]=r=>o.content=r),class:"w-96 mb-3 rounded-3xl border p-2 border-slate-400",placeholder:"content"},null,512),[[p,o.content]])]),o.errors.content?(n(),l("div",$,[(n(!0),l(x,null,k(o.errors.content,r=>(n(),l("p",ee,i(r),1))),256))])):c("",!0),e("div",null,[e("a",{onClick:t[6]||(t[6]=m(r=>u.repost(s.post),["prevent"])),href:"#",class:"block p-2 w-32 text-center rounded-3xl bg-green-600 text-white hover:bg-white hover:border hover:border-green-600 hover:text-green-600 ml-auto"},"Repost")]),o.succsesRepost?(n(),l("div",te,[e("p",se,i(o.succsesRepost),1)])):c("",!0)])):c("",!0),s.post.comments_count>0?(n(),l("div",oe,[o.isShowed?(n(),l("p",{key:0,onClick:t[7]||(t[7]=r=>o.isShowed=!1),class:"text-center cursor-pointer"},"Close comments")):c("",!0),o.comments&&o.isShowed?(n(),l("div",re,[(n(!0),l(x,null,k(o.comments,r=>(n(),l("div",ne,[e("div",le,[e("p",ie,i(r.user.name),1),e("p",{onClick:ke=>u.setParentId(r),class:"cursor-pointer text-sm text-sky-500"},"Answer",8,de)]),e("p",null,[r.answered_for_user?(n(),l("span",ce,i(r.answered_for_user?r.answered_for_user:"")+", ",1)):c("",!0),h(" "+i(r.body),1)]),e("p",ue,i(r.date),1)]))),256))])):c("",!0)])):c("",!0),e("div",me,[e("div",he,[e("div",ae,[o.comment?(n(),l("p",_e,"Answer for "+i(o.comment.user.name),1)):c("",!0),o.comment?(n(),l("p",{key:1,onClick:t[8]||(t[8]=r=>o.comment=null),class:"cursor-pointer text-sm text-sky-300"},"Cancel")):c("",!0)]),_(e("input",{"onUpdate:modelValue":t[9]||(t[9]=r=>o.body=r),class:"w-96 mb-3 rounded-3xl border p-2 border-slate-400",type:"text",placeholder:"comment"},null,512),[[p,o.body]])]),e("div",null,[e("a",{onClick:t[10]||(t[10]=m(r=>u.storeComment(s.post),["prevent"])),href:"#",class:"block p-2 w-32 text-center rounded-3xl bg-red-600 text-white hover:bg-white hover:border hover:border-red-600 hover:text-red-600 ml-auto"},"Comment")])])])]))}const we=g(y,[["render",pe]]);export{we as P};
