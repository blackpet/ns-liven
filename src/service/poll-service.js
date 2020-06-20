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

    try {
      const res = await fetch(`${env.api}/pollList.do${query}`)
      if (res.ok) {
        data = await res.json()
      }
    } catch (e) {
      console.error('retrievePollList error occur!', e)
    }

    return data
  },
}

