<script context="module">
  export function preload({params}) {
    console.log('student [act]', params)
    return {act: params.act};
  }
</script>

<script>
  export let act;

  import LivenStorage from '../../store/liven-store'
  import {ROLE} from '../../service/liven-service'
  import Quiz from '../../components/Quiz.svelte'

  const data = LivenStorage.get(act)

  const acts = [
    {act: 'quiz', component: Quiz}
  ]

  function component() {
    return (acts.find(c => c.act === act)).component;
  }
</script>
<h1>Student Action</h1>

<svelte:component this="{component()}" data={$data} role="{ROLE.STUDENT}" />
