import React from 'react';
import '../css/form.css';
import '../css/table.css';
import '../css/cards.css';

export default class CulpritPrTriggerResponse extends React.Component {
    constructor(props){
        super();
        this.state = {
            triggerApiResponseParams: props.triggerApiResponseParams,
            contactedCandidates: []
        };

        this.handleStatusCheckUriClick = this.handleStatusCheckUriClick.bind(this);
        this.contactCandidate = this.contactCandidate.bind(this);
      };

      handleStatusCheckUriClick(event) {
        event.preventDefault();
        this.setState({checkStatus: true});
        console.log('CulpritPrResponse props: ' + JSON.stringify(this.props));
        this.props.parentCallback({
            showTriggerApiResponseTable: true, 
            checkStatus: true,
            triggerApiResponseParams: this.state.triggerApiResponseParams
        });
      }

      async contactCandidate(event, candidateEmailId, id){
        event.preventDefault();
        this.setState({checkStatus: true});

        if (this.state.contactedCandidates.indexOf(id) === -1) {
          console.log('Contacted candidate ');
          console.log('this.state.triggerApiResponseParams : ', this.state.triggerApiResponseParams);
          var body = {
            "CandidateEmailID": candidateEmailId,
            "RecruiterEmailID": this.state.triggerApiResponseParams.recruiterEmailId,
            "IsCandidate": "false",
            "IsCandidateInterested": "false",
            "JDLink": this.state.triggerApiResponseParams.jdlink
          };
  
          const requestOptions = {
            method: 'POST',
            mode: 'cors', 
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(body)
          };
        const response = await fetch(
            'https://prod-26.westcentralus.logic.azure.com:443/workflows/717edc33336c4213ad455d23ee8a8311/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=spTfT0NLIO_mHlgAsKnaCkeTNTx_ieClpBeOYZloGTc', 
            requestOptions);
        const data = await response.json();
        console.log('Pankaj fetched data: response: ' + JSON.stringify(data));

        if (response.status === 200) {
          let contactedCandidates = this.state.contactedCandidates;
          contactedCandidates.push(id);
          this.setState({contactedCandidates: contactedCandidates});
        }
        } else {
          console.log("Candidate has been contacted already.");
        }
      }

      render() {
        return (
            <div className="container">
                <div>
                
                {
                this.props.triggerApiResponseParams.data.map(person => 
                (        
                        <div className="card" key={person.id}>
                            <div className="box">
                              <div className="content">
                                  <h2>{person.yoe}</h2>
                                  <h6> YoE </h6>
                                  <h3>{(person.is_identity_visible === "true") ? person.first_name : "Hidden"}</h3>

                                  <p>{(person.is_identity_visible === "true") ? person.email_id : "Email Hidden"}</p>
                                  <br/>
                                  <p><span style={{"fontWeight": "bold"}}>Languages: </span>{person.languages_known}</p>
                                  <br/>
                                  <p><span style={{"fontWeight": "bold"}}>Interest Area: </span>{person.interest_area}</p>
                                  <a href="/#" onClick={event => this.contactCandidate(event, person.email_id, person.id)}>
                                     {(this.state.contactedCandidates.indexOf(person.id) === -1) ? "Contact Dev" : "Contacted"}
                                  </a>
                              </div>
                            </div>
                        </div>
                ))
                }
                </div>
            </div>
        );
      }
}