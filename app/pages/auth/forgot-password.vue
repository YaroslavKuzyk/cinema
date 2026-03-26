<template>
  <ForgotPasswordPage />
</template>

<script setup lang="ts">
import { ForgotPasswordPage } from "~/views/auth";

definePageMeta({ middleware: "guest" });
</script>
