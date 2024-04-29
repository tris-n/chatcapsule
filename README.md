<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="left">
  <a href="https://github.com/tris-n/chatcapsule">
    <img src="readme/images/logo.png" alt="Logo" width="74" height="74">
  </a>
  
<!-- ## project_title -->
<h3 align="left" style="font-size: 24px">ChatCapsule</h3>

  <p align="left">
	A platform that allows you to save, summarize, and tag your ChatGPT conversations for easy searchability and future reference.
    <br />
    <br />
    <a href="https://portfolio-chatcapsule-nextjs14.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/tris-n/chatcapsule/issues">Report Bug</a>
	<br />
	<br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#built-with">Built With</a>
      <ul>
        <li><a href="#coretechnologies">Core Technologies</a></li>
        <li><a href="#database">Database</a></li>
        <li><a href="#authentication">Authentication</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#deployment-notes">Deployment Notes</a></li>
      </ul>
    </li>
    <li>
		<a href="#usage">Usage</a>
	</li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
  <br />



<!-- ABOUT THE PROJECT -->
## About The Project

ChatCapsule is a versatile tool that allows users to save, manage, and search chat interactions. Users can create a capsule for each conversation, summarizing the chat and tagging it with relevant keywords for easy retrieval. This project was designed to facilitate learning and demonstrate capabilities in Typescript, Next.js, and Tailwind CSS.

![multiplecapsules]

### Features

* CRUD operations for managing chat capsules.
* Integration with Google OAuth for user authentication via Next-Auth.
* Data persistence using MongoDB with Mongoose.
* Responsive design with different navigation layouts for desktop and mobile.
* Utilizes App based routing in a Next.js environment.
* Secure login and session management, with automatic redirection for unauthenticated users.

## Built With

### Core Technologies
* TypeScript - Adds static typing to JavaScript, enhancing code quality and development experience.
* Next.js 14 - Acts as the primary framework, handling both client-side and server-side rendering, routing, and API endpoints within a unified architecture.
* Tailwind CSS - Provides utility-first CSS framework for rapidly building custom designs.

### Database
* MongoDB - Utilized for storing and managing user data and chat capsules, with interactions handled through Mongoose for data modeling.
* Mongoose - Facilitates data modeling and database interaction with MongoDB.

### Authentication
* Google OAuth via Next-Auth - Manages secure user authentication processes, integrating easily with Google accounts for user login and session management.



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

1. Create a Google OAuth API key at [Google Cloud Console](https://console.cloud.google.com/projectcreate).
	- Create a `New Project`.
	- In `APIs and Services`, select `OAuth Consent Screen` and then `Create`.
	- In `App Information` add your `App name`, `User support email`, and `Developer contact information`.
	- Add `http://localhost:3000` to `Authorized Domain 1` and then `Save and Continue`.
	- Then click on `Credentials` in the left menu. 
	- Select `Create Credentials` and then `OAuth client ID`.
	- Choose `Web application`.
	- Add `http://localhost:3000` and `<http://yourdomain.com>` to `Authorised Javascript origins`.
	- Add `http://localhost:3000`, `http://localhost:3000/api/auth/callback/google`, `<http://yourdomain.com>`, and `<http://yourdomain.com/api/auth/callback/google>` to `Authorised redirect URIs`.
	- Copy the created `Client ID` and `Client secret` to your `.env` file in the corresponding fields.


2. Create a MongoDB database at [MongoDB Cloud](https://cloud.mongodb.com/).
	- Make sure you allow `Network Access` to `0.0.0.0`
	- Click on `Connect` and then `Drivers` and copy the `connection string` to your `.env` file. Make sure you replace `<password>` with your MongoDB password.

3. Create a password for Next-Auth
	- In `terminal` or `https://www.cryptool.org/en/cto/openssl/` type `openssl rand -base64 32` to get a password to put in your `.env` file for the `NEXTAUTH_SECRET`_

### Installation

1. Clone the repo:
	```sh
	git clone https://github.com/tris-n/chatcapsule.git
	```
	
2. Fill in the API details in the `env.example` file based on the prerequisites steps, including:
	- See the above steps to get enviroment variables for:
		- NEXTAUTH_URL
		- NEXTAUTH_URL_INTERNAL
		- NEXTAUTH_SECRET
		- GOOGLE_ID
		- GOOGLE_CLIENT_SECRET
		- MONGODB_URI

3. Rename `env.example` to `.env`.

4. `cd` to the root folder of the project if you're not already there.

5. Install the dependencies:
	```sh
	npm install
	```

6. Run the server:
	```sh
	npm run dev
	```

### Deployment Notes
- When deploying, update the Google OAuth settings with your actual domain.
- Securely transfer your .env variables to your deployment platform, like Vercel.
- Update NEXTAUTH_URL and NEXTAUTH_URL_INTERNAL from http://localhost:3000 to your production URL. Redeploy to apply changes.



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### The Homepage
Upon visiting the homepage, you will not see any capsules until you log in. The interface is clean and straightforward, directing you to sign in to access full features.

![homepage]

### Sign In
To sign in, click the `Sign In` button located at the top right of the screen. You will be redirected to Google for authentication.

![signin]

### Signed In
After signing in, you'll be taken back to the homepage. You will now see options to `Create Capsule` and access your `Profile`, which will be represented by your Google Account avatar.

![signedin]

### Create A Capsule
To create a capsule:
1. Click on `Create Capsule`.
2. You will be prompted to fill out four required fields:
   - `URL`: Paste the URL of your ChatGPT conversation.
   - `Title`: Enter the title used by ChatGPT to save your conversation.
   - `Summary`: Enter a summary of the conversation.
   - `Tags`: Enter relevant tags for the conversation (separate each tag with a comma).

   **Tip**: Use the following prompt in ChatGPT to generate a summary and tags: "Create a simple 100-word summary and basic tags for this conversation."

![createcapsule]

### Your Capsule
Once created, your capsule will appear on the homepage. Each capsule offers quick options to:
- Open the ChatGPT conversation in a new window by clicking the link icon.
- Search for other conversations using similar tags by clicking on a tag.
- Edit or delete your capsule.

![newcapsule]

![multiplecapsules]

### Searching Capsules
Search for specific conversations using the search box or by clicking on tags. The system searches through titles, summaries, and tags for relevant results.

![searchresults]

### Editing Capsules
Modify your existing capsules at any time by selecting the `edit` option on each capsule card.

![editcapsule]

### Your Profile Page
Visit your profile page for a streamlined overview of all your capsules, making it easier to manage and reference your saved conversations.

![profilepage]



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Tristan - [trisn.work@gmail.com](mailto:trisn.work@gmail.com)

Project Link: [https://github.com/tris-n/chatcapsule](https://github.com/tris-n/chatcapsule)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- Screenshots -->
[homepage]: readme/images/homepage.jpg
[signin]: readme/images/signin.jpg
[signedin]: readme/images/signedin.jpg
[createcapsule]: readme/images/createcapsule.jpg
[newcapsule]: readme/images/newcapsule.jpg
[multiplecapsules]: readme/images/multiplecapsules.jpg
[searchresults]: readme/images/searchresults.jpg
[editcapsule]: readme/images/editcapsule.jpg
[profilepage]: readme/images/profilepage.jpg