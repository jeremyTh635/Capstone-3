# About my-i-music-favourites app

This site was developed as the final project in Hyperion.Dev’s web development bootcamp. The following are the instructions for using the app and information regarding how to download and install it.

## Using the app

This is a basic fullstack web app, the aim of which is to use the iTunes API to create a list of favourite albums. There are three pages:

- A home page containing a login form

- A search page where the user can search for albums by artist

- A favourites page which displays the user's choices from the search results

Before being able to search the API, the user has to login. This can be done so by clicking on the 'Go to Login' button on the Home page. This will bring up a modal with a form where the user can enter a username and a password. On clicking 'Submit', the user will then be able to create searches and obtain results. As things stand at the moment, users need to enter one of the two username/password combinations in the simulated database file named userDB.js. These are as follows:

- Username: "user12" Password: "uvw456"

- Username: "user34" Password: "xyz789"

Doing so will create a json web token (JWT) which protects the Search route from unauthorized users.

The Search page contains a text input for name of an artist, group etc., and a dropdown select field for different media types. It is recommended to select 'Album'. Clicking 'Search' will load a list of albums with their cover artwork, artist name, album name and release date. There is also a button next to each list item, 'Make Favourite' which adds the chosen album to the Favourites list. This can be viewed by going to the Favourites page via the top menu. The user will be able to see their chosen favourites and delete them from the list by clicking the 'Remove' button next to each one.

N.B. Leaving the Search page will clear the form and the results so viewing Favourites and returning to Search will necessitate a new search.

## Viewing the code and installing the app

The code which I wrote to develop the app can be found in my GitHub repo [here](https://github.com/jeremyTh635/Capstone-3.git). It can be downloaded by selecting the ‘Download zip’ option from dropdown under the green ‘Code’ button at the top of the page.
