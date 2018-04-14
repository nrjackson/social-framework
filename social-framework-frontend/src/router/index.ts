import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello.vue'
import Login from '@/components/Login.vue'
import Posts from '@/components/Posts.vue'
import NewPost from '@/components/NewPost.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/posts/new',
      name: 'newPost',
      component: NewPost
    }
  ]
})
