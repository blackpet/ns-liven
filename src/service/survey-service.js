import {env} from "../env";
import * as util from './utils'

/**
 * Survey Service
 */
export default {

  // survey list
  retrieveSurveyList: async (course, userId) => {
    const {subjCd, subjSeq} = course
    let data = []
    const query = util.objectToQuerystring({subjCd, subjSeq, userId})
    const param = {
      mode: 'cors'
    }

    try {
      const res = await fetch(`${env.api}/surveyList.do${query}`, param)
      if (res.ok) {
        data = await res.json()
      }
    } catch (e) {
      console.error('retrieveSurveyList error occur!', e)
    }

    return data
  },

  // survey result detail
  retrieveSurveyResult: async (course, id) => {
    const {subjCd, subjSeq} = course
    let data = []
    const query = util.objectToQuerystring({subjCd, subjSeq, id})
    const param = {
      mode: 'cors'
    }

    try {
      const res = await fetch(`${env.api}/survey.do${query}`, param)
      if (res.ok) {
        data = await res.json()
      }
    } catch (e) {
      console.error('retrieveSurveyResult error occur!', e)
    }

    return data
  }
}

