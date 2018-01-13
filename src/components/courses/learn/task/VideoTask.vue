<template>

  <youtube
    :video-id="activeTask.data.url"
    player-width="100%"
    :player-vars="{ autoplay: 0 }"
    @ended=""
  />

</template>

<script>
export default {
  props: ['activeTask']
};
</script>

<style scoped>
</style>
