/**
 * Created by donghyunkim on 2017. 5. 7..
 */

import React, {Component} from 'react';


class Modal extends Component{



    constructor(props){
        super(props);
        this.state = {
            title : null,
            coverImgUrl : null,
            category : [],
        };
        this.handleAlbumInputChange = this.handleAlbumInputChange.bind(this);
    }



    handleAlbumInputChange(event){
        let target = event.target;
        let nextState = {};
        let name = target.name;
        let {category} = this.state;


        let newCategory = [...category];

        switch(target.type){
            case "checkbox" :
                let value = target.value;
                if(target.checked) {
                    newCategory.push(value);
                }else{
                   let idx = newCategory.indexOf(value);
                    newCategory.splice(idx,1);
                }
                nextState = {
                    [name] : newCategory,
                };

                break;
            case "file" :
                nextState = {
                    [name] : target.files[0],
                };
                break;
            default:
                nextState = {
                    [name] : target.value,
                };
        }

        this.setState((state)=>{
            return nextState;
        });

    }



    render(){

        let { addItemCancelClickHandler,addAlbumSubmitHandler } = this.props;


        return (
            <div id="myModal" className="modal">
                <div className="modalContent">
                    <div className="modalHeader">
                        <span className="close"  onClick={addItemCancelClickHandler}>&times;</span>
                        <h3>Add Album</h3>
                    </div>
                        <div className="modalBody">
                            <div className="modalFormContainer">
                                <label><b>Title</b></label>
                                <input type="text" placeholder="Title" name="title" onChange={this.handleAlbumInputChange} required  />
                                <label><b>Album Image</b></label>
                                <input type="file" name="coverImgUrl" onChange={this.handleAlbumInputChange} required  />
                                <label><b>Category</b></label>
                                <div className="modalFormCheckContainer">
                                    <span><input type="checkbox" name="category" value="1"  onChange={this.handleAlbumInputChange}/> Pop</span>
                                    <span><input type="checkbox" name="category" value="2"  onChange={this.handleAlbumInputChange}/> Hiphop</span>
                                    <span><input type="checkbox" name="category" value="3"  onChange={this.handleAlbumInputChange}/> Rock</span>
                                    <span><input type="checkbox" name="category" value="4"  onChange={this.handleAlbumInputChange}/> Ballad</span>
                                </div>
                            </div>
                        </div>
                        <div className="modalFooter">
                            <input type="submit" className="button" onClick={addAlbumSubmitHandler.bind(null,this.state)} value="앨범 생성" />
                            <input type="button" className="button" onClick={addItemCancelClickHandler} value="취소" />
                        </div>
                </div>
            </div>

        );

    }
}


export default Modal;