import { request } from "@ombiel/aek-lib";

export const getRegistration = () => {
  return new Promise((resolve, reject) => {
    request.action("get-registration").end((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.body.resultado);
      }
    });
  });
};
