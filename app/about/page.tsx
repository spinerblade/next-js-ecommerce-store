import styles from './about.module.scss';

export const metadata = {
  title: 'About Us',
  description: 'About the company and our story',
};

export default function AboutPage() {
  return (
    <div className={styles.AboutPage}>
      <h1>About Us</h1>
      <div>Our Journey started in a small village..</div>
      <div className={styles.learn}>Learn more</div>
    </div>
  );
}
