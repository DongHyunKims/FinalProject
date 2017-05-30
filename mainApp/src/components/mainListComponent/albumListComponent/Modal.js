/**
 * Created by donghyunkim on 2017. 5. 7..
 */

import React, {Component} from 'react';


const modalStyle = {
    titleCheckedStyle : {color : "red"}
};

class Modal extends Component{
    constructor(props){
        super(props);
        this.state = {
            title : "Album",
            coverImgUrl : null,
            category : [],
        };

        this.handleItemInputChange = this.handleItemInputChange.bind(this);
        this.checkTitle = this.checkTitle.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount(){
        let {data} = this.props;
        if(data) {
            let {title,coverImgUrl,category} = data;
            this.setState(() => {
                return {
                    title : title,
                    coverImgUrl : coverImgUrl,
                    category : category,
                }

            });
        }
    }



    handleItemInputChange(event){
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

    renderCategory(defaultCategoryTitle,category){

        return defaultCategoryTitle.map((val, idx)=>{
            if(category.indexOf(idx+1) !== -1){
                return <span key={idx} ><input type="checkbox" name="category" value={idx+1}  onChange={this.handleItemInputChange} checked /> {val}</span>
            }
            return <span key={idx} ><input  type="checkbox" name="category" value={idx+1}  onChange={this.handleItemInputChange} /> {val}</span>
        })


    }

    checkTitle(dataList){

        if(dataList) {


            let {title}= this.state;
            let checked = dataList.filter((val) => {
                return val.title === title;
            });
            if (checked.length) {
                return false;
            }
            return true;

        }
        return true;

    }

    handleKeyPress(data,_id,titleChecked,itemSubmitHandler,e){
        if(e.charCode===13){
            itemSubmitHandler.call(null,data,_id,titleChecked);
        }
    }



    render(){
        let { itemCancelClickHandler, itemSubmitHandler, modalTitle, btnTitle, defaultCategoryTitle,data,dataList } = this.props;
        let {title,category} = this.state;
        let _id = null;
        if(data){
            _id = data._id;
        }



        let renderTitleChecked = "";
        let titleStyle = null;
        let titleChecked = this.checkTitle(dataList);
        if(title.length) {

            renderTitleChecked = "사용 가능한 Title 입니다.";
            if (!titleChecked) {
                titleStyle = modalStyle.titleCheckedStyle;
                renderTitleChecked = "이미 존재하는 Title 입니다.";
            }

        }else{
            renderTitleChecked = "Title을 입력해 주십시오.";
            titleChecked=false;
        }
        return (
            <div id="myModal" className="modal" onKeyPress={this.handleKeyPress.bind(null,this.state,_id,titleChecked,itemSubmitHandler)}>
                <div className="modalContent">
                    <div className="modalHeader">
                        <span className="close"  onClick={itemCancelClickHandler}>&times;</span>
                        <h3>{modalTitle}</h3>
                    </div>
                    <div className="modalBody">
                        <div className="modalFormContainer">
                            <label><b>Title</b></label>
                            <input type="text" placeholder="Title" name="title" maxLength="20" onChange={this.handleItemInputChange} value={title} required />
                            <label><b>Album Image</b></label>
                            <input type="file" name="coverImgUrl" onChange={this.handleItemInputChange} required />
                            <label><b>Category</b></label>
                            <div className="modalFormCheckContainer">
                                {this.renderCategory(defaultCategoryTitle,category,data)}
                            </div>
                        </div>
                    </div>
                    <div className="modalFooter">
                        <span style={titleStyle}>{renderTitleChecked}</span>
                        <input type="button" className="button"  value={btnTitle} onClick={itemSubmitHandler.bind(null,this.state,_id,titleChecked)} />
                        <input type="button" className="button" onClick={itemCancelClickHandler} value="취소" />
                    </div>
                </div>
            </div>

        );

    }
}


Modal.defaultProps = {
    defaultCategoryTitle : ["Pop", "Hiphop", "Rock", "Ballad"],
    btnTitle: "확인",
    modalTitle: "Modal",
};


//onSubmit={addAlbumSubmitHandler.bind(null,this.state)}
export default Modal;
