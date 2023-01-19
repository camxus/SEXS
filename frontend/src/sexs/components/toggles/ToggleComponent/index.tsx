import React from "react";
import "./styles.css"

function Toggle(props) {
  const {
    text,
    size = "default",
    checked,
    disabled,
    onChange,
    offstyle = "bg-white",
    onstyle = "bg-primary"
  } = props;

  let displayStyle = checked ? onstyle : offstyle;
  return (
    <>
      <label className="border-primary rounded-pill" 
      // style={{borderRadius: "100px"}}
      >
        <span className={`${size} switch-wrapper`}>
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={e => onChange(e)}
          />
          <span className={`${displayStyle} switch`}>
            <span className="switch-handle border-primary" />
          </span>
        </span>
        {text && <span className="switch-label">{text}</span>}
      </label>
    </>
  );
}

export default Toggle;
