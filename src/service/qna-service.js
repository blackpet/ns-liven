import {env} from "../env"
import * as util from './utils'
import axios from 'axios'

/**
 * Q&A Service
 */
export default {
  // qna list
  retrieveQnaList: async (query) => {
    let data = []
    const q = util.objectToQuerystring(query)
    const param = {
      mode: 'cors'
    }

    try {
      const res = await fetch(`${env.api}/qnaList.do${q}`, param)
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
    const q = util.objectToQuerystring({subjCd, subjSeq, userId, seq})
    const param = {
      mode: 'cors'
    }

    try {
      const res = await fetch(`${env.api}/qna.do${q}`, param)
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
        'Content-Type': 'application/json'
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
        'Content-Type': 'application/json'
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
        'Content-Type': 'application/json'
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

  // update|delete qna / reply
  updateQna: async (data) => {
    const param = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    let uri = `${env.api}/updateQna.do`;

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

  // upload image file
  uploadImage: (image, progress) => {
    const formData = new FormData()
    formData.append('qnaImage', image)

    const res = axios.request({
      method: 'POST',
      withCredentials: true,
      credentials: true,
      url: `${env.api}/upload.do`,
      data: formData,
      onUploadProgress: progress
    })

    return res
  },

  // profile iamge src
  profileImageSrc: (userId) => {
    return `${env.nsedu}/fileUpDownload/profileImage.do?userId=${userId}`
  }
}

