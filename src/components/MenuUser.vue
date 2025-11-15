<template>
  <div class="flex flex-row justify-around p-3 bg-[#635950]">
    <RouterLink
      to="/user/homepage"
      class="px-4 py-2 rounded-lg text-[#FFF5E1] font-[Anta] whitespace-nowrap text-center hover:text-[#A45338] hover:bg-[#FFF5E1] transition-colors duration-200 mx-1"
      :class="{ 'text-[#FFF5E1] bg-[#A45338]': $route.path === 'homepage' }"
    >
      Accueil
    </RouterLink>

    <RouterLink
      to="/user/furniture/on/sell"
      class="px-4 py-2 rounded-lg text-[#FFF5E1] font-[Anta] whitespace-nowrap text-center hover:text-[#A45338] hover:bg-[#FFF5E1] transition-colors duration-200 mx-1"
      :class="{ 'text-[#FFF5E1] bg-[#A45338]': $route.path === 'furniture/on/sell' }"
    >
      Mes meubles en vente
    </RouterLink>

    <RouterLink
      to="/user/profile"
      class="px-4 py-2 rounded-lg text-[#FFF5E1] font-[Anta] whitespace-nowrap text-center hover:text-[#A45338] hover:bg-[#FFF5E1] transition-colors duration-200 mx-1"
      :class="{ 'text-[#FFF5E1] bg-[#A45338]': $route.path === 'profile' }"
    >
      Profil
    </RouterLink>
  </div>
</template>
