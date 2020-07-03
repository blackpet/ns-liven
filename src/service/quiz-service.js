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
function createQuizStore() {
  const {subscribe, set, update} = writable([])

  const toggleQuiz = id => {
    update(qzz => {
      const idx = qzz.indexOf(id)
      if (idx > -1) {
        // remove id
        qzz.splice(idx, 1);
      } else {
        // append id
        qzz.push(id)
      }
      // 출제 순서는 quizId 순 (DB SELECT 순)
      qzz.sort()

      return qzz
    })
  }

  return {
    subscribe,
    toggleQuiz,
    set,
    reset: () => set([])
  }
}
export const quizzes = createQuizStore()
