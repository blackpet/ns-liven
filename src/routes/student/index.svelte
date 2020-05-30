<!--
    Live.N Main page
    1. Connect to socket
        - socket.namespace = subjCd
        - userId: session.userId
        ==> connected = true

    2. store writable(socket)
-->
<script>
    import {onMount} from 'svelte';
    import LivenService, {ROLE} from '../../service/liven-service';
    import {listenOnServer} from '../../service/student-service';
    
    import {foo} from '../../sample-store'

    // TODO blackpet: onMount 접속할 것!!
    onMount(() => {
        // connect();
    });

    let subjCd = 'ON1234'; // TODO blackpet: socket namespace by subjCd
    let userId; // TODO blackpet: nsedu session.userId

    let connected = false; // socket connect state

    function goto(menu) {
        if (!userId) {
            alert('input userId!');
            return;
        }
        location.href = `student/${menu}?userId=${userId}`
    }

    function connect() {
        const socket = LivenService.connectServer(subjCd, userId, ROLE.STUDENT);
        connected = true;

        listenOnServer(socket);
    }
</script>


<svelte:head>
    <title>Live.N Student</title>
</svelte:head>

<h1>student page!</h1>
<ul>
    <li>
        subjCd: <input type="text" bind:value={subjCd}>
    </li>
    <li>
        userId: <input type="text" bind:value={userId}>
        <button on:click={connect}>Connect</button>
    </li>
</ul>

<ul>
    <li><a href="quiz" on:click|preventDefault="{() => goto('quiz')}">Quiz</a></li>
    <li><a href="student/poll">Poll</a></li>
    <li><a href="student/survey">Survey</a></li>
    <li><a href="student/qna">Q&A</a></li>
    <li><a href="student/share">Share</a></li>
</ul>

{#if connected}
    <div>대기중 입니다.....</div>
    <div>{JSON.stringify($foo)}</div>
{/if}
