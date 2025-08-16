<template>
    <div class="p-[10px] bg-primary/15">
        <div>
            <div class="text-[20px">
                {{ title }}
            </div>

            <Menu>
                <MenuButton>More</MenuButton>
                <MenuItems>
                    <MenuItem v-slot="{ active }">
                    <a :class='{ "bg-blue-500": active }' href="/account-settings">
                        Account settings
                    </a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <a :class='{ "bg-blue-500": active }' href="/account-settings">
                        Documentation
                    </a>
                    </MenuItem>
                    <MenuItem disabled>
                    <span class="opacity-75">Invite a friend (coming soon!)</span>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>

        <div class="text-[12px] justify-end">
            {{ formattedDate }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { MenuItem } from '@headlessui/vue';
import { computed } from 'vue';

const props = defineProps<{
    title?: string,
    createdAt?: Date
}>()

const formattedDate = computed(() => props.createdAt ? new Date(props.createdAt).toLocaleDateString() : "")
</script>

<style scoped></style>