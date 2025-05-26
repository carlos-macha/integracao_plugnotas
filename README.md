# PlugNotas Integration

This project aims to facilitate integration with the [PlugNotas](https://plugnotas.com.br) API, allowing for efficient electronic invoice (NF-e) issuing and management using a queue-based architecture.

## Project Structure

The repository is organized into two main folders:

- **`producer-api/`**: API responsible for receiving invoice emission requests and sending them to a message queue.
- **`consumer-worker/`**: Worker that consumes messages from the queue and interacts with the PlugNotas API to issue invoices.

## Technologies Used

- Node.js
- TypeScript
- Express.js (in `producer-api`)
- RabbitMQ or compatible message broker
- Axios (for HTTP requests to PlugNotas)
- dotenv

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- A running instance of RabbitMQ or another message broker
- A valid PlugNotas API key

## Installation

1. Clone the repository:

```bash
git clone https://github.com/carlos-macha/integracao_plugnotas.git

cd integracao_plugnotas/producer-api
npm install

cd ../consumer-worker
npm install
