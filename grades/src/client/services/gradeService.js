import { request } from "@ombiel/aek-lib";

export const getGrades = (user,nrc,term) => {
  const requestBody = {
    user: user,
    nrc: nrc,
    periodo: term,
  };

  console.log('requestBody',requestBody)

  return new Promise((resolve, reject) => {
    request
      .action("get-grades")
      .send({ requestBody: JSON.stringify(requestBody) })
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          console.log(res)
          resolve(res.body.resultado);
        }
      });
  });
};
