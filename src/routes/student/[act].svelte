<script context="module">
  export function preload({params}) {
    console.log('student [act]', params)
    return {act: params.act};
  }
</script>

<script>
  export let act;

  import {ROLE} from '../../service/liven-service'
  import LivenService from '../../service/liven-service'
  import {action} from '../../store/action'

</script>

<h1>Student Action</h1>

<svelte:component this="{LivenService.actionComponent(act)}" data={$action[act]} role="{ROLE.STUDENT}" />
