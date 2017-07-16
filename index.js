

var page = require('webpage').create();
page.viewportSize = {
  width: 800,
  height: 600
};
// page.settings.userName = 'abc@abc.com';
// page.settings.password = 'abc';
// page.customHeaders = { 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3JlbGFuZy5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NThjMzFmZjc0ZjIyMDkzZjkyN2VjNDY2IiwiYXVkIjoiYkpHWE5Td09yRnpudDZaWWV5NnhET3NTYjJJT0d3NksiLCJleHAiOjE0OTk0MDIyNTEsImlhdCI6MTQ5OTM2NjI1MSwibm9uY2UiOiJLcHVqd0xQOU1hLklwRzZzTUY5WGhDfkNtQ1p3aUZQMyIsImF0X2hhc2giOiJGSzd0ZHFxeVhqcHB6RGU4Q1ZYb1V3In0.pBTBsjyKPxECepoGVbl_0csIMaVwNGbwJ1Puc7HcWFY' };
var url = "http://localhost:8080/";
page.open(url, function (status) {
  console.log("status:", status);
  if (status === "success") {

    var x = 42;
    page.includeJs("https://code.jquery.com/jquery-2.2.4.min.js", function () {
      x = 37;
      x = page.evaluate(function () {
        x = 111;
        var ele = $("#login");
        ele.click();

        alert("hallo");

        // ele = $(".auth0-lock-input");
        // ele.value="abc@abc.com";

      });
      console.log("X:", x);
      page.render("pic.png");

      phantom.exit();
    });
  }
});

