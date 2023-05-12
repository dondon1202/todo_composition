<script>
import { RouterLink, useRouter } from 'vue-router'
import { reactive } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'


export default {
  setup() {
    const router = useRouter()
    console.log(RouterLink)
    const data = reactive({
      token: localStorage.getItem('authorization'),
      nickname: localStorage.getItem('nickname'),
      url: 'https://todoo.5xcamp.us',
      data: [],
      textContent: '',
      Done: [],
      notDone: [],
      showNotDoneMessage: true,
      showDoneMessage: false,
      showall: true,
      showNotDone: false,
      showDone: false
    })
    // 沒有token就登出
    const tokentest = () => {
      axios
        .get(`${data.url}/check`, {
          headers: {
            authorization: data.token
          }
        })
        .then((res) => {
          getTodo()
          console.log(res)
        })
        .catch(() => {
          router.push('/')
        })
    }
    const getTodo = () => {
      axios
        .get(`${data.url}/todos`, {
          headers: {
            authorization: data.token
          }
        })
        .then((response) => {
          // console.log(response.data);
          data.data = response.data.todos
          console.log('data.data', data.data)
          count()
        })
    }

    const addItem = () => {
      console.log('data.textContent', data.textContent)
      if (data.textContent.trim() === '') {
        Swal.fire('新增失敗', '請輸入內容再新增', 'warning')
      } else {
        let addObj = {
          todo: {
            content: data.textContent
          }
        }
        console.log('url', data.url)
        console.log('token', data.token)
        console.log('addObj', addObj)
        //輸入後表單清空
        data.textContent = ''
        // 戳新增API
        axios
          .post(`${data.url}/todos`, addObj, {
            headers: {
              authorization: data.token
            }
          })
          .then((response) => {
            data.data.push(response.data)
            getTodo()

            Swal.fire('成功', '新增一筆代辦事項', 'success')
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
    const checkBoxToDone = (targetId, index) => {
      axios
        .patch(`${data.url}/todos/${targetId}/toggle`, '', {
          headers: {
            authorization: data.token
          }
        })
        .then((res) => {
          Swal.fire('成功', '已成功切換狀態', 'success')
          data.data.splice(index, 1, res.data)
          count()
        })
    }
    const deleteItem = (targetId, index) => {
      Swal.fire({
        title: '請確認',
        text: '一但刪除將無法回復',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定刪除',
        cancelButtonText: '再想想'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('已刪除', '您的代辦事項刪除成功', 'success')
          console.log(targetId)
          axios
            .delete(`${data.url}/todos/${targetId}`, {
              headers: {
                authorization: data.token
              }
            })
            .then((res) => {
              console.log(res)
              data.data.splice(index, 1)
              count()
            })
        } else {
          return
        }
      })
    }
    const cleanDone = (targetId, index) => {
      Swal.fire({
        title: '請確認是否刪除全部',
        text: '一但刪除將無法回復',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定刪除',
        cancelButtonText: '再想想'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('已刪除', '您的所有已完成事項刪除成功', 'success')
          Promise.all(
            data.Done.map((item) => {
              return axios.delete(`${data.url}/todos/${item.id}`, {
                headers: {
                  authorization: data.token
                }
              })
            })
          ).then(() => {
            data.data = data.data.filter((item) => {
              return item.completed_at === null
            })

            count()
          })
        } else {
          return
        }
      })
    }
    const count = () => {
      data.notDone = data.data.filter((item) => {
        return item.completed_at === null
      })
      data.Done = data.data.filter((item) => {
        return item.completed_at !== null
      })
    }
    const all = () => {
      data.showDoneMessage = false
      data.showNotDoneMessage = true
      data.showall = true
      data.showDone = false
      data.showNotDone = false
    }
    const not = () => {
      data.notDone = data.data.filter((item) => {
        return item.completed_at === null
      })

      data.showDoneMessage = false
      data.showNotDoneMessage = true
      data.showall = false
      data.showDone = false
      data.showNotDone = true
    }
    const done = () => {
      data.Done = data.data.filter((item) => {
        return item.completed_at !== null
      })

      data.showDoneMessage = true
      data.showNotDoneMessage = false
      data.showall = false
      data.showNotDone = false
      data.showDone = true
    }
    const logOut = () => {
      axios
        .delete(`${data.url}/users/sign_out`, {
          headers: {
            authorization: data.token
          }
        })
        .then((response) => {
          console.log(response)
          localStorage.removeItem('authorization')
          localStorage.removeItem('nickname')
          Swal.fire('登出成功', '歡迎下次使用', 'success').then(() => {
            // window.location.reload()
            router.push('/')
          })
        })
        .catch((error) => {
          console.log(error)
          Swal.fire('登出失敗', 'error')
        })
    }
    onMounted(() => {
      tokentest()
      count()
      getTodo()
    })

    return {
      data,
      tokentest,
      getTodo,
      addItem,
      checkBoxToDone,
      deleteItem,
      cleanDone,
      count,
      all,
      not,
      done,
      logOut
    }
  }
}
</script>

<template>
  <section class="bg-todo text-black">
    <div class="container mx-auto min-h-[100vh]">
      <section class="nav mx-auto flex w-[90%] items-center justify-between py-5">
        <img src="logo.svg" alt="" />
        <ul class="flex text-xl font-bold">
          <li class="user pr-4" v-cloak>{{ data.nickname }}</li>
          <li class="logoutBtn cursor-pointer" v-on:click="logOut">登出</li>
        </ul>
      </section>
      <section class="mx-auto w-[90%] md:mt-4 lg:w-[50%]">
        <form class="input mt-10 flex items-center justify-between text-center md:mt-20">
          <input type="text" class="text w-[100%] rounded-lg border-2 p-2 py-4 pl-4" placeholder="新增代辦事項"
            v-model="data.textContent" @keydown.enter.prevent="addItem" />
          <i v-on:click="addItem"
            class="fa-solid fa-feather-pointed ml-[-50px] cursor-pointer p-2 pr-[15px] text-[25px]"></i>
        </form>
        <div class="empty flex flex-col text-center" v-if="data.data.length === 0">
          <h3 class="my-[50px] text-xl font-black">目前尚無待辦事項</h3>
          <img src="empty 1.svg" class="mx-auto w-[50%]" alt="" />
        </div>
        <ul v-else class="list-box m-4 mx-auto w-[100%] rounded-lg border-2 bg-white py-4">
          <ul class="three-button flex justify-around border-b-2 text-center">
            <li :class="
              data.showall
                ? 'border-b-4 font-black border-[#fadd9b] mb-[-2px] w-[33%] cursor-pointer pb-2 text-lg'
                : ' mb-[-2px] w-[33%] cursor-pointer pb-2'
            " @click="count(), all()">
              全部
            </li>
            <li :class="
              data.showNotDone
                ? 'border-b-4 font-black border-[#fadd9b] mb-[-2px] w-[33%] cursor-pointer pb-2 text-lg'
                : ' mb-[-2px] w-[33%] cursor-pointer pb-2'
            " @click="count(), not()">
              待完成
            </li>
            <li :class="
              data.showDone
                ? 'border-b-4 font-black border-[#fadd9b] mb-[-2px] w-[33%] cursor-pointer pb-2 text-lg'
                : ' mb-[-2px] w-[33%] cursor-pointer pb-2'
            " @click="count(), done()">
              已完成
            </li>
          </ul>
          <div class="list px-10 pt-2">
            <template v-if="data.showall">
              <ul class="flex justify-between border-b-2 py-4" v-for="(item, index) in data.data" :key="index">
                <li class="flex">
                  <img class="flex h-[22px] w-[22px] cursor-pointer" type="checkbox"
                    @click="checkBoxToDone(item.id, index)"
                    :src="item.completed_at !== null ? './check.svg' : './checkbox.svg'" />
                  <p :class="item.completed_at !== null ? 'ml-4  line-through text-gray-300' : 'ml-4 '">
                    {{ item.content }}
                  </p>
                </li>
                <li>
                  <img src="Vector.svg" alt="" id="delete" class="cursor-pointer"
                    v-on:click="deleteItem(item.id, index)" />
                </li>
              </ul>
            </template>
            <template v-if="data.showDone">
              <ul class="flex justify-between border-b-2 py-4" v-for="(item, index) in data.Done" :key="index">
                <li class="flex">
                  <img class="flex h-[22px] w-[22px] cursor-pointer" type="checkbox"
                    @click="checkBoxToDone(item.id, index)"
                    :src="item.completed_at !== null ? './check.svg' : './checkbox.svg'" />
                  <p :class="item.completed_at !== null ? 'ml-4  line-through text-gray-300' : 'ml-4 '">
                    {{ item.content }}
                  </p>
                </li>
                <li>
                  <img src="Vector.svg" alt="" id="delete" class="cursor-pointer"
                    v-on:click="deleteItem(item.id, index)" />
                </li>
              </ul>
            </template>
            <template v-if="data.showNotDone">
              <ul class="flex justify-between border-b-2 py-4" v-for="(item, index) in data.notDone" :key="index">
                <li class="flex">
                  <img class="flex h-[22px] w-[22px] cursor-pointer" type="checkbox"
                    @click="checkBoxToDone(item.id, index)"
                    :src="item.completed_at !== null ? './check.svg' : './checkbox.svg'" />
                  <p :class="item.completed_at !== null ? 'ml-4  line-through text-gray-300' : 'ml-4 '">
                    {{ item.content }}
                  </p>
                </li>
                <li>
                  <img src="Vector.svg" alt="" id="delete" class="cursor-pointer"
                    v-on:click="deleteItem(item.id, index)" />
                </li>
              </ul>
            </template>
          </div>
          <div class="mt-4 flex justify-between px-10">
            <p v-if="data.showNotDoneMessage">{{ data.notDone.length }}個待完成事項</p>
            <p v-if="data.showDoneMessage">{{ data.Done.length }} 個已完成事項</p>
            <p class="cursor-pointer text-[#9F9A91]" v-on:click="cleanDone">清除已完成項目</p>
          </div>
        </ul>
      </section>
    </div>
  </section>
</template>

<style>
[v-cloak] {
  display: none;
}

.bg-todo {
  background: linear-gradient(172.7deg,
      #ffd370 5.12%,
      #ffd370 53.33%,
      #ffd370 53.44%,
      #ffffff 53.45%,
      #ffffff 94.32%);
}
</style>
