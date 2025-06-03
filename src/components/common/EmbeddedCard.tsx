import React from 'react';
import { Link } from 'react-router-dom';
import styles from './EmbeddedCard.module.css';

interface EmbeddedCardProps {
  imageSources: Array<{ srcSet: string; media?: string; sizes?: string }>;
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  buttonLink: string;
  buttonTitle?: string;
  dataItemType?: string;
  dataItemName?: string;
}

const EmbeddedCard: React.FC<EmbeddedCardProps> = ({
  imageSources,
  imageSrc,
  imageAlt,
  buttonText,
  buttonLink,
  buttonTitle,
  dataItemType,
  dataItemName,
}) => {
  return (
    <div className={styles.embeddedCard}>
      <picture data-testid="embedded-card-image" className={styles.embeddedCard__image}>
        {imageSources.map((source, index) => (
          <source key={index} data-sizes={source.sizes} data-srcset={source.srcSet} media={source.media} srcSet={source.srcSet} sizes={source.sizes} />
        ))}
        <img data-src={imageSrc} alt={imageAlt} className=" lazyloaded" draggable="true" src={imageSrc} />
      </picture>

      <div className={styles.embeddedCard__text} data-testid="embedded-card-text" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
        <Link
          data-testid="btn"
          className={`${styles.embeddedCard__button} btn btn--L embedded-card__button-pr btn-pr btn--icon-Left`}
          target="_self"
          to={buttonLink}
          title={buttonTitle}
          data-item-type={dataItemType}
          data-item-name={dataItemName}
        >
          <p className={`${styles.textButtonL} text-button-l`} data-testid="genericText">{buttonText}</p>
        </Link>
      </div>
    </div>
  );
};

export default EmbeddedCard; 