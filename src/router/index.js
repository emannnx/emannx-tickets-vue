import { createRouter, createWebHistory } from "vue-router"
import Landing from "../pages/Landing.vue"
import Login from "../pages/Login.vue"
import Signup from "../pages/Signup.vue"
import Dashboard from "../pages/Dashboard.vue"
import Tickets from "../pages/Tickets.vue"

const routes = [
  {
    path: "/",
    component: Landing,
    meta: { requiresAuth: false },
  },
  {
    path: "/auth/login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/auth/signup",
    component: Signup,
    meta: { requiresAuth: false },
  },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets",
    component: Tickets,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("ticketapp_session")

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/auth/login")
  } else if ((to.path === "/auth/login" || to.path === "/auth/signup") && isAuthenticated) {
    next("/dashboard")
  } else {
    next()
  }
})

export default router
