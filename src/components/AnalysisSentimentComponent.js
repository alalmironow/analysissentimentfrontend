import React from 'react'
import DI from '../DI'
import Spinner from 'react-spinkit'
import './../styles/AnalysisSentimentComponent.css'

const EXECUTE = "EXECUTE"
const ERROR = "ERROR"

const UPDATE_INTERVAL_SECONDS = 5000

class AnalysisSentimentComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            state: EXECUTE,
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
            {this.state.state === EXECUTE && 
                <React.Fragment>
                    <Spinner name="circle" color="blue" style={{width: 100, height: 100}}/>
                    <h2 className="processMessage">{this.state.processMessage}</h2>
                </React.Fragment>
            }
            {this.state.state === ERROR && 
                <h2 className="processMessage">{this.state.error}</h2>
            }
        </div>
    }

    getParamByName(paramName) {
        const search = this.props.location.search
        const indexEqual = search.indexOf("=") + 1
        return search.substring(indexEqual)
    }

    handleSuccessCreateClaim(data) {
        this.claimId = data.object
        const newState = {...this.state}
        newState['processMessage'] = "Запрос успешно отправлен"
        this.setState(newState)
        this.jobId = setInterval(() => this.updateProcess(), UPDATE_INTERVAL_SECONDS)
    }

    errorCreateClaim(error) {
        this.showError("Ошибка при создании заявки на анализ")
    }

    updateProcess(claimId) {
        this.analysisUseCase.processClaim(
            this.claimId,
            (data) => this.handleSuccessProcessClaim(data),
            () => { this.showError("Ошибка процессе выполнения анализа") }
        )
    }

    showError(error) {
        const newState = {...this.state}
        newState['state'] = ERROR
        newState['error'] = error
        this.setState(newState)
    }

    handleSuccessProcessClaim(data) {
        if (data.errorCode == 1) {
            this.showError(data.errorMessage)
            return
        }
        let processClaim = data.object;
        if (processClaim.stage === "FINISH") {
            this.props.history.replace(`/result?id=${this.claimId}`)
        } else if (processClaim.stage === "ERROR") {
            let error = "Ошибка в процессе выполнения анализа"
            let newState = {...this.state}
            newState['error'] = error
            newState['stage'] = ERROR
            this.setState(newState)
        } else {
            let processMessage = ""
            console.log(processClaim.stage)
            switch(processClaim.stage) {
                case "PENDING":
                    processMessage = "Ожидает выполнения";
                    break;
                case "LOAD_DATA":
                    processMessage = "Загрузка данных"; 
                    break;
                case "EXECUTE":
                    processMessage = `Идет процесс анализа данных. Выполнено ${processClaim.percent} %`
                    break;
            }
            console.log(processMessage)
            let newState = {...this.state}
            newState['processMessage'] = processMessage
            this.setState(newState)
        }
    }
}

export default AnalysisSentimentComponent