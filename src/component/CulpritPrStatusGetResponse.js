import React from 'react';
import '../css/form.css';
import '../css/table.css';

export default class CulpritPrStatusGetResponse extends React.Component {
    constructor(props){
        super();
        this.state = {
            statusGetApiResponseParams: props.statusGetApiResponseParams
        };
      };

      render() {

        let renderFailedComponent;

        let isRunCompleted = false;
        if (this.state.statusGetApiResponseParams.runtimeStatus === 'Completed') {
            isRunCompleted = true;
        }

        let wasJobSuccessful = true;
        if (isRunCompleted) {
            if (this.state.statusGetApiResponseParams.output.ExceptionIfFailed) {
                wasJobSuccessful = false;
            }
        }

        if (isRunCompleted && !wasJobSuccessful) {
            renderFailedComponent = <div>
                                        <tr>
                                            <td>Was Job Successful</td>
                                            <td>{wasJobSuccessful}</td>
                                        </tr>
                                        <tr>
                                            <td>Error Message</td>
                                            <td>{this.state.statusGetApiResponseParams.output.ExceptionIfFailed.Message}</td>
                                        </tr>
                                        <tr>
                                            <td>Failed Class Name</td>
                                            <td>{this.state.statusGetApiResponseParams.output.ExceptionIfFailed.ClassName}</td>
                                        </tr>
                                    </div>
        }

        return (
            <div className="container">
                <div className="user-box">
                    <table>
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Runtime Status</td>
                            <td>{this.state.statusGetApiResponseParams.runtimeStatus}</td>
                            </tr>
                            {renderFailedComponent}
                        </tbody>
                    </table>
                </div>
          </div>
        );
      }
}