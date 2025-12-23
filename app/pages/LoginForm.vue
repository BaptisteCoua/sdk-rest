<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const session = useUserSession()

// import { useUserSession } from '#auth-utils'

const email = ref('john@mail.com')
const password = ref('changeme')
const loading = ref(false)
const error = ref<string | null>(null)


const login = async () => {
  error.value = null
  loading.value = true

  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    })

    // la session est automatiquement mise à jour
    if (!session.value) {
      throw new Error('Session non créée')
    }
  } catch (e: any) {
    error.value = e?.data?.message ?? 'Erreur de connexion'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="login" class="space-y-4 max-w-sm">
    <div>
      <label>Email</label>
      <input
        v-model="email"
        type="email"
        required
        class="border w-full p-2"
      />
    </div>

    <div>
      <label>Password</label>
      <input
        v-model="password"
        type="password"
        required
        class="border w-full p-2"
      />
    </div>

    <button
      type="submit"
      :disabled="loading"
      class="bg-black text-white px-4 py-2"
    >
      {{ loading ? 'Connexion…' : 'Se connecter' }}
    </button>

    <p v-if="error" class="text-red-600">{{ error }}</p>
  </form>
</template>
