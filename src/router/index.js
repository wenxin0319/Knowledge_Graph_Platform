import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '数据集分布', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/MyEcharts/echarts1/index'),
        meta: { title: '实体类别统计', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/MyEcharts/echarts2/index'),
        meta: { title: '关系类别统计', icon: 'tree' }
      },
      {
        path: 'neo4j',
        name: 'neo4j',
        component: () => import('@/views/MyEcharts/echarts3/index'),
        meta: { title: '关系类别统计', icon: 'tree' }
      }
    ]
  },


  {
    path: '/exampl',
    component: Layout,
    redirect: '/example/ttable',
    name: 'Model',
    meta: { title: '三元组抽取系统', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/text/index'),
        meta: { title: '生成模型', icon: 'table' }
      },
      {
        path: 'ttable',
        name: 'Ttable',
        component: () => import('@/views/text/index'),
        meta: { title: '消歧模型', icon: 'table' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
