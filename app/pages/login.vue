<template>
  <LoginPage />
</template>

<script setup lang="ts">
import { LoginPage } from "~/views/auth";

definePageMeta({ middleware: "guest" });
</script>
