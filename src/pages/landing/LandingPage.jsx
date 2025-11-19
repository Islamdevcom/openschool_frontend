import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import OnboardingTour from "../../components/onboarding/OnboardingTour";
import { useOnboarding } from "../../components/onboarding/hooks/useOnboarding";
import { getLandingTourSteps } from "../../components/onboarding/tours/landingTour.jsx";
import LanguageSwitcher from "../../components/common/LanguageSwitcher";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  const { t } = useTranslation();
  const { runTour, handleTourCallback } = useOnboarding('landing', true, 2000);

  return (
    <div className={styles.landingPage}>
      <OnboardingTour
        steps={getLandingTourSteps(t)}
        run={runTour}
        callback={handleTourCallback}
      />

      <header>
        <nav>
          <div className={styles.logoSection}>
            <img
              src="/logo.png"
              alt="OpenSchool Logo"
            />
            <div>{t('common.appName')}</div>
          </div>
          <ul className={styles.navLinks}>
            <li><a href="#teachers">{t('landing.nav.teachers')}</a></li>
            <li><a href="#students">{t('landing.nav.students')}</a></li>
            <li><a href="#schools">{t('landing.nav.schools')}</a></li>
            <li><a href="#districts">{t('landing.nav.districts')}</a></li>
          </ul>
          <div className={styles.headerRight}>
            <LanguageSwitcher />
            <Link to="/login" className={styles.loginBtn} data-login-btn>{t('common.login')}</Link>
          </div>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.container}>
          <h1>{t('landing.hero.title')}</h1>
          <p className={styles.heroSubtitle}>{t('landing.hero.subtitle')}</p>
          <p className={styles.heroDescription}>
            {t('landing.hero.description')}
          </p>
          <div className={styles.heroButtons} data-hero-buttons>
            <Link to="/self-register" className={styles.btnPrimary}>
              {t('landing.hero.startFree')}
            </Link>
            <Link to="/enter-code" className={styles.btnSecondary}>
              {t('landing.hero.registerSchool')}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.features} id="teachers">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t('landing.features.title')}</h2>
          <p className={styles.sectionSubtitle}>
            {t('landing.features.subtitle')}
          </p>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>👨‍🏫</div>
              <h3>{t('landing.features.teachers.title')}</h3>
              <p>
                {t('landing.features.teachers.description')}
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>👨‍🎓</div>
              <h3>{t('landing.features.students.title')}</h3>
              <p>
                {t('landing.features.students.description')}
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>👪</div>
              <h3>{t('landing.features.parents.title')}</h3>
              <p>
                {t('landing.features.parents.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.audience} id="students">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t('landing.audience.title')}</h2>
          <p className={styles.sectionSubtitle}>
            {t('landing.audience.subtitle')}
          </p>
          <div className={styles.audienceGrid}>
            <div className={styles.audienceCard}>
              <h3>{t('landing.audience.teachers.title')}</h3>
              <p>
                {t('landing.audience.teachers.description')}
              </p>
            </div>
            <div className={styles.audienceCard}>
              <h3>{t('landing.audience.students.title')}</h3>
              <p>
                {t('landing.audience.students.description')}
              </p>
            </div>
            <div className={styles.audienceCard}>
              <h3>{t('landing.audience.parents.title')}</h3>
              <p>
                {t('landing.audience.parents.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.schoolsDistricts} id="schools">
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>{t('landing.schools.title')}</h2>
          <p className={styles.sectionSubtitle}>
            {t('landing.schools.subtitle')}
          </p>
          <div className={styles.schoolsGrid}>
            <div className={styles.schoolCard}>
              <div className={styles.schoolIcon}>🏫</div>
              <h3>{t('landing.schools.forSchools.title')}</h3>
              <p>
                {t('landing.schools.forSchools.description')}
              </p>
              <ul>
                <li>{t('landing.schools.forSchools.features.management')}</li>
                <li>{t('landing.schools.forSchools.features.schedule')}</li>
                <li>{t('landing.schools.forSchools.features.analytics')}</li>
                <li>{t('landing.schools.forSchools.features.integration')}</li>
                <li>{t('landing.schools.forSchools.features.security')}</li>
              </ul>
            </div>
            <div className={styles.schoolCard} id="districts">
              <div className={styles.schoolIcon}>🏛️</div>
              <h3>{t('landing.schools.forDistricts.title')}</h3>
              <p>
                {t('landing.schools.forDistricts.description')}
              </p>
              <ul>
                <li>{t('landing.schools.forDistricts.features.multiSchool')}</li>
                <li>{t('landing.schools.forDistricts.features.analytics')}</li>
                <li>{t('landing.schools.forDistricts.features.resources')}</li>
                <li>{t('landing.schools.forDistricts.features.reports')}</li>
                <li>{t('landing.schools.forDistricts.features.standards')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>{t('landing.cta.title')}</h2>
          <p>{t('landing.cta.description')}</p>
          <div className={styles.ctaButtons}>
            <Link to="/self-register" className={styles.ctaBtn}>
              {t('landing.cta.tryFree')}
            </Link>
            <Link to="/enter-code" className={styles.btnSecondary}>
              {t('landing.cta.haveCode')}
            </Link>
          </div>
        </div>
      </section>

      <footer>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h3>{t('landing.footer.platform')}</h3>
              <ul>
                <li><a href="#teachers">{t('landing.nav.teachers')}</a></li>
                <li><a href="#students">{t('landing.nav.students')}</a></li>
                <li><a href="#schools">{t('landing.nav.schools')}</a></li>
                <li><a href="#districts">{t('landing.nav.districts')}</a></li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h3>{t('landing.footer.getStarted')}</h3>
              <ul>
                <li><Link to="/self-register">{t('landing.footer.registration')}</Link></li>
                <li><Link to="/enter-code">{t('landing.footer.schoolCode')}</Link></li>
                <li><Link to="/login">{t('common.login')}</Link></li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h3>{t('landing.footer.roles')}</h3>
              <ul>
                <li><Link to="/login">{t('landing.footer.forTeachers')}</Link></li>
                <li><Link to="/login">{t('landing.footer.forStudents')}</Link></li>
                <li><Link to="/login">{t('landing.footer.forParents')}</Link></li>
                <li><Link to="/schooladmin/login">{t('landing.footer.forSchools')}</Link></li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h3>{t('landing.footer.about')}</h3>
              <ul>
                <li><a href="#teachers">{t('landing.footer.features')}</a></li>
                <li><a href="#schools">{t('landing.footer.security')}</a></li>
                <li><Link to="/login">{t('landing.footer.support')}</Link></li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>{t('landing.footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
