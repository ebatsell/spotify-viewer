This project is built on the [Spotify API](https://beta.developer.spotify.com/), and the initial function is to serve as an on-demand look at recent top tracks. It was inspired by the "2017 Wrapped" end-of-year thing, and the API allows you to recreate that experience at any time! It also serves as my first real project in Javascript (started taking it seriously in 2018), as I'm learning React.

## Deployment
Check out the production version (no install required) [here!](http://reactdeploy.s3-website-us-east-1.amazonaws.com)

## Setup
The setup should be as simple as: 
```bash
git clone <this_repo>
cd spotify-viewer/
npm install
npm start
```

Then open on http://localhost:3000/

## Updates
- Added time duration (view top artists and tracks from last 1 month, last 4 months, and all time) (2/6/18)
- Added ability to see your own top artists & tracks after logging in, instead of hardcoded data (2/6/18)
- Now hosted on AWS S3 (2/10/18)
- Integration with React-Router for automatic redirect to login, as well as redirects after callback (2/10/18)

## Future Improvements
Over the next days and weeks, expect the following features:

- Integration with Redux
- REFACTORED CODE!!!! currently just trying to get something up. it will adhere to better practices soon
	- Considering eslint but it is very restrictive and tedious
- An intuitive, informative UI that gives the feel of the Spotify platform
- [Stretch feature] A quiz game where you can test your friends' knowledge of your most-listened artists


### Screenshots
Artist Page
![artist page screenshot](https://raw.githubusercontent.com/ebatsell/spotify-viewer/master/src/images/screenshot1.png)


Song Page
![song page screenshot](https://raw.githubusercontent.com/ebatsell/spotify-viewer/master/src/images/screenshot2.png)