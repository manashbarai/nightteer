const SkillLists = (state, action) => {

    switch (action.type) {
        case 'LOADING':

            return {
                ...state,
                isLoading: true
            }
      
            

        default:
            return state;
    }


    return state;



}


export default SkillLists;