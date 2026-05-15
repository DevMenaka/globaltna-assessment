# GlobalTNA - Full-Stack Developer Intern Assessment

A Mini Service Request Board where homeowners can post service requests and tradespeople can browse, view details, update statuses, and manage them. 

This project was built as a technical assessment for the Full-Stack Developer Intern role at GlobalTNA.

## Tech Stack
- **Frontend:** Next.js (App Router), React, Tailwind CSS (Dark Minimalist / Glassmorphism UI)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose ODM

## Features

- View a list of all service requests.
- Filter requests by category (Plumbing, Electrical, Painting, Joinery).
- Create a new service request with client-side and backend validation.
- View detailed information about a specific request.
- Update the status of a request (Open, In Progress, Closed).
- Delete a service request.

## Setup Instructions

Follow these steps to run the project locally on your machine.

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- A MongoDB cluster (Atlas) or a local MongoDB instance.

### 1. Clone the Repository
```bash
git clone https://github.com/DevMenaka/globaltna-assessment.git
cd globaltna-assessment

2. Backend Setup
Navigate to the backend directory, install dependencies, and set up your environment variables.

cd backend
npm install
Create a .env file in the root of the backend directory and add the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string_here
Run the backend server:

npm run dev
The backend API will run on http://localhost:5000

3. Frontend Setup
Open a new terminal, navigate to the frontend directory, install dependencies, and set up your environment variables.

cd frontend
npm install
Create a .env.local file in the root of the frontend directory and add the following variable:

NEXT_PUBLIC_API_URL=http://localhost:5000/api/jobs
Run the frontend development server:

npm run dev
The frontend application will be accessible at http://localhost:3000

💡 A Note on Technology Choice
To ensure a fully functional, clean, and bug-free delivery within the restricted timeframe, I developed this project using JavaScript. However, I am fully aware of the benefits of TypeScript (type safety, enhanced developer experience) and am completely comfortable adapting to it for daily production code.

👨‍💻 Author
Siriwardhanage Lahiru Gihan Menaka.







