const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io; // Declare a variable to hold the socket.io instance

const initializeSocket = (server) => {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        }
    });

    io.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
            else if(userType === 'captain'){
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            if (!userId || !location) {
                socket.emit('error', { message: 'User ID and location are required' });
                return;
            }

            if (!location.ltd || !location.lng) {
                socket.emit('error', { message: 'Location must include latitude and longitude' });
                return;
            }

            if (typeof location.ltd !== 'number' || typeof location.lng !== 'number') {
                socket.emit('error', { message: 'Latitude and longitude must be numbers' });
                return;
            }

            if (location.ltd < -90 || location.ltd > 90 || location.lng < -180 || location.lng > 180) {
                socket.emit('error', { message: 'Invalid latitude or longitude values' });
                return;
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });

        // Additional event listeners can be added here
    });
};

const sendMessageToSocketId = (socketId, message) => {
    if (io) {
        io.to(socketId).emit(message.event, message.data); // Send a message to the specified socket ID
    } else {
        console.error('Socket.io is not initialized.');
    }
};

module.exports = { initializeSocket, sendMessageToSocketId }; 