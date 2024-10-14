import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/skillsReducer'
import {getCurrentMonth,getCurrentDay} from "../util/getCurrentMOnth";
const AppContext = createContext();
const currentMonth=getCurrentMonth()
const currentDay=getCurrentDay()

const initialState = {
    isLoading: false,
    isError: false,
    state:[],
    result_Month:[],
    result_day:[],
    createdUser:{
        page:"",
        total:"",
        pages:"",
        users:[]
    }
   

}
const AppProvider = ({ children }) => {
   


    const [state, dispatch] = useReducer(reducer, initialState)
    
   
    const getResultDayAccording = async (url,state) => {
        dispatch({ type: "LOADING" })
        const ids = state.map(({ id }) => Number(id));

        try {
            const result = await axios.post(url,{ids})
            dispatch({ type: "DAY_RESULT", payload: result.data })
        } catch (error) {
            console.log(error);
            
        }
    }

  
    const getCreatedUser = async (url) => {
        dispatch({ type: "LOADING" })
        try {
            const leadsLimit = await axios.get(url)
            
            
            dispatch({ type: "CREATED_USER", payload: leadsLimit.data })
        } catch (error) {
            console.log(error);
            
        }
    }
    const getState = async (url) => {
        dispatch({ type: "LOADING" })
        try {
            const state = await axios.get(url)
            dispatch({ type: "STATE", payload: state.data })
           if( state.status===200)getResultDayAccording(`${process.env.REACT_APP_API_URL}api/result/month/day/2024/${currentMonth}/${currentDay}`,state.data)

           
        } catch (error) {
            console.log(error);
            
        }
    }

    const getResultMonthAccording = async (url) => {
        dispatch({ type: "LOADING" })
        try {
            const result = await axios.get(url)
            dispatch({ type: "MONTH_RESULT", payload: result.data })
        } catch (error) {
            console.log(error);
            
        }
    }
   

   
    const updatedArray = (arry, type) => dispatch({ type: type, payload: arry })


    useEffect(() => {
       
      
      
        getCreatedUser(`${process.env.REACT_APP_API_URL}api/user/all?role=2&page=1&limit=10`)
        getState(`${process.env.REACT_APP_API_URL}api/state`)
        getResultMonthAccording(`${process.env.REACT_APP_API_URL}api/result/month/2024/${currentMonth}`)



    }, [])





    return <AppContext.Provider value={{ ...state,updatedArray }}    >
        {children}
    </AppContext.Provider>

}


const useGlobalSkills = () => {
    return useContext(AppContext)
}


export { AppProvider, AppContext, useGlobalSkills }