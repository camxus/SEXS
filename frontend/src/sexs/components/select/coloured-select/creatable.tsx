import Creatable from "react-select/creatable"
import { colourStyles } from "../helpers"

export default function ColouredCreatableComponent (props) {
    return (
        <Creatable {...props} styles={colourStyles}></Creatable>
    )
}
  