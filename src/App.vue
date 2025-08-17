<template>
  <div class="md:mx-[200px] mx-[10px] bg-white my-[50px] shadow-outer rounded-[10px]">
    <div
      class="flex w-full text-[25px] justify-between items-center font-bold py-[10px] px-[20px] text-primary rounded-[10px] bg-primary/15">
      <div class="flex gap-[10px]">
        <BookOpenIcon class="w-10"></BookOpenIcon>
        My Notes
      </div>

      <PlusIcon @click="isCreate = true" class="w-8 h-8 border-[2px] cursor-pointer border-primary rounded"></PlusIcon>
    </div>

    <div class="flex p-2 justify-between gap-2 flex-wrap">
      <Listbox v-model="selectedOption">
        <div class="relative mt-1">
          <div class="flex gap-1 items-center">
            <div class="font-bold pl-4">Sort by : </div>

            <ListboxButton
              class="relative w-[150px] cursor-pointer rounded-lg bg-primary/15 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-primary/10 focus-visible:ring-2 focus-visible:ring-primary/75 focus-visible:ring-offset-2 sm:text-sm">
              <span class="block truncate">{{ selectedOption.name }}</span>

              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>
          </div>

          <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <ListboxOptions
              class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              <ListboxOption v-slot="{ active, selected }" v-for="person in options" :key="person.name" :value="person"
                as="template">
                <li :class="[
                  active ? 'bg-primary/10 text-primary' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]">
                  <span :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]">{{ person.name }}</span>
                  <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>

      <div class="flex gap-1 p-1 rounded bg-primary/15">
        <MagnifyingGlassIcon class="w-5 stroke-2"></MagnifyingGlassIcon>

        <input class="border-[2px] px-2 rounded-md border-primary" type="text" placeholder="Search" v-model="search"
          @keydown.enter="onSearch()" />
      </div>
    </div>

    <div class="flex flex-wrap gap-[10px] p-[20px]">
      <Box v-for="(note, idx) in notes" :key="idx" :id="note.id" :content="note.content" :title="note.title"
        :created-at="note.createdAt"></Box>
    </div>

    <ModifyDialog v-model:is-open="isCreate"></ModifyDialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useNoteStores } from './store/note';
import { storeToRefs } from 'pinia';
import Box from './components/Box.vue';
import { BookOpenIcon, PlusIcon } from '@heroicons/vue/20/solid';
import ModifyDialog from './components/ModifyDialog.vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const options = [
  { name: "None" },
  { name: 'Name' },
  { name: 'Create Date' }
]

const selectedOption = ref(options[0])

const noteStores = useNoteStores()

const { notes } = storeToRefs(noteStores)

const isCreate = ref(false)
const search = ref("")

const onSearch = async () => {
  notes.value = await noteStores.getAllNotes(search.value)
}

watch(
  () => selectedOption.value.name,
  async (newValue) => {
    if (newValue == 'None') {
      notes.value = await noteStores.getAllNotes().then()
      return notes.value
    } else {
      if (newValue == 'Name')
        notes.value = notes.value.sort((c, n) => c.title.localeCompare(n.title))
      else
        notes.value = notes.value.sort((c, n) => new Date(c.createdAt).getDate() - new Date(n.createdAt).getDate())
    }
  }
)

onMounted(async () => {
  notes.value = await noteStores.getAllNotes()
})
</script>

<style lang="scss" scoped></style>