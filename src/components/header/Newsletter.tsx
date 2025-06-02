import React, { useState } from 'react';
import { X } from 'lucide-react';
import styles from './Header.module.css';

interface NewsletterProps {
  isOpen: boolean;
  onClose: () => void;
}

const Newsletter: React.FC<NewsletterProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // TODO: Implement actual newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.newsletterOverlay} role="dialog" aria-modal="true" aria-labelledby="newsletter-title">
      <div className={styles.newsletterContent}>
        <button 
          className={styles.newsletterCloseButton} 
          onClick={onClose}
          aria-label="Close newsletter subscription"
        >
          <X className={styles.newsletterCloseIcon} />
        </button>

        <h2 id="newsletter-title" className={styles.newsletterTitle}>
          Subscribe to Contiki Emails
        </h2>

        <p className={styles.newsletterDescription}>
          Get exclusive deals, travel tips, and inspiration delivered straight to your inbox.
        </p>

        <form onSubmit={handleSubmit} className={styles.newsletterForm}>
          <div className={styles.newsletterInputWrapper}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className={styles.newsletterInput}
              aria-label="Email address"
            />
            <button 
              type="submit" 
              className={styles.newsletterSubmit}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>

          {status === 'success' && (
            <p className={styles.newsletterSuccess}>
              Thanks for subscribing! Please check your email to confirm your subscription.
            </p>
          )}

          {status === 'error' && (
            <p className={styles.newsletterError}>
              Sorry, something went wrong. Please try again later.
            </p>
          )}
        </form>

        <p className={styles.newsletterPrivacy}>
          By subscribing, you agree to our{' '}
          <a href="/privacy-policy" className={styles.newsletterPrivacyLink}>
            Privacy Policy
          </a>
          {' '}and{' '}
          <a href="/terms" className={styles.newsletterPrivacyLink}>
            Terms of Service
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Newsletter; 