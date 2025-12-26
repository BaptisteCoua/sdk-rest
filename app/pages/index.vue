<template>
  <div>
    <v-btn @click="toto">POUSSE</v-btn>
    <v-btn @click="deleteOne">delete</v-btn>
    <v-btn @click="loginIn">Login</v-btn>
    <v-btn @click="logout">Logout</v-btn>
    <v-btn @click="auth.me()">Me</v-btn>
    {{ loggedIn }}
    <!-- <v-list v-if="data" lines="one">
      <v-list-item
        v-for="n in data.users"
        :key="n"
        :title="n.firstName"
        :subtitle="n.university"
      ></v-list-item>
    </v-list> -->
  </div>
</template>

<script lang="ts" setup>
import { useComments } from '~/resources/users';
import { useProducts } from '~/resources/products';
import { useAuth } from '~/resources/auth';

const users = useComments()
const products = useProducts()
const auth = useAuth()
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()

const { data, status, pending, error, refresh } = await useAsyncData(
  'users',
  (_nuxtApp) => users.details(),
)

const toto = () => {  
  users.search({ query: {
    q: 'John'
  }})
}

const deleteOne = () => {
  products.delete({ id: 6 })
}

const loginIn = async () => {
  await auth.login({
    username: 'emilys',
    password: 'emilyspass',
  })
  await fetch()
}

const logout = async () => {
  await auth.logout()
  await clear()
  await fetch()
}


</script>
