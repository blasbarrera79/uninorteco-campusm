import { request } from "@ombiel/aek-lib"

export const getTerm = (USER) => {
  return new Promise((resolve, reject) => {
    request
      .action("get-terms")
      .send({ user: USER })
      .end((err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res.body.resultado)
        }
      })
  })
}
