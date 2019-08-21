import React from 'react';

import Axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      country:['country'],
      states:['state'],
      cities:["city"],
      selCountry:"country",
      boolcountry:false,
      selStates:"state",
      boolstates:false,
      selCity:"city",
      countryValue:"",
      stateValue:"",
      cityValue:""
    }
  }
  componentDidMount=()=>{
    Axios.get(`http://localhost:3000/`)
    .then((res)=>{
      const countries=res.data.map(i=>{return i.name;})
      this.setState({
        country:countries
      })
    })
    
  }
  handleChange=(e)=>{
      if(e.target.name==='country'){
      this.setState({
        selCountry:e.target.value,
        boolcountry:true,
        boolstates:false
      })
      Axios.get(`http://localhost:3000/${e.target.value}`)
      .then((res)=>{
        const states=res.data.map(i=>{return i.name;})
        this.setState({
          states:states
        })
      })
      .catch(err=>{console.log(err)})
    }
    if(e.target.name==='state'){
      this.setState({
        selStates:e.target.value,
        boolstates:true
      })
      Axios.get(`http://localhost:3000/country/${e.target.value}`)
      .then((res)=>{
        const cities=res.data.map(i=>{return i.name;})
        this.setState({
          cities:cities
        })
      })
      .catch(err=>{console.log(err)})
    }
    if(e.target.name==='city'){
      this.setState({
        selCity:e.target.value
      })
    }
  }

  handleClick=(e)=>{
     if(e.target.name==='country'){
       Axios.post(`http://localhost:3000/${this.state.countryValue}`,{})
       .then(res=>{
         console.log(res.data)
         this.setState({
          countryValue:""
         })
       })
       .catch(err=>{console.log(err)})
     }
     if(e.target.name==='state'){
       Axios.post(`http://localhost:3000/${this.state.selCountry}/${this.state.stateValue}`,{})
       .then(res=>{
         console.log(res.data)
         this.setState({
          stateValue:""
         })
       })
       .catch(err=>{console.log(err)})
     }
     if(e.target.name==='city'){
       Axios.post(`http://localhost:3000/${this.state.selCountry}/${this.state.selStates}/${this.state.cityValue}`,{})
       .then(res=>{
         console.log(res.data)
         this.setState({
          cityValue:""
         })
       })
       .catch(err=>{console.log(err)})
     }
  }

  addHandleChange=(e)=>{
    if(e.target.name==='country'){
    this.setState({
      countryValue:e.target.value
    })
    }
    if(e.target.name==='state'){
      this.setState({
       stateValue:e.target.value
      })
    }
    if(e.target.name==='city'){
      this.setState({
        cityValue:e.target.value
      })
    }
  }
  render(){
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-sm-2"/>
        <div className="col-sm-8">

          <div className="row mb-2">
            <select name="country" value={this.state.selCountry} onChange={this.handleChange} className="col-sm-4 browser-default custom-select">
              {this.state.country.map((e)=>{
                return <option name="country"value={e}>{e}</option>;
              })}
            </select>
            <input className="form-control m-2 col-sm-4"name="country" placeholder="country" type="text" value={this.state.countryValue} onChange={this.addHandleChange}></input>
            <button name="country" type="button" style={{height: '35px'}} className="col-sm-2 btn btn-primary btn-sm" onClick={this.handleClick} >Add</button>
          </div>

          {this.state.boolcountry?
          <div className="row mb-2">
            <select name="state" value={this.state.selState} onChange={this.handleChange} className="col-sm-4 browser-default custom-select">
              {this.state.states.map((e)=>{
                return <option name="state"value={e}>{e}</option>;
              })}
            </select>
            <input className="form-control ml-2 mr-2 md-2 col-sm-4" type="text" placeholder="state" value={this.state.stateValue} name="state" onChange={this.addHandleChange}></input>
            <button name="state" type="button" style={{height: '35px'}} className="col-sm-2 btn btn-primary btn-sm" onClick={this.handleClick}>Add</button>
          </div>:""
          }

          {this.state.boolstates?
          <div className="row mb-2">
            <select name="city" value={this.state.selCity} onChange={this.handleChange} className="col-sm-4 browser-default custom-select">
              {this.state.cities.map((e)=>{
                return <option value={e}>{e}</option>;
              })}
            </select>
            <input className="form-control ml-2 mr-2 md-2 col-sm-4" type="text" placeholder="city" value={this.state.cityValue} name="city" onChange={this.addHandleChange}></input>
            <button name="city" type="button" style={{height: '35px'}} className="col-sm-2 btn btn-primary btn-sm" onClick={this.handleClick}>Add</button>
          </div>:""
          } 


        </div>
      </div>   
    </div>
  );
  }
}

export default App;
