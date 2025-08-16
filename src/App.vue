<template>
  <div class="mx-[200px] bg-white my-[50px] shadow-outer rounded-[10px] overflow-hidden">
    <div class="text-[25px] font-bold py-[10px] px-[20px] text-primary rounded-[10px] bg-primary/15">
      My Notes
    </div>

    <div class="flex">
      <Box v-for="(note, idx) in notes" :key="idx" :title="note.title" :created-at="note.createdAt"></Box>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useNoteStores } from './store/note';
import { storeToRefs } from 'pinia';
import Box from './components/Box.vue';

const noteStores = useNoteStores()

const { notes } = storeToRefs(noteStores)

onMounted(async () => {
  notes.value = await noteStores.getAllNotes()
})
</script>

<style lang="scss" scoped></style>