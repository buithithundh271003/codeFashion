import { FIND_CATEGORY_FAILURE, FIND_CATEGORY_REQUEST, FIND_CATEGORY_SUCCESS,CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, GET_CATEGORY_FAILURE, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS,DELETE_CATEGORY_FAILURE, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS } from "./ActionType";

const initialState = {
    categorys : [],
    category : [],
    error: null,
    loading: false
}
export const categoryReducer = (state=initialState, action)=>{
    switch (action.type) {
        case CREATE_CATEGORY_REQUEST:
        case GET_CATEGORY_REQUEST:
            return{
                ...state,
                loading: true,
                error: null
            }
        case CREATE_CATEGORY_SUCCESS:
            return{
                ...state,
                loading: false,
                category: action.payload,
                error: null
            }
        case CREATE_CATEGORY_FAILURE:
        case GET_CATEGORY_FAILURE:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                categorys: action.payload,
                error: null
            }
            
        case DELETE_CATEGORY_SUCCESS:
                    return{
                        ...state,
                        loading:false,
                        error:null,
                        categorys: state.categorys.map.filter((item)=>item._id!==action.payload)
                    } 
        case FIND_CATEGORY_REQUEST:
            return {...state, loading: true, error: null}
                // case FIND_CATEGORY_BY_ID_SUCESS:
                //     return {...state, loading:false, error:null, category:action.payload}
        case FIND_CATEGORY_SUCCESS:
            return {...state, loading:false, error:null, categorys:action.payload}
                // eslint-disable-next-line no-duplicate-case
                // case FIND_CATEGORY_BY_ID_SUCESS:
                //     return {...state, loading:false, category:action.payload, error: null}
        case FIND_CATEGORY_FAILURE:
                // case FIND_CATEGORY_BY_ID_FAILURE:
                    // return {...state, loading: false, error: action.payload}    
    
        default:
            return state;
    }
}