import axios from "axios";

const api = axios.create({
  baseURL: "https://memob-bvn7xftkea-uc.a.run.app",
});

export function login(creds) {
  return api.post("/auth", creds).then(successStatus).catch(internalServerError);
}

export function getMemories(page, limit, publicKey) {
   api.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("access_token");
   return api.get(`/v1/memories?page=${page}&limit=${limit}&pk=${publicKey}`)
	.then(successStatus)
	.catch(internalServerError)
}

export function validatePublicKey(key) {
   api.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("access_token");
   return api.post("/v1/validate-key", key)
	.then(successStatus)
	.catch(internalServerError)
}

function internalServerError(err) {
   return err.response
}

function successStatus(res) {
   return res
}
