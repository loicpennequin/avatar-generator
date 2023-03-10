<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import { z } from 'zod';
import { Translation } from 'vue-i18n';

definePageMeta({
  middleware: ['public-only']
});

const { t } = useI18n();
const { signIn } = useSession();
const localePath = useLocalePath();

const FormSchema = z
  .object({
    email: z.string(),
    password: z.string(),
    passwordConfirm: z.string(),
    isTosAccepted: z.boolean()
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: t('errors.passwordMatch'),
    path: ['passwordConfirm']
  });

type FormSchema = z.infer<typeof FormSchema>;

const { handleSubmit, values } = useForm<FormSchema>({
  validationSchema: toFormValidator(FormSchema)
});

const client = useTrpc();
const { mutate: signup, error } = useMutation(
  ['signup'],
  client.user.signup.mutate,
  {
    onSuccess() {
      signIn('credentials', {
        ...values,
        callbackUrl: localePath('/')
      });
    }
  }
);

const submitErrorMessage = useSubmitError(error);

const onSubmit = handleSubmit((values) => {
  signup(values);
});
</script>

<template>
  <UiCenter>
    <UiSurface as="form" @submit.prevent="onSubmit">
      <h2>{{ t('title') }}</h2>
      <UiFormControl
        id="signup-email"
        v-slot="slotProps"
        name="email"
        :label="t('labels.email')"
      >
        <UiInputText v-bind="slotProps" />
      </UiFormControl>

      <UiFormControl
        id="signup-password"
        v-slot="slotProps"
        name="password"
        :label="t('labels.password')"
      >
        <UiInputPassword v-bind="slotProps" />
      </UiFormControl>

      <UiFormControl
        id="signup-passwordConfirm"
        v-slot="slotProps"
        name="passwordConfirm"
        :label="t('labels.passwordConfirm')"
      >
        <UiInputPassword v-bind="slotProps" />
      </UiFormControl>

      <UiFormControl
        id="signup-acceptRos"
        v-slot="slotProps"
        name="isTosAccepted"
      >
        <UiInputCheckbox v-bind="slotProps">
          {{ t('labels.acceptTos') }}
        </UiInputCheckbox>
      </UiFormControl>

      <UiButton is-pill>{{ t('submit') }}</UiButton>

      <UiFormError v-if="error" :error="submitErrorMessage" />

      <Translation keypath="signin.text" tag="p">
        <template #link>
          <UiLink :to="localePath('/signin')">{{ t('signin.link') }}</UiLink>
        </template>
      </Translation>
    </UiSurface>
  </UiCenter>
</template>

<style scoped lang="postcss">
form {
  display: flex;
  flex-direction: column;
  max-width: var(--size-sm);
  width: 100%;
  gap: var(--size-3);
}
</style>

<i18n lang="json">
{
  "en": {
    "title": "Sign up",
    "labels": {
      "email": "Email",
      "password": "Password",
      "passwordConfirm": "Confirm Password",
      "acceptTos": "I agree to the Terms of Service"
    },
    "submit": "Sign in",
    "errors": {
      "passwordMatch": "Passwords do not match"
    },
    "signin": {
      "text": "Already have an account ? {link}",
      "link": "Sign in"
    }
  },
  "fr": {
    "title": "Inscription",
    "labels": {
      "email": "Adresse e-mail",
      "password": "Mot de passe",
      "passwordConfirm": "Confirmer le mot de passe",
      "acceptTos": "J'accepte les conditions d'utilisation"
    },
    "submit": "Continuer",
    "errors": {
      "passwordMatch": "Les mots de passe ne correspondent pas"
    },
    "signin": {
      "text": "Vous avez déjà un compte ? {link}",
      "link": "Se connecter"
    }
  }
}
</i18n>
