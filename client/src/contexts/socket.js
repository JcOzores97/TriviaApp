import React from 'react';
import io from 'socket.io-client';

const socket = io(); //development server runs in 8080, client in 3000

const SocketContext = React.createContext(socket);

const SocketProvider = ({ children }) => {
	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketProvider, SocketContext };
