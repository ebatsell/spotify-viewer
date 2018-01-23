import React, { Component } from 'react';
import { Container, Grid, Segment, Sticky, Tab} from 'semantic-ui-react';
// import ArtistPage from './ArtistPage'
import DisplayContent from './DisplayContent';
import DATA from '../data/Data';


class TrackSegment extends Component {
	constructor() {
		super();
		this.state = {
			features: {}
		}
	}
	componentWillMount() {
		console.log(this.props.track.id)
		this.setTrackFeatures(this.props.track.id);
	}

	parentCallback(e) {
		e.preventDefault(); // whatever this does
		this.props.contentCallback(this);
	}

	// Actual audio features of the track, not (feat. 31 $avage)
	setTrackFeatures(trackId) {
		// When the api is actually set up, this part will be a little more complicated (???)
		let featureData = DATA.audio_features;
		console.log(featureData);
		console.log("looking for " + trackId)
		let featureIndex = featureData.findIndex(f => f.id ===trackId) // Function on the array object using functional programming
		let features = featureData[featureIndex]
		console.log('these are the audio features')
		console.log(features)
		this.setState({features: features})
	}

	render() {
		console.log(this.props.track.artists[0].name);
		console.log(this.props.track.album.name);
		console.log(this.props.track.popularity);
		return <Segment textAlign='center' onClick={this.parentCallback.bind(this)}> {this.props.track.name} </Segment>
	}
	
}

class TrackList extends Component {
	constructor() {
		super();
		this.state = {
			tracks: []
		}
	}
	print(data, fn) {
		fn(data);
	}
	componentWillMount() {
		let data = DATA.top_tracks.items;
		console.log('My track IDS')
		let str = '';
		for (var i = 0; i < 50; ++i) {
			str += data[i].id + ","
		}
		console.log(str);
		this.setTracksList(data);
	}

	contentCallback = (track) => {
		console.log("question: does track list know about feature?");
		console.log(track.state.features)
		this.props.contentCallback(track);
	}

	setTracksList(trackData) {
		let trackList = trackData.map(track => {
			return <TrackSegment track={track} contentCallback={this.contentCallback} />;
		});

		this.setState({tracks: trackList});
	}

	render() {
		return <Segment.Group content={this.state.tracks} />
	}
}

class ArtistSegment extends Component {
	callBackToParent(e) {
		e.preventDefault();
		this.props.artistCallback(this.props.artist);
	}

	render() {
		return <Segment textAlign='center' onClick={this.callBackToParent.bind(this)}> {this.props.artist.name} </Segment>
	}
}

class ArtistsList extends Component {

	constructor() {
		super();
		this.state = {
			artists: []
		}
	}

	componentWillMount() {
		let data = this.getArtistData();
		this.setArtistList(data);
	}
	//We'll probably want to cache this
	// Also -- put this in a componentDidMount when dealing with real API data??
	getArtistData() {
		let something = DATA.top_artists.items;
		return something;
	}

	artistCallback = (artist) => {
		console.log("tryna find a artist")
		console.log(artist.name)
		//Callback to <Content>	
		this.props.contentCallback(artist);
	}

	setArtistList(artistData) {
		let dataList = artistData.map(artist => {
				return <ArtistSegment artist={artist} artistCallback={this.artistCallback} />;
		})
		console.log(dataList);
		this.setState({artists : dataList});
	}

	render() {
		return <Segment.Group> {this.state.artists} </Segment.Group>;
	}

}

class Content extends Component {

	constructor() {
		super()
		this.state = {
			displayType: '',
			content: {}
		};
	}
	// shouldComponentUpdate() {
	// 	console.log('asdf')
	// 	return true; }
	setArtistContent = (artist) => {
		console.log('my artist')
		console.log(artist)
		this.setState( {
			displayType: 'artist',
			content: artist
		});
	}

	setTrackContent = (song) => {
		console.log('my singeres')
		console.log(song.state.features)
		console.log(song)
		this.setState( {
			displayType: 'song',
			content: song
		});
	}

	render() {
		let artists = <ArtistsList contentCallback={this.setArtistContent} />
		let tracks = <TrackList contentCallback={this.setTrackContent} />
		var panes = [{ menuItem: 'Top Artists', render: () => <div> {artists} </div>},
					{ menuItem: 'Top Tracks', render: () => <div> {tracks} </div>},
					{ menuItem: 'Search', render: () => <Tab.Pane>Don't even try to search.</Tab.Pane> }];

		let test = {
			top: 0,
			position: "fixed"
		}
		return (
			<Grid columns={2} >
				<Grid.Row>
					<Grid.Column className='contentSelector'> 
						<Tab menu={{widths: 3}} panes={panes} />	
					</Grid.Column>
					<Grid.Column>
						<DisplayContent type={this.state.displayType} content={this.state.content} />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}


}

export default Content;