import NetworkService from '../services/NetworkService'

class AnalysisSentimentUseCase {

    constructor(networkService) {
        this.networkService = networkService
    }

    createClaim(q, success, error) {
        const claim = { q }
        this.networkService.createClaim(claim)
            .then(result => success(result))
            .catch(e => error(e))
    }

    processClaim(claimId, success, error) {
        this.networkService.processClaim(claimId)
        .then(result => success(result))
        .catch(e => error(e))
    }

    resultProcess(claimId, success, error) {
        this.networkService.resultClaim(claimId)
        .then(result => success(result))
        .catch(e => error(e))
    }
}

export default AnalysisSentimentUseCase