const BASE_URL = "http://localhost:8080"
const CREATE_CLAIM_URL = "/api/create-analysis-claim"
const PROCESS_CLAIM = "/api/analysis-process"
const RESULT_CLAIM = "/api/analysis-result"

class NetworkService {
    createClaim(claim) {
      return this.fetchJSON(CREATE_CLAIM_URL, claim)
    }

    processClaim(claimId) {
      const params = "?id=" + claimId;
      return fetch(BASE_URL + PROCESS_CLAIM + params).then(response => response.json())
    }

    resultClaim(claimId) {
      const params = "?claim_id=" + claimId;
      return fetch(BASE_URL + RESULT_CLAIM + params).then(response => response.json())
    }

    fetchJSON(url, data) {
      return fetch(`${BASE_URL + url}`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => response.json())
    }
}

export default NetworkService