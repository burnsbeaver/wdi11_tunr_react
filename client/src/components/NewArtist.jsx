import React, { Component } from 'react'

class NewArtist extends Component {
  constructor(){
    super()
    this.state = {
      newArtist: {
        name: "",
        nationality: "",
        photo_url: ""
      }
    }
  }
  _handleSubmit = (e) => {
    e.preventDefault()
    console.log("ADDING NEW ARTIST")
  }
  _handleChange = (e) => {
    const attributeValue = e.target.value
    const attributeName = e.target.name
    const newState = {...this.state}
    newState.newArtist[attributeName] = attributeValue
    this.setState(newState)
  }

  render () {
    return (
      <form onSubmit={this._handleSubmit}>
        <input type="text" name="name" placeholder="Artist Name" onChange={this._handleChange}/>
        <input type="text" name="nationality" placeholder="Nationality" onChange={this._handleChange}/>
        <input type="text" name="photo_url" placeholder="Photo URL" onChange={this._handleChange}/>
        <input type="submit" value="Add Artist"/>
      </form>
    )
  }
}

export default NewArtist;
