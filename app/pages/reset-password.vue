<template>
  <ResetPasswordPage />
</template>

<script setup lang="ts">
import { ResetPasswordPage } from "~/views/auth";

definePageMeta({ middleware: "guest" });
</script>
