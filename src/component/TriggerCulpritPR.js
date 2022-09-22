import React from 'react';
import '../css/form.css';
import CulpritPrTriggerResponse from './CulpritPrTriggerResponse';

class TriggerCulpritPR extends React.Component {
    constructor(props){
        super();
        this.state = {
          triggerApiRequestParams: {

            recruiterEmailId: '',
            query: '',
            jdlink: '',
            queryURI: 'https://prod-29.centralus.logic.azure.com/workflows/0093d7b5bf104cf3bbcec6b20b230637/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=A1RV1mWrzJkrulj9vHdoQ_wn0gC9lvg6AFqeS0QFAaE&searchquery='

          },
          triggerApiResponseParams: {
            id: '',
            statusQueryGetUri: 'https://hireme-engine.search.windows.net/indexes/hireme3/docs?api-version=2020-06-30&search=',
            sendEventPostUri: '',
            terminatePostUri: '',
            purgeHistoryDeleteUri: '',
            restartPostUri: '',
            candidates: []
          },
          showTriggerApiResponseTable: props.showTriggerApiResponseTable,
          triggerApiResponseStatus: ''
        };
    
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.handleRecruiterEmailIdChange = this.handleRecruiterEmailIdChange.bind(this);
        this.handleJdLinkChange = this.handleJdLinkChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      };

      componentDidUpdate(prevProps, prevState) {
        if (prevState.showTriggerApiResponseTable !== this.props.showTriggerApiResponseTable) {
          this.setState({
            showTriggerApiResponseTable: this.props.showTriggerApiResponseTable
          });
        }
      }


      handleQueryChange(event) {
        var triggerApiRequestParams = this.state.triggerApiRequestParams;
        triggerApiRequestParams.query = event.target.value;
        this.setState({triggerApiRequestParams});
      }

      handleRecruiterEmailIdChange(event) {
        var triggerApiRequestParams = this.state.triggerApiRequestParams;
        triggerApiRequestParams.recruiterEmailId = event.target.value;
        this.setState({triggerApiRequestParams});
      }

      handleJdLinkChange(event) {
        var triggerApiRequestParams = this.state.triggerApiRequestParams;
        triggerApiRequestParams.jdlink = event.target.value;
        this.setState({triggerApiRequestParams});
      }
    
      async handleSubmit(event) {
        event.preventDefault();

        const queryURI = this.state.triggerApiRequestParams.queryURI + this.state.triggerApiRequestParams.query;
        const requestOptions = {
          method: 'GET',
          mode: 'cors', 
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'api-key': '8Lu2Go84TxcuxoPZx7DuWI6og06YPC1D3laNvbQwjIAzSeBtnM8r'
          }
        };

        const response = await fetch(queryURI, requestOptions);
        const data = await response.json();
        console.log('fetched data: response: ' + JSON.stringify(data));

        if (data !== null) {
          let triggerApiResponseStatus = 'fetched data: response status: ';
          this.setState({
            showTriggerApiResponseTable: true,
            triggerApiResponseStatus: triggerApiResponseStatus
          });
          this.props.parentCallback({showTriggerApiResponseTable: true});

          const triggerApiResponseParams = {

            data: data.value
          }
          console.log(triggerApiResponseParams);

          this.setState({triggerApiResponseParams: triggerApiResponseParams});
          console.log('inner');
        }
        console.log('fetched data: response: ' + JSON.stringify(this.state.triggerApiResponseParams));
      }

      render() {

        const checkStatus = this.state.showTriggerApiResponseTable;
        let renderComponent;
        if (checkStatus) {
          renderComponent = <CulpritPrTriggerResponse 
                              triggerApiResponseParams={this.state.triggerApiResponseParams}
                              parentCallback={this.props.parentCallback}>
                            </CulpritPrTriggerResponse>
        } else {
          renderComponent = <form>
                              <div className="user-box">
                                <input type="text" value={this.state.triggerApiRequestParams.recruiterEmailId} onChange={this.handleRecruiterEmailIdChange} />
                                <label>Email ID</label>
                              </div>
                              <div className="user-box">
                                <input type="text" value={this.state.triggerApiRequestParams.jdlink} onChange={this.handleJdLinkChange} />
                                <label>Job Description URL</label>
                              </div>
                              <div className="user-box">
                                <input type="text" value={this.state.triggerApiRequestParams.query} onChange={this.handleQueryChange} />
                                <label>Query</label>
                              </div>
                              <a href="/#" onClick={this.handleSubmit}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Submit
                              </a>

                              <label>
                                <span></span>
                                <span></span>
                                {this.state.triggerApiResponseStatus}
                              </label>
                            </form>;
        }

        return (
          <div>
            {renderComponent}
          </div>
        );
      }
}

export default TriggerCulpritPR;