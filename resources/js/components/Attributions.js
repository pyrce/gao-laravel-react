import React, { Component } from 'react';
import { render } from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import '../../css/app.css';   
class Attributions extends Component {
    constructor(props) {
        super(props);
        this.state = { heures:[7,8,9,10,11,12,13,14,15,16,17],pc:"",date:new Date().toISOString().substr(0, 10),heure:"",clientId:"",listes:[],clients:[], show: false,loading: true};
        
        this.delete=this.delete.bind(this);
        this.content=this.content.bind(this);
        this.openModal=this.openModal.bind(this);
        this.closeModal=this.closeModal.bind(this);
        this.populate=this.populate.bind(this);
        this.attribuer=this.attribuer.bind(this);
        this.ajoutClient=this.ajoutClient.bind(this);
    }

    delete(e){

        
           axios({
            method: 'delete',
            url: '/api/attributions',
            data: {
              id: e.target.dataset.id
            }
          }).then(msg=>{
            this.props.action()
          });
        
    }
    attribuer(){
      let inputValue = document.getElementById("clients").value;
      let option = document.querySelector(`option[value="${inputValue}"]`).dataset["idclient"];

   axios({ 
        url:"/api/attributions",
        method:"post",
        data:{ 
          posteId:this.props.posteId,
          heure:this.state.heure, 
          jour:this.state.date,
          clientId:option
        } 
      }).then(msg=>{
       this.closeModal();
       this.props.action()

      })

    }
populate(e){

  axios.get(`http://localhost:8000/api/clients`,{params:{nomClient:e.target.value}}).then(data=>
  {
   var t=[];
    data.data.map(d=>{
      t.push(<option data-idclient={d.id} value={d.nomClient+"-"+d.prenomClient} key={d.id}>{d.nomClient+"-"+d.prenomClient}</option>)
    })
    this.setState({clients:t});
   } )
}
ajoutClient(){
  axios({ 
    url:"/api/clients",
    method:"post",
    data:{ 
      nomClient:this.state.nomClient,
      prenomClient:this.state.prenomClient,

    } 
  }).then(msg=>{
   

  })
}
          content({posteId,attr}){

var nom=[];
var r=0;

this.state.heures.map(h=>{
  if(typeof attr!="undefined"){
 r=attr.filter(
  item =>
  item.heure==h
)

    if(r.length>0){
            nom.push( <div className="horaires col-12"> <span className="col-lg-5 col-md-5 col-sm-12" key={h}> {h} h </span><span className="col-lg-7  col-md-7 col-sm-12"> { r[0].clients.nomClient+" "+r[0].clients.prenomClient }  </span><button className="btn btn-warning" onClick={this.delete} data-id={r[0].id}> - </button></div>)
          }else {
          nom.push(   <div className="horaires col-12"><span  className="col-lg-5 col-md-5 col-sm-12" key={h}>{h} h</span> <span className="col-lg-7  col-md-7 col-sm-12"></span> <button  className="btn btn-primary" onClick={this.openModal} data-horaire={h}   data-pc={posteId} data-param="ajout"> + </button> </div>)
        }

           } else {
            nom.push(   <div className="horaires col-12"><span  className="col-lg-5 col-md-5 col-sm-12" key={h}>{h} h</span> <span className="col-lg-7  col-md-7 col-sm-12"></span> <button  className="btn btn-primary" onClick={this.openModal} data-horaire={h}   data-pc={posteId} data-param="ajout"> + </button> </div>)

          }   } )
          
          
return nom;

    }

      openModal (e) {

        this.setState({ show: true,heure: e.target.dataset.horaire,pc:e.target.dataset.pc });
   
      };
    
      closeModal ()  {
        this.setState({ show: false });
      };
    render() {
        const loading = this.state.loading;


        return(
            <div className="d-flex flex-column">

            <Modal isOpen={this.state.show} onRequestClose={this.closeModal}>
          <button onClick={this.closeModal}>close</button>
          <input type="text" id="clients" list="nom" onInput={this.populate} />
          <datalist id="nom" >
{this.state.clients}
          </datalist>
          <button onClick={this.attribuer}>attribuer</button>

          <section>
            <input type="text" onChange={(e=>{this.setState({nomClient:e.target.value}) })}/> <br/>
            <input type="text" onChange={(e=>{this.setState({prenomClient:e.target.value}) })}/>  <br/>
            <button onClick={this.ajoutClient}>ajout client</button>
          </section>

        </Modal>

                  
                  <this.content posteId={this.props.posteId}  attr={this.props.Attributions} />


      
            </div>
        )
    }


}
export default Attributions;