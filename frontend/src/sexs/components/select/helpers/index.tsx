import chroma from 'chroma-js'

export const selectStyles = {
  container: (provided, state) => ({
    ...provided,
    width: "100%"
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : state.isFocused && "white",
    backgroundColor: state.isSelected ? "var(--bs-primary)" : state.isFocused && "var(--bs-primary)",
    "&:hover": {
      backgroundColor: "var(--bs-secondary)"
    }
  }),
  control: (provided, state) => ({
    ...provided,
    boxShadow: state.isFocused && "0 0 3px 3px #ccd4ff",
    borderColor: state.isFocused ? "var(--bs-primary)" : provided.borderColor,
    "&:hover": {
      borderColor: "var(--bs-primary)"
    }
  }),
  menu: (base) => ({ ...base, zIndex: 10 }),
  menuPortal: (base) => ({ ...base, zIndex: 10 })
}

export const colourStyles = () => {
  const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10
    }
  })

  return {
    ...selectStyles,
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color)
      return {
        ...styles,
        backgroundColor: isDisabled ? undefined : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : undefined,
        // color: isDisabled ? '#ccc' : isSelected ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black' : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled ? (isSelected ? data.color : color.alpha(0.3).css()) : undefined
        }
      }
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    multiValue: (styles, { data }) => {
      const color = chroma(data.color)
      return {
        ...styles,
        backgroundColor: color.alpha(0.3).css()
      }
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color
    })
  }
}

export const customStyles = {
  container: (base) => ({ ...base, maxWidth: '100%'}),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "var(--bs-gray-700)" : state.isFocused ? "var(--bs-gray-700)" : "white"
  }),
  menu: (base) => ({ ...base, zIndex: 1000, position: "absolute"}),
  menuList: (base) => ({ 
    ...base,
    zIndex: 1002,
    overflow: "auto",
    maxHeight: '25vh',
    scrollY: true
  }),
  menuPortal: (base) => ({ 
    ...base
  }),
  multiValue: (styles) => {
    const color = "var(--bs-gray-700)"
    return {
      ...styles,
      backgroundColor: color
    }
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "white",
    padding: '3px'
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: "white",
    ":hover": {
      backgroundColor: "var(--bs-gray-700)",
      color: "white"
    }
  })
}