import React from "react";

export default function Tile(props) {

    function handleOnclick() {
        props.handleTileClick(props.index);
    }

    const getValue = () => {
        if (props.value == 1) {
            return 'x'
        } else if (props.value == -1) {
            return 'o';
        } else {
            return '';
        }
    }

    return (
        <div className={'tile ' + props.className} onClick={handleOnclick}>
            <span>
                {getValue()}
            </span>
        </div>
    );
}
