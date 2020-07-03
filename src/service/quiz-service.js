import {env} from "../env";
import * as util from './utils'
import {writable} from 'svelte/store'

/**
 * Quiz Service
 */
export default {

  // quiz list
  retrieveQuizList: async (course) => {
    const {subjCd, subjSeq} = course
    let data = []
    const query = util.objectToQuerystring({subjCd, subjSeq})

    try {
      const res = await fetch(`${env.api}/quizList.do${query}`)
      if (res.ok) {
        data = await res.json()
      }
    } catch (e) {
      console.error('retrieveQuizList error occur!', e)
    }

    return data
  },

  // [student] quiz 답안 제출
  submitQuizAnswer: async (data) => {
    const param = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    const uri = `${env.api}/submitQuizAnswer.do`

    try {
      const res = await fetch(uri, param)
      if (res.ok) {
        return true;
      }
    } catch (e) {
      console.error(e, 'submitQuizAnswer error occur!!!', e)
    }

    return false
  }
}

// 출제할 quiz id array
export const quizzes = writable([])
