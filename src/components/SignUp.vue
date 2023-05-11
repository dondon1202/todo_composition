<script>
import { reactive } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    // const route = useRoute()
    const state = reactive({
      token: '',
      nickname: '',

      email: '',
      password: '',
      checkpassword: '',

      emptyEmailError: '',
      emptyPasswordError: '',
      emptynicknameError: '',
      emptycheckpasswordError: ''
    })
    const resetForm = () => {
      state.nickname = ''
      state.email = ''
      state.password = ''
      state.checkpassword = ''
    }
    const vertify = () => {
      if (state.email.trim() == '') {
        state.emptyEmailError = '帳號尚未填寫'
      }
      if (state.nickname.trim() == '') {
        state.emptynicknameError = '暱稱尚未填寫'
      }
      if (state.password.trim() == '') {
        state.emptyPasswordError = '密碼尚未填寫'
      }
      if (state.checkpassword.trim() == '') {
        state.emptycheckpasswordError = '確認密碼尚未填寫'
      }
    }
    const signUp = () => {
      vertify()
      let obj = {
        user: {
          email: state.email,
          nickname: state.nickname,
          password: state.password
        }
      }
      if (
        state.email === '' ||
        state.password === '' ||
        state.nickname === '' ||
        state.checkpassword === ''
      ) {
        return
      } else if (state.password.length < 5) {
        Swal.fire('註冊失敗', '密碼不得少於六位數', 'warning')
        resetForm()
      } else if (state.password !== state.checkpassword) {
        Swal.fire('註冊失敗', '密碼前後不一致，請重新確認', 'warning')
        resetForm()
      } else {
        axios
          .post('https://todoo.5xcamp.us/users', obj)
          .then((response) => {
            if (response.data.message == '註冊成功') {
              Swal.fire('註冊成功', '恭喜', 'success').then(() => {
                router.push('/')
              })
            }
          })
          .catch((error) => {
            console.log(error)
            Swal.fire('註冊失敗', '此帳號已被使用', 'warning')
            resetForm()
          })
      }
    }
    return {
      state,
      vertify,
      signUp,
      resetForm
    }
  }
}
</script>
<template>
  <section
    class="bg-[#FFD370] pt-[50px] pb-[100px] lg:pt-[50px] lg:pb-[150px] text-black font-normal"
  >
    <div class="container mx-auto md:px-[100px] lg:flex">
      <section
        class="nav mx-auto flex w-[80%] items-center justify-center py-5 lg:w-[40%] lg:flex-col"
      >
        <a href="index.html"><img src="logo.svg" alt="" class="w-[400px] lg:w-[300px]" /></a>
        <img src="img.svg" alt="" class="hidden lg:mt-5 lg:block" />
      </section>
      <section class="mx-auto w-[80%] lg:mt-20 lg:w-[40%]">
        <h1 class="text-center text-3xl font-bold lg:text-3xl">註冊帳號</h1>

        <form class="form mt-10">
          <h2
            class="mt-3 mb-2 text-lg font-black after:ml-0.5 after:text-red-500 after:content-['*']"
          >
            Email
          </h2>
          <input
            class="peer mb-2 w-full rounded-xl py-3 px-4"
            type="email"
            name=""
            id="email"
            placeholder="請輸入Email"
            v-model="state.email"
            @keydown.enter="signUp"
          />
          <p class="invisible text-sm text-pink-600 peer-invalid:visible">請輸入正確的Email</p>
          <div class="mb-4 mt-[-20px] text-red-500" v-if="state.email == ''" v-cloak>
            {{ state.emptyEmailError }}
          </div>
          <h2
            class="mt-3 mb-2 text-lg font-black after:ml-0.5 after:text-red-500 after:content-['*']"
          >
            您的暱稱
          </h2>
          <input
            class="mb-6 w-full rounded-xl py-3 px-4"
            type="text"
            name=""
            id="name"
            placeholder="請輸入暱稱"
            v-model="state.nickname"
            @keydown.enter="signUp"
          />
          <div class="mb-4 mt-[-20px] text-red-500" v-if="state.nickname == ''" v-cloak>
            {{ state.emptynicknameError }}
          </div>
          <h2
            class="mt-3 mb-2 text-lg font-black after:ml-0.5 after:text-red-500 after:content-['*']"
          >
            Password
          </h2>
          <input
            class="mb-6 w-full rounded-xl py-3 px-4"
            type="password"
            name=""
            id="pwd"
            placeholder="請輸入Password"
            v-model="state.password"
            @keydown.enter="signUp"
          />
          <div class="mb-4 mt-[-20px] text-red-500" v-if="state.password == ''" v-cloak>
            {{ state.emptyPasswordError }}
          </div>
          <h2
            class="mt-3 mb-2 text-lg font-black after:ml-0.5 after:text-red-500 after:content-['*']"
          >
            再次輸入Password
          </h2>
          <input
            class="mb-6 w-full rounded-xl py-3 px-4"
            type="password"
            name=""
            id="pwd_check"
            placeholder="再次輸入Password"
            v-model="state.checkpassword"
            @keydown.enter="signUp"
          />
          <div class="mb-4 mt-[-20px] text-red-500" v-if="state.checkpassword == ''" v-cloak>
            {{ state.emptycheckpasswordError }}
          </div>
        </form>
        <div class="mt-6 flex justify-center">
          <button
            v-on:click="signUp()"
            class="btn-register w-[128px] rounded-lg bg-black py-3 text-[16px] text-white"
          >
            註冊帳號
          </button>
        </div>
        <div class="mt-6 flex justify-center">
          <button class="w-[128px] rounded-lg py-3 text-[16px] font-black">
            <RouterLink to="/">登入</RouterLink>
          </button>
        </div>
      </section>
    </div>
  </section>
</template>

<style></style>
