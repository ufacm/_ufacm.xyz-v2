# ufacm.xyz Version 2

## Objective

The UFACM webapp's objectives are to
* Inform people interested in our organization of what we do
* Provide an appealing page to display our sponsors
* Centralize UFACM's operations on one webapp

# Installation

1. Install Node.js for your operating system
2. Use nvm or n to change your Node.js version to 7.10.0

  ```
  (sudo) npm install -g nvm
  nvm install 7.10.0
  nvm use 7.10.0
  ```

  or

  ```
  (sudo) npm install -g n
  (sudo) n 7.10.0
  ```

3. Clone this repo and change directories into it.
```
git clone https://github.com/ufacm/ufacm.xyz-v2
cd ufacm.xyz-v2
```
4. Run the following command to install all dependencies
  ```
  npm install
  ```

## Setup
1. Duplicate the process.env.sample file and name it process.env. If you would like to use a specific IP address and/or port for development, change the values in this file. Otherwise leave the values as they are.
  ```
  cp process.env.sample process.env
  ```

## Starting the server
1. Run the following command
  ```
  npm start
  ```
2. Your command line should print out the address to view the website.
```
Server running at http://localhost:8080
```
