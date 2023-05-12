import{_ as w,u,r as h,R as y,a as b,o as l,c as i,b as s,w as m,v as c,d as p,t as x,e as f,f as k,g as v,h as E}from"./index-f09239ab.js";import{S as g,a as V,_ as R}from"./logo-36e78bf4.js";import{_ as S}from"./img-5bfb212b.js";const j={setup(){const r=u(),t=h({token:"",nickname:"",email:"",password:"",emptyEmailError:"",emptyPasswordError:""}),n=()=>{t.email="",t.password=""},e=()=>{t.email.trim()==""&&(t.emptyEmailError="帳號尚未填寫"),t.password.trim()==""&&(t.emptyPasswordError="密碼尚未填寫")};return{state:t,clear:n,vertify:e,login:()=>{e();let d={user:{email:t.email,password:t.password}};t.email===""||t.password===""||(t.password.length<5?(g.fire("登入失敗","密碼不得少於六位數","warning"),n()):V.post("https://todoo.5xcamp.us/users/sign_in",d).then(a=>{a.data.message=="登入成功"&&(t.token=a.headers.authorization,t.nickname=a.data.nickname,localStorage.setItem("authorization",t.token),localStorage.setItem("nickname",t.nickname),r.push("/todo"))}).catch(a=>{console.log(a),a.message=="Request failed with status code 401"&&(g.fire("登入失敗","請先註冊帳號或者輸入正確密碼","error"),n())}))}}},components:{RouterLink:y}},C={class:"bg-[#FFD370] pt-[50px] pb-[100px] lg:pt-[50px] lg:pb-[150px] text-black"},L={class:"container mx-auto md:px-[100px] lg:flex"},N=s("section",{class:"nav mx-auto flex w-[80%] items-center justify-center py-5 lg:w-[40%] lg:flex-col"},[s("img",{src:R,alt:"",class:"w-[400px] mt-5 lg:w-[300px]"}),s("img",{src:S,alt:"",class:"hidden lg:mt-5 lg:block"})],-1),P={class:"mx-auto w-[80%] lg:mt-20 lg:w-[40%]"},B=s("h1",{class:"text-center text-xl font-bold lg:text-3xl"},"最實用的線上代辦事項服務",-1),D={class:"form mt-10"},K=s("h2",{class:"mb-2 text-lg font-normal after:ml-0.5 after:text-red-500 after:content-['*']"}," Email ",-1),z=s("p",{class:"invisible mt-2 text-sm text-pink-600 peer-invalid:visible"},"請輸入正確的Email",-1),F={key:0,class:"mt-[-25px] font-bold text-red-500"},I=s("h2",{class:"mb-2 mt-6 text-lg font-normal after:ml-0.5 after:text-red-500 after:content-['*']"}," Password ",-1),T={key:1,class:"font-bold text-red-500"},U={class:"mt-6 flex justify-center"},q={class:"mt-6 flex justify-center"},M={class:"w-[128px] rounded-lg py-3 text-[16px] font-black"};function A(r,t,n,e,_,d){const a=b("RouterLink");return l(),i("section",C,[s("div",L,[N,s("section",P,[B,s("form",D,[K,m(s("input",{class:"peer mb-2 w-full rounded-xl py-3 px-4",type:"email",name:"",id:"email",placeholder:"請輸入Email","onUpdate:modelValue":t[0]||(t[0]=o=>e.state.email=o),onKeydown:t[1]||(t[1]=p((...o)=>e.login&&e.login(...o),["enter"]))},null,544),[[c,e.state.email]]),z,e.state.email==""?(l(),i("div",F,x(e.state.emptyEmailError),1)):f("",!0),I,m(s("input",{class:"mb-4 w-full rounded-xl py-3 px-4",type:"password",name:"",id:"pwd",placeholder:"請輸入密碼","onUpdate:modelValue":t[2]||(t[2]=o=>e.state.password=o),onKeydown:t[3]||(t[3]=p((...o)=>e.login&&e.login(...o),["enter"]))},null,544),[[c,e.state.password]]),e.state.password==""?(l(),i("div",T,x(e.state.emptyPasswordError),1)):f("",!0)]),s("div",U,[s("button",{onClick:t[4]||(t[4]=(...o)=>e.login&&e.login(...o)),class:"sign_in w-[128px] rounded-lg bg-black py-3 text-[16px] text-white"}," 登入 ")]),s("div",q,[s("button",M,[k(a,{to:"/signup"},{default:v(()=>[E("註冊帳號")]),_:1})])])])])])}const O=w(j,[["render",A]]);export{O as default};