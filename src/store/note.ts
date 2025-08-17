import { defineStore } from "pinia";
import type { CreateNote, Notes } from "../types";
import { ref } from "vue";
import { http } from "../utils/http";
import { openToast } from "../utils/toast";

export const useNoteStores = defineStore("useNoteStores", () => {
  const notes = ref<Notes[]>([]);

  const getAllNotes = async (title?: string): Promise<Notes[]> => {
    return await http.get(`/notes?title=${title ?? ""}`).then((res) => res.data.data);
  };

  const createNote = async (data: CreateNote) => {
    await http.post(`/notes/create`, data).then(async (res) => {
      if (res.data?.status == true) {
        openToast("Creating new note successfully!", "success");
        notes.value = await getAllNotes();
      } else openToast("Creating note is not successful!", "danger");
    });
  };

  const editNote = async (id: number, data: CreateNote) => {
    await http.put(`/notes/update/${id}`, data).then(async (res) => {
      if (res.data?.status == true) {
        openToast("Editing note successfully!", "success");
        notes.value = await getAllNotes();
      } else openToast("Editing note is not successful!", "danger");
    });
  };

  const deleteNoteById = async (id: number) => {
    return await http.delete(`/notes/delete/${id}`).then(async (res) => {
      if (res.data?.status == true) {
        openToast("Deleting new note successfully!", "success");
        notes.value = await getAllNotes();
      } else openToast("Deleting note is not successful!", "danger");
    });
  };

  return {
    notes,
    getAllNotes,
    deleteNoteById,
    createNote,
    editNote
  };
});
