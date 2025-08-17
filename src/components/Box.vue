<template>
    <div class="p-[10px] bg-primary/15 w-[200px] rounded-[5px]">
        <div class="flex justify-between items-center">
            <div class="flex text-[24px font-bold gap-2 cursor-pointer" @click="openDialog = true">
                {{ title }}
            </div>

            <Menu @onEdit="onEdit" v-model:delete="isDelete"></Menu>
        </div>

        <div class="text-[12px] justify-end">
            {{ formattedDate }}
        </div>
    </div>
    
    <Dialog v-model="isDelete">
        <div class="bg-white rounded-[10px] space-y-[20px] p-2">
            <div>Do you want to delete?</div>
    
            <div class="flex justify-between">
                <button class="bg-red-400 rounded-[5px] px-2 font-[500]" @click="isDelete = false">Close</button>
                <button class="bg-blue-400 rounded-[5px] px-2 font-[500]" @click="onDelete(id)">Delete</button>
            </div>
        </div>
    </Dialog>

    <ModifyDialog v-model:is-open="isEdit" :id="id" :title="title" :content="content" option="edit"></ModifyDialog>

    <Dialog v-model="openDialog">
        <div class="bg-white w-[300px] rounded-md space-y-2 text-start py-3 px-5">
            <div class="text-[22px] font-[500] uppercase">
                Content of {{ title }}
            </div>

            <div>
                {{ content }}
            </div>

            <div class="flex justify-end w-full">
                <button class="bg-red-400 rounded-[5px] px-2 font-[500]" @click="openDialog = false">Close</button>
            </div>
        </div>
    </Dialog>
</template>

<script setup lang="ts">
import { useNoteStores } from '../store/note';
import Dialog from './Dialog.vue';
import Menu from './Menu.vue'
import { computed, ref } from 'vue';
import ModifyDialog from './ModifyDialog.vue';

const props = defineProps<{
    id: number,
    title: string,
    content: string,
    createdAt: Date
}>()

const noteStores = useNoteStores()

const openDialog = ref(false)
const isDelete = ref(false)
const isEdit = ref(false)

const emit = defineEmits(["update:isEdit"])

const onEdit = () => {
    isEdit.value = true
}

const onDelete = async (id: number) => {
    await noteStores.deleteNoteById(id)
    isDelete.value = false
}

const formattedDate = computed(() => props.createdAt ? new Date(props.createdAt).toLocaleDateString() : "")
</script>

<style scoped></style>