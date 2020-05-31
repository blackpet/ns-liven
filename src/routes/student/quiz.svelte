
<script>
    /**
     * TODO blackpet:
     * 1. Authentication (nsedu <--> live.N)
     * 2. DB 연동
     */


    let userId;

    import { onMount } from 'svelte';
    import RealtimeSurveyClient from "../../service/liven-service";
    import Storage from '../../liven-store.js';
    import {foo} from '../../sample-store.js'
    import {livenData} from '../../store/liven-data';

    let socket;
    let mode = 'vote'; // vote: 투표모드 | result: 결과모드
    let survey;
    let connected = false;
    let quiz;
    let refer;

    onMount(() => {
        //userId = $page.query.userId;
        //evt.connect();
        // quiz = Storage.get('quiz');
        // refer = Storage.get('refer');
    });


    // listen on server...
    function listenOnServer() {
        console.log('listenOnServer >> student');

        // 설문 시작!
        socket.on('broadcast.startSurvey', (_survey) => {
            survey = _survey;
            console.log('student > startSurvey', _survey);

            survey.mode = mode;
            RealtimeSurveyClient.renderSurvey('#survey', survey);
        });

        // 투표결과 갱신
        socket.on('broadcast.updateVote', (items, voteItem) => {
            survey.surveyItems = items;
            console.log('student!! updateVote');
        });

    }

    // events...
    export const evt = {

        // 서버에 접속!
        connect: () => {
            // validation
            // if (!userId) {
            //     alert('userId를 설정해 주세요');
            //     return;
            // }

            socket = RealtimeSurveyClient.connectServer(userId);

            // listen on server...
            listenOnServer();

            // swap connect state
            swapConnectState(true);

            connected = true;
        },

        // [투표하기]btn
        vote: () =>  {
            const frm = document.surveyFrm;

            // validation
            if (!frm.surveyId.value) {
                alert('투표 항목을 선택해 주세요');
                return;
            }

            // 설문항목 서버로 전송!
            // TODO DB 저장
            RealtimeSurveyClient.vote(frm.surveyId.value);

            // 결과 화면으로 전환!
            mode = survey.mode = 'result';
            changeSurveyToResult();
        },

        // [연결끊기]btn
        disconnect: () => {
            userId = null;
            socket.close();

            // swap connect state
            swapConnectState(false);

            connected = false;
        }
    };

    // swap connect state
    function swapConnectState(state) {

        // swap connect button display
        // $('#connectBtn, #disconnectBtn').toggle();
        // $('#userId').prop('disabled', state);
    }

    // 결과보기 화면으로 전환!
    function changeSurveyToResult() {
        RealtimeSurveyClient.renderSurvey('#survey', survey);

        // $('#voteBtn').addClass('hidden');
    }


</script>

<svelte:head>
    <title>Quiz</title>
</svelte:head>

<h1>Quiz (Student)</h1>


<div class="realtime-survey student">

    <div>
        userId: <input type="text" id="userId" bind:value={userId}>
        {#if !connected}
        <button on:click={evt.connect}>접속하기</button>
        {:else}
        <button on:click={evt.disconnect}>연결끊기</button>
        {/if}
    </div>

    <div id="survey">
        {#if survey}
            <form name="surveyFrm">
                <ol>
                    {#each survey.surveyItems as item}
                        <li id="survey{item.id}">
                            <span><input type="radio" name="surveyId" id="surveyItem{item.id}" value="{item.id}"></span>
                            <label for="surveyItem{item.id}">{@html item.subject}</label> (<span class="vote-count">{item.vote}</span>)
                        </li>
                    {/each}
                </ol>
            </form>
        {/if}
    </div>

    <div>
        <button on:click={evt.vote}>투표하기</button>
    </div>
    
    <div>
      data: {JSON.stringify($quiz)}
    </div>
    <div>
      refer: {JSON.stringify($refer)}
    </div>
    <div>
      livenData: {JSON.stringify($livenData)}
    </div>
    <div>
      foo: {JSON.stringify($foo)}
    </div>

</div>
