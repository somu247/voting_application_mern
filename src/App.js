import {Component} from 'react'
import Axios from 'axios';

import VicePresident from "./components/VicePresident"
import President from './components/President';
import Thanks from './components/Thanks'
import Manager from './components/Manager'
import Terms from './components/Terms'

import Scaning from './components/Scaning'


class App extends Component {

  state= {k: 0,result: "",para:"initial",name: ""}
  
  submitForm = (voting)=>{ 

    const {result} = this.state
    Axios.post("https://votingapp2023.onrender.com/president",{vote: voting,result: result,})
    .then((data)=>{
      this.setState({k: 3})
      alert(`${result} Successfully casted Vote for the President of SAC`)
    })
    .catch((e)=>{
      console.log("Error in Casting the vote",e)
    })
  }


submitForm2=(voting)=>{

    const {result} = this.state
    Axios.post("https://votingapp2023.onrender.com/vice",{vote: voting,result: result,})
    .then((data)=>{
      this.setState({k: 4})
      alert(`${result} Successfully casted your Vote for Vice-president of SAC`)
    })
    .catch((e)=>{
      console.log("Error in Casting the vote",e)
    })
  }

  
submitForm3=(voting)=>{

  const {result} = this.state
  Axios.post("https://votingapp2023.onrender.com/manager",{vote: voting,result: result,})
  .then((data)=>{
    this.setState({k: 5})
    alert(`${result} Successfully casted your Vote for Manager of SAC`)
  })
  .catch((e)=>{
    console.log("Error in Casting the vote",e)
  })
}


 isAlphanumeric(str) {
  return /^[a-z0-9]+$/i.test(str);
}

hasNonNumericCharacters(str) {
  return /\D/.test(str);
}

validation = (res)=>{
  if(res.length===10 && this.isAlphanumeric(res) && this.hasNonNumericCharacters(res)){
    return true
  }
  return false
}

validation = (res) => {
  if(res!=null) return true
  return false

}


scannerFunction = (res) =>{
  
  if(this.validation(res)===false){
    const {para} = this.state
  
    if(para!=='failure')
    this.setState({para: 'failure',k:1})
  }
  
  Axios.post("https://votingapp2023.onrender.com/credentials",{result: res,})

  .then  ((obj)=>{

    if((obj.data !== 'no result') && (obj.data[0].roll_num ==="20MH1A4248")){
      this.setState({result: obj.data[0].roll_num,
        name: obj.data[0].name,k:2})
    }
    else if((obj.data !== 'no result') && (obj.data[0].president !==0 || obj.data[0].vice_president!==0)){
      this.setState({para: 'voted',k:1})
    }
    else if(obj.data === 'no result'){
      this.setState({para: 'invalid',k:1})
    }
    
    else if(obj.data !== 'no result'){
      this.setState({result: obj.data[0].roll_num,
        name: obj.data[0].name,k:2})
    }
  })
  .catch((e)=>{
    console.log(e)
  })
}

initialFunction = (res) => {
    this.scannerFunction(res)
}

termsConditions = () => {
  this.setState({k: 1})
}

  render(){
    const {k,para,name} = this.state
    
 
     if(k===0){
      return <Terms termsConditions={this.termsConditions} para = {para} />
     }
     else if(k===1){
  
      return <Scaning scannerFunction={this.initialFunction} para = {para} />
     }
     else if(k===2){
       return  <President  submitForm={this.submitForm}  />
     }
     else if(k===3){
       return <VicePresident submitForm2={this.submitForm2}/>
     }
     else if(k===4){
      return <Manager submitForm3={this.submitForm3}/>
    }
     else if(k===5){
       return <Thanks/>
     }
  }
}


export default App;