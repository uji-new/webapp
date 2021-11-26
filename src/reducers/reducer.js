const initialStore = 0

export function reducer(state = initialState, action){
    switch (action.type) {
        case 'INCREMENTAR':
            return state + 1
        case 'DECREMENTAR':
            return state - 1
        default:
            return state;
    }
}