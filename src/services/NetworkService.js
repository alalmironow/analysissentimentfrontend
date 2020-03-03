const BASE_URL = "http://localhost:8080"
const CREATE_CLAIM_URL = "/api/create-analysis-claim"

class NetworkService {
    createClaim(claim) {
        return fetch(`${BASE_URL + CREATE_CLAIM_URL}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(claim)
          }).then(response => response.json())
    }
}

export default NetworkService