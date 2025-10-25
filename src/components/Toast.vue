<template>
  <div class="toast-container">
    <transition-group name="toast" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast', `toast-${toast.type}`]"
      >
        {{ toast.message }}
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const toasts = ref([])
let toastId = 0

const showToast = (message, type = 'info', duration = 3000) => {
  const id = toastId++
  const toast = { id, message, type }
  toasts.value.push(toast)

  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, duration)
}

defineExpose({ showToast })
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  pointer-events: none;
}

.toast {
  background-color: white;
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  margin-bottom: 1rem;
  min-width: 300px;
  pointer-events: auto;
  font-weight: 500;
}

.toast-success {
  border-left: 4px solid var(--success-color);
  color: var(--success-color);
}

.toast-error {
  border-left: 4px solid var(--error-color);
  color: var(--error-color);
}

.toast-warning {
  border-left: 4px solid var(--warning-color);
  color: var(--warning-color);
}

.toast-info {
  border-left: 4px solid var(--primary-color);
  color: var(--primary-color);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateX(400px);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(400px);
  opacity: 0;
}

@media (max-width: 768px) {
  .toast-container {
    left: 20px;
    right: 20px;
  }

  .toast {
    min-width: auto;
  }
}
</style>
