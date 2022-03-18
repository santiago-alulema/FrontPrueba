export type AuthState = {
    token: string,
    firstName: string,
    lastName: string
}

export type AuthAction =
    | { type: 'REHYDRATE', payload: AuthState }

export const reducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "REHYDRATE":
            const rehydratedState = action.payload;
            return { ...state, ...rehydratedState };
        default:
            throw new Error(`Unknow action: ${JSON.stringify(action)}`);
    }
}