import { request } from "@ombiel/aek-lib"

const getUser = () => {
  return new Promise((resolve, reject) => {
    request
      .action("get-user")
      .end((err, res) => {
        if (err) {
          reject(err)
        } else {
          console.log(res)
          resolve(res.body.username)
        }
      })
  })
}

export async function fetchUserData() {
  try {
    const userResponse = await getUser();
    const username = userResponse.split('@')[0];
    return username;
  } catch (error) {
    throw error;
  }
}