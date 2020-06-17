<script>
  import {stores, goto} from '@sapper/app'
  import {ROLE} from '../service/liven-service'
  import {LivenSocket} from '../store/action'
  import LivenService, {goList} from '../service/liven-service'

  let role, userId, subjCd = 'OF221530', subjSeq = '0001'

  const {session} = stores()
  let socket = LivenSocket.get()
  console.log(socket)
  $: {
    console.log('socket changed!', $session)
    socket = LivenSocket.get()
  }

  function disconnect() {
    // 연결된 socket 이 있으면 끊어놓고 시작하자!
    if (!!socket) {
      socket.close()
    }
    LivenSocket.reset()
    session.set({})
  }

  function start() {
    goto(`${role}?ns=${subjCd}&seq=${subjSeq}&userId=${userId}`)
  }
</script>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<h1>Nongshim Live.N</h1>
<h2 class="ac">Realtime Interaction Study</h2>

<div class="ac">
  DB 연결이 되지 않은 샘플 프로그램 입니다.
</div>

{#if socket}
  <div>Live.N 서버에 연결되어 있습니다.</div>
  <button class="btn_brownh50" on:click={disconnect}>연결끊기</button>
  <button class="btn_lGray" on:click={() => goList($session.role)}>List</button>
  <fieldset>
    <legend>session</legend>
    <pre>{JSON.stringify($session, null, 4)}</pre>
  </fieldset>

{:else}

  <div class="dummy">1. 어떤 역할 인가요?</div>
  <label class="inp_radio_nl">
    <input type="radio" bind:group={role} value="{ROLE.TUTOR}">
    <span class="txt_s18cDGray">강사</span>
    <i class="icon_rd_nl"></i>
  </label>

  <label class="inp_radio_nl">
    <input type="radio" bind:group={role} value="{ROLE.STUDENT}">
    <span class="txt_s18cDGray">학생</span>
    <i class="icon_rd_nl"></i>
  </label>


  <div class="dummy">2. 사용자 아이디: <input type="text" bind:value={userId}></div>
  <div class="dummy">3. 과정코드: <input type="text" bind:value={subjCd}></div>
  <div class="dummy">4. 차수: <input type="text" bind:value={subjSeq}></div>

  <div class="items_btn_single dummy">
    <button class="btn_brownh50" on:click={start}>
      <span class="txt_s18">자! 한번 시작해 볼까요?</span>
    </button>
  </div>

{/if}

<ol class="scenario">
  <li>강사와 학습자 간 실시간 연계 학습이 가능합니다.</li>
  <li>1. 강사
    <ol>
      <li> - tutor > Quiz 에 접속</li>
      <li> - [출제하기]</li>
      <li> - 출제 후 결과 화면으로 이동하여 학습자의 참여 결과를 실시간 모니터링</li>
      <li> - 학습자 참여 종료 후 [결과 공유하기]로 학습자에게 결과 전송</li>
    </ol>
  </li>
  <li>2. 학습자
    <ol>
      <li> - student 에 접속</li>
      <li> - 강사의 [출제하기] 대기</li>
      <li> - Quiz 정답 [제출하기]</li>
      <li> - 강사의 [결과 공유하기] 대기</li>
      <li> - 강사의 [결과 공유하기] 후 결과화면 확인</li>
    </ol>
  </li>
</ol>

<style>
  h1 {
    text-align: center;
    margin: 0 auto;
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }

  div {
    color: red;
  }

  .ac {
    text-align: center;
  }

  .scenario {
    padding: 20px;
  }

  .inp_radio_nl {
    width: 49%
  }

  .dummy {
    margin-top: 30px;
  }
</style>
