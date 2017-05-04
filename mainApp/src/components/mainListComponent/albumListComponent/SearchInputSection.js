import React from "react"



class SearchInputSection extends React.Component{
  constructor(props){
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }



  handleKeyPress(e){

    if(e.charCode===13){
        //console.log(e.target.value);

    }
}


  render(){
    return(
      <div>
        <input onKeyPress={this.handleKeyPress} type="text" className="searchTextInput" placeholder="Search your album"/>
      </div>
    )
  }
}

SearchInputSection.propTypes = {
  searchVideo : React.PropTypes.func
};

export default SearchInputSection;
