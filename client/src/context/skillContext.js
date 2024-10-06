import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/skillsReducer'
const AppContext = createContext();


const initialState = {
    isLoading: false,
    isError: false,
   

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

   
    // const updatedAdArray = (arry, type) => dispatch({ type: type, payload: arry })


    useEffect(() => {
        




    }, [])





    return <AppContext.Provider value={{ ...state, updatedAdArray }}    >
        {children}
    </AppContext.Provider>

}


const useGlobalSkills = () => {
    return useContext(AppContext)
}


export { AppProvider, AppContext, useGlobalSkills }