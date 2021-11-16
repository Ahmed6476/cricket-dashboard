export const reducer = (state, action) => {
    switch (action.type){
        case 'USER_LOGIN' : {
            if( action.payload.name && action.payload.email && action.payload._id  ){
                return {...state, user:action.payload}
            }else{
                console.log(`invalid data in USER_LOGIN reducer`)
            }
        }

        case 'USER_LOGOUT' : {
            return{...state, user:null }
        }

        default : {
            return state
        }
    }
}