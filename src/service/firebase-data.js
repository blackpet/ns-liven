import db from '../firebase/firebase'

const firebaseDatabase = {
  // 과정 정보 조회
  getCourseInfo: async (subjCd, subjSeq) => {
    const doc = await db.collection('courses').doc(`${subjCd}-${subjSeq}`).get() // Promise

    if (!doc.exists)
      return null

    return doc.data()
  },

  // Action Data 조회
  getActionData: async (act, subjCd, actId) => {
    console.log('getActionData', act, subjCd, actId)
    const snapshot = await db.collection(act)
      .where('subjCd', '==', subjCd)
      .where('id', '==', actId)
      .get()

    let data = snapshot.docs.map(async doc => {
      let actData = doc.data()
      actData.items = await doc.ref.collection('items').get().then(itemDoc => itemDoc.docs.map(x => x.data()))
      return actData
    })
    console.log('data', data)

    return data[0];
  },

  // Live.N 과정 목록
  getCourseList: async () => {
    const docRef = await db.collection('courses').get()

    return docRef.docs.map(x => x.data())
  },

  // Live.N 과정 정보
  setCourse: (course) => {
    return db.collection('courses').doc(`${course.subjCd}-${course.subjSeq}`).set(course)
  }
}

export default firebaseDatabase


// interface
const database = {
  // 과정 정보 조회
  getCourseInfo: (subjCd, subjSeq) => {

  }
}
