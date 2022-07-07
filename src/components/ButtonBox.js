// The ButtonBox component, similarly to the Wrapper component, will be the frame for the children — only this time for the Button components.



import "./ButtonBox.css";

function ButtonBox({children}) {
  return(
    <div className="buttonBox">
      {children}
    </div>
  )
}

export default ButtonBox;