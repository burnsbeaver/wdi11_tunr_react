import React, { Component } from 'react';
import axios from 'axios';
import ArtistCard from './ArtistCard';
import styled from 'styled-components';
import NewArtist from './NewArtist';

const ArtistListStyles = styled.div`
  margin: 20px 5%;
  width: 90%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

`;

class AllArtists extends Component{
  constructor(){
    super();
    this.state = {
      error: '',
      newArtist: false,
      artists: []
    }
  }

  componentWillMount(){
    this._fetchArtists();
  }

  _fetchArtists = async () => {
    try {
      const response = await axios.get('/api/artists');
      const artists = response.data;
      this.setState({artists});
    } catch (err) {
      this.setState({error: err})
    }
  }
  _toggleNewArtist = () => {
    const newState = {...this.state}
    newState.newArtist = !newState.newArtist
    this.setState(newState)
  }

  _addArtist = async (newstate) => {
    const response = await axios.post('/api/artists', newstate);
    const artist = response.data
    const newState = {...this.state}
    newState.artists.push(artist)
    newState.newArtist = false
    this.setState(newState)
  }

  render(){
    if (this.state.error){
      return <h1>{this.state.error.message}</h1>
    }
    return (
      <div>
        {this.state.newArtist ? <NewArtist addArtist={this._addArtist}/> : null}
        <button onClick={this._toggleNewArtist}>Add Artist</button>
        <ArtistListStyles>
          {this.state.artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </ArtistListStyles>
      </div>
    )
  }
}

export default AllArtists;
