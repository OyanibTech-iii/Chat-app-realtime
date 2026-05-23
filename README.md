# WebSocket Chat Application

A minimalist, real-time chat application built with Node.js and the native WebSocket API. This project demonstrates a clean implementation of full-duplex communication between a server and multiple clients without the overhead of heavy frameworks.

## Features

- Real-time message broadcasting to all connected clients.
- System notifications for user join events.
- Responsive and modern user interface.
- Distinctive styling for sent and received messages.
- Automatic scrolling to the latest message.

## Technical Stack

- **Backend**: Node.js, Express (for static file serving), and `ws` (native WebSocket library).
- **Frontend**: Vanilla JavaScript, HTML5, and CSS3.

## Prerequisites

Before running this application, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository or download the source code.
2. Navigate to the server directory:
   ```bash
   cd server
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server from the `server` directory:
   ```bash
   npm start
   ```
2. Once the server is running, you will see a message: `Server is listening on http://localhost:3000`.
3. Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```
4. To test the real-time functionality, open the same URL in multiple browser tabs or windows.
5. Enter a username to join the chat and start messaging.

## Project Structure

- `server/server.js`: The entry point for the Node.js application, handling HTTP requests and WebSocket logic.
- `public/index.html`: The main user interface structure.
- `public/style.css`: Modern styling and layout definitions.
- `public/script.js`: Client-side WebSocket implementation and UI logic.

## License

This project is open-source and available under the ISC License.
