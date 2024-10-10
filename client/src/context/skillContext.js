import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/skillsReducer'
const AppContext = createContext();


const initialState = {
    isLoading: false,
    isError: false,
    createdUser:{
        page:"",
        total:"",
        pages:"",
        users:[]
    }
   

}
const AppProvider = ({ children }) => {
   


    const [state, dispatch] = useReducer(reducer, initialState)
    const getCurrentDayResult = async (url) => {
        
        dispatch({ type: "LOADING" })
        try {
            const leadsLimit = await axios.get(url)
            dispatch({ type: "CURRENT_DAY_SATTA", payload: leadsLimit.data })
        } catch (error) {

        }
    }
   
   

    const getAllResult = async (url) => {
        dispatch({ type: "LOADING" })
        try {
            const leadsLimit = await axios.get(url)
            dispatch({ type: "ALL_RESULT_SATTA", payload: leadsLimit.data })
        } catch (error) {

        }
    }
    const getCreatedUser = async (url) => {
        dispatch({ type: "LOADING" })
        try {
            const leadsLimit = await axios.get(url)
            console.log(leadsLimit);
            
            dispatch({ type: "CREATED_USER", payload: leadsLimit.data })
        } catch (error) {
            console.log(error);
            
        }
    }

   
    const updatedArray = (arry, type) => dispatch({ type: type, payload: arry })


    useEffect(() => {
        
        getCreatedUser(`${process.env.REACT_APP_API_URL}api/user/all?role=2&page=1&limit=10`)



    }, [])





    return <AppContext.Provider value={{ ...state,updatedArray }}    >
        {children}
    </AppContext.Provider>

}


const useGlobalSkills = () => {
    return useContext(AppContext)
}


export { AppProvider, AppContext, useGlobalSkills }