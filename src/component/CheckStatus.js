import React from 'react';
import '../css/form.css';
import CulpritPrStatusGetResponse from './CulpritPrStatusGetResponse';

class CheckStatus extends React.Component {
    constructor(props){
        super();
        this.state = {
          statusQueryGetUri: props.triggerApiResponseParams.statusQueryGetUri,
          triggerApiResponseParams: props.triggerApiResponseParams,
          statusGetApiResponseParams: {
            runtimeStatus: 'Completed'
          },
          showStatusGetApiResponseTable: props.showStatusGetApiResponseTable,
          statusGetApiResponseStatus: ''
        };
    
        this.handleUriChange = this.handleUriChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      };

    componentDidUpdate(prevProps, prevState) {
      if (prevState.showStatusGetApiResponseTable !== this.props.showStatusGetApiResponseTable) {
        this.setState({
          statusQueryGetUri: this.props.triggerApiResponseParams.statusQueryGetUri,
          triggerApiResponseParams: this.props.triggerApiResponseParams,
          showStatusGetApiResponseTable: this.props.showStatusGetApiResponseTable
        });
      }
    }

      handleUriChange(event) {
        this.setState({statusQueryGetUri: event.target.value});
      }
    
      async handleSubmit(event) {
        event.preventDefault();

        const requestOptions = {
          method: 'GET',
          mode: 'cors', 
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        };

        const response = await fetch(this.state.statusQueryGetUri, requestOptions);
        const data = await response.json();
        console.log('fetched data: response: ' + JSON.stringify(data));

        if (data !== null) {
          let statusGetApiResponseStatus = 'fetched data: response status: ' + JSON.stringify(response.status);

          this.setState({
            showStatusGetApiResponseTable: true,
            statusGetApiResponseStatus: statusGetApiResponseStatus
          });
          this.props.parentCallback({showStatusGetApiResponseTable: true});

          this.setState({statusGetApiResponseParams: data});
        }
      }
    
      render() {
        const checkStatus = this.state.showStatusGetApiResponseTable;
        let renderComponent;
        if (checkStatus) {
          renderComponent = <CulpritPrStatusGetResponse 
                              statusGetApiResponseParams={this.state.statusGetApiResponseParams}
                              parentCallback={this.props.parentCallback}>
                            </CulpritPrStatusGetResponse>
        } else {
          renderComponent = <form>
                              <div className="user-box">
                                <input type="text" value={this.state.statusQueryGetUri} onChange={this.handleUriChange} />
                                <label>Status Query URI</label>
                              </div>
                      
                              <a onClick={this.handleSubmit}>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                Check Status
                              </a>

                              <label>
                                <span></span>
                                <span></span>
                                {this.state.statusGetApiResponseStatus}
                              </label>
                            </form>
        }
        return (
          <div>
            {renderComponent}
        </div>
        );
      }
}

export default CheckStatus;