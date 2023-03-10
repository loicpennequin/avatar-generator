<script setup lang="ts">
const { data: session, getSession, signOut } = useSession();

const isOpened = computed(
  () => !!session.value && !session.value.user.tosAcceptedAt
);

const acceptTos = useTrpc().user.acceptTos.mutate;
const { t } = useI18n();

const accept = async () => {
  try {
    await acceptTos();
    getSession();
  } catch (err) {
    console.error(err);
  }
};
</script>

<template>
  <UiModal
    v-model:is-opened="isOpened"
    :is-closable="false"
    :title="t('title')"
  >
    <p>{{ t('subtitle') }}</p>

    <Tos />

    <template #footer>
      <UiButton variant="ghost" @click="signOut">{{ t('decline') }}</UiButton>
      <UiButton @click="accept">{{ t('accept') }}</UiButton>
    </template>
  </UiModal>
</template>

<style scoped lang="postcss">
p:nth-of-type(1) {
  margin-block-end: var(--size-5);
}
</style>

<i18n lang="json">
{
  "en": {
    "title": "Almost There !",
    "subtitle": "Please accept our updated terms and conditions",
    "accept": "Accept",
    "decline": "Decline"
  },
  "fr": {
    "title": "Vous y êtes presque !",
    "subtitle": "Veuillez accepter nos conditions d'utilisation",
    "accept": "J'accepte",
    "decline": "Je refuse"
  }
}
</i18n>
