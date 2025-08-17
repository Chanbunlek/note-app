<template>
    <div>
        <Dialog v-model="isOpen">
            <div class="bg-white px-6 py-5 text-start w-[300px] rounded-[10px] space-y-2">
                <div class="text-[20px] font-bold">{{ option == 'create' ? "Create new note" : "Edit note" }}</div>

                <Form @submit="onSubmit" :validation-schema="schema" class="flex flex-col">
                    <Field name="title" v-slot="{ field }" v-model="data.title">
                        <label for="title">Title</label>

                        <input v-bind="field" name="title" class="border-[2px] px-2 rounded-md border-primary"
                            type="text" placeholder="title"/>

                        <ErrorMessage name="title" class="h-5 text-[10px] font-[500] text-red-600"></ErrorMessage>
                    </Field>

                    <Field name="content" v-slot="{ field }" v-model="data.content">
                        <label for="content">Content</label>

                        <textarea v-bind="field" name="content" class="border-[2px] px-2 rounded-md border-primary" placeholder="content"></textarea>

                        <ErrorMessage name="content" class="h-5 text-[10px] font-[500] text-red-600"></ErrorMessage>
                    </Field>

                    <div class="flex justify-end gap-4 mt-5">
                        <button class="bg-orange-400 rounded-[5px] px-2 font-[500]"
                            @click="isOpen = false">Cancel</button>

                        <button class="bg-blue-400 flex gap-1 rounded-[5px] px-2 font-[500]" type="submit">
                            <ArrowPathIcon class="w-5 animate-spin" v-if="submit"></ArrowPathIcon>
                            Submit
                        </button>
                    </div>
                </Form>
            </div>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import Dialog from './Dialog.vue';
import type { CreateNote } from '../types';
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useNoteStores } from '../store/note';
import { object, string } from 'yup';
import { ArrowPathIcon } from '@heroicons/vue/20/solid';

const props = withDefaults(
    defineProps<{
        id?: number,
        option?: 'create' | 'edit',
        title?: string,
        content?: string
    }>(), {
    option: 'create'
}
)

const schema = object({
    title: string().required().label("Title"),
    content: string().required().label("Content")
})

const noteStore = useNoteStores()
const submit = ref(false)

const isOpen = defineModel<boolean>('isOpen')

const data = reactive<CreateNote>({
    title: "",
    content: ""
})

const onSubmit = async () => {
    submit.value = true
    if (props.option == 'create')
        await noteStore.createNote(data)
    else await noteStore.editNote(props.id ?? 0, data)

    data.title = ""
    data.content = ""
    submit.value = false
    isOpen.value = false
}

onMounted(async () => {
    data.title = props.title ?? ""
    data.content = props.content ?? ""
})

watch(
    () => [
        props?.title,
        props?.content
    ],
    () => {
        data.title = props.title ?? "",
        data.content = props.content ?? ""
    },
    {
        deep: true
    }
)
</script>
