import React from 'react';
import './RoundInfo.css';
const RoundInfo = ({ children, info }) => {
	return (
		<div className="round-info">
			{children}
			<div className="round-info__info">{info}</div>
		</div>
	);
};
export default RoundInfo;
