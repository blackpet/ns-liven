<script>
    import {quiz} from '../../store/liven-data.js'
    import {onMount} from 'svelte'

    onMount(() => {
      quiz.set({type:'quiz', data:[{no:1, title:'no 1'}, {no:2, title:'no 2'}]})
    });
</script>

<svelte:head>
    <title>Live.N Tutor</title>
</svelte:head>

<h1>new Tutor</h1>

<ul>
    <li><a href="tutor2/quiz">quiz</a></li>
</ul>


<div>
  {JSON.stringify($quiz)}
</div>
