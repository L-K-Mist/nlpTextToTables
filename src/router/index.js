import Vue from 'vue'
import Router from 'vue-router'
import DailyLog from '@/components/DailyLog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DailyLog',
      component: DailyLog
    }
  ]
})
