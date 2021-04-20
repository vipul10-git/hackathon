import React from 'react';
import '../assets/css/popup.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
const Popup = (props) =>{
    return(
        <div className="popUp">
            <div className='hoverDiv'>
                <HighlightOffIcon onClick={props.close} id='closeIcon' />
                {props.children}  
            </div>
        </div>
    )
}

export default Popup;