import NetworkService from '../services/NetworkService'

class AnalysisSentimentUseCase {

    constructor(networkService) {
        this.networkService = networkService
    }

    createClaim(q, success, error) {
        const claim = { q }
        this.networkService.createClaim(claim)
            .then(result => success(result))
            .catch(e => {
                error(e)
            })
    }
}

export default AnalysisSentimentUseCase