
let axios = require('axios');

let should = require('chai').should();

const PORT = 3003;
const host = `http://localhost:${PORT}`;


describe("capture REST interface", () => {

  before("set axios header", () => {
    axios.defaults.headers["Content-Type"] = "application/json";
  });


  const URL = `${host}/api/v1/captures`;

  it("post", () => {

    const data = {
      projectId: "aa7c8e1e-0ced-4c4e-a436-0828b8bb1138",
      pageId: "e79687f9-49c3-43eb-84ea-4a88755487de",
      url: "http://v-project.azurewebsites.net/project/aa7c8e1e-0ced-4c4e-a436-0828b8bb1138/page/e79687f9-49c3-43eb-84ea-4a88755487de",
      viewportSize: { width: 400, height: 300 },
      filePath: "capture.png"
    }
    return axios.post(URL, data).then(res => {
      res.should.be.not.null;
      res.data.should.be.a('string');
    });
  });
})

