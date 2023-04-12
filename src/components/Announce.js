import { useEffect } from 'react';
import { VscClose, VscCircleLargeOutline } from 'react-icons/vsc';

export default function Announce(props) {
	const player = () => {
		let player;
		switch (props.player) {
			case '1':
				player = <VscClose className='x-icon' />;
				break;
			case '-1':
				player = <VscCircleLargeOutline className='o-icon' />;
				break;
			default:
				player = '';
				break;
		}

		return player;
	};

	if (props.won === true && props.draw === false) {
		return (
			<div className={'alert ' + (props.won === true ? 'show' : 'hide')}>
				Player {player()} has won the game!
			</div>
		);
	} else if (props.draw === true && props.won === false) {
		return (
			<div className={'alert ' + (props.draw === true ? 'show' : 'hide')}>
				Game draw. Both NOOB!
			</div>
		);
	} else {
		return '';
	}
}
