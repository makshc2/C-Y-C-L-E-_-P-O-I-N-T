<script setup lang="ts">
import HomeCapsuleEvents from '@/components/home/HomeCapsuleEvents.vue'
import HomeCapsuleProjects from '@/components/home/HomeCapsuleProjects.vue'
import HomeServiceTile from '@/components/home/HomeServiceTile.vue'
import {
  homeCommunity,
  homeContacts,
  homeIntro,
  homeServiceLabels,
} from '@/content/home'
import { INSTAGRAM_URL } from '@/constants/site'
import workshopIcon from '@/assets/site/icon-workshop.png'
import rentalIcon from '@/assets/site/icon-rental.png'
import artifactsIcon from '@/assets/site/icon-artifacts.svg'
import mapUrl from '@/assets/site/map.png'
import instagramIcon from '@/assets/site/icon-instagram.svg'
</script>

<template>
  <div class="home">
    <section class="home-intro">
      <div class="home-frame">
        <p class="home-intro__text">{{ homeIntro }}</p>
        <HomeCapsuleEvents class="home-intro__capsule" />
      </div>
    </section>

    <section class="home-community">
      <div class="home-frame">
        <HomeCapsuleProjects class="home-community__capsule" />
        <div class="home-community__text">
          <p v-for="(paragraph, index) in homeCommunity" :key="index">{{ paragraph }}</p>
        </div>
      </div>
    </section>

    <section class="home-services" aria-label="Сервіси">
      <div class="home-frame">
        <HomeServiceTile
          class="home-services__workshop"
          to="/workshop"
          :icon="workshopIcon"
          :label="homeServiceLabels.workshop"
        />
        <HomeServiceTile
          class="home-services__rental"
          to="/rental"
          :icon="rentalIcon"
          :label="homeServiceLabels.rental"
        />
        <HomeServiceTile
          class="home-services__artifacts"
          to="/artifacts"
          :icon="artifactsIcon"
          :label="homeServiceLabels.artifacts"
        />
      </div>
    </section>

    <section id="contacts" class="home-contacts">
      <div class="home-frame">
        <img
          class="home-contacts__map"
          :src="mapUrl"
          width="596"
          height="374"
          alt="Мапа Cycle Point, вул. Богдана Хмельницького, 58А, Київ"
        >
        <div class="home-contacts__info">
          <p class="home-contacts__title">{{ homeContacts.hoursTitle }}</p>
          <p class="home-contacts__hours">
            {{ homeContacts.hoursWeekday }}<br>
            {{ homeContacts.hoursWeekend }}
          </p>
          <p class="home-contacts__note">{{ homeContacts.workshopNote }}</p>
          <p class="home-contacts__address">{{ homeContacts.address }}</p>
          <p class="home-contacts__phone">
            <a class="home-contacts__link" :href="`tel:${homeContacts.phone}`">{{ homeContacts.phone }}</a>
          </p>
          <p class="home-contacts__email">
            <a class="home-contacts__link" :href="`mailto:${homeContacts.email}`">{{ homeContacts.email }}</a>
          </p>
        </div>
        <a
          class="home-contacts__ig"
          :href="INSTAGRAM_URL"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram Cycle Point"
        >
          <img :src="instagramIcon" width="50" height="50" alt="Instagram">
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-intro,
.home-community,
.home-services,
.home-contacts {
  width: 100%;
}

.home-frame {
  position: relative;
  width: min(100%, var(--page-w));
  height: var(--section-h-home);
  margin: 0 auto;
}

.home-intro {
  background-color: var(--color-tiffany);
}

.home-intro__text {
  position: absolute;
  left: 149px;
  top: 142px;
  margin: 0;
  width: 635px;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-body);
  font-weight: var(--font-weight-regular);
  line-height: 28px;
  color: var(--color-fg);
}

.home-intro__capsule {
  position: absolute;
  top: 0;
  right: 0;
}

.home-community {
  background-color: var(--color-green);
}

.home-community__capsule {
  position: absolute;
  top: 0;
  left: 0;
}

.home-community__text {
  position: absolute;
  left: 864px;
  top: 100px;
  width: 716px;
}

.home-community__text p {
  margin: 0;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-body);
  font-weight: var(--font-weight-regular);
  line-height: 28px;
  color: var(--color-fg);
}

.home-services {
  background-color: var(--color-bg);
}

.home-services__workshop {
  left: 36px;
  top: 35px;
  width: 530px;
  height: 415px;
}

.home-services__workshop :deep(.tile__icon) {
  left: 155px;
  top: 44px;
  width: 200px;
  height: 200px;
}

.home-services__workshop :deep(.tile__label) {
  left: 112px;
  top: 350px;
}

.home-services__rental {
  left: 605px;
  top: 35px;
  width: 552px;
  height: 428px;
}

.home-services__rental :deep(.tile__icon) {
  left: 139px;
  top: 36px;
  width: 239px;
  height: 239px;
}

.home-services__rental :deep(.tile__label) {
  left: 193px;
  top: 350px;
}

.home-services__artifacts {
  left: 1190px;
  top: 35px;
  width: 490px;
  height: 416px;
}

.home-services__artifacts :deep(.tile__icon) {
  left: 192px;
  top: 44px;
  width: 200px;
  height: 200px;
}

.home-services__artifacts :deep(.tile__label) {
  left: 192px;
  top: 350px;
}

.home-contacts {
  scroll-margin-top: var(--header-h);
  background-color: var(--color-violet);
}

.home-contacts__map {
  position: absolute;
  left: 149px;
  top: 53px;
  width: 596px;
  height: 374px;
  max-width: none;
  object-fit: cover;
}

.home-contacts__info {
  position: absolute;
  left: 1034px;
  top: 23px;
  width: 546px;
  color: var(--color-accent-lime);
  font-family: Helvetica, var(--font-sans);
  font-weight: var(--font-weight-regular);
}

.home-contacts__info p {
  position: absolute;
  left: 0;
  margin: 0;
}

.home-contacts__title {
  top: 0;
  font-size: 32px;
  line-height: 37px;
}

.home-contacts__hours {
  top: 57px;
  font-size: 32px;
  line-height: 37px;
}

.home-contacts__note {
  top: 148px;
  width: 546px;
  font-size: 28px;
  line-height: 32px;
}

.home-contacts__address {
  top: 232px;
  font-size: 28px;
  line-height: 32px;
}

.home-contacts__phone {
  top: 284px;
  font-size: 28px;
  line-height: 32px;
}

.home-contacts__email {
  top: 336px;
  font-size: 28px;
  line-height: 32px;
}

.home-contacts__link {
  color: inherit;
}

.home-contacts__link:focus-visible,
.home-contacts__ig:focus-visible {
  outline: 2px solid var(--color-accent-lime);
  outline-offset: 2px;
}

.home-contacts__ig {
  position: absolute;
  left: 1030px;
  top: 411px;
  display: block;
  width: 50px;
  height: 50px;
}

.home-contacts__ig img {
  width: 50px;
  height: 50px;
  max-width: none;
}

@media (max-width: 1727px) {
  .home-frame {
    width: 100%;
    height: auto;
    min-height: 0;
  }

  .home-intro .home-frame {
    display: flex;
    flex-direction: column-reverse;
  }

  .home-intro__text,
  .home-intro__capsule,
  .home-community__capsule,
  .home-community__text,
  .home-contacts__map,
  .home-contacts__info,
  .home-contacts__ig,
  .home-contacts__info p {
    position: static;
  }

  .home-intro__text {
    width: auto;
    margin: 32px 16px 40px;
  }

  .home-community .home-frame {
    display: flex;
    flex-direction: column;
  }

  .home-community__text {
    width: auto;
    margin: 32px 16px 40px;
  }

  .home-services .home-frame {
    display: flex;
    flex-direction: column;
    padding: 24px 16px 48px;
  }

  .home-services__workshop,
  .home-services__rental,
  .home-services__artifacts {
    left: auto;
    top: auto;
    width: auto;
    height: auto;
  }

  .home-contacts .home-frame {
    display: flex;
    flex-direction: column;
    padding: 32px 16px 40px;
    row-gap: 24px;
  }

  .home-contacts__map {
    width: 100%;
    height: auto;
  }

  .home-contacts__info {
    width: auto;
    position: relative;
    height: auto;
  }

  .home-contacts__info p {
    position: static;
  }
}
</style>
