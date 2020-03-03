import NetworkService from './services/NetworkService'
import AnalysisSentimentUseCase from './businness/AnalysysSentimentUseCase'

class DI {
    getAnalysisSentimentUseCase() {
        const networkService = this.getNetworkService()
        if (this.analysisSentimentUseCase === undefined) {
            this.analysisSentimentUseCase = new AnalysisSentimentUseCase(networkService)
        }
        return this.analysisSentimentUseCase
    }

    getNetworkService() {
        if (this.networkService === undefined) {
            this.networkService = new NetworkService()
        }
        return this.networkService
    }
}

export default new DI()