# Node.js Project – API Backend

## Overview

This is a Node.js backend project using **Express.js** to provide a RESTful API for calling LLM Model including openai and azure openai. It includes structured routing, error handling middleware, and supports environment-based configurations. Designed with scalability and clarity in mind.


## Project Structure

├── /src/controllers # Route logic (e.g., chatController.js)
├── /src/middleware # Custom middleware (e.g., errorHandler.js)
├── /src/routers # Express routers (e.g., chatRoute.js)
├── .env.dev # Development environment variables
├── /src/app.js # Express app setup
├── server.js # Entry point
└── README.md

## Install dependencies

npm i or npm install


## Environment variable setup

create .env.dev file
Put your credential
OPENAI_KEY=Your-Open-AI-Key
AZURE_OPENAI_ENDPOINT=resource endpoint
AZURE_OPENAI_ENDPOINT=resource key


## Start Server

npm run dev (starting server with nodemon)
or
npm run start (starting server without nodemon)


## API Endpoints

Local host = http://localhost:3000
/api/open-ai-chatbot : post request for calling openai LLM and getting results
/api/azure-open-ai-chatbot : post request for calling azure openai LLM and getting results
