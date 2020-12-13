import React, {Component} from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Attributions from './Attributions';
import '../../css/app.css';   
import { TextField } from '@material-ui/core';
class postes extends Component {
    constructor() {
        super();
        this.state = {attributions:[], listepostes: [],date:new Date().toISOString().substr(0, 10),etat:false,show: false, nomPoste:"",loading: true};
        this.getPostes=this.getPostes.bind(this);
        this.openModal=this.openModal.bind(this);
        this.closeModal=this.closeModal.bind(this);
        this.ajoutPoste=this.ajoutPoste.bind(this);
        this.update=this.update.bind(this);
        this.getByDate=this.getByDate.bind(this);
    }
    
    componentDidMount() {
        this.getPostes();
    }
    
    getPostes(e) {

       axios.get(`http://localhost:8000/api/postes`,{params:{date:this.state.date}}).then(postes => {

           var t=Object.keys(postes.data.data).map((key) => postes.data.data[key]);

           this.setState({ listepostes: t, loading: false})
           
       })
    }

    update(){
this.getPostes();
        
    }
    getByDate(e){

this.setState({date:e.target.value});
this.getPostes();
    }
    openModal (e) {

        this.setState({ show: true });
   
      };
    
      closeModal ()  {
        this.setState({ show: false });
      };
    ajoutPoste(){
        axios({ 
            url:"/api/postes/add",
            method:"post",
            data:{ 
              nomPoste:this.state.nomPoste,
            } 
          }).then(msg=>{
            this.setState({ show: false });
            this.getPostes();
            console.log("ok");
          })
    }
    render() {
        const loading = this.state.loading;
        return(
            <div>
               
                <section className="row-section">
                    <div className="container">
<div className="d-flex flex-row">

                        <TextField
    id="date"
    label="jour"
    type="date"
    onChange={this.getByDate}
    className=" bg-light"
    InputLabelProps={{
        shrink: true,
      }}
  />

                        <button onClick={this.openModal} className="btn btn-info">Ajout poste</button>
                        </div>
                        {loading ? (
                            <div className={'row text-center'}>
                                <span className="fa fa-spin fa-spinner fa-4x"></span>
                            </div>
                        ) : (
                            <div className='row d-flex flex-row flex-warp'>
           <Modal isOpen={this.state.show} onRequestClose={this.closeModal}>
          <button onClick={this.closeModal}>close</button>
          <input type="text" id="postes" onInput={(e)=>this.setState({nomPoste:e.target.value})}/>
  
          <button onClick={this.ajoutPoste}>ajouter</button>
        </Modal>
                      { 
                                this.state.listepostes.map(p =>
                                    <div className="col-md-4 col-lg-3 col-sm-3 offset-md-1 row-block card" key={p.id}>
                                    <div className="card-body">
                                            {p.nomPoste}
                                 
                                        
                                        <Attributions action={this.update} posteId={p.id} Attributions={p.attributions} />
                                       </div>   
                                      
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        )
    }
}
export default postes;