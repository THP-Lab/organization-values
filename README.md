# Organization Values Platform Framework

A generic Next.js-based framework allowing any organization to create their own platform to define, discuss, and vote on values that matter to them.

## Overview

This project is a fork of Consensys' "Community Values Experiment," redesigned as a configurable framework that any organization can easily adapt. It enables communities to submit, discuss, and refine the values that define their ecosystem through a stake-based voting mechanism.

## Prerequisites

- Node.js 20.x or later
- npm
- Web3 wallet (e.g., MetaMask) with your chosen network configured

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_ENV=
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_GRAPHQL_URL=
NEXT_PUBLIC_CONTRACT_ADDRESS=
NEXT_PUBLIC_PREDICATE_ID=
NEXT_PUBLIC_SUBJECT_ID=
NEXT_PUBLIC_PRIVY_APP_ID=
```

## Customization for your organization

### 1. Basic Configuration

Modify the `src/config/organization-config.tsx` file to customize:
- Organization name, tagline, and description
- Homepage content
- FAQ and informational sections
- External links and resources

### 2. Visual Resources

Place your visual assets in the `public/images/` folder:
- Main logo: `public/images/logo.svg`
- Alternative logo: `public/images/logo-alt.svg`
- Favicon: `public/images/favicon.ico`
- Hero image: `public/images/hero.png`
- Step icons: `public/images/steps/*.svg`

### 3. Contracts and Blockchain Integration

Configure your smart contracts through environment variables and the `contracts` section of the configuration file.

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
- Propose new values for your organization
- Stake ETH to vote for or against values
- Share values on social media platforms
- Fully customizable and configurable interface

## Technical Architecture

### Frontend

- Built with Next.js 15+
- Single Page Application (SPA) design
- Web3 integration using wagmi hooks
- Centralized configuration system for easy customization

### Backend

- GraphQL API integration
- Configurable smart contracts

## How to adapt this framework

1. Fork this repository
2. Customize the configuration file `src/config/organization-config.tsx`
3. Replace the visual resources in the `public/images/` folder
4. Deploy your customized instance

## Contribution

Contributions to improve this framework are welcome. Feel free to open issues or pull requests.
