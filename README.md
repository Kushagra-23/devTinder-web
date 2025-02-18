#DevTinder

- Created a Vite + React project
- Remove unecessary code and created a Hello World app
- Install Tailwind CSS
- Install Daisy UI
- Add NavBar component to App.tsx
- Create a NavBar.tsx separate component file
- Install react router dom
- Create Browser Router > Routes > Route=/ Body > RouteChildren
- Create an Outlet in your Body Component
- Create a footer
- Create Login page
- Install axios
- Install cors in backend and add middleware with configurations : origin, crendentials: true
- Whenever you're making API call so pass axios => { withCredentials: true }
- Install redux toolkit and react-redux
- Configure store => Provider => create slice => add reducer to store
- Login and see your data is coming properly in store
- NavBar should updated as soon as user logs in
- Refactor our code to add constants file + create components folder
- You should not be access other routes without login
- If token is not present, redirect user to login page
- Logout feature
- Get the feed and add in store
- Build the user card on feed
- Edit profile with save functionality added
- See all my connections
- See all my connections requests
- Feature - Accept/Reject connection request
- Send/Ignore the user card from the feed
- Sign up user added
- Bug fixes



Body 
    NavBar
    Route=/ => Feed
    Route=/connections => Connections
    Route=/profile => Profile


Deployment

- Sign up on AWS
- Launch instance
- chmod 400 <secret>.pem
- connected with ssh command
- install node version with same node version for project 
	- curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
	- close terminal
	- restart terminal
	- nvm install <node_version>
- git clone repo
- Frontend 
		- npm install => dependencies install
		- npm run build
		- sudo apt update - to update system dependencies
		- sudo apt install nginx - to install nginx
		- sudo systemctl start nginx
		- sudo systemctl enable nginx
		- Copy code from dist(build files) to /var/www/html/
		- sudo scp -r dist/* /var/www/html/
		- enable port 80 of your instance
		- access frontend using Public IPv4 address of your instance