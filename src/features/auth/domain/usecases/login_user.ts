import { authRepository } from "../../data/repositories/auth_repository"



export const loginUser = async (
    email: string,
    password: string
) => {

    if (!email || !password) {
        throw new Error('Email and Password required')
    }

    const response = await authRepository.login(email, password)

    return response
}