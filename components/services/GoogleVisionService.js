import axios from "axios";

const GoogleVisionService = {
  postImageAnalysis(payload, apiKey) {
    const cloudVision =
      "https://vision.googleapis.com/v1/images:annotate?key=" + apiKey;
    return axios
      .post(cloudVision, payload)
      .then(function(response) {
        let textContent = "";
        console.log(response.data);
        response.data.responses[0].labelAnnotations.forEach(function(
          labelAnnotation
        ) {
          textContent = textContent + "," + labelAnnotation.description;
        });

        return textContent;
      })
      .catch(function(error) {
        console.log(error, "error");
      });
  }
};

export default GoogleVisionService;
