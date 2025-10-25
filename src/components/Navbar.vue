<!-- eslint-disable vue/no-setup-props-destructure -->

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-brand">
        <router-link to="/" class="brand-link">emannx-tickets</router-link>
      </div>
      <div class="navbar-links">
        <router-link to="/dashboard" class="nav-link" v-if="!isLandingPage">Dashboard</router-link>
        <router-link to="/tickets" class="nav-link" v-if="!isLandingPage">Tickets</router-link>
        <button @click="logout" class="btn btn-secondary" v-if="!isLandingPage">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isLandingPage = computed(() => route.path === '/')

const logout = () => {
  localStorage.removeItem('ticketapp_session')
  router.push('/')
}
</script>

<style scoped>
.navbar {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 600;
}

.brand-link {
  color: var(--primary-color);
  text-decoration: none;
}

.navbar-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  color: var(--neutral-dark);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    gap: 1rem;
  }

  .navbar-links {
    width: 100%;
    flex-direction: column;
    gap: 1rem;
  }

  .nav-link,
  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>
