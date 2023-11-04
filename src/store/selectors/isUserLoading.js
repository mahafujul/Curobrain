import { selector } from "recoil";
import { userState } from "../atoms/user";

export const isUserloadingState = selector({
    key: 'isUserloadingState',
    get: ({get})=>{
        const state = get(userState);
        return state.isLoading;
    }
})