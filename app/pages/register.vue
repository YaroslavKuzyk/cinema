<template>
  <RegisterPage />
</template>

<script setup lang="ts">
import { RegisterPage } from "~/views/auth";

definePageMeta({ middleware: "guest" });
</script>
