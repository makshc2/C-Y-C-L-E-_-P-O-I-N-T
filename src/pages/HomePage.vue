<script setup lang="ts">
import HomeCapsuleEvents from '@/components/home/HomeCapsuleEvents.vue'
import HomeCapsuleProjects from '@/components/home/HomeCapsuleProjects.vue'
import HomeServiceTile from '@/components/home/HomeServiceTile.vue'
import HomeMap from '@/components/home/HomeMap.vue'
import {
  homeCommunity,
  homeContacts,
  homeIntro,
  homeServiceLabels,
} from '@/content/home'
import { INSTAGRAM_URL, getVenueDirectionsUrl } from '@/constants/site'
import workshopIcon from '@/assets/site/icon-workshop.png'
import rentalIcon from '@/assets/site/icon-rental.png'
import artifactsIcon from '@/assets/site/icon-artifacts.svg'
import instagramIcon from '@/assets/site/icon-instagram.svg'

const directionsUrl = getVenueDirectionsUrl()
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
        <HomeMap class="home-contacts__map" />
        <div class="home-contacts__info">
          <p class="home-contacts__title">{{ homeContacts.hoursTitle }}</p>
          <p class="home-contacts__hours">
            {{ homeContacts.hoursWeekday }}<br>
            {{ homeContacts.hoursWeekend }}
          </p>
          <p class="home-contacts__note">{{ homeContacts.workshopNote }}</p>
          <a
            class="home-contacts__address"
            :href="directionsUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ homeContacts.address }}
          </a>
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
  display: flex;
  width: min(100%, var(--page-w));
  height: auto;
  margin: 0 auto;
  gap: 32px;
  padding-inline: clamp(16px, 8.62vw, var(--gutter));
}

.home-intro {
  background-color: var(--color-tiffany);
}

.home-intro .home-frame {
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  min-height: var(--section-h-home);
}

.home-intro__text {
  position: static;
  flex: 1 1 0;
  min-width: 0;
  width: auto;
  max-width: 635px;
  margin: auto 0;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-body);
  font-weight: var(--font-weight-regular);
  line-height: 28px;
  color: var(--color-fg);
}

.home-intro .home-intro__capsule {
  position: relative;
  flex: 1 1 40%;
  min-width: 0;
  width: min(100%, var(--capsule-events-w));
  max-width: var(--capsule-events-w);
}

.home-community {
  background-color: var(--color-green);
}

.home-community .home-frame {
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  min-height: var(--section-h-home);
}

.home-community .home-community__capsule {
  position: relative;
  flex: 1 1 40%;
  min-width: 0;
  width: min(100%, var(--capsule-projects-w));
  max-width: var(--capsule-projects-w);
}

.home-community__text {
  position: static;
  flex: 1 1 0;
  min-width: 0;
  width: auto;
  max-width: 716px;
  margin: auto 0;
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

.home-services .home-frame {
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: clamp(8px, 2vw, 40px);
  min-height: var(--section-h-home);
  padding-inline: clamp(8px, 2.08vw, 36px);
  padding-block: 35px 0;
}

.home-services__workshop,
.home-services__rental,
.home-services__artifacts {
  position: relative;
  left: auto;
  top: auto;
  flex: 1;
  min-width: 0;
  width: auto;
}

.home-services__workshop {
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

.home-contacts .home-frame {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: 1fr auto;
  column-gap: 32px;
  row-gap: 16px;
  align-items: start;
  min-height: var(--section-h-home);
  padding-block: 24px;
}

.home-contacts__map {
  position: static;
  grid-column: 1;
  grid-row: 1 / -1;
  width: 100%;
  height: auto;
  max-width: 596px;
  aspect-ratio: 596 / 374;
}

.home-contacts__info {
  position: static;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  grid-column: 2;
  grid-row: 1;
  width: auto;
  max-width: 546px;
  color: var(--color-accent-lime);
  font-family: Helvetica, var(--font-sans);
  font-weight: var(--font-weight-regular);
}

.home-contacts__info p,
.home-contacts__address {
  position: static;
  margin: 0;
}

.home-contacts__title {
  font-size: 32px;
  line-height: 37px;
}

.home-contacts__hours {
  font-size: 32px;
  line-height: 37px;
}

.home-contacts__note {
  width: auto;
  font-size: 28px;
  line-height: 32px;
}

.home-contacts__address {
  padding: 0;
  border: 0;
  background: transparent;
  font-family: inherit;
  font-size: 28px;
  line-height: 32px;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.home-contacts__address:hover {
  text-decoration: underline;
}

.home-contacts__phone {
  font-size: 28px;
  line-height: 32px;
}

.home-contacts__email {
  font-size: 28px;
  line-height: 32px;
}

.home-contacts__link {
  color: inherit;
}

.home-contacts__address:focus-visible,
.home-contacts__link:focus-visible,
.home-contacts__ig:focus-visible {
  outline: 2px solid var(--color-accent-lime);
  outline-offset: 2px;
}

.home-contacts__ig {
  position: static;
  grid-column: 2;
  grid-row: 2;
  display: block;
  width: 50px;
  height: 50px;
}

.home-contacts__ig img {
  width: 50px;
  height: 50px;
  max-width: none;
}

@media (max-width: 1279px) {
  .home-intro .home-frame,
  .home-community .home-frame,
  .home-contacts .home-frame {
    padding-inline: 16px;
    gap: 24px;
  }

  .home-services .home-frame {
    flex-wrap: wrap;
    padding: 24px 16px 48px;
  }

  .home-services__workshop,
  .home-services__rental,
  .home-services__artifacts {
    flex: 1 1 calc(50% - 16px);
  }
}

@media (max-width: 767px) {
  .home-intro .home-frame,
  .home-community .home-frame,
  .home-services .home-frame,
  .home-contacts .home-frame {
    display: flex;
    flex-direction: column;
    min-height: 0;
    gap: 24px;
    padding: 24px 16px 40px;
  }

  .home-intro__text,
  .home-community__text {
    max-width: none;
    margin: 0;
  }

  .home-intro .home-intro__capsule,
  .home-community .home-community__capsule {
    position: relative;
    flex: none;
    width: 100%;
    max-width: 100%;
    height: auto;
  }

  .home-services .home-frame {
    align-items: stretch;
  }

  .home-services__workshop,
  .home-services__rental,
  .home-services__artifacts {
    flex: none;
    align-self: stretch;
    width: 100%;
    height: auto;
  }

  .home-services__workshop :deep(.tile__icon),
  .home-services__rental :deep(.tile__icon),
  .home-services__artifacts :deep(.tile__icon),
  .home-services__workshop :deep(.tile__label),
  .home-services__rental :deep(.tile__label),
  .home-services__artifacts :deep(.tile__label) {
    position: static;
    left: auto;
    top: auto;
    width: auto;
    height: auto;
  }

  .home-services__workshop :deep(.tile__icon),
  .home-services__rental :deep(.tile__icon),
  .home-services__artifacts :deep(.tile__icon) {
    width: min(var(--icon-glyph), 40vw);
  }

  .home-contacts__map,
  .home-contacts__info,
  .home-contacts__ig {
    grid-column: auto;
    grid-row: auto;
    max-width: none;
  }

  .home-contacts__map {
    width: 100%;
    height: auto;
    aspect-ratio: 596 / 374;
  }

  .home-contacts__info {
    width: auto;
  }
}

@media (min-width: 1728px) {
  .home-frame {
    display: block;
    height: var(--section-h-home);
    gap: 0;
    padding: 0;
  }

  .home-intro .home-frame,
  .home-community .home-frame,
  .home-services .home-frame,
  .home-contacts .home-frame {
    display: block;
    min-height: 0;
    padding: 0;
    gap: 0;
  }

  .home-intro__text {
    position: absolute;
    left: 149px;
    top: 142px;
    margin: 0;
    width: 635px;
    max-width: none;
    flex: none;
  }

  .home-intro .home-intro__capsule {
    position: absolute;
    top: 0;
    right: 0;
    flex: none;
    width: var(--capsule-events-w);
    max-width: none;
    min-width: 0;
  }

  .home-community .home-community__capsule {
    position: absolute;
    top: 0;
    left: 0;
    flex: none;
    width: var(--capsule-projects-w);
    max-width: none;
    min-width: 0;
  }

  .home-community__text {
    position: absolute;
    left: 864px;
    top: 100px;
    width: 716px;
    max-width: none;
    margin: 0;
    flex: none;
  }

  .home-services__workshop,
  .home-services__rental,
  .home-services__artifacts {
    position: absolute;
    flex: none;
    min-width: 0;
  }

  .home-services__workshop {
    left: 36px;
    top: 35px;
    width: 530px;
    height: 415px;
  }

  .home-services__rental {
    left: 605px;
    top: 35px;
    width: 552px;
    height: 428px;
  }

  .home-services__artifacts {
    left: 1190px;
    top: 35px;
    width: 490px;
    height: 416px;
  }

  .home-contacts__map {
    position: absolute;
    left: 149px;
    top: 53px;
    width: 596px;
    height: 374px;
    max-width: none;
    aspect-ratio: auto;
    grid-column: auto;
    grid-row: auto;
  }

  .home-contacts__info {
    position: absolute;
    display: block;
    left: 1034px;
    top: 23px;
    width: 546px;
    max-width: none;
    gap: 0;
    grid-column: auto;
    grid-row: auto;
  }

  .home-contacts__info p,
  .home-contacts__address {
    position: absolute;
    left: 0;
  }

  .home-contacts__title {
    top: 0;
  }

  .home-contacts__hours {
    top: 57px;
  }

  .home-contacts__note {
    top: 148px;
    width: 546px;
  }

  .home-contacts__address {
    top: 232px;
  }

  .home-contacts__phone {
    top: 284px;
  }

  .home-contacts__email {
    top: 336px;
  }

  .home-contacts__ig {
    position: absolute;
    left: 1030px;
    top: 411px;
    grid-column: auto;
    grid-row: auto;
  }
}
</style>
