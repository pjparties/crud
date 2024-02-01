# CRUD Project using SQL API

This is the README file for the CRUD REST API using SQL database. This project aims to demonstrate basic CRUD (Create, Read, Update, Delete) operations using a SQL database.

## Prerequisites

Before running this project, make sure you have the following prerequisites installed:

- SQL database (SQLite is used here)
- Node and NPM installed (Node.js with Express)

## Installation

1. Clone the repository:

  ```bash
  git clone https://github.com/pjparties/crud.git
  ```

2. Install the required dependencies:

  ```bash
  cd crud-project
  npm i
  ```

3. Configure the database connection:

  Open the `pacakage.json` file and update the database connection details according to your setup.
  
  ```bash
  npx knex migrate:latest
  ```

## Usage

To run the CRUD project, execute the following command:

```bash
npm run dev
```
