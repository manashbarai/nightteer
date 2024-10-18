const SkillLists = (state, action) => {

    switch (action.type) {
        case 'LOADING':

            return {
                ...state,
                isLoading: true
            }

        case 'CREATED_USER':

            const { page,total,pages, users, } = action.payload

            return {
                ...state,
                isLoading: false,
                createdUser: {page: page,total: total,pages: pages, users: users}
            }

            case 'STATE':

            return {
                ...state,
                isLoading: false,
                state: action.payload
            }
            case 'DAY_RESULT':
            
            
            return {
                ...state,
                isLoading: false,
                result_day: action.payload
            }
            case 'MONTH_RESULT':
            return {
                ...state,
                isLoading: false,
                result_Month: action.payload
            }
            
            case 'UPDATE_USER':

           

            return {
                ...state,
                isLoading: false,
                createdUser: {  ...state.createdUser,users: action.payload}
            }



        default:
            return state;
    }


    return state;



}


export default SkillLists;