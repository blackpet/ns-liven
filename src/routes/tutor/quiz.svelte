<script>
    export let surveyData;
    import LivenSurvey from "./liven-survey";

    let socket;
    const userId = 'tutor01';

    // listen on server...
    function listenOnServer() {
        // 수강생 접속
        socket.on('broadcast.connectUser', broadcast.connectUser);

        // 수강생 접속 종료
        socket.on('broadcast.disconnectUser', broadcast.disconnectUser);

    }

    const broadcast = {
        connectUser: (userId) => {
            console.log('broadcast.connectUser!!!', userId);
            // $(`.connect-users .${userId}`).addClass('on');
        },

        disconnectUser: (userId) => {
            console.log('broadcast.disconnectUser!!!', userId);
            // $(`.connect-users .${userId}`).removeClass('on');
        }
    };

    // events...
    const evt = {

        // [설문 조회]btn
        loadSurveyItems: async () => {
            const data = await LivenSurvey.serveSurvey();
            surveyData = {surveyItems: data, user: 'tutor'};

            console.log('surveyData', surveyData);

            // render template
            // LivenSurvey.renderSurvey('#surveyItems', surveyData);
        },

        // [설문 시작]btn
        startSurvey: () => {
            socket = LivenSurvey.connectServer(userId);

            // listen on server...
            listenOnServer();

            // 설문을 수강생에 중계하자!
            LivenSurvey.startSurvey(surveyData);
        },

        disconnect: () => {
            socket.close();
        }
    };

</script>

<svelte:head>
    <title>Quiz</title>
</svelte:head>

<h1>Quiz (Tutor)</h1>

<div class="realtime-survey tutor">

    <h1>survey items (Tutor)</h1>

    <div class="connect-users">
        <ul>
            <li class="user01"><i class="fas fa-circle"></i> <span>user01</span></li>
            <li class="user02"><i class="fas fa-circle"></i> <span>user02</span></li>
            <li class="user03"><i class="fas fa-circle"></i> <span>user03</span></li>
            <li class="user04"><i class="fas fa-circle"></i> <span>user04</span></li>
            <li class="user05"><i class="fas fa-circle"></i> <span>user05</span></li>
            <li class="user06"><i class="fas fa-circle"></i> <span>user06</span></li>
            <li class="user07"><i class="fas fa-circle"></i> <span>user07</span></li>
        </ul>
    </div>

    <button on:click={evt.loadSurveyItems}>설문 조회</button>
    <button on:click={evt.startSurvey}>설문 시작</button>
    <button on:click={evt.disconnect}>연결끊기</button>

    <div id="surveyItems">
        {#if surveyData}
        <form name="surveyFrm">
            <ol>
                {#each surveyData.surveyItems as item}
                <li id="survey{item.id}">
                    <span><input type="radio" name="surveyId" id="surveyItem{item.id}" value="{item.id}"></span>
                    <label for="surveyItem{item.id}">{@html item.subject}</label> (<span class="vote-count">{item.vote}</span>)
                </li>
                {/each}
            </ol>
        </form>
        {/if}
    </div>


</div>

<div style="clear:both;" class="test">
    <h2>vote graph animation test</h2>

    <div class="graph"><div style="width:30%;">&nbsp;<span class="percent">0%</span></div></div>
    <div>
        <button id="testDecrease">decrease</button>
        <button id="testIncrease">increase</button>
    </div>
    <div>
        <button id="testDecrease1">survey1.decrease</button>
        <button id="testIncrease1">survey1.increase</button>
    </div>
</div>
