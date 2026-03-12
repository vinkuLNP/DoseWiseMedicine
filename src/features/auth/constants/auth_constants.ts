export type Badge = {
    emoji: string
    label: string
}

export const BADGES: Badge[] = [

    { emoji: "⭐", label: "7-Day" },

    { emoji: "🌟", label: "30-Day" },

    { emoji: "💎", label: "100-Day" },

    { emoji: "👑", label: "Legend" }

];

export const BLOB_DATA = [

    {
        size: 190,
        backgroundColor: "rgba(196,181,253,0.30)",
        top: -40,
        right: -45
    },

    {
        size: 160,
        backgroundColor: "rgba(251,207,232,0.30)",
        bottom: 120,
        left: -35
    },

    {
        size: 130,
        backgroundColor: "rgba(254,215,170,0.30)",
        bottom: -10,
        right: 20
    }

];
export const SIGN_UP_FIELDS = {
    NAME: "name",
    EMAIL: "email",
    PASSWORD: "password",
    CONFIRM_PASSWORD: "confirmPassword",
} as const;

export const SIGNUP_LIMITS = {
    NAME_MAX: 50,
    EMAIL_MAX: 100,
    PASSWORD_MAX: 25,
};
export type SignUpFieldName =
    (typeof SIGN_UP_FIELDS)[keyof typeof SIGN_UP_FIELDS];

export const LOGIN_FIELDS = {
  EMAIL: "email",
  PASSWORD: "password",
} as const;

export type LoginFieldName =
  (typeof LOGIN_FIELDS)[keyof typeof LOGIN_FIELDS];

export type LoginErrors = Partial<Record<LoginFieldName, string>>;

export interface LoginForm {
    email: string;
    password: string;
}

export type ErrorState = Partial<
    Record<SignUpFieldName, string>
>;

export interface SignUpForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}