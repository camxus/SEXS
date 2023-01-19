import Creatable from "react-select/creatable"
import { selectStyles } from "./helpers"

export default function CreatableComponent (props) {
    return (
        <Creatable {...props} styles={selectStyles}></Creatable>
    )
}
  