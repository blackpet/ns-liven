<script context="module">
  export async function preload({params, query}) {
    // TODO blackpet: 실서버에 연결할 것! ?id=query.id
    const api = '//localhost:4004'
    let data;

    // Action Data 조회하자!
    const res = await this.fetch(`${api}/${params.act}`)
    if (res.ok) {
      data = await res.json();
    } else {
      data = [];
    }

    return {act: params.act, data};
  }
</script>

<script>
  export let act, data;

  import {stores} from '@sapper/app'
  import Quiz from '../../components/Quiz.svelte'
  import LivenService, {ROLE, EVENT} from '../../service/liven-service'

  const {session} = stores()

  // [출제하기]btn real-time Live.N 시작!
  function start(e) {
    const socket = LivenService.connectServer($session.ns, $session.userId, ROLE.TUTOR)

    // send action data to server
    socket.emit(EVENT.TUTOR_START_LIVEN, {
      act: e.detail.act,
      data: data
    })

    // 학습자 접속
    socket.on(EVENT.EVERYONE_CONNECT, userId => {
      console.log(EVENT.EVERYONE_CONNECT, userId)
    });

    // 학습자 접속 종료
    socket.on(EVENT.EVERYONE_DISCONNECT, userId => {
      console.log(EVENT.EVERYONE_DISCONNECT, userId)
    });

  }

</script>

<h1>Tutor : {act}</h1>

{#if ['quiz', 'poll'].indexOf(act) > -1 }
  <Quiz {data} role="{ROLE.TUTOR}" on:start={start}/>
{:else if act === 'survey'}
  Ahhhhhhhhhhhhh~~~
{/if}

