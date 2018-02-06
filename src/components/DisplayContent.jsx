import React, { Component } from 'react';
import { Card, Grid, Header, Table } from 'semantic-ui-react';

class DisplayContent extends Component {

  constructor() {
    super();
    this.state = {content: null};
  }

  /*
  componentDidUpdate() {
    console.log('trying to rerender');
    let content = <div />
    if (this.props.type === 'artist')
      content = this.artistContent(this.props.content);  
    else if (this.props.type === 'song')
      content = this.songContent(this.props.content);  

    this.setState({content: content})
  }
  */

  //Use unique methods for each type of entry - we are going to be making this look great
  //which requires doing special things for each parameter
  getExtra(content) {
    const features = content.props.features
    const track = content.props.track
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Table unstackable>
              <Table.Body>
                <Table.Row>
                  <Table.Cell> <b>Danceability</b> </Table.Cell>
                  <Table.Cell> {features.danceability} </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell> <b>Popularity</b> </Table.Cell>
                  <Table.Cell> {track.popularity} </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell> <b>Energy</b> </Table.Cell>
                  <Table.Cell> {features.energy} </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <Table unstackable>
              <Table.Body>
                <Table.Row>
                  <Table.Cell> <b>Tempo</b> </Table.Cell>
                  <Table.Cell> {Math.round(features.tempo)} </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell> <b>Key</b> </Table.Cell>
                  <Table.Cell> {features.key} </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell> <b>Happiness</b> </Table.Cell>
                  <Table.Cell> {features.valence} </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row> 
      </Grid>
      );
  }

  songContent(content) {
    const tr = content.props.track;
    const ft = content.props.features;
    return (
      <Card
        fluid
        header={tr.name}
        meta={tr.artists[0].name}
        extra={this.getExtra(content)}
      />
    );
  }

  // This is gonna be really bad practice but I just want to see it working
  artistContent(content) {
    return (
      <Card
        image={content.images[1].url}
        header={content.name}
        meta={content.genres[0]}
        description={'Popularity: ' + content.popularity + ' Followers: ' + content.followers.total}
        href={content.external_urls.spotify}/>
    );
  }

  render() {
    if (this.props.type === 'artist')
      return this.artistContent(this.props.content);  
    if (this.props.type === 'song')
      return this.songContent(this.props.content); 
    return <div />;
  }
}

export default DisplayContent;
