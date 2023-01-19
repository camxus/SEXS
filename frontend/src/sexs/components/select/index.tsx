import Select from "react-select"
import { selectStyles } from "./helpers"
  
export default function SelectComponent(props) {
    return (
        <Select {...props} styles={selectStyles}></Select>
    )
}
  