<template>
   <v-layout>
        <v-app-bar :elevation="2">
            <template v-slot:prepend>
            <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
            <v-btn @click="navigateTo('/LoginForm')">login</v-btn>
            <v-btn @click="navigateTo('/')">accueil</v-btn>
            <v-btn @click="navigateTo('/')">{{loggedIn}}</v-btn>
            </template>
        
            <v-app-bar-title>Application Bar</v-app-bar-title>
        </v-app-bar>
        <v-main >
            <slot/>
        </v-main>
    </v-layout>
</template>

<script lang="ts" setup>
const { loggedIn, user, session, fetch, clear, openInPopup } = useUserSession()
</script>