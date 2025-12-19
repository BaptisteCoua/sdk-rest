<template>
  <div>
    <v-btn @click="toto">POUSSE</v-btn>
    {{ data }}
  </div>
</template>

<script lang="ts" setup>
import { useComments } from '~/resources/users';

const users = useComments()

const { data, status, pending, error, refresh, clear } = await useAsyncData(
  'users',
  (_nuxtApp) => users.details(),
)

const toto = () => {
  const payload = {
    name: "Nicolas",
    email: "nico@gmail.com",
    password: "1234",
    avatar: "https://picsum.photos/800"
  }
  
  users.create(payload)
}
</script>
