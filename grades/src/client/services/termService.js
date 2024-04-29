import { request } from "@ombiel/aek-lib"

export const getTerm = () => {
  return new Promise((resolve, reject) => {
    request
      .action("get-terms")
      .end((err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res.body.resultado)
        }
      })
  })
}
