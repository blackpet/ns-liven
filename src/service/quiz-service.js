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
  let value = []

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

      value = qzz
      console.log('changed value', value)

      return qzz
    })
  }

  const getValues = () => {
    return value
  }

  // 다음 문제가 있냐? 마지막 문제 = false
  const hasNextQuiz = id => {
    return value.indexOf(id.toString()) < value.length - 1
  }

  // 다음 문제 quizId
  const nextQuizId = id => {
    id = id.toString()
    // 다음 문제가 없으면 return null!
    if (!hasNextQuiz(id)) {
      return null
    }
    const idx = value.indexOf(id);
    console.log('nextQuizId', value[idx+1])
    return value[idx + 1]
  }

  return {
    subscribe,
    toggleQuiz,
    set,
    getValues,
    hasNextQuiz,
    nextQuizId,
    reset: () => set([])
  }
}
export const quizzes = createQuizStore()
