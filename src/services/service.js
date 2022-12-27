import axios from "axios";

const api = axios.create({
  baseURL: "https://memob-bvn7xftkea-uc.a.run.app",
});

export function login(creds) {
  return api.post("/auth", creds).then(successStatus).catch(internalServerError);
}

function internalServerError(err) {
   return err.response
}

function successStatus(res) {
   return res.data
}
