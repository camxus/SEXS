import Select from "react-select"
import { colourStyles } from "../helpers"
  
export default function ColouredSelectComponent(props) {
    return (
        <Select {...props} styles={colourStyles()}></Select>
    )
}
  