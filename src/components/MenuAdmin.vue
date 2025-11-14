<script setup lang="ts"></script>

<template>
  <div class="flex flex-row justify-around p-3 bg-[#635950]">
    <RouterLink
      to="/admin/homepage"
      class="px-4 py-2 rounded-lg text-[#FFF5E1] font-[Anta] whitespace-nowrap text-center hover:text-[#A45338] hover:bg-[#FFF5E1] transition-colors duration-200 mx-1"
      active-class="text-[#FFF5E1] bg-[#A45338]"
    >
      Accueil
    </RouterLink>

    <RouterLink
      to="/admin/profile"
      class="px-4 py-2 rounded-lg text-[#FFF5E1] font-[Anta] whitespace-nowrap text-center hover:text-[#A45338] hover:bg-[#FFF5E1] transition-colors duration-200 mx-1"
      active-class="text-[#FFF5E1] bg-[#A45338]"
    >
      Profil
    </RouterLink>
  </div>
</template>
