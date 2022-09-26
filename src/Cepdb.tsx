const BASE_URL = 'https://ws.apicep.com/cep';

const basicFetch = async (endpoint: string) => {
  const req = await fetch(`${BASE_URL}${endpoint}`);
  const json = await req.json();
  return json;
}

const Cepdb = {
  GetCep: async (cep: string) => {
    return await basicFetch(`/${cep}.json`);
  }
}

export default Cepdb