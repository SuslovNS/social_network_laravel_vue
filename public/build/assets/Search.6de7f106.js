import{_ as p,o as i,c as l,e as r,i as m,v as f,k as _,b as c,F as y,a as x,f as g,t as d}from"./app.9cf56096.js";const P={name:"Search",data(){return{query:"",actors:[],loading:!1,error:null,currentPage:1,perPage:50,defaultPhoto:"https://via.placeholder.com/150x150?text=No+Photo"}},methods:{fetchPreviousPage(){this.currentPage>1&&(this.currentPage--,this.searchActors())},fetchNextPage(){this.currentPage<this.totalPages&&(this.currentPage++,this.searchActors())},searchDefault(){this.currentPage=1,this.searchActors()},async searchActors(){const t=this.query.split(" ").map(o=>o.charAt(0).toUpperCase()+o.slice(1)).join(" ");this.loading=!0,axios.get(`https://api.kinopoisk.dev/v1/person?movies.description=${t}&page=${this.currentPage}&limit=${this.perPage}`,{headers:{"X-API-KEY":"YGHZGWA-5ZC4XX9-HTH03V2-Q24F4QB"}}).then(o=>{this.actors=o.data.docs,this.totalPages=o.data.pages,this.totalActors=o.data.total,this.loading=!1}).catch(o=>{this.loading=!1,this.actors=[],this.totalPages=0,this.totalActors=0,this.error="\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0435 \u0434\u0430\u043D\u043D\u044B\u0445"})}}},b={class:"container mx-auto max-w-xl py-8"},v={class:"mb-4"},k={key:0,class:"text-center font-medium py-4"},w={key:1,class:"text-center font-medium py-4"},A={class:"grid grid-cols-2 md:grid-cols-3 gap-4"},D=["src"],N=["href"],C={class:"text-lg font-medium"},j={key:0,class:"text-gray-500"},q={key:2,class:"flex justify-center mt-8"},B=["disabled"],S={class:"px-4 py-2 rounded-md bg-gray-200 text-gray-700 mr-2"},V=["disabled"],z={key:3,class:"flex justify-center mt-4 text-red-500"};function F(n,t,o,H,s,a){return i(),l("div",b,[r("div",v,[m(r("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>s.query=e),onKeyup:t[1]||(t[1]=_((...e)=>a.searchDefault&&a.searchDefault(...e),["enter"])),placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 \u0430\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u043E\u043C",class:"w-full p-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"},null,544),[[f,s.query,void 0,{trim:!0}]]),r("button",{onClick:t[2]||(t[2]=(...e)=>a.searchDefault&&a.searchDefault(...e)),class:"ml-4 px-4 py-2 rounded-md bg-blue-500 text-white"},"\u0418\u0441\u043A\u0430\u0442\u044C")]),s.loading?(i(),l("div",k," \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432... ")):c("",!0),s.actors.length===0?(i(),l("div",w," \u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0432\u0432\u0435\u0441\u0442\u0438 \u0437\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 \u0430\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u043E\u043C \u044F\u0437\u044B\u043A\u0435 ")):c("",!0),r("ul",A,[(i(!0),l(y,null,x(s.actors,e=>{var u,h;return i(),l("li",{key:e.id,class:"flex flex-col items-center border rounded-md p-4 shadow-md"},[r("img",{src:(u=e.photo)!=null?u:s.defaultPhoto,class:"w-32 h-32 rounded-full object-cover mb-2"},null,8,D),r("a",{href:`https://www.kinopoisk.ru/name/${e.id}`},[r("div",C,d((h=e.name)!=null?h:e.enName),1),e.age?(i(),l("div",j,d(e.age)+" \u043B\u0435\u0442",1)):c("",!0)],8,N)])}),128))]),s.actors.length>0?(i(),l("div",q,[r("button",{onClick:t[3]||(t[3]=g((...e)=>a.fetchPreviousPage&&a.fetchPreviousPage(...e),["prevent"])),disabled:s.currentPage===1,class:"px-4 py-2 rounded-md bg-blue-500 text-white mr-2"},"\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 ",8,B),r("p",S,d(s.currentPage)+" \u0438\u0437 "+d(n.totalPages),1),r("button",{onClick:t[4]||(t[4]=g((...e)=>a.fetchNextPage&&a.fetchNextPage(...e),["prevent"])),disabled:s.currentPage===n.totalPages,class:"px-4 py-2 rounded-md bg-blue-500 text-white ml-2"},"\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 ",8,V)])):c("",!0),s.error?(i(),l("div",z,d(s.error),1)):c("",!0)])}const Q=p(P,[["render",F],["__scopeId","data-v-dbb8ac34"]]);export{Q as default};