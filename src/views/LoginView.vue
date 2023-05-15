<script>
import { RouterLink, useRouter } from 'vue-router'
import { reactive } from 'vue'

// import axios from 'axios'
import Swal from 'sweetalert2'
import { apiLogin } from '../../apis/user.js'

export default {
  setup() {
    const router = useRouter()
    const state = reactive({
      token: '',
      nickname: '',
      email: '',
      password: '',

      emptyEmailError: '',
      emptyPasswordError: ''
    })
    const clear = () => {
      state.email = ''
      state.password = ''
    }
    const vertify = () => {
      if (state.email.trim() == '') {
        state.emptyEmailError = '帳號尚未填寫'
      }
      if (state.password.trim() == '') {
        state.emptyPasswordError = '密碼尚未填寫'
      }

    }
    const login = () => {
      vertify()
      let obj = {
        user: {
          email: state.email,
          password: state.password
        }
      }
      if (state.email === '' || state.password === '') {
        return
      } else if (state.password.length < 5) {
        Swal.fire('登入失敗', '密碼不得少於六位數', 'warning')
        clear()
      } else {
        apiLogin(obj)
          .then((response) => {
            if (response.data.message == '登入成功') {
              state.token = response.headers.authorization
              state.nickname = response.data.nickname
              localStorage.setItem('authorization', state.token)
              localStorage.setItem('nickname', state.nickname)
              router.push('/todoview')

            }
          })
          .catch((error) => {
            console.log(error)
            if (error.message == 'Request failed with status code 401') {
              Swal.fire('登入失敗', '請先註冊帳號或者輸入正確密碼', 'error')
              clear()
            }
          })
      }
    }

    return {
      // token: state.token,
      // nickname: state.nickname,
      // email: state.email,
      // password: state.password,

      // emptyEmailError: state.emptyEmailError,
      // emptyPasswordError: state.emptyPasswordError,
      // state: state,

      state,
      clear,
      vertify,
      login
    }
  },

  components: {
    RouterLink
  }
}
</script>

<template>
  <section class="bg-[#FFD370] pt-[50px] pb-[100px] lg:pt-[50px] lg:pb-[150px] text-black">
    <div class="container mx-auto md:px-[100px] lg:flex">
      <section class="nav mx-auto flex w-[80%] items-center justify-center py-5 lg:w-[40%] lg:flex-col">
        <img src="/logo.svg" alt="" class="w-[400px] mt-5 lg:w-[300px]" />
        <img src="/img.svg" alt="" class="hidden lg:mt-5 lg:block" />
      </section>
      <section class="mx-auto w-[80%] lg:mt-20 lg:w-[40%]">
        <h1 class="text-center text-xl font-bold lg:text-3xl">最實用的線上代辦事項服務</h1>

        <form class="form mt-10">
          <h2 class="mb-2 text-lg font-normal after:ml-0.5 after:text-red-500 after:content-['*']">
            Email
          </h2>
          <input class="peer mb-2 w-full rounded-xl py-3 px-4" type="email" name="" id="email" placeholder="請輸入Email"
            v-model="state.email" @keydown.enter="login" />
          <p class="invisible mt-2 text-sm text-pink-600 peer-invalid:visible">請輸入正確的Email</p>
          <div class="mt-[-25px] font-bold text-red-500" v-if="state.email == ''" v-cloak>
            {{ state.emptyEmailError }}
          </div>
          <h2 class="mb-2 mt-6 text-lg font-normal after:ml-0.5 after:text-red-500 after:content-['*']">
            Password
          </h2>
          <input class="mb-4 w-full rounded-xl py-3 px-4" type="password" name="" id="pwd" placeholder="請輸入密碼"
            v-model="state.password" @keydown.enter="login" />
          <div class="font-bold text-red-500" v-if="state.password == ''" v-cloak>
            {{ state.emptyPasswordError }}
          </div>
        </form>

        <div class="mt-6 flex justify-center">
          <button v-on:click="login" class="sign_in w-[128px] rounded-lg bg-black py-3 text-[16px] text-white">
            登入
          </button>
        </div>
        <div class="mt-6 flex justify-center">
          <button class="w-[128px] rounded-lg py-3 text-[16px] font-black">
            <RouterLink to="/signup">註冊帳號</RouterLink>
          </button>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped></style>
