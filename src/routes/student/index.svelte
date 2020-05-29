<!--
    Live.N Main page
    1. Connect to socket
        - namespace: subjCd
        - userId: session.userId

    2.
-->
<script>
    const subjCd = 'ON1234'; // TODO blackpet: socket namespace by subjCd
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

    }
</script>


<svelte:head>
    <title>Live.N Student</title>
</svelte:head>

<h1>student page!</h1>

userId: <input type="text" bind:value={userId}>
<button on:click={connect}>Connect</button>

<ul>
    <li><a href="quiz" on:click|preventDefault="{() => goto('quiz')}">Quiz</a></li>
    <li><a href="student/poll">Poll</a></li>
    <li><a href="student/survey">Survey</a></li>
    <li><a href="student/qna">Q&A</a></li>
    <li><a href="student/share">Share</a></li>
</ul>
