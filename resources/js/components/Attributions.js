import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/Add';
import { IconButton,Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
class Attributions extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          heures:[7,8,9,10,11,12,13,14,15,16,17],
          attributions:[],
          pc:"",
          date:new Date().toISOString().substr(0, 10),
          heure:"",clientId:"",
          listes:[],
          clients:[],
           show: false,
           ajoutClient:false,
           loading: true,idclient:0};
        
        this.delete=this.delete.bind(this);
        this.content=this.content.bind(this);
        this.openModal=this.openModal.bind(this);
        this.closeModal=this.closeModal.bind(this);
        this.populate=this.populate.bind(this);
        this.attribuer=this.attribuer.bind(this);
        this.ajoutClient=this.ajoutClient.bind(this);
        this.handleSelect=this.handleSelect.bind(this);
    }

    delete(id){
        
           axios({
            method: 'delete',
            url: '/attribution/delete',
            data: {
              id:id
            }
          }).then(msg=>{
            this.props.action()
          });
        
    }

    componentDidMount(){
      // eslint-disable-next-line
            this.props.Attributions.map(h=>{
              let attributionsCopy=this.state.attributions;
               attributionsCopy[h.heure] = {id:h.id,nomClient:h.clients.nomClient,prenomClient:h.clients.prenomClient}
              this.setState({ attributions : attributionsCopy });
            });
            console.log(this.state.attributions);
    }

    handleSelect(event, value) {
  
       this.setState({ idclient: event.target.dataset.idclient });
      
  }
    attribuer(event){
      event.preventDefault();
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

if(e.target.value.length>2){
  console.log("client : "+e.target.value)
  axios.get(`/api/users`,{params:{nomClient:e.target.value}}).then(data=>
  {

 let client=data.data;
 var t=[];
 client.forEach(client => {
     t.push(<option data-idclient={client.id} value={client.nomClient+"-"+client.prenomClient} key={client.id}>{client.nomClient+"-"+client.prenomClient}</option>)
 
});

 this.setState({clients:t});
    // this.setState({ defaultProps: { ...this.state.defaultProps, options: client } });
   } )
  }
}
ajoutClient(){
  axios({ 
    url:"/api/users/add",
    method:"post",
    data:{ 
      nomClient:this.state.nomClient,
      prenomClient:this.state.prenomClient,
      jour:this.state.date,
      poste:this.state.pc,
      heure:this.state.heure
    } 
  }).then(msg=>{
   
    this.closeModal();
    this.props.action()
  })
}
          content({posteId,attr}){

            // eslint-disable-next-line
var nom=[];

// eslint-disable-next-line
this.state.heures.map(h=>{
if( this.state.attributions[h] ){
  nom.push(<div className="horaires"> <span className="w-5" key={h}> {h} h </span><span className="w-7"> {  this.state.attributions[h].nomClient+" "+ this.state.attributions[h].prenomClient }  </span><IconButton className="btn btn-warning" onClick={()=>this.delete(this.state.attributions[h].id)}  data-param="delete" data-id={this.state.attributions[h].id}> <DeleteIcon /> </IconButton></div>)
}else  {
  nom.push(   <div className="horaires"><span  className="w-5" key={h}>{h} h</span> <span className="w-7"></span> <IconButton  className="btn btn-primary" onClick={()=>this.openModal({h},{posteId})} data-horaire={h}   data-pc={posteId} data-param="ajout"> <Add/> </IconButton> </div>)
}

} )

          
        return nom;
    }

      openModal (horaire,posteid) {

        this.setState({ show: true,heure: horaire.h,pc:posteid.posteId });
   
      };
    
      closeModal ()  {
        this.setState({ show: false });
      };
    render() {
        //const loading = this.state.loading;


        return(
            <div className="attrcontent">

            <Modal isOpen={this.state.show} style={customStyles} onRequestClose={this.closeModal}>
    
         
            <input type="text" id="clients" list="nom" onKeyDown={this.populate} onInput={this.handleSelect}/>
          <datalist id="nom" >
{this.state.clients}
          </datalist>
          <Button onClick={ (e)=>{this.setState({ajoutClient:true})  }} variant="outlined" color="primary">ajout client</Button>
 <Button onClick={this.closeModal}>close</Button>
{ this.state.ajoutClient===true ? 
          <section>
            <input type="text" onChange={(e=>{this.setState({nomClient:e.target.value}) })}/> <br/>
            <input type="text" onChange={(e=>{this.setState({prenomClient:e.target.value}) })}/>  <br/>
            <button onClick={this.ajoutClient}>ajout client</button>
          </section>
          :<div>   

          <Button type="submit" variant="outlined" color="secondary" onClick={this.attribuer}>Attribuer</Button></div>  
    }

        </Modal>

                  
                  <this.content posteId={this.props.posteId}  attr={this.props.Attributions} />


      
            </div>
        )
    }


}
export default Attributions;