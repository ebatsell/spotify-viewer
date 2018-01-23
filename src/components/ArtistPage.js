import React, { Component } from 'react';
import { Container, Grid, Segment, Tab} from 'semantic-ui-react';
import ArtistPage from './ArtistPage'
import DATA from '../data/Data'



class ArtistPage extends Component {
	state = { visible: false }
  	toggleVisibility = () => this.setState({ visible: !this.state.visible })

	render() {
 	const { visible } = this.state
    return (
    	<Sidebar
			    as={Menu}
			    animation='overlay'
			    width='thin'
			    direction='right'
			    visible={visible}
			    icon='labeled'
			    vertical
			    inverted
			  >
			<Menu.Item name='home'>
			  <Icon name='home' />
			  Home
			</Menu.Item>
			<Menu.Item name='gamepad'>
			  <Icon name='gamepad' />
			  Games
			</Menu.Item>
			<Menu.Item name='camera'>
			  <Icon name='camera' /> 
			  	Channels 
		  	</Menu.Item>
	  	</Sidebar>
		<div>
			<Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
			<Sidebar.Pushable as={Segment}>
			  <Sidebar
			    as={Menu}
			    animation='overlay'
			    width='thin'
			    direction='right'
			    visible={visible}
			    icon='labeled'
			    vertical
			    inverted
			  >
			    <Menu.Item name='home'>
			      <Icon name='home' />
			      Home
			    </Menu.Item>
			    <Menu.Item name='gamepad'>
			      <Icon name='gamepad' />
			      Games
			    </Menu.Item>
			    <Menu.Item name='camera'>
			      <Icon name='camera' />
			      Channels
			    </Menu.Item>
			  </Sidebar>
			  <Sidebar.Pusher>
			    <Segment basic>
			      <Header as='h3'>Application Content</Header>
			      <Image src='/assets/images/wireframe/paragraph.png' />
			    </Segment>
			  </Sidebar.Pusher>
			</Sidebar.Pushable>
		</div>
  	}

}

export default ArtistPage;