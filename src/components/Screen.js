// The Screen component will be the top section child of the Wrapper component, and its purpose will be to display the calculated values.
// Textfit had to be installed using <npm i react-textfit --legacy-peer-deps >

import { Textfit } from 'react-textfit';
import './Screen.css';

function Screen({value}) {
  return (
    <Textfit className="screen" mode="single" max={70}>
      {value}
    </Textfit>
  )
}

export default Screen;