<template>
    <Menu as="div" class="relative inline-block text-left">
        <MenuButton class="bg-primary/90 rounded-[5px]">
            <EllipsisVerticalIcon class="h-5 p-0.5 text-primary-200 text-white" />
        </MenuButton>

        <transition enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <MenuItems
                class="absolute p-1 right-0 w-[130px] mt-2 z-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                <button :class="[
                    active ? 'bg-primary/10 text-primary' : 'text-gray-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]" @click="onEdit">
                    <PencilSquareIcon :active="active" class="mr-2 h-5 w-5 text-primary" aria-hidden="true" />
                    Edit
                </button>
                </MenuItem>

                <MenuItem v-slot="{ active }">
                <button :class="[
                    active ? 'bg-primary/10 text-primary' : 'text-gray-900',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                ]" @click="onDelete">
                    <TrashIcon :active="active" class="mr-2 h-5 w-5 text-primary" aria-hidden="true" />
                    Delete
                </button>
                </MenuItem>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { TrashIcon, EllipsisVerticalIcon } from '@heroicons/vue/20/solid'
import { PencilSquareIcon } from '@heroicons/vue/24/solid';

defineProps<{
    delete: boolean
}>()

const emits = defineEmits(["onEdit", "update:delete"])

const onEdit = () => {
    emits("onEdit")
}

const onDelete = () => {
    emits("update:delete", true)
}
</script>
