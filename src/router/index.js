import Vue from 'vue'
import Router from 'vue-router'
import EmployeeList from '@/components/EmployeeList'
import EmployeeDetail from '@/components/EmployeeDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'EmployeeList',
      component: EmployeeList
    },
    {
      path: '/employee-detail/:employeeId',
      name: 'EmployeeDetail',
      component: EmployeeDetail
    }
  ]
})