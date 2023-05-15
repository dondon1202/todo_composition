import request from './request'

// 使用者註冊
const apiSignUp = (obj) => request.post(`/users`, obj)

// 使用者登入
const apiLogin = (obj) => request.post(`/users/sign_in`, obj)

// 使用者登出
const apiLogout = (token) => request.delete(`/users/sign_out`, token)

// 確認是否有token 沒有就登出
const apiCheckToken = (token) => request.get(`/check`, token)

// 取得todo
const apiGetTodo = (token) => request.get(`/todos`, token)

// 新增todo
const apiAddTodo = (addObj, token) => request.post(`/todos`, addObj, token)

// 刪除單筆todo
const apiDelete = (targetId, token) => request.delete(`/todos/${targetId}`, token)

// 刪除已完成todo
const apiDeleteDone = (item, token) => request.delete(`/todos/${item.id}`, token)

// todo切換狀態
const apiTodoChange = (targetId, token) => request.patch(`/todos/${targetId}/toggle`, '', token)

// 具名匯出
export {
  apiSignUp,
  apiLogin,
  apiLogout,
  apiCheckToken,
  apiGetTodo,
  apiAddTodo,
  apiTodoChange,
  apiDelete,
  apiDeleteDone
}
