# SplitFriend

**SplitFriend** simplifies group expense management, allowing users to create groups and add team members (without invitations required for logged-in members). Each team member can add expenses, and the dashboard calculates the balance to show who owes whom. It is an effortless bill-splitting solution for groups, perfect for friends, roommates, and teams.

## Features

- Create and manage groups for splitting expenses.
- Add members without needing invitations (signed-up users can be added instantly).
- Record expenses, and the app automatically calculates the balance.
- Displays who owes whom, making settling expenses easy and fair.
- User-friendly interface with a clean and minimal design.

## Tech Stack

| Technology      | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| **Next.js**     | Used for building the frontend and routing (App Router).           |
| **Supabase**    | Backend as a service for managing the database and authentication. |
| **React Query** | Manages the state and data fetching logic for API calls.           |
| **ShadCN UI**   | Provides pre-built UI components for a modern and cohesive design. |

## Installation and Setup

### Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (version 16+)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager

### Steps to Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/splitfriend.git
   cd splitfriend
   ```

2. **Install dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Create the `.env.local` file**

   In the root directory, create a `.env.local` file and add your Supabase credentials:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**

   Once everything is set up, run the development server:

   ```bash
   npm run dev
   ```

   Or using yarn:

   ```bash
   yarn dev
   ```

   The app will be running on [http://localhost:3000](http://localhost:3000).

5. **Open your browser**

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the app.

### Credits

- Built using [Next.js](https://nextjs.org/), [Supabase](https://supabase.io/), and [ShadCN UI](https://shadcn.dev/).
