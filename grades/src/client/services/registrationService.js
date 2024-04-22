import { request } from "@ombiel/aek-lib"

export const getRegistration = (TERM) => {
  return new Promise((resolve, reject) => {
    request
      .action("get-registration")
      .send({ term: TERM })
      .end((err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res.body.resultado)
        }
      })
  })
}
