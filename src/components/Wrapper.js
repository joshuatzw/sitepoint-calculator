// The Wrapper component will be the frame, holding all the children components in place. It will also allow us to center the whole app afterward.
// I'm guessing children = props.children 

import './Wrapper.css';

function Wrapper({children}) {
  return(
    <div className='wrapper'>
      {children}
    </div>
  )
}

export default Wrapper;