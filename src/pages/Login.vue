<!-- eslint-disable -->
<template>
  <div class="auth-page">
    <Navbar />
    <main class="auth-main">
      <div class="auth-container">
        <div class="auth-card">
          <h1>Login</h1>
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="login-email">Email</label>
              <input
                id="login-email"
                v-model="form.email"
                type="email"
                placeholder="Enter your email"
                @blur="validateEmail"
              />
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>

            <div class="form-group">
              <label for="login-password">Password</label>
              <input
                id="login-password"
                v-model="form.password"
                type="password"
                placeholder="Enter your password"
                @blur="validatePassword"
              />
              <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
            </div>

            <button type="submit" class="btn btn-primary btn-full">Login</button>
          </form>

          <p class="auth-link">
            Don't have an account? <router-link to="/auth/signup">Sign up here</router-link>
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { validateEmail as validateEmailUtil, validatePassword as validatePasswordUtil } from '../utils/validation.js'

const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const errors = ref({
  email: '',
  password: ''
})

const validateEmail = () => {
  const error = validateEmailUtil(form.value.email)
  errors.value.email = error
}

const validatePassword = () => {
  const error = validatePasswordUtil(form.value.password)
  errors.value.password = error
}

const handleLogin = () => {
  validateEmail()
  validatePassword()

  if (!errors.value.email && !errors.value.password) {
    if (form.value.email === 'testuser@test.com' && form.value.password === 'password123') {
      localStorage.setItem('ticketapp_session', JSON.stringify({
        email: form.value.email,
        timestamp: new Date().toISOString()
      }))
      router.push('/dashboard')
    } else {
      alert('Invalid credentials. Try testuser@test.com / password123')
    }
  }
}
</script>

<style scoped>
.auth-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.auth-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: var(--neutral-light);
}

.auth-container {
  width: 100%;
  max-width: 400px;
}

.auth-card {
  background-color: white;
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}

.auth-card h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--neutral-dark);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--neutral-dark);
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-group input.input-error {
  border-color: var(--error-color);
}

.error-message {
  color: var(--error-color);
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.auth-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #6b7280;
}

.auth-link a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
}

.auth-link a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .auth-card {
    padding: 1.5rem;
  }
}
</style>
