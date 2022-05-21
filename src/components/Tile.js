import React from 'react';
import { VscClose, VscCircleLargeOutline } from 'react-icons/vsc';

export default function Tile(props) {

    function handleOnclick() {
        props.handleTileClick(props.index);
    }

    const getValue = () => {
        if (String(props.value) === String(1)) {
            return <VscClose />
        } else if (String(props.value) === String(-1)) {
            return <VscCircleLargeOutline />
        } else {
            return '';
        }
    }

    return (
        <div className={'tile ' + props.className} onClick={handleOnclick}>
            <div>
                {getValue()}
            </div>
        </div>
    );
}
