import { useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { ErrorState, SignUpForm } from "../constants/auth_constants";
import { validateSignUp } from "../data/repositories/auth_validation";
import { signUpUser } from "../domain/usecases/sign_up_user";

export const useSignUp = () => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ErrorState>({});
    const [errorMsg, setErrorMsg] = useState("");

    const signUp = async (data: SignUpForm) => {

        const validationErrors = validateSignUp(data);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return false;
        }

        const state = await NetInfo.fetch();

        if (!state.isConnected) {
            setErrorMsg("No internet connection");
            return false;
        }

        try {
            setLoading(true);

            await signUpUser(
                data.name,
                data.email,
                data.password
            );

            return true;

        } catch (e: any) {

            setErrorMsg(e.message);
            return false;

        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        errors,
        errorMsg,
        signUp
    };
};