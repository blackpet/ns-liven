import {env} from "../env";
import * as util from './utils'

/**
 * Q&A Service
 */
export default {
  // qna list
  retrieveQnaList: async (course, userId) => {
    const {subjCd, subjSeq} = course
    let data = []
    const query = util.objectToQuerystring({subjCd, subjSeq, userId})
    const param = {
      mode: 'cors'
    }

    try {
      const res = await fetch(`${env.api}/qnaList.do${query}`, param)
      if (res.ok) {
        data = await res.json()
      }
    } catch (e) {
      console.error('retrieveQnaList error occur!', e)
    }

    return data
  },

  // qna detail
  retrieveQnaDetail: async (course, userId, seq) => {
    const {subjCd, subjSeq} = course
    let data = []
    const query = util.objectToQuerystring({subjCd, subjSeq, userId, seq})
    const param = {
      mode: 'cors'
    }

    try {
      const res = await fetch(`${env.api}/qna.do${query}`, param)
      if (res.ok) {
        data = await res.json()
      }
    } catch (e) {
      console.error('retrieveQnaDetail error occur!', e)
    }

    return data
  },

  // reply comment list
  retrieveReplies: async (userId, seq) => {
    let data = []
    const query = util.objectToQuerystring({userId, seq})
    const param = {
      mode: 'cors'
    }

    try {
      const res = await fetch(`${env.api}/replies.do${query}`, param)
      if (res.ok) {
        data = await res.json()
      }
    } catch (e) {
      console.error('retrieveReplies error occur!', e)
    }

    return data
  },

  // register qna
  writeQna: async (data) => {
    const param = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    const uri = `${env.api}/insertQna.do`

    try {
      const res = await fetch(uri, param)
      if (res.ok) {
        return true;
      }
    } catch (e) {
      console.error(e, 'writeQna error occur!!!', e)
    }

    return false
  },

  // register reply
  writeReply: async (data) => {
    const param = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    const uri = `${env.api}/insertReply.do`

    try {
      const res = await fetch(uri, param)
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.error(e, 'writeReply error occur!!!', e)
    }

    return false
  },

  // toggle like
  toggleLike: async (data, like) => {
    const param = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    let uri;
    if (like) {
      uri = `${env.api}/like.do`;
    } else {
      uri = `${env.api}/dislike.do`;
    }

    try {
      const res = await fetch(uri, param)
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.error(e, 'toggleLike error occur!!!', e)
    }

    return false
  },

  // delete qna / reply
  deleteQna: async (data, like) => {
    const param = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    let uri = `${env.api}/deleteQna.do`;

    try {
      const res = await fetch(uri, param)
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.error(e, 'toggleLike error occur!!!', e)
    }

    return false
  }
}

