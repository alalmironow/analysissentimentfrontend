import React from 'react'
import DI from '../DI'

const EXECUTE = "EXECUTE"
const FINISH = "FINISH"
const ERROR = "ERROR"

const UPDATE_INTERVAL_SECONDS = 5000

class AnalysisSentimentComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            execute: EXECUTE,
            percent: 0,
            error: null,
            processMessage: "Отправка запроса",
            statisticDate : []
        }
        this.analysisUseCase = DI.getAnalysisSentimentUseCase()
        this.q = this.getParamByName("q")
    }

    componentDidMount() {
        if (this.q) {
            this.analysisUseCase.createClaim(
                this.q, 
                (result) => this.handleSuccessCreateClaim(result),
                (error) => this.errorCreateClaim(error)
            )
        }
    }

    componentWillUnmount() {
        clearInterval(this.jobId)
    }

    render() {
        return <div className="processBlock">
            <h1>Test</h1>
        </div>
    }

    getParamByName(paramName) {
        const search = this.props.location.search
        const indexEqual = search.indexOf("=") + 1
        return search.substring(indexEqual)
    }

    handleSuccessCreateClaim(data) {
        const claimId = data.object
        this.jobId = setInterval(() => this.updateProcess(claimId), UPDATE_INTERVAL_SECONDS)
    }

    errorCreateClaim(error) {
        console.log(error)
    }

    updateProcess(claimId) {
        console.log("Update process info")
        console.log(claimId)
    }
}

export default AnalysisSentimentComponent