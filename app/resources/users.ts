// app/resources/comments.ts
import { defineResource } from '~~/modules/sdkRest/resource/defineResource'
interface UsersEntry { 
    name: string
    email: string
    password: string
    avatar: string
}

export const useComments = defineResource<UsersEntry>('users')
