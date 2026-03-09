import { supabase } from "../../core/config/supabase_client"

export const authRepository = {

    async login(email: string, password: string) {

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            throw new Error(error.message)
        }

        return data
    },

    async signUp(name: string, email: string, password: string) {

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: name
                }
            }
        })

        if (error) {
            throw new Error(error.message)
        }

        return data
    },



}