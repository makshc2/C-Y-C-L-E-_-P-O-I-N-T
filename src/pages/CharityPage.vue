<script setup lang="ts">
import qrUrl from '@/assets/site/charity-qr.png'
import { EVENTS_INSTAGRAM_URL } from '@/constants/site'
import { charityCopy } from '@/content/charity'
</script>

<template>
  <div class="charity">
    <section class="charity__intro">
      <h1 class="charity__heading">{{ charityCopy.heading }}</h1>
      <div class="charity__row">
        <div class="charity__qr-block">
          <img
            class="charity__qr"
            :src="qrUrl"
            width="255"
            height="238"
            alt="QR-код для донату Велоточці"
          >
          <p class="charity__qr-caption">{{ charityCopy.qrCaption }}</p>
        </div>
        <p class="charity__lead">{{ charityCopy.lead }}</p>
      </div>
    </section>

    <section class="charity__impact">
      <h2 class="charity__impact-heading">{{ charityCopy.donationImpact.heading }}</h2>
      <ul class="charity__impact-list">
        <li v-for="item in charityCopy.donationImpact.items" :key="item">{{ item }}</li>
      </ul>
      <p class="charity__impact-closing">{{ charityCopy.donationImpact.closing }}</p>
    </section>

    <section class="charity__contacts">
      <h2 class="charity__contacts-intro">{{ charityCopy.contacts.intro }}</h2>
      <p v-for="line in charityCopy.contacts.body" :key="line">{{ line }}</p>
      <p>{{ charityCopy.contacts.emailPrefix }}<a
        class="charity__ig"
        :href="EVENTS_INSTAGRAM_URL"
        target="_blank"
        rel="noopener noreferrer"
      >{{ charityCopy.contacts.instagramLabel }}</a></p>
      <p>{{ charityCopy.contacts.closing }}</p>
    </section>
  </div>
</template>

<style scoped>
.charity__intro,
.charity__impact,
.charity__contacts {
  padding: var(--section-pad-y) var(--gutter);
  font-family: Helvetica, var(--font-sans);
}

/* Смуга A — лайм: h1, QR з підписом, лід */
.charity__intro {
  background-color: var(--color-green);
  color: var(--color-fg);
}

.charity__heading {
  margin: 0;
  font-size: var(--text-section-title);
  font-weight: var(--font-weight-light);
  line-height: 1.15;
}

.charity__row {
  display: flex;
  align-items: flex-start;
  gap: 177px;
  margin-top: var(--section-pad-y);
}

.charity__qr-block {
  flex: 0 0 auto;
  width: var(--charity-qr-w);
  max-width: 100%;
  margin-left: var(--content-indent);
}

.charity__qr {
  display: block;
  width: var(--charity-qr-w);
  max-width: 100%;
  height: var(--charity-qr-h);
  object-fit: contain;
}

.charity__qr-caption {
  margin: 8px 0 0;
  font-size: var(--text-charity);
  font-weight: var(--font-weight-light);
  line-height: 1.15;
  text-align: center;
}

.charity__lead {
  max-width: 856px;
  margin: 0;
  font-size: var(--text-section-title);
  font-weight: var(--font-weight-light);
  line-height: 1.15;
}

/* Смуга B — violet: на що йде донат */
.charity__impact {
  background-color: var(--color-violet);
  color: var(--color-accent-lime);
}

.charity__impact h2,
.charity__impact p,
.charity__impact ul,
.charity__impact li {
  color: var(--color-accent-lime);
  font-size: var(--text-contact-title);
  font-weight: var(--font-weight-regular);
  line-height: 1.15;
}

.charity__impact-heading {
  margin: 0;
}

.charity__impact-list {
  margin: 1.15em 0 0;
  padding-left: 0;
  list-style: none;
}

.charity__impact-list li {
  position: relative;
  padding-left: 50px;
}

.charity__impact-list li::before {
  content: '•';
  position: absolute;
  left: 20px;
}

.charity__impact-list li + li {
  margin-top: 1.15em;
}

.charity__impact-closing {
  margin: 1.15em 0 0;
}

/* Смуга C — лайм: контакти */
.charity__contacts {
  background-color: var(--color-green);
  color: var(--color-fg);
}

.charity__contacts h2,
.charity__contacts p {
  color: var(--color-fg);
  font-size: var(--text-contact-title);
  font-weight: var(--font-weight-light);
  line-height: 1.15;
}

.charity__contacts-intro {
  margin: 0;
}

.charity__contacts p {
  margin: 1.15em 0 0;
}

.charity__ig {
  color: inherit;
  text-decoration: underline;
}

.charity__ig:focus-visible {
  outline: 2px solid var(--color-fg);
  outline-offset: 2px;
}

@media (max-width: 1279px) {
  .charity__intro,
  .charity__impact,
  .charity__contacts {
    padding: 48px 16px;
  }

  .charity__row {
    flex-direction: column;
    gap: 32px;
    margin-top: 48px;
  }

  .charity__qr-block {
    margin-left: 0;
  }

  .charity__qr {
    height: auto;
  }

  .charity__lead {
    max-width: none;
  }
}

@media (max-width: 767px) {
  .charity__heading,
  .charity__lead {
    font-size: var(--text-body);
  }

  .charity__impact h2,
  .charity__impact p,
  .charity__impact li,
  .charity__contacts h2,
  .charity__contacts p {
    font-size: var(--text-body);
  }
}
</style>
