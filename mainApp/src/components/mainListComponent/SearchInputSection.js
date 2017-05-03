import React from "react"

class SearchInputSection extends React.Component{
  constructor(){
    super()
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e){
    if(e.charCode===13){
      this.props.searchVideo(e.target.value);
    }
  }


  render(){
    return(
      <div>
        <input onKeyPress={this.handleKeyPress} type="text" className="searchTextInput" placeholder="Search your favorite music"/>
      </div>
    )
  }
}

SearchInputSection.propTypes = {
  searchVideo : React.PropTypes.func
}

export default SearchInputSection;
