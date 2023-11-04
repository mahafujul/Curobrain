import { selector } from "recoil";
import { courseState } from "../atoms/course";



export const courseIsLoading = selector({
    key: 'courseIsLoadingState',
    get: ({get})=>{
        const state = get(courseState)
        return state.isLoading
    }
})

export const courseTitle = selector({
    key: 'courseTitleState',
    get: ({get})=>{
        const state = get(courseState);
        if(state.course){
            return state.course.title
        }
        return "";
    }
})

export const courseDescription = selector({
    key: 'courseDescriptionState',
    get: ({get})=>{
        const state = get(courseState);
        if(state.course){
            return state.course.description
        }
        return "";
    }
})


export const coursePrice = selector({
    key: 'coursePriceState',
    get: ({get})=>{
        const state = get(courseState);
        if(state.course){
            return state.course.price;
        }
        return 0;
    }
})

export const courseImg = selector({
    key: "courseImgState",
    get: ({get})=>{
        const state = get(courseState);
        if(state.course){
            return state.course.imgUrl;
        }
        return ""
    }
})

export const coursePublished = selector({
    key: 'coursePublishedState',
    get: ({get})=>{
        const state = get(courseState);
        if(state.course){
            return state.course.published
        }
        return false
    }
})
//courseDetails selector
export const courseDetails = selector({
    key: "courseDetailsState",
    get: ({get})=>{
        const state = get(courseState);
        return state.course;
    }
})