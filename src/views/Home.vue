<template>
  <Page title="Home">
    <p>
      Welcome home
    </p>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Page from '@/components/ui/Page.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Page
  }
});
</script>
