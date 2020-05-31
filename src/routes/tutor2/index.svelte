<script>
  import {quiz} from '../../store/liven-data.js'
  import Storage from '../../liven-store'
  import {onMount} from 'svelte'
  import LivenStorage from '../../components/LivenStorage'

  // onMount(() => {
    quiz.set({type: 'quiz', data: [{no: 1, title: 'no 1'}, {no: 2, title: 'no 2'}]})
    Storage.put('key1', {k: 'key1', v: 'val1'})
    Storage.put('key2', {k: 'key2', v: 'val2'})

  const key1 = Storage.get('key1')
  const key2 = Storage.get('key2')
  // });
</script>

<svelte:head>
  <title>Live.N Tutor</title>
</svelte:head>

<h1>new Tutor</h1>

<ul>
  <li><a href="tutor2/quiz">quiz</a></li>
</ul>


<div>
  quiz: {JSON.stringify($quiz)}
</div>

<div>
  key1: {JSON.stringify($key1)}
</div>

<div>
  key2: {JSON.stringify($key2)}
</div>
<LivenStorage />
