<template>
  <div class="login">
    <button @click="facebookLogin">auth Facebook</button>
    <h1>Login</h1>
      <div class="form">
        <div>
          <input type="text" name="email" placeholder="EMAIL" v-model="email">
        </div>
        <div>
          <input type="text" name="password" placeholder="PASSWORD" v-model="password"></textarea>
        </div>
        <div>
          <button class="app_post_btn" @click="login">Login</button>
        </div>
      </div>
  </div>
</template>

<script>
  import Login from './Login.ts'
  export default Login
</script>

<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
