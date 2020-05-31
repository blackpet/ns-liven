<script>
  import {quiz, setFoo, getFoo} from '../../store/liven-data.js'
  import Storage from '../../liven-store'
  import {onMount} from 'svelte'

  let key1;

  onMount(() => {
    quiz.set({type: 'quiz', data: [{no: 1, title: 'no 1'}, {no: 2, title: 'no 2'}]})
    setFoo(234)
    // Storage.put('key1', {k: 'key1', v: 'val1'})
    // Storage.put('key2', {k: 'key2', v: 'val2'})
    // console.log(Storage.keys())
    //
    // key1 = Storage.get('key1');
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
  quiz: {JSON.stringify($quiz)}
</div>

<!--<div>-->
<!--  key1: {JSON.stringify($key1)}-->
<!--</div>-->
