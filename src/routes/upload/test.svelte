<script>
  import FileUploader from './index.svelte'

  $: files = []

  let myFiles = []
  $: {
    console.log(myFiles)
  }

  function foo(e) {
    console.log(e.detail)
    files = e.detail.files

    myFiles = files.map(f => {
      const fr = new FileReader()
      fr.onload = (e) => {
        f.src = e.target.result
        console.log(e.target.result)
      };
      fr.readAsDataURL(f)

      return f
    })
    // console.log(myFiles)
  }
</script>


<h1>file upload test</h1>

<FileUploader on:input={foo}/>

{#if files.length === 0}
  <div>no file(s) attached..</div>

{:else}
  <ul>
    {#each myFiles as f (f.lastModified)}
      <li>
        <img src="{f.src}" alt="">
        <div>{f.name} ({f.size})</div>
      </li>
    {/each}
  </ul>

{/if}
