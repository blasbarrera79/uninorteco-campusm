import { request } from "@ombiel/aek-lib";

export const getGrades = (nrc) => {
  const requestBody = {
    user: "vergaradl",
    nrc: nrc,
    periodo: "202310",
  };

  return new Promise((resolve, reject) => {
    request
      .action("get-grades")
      .send({ requestBody: JSON.stringify(requestBody) })
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body.resultado);
        }
      });
  });
};
