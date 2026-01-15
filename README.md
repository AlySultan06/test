# Positfy

A cinematic poster storefront built with Next.js, Prisma, and motion-driven UI.

## Setup

1. Copy the environment example:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Create the database and seed posters:

```bash
npm run prisma:push
npm run seed
```

4. Run the dev server:

```bash
npm run dev
```

## Features

- User registration + login with signed sessions.
- Poster catalog backed by SQLite + Prisma.
- Cart with persistent local storage and multiple payment methods.
- Animated page transitions with a custom cursor effect.
- AI sizing agent that recommends poster sizes based on room dimensions.
