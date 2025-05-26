# PlugNotas Integration

This project aims to facilitate integration with the [PlugNotas](https://plugnotas.com.br) API, allowing for efficient electronic invoice (NF-e) issuing and management using a queue-based architecture.

## Project Structure

The repository is organized into two main folders:

- **`producer-api/`**: An API responsible for receiving invoice requests and pushing them into a message queue.
- **`consumer-worker/`**: A background worker that consumes messages from the queue and communicates with the PlugNotas API to issue the invoices.

## Technologies Used

- Node.js
- TypeScript
- Express.js (in `producer-api`)
- RabbitMQ (or compatible message broker)
- Axios (for HTTP requests)
- dotenv
- Yarn

## Prerequisites

- Node.js (v14 or newer)
- Yarn
- A running RabbitMQ instance
- A valid PlugNotas API key

## Installation and run

```bash
git clone https://github.com/carlos-macha/integracao_plugnotas.git

cd integracao_plugnotas/producer-api
yarn install
yarn dev

cd ../consumer-worker
yarn install
yarn dev
