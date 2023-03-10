<script setup lang="ts">
const { signOut, data: session } = await useSession();
const avatarUrl = computed(() => `url('${session.value?.user.image}')`);

const { t } = useI18n();

const isOpened = ref(false);
</script>

<template>
  <UiDropdown
    v-if="session?.user"
    v-model:is-opened="isOpened"
    placement="bottom-end"
  >
    <template #toggle="{ ref, props: toggleProps }">
      <button
        v-if="session.user.image"
        :ref="ref"
        v-bind="toggleProps"
        title="toggle menu"
        class="avatar"
      />

      <UiIconButton
        v-else
        :ref="ref"
        v-bind="toggleProps"
        title="toggle menu"
        icon="carbon:user-avatar-filled-alt"
      />
    </template>

    <template #menu>
      <UiDropdownItem icon="mingcute:power-line" capitalize @click="signOut()">
        {{ t('signoff') }}
      </UiDropdownItem>
    </template>
  </UiDropdown>
</template>

<style scoped lang="postcss">
.avatar {
  border-radius: var(--radius-round);
  overflow: hidden;
  background-image: v-bind(avatarUrl);
  background-size: cover;
  height: var(--size-6);
  padding: 0;
  aspect-ratio: 1;
}

.ui-dropdown-item {
  width: max-content;
}
</style>

<i18n lang="json">
{
  "en": {
    "signoff": "Sign off"
  },
  "fr": {
    "signoff": "Déconnexion"
  }
}
</i18n>
