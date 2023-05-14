import{_,u,r as h,R as y,a as b,o as n,c as i,b as o,w as m,v as c,d as p,t as x,e as f,f as k,g as v,h as E}from"./index-a3206848.js";import{S as g,a as V,_ as R}from"./logo-86827882.js";import{_ as L}from"./img-5bfb212b.js";const S={setup(){const r=u(),t=h({token:"",nickname:"",email:"",password:"",emptyEmailError:"",emptyPasswordError:""}),l=()=>{t.email="",t.password=""},e=()=>{t.email.trim()==""&&(t.emptyEmailError="帳號尚未填寫"),t.password.trim()==""&&(t.emptyPasswordError="密碼尚未填寫")};return{state:t,clear:l,vertify:e,login:()=>{e();let d={user:{email:t.email,password:t.password}};t.email===""||t.password===""||(t.password.length<5?(g.fire("登入失敗","密碼不得少於六位數","warning"),l()):V(d).then(a=>{a.data.message=="登入成功"&&(t.token=a.headers.authorization,t.nickname=a.data.nickname,localStorage.setItem("authorization",t.token),localStorage.setItem("nickname",t.nickname),r.push("/todoview"))}).catch(a=>{console.log(a),a.message=="Request failed with status code 401"&&(g.fire("登入失敗","請先註冊帳號或者輸入正確密碼","error"),l())}))}}},components:{RouterLink:y}},j={class:"bg-[#FFD370] pt-[50px] pb-[100px] lg:pt-[50px] lg:pb-[150px] text-black"},C={class:"container mx-auto md:px-[100px] lg:flex"},N=o("section",{class:"nav mx-auto flex w-[80%] items-center justify-center py-5 lg:w-[40%] lg:flex-col"},[o("img",{src:R,alt:"",class:"w-[400px] mt-5 lg:w-[300px]"}),o("img",{src:L,alt:"",class:"hidden lg:mt-5 lg:block"})],-1),P={class:"mx-auto w-[80%] lg:mt-20 lg:w-[40%]"},B=o("h1",{class:"text-center text-xl font-bold lg:text-3xl"},"最實用的線上代辦事項服務",-1),D={class:"form mt-10"},K=o("h2",{class:"mb-2 text-lg font-normal after:ml-0.5 after:text-red-500 after:content-['*']"}," Email ",-1),z=o("p",{class:"invisible mt-2 text-sm text-pink-600 peer-invalid:visible"},"請輸入正確的Email",-1),F={key:0,class:"mt-[-25px] font-bold text-red-500"},I=o("h2",{class:"mb-2 mt-6 text-lg font-normal after:ml-0.5 after:text-red-500 after:content-['*']"}," Password ",-1),T={key:1,class:"font-bold text-red-500"},U={class:"mt-6 flex justify-center"},q={class:"mt-6 flex justify-center"},M={class:"w-[128px] rounded-lg py-3 text-[16px] font-black"};function A(r,t,l,e,w,d){const a=b("RouterLink");return n(),i("section",j,[o("div",C,[N,o("section",P,[B,o("form",D,[K,m(o("input",{class:"peer mb-2 w-full rounded-xl py-3 px-4",type:"email",name:"",id:"email",placeholder:"請輸入Email","onUpdate:modelValue":t[0]||(t[0]=s=>e.state.email=s),onKeydown:t[1]||(t[1]=p((...s)=>e.login&&e.login(...s),["enter"]))},null,544),[[c,e.state.email]]),z,e.state.email==""?(n(),i("div",F,x(e.state.emptyEmailError),1)):f("",!0),I,m(o("input",{class:"mb-4 w-full rounded-xl py-3 px-4",type:"password",name:"",id:"pwd",placeholder:"請輸入密碼","onUpdate:modelValue":t[2]||(t[2]=s=>e.state.password=s),onKeydown:t[3]||(t[3]=p((...s)=>e.login&&e.login(...s),["enter"]))},null,544),[[c,e.state.password]]),e.state.password==""?(n(),i("div",T,x(e.state.emptyPasswordError),1)):f("",!0)]),o("div",U,[o("button",{onClick:t[4]||(t[4]=(...s)=>e.login&&e.login(...s)),class:"sign_in w-[128px] rounded-lg bg-black py-3 text-[16px] text-white"}," 登入 ")]),o("div",q,[o("button",M,[k(a,{to:"/signup"},{default:v(()=>[E("註冊帳號")]),_:1})])])])])])}const O=_(S,[["render",A]]);export{O as default};