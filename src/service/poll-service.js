import {env} from "../env";
import * as util from './utils'

/**
 * Poll Service
 */
export default {
  // poll list
  retrievePollList: async (course) => {
    const {subjCd, subjSeq} = course
    let data = []
    const query = util.objectToQuerystring({subjCd, subjSeq})
    const param = {
      mode: 'cors'
    }

    try {
      const res = await fetch(`${env.api}/pollList.do${query}`, param)
      if (res.ok) {
        data = await res.json()
      }
    } catch (e) {
      console.error('retrievePollList error occur!', e)
    }

    return data
  },

  // [student] poll 답안 제출
  submitPollAnswer: async (data) => {
    const param = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    const uri = `${env.api}/submitPollAnswer.do`
    console.log(uri, param)

    try {
      const res = await fetch(uri, param)
      console.log('fetched!!', res)
      if (res.ok) {
        return true;
      }
    } catch (e) {
      console.error(e, 'submitPollAnswer error occur!!!', e)
    }

    return false
  }
}

