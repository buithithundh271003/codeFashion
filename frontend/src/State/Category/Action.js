import { api } from "../../config/apiConfig";
import { FIND_CATEGORY_FAILURE, FIND_CATEGORY_REQUEST, FIND_CATEGORY_SUCCESS,CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, GET_CATEGORY_FAILURE, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS , DELETE_CATEGORY_FAILURE, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS} from "./ActionType"
import { API_BASE_URL } from "../../config/apiConfig";

export const createCATEGORY = (reqData) => async(dispatch)=>{
    dispatch({type: CREATE_CATEGORY_REQUEST});
    try {
        console.log(reqData)
        const {data} = api.post(
            `${API_BASE_URL}/api/category`,
            reqData
        );
        console.log("kkk",data)
        dispatch({type: CREATE_CATEGORY_SUCCESS, payload:data});

        
    } catch (error) {
        dispatch({
            type: CREATE_CATEGORY_FAILURE,
            payload: error.message
        })
    }
}
export const findCategorys = ()=>async(dispatch)=>{
    dispatch({type: FIND_CATEGORY_REQUEST})
    try {
        const {data} = await api.get('/api/category');
         
        dispatch({type:FIND_CATEGORY_SUCCESS, payload:data});
        console.log(data)
    } catch (error) {
        dispatch({type:FIND_CATEGORY_FAILURE, payload:error.message});
        
    }
}
export const deleteCategory = (categoryId)=>async(dispatch)=>{
    try {
        console.log(categoryId)
        dispatch({type:DELETE_CATEGORY_REQUEST})
        const {data} = await api.delete(`${API_BASE_URL}/api/category/${categoryId}`);
        console.log(data)
        dispatch({type:DELETE_CATEGORY_SUCCESS, payload:categoryId})
    } catch (error) {
    dispatch({type:DELETE_CATEGORY_FAILURE, payload:error.message});
        
    }
}