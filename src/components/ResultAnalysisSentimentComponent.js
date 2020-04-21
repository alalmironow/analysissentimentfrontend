import React from 'react'
import '../styles/ResultAnalysisSentimentComponent.css'
import DI from '../DI'

import { Chart } from "react-google-charts";


class ResultAnalysisSentimentComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            errorMessage: '',
            loaded: false,
            data: []
        }
        this.analysisSentimentUseCase = DI.getAnalysisSentimentUseCase()
        this.claimId = this.getParamByName()
    }

    getParamByName() {
        const search = this.props.location.search
        const indexEqual = search.indexOf("=") + 1
        return search.substring(indexEqual)
    }

    componentDidMount() {
        this.analysisSentimentUseCase.resultProcess(
            this.claimId,
            (data) => { this.successLoad(data) },
            () => { this.showError("Ошибка загрузки данных") }
        )
    }

    successLoad(data) {
        if (data.error_code == 1) {
            this.showError(data.error)
            return
        }

        let result = data.object
        const newState = {...this.state}
        newState.data = result.statistics
        newState.loaded = true
        this.setState(newState)
    }

    showError(error) {
        let newState = {...this.state}
        newState.error = true
        newState.errorMessage = error
        this.setState(newState)
    }

    render() {
        
        let show_statistics = false
        let today_data = {}
        let year_data = []
        let year_messages_data = []
        const { error, errorMessage, loaded } = this.state

        if (loaded) {
            const { data } = this.state
            today_data = data[0]
            year_data.push([
                '', 'Результат в %'
            ])
            data.slice(1).reverse().forEach((item) => {
                year_data.push(
                    [
                        item.date,
                        item.count_positive/item.count * 100
                    ]
                )
                year_messages_data.push(`${item.date} - ${item.statistic_message}`)
            })
            year_messages_data = year_messages_data.reverse()
            show_statistics = true
        }

        return <div className="main_block">
            <div className="analysisResultInfo">
            {error && <h2>{errorMessage}</h2>}
            {!error && <h2>{`Результаты проведения анализа на ${today_data.date}`}</h2>}
            {show_statistics && 
                <React.Fragment>
                    <div className="chart" styles={{'margin-right' : '100px'}}>
                        <Chart
                            width={'500px'}
                            height={'500px'}
                            chartType="Bar"
                            loader={<div>Загрузка данных</div>}
                            data={[
                                ['', 'Позитивные',  'Негативные'],
                                [ 
                                    'Результаты анализа (в %)', 
                                    today_data.count_positive / today_data.count * 100, 
                                    today_data.count_negative / today_data.count * 100
                                ]
                            ]}
                            options={{
                                chart: {
                                    title: 'Результаты анализа',
                                    subtitle: 'Анализ мнений пользоватлей соц. сетей',
                                },
                            }}/>
                        <p className="statistic_message">{today_data.statistic_message}</p>
                    </div>

                    <h2>Результаты за прошедший год</h2>
                    <div className="chart">
                    <p className="statistic_message">{year_messages_data.map((item) => (
                        <React.Fragment key={item}>
                            {item}
                            <br/>
                        </React.Fragment>
                    ))}</p>
                    <Chart
                        width={'700px'}
                        height={'500px'}
                        chartType="AreaChart"
                        loader={<div>Загрузка данных</div>}
                        data={year_data}
                        options={{
                            title: 'Результаты анализа (в %)',
                            vAxis: { minValue: 0, maxValue: 100 }
                        }}/>
                    </div>
                </React.Fragment>}
            </div>
        </div>
    }
}

export default ResultAnalysisSentimentComponent