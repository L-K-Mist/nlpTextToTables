import Vue from 'vue'
import Router from 'vue-router'
import DailyLog from '@/components/DailyLog'
import Suppliers from '@/components/Suppliers'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DailyLog',
      component: DailyLog
    },
        {
      path: '/suppliers',
      name: 'Suppliers',
      component: Suppliers
    }
  ]
})
