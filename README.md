# Community Values Experiment

A Next.js-based application for the Ethereum Values Initiative, allowing community members to collaboratively curate and vote on values that are at the heart of Ethereum.

## Overview

This application is part of Consensys' Web3 for All campaign, developed in collaboration with Intuition Systems. It enables the Ethereum community to submit, discuss, and refine the values that define the ecosystem through a stake-based voting mechanism.

## Prerequisites

- Node.js 20.x or later
- npm
- Web3 wallet (e.g., MetaMask) with Linea network configured

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_ENV=
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_GRAPHQL_URL=
NEXT_PUBLIC_CONTRACT_ADDRESS=
NEXT_PUBLIC_PREDICATE_ID=
NEXT_PUBLIC_SUBJECT_ID=
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Features

- View community-proposed values ranked by votes
- Propose new values for the Ethereum community
- Stake ETH to vote for or against values
- Share values on social media platforms

## Technical Architecture

### Frontend

- Built with Next.js 15+
- Single Page Application (SPA) design
- Web3 integration using wagmi hooks

### Backend

- Intuition GraphQL API integration
