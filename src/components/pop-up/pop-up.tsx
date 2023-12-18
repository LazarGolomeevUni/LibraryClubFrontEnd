import { MouseEventHandler } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../pop-up/pop-up.css'
import Button from '@mui/material/Button/Button';

const PopUp = (props: {
    trigger: JSX.Element;
}) => {

    const popUpBody: any = (close: () => void) => {
        return (
            <div className="post-contaier">
                <div className="profile-image"></div>
                <div className="post-content">

                    <input
                        type="text"
                        className="create-header"
                    />
                    <textarea
                        className="create-text"
                    />

                    <Button id="post-button" onClick={() => {
                            close();
                        }}>Post</Button>
                </div>
            </div>
        );
    };
    return (
        <Popup
            trigger={props.trigger}
            modal
            nested
        >
            {popUpBody}
        </Popup>);

}
export default PopUp;