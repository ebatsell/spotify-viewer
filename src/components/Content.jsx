import React, { Component } from 'react';
import { Dropdown, Grid, Segment, Tab } from 'semantic-ui-react';
import $ from 'jquery';
import PropTypes from 'prop-types';
// import ArtistPage from './ArtistPage'
import DisplayContent from './DisplayContent';


class TrackSegment extends Component {
  constructor() {
    super();
    this.propTypes = {
      contentCallback: PropTypes.function,
    };
  }

  parentCallback() {
    this.props.contentCallback(this);
  }

  render() {
    // console.log(this.props.track.artists[0].name);
    // console.log(this.props.track.album.name);
    // console.log(this.props.track.popularity);
    return (
      <Segment textAlign="center" onClick={this.parentCallback.bind(this)}> 
        {this.props.track.name}
      </Segment>
    );
  }
}

class TrackList extends Component {
  static print(data, fn) {
    fn(data);
  }

  constructor() {
    super();
    this.state = {
      tracks: [],
    };
    this.contentCallback = (track) => {
      this.props.contentCallback(track);
    }
  }

  componentDidMount() {
    // getTrackList -> getTrackFeatures -> setTrackList -> render
    this.getTrackList();
  }


  getTrackList() {
    console.log('Token is ' + this.props.token);
    const _this = this;
    $.ajax({
      url: 'https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0&time_range=' + this.props.timeRange,
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
        'Content-Type': 'application/json',
      },
      success: (response) => {
        console.log(response);
        _this.getTrackFeatures(response.items);
      }, 
      error: (response) => {
        console.log(response);
      },
    });
  }

  getTrackFeatures(trackData) {
    let trackIds = '';
    for (let i = 0; i < 50; ++i) {
      trackIds += trackData[i].id + ",";
    }
    const _this = this;
    $.ajax({
      url: 'https://api.spotify.com/v1/audio-features?ids=' + trackIds,
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
        'Content-Type': 'application/json',
      },
      success: (response) => {
        _this.setTrackList(trackData, response.audio_features);
      }, 
      error: (response) => {
        console.log(response);
      }
    });
  }

  setTrackList(trackData, featureData) {
    console.log('made it in tracks list')
    let trackList = trackData.map(track => {
      // Function on the array object using functional programming
      let featureIndex = featureData.findIndex(f => f.id === track.id); 
      let feature = featureData[featureIndex];
      return <TrackSegment track={track} features={feature} contentCallback={this.contentCallback} />;
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
    };
    this.artistCallback = (artist) => {
      console.log(artist.name)
      //Callback to <Content> 
      this.props.contentCallback(artist);
    }
  }

  componentWillReceiveProps(next) {
    if (this.props.timeRange !== next.timeRange) {
      console.log('doing something')
    }
  }

  componentDidMount() {
    this.getArtistData();
  }
  
  //We'll probably want to cache this
  // Also -- put this in a componentDidMount when dealing with real API data??
  getArtistData() {
    console.log('TOKEN IS')
    console.log(this.props.token)
    let t = this;
    function callback(res) {
      t.setArtistList(res);
    }
    let req = $.ajax({
      url: 'https://api.spotify.com/v1/me/top/artists?limit=50&offset=0&time_range=' + this.props.timeRange,
      headers: {
        'Authorization': 'Bearer ' + this.props.token,
        'Content-Type': 'application/json',
      },
      success: function(response) {
        console.log(response);
        // let jsonData = JSON.parse(response.responseText);
        callback(response.items);
      }, 
      error: function(response) {
        console.log(response);
      }
    });
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
    super();
    this.state = {
      displayType: '',
      content: {},
      timeRange: 'short_term'
    };
    this.setArtistContent = (artist) => {
      console.log('my artist')
      console.log(artist)
      this.setState( {
        displayType: 'artist',
        content: artist
      });
    }

    this.setTrackContent = (song) => {
      console.log(song.props.features)
      console.log(song)
      this.setState( {
        displayType: 'song',
        content: song
      });
    }
  }


  setTimeOption(event, data) {
    this.setState({
      timeRange: data.value
    });
  }

  render() {
    const artists = (<ArtistsList 
      token={this.props.token} 
      timeRange={this.state.timeRange} 
      contentCallback={this.setArtistContent} />);

    const tracks = (<TrackList 
      token={this.props.token} 
      timeRange={this.state.timeRange}
      contentCallback={this.setTrackContent} />);

    const panes = [{ menuItem: 'Top Artists', render: () => <div> {artists} </div> },
          { menuItem: 'Top Tracks', render: () => <div> {tracks} </div> },
          { menuItem: 'Search', render: () => <Tab.Pane>Don't even try to search.</Tab.Pane> }];

    const timeOptions = [
      { key: 1, value: 'short_term', text: 'One Month' },
      { key: 2, value: 'medium_term', text: 'Four Months' },
      { key: 3, value: 'long_term', text: 'All Time' },
    ];

    return (
      <Grid columns={2} >
        <Grid.Row>
          <Grid.Column className="contentSelector">
            <Dropdown
              placeholder="Time Range"
              defaultValue="short_term"
              fluid
              selection
              options={timeOptions}
              onChange={this.setTimeOption.bind(this)}
              />
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