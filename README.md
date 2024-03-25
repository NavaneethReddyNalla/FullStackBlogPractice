# Features
- A user can either sign up for the app as a normal user or an Author.
- User can read all the articles written by all the authors registered on the app.
- Users can also comment on articles.
- Authors can read all the articles written by them.
- Authors can write new articles or edit existing articles.
- Authors can also delete their articles.

# Future Improvements
- An Admin panel will be implemented where the admin can block individual user or author.
- An admin can also delete certain articles if deemed necessary.

# How to set things up
### 1. MongoDB
- MongoDB Server has to be installed for the project to function.
- Install the MongoDB server (Default settings recommended)
###  2. Clone the Repository
- Git CLI (not GitHub) needs to be installed locally in the computer.
- Open the Git bash terminal in the folder you want to clone the repo.
- Run the command `git clone https://github.com/NavaneethReddyNalla/FullStackBlogPractice.git`
- Once the command is ran, a new folder will be created with the name `FullStackBlogPractice`.
- Navigate to that folder for further setup.

  OR
- If you don't have Git, you can also download the zip file of this Repository by clicking the `Code<>` button and hitting `download zip` option.
- Once downloaded, extract the zip in the folder of your choice and navigate to the root folder (The Project folder where you can see the two folders `frontend` and `backend`).
### 3. Install the necessary node packages
- NodeJS should be installed locally on the system.
- Open up a terminal in the `backend` folder. Run the command `npm install` to install all the backend dependencies.
- Open up a terminal in the `frontend` folder. Run the command `npm install` to install all the frontend dependencies.
### 4. Creating the environment variables
- Create a new file named `.env` in the `backend` folder.
- Open the file and add the environment variables.
- The necessary environment variables for the project functioning are `PORT`, `DB_URL` AND `SECRET_KEY`.
- `PORT` is the port number on which the server will be running.
- `DB_URL` is the connection string of the mongodb server.
- `SECRET_KEY` is the key that is used by JWT to create unique tokens.
- ### Example `.env` file:
    ```
    PORT = 5000
    DB_URL = mongodb://localhost:27017
    SECRET_KEY = abcdef
    ```
### 5. Building the Frontend App
- Open up a terminal in the `frontend` folder.
- Run the command `npm run build`.
- Wait until the build is finished. Once finished, you'll have a new folder in the `frontend` directory named build.
### 6. Hosting the server locally
- Open up a terminal in the `backend` folder.
- Run the command `node server` if you want to test the app or the command `node --watch server` if you want to develop some features of the app.
- Once you get the success message on the terminal. Open up a web browser and type the localhost address in the address bar.
- The localhost address for the app will be `http://localhost:<PORT>/`. Where `<PORT>` should be replaced by the port number mentioned in the `.env` file.
- Now the app should've opened. Feel free to test things out. :)
