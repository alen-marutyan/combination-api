# Combination Generation API

This API generates combinations from a list of items and stores them in a MySQL database. Each combination adheres to a rule where items with the same starting letter cannot be combined. It is built with Node.js and MySQL, using MySQL transactions for consistency.

## Requirements

- **Node.js**: v18.18.0
- **MySQL**: v8.0.0

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/alen-marutyan/combination-api.git
cd combination-api
```

### 2. Start the Server

```bash
npm start
```
