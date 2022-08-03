<script setup lang="ts">
import { isInvalid, useForm } from 'formis'
import { computed } from 'vue'
import { useDiskStore } from 'ducks/disk'
import { SdlButton } from 'ui/atoms'
import { SdlFieldText } from 'ui/molecules'
import { required } from 'utils/validate'
import i18n from 'i18n'
import { CreateFolderValues } from './types'

const diskStore = useDiskStore()

const emits = defineEmits<{
  (e: 'submit'): void
}>()

const { handleSubmit, isSubmitting, errors } = useForm<CreateFolderValues>({
  initialValues: {
    name: '',
  },
  validate({ name }, errors) {
    if (required(name)) errors.name = i18n.REQUIRED

    return errors
  },
})

const isDisabled = computed(() => isSubmitting.value || isInvalid(errors, ['name']))

const handleFormSubmit = handleSubmit(async values => {
  await diskStore.createFolder(values.name)
  emits('submit')
})
</script>

<template>
  <form @submit="handleFormSubmit" :class="$style.wrapper">
    <SdlFieldText name="name" placeholder="Folder name" theme="bordered" />
    <SdlButton :disabled="isDisabled">
      Create folder
    </SdlButton>
  </form>
</template>

<style module lang="scss">
.wrapper {
  padding: 16px;
  width: 382px;

  button {
    margin-top: 4px;
  }
}
</style>
