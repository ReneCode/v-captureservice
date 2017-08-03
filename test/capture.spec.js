
let axios = require('axios');

let should = require('chai').should();

const PORT = 3103;
const host = `http://localhost:${PORT}`;


describe("capture REST interface", () => {

  before("set axios header", () => {
    axios.defaults.headers["Content-Type"] = "application/json";
  });


  const URL = `${host}/api/v1/captures`;
  const projectId = "unit-test-project";
  const pageId = "unit-test-page";

  it("post / capture picture", () => {
    const data = {
      projectId,
      pageId,
      url: "http://www.google.com",
      viewportSize: { width: 400, height: 300 },
      filePath: "capture.png"
    }
    return axios.post(URL, data).then(res => {
      res.should.be.not.null;
      res.data.should.be.a('string');
    });
  }).timeout(5000);

  it("get / get captured picture", () => {
    const url = `${URL}/${projectId}/${pageId}`;
    return axios.get(url).then(res => {
      res.should.be.not.null;
      res.data.should.be.not.null;
      res.headers.should.have.property('content-type', 'image/png');
    });
  });

})

