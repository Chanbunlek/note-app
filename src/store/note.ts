import { defineStore } from "pinia";
import type { Notes } from "../types";
import { ref } from "vue";
import { http } from "../utils/http";

export const useNoteStores = defineStore("useNoteStores", () => {
    const notes = ref<Notes[]>([]);

    const getAllNotes = async (): Promise<Notes[]> => {
        return await http.get("/notes").then(
            res => res.data.data
        )
    }

    return {
        notes,
        getAllNotes
    }
})
