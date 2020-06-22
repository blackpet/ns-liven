import {env} from '../env'
import * as util from './utils'

/**
 * Live Share Service
 */
export default {

  // Live Share 목록
  retrieveShareList: async (course) => {
    const {subjCd, subjSeq} = course
    let list = []
    const query = util.objectToQuerystring({subjCd, subjSeq})

    try {
      const res = await fetch(`${env.api}/shareList.do${query}`);
      if (res.ok) {
        list = await res.json()
      }
    } catch (e) {
      console.error('retrieveShareList error occur!', e)
    }

    return list
  },

  // Live Share 자료(slide) 조회
  retrieveShareDetail: async (subjCd, id) => {
    let list = []
    const query = util.objectToQuerystring({subjCd, id})

    try {
      const res = await fetch(`${env.api}/shareDetail.do${query}`);
      if (res.ok) {
        list = await res.json()
      }
    } catch (e) {
      console.error('retrieveShareDetail error occur!', e)
    }

    return list
  }
}
