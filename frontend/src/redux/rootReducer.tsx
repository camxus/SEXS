import layout from "./layout"
import User from "./User"

const rootReducer = {
    layout,
    ...User
}

export default rootReducer