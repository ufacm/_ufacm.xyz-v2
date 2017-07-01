# ufacm.xyz Version 2

## Objective

The UFACM webapp's objectives are to
* Inform people interested in our organization of what we do
* Provide an appealing page to display our sponsors
* Centralize UFACM's operations on one webapp

# Installation

1. Install Node.js for your operating system
2. Use nvm or n to change your Node.js version to 8.1.2

  ```
  (sudo) npm install -g nvm
  nvm install 8.1.2
  nvm use 8.1.2
  ```

  or

  ```
  (sudo) npm install -g n
  (sudo) n 8.1.2
  ```

  (Macs tend to use sudo less)

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
1. Install direnv. This will vary upon your OS. For Homebrew on OS X/macOS, installation is:

  ```
  brew install direnv
  ```

  For Ubuntu, use the following:

  ```
  sudo apt-get install direnv
  ```

  If you are using zsh, add the following to your `.zshrc`:

  ```
  https://github.com/direnv/direnv
  ```

  Refer to the following for more information: [direnv](https://github.com/direnv/direnv)
  
2. Duplicate the .envrc.sample file and name it .envrc. 

  ```
  cp .envrc.sample .envrc
  ```

3. Set the values in your `.envrc`. Most of these should be fine, but you will need to specify your own MongoDB. You can either host a sandbox on (mlab)[https://mlab.com/] or host a server on your machine. Ensure that you have write access to your database (i.e. do not make a read-only user).

(I'll make a Dockerfile if I ever get around to it)

4. Allow the file on direnv

  ```
  direnv allow
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

## List of things to do

### High priority

- [ ] Complete frontend
- [ ] Get functioning database connection for users and events
- [ ] Get operating resume repo
- [ ] Make event sign in page

### Others

- [ ] GitHub OAuth
- [ ] Tagging resumes
- [ ] User profiles
- [ ] SIG budget requester
- [ ] Event document repo
- [ ] Fishbowl reservation page (Google Calendar integration)
- [ ] Extensive testing
- [ ] Bernie's library checkout system
- [ ] Feedback form
- [ ] Newletter blaster
- [ ] MeetingMinutes meeting timer
- [ ] iptable configuration
- [ ] Text-to-speech Fishbowl reservation warning
- [ ] User management panel
- [ ] Slack user creation

### List of Pages to Build

- [ ] Events
- [ ] Contact us
- [ ] Our Staff
- [ ] SIGs
- [ ] Login
- [ ] Sign Up
- [ ] User dashboard
- [ ] User profile
- [ ] Resume repo
